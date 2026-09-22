<script setup>
// 热点分析（hotspotAnalysis）：概览仪表盘 + 领域分布 + 趋势分析 + 主题聚合 + 投融资分布 + 行业对比。
// 交互对应原型 engine.js：updateHotspotKpiTrend（KPI 联动趋势）、data-hotspot-legend（系列显隐）、
// setHotspotPopover（数据点/曲线/气泡弹层）、data-hotspot-range（时间轴峰值联动）、
// renderRegionEventPopover（地区事件弹层）、renderCompareTopicPicker / renderHotspotCompare（对比）。
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import {
  HOTSPOT_KPIS, HOTSPOT_TREND_MONTHS, FIELD_SHARES, FIELD_SHARE_TOTAL, FIELD_GROWTH_LINES,
  FIELD_GROWTH_SUMMARY, FIELD_FILTER_CHIPS, TREND_DIMENSION_OPTIONS, TREND_TECH_OPTIONS,
  TREND_SERIES, TREND_MONTH_LABELS, getHotspotPeak, HEATMAP_CELLS, HOTSPOT_BUBBLES,
  HOTSPOT_TOPICS, HOTSPOT_REGIONS, REGION_STATS, REGION_FILTER_OPTIONS,
  HOTSPOT_INVESTMENT_EVENTS, buildRegionOverview, COMPARE_FILTER_OPTIONS, HOTSPOT_COMPARE_TOPICS
} from '../../data/hotspot';

const router = useRouter();
const ui = useUiStore();

/* ===== 概览仪表盘：KPI 联动趋势折线 ===== */
const activeKpi = ref(HOTSPOT_KPIS[0].label);
const kpiTrend = ref({ points: HOTSPOT_KPIS[0].trend, title: HOTSPOT_KPIS[0].trendTitle });

function pickKpi(kpi) {
  activeKpi.value = kpi.label;
  kpiTrend.value = { points: kpi.trend, title: kpi.trendTitle };
  if (kpi.jump === 'fieldDistribution') {
    router.push({ name: 'hotspotFieldDistributionPage' });
    ui.showToast('已跳转至技术领域热点分布页');
  } else {
    ui.showToast(`已展开“${kpi.label}”详细趋势`);
  }
}

/* ===== 筛选 chips（领域分布 / 主题排序）：仅高亮 + toast ===== */
const activeFieldChip = ref(FIELD_FILTER_CHIPS[0]);
function pickFieldChip(chip) {
  activeFieldChip.value = chip;
  ui.showToast(`已应用筛选：${chip}`);
}
const activeTopicSort = ref('hot');
function pickTopicSort(key, label) {
  activeTopicSort.value = key;
  ui.showToast(`已${label}`);
}

/* ===== 趋势分析：图例显隐 / 数据点弹层 / 时间轴联动 ===== */
const mutedSeries = ref(new Set());
function toggleLegend(key) {
  const next = new Set(mutedSeries.value);
  if (next.has(key)) {
    next.delete(key);
    ui.showToast('已显示该热点数据系列');
  } else {
    next.add(key);
    ui.showToast('已隐藏该热点数据系列');
  }
  mutedSeries.value = next;
}

// 数据点 / 曲线弹层（锚定在折线图卡片内，坐标对齐引擎 setHotspotPopover 算法）
const trendChartCard = ref(null);
const chartPopover = ref(null); // { title, lines, left, top }
function openDetailPopover(event, rawText, extraToast) {
  const host = trendChartCard.value;
  const anchor = event.currentTarget;
  if (!host || !anchor) return;
  const parts = String(rawText || '').split('|').filter(Boolean);
  const hostRect = host.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const left = Math.min(Math.max(anchorRect.left - hostRect.left + anchorRect.width + 10, 10), Math.max(hostRect.width - 280, 10));
  const top = Math.min(Math.max(anchorRect.top - hostRect.top - 18, 10), Math.max(hostRect.height - 150, 10));
  chartPopover.value = { title: parts[0] || '热点详情', lines: parts.slice(1), left, top };
  if (extraToast) ui.showToast(extraToast);
}

