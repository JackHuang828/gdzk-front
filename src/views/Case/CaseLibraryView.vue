<script setup>
// 案例广场（caseLibrary）：研究报告 / 战略咨询报告 / 洞察报告 / 研报库 四面板。
// 面板由路由 query.type 驱动（对应引擎 setCaseType）；交互复刻 engine.js 案例区：
// 全局搜索、行业 tab、指标收展与详情 Modal、图例/数据点筛选、网格/列表切换、分页。
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import CaseCard from '../../components/cases/CaseCard.vue';
import PaginationBar from '../../components/cases/PaginationBar.vue';
import InsightCharts from '../../components/cases/InsightCharts.vue';
import {
  RESEARCH_CASES,
  STRATEGY_CASES,
  INSIGHT_CASES,
  CUSTOM_CASES,
  CASE_TOTALS,
  CASE_PAGE_COUNTS,
  CASE_PAGE_META,
  STRATEGY_INDUSTRIES,
  RESEARCH_INDUSTRIES,
  INSIGHT_STATIC_METRICS,
  cardMatchesIndustry,
  resolveIndustryFromTag
} from '../../data/cases';
import { getInsightMetricData, getStrategyMetricData, metricTone } from '../../data/metrics';

const route = useRoute();
const router = useRouter();
const ui = useUiStore();

// ---- 面板切换（route query.type）----
const VALID_PANELS = ['research', 'strategy', 'insight', 'custom'];
const panel = computed(() => {
  const type = String(route.query.type || 'research');
  return VALID_PANELS.includes(type) ? type : 'research';
});
const pageMeta = computed(() => CASE_PAGE_META[panel.value]);

function goHomeForStrategy() {
  // 原型 data-view="home" data-default-form="strategyForm"
  router.push({ name: 'home', query: { form: 'strategyForm' } });
}

// ---- 网格 / 列表视图 ----
const viewModes = reactive({ research: 'grid', strategy: 'grid', insight: 'grid', custom: 'grid' });
const listHead = ['报告名称', '报告类型', '关键数据', '核心内容', '操作'];

// ---- 搜索 ----
const globalKeyword = ref(''); // 全局搜索（原型作用于所有面板卡片）
const insightKeyword = ref(''); // 洞察面板独立搜索

// 各面板卡片全文（小写化，用于关键词隐藏判断，对应引擎 card.textContent 匹配）
function cardText(card, type) {
  if (type === 'research') {
    return [card.reportType, card.title, card.authorVersion, card.publishData, card.keywords, ...card.tags].join(' ');
  }
  if (type === 'strategy') {
    return [card.reportType, card.title, card.agency, card.keywords, card.publishData, ...card.tags].join(' ');
  }
  if (type === 'insight') {
    return [card.reportType, card.title, card.status, card.updateTime, card.summary, ...card.tags].join(' ');
  }
  return [card.reportType, card.title, card.publisher, card.updateTime, card.scope, ...card.tags].join(' ');
}

function isSearchHidden(card, type, extraKeyword = '') {
  const text = cardText(card, type).toLowerCase();
  const global = globalKeyword.value.trim().toLowerCase();
  const extra = extraKeyword.trim().toLowerCase();
  return !!(global && !text.includes(global)) || !!(extra && !text.includes(extra));
}

// ---- 行业 tab / 筛选 ----
const researchIndustry = ref('全部'); // 研究面板 tab：仅高亮（与引擎一致，不过滤）
const researchTagFilter = ref(null); // { tag, industry } 研究卡标签筛选

function onResearchTagClick(card, tagText) {
  const industry = resolveIndustryFromTag(tagText);
  researchTagFilter.value = { tag: tagText, industry };
  ui.showToast(`已按“${tagText}”标签筛选研究报告`);
}

function researchCardFilterClass(card) {
  const filter = researchTagFilter.value;
  if (!filter) return {};
  const text = cardText(card, 'research');
  return {
    'industry-filtered': !cardMatchesIndustry(text, filter.industry),
    'tag-filtered': !card.tags.includes(filter.tag)
  };
}

const insightIndustry = ref('全部');

