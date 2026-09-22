<script setup>
// 任务详情工作台（taskReportDetail）：左侧大纲/计划进度，右侧可编辑正文预览。
// 数据来自 report store（四个表单/我的报告任务入口写入）。
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useReportStore } from '../../stores/report';
import { buildTaskReportModel, linePlainText } from '../../utils/taskReport.js';
import { SOURCE_TRACE_ROWS } from '../../data/report.js';
import ArticleLine from '../../components/task/ArticleLine.vue';
import LineRewriteDrawer from '../../components/task/LineRewriteDrawer.vue';

const router = useRouter();
const ui = useUiStore();
const report = useReportStore();

// 视图模型：随 store 中任务类型/标题构建
const model = computed(() =>
  buildTaskReportModel(report.taskType, report.taskTitle || undefined, report.taskOptions)
);

// 正文行（行改写后本地可变）
const lines = ref(null);
const metaText = ref('');
const selectedLine = ref(-1);

function ensureLines() {
  if (!lines.value) {
    lines.value = model.value.lines.map(line => ({ ...line, parts: [...line.parts] }));
    metaText.value = model.value.meta;
  }
}
ensureLines();

// 切换任务（store 变化）时重建
const rebuild = () => {
  lines.value = null;
  selectedLine.value = -1;
  ensureLines();
};
// 每次组件挂载（从表单跳转进入）重建
onMounted(rebuild);

const selectedOriginal = computed(() =>
  selectedLine.value >= 0 ? linePlainText(lines.value[selectedLine.value]) : ''
);

function openRewrite(index) {
  selectedLine.value = index;
}

function closeRewrite() {
  selectedLine.value = -1;
}

function applyRewrite(previewText) {
  const line = lines.value[selectedLine.value];
  if (!line) return;
  line.parts = [{ type: 'text', value: previewText }];
  metaText.value = '2026-06-09 16:26 更新 · 当前版本 V1 · 已应用局部修改 · 已自动保存';
  closeRewrite();
  ui.showToast('已应用修改并替换原文');
}

function openSource(sourceId) {
  const source = SOURCE_TRACE_ROWS.find(item => item.id === sourceId) || SOURCE_TRACE_ROWS[0];
  ui.openModal('sourceTrace', { source });
}

function openValidationLog() {
  ui.openModal('validationLog');
}

function createVersion() {
  const ts = report.addVersion('Lianzhihui · 报告任务工作台');
  metaText.value = `${ts} 更新 · 已保存`;
  ui.showToast(`已新建版本：${ts}`);
}

function openVersionManager() {
  ui.openModal('versionManager');
}

function download() {
  ui.openModal('downloadFormat', { title: model.value.title, isInsight: model.value.isInsight });
}

function closeDetail() {
  if (report.taskReturnView === 'documents') {
    router.push({ name: 'documents' });
  } else {
    router.push({ name: 'home' });
  }
}

function saveTemplate() {
  ui.showToast('当前任务配置已保存为模板');
}

function tocAnchor(id) {
  return `#${id}`;
}
</script>