const rangeMonths = ref(4);
const peak = ref(getHotspotPeak(4));
function onRangeInput() {
  peak.value = getHotspotPeak(rangeMonths.value);
  ui.showToast('热点趋势已按时间轴刷新');
}

/* ===== 投融资分布：地区筛选 + 地区事件弹层 ===== */
const regionFilters = reactive({
  stage: REGION_FILTER_OPTIONS.stage[0],
  field: REGION_FILTER_OPTIONS.field[0],
  time: REGION_FILTER_OPTIONS.time[0]
});
const regionStatList = ref([...REGION_STATS]);
function onRegionFilterChange() {
  regionStatList.value = [
    { title: '筛选结果', text: `${regionFilters.stage} · ${regionFilters.field} · ${regionFilters.time}` },
    { title: '投资事件', text: '筛选后匹配 12 起事件，重点集中在上海、深圳、北京三地。' },
    { title: '金额区间', text: '主力区间为 1 亿-5 亿，相关技术方向以 AI 算力和低空经济为主。' }
  ];
  ui.showToast('投融资分布图与统计结果已刷新');
}

const mapCard = ref(null);
const regionPopover = ref(null); // { region, count, agencies, amounts, techs, events, left, top }
function openRegionPopover(event, region) {
  const host = mapCard.value;
  const anchor = event.currentTarget;
  if (!host || !anchor) return;
  const overview = buildRegionOverview(region.name);
  const hostRect = host.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const left = Math.min(Math.max(anchorRect.left - hostRect.left + anchorRect.width + 10, 10), Math.max(hostRect.width - 400, 10));
  const top = Math.min(Math.max(anchorRect.top - hostRect.top - 44, 10), Math.max(hostRect.height - 330, 10));
  regionPopover.value = {
    region: region.name,
    count: overview.count,
    agencies: overview.agencies,
    amounts: overview.amounts,
    techs: overview.techs,
    events: HOTSPOT_INVESTMENT_EVENTS[region.name] || [],
    left,
    top
  };
  ui.showToast(`已打开${region.name}投融资事件列表`);
}
function openInvestmentEvent(eventId) {
  ui.showToast('已进入具体投融资事件详情页');
  router.push({ name: 'hotspotInvestmentEventDetailPage', params: { id: eventId } });
}

/* ===== 行业对比：组合筛选 + 生成对比 ===== */
const compareFilters = reactive({
  industry: COMPARE_FILTER_OPTIONS.industry[0],
  tech: COMPARE_FILTER_OPTIONS.tech[0],
  period: COMPARE_FILTER_OPTIONS.period[1],
  level: COMPARE_FILTER_OPTIONS.level[1]
});
// 原型初始态：匹配提示固定文案 + 2 个预选主题 + 3 条对比条
const comparePicker = ref([
  { name: 'AI算力基础设施', checked: true },
  { name: '量子计算工程化', checked: true }
]);
const compareNote = ref('已匹配 2 个可对比热点主题。');
const compareBars = ref([
  { name: 'AI算力基础设施', score: '91%', summary: '热度 91 · 投融资 5 起 · 媒体报道 128 篇' },
  { name: '量子计算工程化', score: '88%', summary: '热度 88 · 投融资 4 起 · 专利增长 22%' },
  { name: '低空经济城市试点', score: '84%', summary: '热度 84 · 试点城市 12 个 · 政策事件 9 起' }
]);
const compareResult = ref('当前对比视图展示热点强度、资本活跃度、技术成熟度和媒体传播强度，可作为报告导出内容。');
let compareTouched = false;

