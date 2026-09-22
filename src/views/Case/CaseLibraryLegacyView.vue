<script setup>
// 旧版报告库页（caseLibraryLegacy）：静态还原原型 HTML 第 1662-1737 行。
// 交互复刻引擎：subtabs 切换三个面板（标题联动 secondary-btn/ghost-btn 样式）、
// 行业 chips 高亮、排序切换（sort-switch + toast）、卡片跳转。
// 注意：原型中旧版研究卡无 report-type 徽章，引擎路由修正不生效 → 仍跳战略详情（1:1 忠实还原）。
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';

const router = useRouter();
const ui = useUiStore();

// subtabs（初始 strategy 激活，对应原型 data-case-panel 分布）
const LEGACY_TABS = [
  { key: 'research', label: '研究报告', title: '研究报告案例', total: 96 },
  { key: 'strategy', label: '战略咨询报告', title: '战略咨询成果案例', total: 128 },
  { key: 'insight', label: '洞察报告', title: '洞察报告案例', total: 64 }
];
const activeTab = ref('strategy');
const activeTabMeta = () => LEGACY_TABS.find(tab => tab.key === activeTab.value);

function setTab(key) {
  activeTab.value = key;
}

// 行业 chips（仅高亮，与引擎通用 filter-chip 行为一致）
const LEGACY_INDUSTRIES = ['全部', '人工智能', '新能源', '低空经济', '半导体', '生物医药', '量子计算', '具身智能'];
const activeIndustry = ref('全部');

// 排序切换（发布时间 / 下载量，引擎 2599-2608 行）
const sortOptions = ['发布时间', '下载量'];
const activeSort = ref(0);

function pickSort(index) {
  activeSort.value = index;
  ui.showToast(`已按${sortOptions[index]}排序`);
}

function cycleSort(step) {
  pickSort((activeSort.value + step + sortOptions.length) % sortOptions.length);
}

// 旧版卡片数据（原型 HTML 第 1718-1735 行静态转录）
const legacyStrategyCards = [
  { title: '低空经济监管平台建设', org: '委托机构：深圳市发改委', summary: '摘要：构建城市级低空运行监管体系', metrics: '投资额12.8亿 · ROI21% · 满意度98', actions: ['低空经济', '监管', '查看详情'], target: 'strategyDetail' },
  { title: 'V2G产业化示范路径', org: '委托机构：能源集团', summary: '摘要：车网互动商业化和收益机制设计', metrics: '投资额9.6亿 · ROI18% · 满意度97', actions: ['V2G', '电网', '查看详情'], target: 'strategyDetail' },
  { title: '量子计算招商策略', org: '委托机构：前沿技术局', summary: '摘要：产业链招商与基金导入路径', metrics: '投资额8.2亿 · ROI19% · 满意度96', actions: ['量子计算', '招商', '查看详情'], target: 'strategyDetail' },
  { title: '具身智能产业生态建设', org: '委托机构：科创集团', summary: '摘要：机器人产业链与应用场景布局', metrics: '投资额6.4亿 · ROI17% · 满意度95', actions: ['机器人', '产业链', '查看详情'], target: 'strategyDetail' },
  { title: '低空物流商业化路径', org: '委托机构：交通集团', summary: '摘要：物流场景试点和投融资方案', metrics: '投资额5.9亿 · ROI16% · 满意度94', actions: ['低空物流', '投融资', '查看详情'], target: 'strategyDetail' },
  { title: '新能源材料区域布局', org: '委托机构：产业园区', summary: '摘要：材料产业招商与区域分工', metrics: '投资额4.8亿 · ROI15% · 满意度93', actions: ['新能源', '材料', '查看详情'], target: 'strategyDetail' }
];
const legacyResearchCards = [
  { title: '低空经济政策环境研究', org: '研究机构：产业研究组', summary: '摘要：政策信号、产业链结构与市场空间测算', metrics: '图表12 · 引用38 · 评分93', actions: ['低空经济', '产业研究', '查看详情'], target: 'strategyDetail' },
  { title: '人工智能硬件产业链研究', org: '研究机构：AI组', summary: '摘要：芯片、传感器、整机与场景应用梳理', metrics: '图表18 · 引用45 · 评分91', actions: ['AI硬件', '产业链', '查看详情'], target: 'strategyDetail' },
  { title: '新能源材料区域分布研究', org: '研究机构：宏观研究组', summary: '摘要：区域分工、产能趋势与重点企业分布', metrics: '图表15 · 引用31 · 评分92', actions: ['新能源', '材料', '查看详情'], target: 'strategyDetail' },
  { title: '生物医药创新管线研究', org: '研究机构：生命科学组', summary: '摘要：研发管线、资本事件与区域集群', metrics: '图表16 · 引用42 · 评分90', actions: ['生物医药', '创新', '查看详情'], target: 'strategyDetail' }
];
const legacyInsightCards = [
  { title: '低空经济洞察月刊', org: '更新时间：2026-05-18', summary: '简介：政策信号、城市试点、趋势图表', metrics: '订阅2380 · 图表12 · 指标对比6', actions: ['查看详情 / 下载'], target: 'insightDetail' },
  { title: 'V2G试点城市趋势跟踪', org: '更新时间：2026-05-14', summary: '简介：指标对比、时间序列、城市排行', metrics: '推送覆盖8.6k · 新增指标12', actions: ['查看详情 / 下载'], target: 'insightDetail' },
  { title: '人工智能硬件洞察月刊', org: '更新时间：2026-05-12', summary: '简介：专利增长、企业图谱、投资变化', metrics: '订阅1680 · 图表20 · 指标9', actions: ['查看详情 / 下载'], target: 'insightDetail' },
  { title: '新材料产业链月度洞察', org: '状态：已发布', summary: '简介：新材料产业的高端供给缺口仍然突出，政策与专利热点正共同推动国产替代。', metrics: '更新时间：2026-05-09', actions: ['查看详情 / 下载'], target: 'insightDetail' }
];