function onInsightTabClick(industry) {
  insightIndustry.value = industry;
  insightMetricsActive.value = true;
  insightMetricsOpen.value = true;
  ui.showToast(`已切换为“${industry}”洞察指标`);
}

function insightCardFilterClass(card) {
  if (insightIndustry.value === '全部') return {};
  const text = cardText(card, 'insight');
  return { 'industry-filtered': !cardMatchesIndustry(text, insightIndustry.value) };
}

// ---- 战略面板：chips / 标签筛选 / 指标 ----
const strategyChipActive = ref('全部'); // 引擎中 chips 仅高亮
const strategyTagFilter = ref(null); // { tag, industry }
const strategyMetricIndustry = ref('全部'); // 指标块数据行业（标签筛选时刷新）

function onStrategyChipClick(chip) {
  strategyChipActive.value = chip;
}

function onStrategyTagClick(card, tagText) {
  const mapped = resolveIndustryFromTag(tagText);
  strategyTagFilter.value = { tag: tagText, industry: mapped };
  strategyChipActive.value = mapped;
  strategyMetricIndustry.value = mapped;
  ui.showToast(`已将“${tagText}”归入“${mapped}”并筛选战略咨询报告`);
}

function strategyCardFilterClass(card) {
  const filter = strategyTagFilter.value;
  if (!filter) return {};
  const text = cardText(card, 'strategy');
  return {
    'industry-filtered': !cardMatchesIndustry(text, filter.industry),
    'tag-filtered': !card.tags.includes(filter.tag)
  };
}

const strategyMetrics = computed(() => getStrategyMetricData(strategyMetricIndustry.value).metrics);

function openStrategyMetric(metric) {
  const industry = strategyMetricIndustry.value;
  ui.openModal('insightMetricDetail', {
    metric,
    contextLabel: `${industry} / ${metric.label}`,
    desc: `${industry}战略咨询成果列表的指标构成、历史趋势与详细分析。`
  });
}

// ---- 洞察面板：指标收展 / 指标详情 ----
const insightMetricsActive = ref(false); // 行业 tab 点击后由静态 div 切换为可点按钮
const insightMetricsOpen = ref(false); // 引擎初始收起（aria-expanded=false）
const insightMetrics = computed(() => getInsightMetricData(insightIndustry.value));

function toggleInsightMetrics() {
  insightMetricsOpen.value = !insightMetricsOpen.value;
}

function toggleStrategyMetrics() {
  strategyMetricsOpen.value = !strategyMetricsOpen.value;
}

const strategyMetricsOpen = ref(true); // 引擎初始展开（aria-expanded=true）

function openInsightMetric(metric) {
  const industry = insightIndustry.value;
  ui.openModal('insightMetricDetail', {
    metric,
    contextLabel: `${industry} / ${metric.label}`,
    desc: `${industry}领域的历史趋势、构成分析与详细解读。`
  });
}

function onInsightPointSearch(keyword) {
  insightKeyword.value = keyword;
  ui.showToast(`已按“${keyword}”筛选洞察报告列表`);
}

// ---- 卡片跳转 / 下载 ----
function openCard(card, type) {
  if (type === 'strategy') {
    router.push({ name: 'strategyDetail' });
    return;
  }
  if (type === 'insight') {
    router.push({ name: 'insightDetail' });
    return;
  }
  // research / custom 卡均进研究报告详情；研报库卡带 source=library（引擎 data-report-source）
  const source = type === 'custom' ? 'library' : 'case';
  router.push({ name: 'researchDetail', query: { source } });
}

function openDownload(title, reportType) {
  ui.openModal('downloadFormat', { title, isInsight: reportType === '洞察报告' });
}
</script>