function filteredCompareTopics() {
  const pick = value => String(value || '').split('：')[1] || value;
  const industry = pick(compareFilters.industry);
  const tech = pick(compareFilters.tech);
  const period = pick(compareFilters.period);
  const level = pick(compareFilters.level);
  return HOTSPOT_COMPARE_TOPICS.filter(topic =>
    (!industry || industry === '全部' || topic.industry === industry) &&
    (!tech || tech === '全部' || topic.tech === tech) &&
    (!period || period === '全部' || topic.period.includes(period)) &&
    (!level || level === '全部' || topic.level === level)
  );
}

function onCompareFilterChange() {
  compareTouched = true;
  const topics = filteredCompareTopics();
  comparePicker.value = topics.map((topic, index) => ({ name: topic.name, checked: index < 2 }));
  compareNote.value = `已匹配 ${topics.length} 个可对比热点主题。`;
  const matched = topics.map(topic => topic.name).join('、') || '暂无匹配主题';
  compareBars.value = [];
  compareResult.value = `当前组合筛选匹配：${matched}。请选择两个或多个主题生成对比。`;
  ui.showToast('已按组合筛选更新可对比主题');
}

function generateCompare() {
  const checked = comparePicker.value.filter(item => item.checked).map(item => item.name);
  if (checked.length < 2) {
    ui.showToast('请至少选择两个热点主题进行对比');
    return;
  }
  const scoreMap = Object.fromEntries(HOTSPOT_COMPARE_TOPICS.map(topic => [topic.name, [topic.score, topic.summary]]));
  compareBars.value = checked.map(name => {
    const item = scoreMap[name] || ['72%', '热度 72 · 数据持续跟踪中'];
    return { name, score: item[0], summary: item[1] };
  });
  compareResult.value = `已生成 ${checked.join('、')} 的综合对比视图，可继续导出为 PDF 或 Excel 报告。`;
  ui.showToast('热点主题对比视图已生成');
}

function exportHotspot(format) {
  ui.showToast(`已模拟导出热点分析${format}报告`);
}

/* ===== 主题卡 → 主题详情页 ===== */
function openTopic(topic) {
  ui.showToast(`已进入“${topic.name}”主题详情`);
  router.push({ name: 'hotspotTopicDetailPage', params: { id: topic.name } });
}

// 点击弹层外部时关闭（对应引擎 4112 行的外点关闭逻辑）
function onDocumentClick(event) {
  if (!event.target.closest('.hotspot-popover, [data-hotspot-point], [data-hotspot-curve], [data-region]')) {
    chartPopover.value = null;
    regionPopover.value = null;
  }
}
onMounted(() => document.addEventListener('click', onDocumentClick));
onUnmounted(() => document.removeEventListener('click', onDocumentClick));
</script>