<template>
  <section class="view active" id="taskReportDetail" :data-report-type="model.type">
    <div class="task-workbench">
      <aside class="task-chat-pane">
        <div class="task-chat-head">
          <h2>报告任务工作台</h2>
        </div>
        <p class="task-chat-message">您的报告任务已进入后台执行。系统已完成需求理解，并生成可编辑的大纲和写作计划。</p>
        <div class="task-outline-card">
          <header>
            <span>文章大纲 <span class="report-type" style="vertical-align:middle;">已确认</span></span>
            <span class="faint">⌄</span>
          </header>
          <div class="task-outline-body">
            <div class="task-outline-row">
              <span class="outline-side-label">标题</span>
              <div class="outline-draft-block"><h3>{{ model.outline.title }}</h3></div>
            </div>
            <div class="task-outline-row">
              <span class="outline-side-label">摘要</span>
              <div class="outline-draft-block">{{ model.outline.summary }}</div>
            </div>
            <div class="task-outline-row">
              <span class="outline-side-label">正文</span>
              <div class="outline-draft-block">
                <template v-for="(block, index) in model.outline.bodyBlocks" :key="index">
                  <h3>{{ block.h }}</h3>
                  <p>{{ block.p }}</p>
                </template>
              </div>
            </div>
            <div class="task-outline-row">
              <span class="outline-side-label">结论</span>
              <div class="outline-draft-block">{{ model.outline.conclusion }}</div>
            </div>
          </div>
          <div class="task-outline-actions">
            <button class="secondary-btn" type="button" @click="saveTemplate">保存至写作模板</button>
          </div>
        </div>
        <div class="task-chat-message">
          <strong>计划进度</strong>
          <div class="progress-list">
            <span
              v-for="(item, index) in model.progress"
              :key="index"
              :class="{ 'progress-warning': item.warning }"
            >{{ item.text }}</span>
          </div>
          <div class="task-output-list" v-if="model.outputs.length">
            <div class="task-output-item" v-for="(output, index) in model.outputs" :key="index">
              <span><strong>{{ output.title }}</strong><span>{{ output.desc }}</span></span>
              <span
                class="action-chip"
                :class="{ secondary: output.secondary }"
                @click="output.action === 'validationLog' ? openValidationLog() : null"
              >{{ output.chip }}</span>
            </div>
          </div>
        </div>
        <div class="task-chat-input">
          <span>输入需要继续深度研究和创作的文档主题及要求</span>
          <button class="send-btn" aria-label="发送">›</button>
        </div>
      </aside>
      <article class="task-preview-pane">
        <div class="task-preview-toolbar" aria-label="报告操作">
          <button class="task-tool-btn" type="button" title="新建版本" @click="createVersion">
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            <span>新建版本</span>
          </button>
          <button class="task-tool-btn" type="button" title="版本管理" @click="openVersionManager">
            <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/><path d="M18 15v6M15 18h6"/></svg>
            <span>版本管理</span>
          </button>
          <button class="task-tool-btn" type="button" title="下载" @click="download">
            <svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
            <span>下载</span>
          </button>
          <button class="task-tool-btn" type="button" title="关闭" @click="closeDetail">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
            <span>关闭</span>
          </button>
        </div>
        <div v-if="model.banner" class="validation-warning-banner">
          <strong>校验异常提示：</strong>{{ model.banner.replace('校验异常提示：', '') }}
        </div>
        <div class="task-preview-head">
          <div>
            <h1>{{ model.title }}</h1>
            <p class="muted" style="margin-top:10px;">{{ metaText }}</p>
          </div>
          <nav class="preview-toc">
            <h3>目录</h3>
            <a v-for="item in model.toc" :key="item.id" :href="tocAnchor(item.id)">{{ item.label }}</a>
          </nav>
        </div>
        <div class="task-preview-article task-article-shell">
          <div class="task-article-body">
            <template v-for="(line, index) in lines" :key="index">
              <ArticleLine
                :line="line"
                :selected="selectedLine === index"
                @open-rewrite="openRewrite(index)"
                @open-source="openSource"
              />
              <LineRewriteDrawer
                v-if="selectedLine === index"
                :original-text="selectedOriginal"
                @close="closeRewrite"
                @apply="applyRewrite"
              />
            </template>
          </div>
          <section class="task-source-panel" v-show="model.isInsight">
            <h3>参考来源</h3>
            <p class="muted">点击来源查看该段正文所引用的数据集指标与维度。</p>
            <div class="source-list">
              <button
                v-for="(source, index) in model.sources"
                :key="source.id"
                class="source-row"
                type="button"
                @click="openSource(source.id)"
              >
                <span><strong>[{{ index + 1 }}] {{ source.name }}</strong><span>{{ source.scope }}</span></span>
                <span>查看指标表</span>
              </button>
            </div>
          </section>
        </div>
      </article>
    </div>
  </section>
</template>
