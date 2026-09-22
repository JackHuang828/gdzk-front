<script setup>
// 媒体聚焦（1.1.3）：技术研判服务 → 研究需求分析。
// 1:1 还原 HTML 原型：8 个 Tab + 弹窗。
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 面包屑"首页"：与左侧导航首页一致（研究报告）
function goHome() {
  router.push({ name: 'caseLibrary', query: { type: 'research' } });
}

// ---- 时间序列与趋势视图（1:1 对齐原型 1.1.3）----
// 时间范围对应 X 轴标签（与原型一致）
const RANGE_LABELS = {
  '7d': ['3-24', '3-25', '3-26', '3-27', '3-28', '3-29', '3-30'],
  '30d': ['3-1', '3-5', '3-10', '3-15', '3-20', '3-25', '3-30'],
  '90d': ['1-1', '1-15', '2-1', '2-15', '3-1', '3-15', '3-30'],
  '1y': ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月']
};

// 各主题综合趋势四指标数据（近7天与原型完全一致；其余粒度按原型媒体序列趋势同构生成）
const TREND_SERIES_BY_TOPIC = {
  '人工智能大模型技术突破': {
    media:    { '7d': [845, 892, 923, 1056, 1123, 1258, 1345], '30d': [523, 678, 756, 892, 1023, 1156, 1345], '90d': [312, 456, 589, 678, 892, 1056, 1345], '1y': [156, 234, 312, 456, 534, 623, 712, 823, 945, 1056, 1189, 1345] },
    academic: { '7d': [215, 234, 256, 278, 302, 328, 356],  '30d': [168, 192, 224, 256, 289, 322, 356],          '90d': [118, 156, 198, 234, 268, 312, 356],          '1y': [78, 96, 124, 158, 189, 215, 246, 278, 296, 318, 338, 356] },
    invest:   { '7d': [12, 15, 18, 22, 28, 35, 42],         '30d': [8, 10, 13, 18, 24, 32, 42],                  '90d': [5, 8, 11, 15, 22, 31, 42],                   '1y': [3, 5, 7, 10, 14, 18, 22, 27, 31, 35, 39, 42] },
    policy:   { '7d': [18, 22, 25, 29, 32, 36, 41],         '30d': [14, 17, 21, 25, 29, 35, 41],                 '90d': [9, 13, 17, 22, 27, 33, 41],                  '1y': [6, 8, 11, 15, 19, 23, 27, 30, 33, 36, 39, 41] }
  },
  '量子计算商业化进程加速': {
    media:    { '7d': [645, 672, 705, 738, 792, 836, 892], '30d': [412, 486, 558, 623, 702, 798, 892], '90d': [268, 356, 442, 536, 645, 762, 892], '1y': [128, 186, 245, 312, 386, 458, 532, 612, 689, 756, 828, 892] },
    academic: { '7d': [178, 189, 201, 215, 228, 243, 258], '30d': [142, 158, 176, 195, 214, 238, 258], '90d': [98, 124, 149, 176, 203, 231, 258], '1y': [62, 78, 98, 121, 142, 163, 185, 206, 224, 239, 250, 258] },
    invest:   { '7d': [8, 9, 11, 13, 16, 19, 23],           '30d': [5, 6, 8, 10, 13, 17, 23],         '90d': [3, 4, 6, 9, 12, 17, 23],          '1y': [2, 2, 3, 4, 6, 8, 10, 13, 16, 18, 21, 23] },
    policy:   { '7d': [12, 14, 15, 17, 19, 21, 24],         '30d': [9, 11, 12, 15, 17, 20, 24],        '90d': [6, 8, 10, 13, 16, 19, 24],         '1y': [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24] }
  },
  '新能源汽车电池技术革新': {
    media:    { '7d': [568, 592, 634, 671, 702, 728, 756], '30d': [386, 448, 512, 576, 638, 698, 756], '90d': [246, 332, 418, 502, 596, 682, 756], '1y': [142, 198, 256, 324, 396, 468, 538, 602, 668, 712, 738, 756] },
    academic: { '7d': [156, 164, 178, 189, 202, 214, 228], '30d': [124, 138, 152, 168, 186, 208, 228], '90d': [86, 108, 131, 154, 178, 204, 228], '1y': [58, 72, 92, 114, 134, 154, 175, 194, 210, 220, 225, 228] },
    invest:   { '7d': [15, 17, 19, 21, 24, 27, 30],          '30d': [10, 12, 14, 17, 20, 24, 30],        '90d': [6, 9, 12, 15, 19, 24, 30],         '1y': [4, 6, 8, 11, 14, 17, 20, 23, 26, 28, 29, 30] },
    policy:   { '7d': [21, 23, 24, 26, 28, 30, 33],          '30d': [16, 18, 20, 23, 26, 29, 33],        '90d': [11, 14, 18, 21, 25, 29, 33],        '1y': [8, 10, 13, 16, 19, 22, 25, 28, 30, 31, 32, 33] }
  },
  '6G通信技术研发进展': {
    media:    { '7d': [478, 502, 534, 568, 596, 618, 634], '30d': [326, 382, 436, 492, 548, 596, 634], '90d': [198, 276, 352, 428, 506, 582, 634], '1y': [98, 142, 192, 246, 302, 362, 424, 486, 542, 588, 616, 634] },
    academic: { '7d': [132, 141, 149, 158, 168, 178, 186], '30d': [104, 116, 129, 142, 156, 172, 186], '90d': [72, 92, 112, 134, 155, 172, 186], '1y': [48, 61, 78, 96, 114, 132, 150, 165, 175, 181, 184, 186] },
    invest:   { '7d': [5, 6, 7, 8, 9, 10, 12],             '30d': [3, 4, 5, 6, 8, 10, 12],            '90d': [2, 2, 3, 4, 6, 9, 12],             '1y': [1, 1, 2, 2, 3, 4, 5, 7, 8, 10, 11, 12] },
    policy:   { '7d': [26, 28, 29, 31, 33, 35, 38],         '30d': [20, 23, 25, 28, 31, 34, 38],        '90d': [14, 18, 22, 26, 30, 34, 38],        '1y': [9, 12, 16, 20, 24, 27, 30, 33, 35, 36, 37, 38] }
  },
  '脑机接口临床试验突破': {
    media:    { '7d': [386, 402, 425, 448, 472, 496, 521], '30d': [268, 312, 356, 402, 448, 488, 521], '90d': [156, 224, 296, 362, 428, 486, 521], '1y': [86, 118, 156, 198, 246, 296, 348, 402, 448, 482, 506, 521] },
    academic: { '7d': [98, 106, 115, 124, 134, 145, 156],  '30d': [76, 86, 98, 110, 124, 140, 156], '90d': [52, 68, 86, 104, 122, 140, 156], '1y': [32, 44, 58, 74, 90, 106, 122, 136, 146, 151, 154, 156] },
    invest:   { '7d': [4, 5, 6, 7, 9, 11, 13],             '30d': [3, 3, 4, 5, 7, 10, 13],            '90d': [1, 2, 3, 5, 7, 10, 13],            '1y': [1, 1, 1, 2, 3, 4, 6, 8, 10, 11, 12, 13] },
    policy:   { '7d': [9, 10, 11, 13, 14, 16, 18],          '30d': [7, 8, 9, 11, 13, 15, 18],         '90d': [4, 6, 8, 10, 13, 16, 18],         '1y': [3, 4, 5, 7, 9, 11, 13, 15, 16, 17, 17, 18] }
  }
};

// 各主题情感分布数据（与原型 topicSentimentData 完全一致）
const TOPIC_SENTIMENT = {
  '人工智能大模型技术突破': { positive: [42, 43, 44, 46, 45, 47, 45], neutral: [35, 34, 36, 34, 35, 33, 35], negative: [23, 23, 20, 20, 20, 20, 20] },
  '量子计算商业化进程加速': { positive: [38, 40, 39, 42, 44, 43, 45], neutral: [38, 37, 38, 36, 35, 37, 36], negative: [24, 23, 23, 22, 21, 20, 19] },
  '新能源汽车电池技术革新': { positive: [35, 36, 38, 40, 39, 41, 43], neutral: [40, 39, 38, 37, 38, 36, 35], negative: [25, 25, 24, 23, 23, 23, 22] },
  '6G通信技术研发进展':     { positive: [48, 49, 50, 51, 52, 53, 54], neutral: [32, 31, 30, 29, 28, 27, 26], negative: [20, 20, 20, 20, 20, 20, 20] },
  '脑机接口临床试验突破':   { positive: [30, 32, 31, 35, 38, 40, 42], neutral: [38, 37, 39, 36, 34, 33, 32], negative: [32, 31, 30, 29, 28, 27, 26] }
};

const trendTopic = ref('人工智能大模型技术突破');
const trendTimeRange = ref('7d');
const trendTopics = Object.keys(TREND_SERIES_BY_TOPIC);

// 当前综合趋势四序列（跟随主题 + 时间范围）
const trendChartData = computed(() => {
  const t = TREND_SERIES_BY_TOPIC[trendTopic.value];
  const r = trendTimeRange.value;
  return [
    { key: 'media', label: '媒体提及数', unit: '篇', prefix: '媒体报道', data: t.media[r], color: '#1890ff', bgColor: 'rgba(24,144,255,0.1)', axis: 'left' },
    { key: 'academic', label: '学术产出', unit: '篇', prefix: '论文/专利', data: t.academic[r], color: '#52c41a', bgColor: 'rgba(82,196,26,0.1)', axis: 'left' },
    { key: 'invest', label: '投融资事件', unit: '起', prefix: '投融资', data: t.invest[r], color: '#fa8c16', bgColor: 'rgba(250,140,22,0.1)', axis: 'right' },
    { key: 'policy', label: '政策关键词', unit: '次', prefix: '政策提及', data: t.policy[r], color: '#722ed1', bgColor: 'rgba(114,46,209,0.1)', axis: 'right' }
  ];
});
const trendLabels = computed(() => RANGE_LABELS[trendTimeRange.value]);

// 当前情感三序列（原型公式：时间粒度越长按 scaleFactor 微调）
const sentimentDatasets = computed(() => {
  const base = TOPIC_SENTIMENT[trendTopic.value];
  const r = trendTimeRange.value;
  const scaleFactor = r === '7d' ? 0 : r === '30d' ? 0.5 : r === '90d' ? 1 : 2;
  const n = RANGE_LABELS[r].length;
  // 将 7 个基准点重采样到当前粒度点数
  const resample = arr => Array.from({ length: n }, (_, i) => arr[Math.round(i * 6 / (n - 1))]);
  return [
    { label: '正面', color: '#52c41a', bgColor: 'rgba(82,196,26,0.1)', data: resample(base.positive).map((v, i) => Math.min(100, Math.max(10, v - scaleFactor * i * 0.3))) },
    { label: '中性', color: '#faad14', bgColor: 'rgba(250,173,20,0.1)', data: resample(base.neutral).map((v, i) => v + scaleFactor * i * 0.15) },
    { label: '负面', color: '#f5222d', bgColor: 'rgba(245,34,45,0.1)', data: resample(base.negative).map((v, i) => Math.max(5, v - scaleFactor * i * 0.2)) }
  ];
});
const sentimentLabels = computed(() => RANGE_LABELS[trendTimeRange.value]);

// 指标卡片（与原型一致）
const trendMetrics = [
  { icon: 'fas fa-newspaper', color: 'blue', value: '12,458', label: '媒体提及数', sparkline: [45, 52, 48, 60, 55, 68, 72, 65, 78, 82, 75, 88, 92, 85] },
  { icon: 'fas fa-file-alt', color: 'green', value: '3,256', label: '学术产出（论文/专利）', sparkline: [30, 35, 32, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72] },
  { icon: 'fas fa-dollar-sign', color: 'orange', value: '89', label: '投融资事件', sparkline: [5, 6, 5, 8, 7, 9, 12, 10, 15, 18, 16, 22, 25, 28] },
  { icon: 'fas fa-landmark', color: 'purple', value: '156', label: '政策关键词出现', sparkline: [8, 9, 10, 11, 12, 14, 13, 15, 16, 18, 17, 19, 20, 22] }
];

// ---- 平滑曲线几何（Catmull-Rom 转贝塞尔，tension 0.4，对应原型 Chart.js line tension）----
const CHART_W = 760;
const CHART_H = 300;
const PAD = { l: 52, r: 48, t: 16, b: 30 };