<template>
  <section class="view active" id="hotspotAnalysis">
    <div class="hotspot-shell">
      <div class="hotspot-hero">
        <div>
          <h1>热点分析</h1>
          <p>围绕产业热点、投融资事件、技术方向与媒体信号，形成可筛选、可对比、可追踪的热点分析工作台。</p>
        </div>
      </div>

      <!-- 热点概览仪表盘 -->
      <section class="hotspot-panel" id="hotspotDashboard">
        <div class="hotspot-panel-head">
          <div>
            <h2>热点概览仪表盘</h2>
            <p>近期热门主题总体态势，点击指标查看趋势；点击“技术领域热点数”跳转至热点分布。</p>
          </div>
        </div>
        <div class="hotspot-kpi-grid">
          <button
            v-for="kpi in HOTSPOT_KPIS"
            :key="kpi.label"
            type="button"
            class="hotspot-kpi"
            :class="{ active: activeKpi === kpi.label }"
            :data-hotspot-jump="kpi.jump || undefined"
            @click="pickKpi(kpi)"
          >
            <span>{{ kpi.label }}</span>
            <strong>{{ kpi.value }}</strong>
            <em>{{ kpi.note }}</em>
          </button>
        </div>
        <div class="hotspot-detail-trend active" id="hotspotKpiTrend">
          <div class="hotspot-chart-title">
            <span>{{ kpiTrend.title }}</span>
            <span class="muted">近 6 期变化</span>
          </div>
          <svg class="hotspot-svg" viewBox="0 0 760 220" aria-label="指标趋势折线图">
            <line x1="50" y1="176" x2="720" y2="176" stroke="#e5ebf3"/>
            <line x1="50" y1="118" x2="720" y2="118" stroke="#e5ebf3"/>
            <line x1="50" y1="60" x2="720" y2="60" stroke="#e5ebf3"/>
            <polyline :points="kpiTrend.points" fill="none" stroke="#3158ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <g fill="#3158ff">
              <circle v-for="(p, index) in kpiTrend.points.split(' ')" :key="activeKpi + index" :cx="p.split(',')[0]" :cy="p.split(',')[1]" r="6"/>
            </g>
            <g fill="#667085" font-size="13">
              <text v-for="(month, index) in HOTSPOT_TREND_MONTHS" :key="month" :x="[58, 178, 298, 418, 538, 676][index]" y="202">{{ month }}</text>
            </g>
          </svg>
        </div>
      </section>

      <!-- 技术领域热点分布页（面板） -->
      <section class="hotspot-panel" id="hotspotFieldDistribution">
        <div class="hotspot-panel-head">
          <div>
            <h2>技术领域热点分布页</h2>
            <p>展示各技术领域热点的分布占比与增长趋势，区别于下方按地区展示的投融资热点分布图。</p>
          </div>
          <div class="hotspot-filter-bar">
            <button
              v-for="chip in FIELD_FILTER_CHIPS"
              :key="chip"
              type="button"
              class="hotspot-filter-chip"
              :class="{ active: activeFieldChip === chip }"
              @click="pickFieldChip(chip)"
            >{{ chip }}</button>
          </div>
        </div>
        <div class="field-distribution-grid">
          <div class="field-share-card">
            <div class="hotspot-chart-title">
              <span>各领域热点分布占比</span>
              <span class="muted">合计 {{ FIELD_SHARE_TOTAL }} 个热点</span>
            </div>
            <div class="field-donut" aria-label="技术领域热点分布饼图"></div>
            <div class="field-share-list">
              <div v-for="share in FIELD_SHARES" :key="share.name" class="field-share-row" :style="{ '--dot': share.color, '--share': share.share }">
                <strong><i></i>{{ share.name }}</strong><span></span><b>{{ share.share }}</b><em>{{ share.growth }}</em>
              </div>
            </div>
          </div>
          <div class="field-share-card">
            <div class="hotspot-chart-title">
              <span>各领域热点增长趋势</span>
              <span class="muted">近 6 期</span>
            </div>
            <svg class="hotspot-svg" viewBox="0 0 760 260" aria-label="技术领域热点增长趋势图">
              <line x1="54" y1="210" x2="720" y2="210" stroke="#e5ebf3"/>
              <line x1="54" y1="154" x2="720" y2="154" stroke="#e5ebf3"/>
              <line x1="54" y1="98" x2="720" y2="98" stroke="#e5ebf3"/>
              <line x1="54" y1="42" x2="720" y2="42" stroke="#e5ebf3"/>
              <polyline v-for="line in FIELD_GROWTH_LINES" :key="line.color" :points="line.points" fill="none" :stroke="line.color" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <g fill="#667085" font-size="13">
                <text v-for="(month, index) in ['1月', '2月', '3月', '4月', '5月', '本期']" :key="month" :x="[60, 168, 276, 384, 492, 682][index]" y="238">{{ month }}</text>
              </g>
            </svg>
            <div class="field-growth-summary">
              <div v-for="item in FIELD_GROWTH_SUMMARY" :key="item.title"><b>{{ item.title }}</b><br>{{ item.text }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 热点趋势分析区 -->
      <section class="hotspot-panel" id="hotspotTrend">
        <div class="hotspot-panel-head">
          <div>
            <h2>热点趋势分析区</h2>
            <p>按时间维度、行业类别与技术方向动态展示热点走势，支持折线图、热力图、气泡图示例。</p>
          </div>
          <div class="hotspot-filter-bar">
            <select v-model="TREND_DIMENSION" class="hotspot-select" data-hotspot-dimension @change="ui.showToast(`趋势分析维度已切换为：${TREND_DIMENSION}`)">
              <option v-for="option in TREND_DIMENSION_OPTIONS" :key="option">{{ option }}</option>
            </select>
            <select v-model="TREND_TECH" class="hotspot-select">
              <option v-for="option in TREND_TECH_OPTIONS" :key="option">{{ option }}</option>
            </select>
          </div>
        </div>
        <div class="hotspot-chart-grid">
          <div class="hotspot-chart-card" ref="trendChartCard" data-hotspot-chart>
            <div class="hotspot-chart-title">
              <span>多主题热点走势折线图</span>
              <div class="hotspot-legend">
                <button
                  v-for="series in TREND_SERIES"
                  :key="series.key"
                  type="button"
                  :style="{ '--legend-color': series.color }"
                  :class="{ 'is-muted': mutedSeries.has(series.key) }"
                  @click="toggleLegend(series.key)"
                >{{ series.label }}</button>
              </div>
            </div>
            <svg class="hotspot-svg" viewBox="0 0 760 260" aria-label="热点趋势折线图">
              <line x1="54" y1="210" x2="720" y2="210" stroke="#e5ebf3"/>
              <line x1="54" y1="154" x2="720" y2="154" stroke="#e5ebf3"/>
              <line x1="54" y1="98" x2="720" y2="98" stroke="#e5ebf3"/>
              <line x1="54" y1="42" x2="720" y2="42" stroke="#e5ebf3"/>
              <polyline
                v-for="series in TREND_SERIES"
                :key="series.key"
                class="hotspot-series"
                :class="{ 'is-hidden': mutedSeries.has(series.key) }"
                :points="series.points" fill="none" :stroke="series.color" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
              />
              <g v-for="series in TREND_SERIES" :key="series.key + '-points'" :class="{ 'is-hidden': mutedSeries.has(series.key) }" :fill="series.color">
                <circle
                  v-for="point in series.pointsDetail"
                  :key="point.text"
                  class="hotspot-point"
                  data-hotspot-point
                  :cx="point.x" :cy="point.y" r="7"
                  @click="openDetailPopover($event, point.text)"
                />
              </g>
              <g fill="#667085" font-size="13">
                <text v-for="(month, index) in TREND_MONTH_LABELS" :key="month" :x="[60, 168, 276, 384, 492, 600, 682][index]" y="238">{{ month }}</text>
              </g>
              <polyline
                v-for="series in TREND_SERIES"
                :key="series.key + '-curve'"
                class="hotspot-curve-target"
                :class="{ 'is-hidden': mutedSeries.has(series.key) }"
                data-hotspot-curve
                :points="series.points"
                @click="openDetailPopover($event, series.curve, '已打开热点曲线详细分析框')"
              />
            </svg>
            <div class="hotspot-time-row">
              <span>分析周期</span>
              <input v-model.number="rangeMonths" type="range" min="1" max="6" data-hotspot-range @input="onRangeInput">
              <span>近 {{ rangeMonths }} 个月，峰值集中在 {{ peak.peakLabel }}</span>
            </div>
            <div class="hotspot-peak-grid">
              <div><b>热度峰值时段</b><span>{{ peak.window }}</span></div>
              <div><b>峰值主题</b><span>{{ peak.topic }}</span></div>
              <div><b>触发原因</b><span>{{ peak.reason }}</span></div>
            </div>
            <div v-if="chartPopover" class="hotspot-popover" :style="{ left: chartPopover.left + 'px', top: chartPopover.top + 'px' }">
              <div class="hotspot-popover-head">
                <span>数据点详情</span>
                <button type="button" aria-label="关闭" @click.stop="chartPopover = null">×</button>
              </div>
              <b>{{ chartPopover.title }}</b>
              <div v-for="line in chartPopover.lines" :key="line">{{ line }}</div>
            </div>
          </div>

          <div class="hotspot-chart-card">
            <div class="hotspot-chart-title">
              <span>热力图 / 气泡图示例</span>
              <span class="muted">点击气泡查看详情</span>
            </div>
            <div class="heatmap" aria-label="热点热力图">
              <span v-for="(heat, index) in HEATMAP_CELLS" :key="index" :style="{ '--heat': heat }"></span>
            </div>
            <svg class="hotspot-svg" viewBox="0 0 420 210" aria-label="热点气泡图">
              <line x1="36" y1="176" x2="386" y2="176" stroke="#e5ebf3"/>
              <line x1="36" y1="176" x2="36" y2="28" stroke="#e5ebf3"/>
              <circle
                v-for="bubble in HOTSPOT_BUBBLES"
                :key="bubble.text"
                class="hotspot-bubble"
                data-hotspot-point
                :cx="bubble.x" :cy="bubble.y" :r="bubble.r" :fill="bubble.fill"
                @click="openDetailPopover($event, bubble.text)"
              />
              <text x="78" y="150" fill="#667085" font-size="12">影响范围</text>
              <text x="220" y="198" fill="#667085" font-size="12">传播强度</text>
            </svg>
          </div>
        </div>
      </section>

      <!-- 热点主题聚合区 -->
      <section class="hotspot-panel" id="hotspotTopics">
        <div class="hotspot-panel-head">
          <div>
            <h2>热点主题聚合区</h2>
            <p>系统自动聚合热点主题，支持按热度或时间排序，点击卡片进入主题详情。</p>
          </div>
          <div class="hotspot-filter-bar">
            <button type="button" class="hotspot-filter-chip" :class="{ active: activeTopicSort === 'hot' }" @click="pickTopicSort('hot', '按热度排序')">按热度排序</button>
            <button type="button" class="hotspot-filter-chip" :class="{ active: activeTopicSort === 'time' }" @click="pickTopicSort('time', '按时间排序')">按时间排序</button>
          </div>
        </div>
        <div class="topic-grid">
          <button v-for="topic in HOTSPOT_TOPICS" :key="topic.name" type="button" class="topic-card" @click="openTopic(topic)">
            <span class="topic-score">{{ topic.score }}</span>
            <h3>{{ topic.name }}</h3>
            <div class="keyword-cloud"><span v-for="keyword in topic.keywords" :key="keyword">{{ keyword }}</span></div>
            <div class="topic-meta">
              <span><b>代表技术方向</b> {{ topic.techDirection }}</span>
              <span><b>主要参与机构</b> {{ topic.agencies }}</span>
            </div>
          </button>
        </div>
      </section>

      <!-- 投融资热点分布图 -->
      <section class="hotspot-panel" id="hotspotDistribution">
        <div class="hotspot-panel-head">
          <div>
            <h2>投融资热点分布图</h2>
            <p>按地区展示投融资活跃度，筛选投资阶段、领域与时间范围后动态更新统计结果。</p>
          </div>
          <div class="hotspot-filter-bar">
            <select v-model="regionFilters.stage" class="hotspot-select" @change="onRegionFilterChange">
              <option v-for="option in REGION_FILTER_OPTIONS.stage" :key="option">{{ option }}</option>
            </select>
            <select v-model="regionFilters.field" class="hotspot-select" @change="onRegionFilterChange">
              <option v-for="option in REGION_FILTER_OPTIONS.field" :key="option">{{ option }}</option>
            </select>
            <select v-model="regionFilters.time" class="hotspot-select" @change="onRegionFilterChange">
              <option v-for="option in REGION_FILTER_OPTIONS.time" :key="option">{{ option }}</option>
            </select>
          </div>
        </div>
        <div class="distribution-grid">
          <div class="map-card" ref="mapCard">
            <button
              v-for="region in HOTSPOT_REGIONS"
              :key="region.name"
              type="button"
              class="hotspot-region-dot"
              data-region
              :style="{ '--x': region.x, '--y': region.y, '--size': region.size }"
              @click="openRegionPopover($event, region)"
            >{{ region.label }}</button>
            <div v-if="regionPopover" class="hotspot-popover hotspot-region-popover" :style="{ left: regionPopover.left + 'px', top: regionPopover.top + 'px' }">
              <div class="hotspot-popover-head">
                <span>区域投融资详情</span>
                <button type="button" aria-label="关闭" @click.stop="regionPopover = null">×</button>
              </div>
              <b>{{ regionPopover.region }}</b>
              <div>共 {{ regionPopover.count }} 条示例事件，点击可进入具体事件详情页。</div>
              <div class="region-overview">
                <div><b>投资机构</b><span>{{ regionPopover.agencies }}</span></div>
                <div><b>金额区间</b><span>{{ regionPopover.amounts }}</span></div>
                <div><b>技术方向</b><span>{{ regionPopover.techs }}</span></div>
              </div>
              <div class="region-event-list">
                <button
                  v-for="event in regionPopover.events"
                  :key="event.id"
                  type="button"
                  class="region-event-item"
                  @click="openInvestmentEvent(event.id)"
                >
                  <strong>{{ event.title }}</strong>
                  <span>查看详情</span>
                </button>
              </div>
            </div>
          </div>
          <div class="region-stat-list">
            <div v-for="stat in regionStatList" :key="stat.title"><b>{{ stat.title }}</b><br>{{ stat.text }}</div>
          </div>
        </div>
      </section>

      <!-- 行业维度筛选与对比区 -->
      <section class="hotspot-panel" id="hotspotCompare">
        <div class="hotspot-panel-head">
          <div>
            <h2>行业维度筛选与对比区</h2>
            <p>支持行业类别、技术方向、时间周期、热度等级组合筛选，并生成多个热点主题的横向对比视图。</p>
          </div>
        </div>
        <div class="compare-filter-grid">
          <select v-model="compareFilters.industry" class="hotspot-select" @change="onCompareFilterChange">
            <option v-for="option in COMPARE_FILTER_OPTIONS.industry" :key="option">{{ option }}</option>
          </select>
          <select v-model="compareFilters.tech" class="hotspot-select" @change="onCompareFilterChange">
            <option v-for="option in COMPARE_FILTER_OPTIONS.tech" :key="option">{{ option }}</option>
          </select>
          <select v-model="compareFilters.period" class="hotspot-select" @change="onCompareFilterChange">
            <option v-for="option in COMPARE_FILTER_OPTIONS.period" :key="option">{{ option }}</option>
          </select>
          <select v-model="compareFilters.level" class="hotspot-select" @change="onCompareFilterChange">
            <option v-for="option in COMPARE_FILTER_OPTIONS.level" :key="option">{{ option }}</option>
          </select>
        </div>
        <p class="compare-match-note">{{ compareNote }}</p>
        <div class="compare-picker">
          <template v-if="comparePicker.length">
            <label v-for="topic in comparePicker" :key="topic.name">
              <input v-model="topic.checked" type="checkbox" :value="topic.name"> {{ topic.name }}
            </label>
          </template>
          <span v-else class="muted">当前组合条件下暂无可对比热点主题</span>
        </div>
        <div class="hotspot-tools">
          <button class="primary-btn" @click="generateCompare">生成对比</button>
          <button class="ghost-btn" @click="exportHotspot('PDF')">导出 PDF</button>
          <button class="ghost-btn" @click="exportHotspot('Excel')">导出 Excel</button>
        </div>
        <div class="compare-bars" :class="{ active: compareBars.length }">
          <div v-for="bar in compareBars" :key="bar.name" class="compare-bar">
            <b>{{ bar.name }}</b><span :style="{ '--bar': bar.score }"></span><p class="muted">{{ bar.summary }}</p>
          </div>
        </div>
        <div class="compare-result">{{ compareResult }}</div>
      </section>
    </div>
  </section>
</template>