const LEGACY_METRICS = [
  { tone: 'blue', label: '总成果数', value: '128', action: '筛选下方结果' },
  { tone: 'green', label: '总投资额', value: '86.4亿', action: '筛选高投资案例' },
  { tone: 'amber', label: '平均投资回报率', value: '18.6%', action: '筛选高ROI案例' },
  { tone: 'violet', label: '客户满意度', value: '96分', action: '筛选高满意度案例' }
];

// 卡片跳转（旧版研究卡在原型中同样进入战略详情）
function openCard(card) {
  router.push({ name: card.target });
}
</script>

<template>
  <section class="view" id="caseLibraryLegacy">
    <div class="page-title centered">
      <h1>报告库</h1>
    </div>
    <div class="subtabs" style="justify-content:flex-start;">
      <button
        v-for="tab in LEGACY_TABS"
        :key="tab.key"
        type="button"
        :class="activeTab === tab.key ? 'secondary-btn' : 'ghost-btn'"
        @click="setTab(tab.key)"
      >{{ tab.label }}</button>
    </div>
    <h2>关键指标概览</h2>
    <div class="metric-grid">
      <div v-for="metric in LEGACY_METRICS" :key="metric.label" class="metric" :class="metric.tone">
        <small>{{ metric.label }}</small>
        <strong>{{ metric.value }}</strong>
        <button class="link-btn" type="button">{{ metric.action }}</button>
      </div>
    </div>

    <div class="library-filters card">
      <div class="search-row" style="margin-bottom:0;">
        <h3 style="margin-bottom:0;">搜索与筛选</h3>
        <label class="search">
          <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
          <input placeholder="搜索标题、委托机构、摘要、标签" />
        </label>
      </div>
      <div class="filter-line">
        <strong>热门行业</strong>
        <button
          v-for="industry in LEGACY_INDUSTRIES"
          :key="industry"
          type="button"
          class="filter-chip"
          :class="{ active: activeIndustry === industry }"
          @click="activeIndustry = industry"
        >{{ industry }}</button>
      </div>
      <div class="filter-line">
        <label class="search" style="max-width:360px;">
          <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
          <input placeholder="搜索标题、委托机构、摘要、标签" />
        </label>
        <span>更新时间：近一年⌄</span>
        <span>排序：最新优先⌄</span>
      </div>
    </div>

    <div class="toolbar-line">
      <h2>{{ activeTabMeta().title }} <span class="muted" style="font-size:14px;">共 {{ activeTabMeta().total }} 项</span></h2>
      <div class="sort-switch" aria-label="战略咨询报告排序方式">
        <span>排序</span>
        <button class="sort-arrow" type="button" aria-label="上一种排序" @click="cycleSort(-1)">‹</button>
        <span class="sort-options">
          <button
            v-for="(option, index) in sortOptions"
            :key="option"
            type="button"
            class="sort-option"
            :class="{ active: activeSort === index }"
            @click="pickSort(index)"
          >{{ option }}</button>
        </span>
        <button class="sort-arrow" type="button" aria-label="下一种排序" @click="cycleSort(1)">›</button>
      </div>
    </div>

    <div v-show="activeTab === 'strategy'" class="grid-4 grid-3 case-grid" data-case-panel="strategy">
      <button v-for="card in legacyStrategyCards" :key="card.title" type="button" class="case-card" @click="openCard(card)">
        <h3>{{ card.title }}</h3>
        <p><span class="link-btn">{{ card.org }}</span></p>
        <p class="muted">{{ card.summary }}</p>
        <p class="muted">{{ card.metrics }}</p>
        <div class="actions">{{ card.actions.join('　') }}</div>
      </button>
    </div>
    <div v-show="activeTab === 'research'" class="grid-4 grid-3 case-grid" data-case-panel="research">
      <button v-for="card in legacyResearchCards" :key="card.title" type="button" class="case-card" @click="openCard(card)">
        <h3>{{ card.title }}</h3>
        <p><span class="link-btn">{{ card.org }}</span></p>
        <p class="muted">{{ card.summary }}</p>
        <p class="muted">{{ card.metrics }}</p>
        <div class="actions">{{ card.actions.join('　') }}</div>
      </button>
    </div>
    <div v-show="activeTab === 'insight'" class="grid-4 grid-3 case-grid" data-case-panel="insight">
      <button v-for="card in legacyInsightCards" :key="card.title" type="button" class="case-card" @click="openCard(card)">
        <h3>{{ card.title }}</h3>
        <p><span class="link-btn">{{ card.org }}</span></p>
        <p class="muted">{{ card.summary }}</p>
        <p class="muted">{{ card.metrics }}</p>
        <div class="actions">{{ card.actions.join('　') }}</div>
      </button>
    </div>
  </section>
</template>