<template>
  <section id="caseLibrary" class="view active" :class="{ 'case-library-custom-title': panel === 'custom' }">
    <div class="page-title centered" style="margin-bottom:12px;">
      <h1>{{ pageMeta.title }}</h1>
      <p class="case-page-subtitle" :class="{ hidden: !pageMeta.subtitle }">{{ pageMeta.subtitle }}</p>
      <button v-if="panel === 'strategy'" class="primary-btn case-create-strategy-btn" type="button" @click="goHomeForStrategy">生成战略报告</button>
    </div>

    <!-- 全局搜索（原型仅研究面板显示，但过滤作用于所有面板卡片） -->
    <div class="case-search-row" :class="{ hidden: panel !== 'research' }">
      <label class="search">
        <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
        <input v-model="globalKeyword" placeholder="搜索标题、作者、摘要、正文或标签" />
      </label>
    </div>

    <!-- 研究报告面板 -->
    <section v-show="panel === 'research'" class="case-grid" data-case-panel="research" :class="{ 'case-list-view': viewModes.research === 'list' }">
      <div class="category-tabs" style="margin:8px 0 24px;">
        <span class="muted">热门行业</span>
        <button
          v-for="industry in RESEARCH_INDUSTRIES"
          :key="industry"
          type="button"
          :class="{ active: researchIndustry === industry }"
          @click="researchIndustry = industry"
        >{{ industry }}</button>
      </div>
      <div class="library-filters card">
        <div class="filter-line">
          <label class="search" style="max-width:360px;">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
            <input placeholder="搜索报告标题、全文关键词" />
          </label>
          <span class="help-tip case-search-info" tabindex="0" aria-label="报告内容索引与语义检索">ⓘ<span>报告内容索引与语义检索：系统将报告标题、摘要、关键词与正文内容转换为语义向量，并结合标签倒排索引进行召回与排序，优先展示语义相关度最高的报告。</span></span>
          <details class="filter-select">
            <summary>更新时间：近一年</summary>
            <div class="select-menu">
              <button class="active">近一年</button>
              <button>近半年</button>
              <button>近三个月</button>
              <button>2026年</button>
              <button>2025年</button>
            </div>
          </details>
        </div>
      </div>

      <div class="toolbar-line case-view-row">
        <h2>搜索结果</h2>
        <div class="case-view-toggle">
          <button type="button" :class="{ active: viewModes.research === 'grid' }" @click="viewModes.research = 'grid'">网格视图</button>
          <button type="button" :class="{ active: viewModes.research === 'list' }" @click="viewModes.research = 'list'">列表视图</button>
        </div>
      </div>
      <div class="grid-3">
        <div v-if="viewModes.research === 'list'" class="case-list-head">
          <span v-for="label in listHead" :key="label">{{ label }}</span>
        </div>
        <CaseCard
          v-for="(card, index) in RESEARCH_CASES"
          :key="card.title"
          v-show="!isSearchHidden(card, 'research')"
          :card="card"
          panel="research"
          :index="index"
          :list-mode="viewModes.research === 'list'"
          :class="researchCardFilterClass(card)"
          @open="openCard(card, 'research')"
          @tag="onResearchTagClick(card, $event)"
          @download="openDownload(card.title, '研究报告')"
        />
      </div>
      <PaginationBar :total="CASE_TOTALS.research" :pages="CASE_PAGE_COUNTS.research" />
    </section>

    <!-- 战略咨询报告面板 -->
    <section v-show="panel === 'strategy'" class="case-grid" data-case-panel="strategy" :class="{ 'case-list-view': viewModes.strategy === 'list' }">
      <div class="metrics-collapse-bar">
        <button
          class="metrics-collapse-button"
          type="button"
          :aria-expanded="String(strategyMetricsOpen)"
          :title="strategyMetricsOpen ? '收起关键指标' : '展开关键指标'"
          @click="toggleStrategyMetrics"
        >{{ strategyMetricsOpen ? '⌃' : '⌄' }}</button>
      </div>
      <div class="metric-grid" :class="{ hidden: !strategyMetricsOpen }">
        <button
          v-for="metric in strategyMetrics"
          :key="metric.key"
          type="button"
          class="metric"
          :class="metricTone(strategyMetrics.indexOf(metric))"
          @click="openStrategyMetric(metric)"
        >
          <small>{{ metric.label }}</small>
          <strong>{{ metric.value }}</strong>
          <em>{{ metric.note }}</em>
        </button>
      </div>

      <div class="case-search-row">
        <label class="search">
          <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
          <input placeholder="搜索报告标题、全文关键词" />
        </label>
      </div>
      <div class="library-filters card">
        <div class="filter-line">
          <strong>热门行业</strong>
          <button
            v-for="chip in STRATEGY_INDUSTRIES"
            :key="chip"
            type="button"
            class="filter-chip"
            :class="{ active: strategyChipActive === chip }"
            @click="onStrategyChipClick(chip)"
          >{{ chip }}</button>
        </div>
        <div class="filter-line">
          <label class="search" style="max-width:360px;">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
            <input placeholder="搜索标题、委托机构、摘要、标签" />
          </label>
          <details class="filter-select">
            <summary>更新时间：近一年</summary>
            <div class="select-menu">
              <button class="active">近一年</button>
              <button>近半年</button>
              <button>近三个月</button>
              <button>2026年</button>
              <button>2025年</button>
            </div>
          </details>
          <details class="filter-select">
            <summary>排序：最新优先</summary>
            <div class="select-menu">
              <button class="active">最新优先</button>
              <button>最早优先</button>
              <button>浏览量优先</button>
              <button>评分优先</button>
            </div>
          </details>
        </div>
      </div>

      <div class="toolbar-line case-view-row">
        <h2>战略咨询成果案例 <span class="muted" style="font-size:14px;">共 128 项</span></h2>
        <div class="case-view-toggle">
          <button type="button" :class="{ active: viewModes.strategy === 'grid' }" @click="viewModes.strategy = 'grid'">网格视图</button>
          <button type="button" :class="{ active: viewModes.strategy === 'list' }" @click="viewModes.strategy = 'list'">列表视图</button>
        </div>
      </div>
      <div class="grid-4">
        <div v-if="viewModes.strategy === 'list'" class="case-list-head">
          <span v-for="label in listHead" :key="label">{{ label }}</span>
        </div>
        <CaseCard
          v-for="card in STRATEGY_CASES"
          :key="card.title"
          v-show="!isSearchHidden(card, 'strategy')"
          :card="card"
          panel="strategy"
          :list-mode="viewModes.strategy === 'list'"
          :class="strategyCardFilterClass(card)"
          @open="openCard(card, 'strategy')"
          @tag="onStrategyTagClick(card, $event)"
          @download="openDownload(card.title, '战略咨询报告')"
        />
      </div>
      <PaginationBar :total="CASE_TOTALS.strategy" :pages="CASE_PAGE_COUNTS.strategy" />
    </section>

    <!-- 洞察报告面板 -->
    <section v-show="panel === 'insight'" class="case-grid" data-case-panel="insight" :class="{ 'case-list-view': viewModes.insight === 'list' }">
      <div class="metrics-collapse-bar">
        <button
          class="metrics-collapse-button"
          type="button"
          :aria-expanded="String(insightMetricsOpen)"
          :title="insightMetricsOpen ? '收起关键指标' : '展开关键指标'"
          @click="toggleInsightMetrics"
        >{{ insightMetricsOpen ? '⌃' : '⌄' }}</button>
      </div>
      <div class="metric-grid" :class="{ hidden: !insightMetricsOpen }">
        <template v-if="!insightMetricsActive">
          <div v-for="(metric, index) in INSIGHT_STATIC_METRICS" :key="metric.label" class="metric" :class="metricTone(index)">
            <small>{{ metric.label }}</small>
            <strong>{{ metric.value }}</strong>
          </div>
        </template>
        <template v-else>
          <button
            v-for="metric in insightMetrics.metrics"
            :key="metric.key"
            type="button"
            class="metric"
            :class="metricTone(insightMetrics.metrics.indexOf(metric))"
            @click="openInsightMetric(metric)"
          >
            <small>{{ metric.label }}</small>
            <strong>{{ metric.value }}</strong>
            <em>{{ metric.note }}</em>
          </button>
        </template>
      </div>

      <InsightCharts @search="onInsightPointSearch" />

      <div class="category-tabs" style="margin:8px 0 24px;">
        <span class="muted">热门行业</span>
        <button
          v-for="industry in RESEARCH_INDUSTRIES"
          :key="industry"
          type="button"
          :class="{ active: insightIndustry === industry }"
          @click="onInsightTabClick(industry)"
        >{{ industry }}</button>
      </div>
      <div class="library-filters card">
        <div class="filter-line">
          <label class="search" style="max-width:360px;">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
            <input v-model="insightKeyword" placeholder="搜索报告标题、全文关键词" />
          </label>
          <details class="filter-select">
            <summary>更新时间：近一年</summary>
            <div class="select-menu">
              <button class="active">近一年</button>
              <button>近半年</button>
              <button>近三个月</button>
              <button>2026年</button>
              <button>2025年</button>
            </div>
          </details>
        </div>
      </div>

      <div class="toolbar-line case-view-row">
        <h2>洞察报告列表 <span class="muted" style="font-size:14px;">共 64 项</span></h2>
        <div class="case-view-toggle">
          <button type="button" :class="{ active: viewModes.insight === 'grid' }" @click="viewModes.insight = 'grid'">网格视图</button>
          <button type="button" :class="{ active: viewModes.insight === 'list' }" @click="viewModes.insight = 'list'">列表视图</button>
        </div>
      </div>
      <div class="grid-3">
        <div v-if="viewModes.insight === 'list'" class="case-list-head">
          <span v-for="label in listHead" :key="label">{{ label }}</span>
        </div>
        <CaseCard
          v-for="card in INSIGHT_CASES"
          :key="card.title"
          v-show="!isSearchHidden(card, 'insight', insightKeyword)"
          :card="card"
          panel="insight"
          :list-mode="viewModes.insight === 'list'"
          :class="insightCardFilterClass(card)"
          @open="openCard(card, 'insight')"
          @download="openDownload(card.title, '洞察报告')"
        />
      </div>
      <PaginationBar :total="CASE_TOTALS.insight" :pages="CASE_PAGE_COUNTS.insight" />
    </section>

    <!-- 研报库面板 -->
    <section v-show="panel === 'custom'" class="case-grid" data-case-panel="custom" :class="{ 'case-list-view': viewModes.custom === 'list' }">
      <div class="library-filters card">
        <div class="filter-line">
          <label class="search" style="max-width:420px;">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
            <input placeholder="搜索报告标题、全文关键词" />
          </label>
          <details class="filter-select">
            <summary>更新时间：近一年</summary>
            <div class="select-menu">
              <button class="active">近一年</button>
              <button>近半年</button>
              <button>近三个月</button>
              <button>2026年</button>
              <button>2025年</button>
            </div>
          </details>
          <details class="filter-select">
            <summary>排序：最新优先</summary>
            <div class="select-menu">
              <button class="active">最新优先</button>
              <button>下载量优先</button>
              <button>浏览量优先</button>
              <button>评分优先</button>
            </div>
          </details>
        </div>
      </div>

      <div class="toolbar-line case-view-row">
        <h2>研报库 <span class="muted" style="font-size:14px;">共 36 项</span></h2>
        <div class="case-view-toggle">
          <button type="button" :class="{ active: viewModes.custom === 'grid' }" @click="viewModes.custom = 'grid'">网格视图</button>
          <button type="button" :class="{ active: viewModes.custom === 'list' }" @click="viewModes.custom = 'list'">列表视图</button>
        </div>
      </div>
      <div class="grid-3">
        <div v-if="viewModes.custom === 'list'" class="case-list-head">
          <span v-for="label in listHead" :key="label">{{ label }}</span>
        </div>
        <CaseCard
          v-for="card in CUSTOM_CASES"
          :key="card.title"
          v-show="!isSearchHidden(card, 'custom')"
          :card="card"
          panel="custom"
          :list-mode="viewModes.custom === 'list'"
          @open="openCard(card, 'custom')"
          @download="openDownload(card.title, '研报库')"
        />
      </div>
      <PaginationBar :total="CASE_TOTALS.custom" :pages="CASE_PAGE_COUNTS.custom" />
    </section>
  </section>
</template>
