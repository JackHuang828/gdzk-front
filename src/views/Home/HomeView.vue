<script setup>
// 首页 home：一键创作入口 + 我的报告 + 创作案例/研报库
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import ShowcaseCard from '../../components/home/ShowcaseCard.vue';
import MiniReportCard from '../../components/home/MiniReportCard.vue';
import {
  HOME_INDUSTRIES,
  HOME_TEMPLATE_OPTIONS,
  HOME_CREATION_CARDS,
  HOME_LIBRARY_CARDS,
  HOME_MY_REPORTS
} from '../../data/home.js';

const router = useRouter();
const route = useRoute();
const ui = useUiStore();

// 案例广场「生成战略报告」等入口通过 query.form 预选创作模式（对应原型 data-default-form）；
// 模板详情「使用该模板」通过 query.template 回流，预选模板标签（对应原型 useTemplate 的 templateLabel 文案）
onMounted(() => {
  const form = String(route.query.form || '');
  if (['researchForm', 'insightTask', 'strategyForm'].includes(form)) {
    selectedForm.value = form;
  }
  const template = String(route.query.template || '');
  if (template) selectedTemplate.value = template;
});

// 需求输入与模式选择
const prompt = ref('');
const selectedForm = ref('customForm'); // 原型默认 customForm
const pills = [
  { form: 'researchForm', label: '研究报告', tip: '全面了解某行业、市场或技术的现状' },
  { form: 'insightTask', label: '洞察报告', tip: '挖掘现象背后的原因，预判未来趋势' },
  { form: 'strategyForm', label: '战略咨询报告', tip: '为特定企业或业务制定可落地的行动方案' }
];

// 模板选择下拉
const templateDetails = ref(null);
const templateSearch = ref('');
const selectedTemplate = ref('不使用模板');
const templateSummary = computed(() =>
  selectedTemplate.value === '不使用模板' ? '模板选择' : `模板选择：${selectedTemplate.value}`
);
const filteredTemplates = computed(() => {
  const keyword = templateSearch.value.trim().toLowerCase();
  return HOME_TEMPLATE_OPTIONS.filter(option => !keyword || option.label.toLowerCase().includes(keyword));
});

function togglePill(form) {
  // 再次点击已选中的 pill 则取消选择（回到 customForm）
  selectedForm.value = selectedForm.value === form ? 'customForm' : form;
}

function selectTemplate(option) {
  selectedTemplate.value = option.label;
  selectedForm.value = option.form;
  templateSearch.value = '';
  if (templateDetails.value) templateDetails.value.open = false;
  ui.showToast(option.label === '不使用模板' ? '已取消模板选择' : `已选择${option.label}`);
}

function startFlow() {
  const text = prompt.value.trim();
  let form = selectedForm.value;
  // 智能分流：战略/招商 → 战略表单；洞察/趋势/月刊 → 洞察任务；其余 → 当前选中表单
  if (text.includes('战略') || text.includes('招商')) {
    form = 'strategyForm';
  } else if (text.includes('洞察') || text.includes('趋势') || text.includes('月刊')) {
    form = 'insightTask';
  }
  router.push({ name: form });
  ui.showToast('已创建深度创作任务');
}

// 创作案例 / 研报库 tab
const sourceTab = ref('creation');
// 行业筛选按钮（装饰性：仅高亮，不过滤卡片，同原型 filterHomeReportCards）
const activeIndustry = ref('all');

// 卡片路由映射（同引擎 data-view 规则：strategyDetail + 研究报告 → researchDetail）
function goShowcase(card, panel) {
  if (card.target === 'insightDetail') {
    router.push({ name: 'insightDetail' });
  } else if (card.target === 'researchDetail') {
    router.push({ name: 'researchDetail', query: { source: 'library' } });
  } else if (card.reportType === '研究报告') {
    router.push({ name: 'researchDetail' });
  } else {
    router.push({ name: 'strategyDetail' });
  }
}

function goMini(report) {
  if (report.reportType === '研究报告') {
    router.push({ name: 'researchDetail' });
  } else {
    router.push({ name: 'strategyDetail' });
  }
}

function openCaseLibrary() {
  // 原型 openCaseLibrary 使用当前工作台类型，默认 research
  router.push({ name: 'caseLibrary', query: { type: 'research' } });
}
</script>

<template>
  <section class="view active" id="home">
    <div class="hero">
      <h1>一键输入需求，开启深度创作</h1>
      <p class="hero-subtitle">通过 AI 协同权威数据资源，产出依托可靠信源、高含金量、具备决策参考价值的专业报告</p>
      <div class="prompt-box card">
        <textarea
          v-model="prompt"
          class="prompt-input"
          rows="2"
          placeholder="请输入报告主题、研究对象或业务问题，系统将自动识别报告类型并生成写作任务"
        ></textarea>
        <div class="prompt-row">
          <button
            v-for="pill in pills"
            :key="pill.form"
            class="mode-pill"
            :class="{ active: selectedForm === pill.form }"
            @click="togglePill(pill.form)"
          >
            <span>{{ pill.label }}</span>
            <span class="report-tip"><strong>适用场景</strong><span>{{ pill.tip }}</span></span>
          </button>
          <span style="flex:1"></span>
          <details ref="templateDetails" class="filter-select template-select">
            <summary>{{ templateSummary }}</summary>
            <div class="select-menu template-menu">
              <label class="search template-search">
                <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
                <input v-model="templateSearch" placeholder="搜索模板名称、行业、场景" />
              </label>
              <button
                v-for="option in filteredTemplates"
                :key="option.label"
                :class="{ active: selectedTemplate === option.label }"
                @click="selectTemplate(option)"
              >{{ option.label }}</button>
            </div>
          </details>
          <button class="attach-btn" aria-label="上传资料" @click="ui.openModal('upload')">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 1 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <button class="send-btn" aria-label="开始生成" @click="startFlow">
            <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </div>

    <section class="section home-report-section">
      <div class="section-head">
        <h3 style="margin-bottom:0;">我的报告</h3>
        <button class="link-btn" @click="router.push({ name: 'documents' })">查看所有 ›</button>
      </div>
      <div class="mini-report-grid">
        <MiniReportCard
          v-for="(report, index) in HOME_MY_REPORTS"
          :key="index"
          :report="report"
          @click="goMini(report)"
        />
      </div>

      <div class="section-head" style="margin-top:26px;margin-bottom:10px;">
        <div class="source-tabs">
          <button :class="{ active: sourceTab === 'creation' }" @click="sourceTab = 'creation'">创作案例</button>
          <button :class="{ active: sourceTab === 'library' }" @click="sourceTab = 'library'">研报库</button>
        </div>
        <button class="link-btn" @click="openCaseLibrary">查看所有 ›</button>
      </div>

      <div class="industry-tabs">
        <button
          v-for="industry in HOME_INDUSTRIES"
          :key="industry.key"
          class="filter-chip"
          :class="{ active: activeIndustry === industry.key }"
          @click="activeIndustry = industry.key"
        >{{ industry.label }}</button>
      </div>

      <div class="creative-grid" v-show="sourceTab === 'creation'">
        <ShowcaseCard
          v-for="card in HOME_CREATION_CARDS"
          :key="card.title"
          :card="card"
          @click="goShowcase(card, 'creation')"
        />
      </div>

      <div class="creative-grid" v-show="sourceTab === 'library'">
        <ShowcaseCard
          v-for="card in HOME_LIBRARY_CARDS"
          :key="card.title"
          :card="card"
          @click="goShowcase(card, 'library')"
        />
      </div>
    </section>
  </section>
</template>