function niceTicks(max, min = 0, count = 5) {
  const range = max - min || 1;
  const raw = range / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  const top = Math.ceil((max - 1e-9) / step) * step;
  const ticks = [];
  for (let v = 0; v <= top + 1e-6; v += step) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// 生成单个序列的 x/y 点及坐标轴刻度（综合趋势：左轴媒体/学术，右轴投融资/政策）
const trendGeom = computed(() => {
  const series = trendChartData.value;
  const n = trendLabels.value.length;
  const plotW = CHART_W - PAD.l - PAD.r;
  const plotH = CHART_H - PAD.t - PAD.b;
  const xAt = i => PAD.l + (n === 1 ? plotW / 2 : plotW * i / (n - 1));
  const leftVals = series.filter(s => s.axis === 'left').flatMap(s => s.data);
  const rightVals = series.filter(s => s.axis === 'right').flatMap(s => s.data);
  const leftTicks = niceTicks(Math.max(...leftVals) * 1.08);
  const rightTicks = niceTicks(Math.max(...rightVals) * 1.08);
  const yL = v => PAD.t + plotH - (v / leftTicks[leftTicks.length - 1]) * plotH;
  const yR = v => PAD.t + plotH - (v / rightTicks[rightTicks.length - 1]) * plotH;
  return {
    series: series.map(s => ({
      ...s,
      points: s.data.map((v, i) => ({ x: xAt(i), y: s.axis === 'left' ? yL(v) : yR(v), value: v }))
    })),
    xAt, leftTicks, rightTicks, yL, yR, plotH
  };
});

// 情感图几何（单轴 0-100）
const sentimentGeom = computed(() => {
  const n = sentimentLabels.value.length;
  const plotW = CHART_W - PAD.l - PAD.r;
  const plotH = CHART_H - PAD.t - PAD.b;
  const xAt = i => PAD.l + (n === 1 ? plotW / 2 : plotW * i / (n - 1));
  const ticks = [0, 25, 50, 75, 100];
  const y = v => PAD.t + plotH - (v / 100) * plotH;
  return {
    series: sentimentDatasets.value.map(s => ({ ...s, points: s.data.map((v, i) => ({ x: xAt(i), y: y(v), value: v })) })),
    xAt, ticks, y, plotH
  };
});

function smoothPath(points) {
  if (points.length < 2) return '';
  const t = 0.4;
  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6 * t * 1.5;
    const c1y = p1.y + (p2.y - p0.y) / 6 * t * 1.5;
    const c2x = p2.x - (p3.x - p1.x) / 6 * t * 1.5;
    const c2y = p2.y - (p3.y - p1.y) / 6 * t * 1.5;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}
function smoothArea(points) {
  if (!points.length) return '';
  const base = CHART_H - PAD.b;
  return `${smoothPath(points)} L${points[points.length - 1].x.toFixed(1)},${base} L${points[0].x.toFixed(1)},${base} Z`;
}

// ---- 悬浮提示 ----
const hoverIndex = ref(-1);
function onTrendMove(e) {
  const idx = eventToIndex(e);
  if (idx !== null) hoverIndex.value = idx;
}
function onSentimentMove(e) {
  const idx = eventToIndex(e);
  if (idx !== null) hoverIndex.value = idx;
}
function clearHover() { hoverIndex.value = -1; }
function eventToIndex(e) {
  const svg = e.currentTarget;
  const rect = svg.getBoundingClientRect();
  const scale = CHART_W / rect.width;
  const x = (e.clientX - rect.left) * scale;
  const n = trendLabels.value.length;
  const plotW = CHART_W - PAD.l - PAD.r;
  const ratio = (x - PAD.l) / plotW;
  const idx = Math.round(ratio * (n - 1));
  return idx >= 0 && idx < n ? idx : null;
}
// 提示框定位（百分比，跟随容器）
const hoverPos = computed(() => hoverIndex.value < 0 ? null : {
  left: (trendGeom.value.xAt(hoverIndex.value) / CHART_W * 100).toFixed(2) + '%'
});
const sentimentPos = computed(() => hoverIndex.value < 0 ? null : {
  left: (sentimentGeom.value.xAt(hoverIndex.value) / CHART_W * 100).toFixed(2) + '%'
});

function changeTimeRange(range) {
  trendTimeRange.value = range;
  hoverIndex.value = -1;
  showToast(`已切换至${range === '7d' ? '近7天' : range === '30d' ? '近30天' : range === '90d' ? '近90天' : '近1年'}数据`, 'info');
}
function onTrendTopicChange() {
  hoverIndex.value = -1;
  showToast(`已切换至「${trendTopic.value}」`, 'info');
}

// ---- 导出数据（CSV，对应当前主题与时间范围）----
function exportTrendData() {
  const labels = trendLabels.value;
  const s = trendChartData.value;
  const sen = sentimentDatasets.value;
  const header = '日期,媒体提及数,学术产出,投融资事件,政策关键词,正面情感,中性情感,负面情感';
  const rows = labels.map((l, i) =>
    [l, s[0].data[i], s[1].data[i], s[2].data[i], s[3].data[i],
     Math.round(sen[0].data[i]), Math.round(sen[1].data[i]), Math.round(sen[2].data[i])].join(','));
  const csv = '﻿' + [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `媒体聚焦数据导出_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('数据导出成功', 'success');
}

// ---- 导出图表（两张 SVG 合并为 PNG）----
function exportTrendChart() {
  const svgs = document.querySelectorAll('.trend-charts svg.chart-svg');
  if (!svgs.length) return;
  const canvas = document.createElement('canvas');
  canvas.width = CHART_W;
  canvas.height = CHART_H * svgs.length + 20 * (svgs.length - 1);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let drawn = 0;
  svgs.forEach((svg, i) => {
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, i * (CHART_H + 20), CHART_W, CHART_H);
      URL.revokeObjectURL(url);
      drawn++;
      if (drawn === svgs.length) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `媒体聚焦趋势图表_${new Date().toISOString().split('T')[0]}.png`;
        link.click();
        showToast('图表导出成功', 'success');
      }
    };
    img.src = url;
  });
}

// 指标卡迷你折线
function sparklinePath(values, w = 80, h = 24) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  return values.map((v, i) => {
    const x = i * w / (values.length - 1);
    const y = h - 2 - (v - min) / range * (h - 4);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

// ---- Toast ----
const toastList = ref([]);
let toastId = 0;
function showToast(msg, type = 'info') {
  const id = ++toastId;
  toastList.value.push({ id, msg, type });
  setTimeout(() => {
    toastList.value = toastList.value = toastList.value.filter(t => t.id !== id);
  }, 2500);
}

// ---- Tab ----
const tabs = [
  { id: 'overview', label: '媒体聚焦总览', icon: 'fas fa-chart-pie' },
  { id: 'trend', label: '时间序列与趋势视图', icon: 'fas fa-chart-line' },
  { id: 'network', label: '媒体—技术耦合网络视图', icon: 'fas fa-project-diagram' },
  { id: 'hotspot-tracking', label: '热点检测与突发事件追踪', icon: 'fas fa-fire' },
  { id: 'coupling-analysis', label: '耦合度分析与解读面板', icon: 'fas fa-link' },
  { id: 'warning', label: '动态监控与预警规则配置', icon: 'fas fa-bell' },
  { id: 'report', label: '报告与建议生成', icon: 'fas fa-file-alt' },
  { id: 'recommendation', label: '智能推荐与溯源', icon: 'fas fa-lightbulb' }
];
const activeTab = ref('overview');
function switchTab(id) { activeTab.value = id; }

// ---- 总览：关键信息卡片 ----
const statCards = [
  { type: 'media', icon: 'fas fa-broadcast-tower', color: 'blue', value: '1,258', label: '总监测媒体数', trend: '+12.5%', trendType: 'up' },
  { type: 'hotspot', icon: 'fas fa-fire', color: 'orange', value: '386', label: '媒体关注热点数量', trend: '+8.3%', trendType: 'up', clickable: true, clickAction: 'toggleHotspot' },
  { type: 'sentiment', icon: 'fas fa-smile', color: 'green', sentiment: { positive: 45, neutral: 35, negative: 20 } },
  { type: 'coupling', icon: 'fas fa-link', color: 'purple', value: '87.6', label: '媒体—技术耦合度评分', score: 87.6, clickable: true, clickAction: 'showCoupling' }
];
function onStatCardClick(card) {
  if (!card.clickable) return;
  if (card.clickAction === 'toggleHotspot') { showHotspotList.value = !showHotspotList.value; showToast(showHotspotList.value ? '已展开热点列表' : '已收起热点列表', 'info'); }
  else if (card.clickAction === 'showCoupling') { showCouplingModal.value = true; }
}

// ---- 总览：热点列表 ----
const showHotspotList = ref(false);
const hotspotSort = ref('heat');
const hotspotData = [
  { rank: 1, name: '人工智能大模型技术突破', reports: '1,245篇报道', shares: '8.9万分享', heat: 98.5, heatWidth: 95, growth: 12 },
  { rank: 2, name: '量子计算商业化进程加速', reports: '892篇报道', shares: '5.6万分享', heat: 92.3, heatWidth: 88, growth: 31 },
  { rank: 3, name: '新能源汽车电池技术革新', reports: '756篇报道', shares: '4.2万分享', heat: 87.6, heatWidth: 82, growth: 19 },
  { rank: 4, name: '6G通信技术研发进展', reports: '634篇报道', shares: '3.8万分享', heat: 81.2, heatWidth: 75, growth: 22 },
  { rank: 5, name: '脑机接口临床试验突破', reports: '521篇报道', shares: '3.1万分享', heat: 76.8, heatWidth: 68, growth: 28 }
];
const sortedHotspots = computed(() => {
  const arr = [...hotspotData];
  return hotspotSort.value === 'heat' ? arr.sort((a, b) => b.heat - a.heat) : arr.sort((a, b) => b.growth - a.growth);
});
function sortHotspots(mode) { hotspotSort.value = mode; }

// 加入监控（点击切换，1:1 对齐原型）
const monitoredNames = ref([]);
function isMonitored(name) { return monitoredNames.value.includes(name); }
function addToMonitor(name) {
  if (isMonitored(name)) {
    monitoredNames.value = monitoredNames.value.filter(n => n !== name);
    showCenterToast('已取消监控：' + name, 'info');
  } else {
    monitoredNames.value = [...monitoredNames.value, name];
    showCenterToast('已加入监控清单：' + name, 'success');
  }
}

// 屏幕顶部居中提示（复刻原型 showToast：top 120px、水平居中、浅色描边）
const centerToast = ref(null);
let centerToastTimer = null;
function showCenterToast(message, type = 'info') {
  centerToast.value = { message, type };
  if (centerToastTimer) clearTimeout(centerToastTimer);
  centerToastTimer = setTimeout(() => { centerToast.value = null; }, 2000);
}

// ---- 多序列对比弹窗（滞后相关系数分析，1:1 对齐原型）----
const showCompareModal = ref(false);
const COMPARE_INDICATORS = [
  { key: 'media', label: '媒体提及', color: '#1890ff', data: [845, 892, 923, 1056, 1123, 1258, 1345] },
  { key: 'academic', label: '学术产出', color: '#52c41a', data: [215, 234, 256, 278, 302, 328, 356] },
  { key: 'invest', label: '投融资', color: '#fa8c16', data: [12, 15, 18, 22, 28, 35, 42] },
  { key: 'policy', label: '政策', color: '#722ed1', data: [18, 22, 25, 29, 32, 36, 41] }
];
const compareChecked = ref({ media: true, academic: true, invest: false, policy: false });
const lagDays = ref(3);
const selectedCompare = computed(() => COMPARE_INDICATORS.filter(i => compareChecked.value[i.key]));

function computePearson(x, y) {
  const n = x.length;
  let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
  for (let k = 0; k < n; k++) { sum1 += x[k]; sum2 += y[k]; sum1Sq += x[k] * x[k]; sum2Sq += y[k] * y[k]; pSum += x[k] * y[k]; }
  const num = pSum - sum1 * sum2 / n;
  const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
  return den === 0 ? 0 : +(num / den).toFixed(3);
}

const compareMatrix = computed(() => {
  const keys = selectedCompare.value;
  const lag = lagDays.value;
  return keys.map((a, i) => keys.map((b, j) => {
    if (i === j) return 1;
    const lagOffset = lag > 0 ? Math.min(lag, a.data.length - 2) : 0;
    const x = lagOffset > 0 ? a.data.slice(0, -lagOffset) : a.data;
    const y = lagOffset > 0 ? b.data.slice(lagOffset) : b.data;
    return computePearson(x, y);
  }));
});
function cellClass(v, diagonal) {
  if (diagonal) return '';
  const a = Math.abs(v);
  return a >= 0.85 ? 'high' : a >= 0.7 ? 'medium' : 'low';
}
const compareInsight = computed(() => {
  const keys = selectedCompare.value;
  const m = compareMatrix.value;
  if (keys.length < 2) return '请至少选择2个指标以查看相关性分析结果';
  let maxVal = 0, mi = 0, mj = 1;
  for (let i = 0; i < keys.length; i++)
    for (let j = i + 1; j < keys.length; j++)
      if (Math.abs(m[i][j]) > maxVal) { maxVal = Math.abs(m[i][j]); mi = i; mj = j; }
  let text;
  if (maxVal >= 0.85) text = `<span class="insight-highlight">${keys[mi].label}与${keys[mj].label}</span> 存在显著强正相关（r=${maxVal.toFixed(2)}），表明两者高度同步变化`;
  else if (maxVal >= 0.7) text = `<span class="insight-highlight">${keys[mi].label}与${keys[mj].label}</span> 呈现中等正相关（r=${maxVal.toFixed(2)}），具有一定关联性`;
  else text = '当前所选指标间整体相关性较弱，各序列相对独立变化';
  if (lagDays.value > 0) text += `，经${lagDays.value}天滞后调整后`;
  return text + '。';
});
function onCompareChange() {
  if (selectedCompare.value.length >= 2)
    showToast(`已更新${lagDays.value > 0 ? '滞后' + lagDays.value + '天' : ''}相关分析`, 'success');
}

// 单元格详情弹窗
const cellDetail = ref(null);
function showCellDetail(i, j) {
  const keys = selectedCompare.value;
  const v = compareMatrix.value[i][j];
  const absV = Math.abs(v);
  cellDetail.value = {
    name1: keys[i].label, name2: keys[j].label, value: v,
    level: absV >= 0.85 ? '强相关' : absV >= 0.7 ? '中等相关' : '弱相关',
    direction: v > 0 ? '正向耦合' : '负向耦合',
    r2: (v * v * 100).toFixed(1),
    color: absV >= 0.85 ? '#52c41a' : absV >= 0.7 ? '#fa8c16' : '#1890ff',
    width: (absV * 100).toFixed(1),
    text: absV >= 0.85
      ? `${keys[i].label}与${keys[j].label}存在高度同步变化关系，一方变动可预测另一方约${(v * v * 100).toFixed(0)}%的变化。`
      : absV >= 0.7
        ? `${keys[i].label}与${keys[j].label}呈现中等程度的相关性，存在一定程度的相互影响。`
        : `${keys[i].label}与${keys[j].label}相关性较弱，各自独立变化的特征更明显。`
  };
}

// ---- 媒体—技术耦合网络视图 ----
const networkNodes = ref([
  { id: 'n1', label: '人工智能大模型', type: 'media', x: 400, y: 250, size: 45, color: '#1890ff' },
  { id: 'n2', label: '量子计算', type: 'tech', x: 200, y: 150, size: 35, color: '#52c41a' },
  { id: 'n3', label: '新能源汽车', type: 'media', x: 600, y: 150, size: 40, color: '#1890ff' },
  { id: 'n4', label: '6G通信', type: 'tech', x: 300, y: 350, size: 30, color: '#52c41a' },
  { id: 'n5', label: '清华大学', type: 'entity', x: 500, y: 80, size: 25, color: '#722ed1' },
  { id: 'n6', label: '华为', type: 'entity', x: 150, y: 280, size: 28, color: '#722ed1' },
  { id: 'n7', label: '脑机接口', type: 'tech', x: 700, y: 320, size: 32, color: '#52c41a' },
  { id: 'n8', label: '比亚迪', type: 'entity', x: 550, y: 400, size: 22, color: '#722ed1' }
]);
const networkEdges = ref([
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n5' },
  { from: 'n1', to: 'n6' }, { from: 'n2', to: 'n6' }, { from: 'n3', to: 'n8' },
  { from: 'n3', to: 'n7' }, { from: 'n4', to: 'n6' }, { from: 'n7', to: 'n5' }
]);
const selectedNode = ref(null);
const networkFilters = ref({ region: '', timeRange: '', sentiment: '' });
const pathStart = ref('');
const pathEnd = ref('');
const networkCanvasRef = ref(null);

function drawNetwork() {
  const canvas = networkCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  // edges
  ctx.strokeStyle = '#d9d9d9';
  ctx.lineWidth = 1.5;
  networkEdges.value.forEach(e => {
    const a = networkNodes.value.find(n => n.id === e.from);
    const b = networkNodes.value.find(n => n.id === e.to);
    if (!a || !b) return;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  });
  // nodes
  networkNodes.value.forEach(n => {
    ctx.fillStyle = n.color;
    ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(n.label, n.x, n.y + 4);
  });
}
function onNodeClick(e) {
  const canvas = networkCanvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  const node = networkNodes.value.find(n => Math.hypot(n.x - x, n.y - y) < n.size + 5);
  if (node) { selectedNode.value = node; }
}
function applyNetworkFilter() { showToast('已应用网络过滤', 'success'); }
function clearNetworkFilter() { networkFilters.value = { region: '', timeRange: '', sentiment: '' }; showToast('已清除过滤', 'info'); }
function findPath() {
  if (!pathStart.value || !pathEnd.value) { showToast('请输入起始和目标节点', 'warning'); return; }
  showToast(`查找"${pathStart.value}"到"${pathEnd.value}"的传播路径`, 'info');
}

// ---- 热点检测与突发事件追踪 ----
const hotspotTracking = [
  { name: '大模型监管政策出台', firstReport: '2024-03-15', burstTime: '2024-03-16', spreadSpeed: '+856%', reportIncrement: '+1,245', peakHeat: 95.2, duration: '5天', status: '爆发期', scope: ['人工智能', '政策法规'] },
  { name: '量子计算投资热潮', firstReport: '2024-03-10', burstTime: '2024-03-12', spreadSpeed: '+532%', reportIncrement: '+892', peakHeat: 88.7, duration: '8天', status: '蔓延期', scope: ['量子技术', '投融资'] },
  { name: '固态电池安全争议', firstReport: '2024-03-08', burstTime: '2024-03-09', spreadSpeed: '+421%', reportIncrement: '+634', peakHeat: 82.3, duration: '3天', status: '衰减期', scope: ['新能源', '电池安全'] }
];

// ---- 耦合度分析 ----
const correlationMatrix = [
  { topic: '大模型', media: 1.0, tech: 0.82, entity: 0.65 },
  { topic: '量子计算', media: 0.75, tech: 1.0, entity: 0.58 },
  { topic: '新能源', media: 0.68, tech: 0.45, entity: 1.0 }
];
const lagAnalysis = [
  { media: '科技日报', lag: '2天', effect: '技术报道→媒体扩散', confidence: 0.85 },
  { media: '36氪', lag: '1天', effect: '行业报道→社交媒体', confidence: 0.78 },
  { media: '新华社', lag: '3天', effect: '权威发布→全网传播', confidence: 0.92 }
];
const grangerResults = [
  { cause: '媒体提及数', effect: '学术产出', fStat: 12.45, pValue: 0.001, significance: '***' },
  { cause: '投融资事件', effect: '媒体提及数', fStat: 8.92, pValue: 0.005, significance: '**' },
  { cause: '政策关键词', effect: '媒体提及数', fStat: 15.67, pValue: 0.000, significance: '***' }
];

// ---- 动态监控预警 ----
const monitorStats = { topics: 24, entities: 156, activeAlerts: 7, regions: 12 };
const warningList = [
  { time: '2024-03-20 14:32', level: '高', title: '人工智能大模型热度激增', detail: '热度指数 98.5，超阈值 85', rule: '热度阈值监控', hotspot: '人工智能大模型技术突破' },
  { time: '2024-03-20 10:15', level: '中', title: '量子计算负面情感上升', detail: '负面情感占比 35%，增速 +12%', rule: '情感倾向监控', hotspot: '量子计算商业化进程加速' },
  { time: '2024-03-19 16:48', level: '高', title: '新能源汽车报道量激增', detail: '报道数 756篇，增速 +45%', rule: '报道量增速监控', hotspot: '新能源汽车电池技术革新' },
  { time: '2024-03-19 09:20', level: '低', title: '6G通信讨论热度下降', detail: '讨论量下降 15%', rule: '热度下降监控', hotspot: '6G通信技术研发进展' }
];
const ruleList = ref([
  { name: '大模型热度阈值', status: 'active', type: '阈值式', topic: '人工智能大模型', metric: '热度指数', window: '24小时', level: '高' },
  { name: '量子计算情感监控', status: 'active', type: '增速式', topic: '量子计算', metric: '负面情感占比', window: '12小时', level: '中' },
  { name: '新能源汽车报道增速', status: 'paused', type: '复合', topic: '新能源汽车', metric: '报道量增速', window: '6小时', level: '高' }
]);
const showRuleModal = ref(false);
function openRuleModal() { showRuleModal.value = true; }
function toggleRule(idx) { ruleList.value[idx].status = ruleList.value[idx].status === 'active' ? 'paused' : 'active'; showToast('规则状态已更新', 'success'); }

// ---- 报告生成 ----
const reportConfig = ref({
  template: '科技舆情短报',
  timeRange: '近7天',
  title: '人工智能大模型技术突破—舆情分析报告',
  modules: { trend: true, coupling: true, media: true, action: true }
});
const reportHistory = [
  { title: '量子计算舆情周报', type: '科技舆情短报', date: '2024-03-18', status: '已完成' },
  { title: '新能源汽车技术研判', type: '战略研判报告', date: '2024-03-15', status: '已完成' },
  { title: '6G通信舆情应对建议', type: '舆情应对建议书', date: '2024-03-12', status: '已完成' }
];
function generateReport() { showToast('报告生成中，预计需要30秒...', 'info'); }

// ---- 智能推荐 ----
const recommendTopic = ref('人工智能大模型');
const recommendStats = { topics: 15, orgs: 28, media: 42, people: 18 };
const techRecommendations = [
  { name: '深度学习算法优化', similarity: 0.92, reason: '与"大模型"技术路径高度相关，近期学术产出增长 45%', evidences: 12, updated: '2024-03-19' },
  { name: 'AI芯片架构设计', similarity: 0.87, reason: '大模型训练需求驱动，投融资事件增长 32%', evidences: 8, updated: '2024-03-18' },
  { name: '多模态融合技术', similarity: 0.83, reason: '与大模型技术演进路径协同，专利申请增长 28%', evidences: 6, updated: '2024-03-17' }
];
const orgRecommendations = [
  { name: '清华大学人工智能研究院', similarity: 0.89, reason: '大模型领域核心研究机构，论文产出量 TOP3', evidences: 15, updated: '2024-03-19' },
  { name: '华为诺亚方舟实验室', similarity: 0.85, reason: '大模型工程化落地领先企业', evidences: 11, updated: '2024-03-18' },
  { name: '中国科学院自动化所', similarity: 0.82, reason: '多模态大模型研究前沿机构', evidences: 9, updated: '2024-03-17' }
];
const mediaRecommendations = [
  { name: '机器之心', similarity: 0.91, reason: 'AI领域垂直媒体，大模型报道量领先', evidences: 20, updated: '2024-03-20' },
  { name: '量子位', similarity: 0.88, reason: '前沿科技媒体，深度报道占比高', evidences: 16, updated: '2024-03-19' },
  { name: '36氪AI频道', similarity: 0.84, reason: '投融资视角覆盖大模型产业链', evidences: 12, updated: '2024-03-18' }
];
const peopleRecommendations = [
  { name: '王海峰（百度）', similarity: 0.87, reason: '大模型技术领军人物，近期观点引用量 TOP5', evidences: 14, updated: '2024-03-19' },
  { name: '唐杰（清华大学）', similarity: 0.85, reason: 'GLM系列大模型核心研发者', evidences: 10, updated: '2024-03-18' },
  { name: '周志华（南京大学）', similarity: 0.82, reason: '机器学习领域权威学者', evidences: 8, updated: '2024-03-17' }
];

// ---- 弹窗 ----
const showCouplingModal = ref(false);

onMounted(() => { nextTick(() => drawNetwork()); });
</script>

<template>
  <div class="media-focus-page">
    <!-- Tab 导航 -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a v-for="tab in tabs" :key="tab.id" href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === tab.id }" @click="switchTab(tab.id)">
          <i :class="tab.icon"></i> {{ tab.label }}
        </a>
      </nav>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
      <!-- ========== 媒体聚焦总览 ========== -->
      <div v-show="activeTab === 'overview'">
        <!-- 关键信息卡片 -->
        <div class="stats-cards">
          <div v-for="card in statCards" :key="card.type" class="stat-card" :class="{ clickable: card.clickable }" @click="onStatCardClick(card)">
            <div class="stat-icon" :class="card.color"><i :class="card.icon"></i></div>
            <div class="stat-info">
              <template v-if="card.type === 'sentiment'">
                <div class="sentiment-bars">
                  <div class="sentiment-bar positive" :style="{ width: card.sentiment.positive + '%' }" :title="'正面 ' + card.sentiment.positive + '%'"></div>
                  <div class="sentiment-bar neutral" :style="{ width: card.sentiment.neutral + '%' }" :title="'中性 ' + card.sentiment.neutral + '%'"></div>
                  <div class="sentiment-bar negative" :style="{ width: card.sentiment.negative + '%' }" :title="'负面 ' + card.sentiment.negative + '%'"></div>
                </div>
                <div class="stat-label">情感偏向指标</div>
                <div class="sentiment-legend">
                  <span class="positive"><i class="fas fa-circle"></i> 正 {{ card.sentiment.positive }}%</span>
                  <span class="neutral"><i class="fas fa-circle"></i> 中 {{ card.sentiment.neutral }}%</span>
                  <span class="negative"><i class="fas fa-circle"></i> 负 {{ card.sentiment.negative }}%</span>
                </div>
              </template>
              <template v-else>
                <div class="stat-value">{{ card.value }}</div>
                <div class="stat-label">{{ card.label }}</div>
                <div v-if="card.trend" class="stat-trend" :class="card.trendType"><i class="fas fa-arrow-up"></i> {{ card.trend }}</div>
                <div v-if="card.score" class="score-ring"><div class="score-progress" :style="{ '--progress': card.score + '%' }"></div></div>
              </template>
            </div>
            <div v-if="card.clickable" class="click-hint"><i :class="card.clickAction === 'toggleHotspot' ? 'fas fa-chevron-down' : 'fas fa-chart-pie'"></i> 点击查看</div>
          </div>
        </div>

        <!-- 热点列表 -->
        <div v-show="showHotspotList" class="hotspot-section">
          <div class="hotspot-header">
            <div class="hotspot-title"><i class="fas fa-fire" style="color: #fa8c16; margin-right: 8px;"></i>媒体关注热点列表</div>
            <div class="hotspot-sort">
              <button class="sort-btn" :class="{ active: hotspotSort === 'heat' }" @click="sortHotspots('heat')">按热度</button>
              <button class="sort-btn" :class="{ active: hotspotSort === 'growth' }" @click="sortHotspots('growth')">按增长率</button>
            </div>
          </div>
          <div class="hotspot-list">
            <div v-for="item in sortedHotspots" :key="item.rank" class="hotspot-item">
              <div class="hotspot-rank" :class="{ top3: item.rank <= 3, normal: item.rank > 3 }">{{ item.rank }}</div>
              <div class="hotspot-content">
                <div class="hotspot-name">{{ item.name }}</div>
                <div class="hotspot-meta">
                  <span><i class="fas fa-newspaper"></i> {{ item.reports }}</span>
                  <span><i class="fas fa-share-alt"></i> {{ item.shares }}</span>
                </div>
              </div>
              <div class="hotspot-heat">
                <div class="heat-bar"><div class="heat-fill" :style="{ width: item.heatWidth + '%' }"></div></div>
                <span class="heat-value">{{ item.heat }}</span>
              </div>
              <div class="hotspot-actions">
                <button class="btn-monitor" :class="{ added: isMonitored(item.name) }" @click="addToMonitor(item.name)">
                  <i :class="isMonitored(item.name) ? 'fas fa-check' : 'fas fa-plus'"></i>
                  {{ isMonitored(item.name) ? '已监控' : '加入监控' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== 时间序列与趋势视图（独立 Tab，与总览同级） ========== -->
      <div v-show="activeTab === 'trend'" class="trend-section">
          <div class="trend-header">
            <div class="trend-title">
              <i class="fas fa-chart-line" style="color: #1890ff;"></i>
              时间序列与趋势视图
              <span class="trend-subtitle">{{ trendTopic }}</span>
            </div>
            <div class="trend-controls">
              <select class="trend-select" v-model="trendTopic" @change="onTrendTopicChange">
                <option v-for="t in trendTopics" :key="t" :value="t">{{ t }}</option>
              </select>
              <button class="control-btn" @click="showCompareModal = true"><i class="fas fa-chart-bar"></i> 多序列对比</button>
              <button class="control-btn" @click="exportTrendData"><i class="fas fa-download"></i> 导出数据</button>
              <button class="control-btn" @click="exportTrendChart"><i class="fas fa-image"></i> 导出图表</button>
              <div class="trend-time-range">
                <button class="time-btn" :class="{ active: trendTimeRange === '7d' }" @click="changeTimeRange('7d')">近7天</button>
                <button class="time-btn" :class="{ active: trendTimeRange === '30d' }" @click="changeTimeRange('30d')">近30天</button>
                <button class="time-btn" :class="{ active: trendTimeRange === '90d' }" @click="changeTimeRange('90d')">近90天</button>
                <button class="time-btn" :class="{ active: trendTimeRange === '1y' }" @click="changeTimeRange('1y')">近1年</button>
              </div>
            </div>
          </div>
          <div class="trend-charts">
            <!-- 综合趋势分析（左轴：数量；右轴：次数） -->
            <div class="trend-chart-main">
              <div class="chart-header">
                <span class="chart-title">综合趋势分析</span>
                <div class="chart-legend">
                  <span class="legend-item"><i class="fas fa-circle" style="color: #1890ff;"></i> 媒体提及数</span>
                  <span class="legend-item"><i class="fas fa-circle" style="color: #52c41a;"></i> 学术产出</span>
                  <span class="legend-item"><i class="fas fa-circle" style="color: #fa8c16;"></i> 投融资事件</span>
                  <span class="legend-item"><i class="fas fa-circle" style="color: #722ed1;"></i> 政策关键词</span>
                </div>
              </div>
              <div class="chart-container">
                <svg class="chart-svg" :viewBox="`0 0 ${CHART_W} ${CHART_H}`" preserveAspectRatio="none"
                     @mousemove="onTrendMove" @mouseleave="clearHover">
                  <!-- 横向网格线 + 左轴刻度 -->
                  <template v-for="(t, i) in trendGeom.leftTicks" :key="'g'+i">
                    <line :x1="PAD.l" :x2="CHART_W - PAD.r"
                          :y1="trendGeom.yL(t)" :y2="trendGeom.yL(t)"
                          stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
                    <text :x="PAD.l - 8" :y="trendGeom.yL(t) + 4" text-anchor="end" font-size="11" fill="#999">{{ t }}</text>
                  </template>
                  <!-- 右轴刻度（次数） -->
                  <text v-for="(t, i) in trendGeom.rightTicks" :key="'rt'+i"
                        :x="CHART_W - PAD.r + 8" :y="trendGeom.yR(t) + 4"
                        text-anchor="start" font-size="11" fill="#999">{{ t }}</text>
                  <!-- 轴标题 -->
                  <text :x="PAD.l - 40" :y="PAD.t - 4" font-size="11" fill="#999">数量</text>
                  <text :x="CHART_W - PAD.r + 4" :y="PAD.t - 4" font-size="11" fill="#999">次数</text>
                  <!-- X 轴标签 -->
                  <text v-for="(label, i) in trendLabels" :key="'x'+i"
                        :x="trendGeom.xAt(i)" :y="CHART_H - 10" text-anchor="middle" font-size="11" fill="#999">{{ label }}</text>
                  <!-- 面积 + 平滑折线 + 数据点 -->
                  <g v-for="ds in trendGeom.series" :key="ds.key">
                    <path :d="smoothArea(ds.points)" :fill="ds.bgColor" stroke="none"/>
                    <path :d="smoothPath(ds.points)" fill="none" :stroke="ds.color" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
                    <circle v-for="(p, i) in ds.points" :key="i" :cx="p.x" :cy="p.y" r="3" :fill="ds.color"
                            :opacity="hoverIndex === -1 || hoverIndex === i ? 1 : 0.35"/>
                  </g>
                  <!-- 悬浮参考线 -->
                  <line v-if="hoverIndex >= 0"
                        :x1="trendGeom.xAt(hoverIndex)" :x2="trendGeom.xAt(hoverIndex)"
                        :y1="PAD.t" :y2="CHART_H - PAD.b" stroke="rgba(0,0,0,0.25)" stroke-width="1" stroke-dasharray="4 3"/>
                </svg>
                <!-- 悬浮提示框（复刻 Chart.js index 模式） -->
                <div v-if="hoverPos && hoverIndex >= 0" class="chart-tooltip" :style="hoverPos">
                  <div class="tooltip-title">日期: {{ trendLabels[hoverIndex] }}</div>
                  <div v-for="ds in trendGeom.series" :key="ds.key" class="tooltip-row">
                    <i class="fas fa-circle" :style="{ color: ds.color }"></i>
                    {{ ds.prefix }}: {{ ds.points[hoverIndex].value }} {{ ds.unit }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 四个指标卡片 -->
            <div class="trend-metrics-grid">
              <div v-for="m in trendMetrics" :key="m.label" class="metric-card">
                <div class="metric-icon" :class="m.color"><i :class="m.icon"></i></div>
                <div class="metric-info">
                  <div class="metric-value">{{ m.value }}</div>
                  <div class="metric-label">{{ m.label }}</div>
                </div>
                <div class="metric-mini-chart">
                  <svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none">
                    <path :d="sparklinePath(m.sparkline)" fill="none" stroke="#1890ff" stroke-width="1.5"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- 情感分布趋势（0-100%） -->
            <div class="sentiment-trend-chart">
              <div class="chart-header">
                <span class="chart-title">情感分布趋势</span>
                <div class="chart-legend">
                  <span class="legend-item"><i class="fas fa-circle" style="color: #52c41a;"></i> 正面</span>
                  <span class="legend-item"><i class="fas fa-circle" style="color: #faad14;"></i> 中性</span>
                  <span class="legend-item"><i class="fas fa-circle" style="color: #f5222d;"></i> 负面</span>
                </div>
              </div>
              <div class="chart-container">
                <svg class="chart-svg" :viewBox="`0 0 ${CHART_W} ${CHART_H}`" preserveAspectRatio="none"
                     @mousemove="onSentimentMove" @mouseleave="clearHover">
                  <template v-for="(t, i) in sentimentGeom.ticks" :key="'sg'+i">
                    <line :x1="PAD.l" :x2="CHART_W - PAD.r"
                          :y1="sentimentGeom.y(t)" :y2="sentimentGeom.y(t)"
                          stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
                    <text :x="PAD.l - 8" :y="sentimentGeom.y(t) + 4" text-anchor="end" font-size="11" fill="#999">{{ t }}%</text>
                  </template>
                  <text :x="PAD.l - 40" :y="PAD.t - 4" font-size="11" fill="#999">占比 (%)</text>
                  <text v-for="(label, i) in sentimentLabels" :key="'sx'+i"
                        :x="sentimentGeom.xAt(i)" :y="CHART_H - 10" text-anchor="middle" font-size="11" fill="#999">{{ label }}</text>
                  <g v-for="ds in sentimentGeom.series" :key="ds.label">
                    <path :d="smoothArea(ds.points)" :fill="ds.bgColor" stroke="none"/>
                    <path :d="smoothPath(ds.points)" fill="none" :stroke="ds.color" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
                    <circle v-for="(p, i) in ds.points" :key="i" :cx="p.x" :cy="p.y" r="3" :fill="ds.color"
                            :opacity="hoverIndex === -1 || hoverIndex === i ? 1 : 0.35"/>
                  </g>
                  <line v-if="hoverIndex >= 0"
                        :x1="sentimentGeom.xAt(hoverIndex)" :x2="sentimentGeom.xAt(hoverIndex)"
                        :y1="PAD.t" :y2="CHART_H - PAD.b" stroke="rgba(0,0,0,0.25)" stroke-width="1" stroke-dasharray="4 3"/>
                </svg>
                <div v-if="sentimentPos && hoverIndex >= 0" class="chart-tooltip" :style="sentimentPos">
                  <div class="tooltip-title">日期: {{ sentimentLabels[hoverIndex] }}</div>
                  <div v-for="ds in sentimentGeom.series" :key="ds.label" class="tooltip-row">
                    <i class="fas fa-circle" :style="{ color: ds.color }"></i>
                    {{ ds.label }}: {{ Math.round(ds.points[hoverIndex].value) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- ========== 媒体—技术耦合网络视图 ========== -->
      <div v-show="activeTab === 'network'">
        <h3 class="section-title"><i class="fas fa-project-diagram" style="color: #1890ff; margin-right: 10px;"></i>媒体—技术耦合网络视图</h3>
        <div class="network-layout">
          <div class="network-main">
            <div class="network-toolbar">
              <button class="tool-btn" @click="drawNetwork"><i class="fas fa-redo"></i> 重置视图</button>
              <button class="tool-btn" @click="showToast('已放大', 'info')"><i class="fas fa-search-plus"></i> 局部放大</button>
              <button class="tool-btn" @click="showToast('已缩小', 'info')"><i class="fas fa-search-minus"></i> 缩小</button>
              <button class="tool-btn" @click="showToast('图谱导出中', 'info')"><i class="fas fa-download"></i> 导出图谱</button>
            </div>
            <div class="network-canvas-wrapper">
              <canvas ref="networkCanvasRef" width="800" height="600" @click="onNodeClick"></canvas>
              <div class="network-legend">
                <span><i class="fas fa-circle" style="color: #1890ff;"></i> 媒体节点</span>
                <span><i class="fas fa-circle" style="color: #52c41a;"></i> 技术主题</span>
                <span><i class="fas fa-circle" style="color: #722ed1;"></i> 科技实体</span>
              </div>
              <div class="network-hint">点击节点查看详情，拖拽节点可重新布局</div>
            </div>
          </div>
          <div class="network-sidebar">
            <div class="filter-panel">
              <h4 class="panel-title">网络过滤</h4>
              <div class="filter-group">
                <label>地域范围</label>
                <select class="filter-input" v-model="networkFilters.region">
                  <option value="">全部地域</option>
                  <option value="北京">北京</option>
                  <option value="广东">广东</option>
                  <option value="上海">上海</option>
                </select>
              </div>
              <div class="filter-group">
                <label>时间范围</label>
                <select class="filter-input" v-model="networkFilters.timeRange">
                  <option value="">全部时间</option>
                  <option value="7d">近7天</option>
                  <option value="30d">近30天</option>
                  <option value="90d">近90天</option>
                </select>
              </div>
              <div class="filter-group">
                <label>情感倾向</label>
                <select class="filter-input" v-model="networkFilters.sentiment">
                  <option value="">全部</option>
                  <option value="positive">正面</option>
                  <option value="neutral">中性</option>
                  <option value="negative">负面</option>
                </select>
              </div>
              <button class="btn-apply" @click="applyNetworkFilter">应用过滤</button>
              <button class="btn-clear" @click="clearNetworkFilter">清除过滤</button>
            </div>
            <div class="path-panel">
              <h4 class="panel-title">路径查找</h4>
              <div class="filter-group">
                <label>起始节点</label>
                <input class="filter-input" v-model="pathStart" placeholder="输入节点名称" />
              </div>
              <div class="filter-group">
                <label>目标节点</label>
                <input class="filter-input" v-model="pathEnd" placeholder="输入节点名称" />
              </div>
              <button class="btn-apply" @click="findPath"><i class="fas fa-route"></i> 查找传播路径</button>
            </div>
          </div>
        </div>
        <!-- 节点详情侧边面板 -->
        <div v-if="selectedNode" class="node-detail-panel">
          <div class="panel-header">
            <span class="node-name">{{ selectedNode.label }}</span>
            <span class="node-type-badge" :class="selectedNode.type">{{ selectedNode.type === 'media' ? '媒体' : selectedNode.type === 'tech' ? '技术' : '实体' }}</span>
            <button class="close-btn" @click="selectedNode = null"><i class="fas fa-times"></i></button>
          </div>
          <div class="panel-section">
            <h5>基本信息</h5>
            <div class="info-row"><span>节点类型</span><span>{{ selectedNode.type }}</span></div>
            <div class="info-row"><span>连接数</span><span>{{ networkEdges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length }}</span></div>
          </div>
          <div class="panel-section">
            <h5>时间线趋势</h5>
            <div class="mini-trend-chart chart-placeholder" style="height: 60px;"></div>
          </div>
          <div class="panel-section">
            <h5>关键词云</h5>
            <div class="keyword-cloud">
              <span v-for="kw in ['技术突破', '产业化', '政策支持', '投资热潮', '人才培养']" :key="kw" class="keyword-tag" :style="{ fontSize: (12 + Math.random() * 8) + 'px' }">{{ kw }}</span>
            </div>
          </div>
          <div class="panel-section">
            <h5>代表性报道</h5>
            <div class="report-item"><span class="report-title">大模型技术突破引发行业变革</span><span class="report-source">科技日报 · 2024-03-20</span></div>
            <div class="report-item"><span class="report-title">AI产业投资创历史新高</span><span class="report-source">36氪 · 2024-03-18</span></div>
          </div>
        </div>
      </div>

      <!-- ========== 热点检测与突发事件追踪 ========== -->
      <div v-show="activeTab === 'hotspot-tracking'">
        <h3 class="section-title"><i class="fas fa-fire" style="color: #fa8c16; margin-right: 10px;"></i>突发事件追踪</h3>
        <div class="hotspot-tracking-list">
          <div v-for="(item, idx) in hotspotTracking" :key="idx" class="tracking-item">
            <div class="tracking-header">
              <span class="tracking-name">{{ item.name }}</span>
              <div class="tracking-tags">
                <span v-for="tag in item.scope" :key="tag" class="scope-tag">{{ tag }}</span>
                <span class="status-badge" :class="item.status">{{ item.status }}</span>
              </div>
            </div>
            <div class="tracking-meta">
              <div class="meta-item"><span class="meta-label">首次报道</span><span class="meta-value">{{ item.firstReport }}</span></div>
              <div class="meta-item"><span class="meta-label">爆发时间</span><span class="meta-value">{{ item.burstTime }}</span></div>
              <div class="meta-item"><span class="meta-label">传播速度</span><span class="meta-value up">{{ item.spreadSpeed }}</span></div>
              <div class="meta-item"><span class="meta-label">报道增量</span><span class="meta-value">{{ item.reportIncrement }}</span></div>
              <div class="meta-item"><span class="meta-label">峰值热度</span><span class="meta-value">{{ item.peakHeat }}</span></div>
              <div class="meta-item"><span class="meta-label">持续天数</span><span class="meta-value">{{ item.duration }}</span></div>
            </div>
            <div class="tracking-actions">
              <button class="btn-action" @click="addToMonitor(item.name)"><i class="fas fa-plus"></i> 加入监控</button>
              <button class="btn-action" @click="showToast('生成' + item.name + '简报中', 'info')"><i class="fas fa-file-alt"></i> 生成简报</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== 耦合度分析与解读面板 ========== -->
      <div v-show="activeTab === 'coupling-analysis'">
        <h3 class="section-title"><i class="fas fa-link" style="color: #722ed1; margin-right: 10px;"></i>耦合度分析与解读</h3>
        <div class="coupling-layout">
          <div class="coupling-left">
            <h4 class="panel-title">相关系数矩阵</h4>
            <table class="correlation-table">
              <thead>
                <tr><th>主题</th><th>媒体</th><th>技术</th><th>实体</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in correlationMatrix" :key="row.topic">
                  <td>{{ row.topic }}</td>
                  <td>{{ row.media }}</td>
                  <td>{{ row.tech }}</td>
                  <td>{{ row.entity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="coupling-right">
            <h4 class="panel-title">滞后效应分析</h4>
            <div v-for="(item, idx) in lagAnalysis" :key="idx" class="lag-item">
              <div class="lag-header"><span class="lag-media">{{ item.media }}</span><span class="lag-time">{{ item.lag }}</span></div>
              <div class="lag-effect">{{ item.effect }}</div>
              <div class="lag-confidence">置信度 {{ item.confidence }}</div>
            </div>
          </div>
        </div>
        <div class="granger-section">
          <h4 class="panel-title">Granger因果检验</h4>
          <table class="granger-table">
            <thead><tr><th>原因</th><th>结果</th><th>F统计量</th><th>P值</th><th>显著性</th></tr></thead>
            <tbody>
              <tr v-for="(r, idx) in grangerResults" :key="idx">
                <td>{{ r.cause }}</td><td>{{ r.effect }}</td><td>{{ r.fStat }}</td><td>{{ r.pValue }}</td><td>{{ r.significance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="heatmap-section">
          <h4 class="panel-title">耦合强度时间热力图</h4>
          <div class="heatmap-grid">
            <div v-for="i in 70" :key="i" class="heatmap-cell" :style="{ background: 'rgba(24, 144, 255, ' + (Math.random() * 0.8 + 0.1) + ')' }"></div>
          </div>
        </div>
      </div>

      <!-- ========== 动态监控与预警 ========== -->
      <div v-show="activeTab === 'warning'">
        <h3 class="section-title"><i class="fas fa-bell" style="color: #fa8c16; margin-right: 10px;"></i>动态监控与预警</h3>
        <div class="monitor-stats">
          <div class="monitor-stat"><div class="stat-num">{{ monitorStats.topics }}</div><div class="stat-label">监控主题</div></div>
          <div class="monitor-stat"><div class="stat-num">{{ monitorStats.entities }}</div><div class="stat-label">监控实体</div></div>
          <div class="monitor-stat"><div class="stat-num">{{ monitorStats.activeAlerts }}</div><div class="stat-label">活跃预警</div></div>
          <div class="monitor-stat"><div class="stat-num">{{ monitorStats.regions }}</div><div class="stat-label">监控地域</div></div>
        </div>
        <div class="warning-section">
          <h4 class="panel-title">实时预警列表</h4>
          <div class="warning-list">
            <div v-for="(w, idx) in warningList" :key="idx" class="warning-item" :class="'level-' + w.level">
              <div class="warning-level" :class="'level-' + w.level">{{ w.level }}</div>
              <div class="warning-content">
                <div class="warning-title">{{ w.title }}</div>
                <div class="warning-detail">{{ w.detail }} · 触发规则：{{ w.rule }} · 关联热点：{{ w.hotspot }}</div>
                <div class="warning-time">{{ w.time }}</div>
              </div>
              <div class="warning-actions">
                <button class="btn-action" @click="showToast('查看详情', 'info')">查看详情</button>
                <button class="btn-action" @click="showToast('已忽略', 'info')">忽略</button>
              </div>
            </div>
          </div>
        </div>
        <div class="rule-section">
          <div class="rule-header">
            <h4 class="panel-title">监控规则管理</h4>
            <button class="btn-primary-blue" @click="openRuleModal"><i class="fas fa-plus"></i> 新建规则</button>
          </div>
          <table class="rule-table">
            <thead><tr><th>规则名称</th><th>状态</th><th>类型</th><th>监控主题</th><th>触发指标</th><th>时间窗</th><th>预警级别</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="(r, idx) in ruleList" :key="idx">
                <td>{{ r.name }}</td>
                <td><span class="status-badge" :class="r.status">{{ r.status === 'active' ? '运行中' : '已暂停' }}</span></td>
                <td>{{ r.type }}</td>
                <td>{{ r.topic }}</td>
                <td>{{ r.metric }}</td>
                <td>{{ r.window }}</td>
                <td>{{ r.level }}</td>
                <td>
                  <button class="btn-icon" @click="toggleRule(idx)"><i :class="r.status === 'active' ? 'fas fa-pause' : 'fas fa-play'"></i></button>
                  <button class="btn-icon" @click="showToast('编辑规则', 'info')"><i class="fas fa-edit"></i></button>
                  <button class="btn-icon" @click="showToast('规则已删除', 'success')"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ========== 报告与建议生成 ========== -->
      <div v-show="activeTab === 'report'">
        <h3 class="section-title"><i class="fas fa-file-alt" style="color: #1890ff; margin-right: 10px;"></i>报告与建议生成</h3>
        <div class="report-layout">
          <div class="report-config">
            <h4 class="panel-title">报告生成配置</h4>
            <div class="form-group">
              <label>报告模板</label>
              <select class="form-input" v-model="reportConfig.template">
                <option>科技舆情短报</option>
                <option>战略研判报告</option>
                <option>舆情应对建议书</option>
              </select>
            </div>
            <div class="form-group">
              <label>时间范围</label>
              <select class="form-input" v-model="reportConfig.timeRange">
                <option>近7天</option><option>近30天</option><option>近90天</option><option>近1年</option>
              </select>
            </div>
            <div class="form-group">
              <label>报告标题</label>
              <input class="form-input" v-model="reportConfig.title" />
            </div>
            <div class="form-group">
              <label>包含内容</label>
              <div class="checkbox-group">
                <label class="checkbox-item"><input type="checkbox" v-model="reportConfig.modules.trend" /> 趋势分析</label>
                <label class="checkbox-item"><input type="checkbox" v-model="reportConfig.modules.coupling" /> 媒体技术耦合</label>
                <label class="checkbox-item"><input type="checkbox" v-model="reportConfig.modules.media" /> 代表媒体分析</label>
                <label class="checkbox-item"><input type="checkbox" v-model="reportConfig.modules.action" /> 推荐行动</label>
              </div>
            </div>
            <button class="btn-primary-blue" @click="generateReport"><i class="fas fa-file-alt"></i> 生成报告</button>
          </div>
          <div class="report-preview">
            <h4 class="panel-title">报告预览</h4>
            <div class="preview-area">
              <div class="preview-placeholder">
                <i class="fas fa-file-alt" style="font-size: 48px; color: #d9d9d9;"></i>
                <p>配置完成后点击"生成报告"按钮</p>
              </div>
            </div>
          </div>
        </div>
        <div class="report-history">
          <h4 class="panel-title">历史报告</h4>
          <div class="history-list">
            <div v-for="(r, idx) in reportHistory" :key="idx" class="history-item">
              <div class="history-info">
                <span class="history-title">{{ r.title }}</span>
                <span class="history-meta">{{ r.type }} · {{ r.date }} · {{ r.status }}</span>
              </div>
              <div class="history-actions">
                <button class="btn-action" @click="showToast('查看报告', 'info')"><i class="fas fa-eye"></i> 查看</button>
                <button class="btn-action" @click="showToast('下载中', 'info')"><i class="fas fa-download"></i> 下载</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== 智能推荐与溯源 ========== -->
      <div v-show="activeTab === 'recommendation'">
        <h3 class="section-title"><i class="fas fa-lightbulb" style="color: #faad14; margin-right: 10px;"></i>智能推荐与溯源</h3>
        <div class="recommend-topic-bar">
          <label>当前分析主题：</label>
          <select class="form-input" v-model="recommendTopic" style="width: 300px;">
            <option>人工智能大模型</option><option>量子计算</option><option>新能源汽车</option><option>6G通信</option>
          </select>
        </div>
        <div class="recommend-stats">
          <div class="recommend-stat"><div class="stat-num">{{ recommendStats.topics }}</div><div class="stat-label">相关技术主题</div></div>
          <div class="recommend-stat"><div class="stat-num">{{ recommendStats.orgs }}</div><div class="stat-label">潜在受影响机构</div></div>
          <div class="recommend-stat"><div class="stat-num">{{ recommendStats.media }}</div><div class="stat-label">关键意见媒体</div></div>
          <div class="recommend-stat"><div class="stat-num">{{ recommendStats.people }}</div><div class="stat-label">关键人物</div></div>
        </div>
        <div class="recommend-filters">
          <select class="form-input" style="width: 150px;"><option>相似度 ≥ 0.8</option><option>相似度 ≥ 0.7</option><option>相似度 ≥ 0.6</option></select>
          <select class="form-input" style="width: 150px;"><option>全部类型</option><option>技术主题</option><option>机构</option><option>媒体</option><option>人物</option></select>
          <select class="form-input" style="width: 150px;"><option>按相似度排序</option><option>按证据数排序</option><option>按更新时间排序</option></select>
          <button class="btn-primary-blue" @click="showToast('推荐已刷新', 'success')"><i class="fas fa-sync"></i> 刷新推荐</button>
        </div>
        <div class="recommend-sections">
          <div class="recommend-section">
            <h4 class="panel-title">技术主题推荐</h4>
            <div v-for="item in techRecommendations" :key="item.name" class="recommend-item">
              <div class="recommend-header">
                <span class="recommend-name">{{ item.name }}</span>
                <span class="similarity-badge">{{ item.similarity }}</span>
              </div>
              <div class="similarity-bar"><div class="similarity-fill" :style="{ width: (item.similarity * 100) + '%' }"></div></div>
              <div class="recommend-reason">{{ item.reason }}</div>
              <div class="recommend-meta">证据 {{ item.evidences }} 条 · 更新于 {{ item.updated }}</div>
              <div class="recommend-actions">
                <button class="btn-action" @click="showToast('查看证据', 'info')"><i class="fas fa-search"></i> 查看证据</button>
                <button class="btn-action" @click="showToast('已加入关注', 'success')"><i class="fas fa-star"></i> 加入关注</button>
              </div>
            </div>
          </div>
          <div class="recommend-section">
            <h4 class="panel-title">潜在受影响机构推荐</h4>
            <div v-for="item in orgRecommendations" :key="item.name" class="recommend-item">
              <div class="recommend-header">
                <span class="recommend-name">{{ item.name }}</span>
                <span class="similarity-badge">{{ item.similarity }}</span>
              </div>
              <div class="similarity-bar"><div class="similarity-fill" :style="{ width: (item.similarity * 100) + '%' }"></div></div>
              <div class="recommend-reason">{{ item.reason }}</div>
              <div class="recommend-meta">证据 {{ item.evidences }} 条 · 更新于 {{ item.updated }}</div>
              <div class="recommend-actions">
                <button class="btn-action" @click="showToast('溯源中', 'info')"><i class="fas fa-search"></i> 溯源</button>
                <button class="btn-action" @click="showToast('已加入关注', 'success')"><i class="fas fa-star"></i> 加入关注</button>
              </div>
            </div>
          </div>
          <div class="recommend-section">
            <h4 class="panel-title">关键意见媒体推荐</h4>
            <div v-for="item in mediaRecommendations" :key="item.name" class="recommend-item">
              <div class="recommend-header">
                <span class="recommend-name">{{ item.name }}</span>
                <span class="similarity-badge">{{ item.similarity }}</span>
              </div>
              <div class="similarity-bar"><div class="similarity-fill" :style="{ width: (item.similarity * 100) + '%' }"></div></div>
              <div class="recommend-reason">{{ item.reason }}</div>
              <div class="recommend-meta">证据 {{ item.evidences }} 条 · 更新于 {{ item.updated }}</div>
              <div class="recommend-actions">
                <button class="btn-action" @click="showToast('查看证据', 'info')"><i class="fas fa-search"></i> 查看证据</button>
                <button class="btn-action" @click="showToast('已加入关注', 'success')"><i class="fas fa-star"></i> 加入关注</button>
              </div>
            </div>
          </div>
          <div class="recommend-section">
            <h4 class="panel-title">关键人物推荐</h4>
            <div v-for="item in peopleRecommendations" :key="item.name" class="recommend-item">
              <div class="recommend-header">
                <span class="recommend-name">{{ item.name }}</span>
                <span class="similarity-badge">{{ item.similarity }}</span>
              </div>
              <div class="similarity-bar"><div class="similarity-fill" :style="{ width: (item.similarity * 100) + '%' }"></div></div>
              <div class="recommend-reason">{{ item.reason }}</div>
              <div class="recommend-meta">证据 {{ item.evidences }} 条 · 更新于 {{ item.updated }}</div>
              <div class="recommend-actions">
                <button class="btn-action" @click="showToast('查看证据', 'info')"><i class="fas fa-search"></i> 查看证据</button>
                <button class="btn-action" @click="showToast('已加入关注', 'success')"><i class="fas fa-star"></i> 加入关注</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast-container">
      <div v-for="t in toastList" :key="t.id" class="toast" :class="'toast-' + t.type">
        <i :class="t.type === 'success' ? 'fas fa-check-circle' : t.type === 'warning' ? 'fas fa-exclamation-triangle' : 'fas fa-info-circle'"></i>
        {{ t.msg }}
      </div>
    </div>

    <!-- 屏幕顶部居中提示（加入监控等，复刻原型） -->
    <div v-if="centerToast" class="center-toast" :class="'ct-' + centerToast.type">
      <i :class="centerToast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle'"></i>
      {{ centerToast.message }}
    </div>

    <!-- 耦合度分析弹窗 -->
    <div v-if="showCouplingModal" class="modal-overlay" @click.self="showCouplingModal = false">
      <div class="modal-content" style="width: 600px;">
        <div class="modal-header">
          <h3>媒体—技术耦合度详情</h3>
          <button class="close-btn" @click="showCouplingModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="coupling-detail">
            <div class="detail-row"><span>综合耦合度评分</span><span class="detail-value">87.6</span></div>
            <div class="detail-row"><span>媒体覆盖度</span><span>92.3</span></div>
            <div class="detail-row"><span>技术关联度</span><span>85.2</span></div>
            <div class="detail-row"><span>实体参与度</span><span>78.9</span></div>
            <div class="detail-row"><span>时间同步性</span><span>91.4</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 多序列对比弹窗（滞后相关系数分析） -->
    <div v-if="showCompareModal" class="modal-overlay" @click.self="showCompareModal = false">
      <div class="modal-content compare-modal">
        <div class="modal-header">
          <h3><i class="fas fa-chart-bar" style="color: #1890ff; margin-right: 8px;"></i>多序列对比分析</h3>
          <button class="close-btn" @click="showCompareModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="compare-config">
            <div class="config-title">
              选择对比指标
              <span class="selected-count-badge"><i class="fas fa-check-circle"></i> 已选 {{ selectedCompare.length }}/4 项</span>
            </div>
            <div class="checkbox-group">
              <label v-for="ind in COMPARE_INDICATORS" :key="ind.key" class="checkbox-item">
                <input type="checkbox" v-model="compareChecked[ind.key]" @change="onCompareChange" />
                <span class="checkbox-label"><i class="fas fa-circle" :style="{ color: ind.color }"></i> {{ ind.label === '媒体提及' ? '媒体提及数' : ind.label === '政策' ? '政策关键词' : ind.label }}</span>
              </label>
            </div>
            <div class="lag-config">
              <div class="config-title">滞后时间设置</div>
              <div class="lag-controls">
                <div class="lag-select-item">
                  <label>滞后天数：</label>
                  <select v-model.number="lagDays" @change="onCompareChange">
                    <option :value="0">无滞后</option>
                    <option :value="1">滞后1天</option>
                    <option :value="3">滞后3天</option>
                    <option :value="7">滞后7天</option>
                    <option :value="14">滞后14天</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="correlation-result">
            <div class="result-title">滞后相关系数分析</div>
            <div v-if="selectedCompare.length < 2" class="compare-empty">
              <i class="fas fa-info-circle" style="margin-right: 6px;"></i>请至少选择2个指标进行对比分析
            </div>
            <template v-else>
              <div class="correlation-matrix" :style="{ gridTemplateColumns: `100px repeat(${selectedCompare.length}, 1fr)` }">
                <div class="matrix-cell header"></div>
                <div v-for="(ind, j) in selectedCompare" :key="'h'+j" class="matrix-cell header">{{ ind.label }}</div>
                <template v-for="(ind, i) in selectedCompare" :key="'r'+i">
                  <div class="matrix-cell header row-header">{{ ind.label }}</div>
                  <div v-for="(ind2, j) in selectedCompare" :key="'c'+i+'-'+j"
                       class="matrix-cell" :class="cellClass(compareMatrix[i][j], i === j)"
                       @click="i !== j && showCellDetail(i, j)">
                    {{ compareMatrix[i][j].toFixed(2) }}
                    <span v-if="i !== j" class="cell-tooltip">
                      {{ ind.label }} ↔ {{ ind2.label }}<br>
                      <b>{{ Math.abs(compareMatrix[i][j]) >= 0.85 ? '强正相关' : Math.abs(compareMatrix[i][j]) >= 0.7 ? '中等正相关' : '弱相关' }}</b>
                      (r={{ compareMatrix[i][j].toFixed(2) }})
                    </span>
                  </div>
                </template>
              </div>
              <div class="correlation-insight">
                <i class="fas fa-lightbulb" style="color: #faad14;"></i>
                <span v-html="compareInsight"></span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 矩阵单元格耦合详情 -->
    <div v-if="cellDetail" class="modal-overlay" @click.self="cellDetail = null">
      <div class="modal-content" style="width: 420px;">
        <div class="modal-header">
          <h3><i class="fas fa-project-diagram" :style="{ color: cellDetail.color, marginRight: '8px' }"></i>{{ cellDetail.name1 }} 与 {{ cellDetail.name2 }} 耦合详情</h3>
          <button class="close-btn" @click="cellDetail = null"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="cd-metric">
            <span class="cd-label">皮尔逊相关系数</span>
            <span class="cd-value" :style="{ color: cellDetail.color, fontSize: '18px' }">{{ cellDetail.value.toFixed(3) }}</span>
          </div>
          <div class="cd-bar-wrap"><div class="cd-bar-fill" :style="{ width: cellDetail.width + '%', background: `linear-gradient(90deg, ${cellDetail.color}, #95de64)` }"></div></div>
          <div class="cd-metric"><span class="cd-label">相关强度</span><span class="cd-value">{{ cellDetail.level }}</span></div>
          <div class="cd-metric"><span class="cd-label">耦合方向</span><span class="cd-value">{{ cellDetail.direction }}</span></div>
          <div class="cd-metric"><span class="cd-label">解释方差(R²)</span><span class="cd-value">{{ cellDetail.r2 }}%</span></div>
          <div class="cd-metric cd-column">
            <span class="cd-label">统计解读</span>
            <span class="cd-text">{{ cellDetail.text }}</span>
          </div>
          <div style="text-align: right; margin-top: 16px;">
            <button class="btn-primary-blue" @click="cellDetail = null">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 规则配置弹窗 -->
    <div v-if="showRuleModal" class="modal-overlay" @click.self="showRuleModal = false">
      <div class="modal-content" style="width: 600px;">
        <div class="modal-header">
          <h3>新建监控规则</h3>
          <button class="close-btn" @click="showRuleModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="form-group"><label>规则名称</label><input class="form-input" placeholder="输入规则名称" /></div>
          <div class="form-group"><label>规则类型</label><select class="form-input"><option>阈值式</option><option>增速式</option><option>复合</option></select></div>
          <div class="form-group"><label>监控主题</label><input class="form-input" placeholder="选择监控主题" /></div>
          <div class="form-group"><label>触发指标</label><select class="form-input"><option>热度指数</option><option>报道量</option><option>情感占比</option><option>讨论量</option></select></div>
          <div class="form-group"><label>时间窗</label><select class="form-input"><option>1小时</option><option>6小时</option><option>12小时</option><option>24小时</option></select></div>
          <div class="form-group"><label>预警级别</label><select class="form-input"><option>低</option><option>中</option><option>高</option></select></div>
          <button class="btn-primary-blue" @click="showRuleModal = false; showToast('规则已创建', 'success')"><i class="fas fa-save"></i> 保存规则</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-focus-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #d8e7fc;
  min-height: calc(100vh - 132px);
  color: #333;
}

/* Tab */
.top-navbar { position: fixed; top: 48px; left: 220px; right: 0; height: 64px; background: #fff; padding: 0 20px; border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; z-index: 90; }
.navbar-nav { display: flex; gap: 4px; width: 100%; overflow-x: auto; white-space: nowrap; }
.nav-link { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 6px; text-decoration: none; color: #666; font-size: 13px; cursor: pointer; transition: all 0.3s; white-space: nowrap; }
.nav-link:hover { background: #f0f5ff; color: #1890ff; }
.nav-link.active { background: #1890ff; color: #fff; }
/* 主内容 */
.main-content { padding: 132px 0 0; overflow-x: hidden; }
.section-title { font-size: 20px; font-weight: 600; color: #333; margin-bottom: 20px; }
/* 统计卡片 */
.stats-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
.stat-card { background: #fff; border-radius: 8px; padding: 24px; display: flex; align-items: flex-start; gap: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); position: relative; transition: all 0.3s; }
.stat-card.clickable { cursor: pointer; }
.stat-card.clickable:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.stat-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #fff; flex-shrink: 0; }
.stat-icon.blue { background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%); }
.stat-icon.orange { background: linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%); }
.stat-icon.green { background: linear-gradient(135deg, #52c41a 0%, #95de64 100%); }
.stat-icon.purple { background: linear-gradient(135deg, #722ed1 0%, #b37feb 100%); }
.stat-info { flex: 1; }
.stat-value { font-size: 32px; font-weight: 700; color: #333; line-height: 1.2; margin-bottom: 4px; }
.stat-label { font-size: 14px; color: #666; margin-bottom: 8px; }
.stat-trend { font-size: 13px; display: flex; align-items: center; gap: 4px; }
.stat-trend.up { color: #52c41a; }
.stat-trend.down { color: #f5222d; }
.click-hint { position: absolute; bottom: 8px; right: 12px; font-size: 11px; color: #1890ff; }
.sentiment-bars { display: flex; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.sentiment-bar { height: 100%; }
.sentiment-bar.positive { background: #52c41a; }
.sentiment-bar.neutral { background: #faad14; }
.sentiment-bar.negative { background: #f5222d; }
.sentiment-legend { display: flex; gap: 12px; font-size: 11px; margin-top: 4px; }
.sentiment-legend .positive { color: #52c41a; }
.sentiment-legend .neutral { color: #faad14; }
.sentiment-legend .negative { color: #f5222d; }
.score-ring { width: 40px; height: 40px; border-radius: 50%; background: conic-gradient(#722ed1 var(--progress), #f0f0f0 0); display: flex; align-items: center; justify-content: center; margin-top: 4px; }
.score-ring::after { content: ''; width: 32px; height: 32px; border-radius: 50%; background: #fff; }
/* 热点列表 */
.hotspot-section { background: #fff; border-radius: 8px; padding: 24px; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.hotspot-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f0f0f0; }
.hotspot-title { font-size: 16px; font-weight: 600; color: #333; }
.hotspot-sort { display: flex; gap: 8px; }
.sort-btn { padding: 6px 16px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 13px; color: #666; transition: all 0.3s; }
.sort-btn:hover, .sort-btn.active { border-color: #1890ff; color: #1890ff; background: #f0f5ff; }
.hotspot-list { display: flex; flex-direction: column; gap: 12px; }
.hotspot-item { display: flex; align-items: center; gap: 16px; padding: 16px; background: #fafafa; border-radius: 8px; transition: all 0.3s; }
.hotspot-item:hover { background: #f0f5ff; box-shadow: 0 2px 8px rgba(24,144,255,0.1); }
.hotspot-rank { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; flex-shrink: 0; }
.hotspot-rank.top3 { background: linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%); color: #fff; }
.hotspot-rank.normal { background: #f0f0f0; color: #666; }
.hotspot-content { flex: 1; }
.hotspot-name { font-size: 14px; font-weight: 500; color: #333; margin-bottom: 4px; }
.hotspot-meta { display: flex; gap: 16px; font-size: 12px; color: #999; }
.hotspot-meta span { display: flex; align-items: center; gap: 4px; }
.hotspot-heat { display: flex; align-items: center; gap: 8px; margin-right: 16px; }
.heat-bar { width: 80px; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.heat-fill { height: 100%; background: linear-gradient(90deg, #fa8c16 0%, #ffc53d 100%); border-radius: 3px; }
.heat-value { font-size: 13px; font-weight: 600; color: #fa8c16; }
.btn-monitor { padding: 6px 16px; border: 1px solid #1890ff; background: #fff; color: #1890ff; border-radius: 4px; cursor: pointer; font-size: 13px; transition: all 0.3s; }
.btn-monitor:hover { background: #1890ff; color: #fff; }
.btn-monitor.added { background: #52c41a; border-color: #52c41a; color: #fff; }
.btn-monitor.added:hover { background: #73d13d; border-color: #73d13d; color: #fff; }
/* 趋势 */
.trend-section { background: #fff; border-radius: 8px; padding: 24px; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.trend-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f0f0f0; flex-wrap: wrap; gap: 16px; }
.trend-title { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
.trend-subtitle { font-size: 13px; color: #1890ff; font-weight: 500; padding: 4px 12px; background: #f0f5ff; border-radius: 4px; margin-left: 8px; }
.trend-controls { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.trend-select { padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 13px; color: #333; background: #fff; min-width: 200px; cursor: pointer; }
.trend-select:focus { outline: none; border-color: #1890ff; }
.control-btn { padding: 8px 16px; border: 1px solid #d9d9d9; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; color: #666; transition: all 0.3s; display: flex; align-items: center; gap: 6px; }
.control-btn:hover { border-color: #1890ff; color: #1890ff; background: #f0f5ff; }
.trend-time-range { display: flex; gap: 4px; }
.time-btn { padding: 6px 14px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 13px; color: #666; transition: all 0.3s; }
.time-btn:hover, .time-btn.active { border-color: #1890ff; color: #1890ff; background: #f0f5ff; }
.trend-charts { display: flex; flex-direction: column; gap: 24px; }
.trend-chart-main, .sentiment-trend-chart { background: #fafafa; border-radius: 8px; padding: 20px; }
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
.chart-title { font-size: 15px; font-weight: 600; color: #333; }
.chart-legend { display: flex; gap: 16px; flex-wrap: wrap; }
.legend-item { font-size: 13px; color: #666; display: flex; align-items: center; gap: 6px; }
.legend-item i { font-size: 8px; }
.chart-container { height: 300px; position: relative; }
.chart-svg { width: 100%; height: 100%; display: block; }
.trend-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.metric-card { background: #fafafa; border-radius: 8px; padding: 20px; display: flex; align-items: flex-start; gap: 12px; transition: all 0.3s; }
.metric-card:hover { background: #f0f5ff; box-shadow: 0 2px 8px rgba(24,144,255,0.1); }
.metric-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; flex-shrink: 0; }
.metric-icon.blue { background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%); }
.metric-icon.green { background: linear-gradient(135deg, #52c41a 0%, #95de64 100%); }
.metric-icon.orange { background: linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%); }
.metric-icon.purple { background: linear-gradient(135deg, #722ed1 0%, #b37feb 100%); }
.metric-info { flex: 1; }
.metric-value { font-size: 24px; font-weight: 700; color: #333; line-height: 1.2; margin-bottom: 4px; }
.metric-label { font-size: 13px; color: #666; }
.metric-mini-chart { width: 80px; }
.sparkline { width: 100%; height: 24px; }
/* 网络视图 */
.network-layout { display: flex; gap: 16px; }
.network-main { flex: 1; background: #fff; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.network-toolbar { display: flex; gap: 8px; margin-bottom: 12px; }
.tool-btn { padding: 6px 12px; background: #fff; border: 1px solid #d9d9d9; border-radius: 4px; cursor: pointer; font-size: 13px; }
.tool-btn:hover { border-color: #1890ff; color: #1890ff; }
.network-canvas-wrapper { position: relative; border: 1px solid #e8e8e8; border-radius: 8px; overflow: hidden; }
.network-canvas-wrapper canvas { display: block; background: #fafafa; cursor: pointer; width: 100%; }
.network-legend { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; }
.network-hint { position: absolute; bottom: 12px; left: 12px; background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #999; }
.network-sidebar { width: 320px; display: flex; flex-direction: column; gap: 20px; }
.filter-panel, .path-panel { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.panel-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 16px; }
.filter-group { margin-bottom: 12px; }
.filter-group label { display: block; font-size: 12px; color: #666; margin-bottom: 4px; }
.filter-input { width: 100%; padding: 6px 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 13px; }
.btn-apply { width: 100%; padding: 8px; background: #1890ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 8px; font-size: 13px; }
.btn-clear { width: 100%; padding: 8px; background: #fff; border: 1px solid #d9d9d9; border-radius: 4px; cursor: pointer; font-size: 13px; }
.node-detail-panel { background: #fff; border-radius: 8px; padding: 16px; margin-top: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.panel-header { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.node-name { font-size: 16px; font-weight: 600; }
.node-type-badge { padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #fff; }
.node-type-badge.media { background: #1890ff; }
.node-type-badge.tech { background: #52c41a; }
.node-type-badge.entity { background: #722ed1; }
.close-btn { margin-left: auto; background: none; border: none; cursor: pointer; color: #999; font-size: 16px; }
.panel-section { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #f0f0f0; }
.panel-section h5 { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.info-row { display: flex; justify-content: space-between; font-size: 12px; padding: 4px 0; }
.info-row span:first-child { color: #999; }
.mini-trend-chart { height: 60px; }
.keyword-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.keyword-tag { color: #1890ff; }
.report-item { display: flex; flex-direction: column; gap: 2px; padding: 6px 0; }
.report-title { font-size: 13px; color: #333; }
.report-source { font-size: 11px; color: #999; }
/* 热点追踪 */
.hotspot-tracking-list { display: flex; flex-direction: column; gap: 16px; }
.tracking-item { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.tracking-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.tracking-name { font-size: 16px; font-weight: 600; }
.tracking-tags { display: flex; gap: 8px; }
.scope-tag { padding: 2px 8px; background: #e6f7ff; color: #1890ff; border-radius: 4px; font-size: 11px; }
.status-badge { padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.status-badge.爆发期 { background: #fff1f0; color: #f5222d; }
.status-badge.蔓延期 { background: #fff7e6; color: #fa8c16; }
.status-badge.衰减期 { background: #f6ffed; color: #52c41a; }
.status-badge.active { background: #f6ffed; color: #52c41a; }
.status-badge.paused { background: #f0f0f0; color: #999; }
.tracking-meta { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 16px; }
.meta-item { display: flex; flex-direction: column; gap: 2px; }
.meta-label { font-size: 11px; color: #999; }
.meta-value { font-size: 14px; font-weight: 500; }
.meta-value.up { color: #f5222d; }
.tracking-actions { display: flex; gap: 8px; }
.btn-action { padding: 6px 12px; background: #fff; border: 1px solid #d9d9d9; border-radius: 4px; cursor: pointer; font-size: 12px; }
.btn-action:hover { border-color: #1890ff; color: #1890ff; }
/* 耦合度分析 */
.coupling-layout { display: flex; gap: 16px; margin-bottom: 24px; }
.coupling-left, .coupling-right { flex: 1; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.correlation-table, .granger-table, .rule-table { width: 100%; border-collapse: collapse; }
.correlation-table th, .granger-table th, .rule-table th { background: #fafafa; padding: 10px; text-align: left; font-size: 12px; font-weight: 600; border-bottom: 1px solid #e8e8e8; }
.correlation-table td, .granger-table td, .rule-table td { padding: 10px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
.lag-item { padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px; margin-bottom: 8px; }
.lag-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.lag-media { font-weight: 600; font-size: 13px; }
.lag-time { color: #fa8c16; font-size: 13px; }
.lag-effect { font-size: 12px; color: #666; margin-bottom: 4px; }
.lag-confidence { font-size: 11px; color: #999; }
.granger-section, .heatmap-section { background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.heatmap-grid { display: grid; grid-template-columns: repeat(14, 1fr); gap: 2px; }
.heatmap-cell { height: 24px; border-radius: 2px; }
/* 预警 */
.monitor-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.monitor-stat, .recommend-stat { background: #fff; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.monitor-stat .stat-num, .recommend-stat .stat-num { font-size: 28px; font-weight: 700; color: #1890ff; }
.monitor-stat .stat-label, .recommend-stat .stat-label { font-size: 13px; color: #999; margin-top: 4px; }
.warning-section, .rule-section { background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.warning-list { display: flex; flex-direction: column; gap: 12px; }
.warning-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px; }
.warning-level { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; color: #fff; flex-shrink: 0; }
.warning-level.level-高 { background: #f5222d; }
.warning-level.level-中 { background: #fa8c16; }
.warning-level.level-低 { background: #52c41a; }
.warning-content { flex: 1; }
.warning-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
.warning-detail { font-size: 12px; color: #666; margin-bottom: 4px; }
.warning-time { font-size: 11px; color: #999; }
.warning-actions { display: flex; gap: 8px; }
.rule-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.rule-table th, .rule-table td { text-align: center; font-size: 12px; }
.btn-icon { padding: 4px 8px; background: none; border: none; cursor: pointer; color: #1890ff; font-size: 13px; }
.btn-icon:hover { color: #40a9ff; }
/* 报告 */
.report-layout { display: flex; gap: 16px; margin-bottom: 24px; }
.report-config, .report-preview { flex: 1; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; font-weight: 500; }
.form-input { width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 13px; }
.checkbox-group { display: flex; flex-wrap: wrap; gap: 12px; }
.checkbox-item { display: flex; align-items: center; gap: 4px; font-size: 13px; cursor: pointer; }
.btn-primary-blue { padding: 8px 16px; background: #1890ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; }
.btn-primary-blue:hover { background: #40a9ff; }
.preview-area { min-height: 300px; border: 1px dashed #d9d9d9; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
.preview-placeholder { text-align: center; color: #999; }
.report-history { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.history-list { display: flex; flex-direction: column; gap: 12px; }
.history-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px; }
.history-info { display: flex; flex-direction: column; gap: 4px; }
.history-title { font-size: 14px; font-weight: 500; }
.history-meta { font-size: 12px; color: #999; }
.history-actions { display: flex; gap: 8px; }
/* 推荐 */
.recommend-topic-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.recommend-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.recommend-filters { display: flex; gap: 12px; margin-bottom: 24px; }
.recommend-sections { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.recommend-section { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.recommend-item { padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px; margin-bottom: 12px; }
.recommend-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.recommend-name { font-size: 14px; font-weight: 500; }
.similarity-badge { padding: 2px 8px; background: #e6f7ff; color: #1890ff; border-radius: 4px; font-size: 12px; font-weight: 600; }
.similarity-bar { height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
.similarity-fill { height: 100%; background: #1890ff; border-radius: 2px; }
.recommend-reason { font-size: 12px; color: #666; margin-bottom: 4px; line-height: 1.6; }
.recommend-meta { font-size: 11px; color: #999; margin-bottom: 8px; }
.recommend-actions { display: flex; gap: 8px; }
/* 弹窗 */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.45); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.modal-content { background: #fff; border-radius: 8px; max-height: 80vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #e8e8e8; }
.modal-header h3 { font-size: 16px; font-weight: 600; }
.modal-body { padding: 24px; }
.coupling-detail { display: flex; flex-direction: column; gap: 12px; }
.detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.detail-value { font-size: 20px; font-weight: 700; color: #722ed1; }
.compare-topics { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }

/* 图表悬浮提示（Chart.js index 模式） */
.chart-tooltip { position: absolute; top: 12px; transform: translateX(-50%); background: rgba(255,255,255,0.97); border: 1px solid #e8e8e8; border-radius: 6px; padding: 8px 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.12); pointer-events: none; z-index: 10; min-width: 150px; }
.tooltip-title { font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #f0f0f0; white-space: nowrap; }
.tooltip-row { font-size: 12px; color: #666; display: flex; align-items: center; gap: 6px; margin-top: 4px; white-space: nowrap; }
.tooltip-row i { font-size: 8px; }

/* 多序列对比弹窗（滞后相关系数分析） */
.compare-modal { width: 900px; max-width: 94vw; }
.compare-config { background: #fafafa; border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
.config-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; display: flex; align-items: center; }
.compare-config .checkbox-group { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.compare-modal .checkbox-item { padding: 10px 12px; border: 1px solid #e8e8e8; border-radius: 6px; background: #fff; transition: all 0.2s; gap: 8px; }
.compare-modal .checkbox-item:hover { border-color: #1890ff; box-shadow: 0 2px 6px rgba(24,144,255,0.12); }
.checkbox-label { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #333; }
.checkbox-label i { font-size: 8px; }
.selected-count-badge { margin-left: auto; font-size: 12px; font-weight: 500; color: #1890ff; background: #e6f7ff; padding: 3px 12px; border-radius: 10px; display: inline-flex; align-items: center; gap: 4px; }
.lag-config { margin-top: 16px; }
.lag-controls { display: flex; gap: 16px; align-items: center; }
.lag-select-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #666; }
.lag-select-item select { padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 13px; color: #333; background: #fff; cursor: pointer; }
.lag-select-item select:focus { outline: none; border-color: #1890ff; }
.correlation-result { }
.result-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; }
.compare-empty { padding: 32px; text-align: center; color: #999; font-size: 13px; background: #fafafa; border: 1px dashed #d9d9d9; border-radius: 8px; }
.correlation-matrix { display: grid; gap: 6px; }
.matrix-cell { height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 14px; font-weight: 600; position: relative; transition: transform 0.2s, box-shadow 0.2s; user-select: none; background: rgba(0,0,0,0.04); }
.matrix-cell.header { background: transparent; color: #666; font-size: 12px; font-weight: 600; height: 36px; }
.matrix-cell.header.row-header { justify-content: flex-end; padding-right: 10px; }
.matrix-cell:not(.header) { cursor: pointer; }
.matrix-cell.high { background: rgba(82,196,26,0.15); color: #389e0d; }
.matrix-cell.medium { background: rgba(250,140,22,0.15); color: #d46b08; }
.matrix-cell.low { background: rgba(0,0,0,0.04); color: #999; }
.matrix-cell:not(.header):hover { transform: scale(1.08); box-shadow: 0 2px 10px rgba(0,0,0,0.12); z-index: 2; }
.cell-tooltip { display: none; position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.85); color: #fff; padding: 6px 10px; border-radius: 4px; font-size: 12px; font-weight: 400; white-space: nowrap; z-index: 10; line-height: 1.6; }
.cell-tooltip b { color: #ffc53d; }
.matrix-cell:not(.header):hover .cell-tooltip { display: block; }
.correlation-insight { margin-top: 16px; padding: 12px 16px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: 6px; font-size: 13px; color: #666; line-height: 1.7; display: flex; align-items: flex-start; gap: 8px; }
.insight-highlight { color: #d48806; font-weight: 600; }

/* 单元格耦合详情 */
.cd-metric { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-size: 13px; }
.cd-metric.cd-column { flex-direction: column; align-items: stretch; }
.cd-label { color: #999; }
.cd-value { font-weight: 600; color: #333; }
.cd-bar-wrap { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; margin: 12px 0; }
.cd-bar-fill { height: 100%; border-radius: 4px; transition: width 0.4s; }
.cd-text { margin-top: 8px; color: #666; font-size: 13px; line-height: 1.7; }

/* 响应式 */
@media (max-width: 1200px) {
  .stats-cards { grid-template-columns: repeat(2, 1fr); }
  .trend-metrics-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .stats-cards { grid-template-columns: 1fr; }
  .trend-metrics-grid { grid-template-columns: 1fr; }
  .trend-controls { width: 100%; }
  .compare-config .checkbox-group { grid-template-columns: repeat(2, 1fr); }
  .correlation-matrix { font-size: 12px; }
  .matrix-cell { height: 44px; font-size: 12px; }
}
/* Toast */
.toast-container { position: fixed; top: 20px; right: 20px; z-index: 2000; display: flex; flex-direction: column; gap: 8px; }

/* 屏幕顶部居中提示（加入监控，1:1 对齐原型 showToast） */
.center-toast { position: fixed; top: 120px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 6px; font-size: 14px; z-index: 3000; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); animation: centerToastIn 0.3s ease; white-space: nowrap; }
.center-toast i { font-size: 15px; }
.center-toast.ct-success { background: #f6ffed; color: #52c41a; border: 1px solid #b7eb8f; }
.center-toast.ct-info { background: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
@keyframes centerToastIn { from { opacity: 0; transform: translate(-50%, -12px); } to { opacity: 1; transform: translate(-50%, 0); } }
.toast { padding: 10px 16px; border-radius: 4px; color: #fff; font-size: 13px; display: flex; align-items: center; gap: 8px; animation: toastIn 0.3s ease; }
.toast-info { background: #1890ff; }
.toast-success { background: #52c41a; }
.toast-warning { background: #fa8c16; }
@keyframes toastIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
</style>
