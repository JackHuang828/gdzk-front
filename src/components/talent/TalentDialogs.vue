<template>
  <!-- 主弹窗宿主（原型 #modal）：mtitle / mbody / 底部按钮按类型渲染 -->
  <div v-if="mainOpen" class="modal show" :class="modalExtraClass" @click.self="closeDialog">
    <div class="card">
      <h2 v-if="dialog.type !== 'export'">{{ modalTitle }}</h2>
      <h2 v-else>
        <span class="export-dialog-title"><i class="fas fa-download"></i> 导出数据</span>
        <button class="export-dialog-close" type="button" aria-label="关闭" @click="closeDialog"><i class="fas fa-times"></i></button>
      </h2>
      <div id="mbody">
        <template v-if="dialog.type === 'saveScheme' || dialog.type === 'topSaveScheme'">
          <p>请输入人才池方案名称</p>
          <input ref="schemeNameInput" v-model="schemeName" class="scheme-name-input" type="text" maxlength="40" placeholder="输入方案名称" @keydown.enter="onConfirm" />
        </template>
        <template v-else-if="dialog.type === 'deleteScheme'">
          <p>确认删除该人才池方案吗？</p>
          <p class="scheme-delete-name">“{{ dialog.data.name }}”</p>
        </template>
        <template v-else-if="dialog.type === 'topDeleteScheme'">
          <p>确认删除人才池方案“{{ dialog.data.name }}”吗？</p>
        </template>
        <template v-else-if="dialog.type === 'libraryChooser'">
          <p>请选择要加入的人才池；加入后可在“我的专属人才池”中继续管理、更新和导出。</p>
          <div class="library-choice-list">
            <button v-for="pool in exclusivePools" :key="pool.id" class="library-choice" type="button" @click="chooseLibrary(pool)">
              <b>{{ pool.name }}</b><small>{{ pool.desc }} · 已有 {{ (pool.members || []).length }} 人</small>
            </button>
          </div>
          <div class="pool-dialog-field"><label>或新建人才池</label><input ref="newLibraryNameInput" v-model="newLibraryName" placeholder="输入人才池名称，例如：智能制造专家池" /></div>
        </template>
        <template v-else-if="dialog.type === 'batchLibraryChooser'">
          <p>已选择 <b>{{ batchPeople.length }}</b> 位人才，请选择要加入的人才池。</p>
          <div class="library-choice-list">
            <button v-for="pool in exclusivePools" :key="pool.id" class="library-choice" type="button" @click="chooseBatchLibrary(pool)">
              <b>{{ pool.name }}</b><small>{{ pool.desc }} · 已有 {{ (pool.members || []).length }} 人</small>
            </button>
          </div>
          <div class="pool-dialog-field"><label>或新建人才池</label><input v-model="newBatchLibraryName" placeholder="输入人才池名称" /></div>
        </template>
        <template v-else-if="dialog.type === 'share'">
          <p class="share-tip">复制链接，发送给你需要分享的对象。</p>
          <div class="share-link-row"><input ref="shareInput" type="text" readonly aria-label="分享链接" :value="dialog.data.link" /></div>
        </template>
        <template v-else-if="dialog.type === 'export'">
          <p class="export-format-hint">请选择要导出的文件格式：</p>
          <div class="export-format-options">
            <button class="export-format-card" type="button" @click="chooseExportFormat('excel')"><span class="export-format-icon excel"><i class="fas fa-file-excel"></i></span><span><b>Excel</b><small>包含多工作表和数据统计</small></span></button>
            <button class="export-format-card" type="button" @click="chooseExportFormat('pdf')"><span class="export-format-icon pdf"><i class="fas fa-file-pdf"></i></span><span><b>PDF</b><small>专业排版，适合打印存档</small></span></button>
            <button class="export-format-card" type="button" @click="chooseExportFormat('visual')"><span class="export-format-icon visual"><i class="fas fa-chart-column"></i></span><span><b>可视化报告</b><small>交互式图表，支持分享</small></span></button>
          </div>
        </template>
        <template v-else-if="dialog.type === 'createPool'">
          <div class="exclusive-create-form">
            <label>人才池名称<input ref="poolNameInput" v-model="poolName" maxlength="40" placeholder="例如：人工智能前沿人才池" /></label>
            <label>说明<textarea v-model="poolDesc" maxlength="120" placeholder="请输入人才池说明"></textarea></label>
          </div>
        </template>
        <template v-else-if="dialog.type === 'removePool'">
          <p>确认移除人才池“{{ dialog.data.name }}”吗？移除后，该人才池及其成员记录将不再显示。</p>
        </template>
        <template v-else-if="dialog.type === 'removeMember'">
          <p>确认将“{{ dialog.data.personName }}”移出人才池“{{ dialog.data.poolName }}”吗？</p>
        </template>
        <template v-else-if="dialog.type === 'potential'">
          <p class="potential-recommend-tip">系统根据研究方向、成果产出和项目经历推荐以下人才。</p>
          <div class="exclusive-recommend-table">
            <template v-if="potentialRows.length">
              <div class="exclusive-recommend-header"><span>姓名</span><span>机构</span><span>学科领域</span><span>代表性成果</span><span>项目经历</span><span>学术影响力</span><span>活跃度</span><span>操作</span></div>
              <div v-for="row in potentialRows" :key="row.id" class="exclusive-recommend-row" :class="{ joined: row.status === 'joined' }">
                <div class="exclusive-member-person"><span class="avatar">{{ row.person.name[0] }}</span><button type="button" @click="openTalentPortrait(row.person.id)">{{ row.person.name }}</button></div>
                <div class="result-institution">{{ row.person.institution }}</div>
                <div class="result-field">
                  <button class="discipline-link" type="button" @click="openDisciplineBlankTab">{{ row.person.field }}</button>
                  <span class="result-field-tags"><em>{{ row.person.tertiary }}</em><em>{{ row.person.quaternary }}</em></span>
                </div>
                <div class="result-outcome">{{ talentOutcomeSummary(row.person) }}</div>
                <div class="result-project"><b>{{ metric(row.person).years }}</b><small>{{ metric(row.person).projects }}</small></div>
                <div class="result-impact"><b>{{ row.person.impact }}</b><small>综合影响指数</small></div>
                <div class="result-activity"><b>{{ metric(row.person).activity }}</b><small>最近更新</small></div>
                <div class="exclusive-recommend-actions">
                  <span v-if="row.status === 'joined'">已加入</span>
                  <template v-else>
                    <button type="button" @click="onJoinPotential(row.id)">加入人才池</button>
                    <button type="button" @click="onIgnorePotential(row.id)">忽略</button>
                  </template>
                </div>
                <div class="exclusive-recommend-reason"><strong>推荐理由</strong><span>{{ row.reason }}</span></div>
              </div>
            </template>
            <p v-else class="exclusive-member-empty">暂无新的潜力人才推荐。</p>
          </div>
        </template>
        <template v-else-if="dialog.type === 'graph' && graphPerson">
          <p>人才与学科、机构、项目、成果的关联网络。选择任一维度可回到列表继续筛选。</p>
          <div class="rel">
            <div @click="onWord(graphPerson.field)"><small>学科</small>{{ graphPerson.field }}</div>
            <div @click="onWord(graphPerson.institution)"><small>机构</small>{{ graphPerson.institution }}</div>
            <div @click="onWord(graphPerson.project)"><small>项目</small>{{ graphPerson.project }}</div>
            <div @click="onWord(graphPerson.outcome)"><small>成果</small>{{ graphPerson.outcome }}</div>
          </div>
        </template>
        <template v-else-if="dialog.type === 'detail' && dialog.data.person">
          <p>{{ dialog.data.person.title }} · {{ dialog.data.person.institution }} · {{ dialog.data.person.field }}</p>
          <div class="rel">
            <div><small>关联学科</small>{{ dialog.data.person.field }}</div>
            <div><small>所属机构</small>{{ dialog.data.person.institution }}</div>
            <div><small>项目经历</small>{{ dialog.data.person.projectDetail || dialog.data.person.project }}</div>
            <div><small>代表性成果</small>{{ dialog.data.person.outcomeDetail || dialog.data.person.outcome }}</div>
            <div><small>学术影响力</small>{{ dialog.data.person.impact }}</div>
            <div><small>推荐理由</small>与当前范围匹配，近期成果活跃</div>
          </div>
        </template>
      </div>
      <p v-if="dialog.type !== 'export'" style="text-align: right; margin: 16px 0 0">
        <button class="btn" type="button" @click="closeDialog">关闭</button>
        <button v-if="dialog.type !== 'potential'" class="btn primary" type="button" @click="onConfirm">{{ confirmLabel }}</button>
      </p>
    </div>
  </div>

  <!-- 统计详情弹窗 -->
  <div v-if="dialog.type === 'analyticsDetail' && detailConfig" class="modal-overlay large-modal active" @click.self="closeDialog">
    <div class="modal-content large-modal-content">
      <div class="modal-header">
        <h3><i class="fas" :class="detailConfig.icon"></i> {{ detailConfig.title }}</h3>
        <button class="modal-close" type="button" @click="closeDialog"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body-chart">
        <div class="chart-summary"><h4><i class="fas fa-info-circle"></i> 数据摘要</h4><p>{{ detailConfig.summary }}</p></div>
        <div class="chart-container">
          <div class="chart-header"><h4><i class="fas fa-chart-bar"></i> 可视化图表</h4></div>
          <div class="chart-canvas">
            <ChartPie v-if="detailConfig.chartType === 'pie'" :data="detailConfig.data" size="detail" selectable :selected-name="modalSelection" @select="openDetailTalentList('institution', $event)" />
            <ChartBars v-else :data="detailConfig.data" selectable :selected-name="modalSelection" @select="openDetailTalentList(dialog.data.type, $event)" />
          </div>
        </div>
        <div class="chart-table-container">
          <h4><i class="fas fa-table"></i> 详细数据</h4>
          <table class="chart-table">
            <thead><tr><th>类别</th><th>数量</th><th>占比</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="item in detailConfig.data" :key="item.name">
                <td><span :style="{ display: 'inline-block', width: '12px', height: '12px', background: item.color, borderRadius: '2px', marginRight: '8px' }"></span>{{ item.name }}</td>
                <td>{{ item.value }}</td>
                <td>{{ detailPercent(item) }}</td>
                <td><button class="btn-sm btn-primary" type="button" @click="onDrill(item.name)">筛选</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="chart-tips">
          <div class="tip-item"><i class="fas fa-mouse-pointer"></i><span>点击“筛选”按钮可在人才列表中查看对应类别的人才</span></div>
          <div class="tip-item"><i class="fas fa-search"></i><span>支持多维度交叉筛选</span></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button" @click="closeDialog">关闭</button>
        <button class="btn btn-primary" type="button" @click="closeDialog"><i class="fas fa-check"></i> 确定</button>
      </div>
    </div>
  </div>

  <!-- 人才清单弹窗（图表下钻；置于详情弹窗之后以叠加显示） -->
  <div v-if="talentListView" class="modal-overlay active" @click.self="closeTalentListView">
    <div class="modal-content chart-talent-modal-content">
      <div class="modal-header">
        <h3><i class="fas fa-users"></i> {{ talentListView.sourceLabel }} · {{ talentListView.selectedName }}</h3>
        <button class="modal-close" type="button" @click="closeTalentListView"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="chart-talent-modal-summary"><span>当前筛选：<strong>{{ talentListView.selectedName }}</strong></span><span>共 {{ talentListView.talents.length }} 位人才</span></div>
        <div class="chart-talent-table-wrap">
          <table class="chart-talent-table">
            <thead><tr><th>#</th><th>姓名</th><th>职位</th><th>所在机构/单位</th><th>研究领域</th></tr></thead>
            <tbody>
              <tr v-for="(person, index) in talentListView.talents" :key="person.id">
                <td>{{ index + 1 }}</td>
                <td class="chart-talent-name">{{ person.name }}</td>
                <td>{{ person.title || person.type || '研究人员' }}</td>
                <td>{{ person.institution }}</td>
                <td>{{ person.field }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-default" type="button" @click="closeTalentListView">关闭</button></div>
    </div>
  </div>
</template>

<script setup>
/* 弹窗宿主：迁移原型 14 种弹窗（方案保存/删除、入池选择、分享、导出、
 * 新建/移除人才池、移除成员、潜力推荐、知识图谱、画像关联、统计详情、人才清单） */
import { computed, ref, watch, nextTick } from 'vue';
import ChartBars from './ChartBars.vue';
import ChartPie from './ChartPie.vue';
import { talentOutcomeSummary, talentListMetric } from '../../data/talent/talent-metrics';
import { analyticsDetailData, analyticsChartTalentList, CHART_LABELS } from '../../data/talent/analytics-data';
import {
  dialog, closeDialog, toast, results, people, picked,
  saveScheme, deleteScheme, copyShareLink, downloadResultsCsv,
  addTalentToCurrentPool, overrideResults, setFilter, go, switchTalentLibraryTab,
  openTalentPortrait, openDisciplineBlankTab,
} from '../../hooks/talent-library';
import { saveTopScheme, deleteTopScheme } from '../../hooks/talent-top100';
import {
  exclusivePools, createPoolWithMembers, createExclusivePool,
  removeExclusivePool, removeExclusiveMember,
  potentialRecommendations, addPotentialTalentToActivePool, ignorePotentialTalent,
  addMembersToPool,
} from '../../hooks/talent-pools';

const metric = talentListMetric;

const MAIN_DIALOGS = new Set([
  'saveScheme', 'deleteScheme', 'topSaveScheme', 'topDeleteScheme',
  'libraryChooser', 'batchLibraryChooser', 'share', 'export',
  'createPool', 'removePool', 'removeMember', 'potential', 'graph', 'detail',
]);

const mainOpen = computed(() => MAIN_DIALOGS.has(dialog.type));

const modalExtraClass = computed(() => {
  if (dialog.type === 'export') return 'export-format-modal';
  if (dialog.type === 'potential') return 'potential-recommend-modal';
  return '';
});

const TITLES = {
  saveScheme: '保存人才池方案',
  topSaveScheme: '保存人才池方案',
  deleteScheme: '删除人才池方案',
  topDeleteScheme: '删除人才池方案',
  libraryChooser: '加入我的人才池',
  batchLibraryChooser: '批量加入人才池',
  share: '分享当前结果',
  createPool: '新建人才池',
  removePool: '移除人才池',
  removeMember: '移除人才',
  potential: '潜力人才推荐',
};
const modalTitle = computed(() =>
  dialog.type === 'graph' && graphPerson.value
    ? '知识图谱 · ' + graphPerson.value.name
    : dialog.type === 'detail' && dialog.data.person
      ? dialog.data.person.name + ' · 人才画像关联'
      : TITLES[dialog.type] || '');

const CONFIRM_LABELS = {
  saveScheme: '保存', topSaveScheme: '保存',
  deleteScheme: '确认删除', topDeleteScheme: '确认删除',
  libraryChooser: '新建并加入', batchLibraryChooser: '新建并批量加入',
  share: '复制链接', createPool: '确定',
  removePool: '确认移除', removeMember: '确认移除',
  graph: '查看人才画像', detail: '加入当前人才池',
};
const confirmLabel = computed(() => CONFIRM_LABELS[dialog.type] || '确定');

/* ===== 输入状态（打开弹窗时重置） ===== */
const schemeNameInput = ref(null);
const newLibraryNameInput = ref(null);
const shareInput = ref(null);
const poolNameInput = ref(null);
const schemeName = ref('');
const newLibraryName = ref('');
const newBatchLibraryName = ref('');
const poolName = ref('');
const poolDesc = ref('');

watch(
  () => dialog.type,
  (type) => {
    schemeName.value = '';
    newLibraryName.value = '';
    newBatchLibraryName.value = '';
    poolName.value = '';
    poolDesc.value = '';
    detailTalentList.value = null;
    modalSelection.value = '';
    nextTick(() => {
      if (type === 'saveScheme' || type === 'topSaveScheme') schemeNameInput.value && schemeNameInput.value.focus();
      if (type === 'libraryChooser') newLibraryNameInput.value && newLibraryNameInput.value.focus();
      if (type === 'share' && shareInput.value) { shareInput.value.focus(); shareInput.value.select(); }
    });
  },
);

/* ===== 确认按钮分发 ===== */
function onConfirm() {
  switch (dialog.type) {
    case 'saveScheme': {
      const name = schemeName.value.trim();
      if (!name) { toast('请输入人才池方案名称。'); schemeNameInput.value && schemeNameInput.value.focus(); return; }
      saveScheme(name);
      closeDialog();
      break;
    }
    case 'topSaveScheme': {
      const name = schemeName.value.trim();
      if (!name) { toast('请输入人才池方案名称。'); schemeNameInput.value && schemeNameInput.value.focus(); return; }
      saveTopScheme(name);
      closeDialog();
      break;
    }
    case 'deleteScheme':
      deleteScheme(dialog.data.id);
      closeDialog();
      break;
    case 'topDeleteScheme':
      deleteTopScheme(dialog.data.id);
      closeDialog();
      break;
    case 'libraryChooser': {
      const name = newLibraryName.value.trim();
      if (!name) { toast('请先输入人才池名称。'); newLibraryNameInput.value && newLibraryNameInput.value.focus(); return; }
      const personName = dialog.data.person.name;
      createPoolWithMembers(name, '从人才分类与检索创建', [dialog.data.person]);
      closeDialog();
      toast('已新建“' + name + '”，并加入 ' + personName + '。');
      break;
    }
    case 'batchLibraryChooser': {
      const name = newBatchLibraryName.value.trim();
      if (!name) { toast('请先输入人才池名称。'); return; }
      createPoolWithMembers(name, '从人才分类与检索批量创建', batchPeople.value);
      picked.clear();
      closeDialog();
      toast('加入成功');
      break;
    }
    case 'share':
      copyShareLink(shareInput.value);
      break;
    case 'createPool': {
      const name = poolName.value.trim();
      if (!name) { toast('请输入人才池名称。'); poolNameInput.value && poolNameInput.value.focus(); return; }
      createExclusivePool(name, poolDesc.value.trim());
      closeDialog();
      toast('人才池已创建。');
      break;
    }
    case 'removePool':
      removeExclusivePool(dialog.data.id);
      closeDialog();
      toast('人才池已移除。');
      break;
    case 'removeMember':
      removeExclusiveMember(dialog.data.personId);
      closeDialog();
      toast('已移出人才池。');
      break;
    case 'graph':
      openDetailDialog();
      break;
    case 'detail':
      addTalentToCurrentPool(dialog.data.person.id);
      closeDialog();
      break;
  }
}

/* ===== 入池选择 ===== */
const batchPeople = computed(() => (dialog.data.ids || []).map((id) => people.value.find((person) => person.id === id)).filter(Boolean));

function chooseLibrary(pool) {
  const personName = dialog.data.person.name;
  addMembersToPool(pool.id, [dialog.data.person]);
  closeDialog();
  toast('已将 ' + personName + ' 加入所选人才池。');
}

function chooseBatchLibrary(pool) {
  addMembersToPool(pool.id, batchPeople.value);
  picked.clear();
  closeDialog();
  toast('加入成功');
}

/* ===== 导出 ===== */
function chooseExportFormat(format) {
  closeDialog();
  if (format === 'excel') { downloadResultsCsv(); return; }
  toast(format === 'pdf' ? 'PDF 报告已生成。' : '可视化报告已生成。');
}

/* ===== 潜力人才推荐 ===== */
/* 已加入任何人才池（含当前人才池）的人才不再出现在推荐列表；
 * 服务端 selectByUser 亦有同样过滤，此处兜底保证未重启后端时也即时生效 */
const potentialRows = computed(() => {
  const joinedIds = new Set(exclusivePools.value.flatMap((pool) => (pool.members || []).map((member) => String(member.id))));
  return potentialRecommendations.value
    .map((item) => ({ ...item, person: people.value.find((candidate) => candidate.id === item.id) }))
    .filter((row) => row.person)
    .filter((row) => row.status === 'new' && !joinedIds.has(String(row.person.id)));
});

function onJoinPotential(id) {
  addPotentialTalentToActivePool(id);
  toast('加入成功');
}

function onIgnorePotential(id) {
  ignorePotentialTalent(id);
  toast('已忽略该推荐人才。');
}

/* ===== 知识图谱 / 画像关联 ===== */
const graphPerson = computed(() => results.value[0] || people[0]);

function openDetailDialog() {
  dialog.type = 'detail';
  dialog.data = { person: graphPerson.value };
}

function onWord(value) {
  setFilter('kw', value);
  closeDialog();
  go('result');
}

/* ===== 统计详情弹窗 ===== */
const detailConfig = computed(() => analyticsDetailData[dialog.data.type] || null);
const modalSelection = ref('');
const detailTalentList = ref(null);

const talentListView = computed(() => {
  if (dialog.type === 'talentList') {
    return { sourceLabel: dialog.data.sourceLabel, selectedName: dialog.data.selectedName, talents: dialog.data.talents || [] };
  }
  return detailTalentList.value;
});

function closeTalentListView() {
  if (detailTalentList.value) detailTalentList.value = null;
  else closeDialog();
}

function openDetailTalentList(type, name) {
  modalSelection.value = name;
  detailTalentList.value = {
    sourceLabel: CHART_LABELS[type] || '可视化分析',
    selectedName: name,
    talents: analyticsChartTalentList(type, name),
  };
}

function detailPercent(item) {
  const total = detailConfig.value.data.reduce((sum, entry) => sum + entry.value, 0);
  const percentage = item.percentage != null ? item.percentage : ((item.value / total) * 100).toFixed(1);
  return percentage + '%';
}

/* 详情表格“筛选”下钻：回到人才清单并固定结果集合 */
function onDrill(name) {
  overrideResults(analyticsChartTalentList(dialog.data.type, name));
  switchTalentLibraryTab('library-main');
  closeDialog();
  go('result');
}
</script>
