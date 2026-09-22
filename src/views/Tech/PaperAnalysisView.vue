<script setup>
// 论文分析（1.2.2）：技术研判服务 → 技术体系分析。
// 1:1 还原 HTML 原型：论文分析总览 / 二维交叉分析 / 论文分析任务列表 / 任务操作 四个 Tab。
import { ref, computed, reactive, onMounted } from 'vue';

// ==================== Tab 切换 ====================
const activeTab = ref('overview');
function switchTab(tab) {
  activeTab.value = tab;
}

// ==================== 关键词数据 ====================
const KEYWORD_DATA = [
  { name: '深度学习', count: 45230, growth: 23.5, level: 5, field: '人工智能' },
  { name: '自然语言处理', count: 32156, growth: 18.2, level: 5, field: '人工智能' },
  { name: '计算机视觉', count: 28890, growth: 15.8, level: 4, field: '人工智能' },
  { name: '强化学习', count: 18560, growth: 28.6, level: 4, field: '人工智能' },
  { name: '知识图谱', count: 12340, growth: 12.3, level: 3, field: '人工智能' },
  { name: '大语言模型', count: 9870, growth: 156.8, level: 5, field: '人工智能' },
  { name: '多模态学习', count: 8560, growth: 45.2, level: 3, field: '人工智能' },
  { name: '联邦学习', count: 7230, growth: 38.9, level: 3, field: '人工智能' },
  { name: '迁移学习', count: 6540, growth: 8.5, level: 3, field: '人工智能' },
  { name: '生成式AI', count: 5890, growth: 198.5, level: 4, field: '人工智能' },
  { name: '神经网络', count: 5230, growth: 5.2, level: 2, field: '人工智能' },
  { name: 'Transformer', count: 4890, growth: 67.3, level: 4, field: '人工智能' },
  { name: 'BERT', count: 4230, growth: 12.8, level: 3, field: '人工智能' },
  { name: 'GPT', count: 3980, growth: 89.5, level: 4, field: '人工智能' },
  { name: '注意力机制', count: 3650, growth: 22.1, level: 2, field: '人工智能' },
  { name: '5G通信', count: 10860, growth: 21.6, level: 5, field: '通信技术' },
  { name: '6G通信', count: 8260, growth: 35.2, level: 4, field: '通信技术' },
  { name: '卫星互联网', count: 6840, growth: 42.8, level: 4, field: '通信技术' },
  { name: '物联网', count: 6120, growth: 16.5, level: 3, field: '通信技术' },
  { name: '光通信', count: 4580, growth: 12.4, level: 3, field: '通信技术' },
  { name: '锂电池', count: 10320, growth: 28.4, level: 5, field: '新能源' },
  { name: '储能技术', count: 7920, growth: 36.5, level: 4, field: '新能源' },
  { name: '氢能', count: 6240, growth: 31.8, level: 4, field: '新能源' },
  { name: '光伏技术', count: 5860, growth: 18.7, level: 3, field: '新能源' },
  { name: '智能电网', count: 4380, growth: 14.2, level: 3, field: '新能源' },
  { name: '芯片设计', count: 9720, growth: 24.1, level: 5, field: '半导体' },
  { name: '先进制程', count: 8140, growth: 19.8, level: 4, field: '半导体' },
  { name: '功率器件', count: 5460, growth: 22.5, level: 3, field: '半导体' },
  { name: '第三代半导体', count: 4920, growth: 34.6, level: 4, field: '半导体' },
  { name: 'Chiplet', count: 3760, growth: 48.2, level: 3, field: '半导体' },
  { name: '云计算', count: 9360, growth: 17.8, level: 5, field: '互联网' },
  { name: '大数据', count: 7820, growth: 13.6, level: 4, field: '互联网' },
  { name: '区块链', count: 5480, growth: 9.4, level: 3, field: '互联网' },
  { name: '工业互联网', count: 5160, growth: 26.8, level: 4, field: '互联网' },
  { name: '边缘计算', count: 4620, growth: 31.5, level: 3, field: '互联网' },
  { name: '无人机集群', count: 6840, growth: 44.2, level: 5, field: '无人机' },
  { name: '自主导航', count: 5920, growth: 32.6, level: 4, field: '无人机' },
  { name: '低空经济', count: 5280, growth: 65.4, level: 4, field: '无人机' },
  { name: '飞控系统', count: 4360, growth: 19.2, level: 3, field: '无人机' },
  { name: '无人机感知', count: 3820, growth: 27.1, level: 3, field: '无人机' }
];

const currentKeywordField = ref('');
const selectedKeyword = ref(null);

const visibleKeywords = computed(() => {
  return KEYWORD_DATA
    .filter(k => !currentKeywordField.value || k.field === currentKeywordField.value)
    .sort((a, b) => b.count - a.count);
});
const top5Keywords = computed(() => visibleKeywords.value.slice(0, 5));

function selectKeyword(k) {
  selectedKeyword.value = k;
}
function closeKeywordSelection() {
  selectedKeyword.value = null;
}

// ==================== 关键词关联论文 ====================
function getKeywordPapers(keyword) {
  if (!keyword) return [];
  const papers = [
    { title: `基于${keyword.name}的深度学习方法研究`, authors: '李明, 王强, 张华', journal: 'Nature Communications', year: 2024, citations: 156 },
    { title: `${keyword.name}在智能系统中的应用与优化`, authors: '陈伟, 刘芳, 赵磊', journal: 'IEEE Transactions', year: 2024, citations: 98 },
    { title: `面向${keyword.name}的新型算法框架设计`, authors: '王磊, 李娜, 周杰', journal: 'ICML', year: 2023, citations: 234 },
    { title: `${keyword.name}驱动的数据挖掘技术进展`, authors: '张华, 陈静, 吴涛', journal: 'KDD', year: 2023, citations: 187 },
    { title: `融合${keyword.name}的多模态学习方法`, authors: '刘洋, 孙丽, 郑伟', journal: 'CVPR', year: 2023, citations: 145 },
    { title: `${keyword.name}研究领域的系统性综述`, authors: '赵敏, 钱伟, 冯雪', journal: 'ACM Computing Surveys', year: 2023, citations: 312 },
    { title: `基于${keyword.name}的知识图谱构建方法`, authors: '孙杰, 周莉, 吴昊', journal: 'WWW', year: 2022, citations: 89 },
    { title: `${keyword.name}技术在边缘计算中的实践`, authors: '李强, 陈梅, 王磊', journal: 'INFOCOM', year: 2022, citations: 76 },
    { title: '改进的优化算法研究', authors: '张伟, 王芳, 刘杰', journal: 'NeurIPS', year: 2022, citations: 198 },
    { title: '新技术与区块链的融合创新', authors: '陈浩, 李霞, 赵鹏', journal: 'IEEE IoT Journal', year: 2022, citations: 67 }
  ];
  return papers;
}
const keywordPapers = computed(() => getKeywordPapers(selectedKeyword.value));
function openPaperDetail(title) {
  alert(`论文详情: ${title}\n\n(实际项目中将跳转到论文详情页)`);
}

// ==================== 全球分布 ====================
const COUNTRY_DATA = [
  { name: '中国', code: 'CN', value: 45600, percent: 35.5, trend: 12.8, color: '#ff6b6b' },
  { name: '美国', code: 'US', value: 38900, percent: 30.3, trend: 8.5, color: '#4ecdc4' },
  { name: '英国', code: 'UK', value: 18200, percent: 14.2, trend: 5.2, color: '#45b7d1' },
  { name: '德国', code: 'DE', value: 16500, percent: 12.8, trend: 6.8, color: '#96ceb4' },
  { name: '日本', code: 'JP', value: 14200, percent: 11.0, trend: 3.5, color: '#feca57' },
  { name: '法国', code: 'FR', value: 11800, percent: 9.2, trend: 4.2, color: '#ff9ff3' },
  { name: '加拿大', code: 'CA', value: 9800, percent: 7.6, trend: 7.8, color: '#54a0ff' },
  { name: '澳大利亚', code: 'AU', value: 8600, percent: 6.7, trend: 9.2, color: '#5f27cd' }
];

const worldMapContinents = [
  { name: '北美洲', x: 180, y: 112, d: 'M 49 105 C 62 85 86 73 112 67 C 128 59 145 51 168 53 C 187 54 201 62 219 62 C 236 64 251 72 260 84 C 278 87 297 99 309 113 L 329 126 C 334 134 328 141 316 146 C 305 151 294 151 284 158 C 272 166 264 176 251 181 C 242 188 234 195 224 198 C 214 199 205 193 195 187 C 180 184 166 179 153 173 C 142 167 132 163 120 159 C 108 155 97 148 91 139 C 84 130 78 125 69 122 C 58 119 51 113 49 105 Z' },
  { name: '南美洲', x: 319, y: 302, d: 'M 302 210 C 319 213 337 226 348 243 C 358 258 364 278 367 297 C 372 320 368 346 359 369 C 351 391 340 416 325 443 C 316 450 306 435 297 420 C 288 405 281 386 276 367 C 270 346 263 324 266 303 C 268 280 276 257 285 239 C 291 227 296 217 302 210 Z' },
  { name: '欧洲', x: 474, y: 107, d: 'M 405 99 C 416 89 429 82 443 80 L 461 75 C 478 77 491 83 506 84 C 519 88 533 95 544 105 C 553 113 554 123 548 132 C 541 141 529 147 516 150 C 505 156 493 163 479 164 C 464 164 451 158 439 151 C 426 144 416 134 407 124 C 399 115 399 106 405 99 Z' },
  { name: '非洲', x: 473, y: 295, d: 'M 425 184 C 442 177 459 177 477 181 C 495 184 511 191 522 204 C 535 220 541 239 545 259 C 550 283 548 309 541 333 C 534 356 524 378 511 395 C 500 410 486 421 470 429 C 457 420 445 407 436 391 C 425 373 416 353 410 333 C 403 311 398 288 399 266 C 400 242 406 217 415 199 C 418 192 421 187 425 184 Z' },
  { name: '亚洲', x: 720, y: 108, d: 'M 548 100 C 572 87 598 78 625 74 C 653 70 681 70 708 73 C 738 74 768 80 794 89 C 822 98 849 109 875 124 C 895 135 913 148 927 162 C 935 171 933 183 924 191 C 915 199 901 206 889 214 C 875 223 866 235 851 243 C 837 250 821 252 806 256 C 790 260 778 269 765 276 C 749 284 731 282 714 274 C 697 266 682 255 666 247 C 650 237 632 228 614 222 C 596 216 578 207 564 197 C 549 186 539 173 534 157 C 528 138 531 116 548 100 Z' },
  { name: '大洋洲', x: 850, y: 376, d: 'M 768 354 C 785 343 807 337 829 336 C 851 334 873 338 892 345 C 913 351 931 361 945 375 C 954 385 952 397 943 407 C 932 420 916 429 898 435 C 879 441 859 441 840 437 C 820 433 801 426 786 416 C 771 406 762 394 760 381 C 757 370 760 361 768 354 Z' }
];

const worldMapRegionGeometry = {
  CA: { x: 184, y: 108, radius: 18 },
  US: { x: 211, y: 157, radius: 21 },
  UK: { x: 430, y: 119, radius: 12 },
  FR: { x: 453, y: 145, radius: 13 },
  DE: { x: 480, y: 132, radius: 13 },
  CN: { x: 724, y: 181, radius: 23 },
  JP: { x: 827, y: 191, radius: 14 },
  AU: { x: 842, y: 378, radius: 18 }
};

const activeCountry = ref(null);
const mapRegions = computed(() => {
  return COUNTRY_DATA.map((c, i) => {
    const geo = worldMapRegionGeometry[c.code];
    if (!geo) return null;
    return { ...c, index: i, ...geo, valueText: c.value >= 1000 ? (c.value / 1000).toFixed(1).replace('.0', '') + 'k' : String(c.value) };
  }).filter(Boolean);
});
function formatMapValue(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace('.0', '')}k`;
  return String(value);
}

// ==================== 作者与合作网络 ====================
const AUTHOR_DATA = [
  { id: 1, name: '何恺明', org: 'Meta AI', papers: 127, hIndex: 89, field: 'cv', influence: 'high', color: '#1890ff' },
  { id: 2, name: 'Geoffrey Hinton', org: '多伦多大学', papers: 312, hIndex: 142, field: 'ai', influence: 'high', color: '#1890ff' },
  { id: 3, name: 'Yann LeCun', org: '纽约大学/Meta', papers: 289, hIndex: 128, field: 'ai', influence: 'high', color: '#1890ff' },
  { id: 4, name: 'Yoshua Bengio', org: '蒙特利尔大学', papers: 456, hIndex: 156, field: 'ai', influence: 'high', color: '#1890ff' },
  { id: 5, name: '李飞飞', org: '斯坦福大学', papers: 198, hIndex: 95, field: 'cv', influence: 'high', color: '#1890ff' },
  { id: 6, name: '吴恩达', org: '斯坦福大学', papers: 245, hIndex: 118, field: 'ai', influence: 'medium', color: '#52c41a' },
  { id: 7, name: 'Ian Goodfellow', org: 'Google DeepMind', papers: 89, hIndex: 68, field: 'ai', influence: 'medium', color: '#52c41a' },
  { id: 8, name: 'Andrej Karpathy', org: 'OpenAI', papers: 67, hIndex: 52, field: 'cv', influence: 'medium', color: '#52c41a' },
  { id: 9, name: 'Chris Manning', org: '斯坦福大学', papers: 378, hIndex: 134, field: 'nlp', influence: 'high', color: '#1890ff' },
  { id: 10, name: '邓力', org: 'Citadel', papers: 234, hIndex: 98, field: 'nlp', influence: 'medium', color: '#52c41a' },
  { id: 11, name: '张宏江', org: '源码资本', papers: 156, hIndex: 76, field: 'cv', influence: 'medium', color: '#52c41a' },
  { id: 12, name: 'Kaiming He', org: 'MIT', papers: 98, hIndex: 65, field: 'cv', influence: 'emerging', color: '#faad14' }
];

const COOPERATION_DATA = [
  { source: 1, target: 5, strength: 15 }, { source: 1, target: 8, strength: 8 },
  { source: 2, target: 3, strength: 25 }, { source: 2, target: 4, strength: 30 },
  { source: 2, target: 7, strength: 12 }, { source: 3, target: 4, strength: 28 },
  { source: 3, target: 6, strength: 18 }, { source: 4, target: 6, strength: 20 },
  { source: 5, target: 8, strength: 10 }, { source: 6, target: 7, strength: 14 },
  { source: 9, target: 10, strength: 22 }, { source: 1, target: 11, strength: 11 },
  { source: 5, target: 11, strength: 9 }, { source: 9, target: 3, strength: 16 }
];

const authorSearch = ref('');
const authorInstitution = ref('');
const authorField = ref('');

const filteredAuthors = computed(() => {
  return AUTHOR_DATA.filter(a => {
    const term = authorSearch.value.toLowerCase();
    const matchSearch = !term || a.name.toLowerCase().includes(term) || a.org.toLowerCase().includes(term);
    const instMap = { cas: '中国科学院', thu: '清华大学', mit: 'MIT', stanford: '斯坦福大学' };
    const matchInst = !authorInstitution.value || a.org.includes(instMap[authorInstitution.value] || authorInstitution.value);
    const matchField = !authorField.value || a.field === authorField.value;
    return matchSearch && matchInst && matchField;
  });
});

const selectedAuthorId = ref(null);
function selectAuthor(id) {
  selectedAuthorId.value = selectedAuthorId.value === id ? null : id;
  setTimeout(() => { selectedAuthorId.value = null; }, 3000);
}

// 网络节点布局（与原型算法一致：高影响力居中，中等居中，新兴在外围）
const graphSize = reactive({ width: 860, height: 450 });
const networkGraphRef = ref(null);
onMounted(() => {
  if (networkGraphRef.value) {
    const rect = networkGraphRef.value.getBoundingClientRect();
    if (rect.width > 100) graphSize.width = rect.width;
  }
});

const authorPositions = computed(() => {
  const { width, height } = graphSize;
  const centerX = width / 2, centerY = height / 2;
  const positions = {};
  const groups = [
    { key: 'high', radiusFactor: 0.15, offset: 0 },
    { key: 'medium', radiusFactor: 0.3, offset: 0.5 },
    { key: 'emerging', radiusFactor: 0.42, offset: 1 }
  ];
  groups.forEach(g => {
    const list = AUTHOR_DATA.filter(a => a.influence === g.key);
    list.forEach((a, i) => {
      const angle = (i / list.length) * 2 * Math.PI + g.offset;
      const radius = Math.min(width, height) * g.radiusFactor;
      positions[a.id] = { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius };
    });
  });
  return positions;
});

const networkLinks = computed(() => {
  return COOPERATION_DATA.map(link => {
    const s = authorPositions.value[link.source];
    const t = authorPositions.value[link.target];
    if (!s || !t) return null;
    const dx = t.x - s.x, dy = t.y - s.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return { ...link, left: s.x, top: s.y, width: length, angle, height: Math.max(1, link.strength / 10), opacity: 0.3 + link.strength / 50 };
  }).filter(Boolean);
});

const hoveredAuthor = ref(null);
const tooltipStyle = ref({});
function showNetworkTooltip(e, author) {
  hoveredAuthor.value = author;
  const container = networkGraphRef.value;
  if (!container) return;
  const rect = container.getBoundingClientRect();
  tooltipStyle.value = { left: (e.clientX - rect.left + 14) + 'px', top: (e.clientY - rect.top + 14) + 'px' };
}
function hideNetworkTooltip() {
  hoveredAuthor.value = null;
}
const fieldNames = { ai: '人工智能', cv: '计算机视觉', nlp: '自然语言处理' };

// ==================== 二维交叉分析 ====================
const DIMENSION_DATA = {
  researchField: { name: '研究领域', items: ['深度学习', '自然语言处理', '计算机视觉', '强化学习', '知识图谱', '大语言模型', '多模态学习'] },
  institution: { name: '研究机构', items: ['中国科学院', '清华大学', '北京大学', 'MIT', '斯坦福大学', 'Google', 'OpenAI', 'DeepMind'] },
  country: { name: '国家/地区', items: ['中国', '美国', '英国', '德国', '日本', '法国', '加拿大', '澳大利亚'] },
  year: { name: '发表年份', items: ['2024', '2023', '2022', '2021', '2020', '2019'] },
  keyword: { name: '关键词', items: ['Transformer', 'BERT', 'GPT', 'CNN', 'RNN', 'GAN', 'Attention', 'Embedding'] }
};

const primaryDimension = ref('researchField');
const secondaryDimension = ref('institution');
const crossRefreshKey = ref(0);

const crossData = computed(() => {
  crossRefreshKey.value; // 依赖刷新标记
  const primaryItems = DIMENSION_DATA[primaryDimension.value].items;
  const secondaryItems = DIMENSION_DATA[secondaryDimension.value].items;
  return primaryItems.map((pItem, pIndex) => ({
    name: pItem,
    cells: secondaryItems.map((sItem, sIndex) => {
      const baseValue = 50 + Math.sin(pIndex + sIndex) * 30;
      const correlation = Math.max(0, Math.min(100, Math.round(baseValue)));
      const level = correlation >= 70 ? 'high' : correlation >= 30 ? 'medium' : 'low';
      return { value: correlation, level, primary: pItem, secondary: sItem, papers: correlation * 10 + ((pIndex * 7 + sIndex * 13) % 50) };
    })
  }));
});
const secondaryItems = computed(() => DIMENSION_DATA[secondaryDimension.value].items);

const showCrossDetail = ref(false);
const crossDetail = ref(null);
function openCrossDetail(cell) {
  crossDetail.value = cell;
  showCrossDetail.value = true;
}
function closeCrossDetail() {
  showCrossDetail.value = false;
}

// ==================== 任务列表 ====================
let taskSeq = 10;
const taskData = ref([
  { id: 'TASK-001', name: '深度学习领域趋势分析', type: 'trend', status: 'completed', progress: 100, createTime: '2024-03-15 10:30', papers: 4560, citations: 28900 },
  { id: 'TASK-002', name: 'NLP与CV交叉分析', type: 'cross', status: 'running', progress: 68, createTime: '2024-03-14 14:20', papers: 3240, citations: 18500 },
  { id: 'TASK-003', name: '作者合作网络分析', type: 'network', status: 'completed', progress: 100, createTime: '2024-03-13 09:15', papers: 1890, citations: 12300 },
  { id: 'TASK-004', name: '关键词热度排行分析', type: 'keyword', status: 'failed', progress: 45, createTime: '2024-03-12 16:40', papers: 0, citations: 0 },
  { id: 'TASK-005', name: '人工智能年度趋势报告', type: 'trend', status: 'pending', progress: 0, createTime: '2024-03-11 11:00', papers: 0, citations: 0 },
  { id: 'TASK-006', name: '全球研究产出分布分析', type: 'trend', status: 'completed', progress: 100, createTime: '2024-03-10 15:25', papers: 8750, citations: 52000 },
  { id: 'TASK-007', name: '大语言模型应用分析', type: 'cross', status: 'running', progress: 35, createTime: '2024-03-09 10:15', papers: 2100, citations: 8900 },
  { id: 'TASK-008', name: '多模态学习研究综述', type: 'keyword', status: 'completed', progress: 100, createTime: '2024-03-08 14:30', papers: 4320, citations: 24500 },
  { id: 'TASK-009', name: '强化学习算法优化分析', type: 'network', status: 'pending', progress: 0, createTime: '2024-03-07 09:45', papers: 0, citations: 0 },
  { id: 'TASK-010', name: '知识图谱构建与应用', type: 'keyword', status: 'failed', progress: 78, createTime: '2024-03-06 16:20', papers: 0, citations: 0 }
]);

const TYPE_MAP = {
  trend: { text: '趋势分析', cls: 'task-type-trend' },
  cross: { text: '交叉分析', cls: 'task-type-cross' },
  network: { text: '网络分析', cls: 'task-type-network' },
  keyword: { text: '关键词分析', cls: 'task-type-keyword' }
};
const STATUS_MAP = {
  running: { text: '运行中', cls: 'running', icon: 'fa-spinner fa-spin' },
  completed: { text: '已完成', cls: 'completed', icon: 'fa-check' },
  failed: { text: '失败', cls: 'failed', icon: 'fa-times' },
  pending: { text: '待处理', cls: 'pending', icon: 'fa-clock' }
};
const PROGRESS_COLORS = { running: '#1890ff', completed: '#52c41a', failed: '#f5222d', pending: '#d9d9d9' };

const taskSearch = ref('');
const taskStatus = ref('');
const taskType = ref('');
const currentPage = ref(1);
const pageSize = 5;

const filteredTasks = computed(() => {
  return taskData.value.filter(t => {
    const term = taskSearch.value.toLowerCase();
    const matchSearch = !term || t.name.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
    const matchStatus = !taskStatus.value || t.status === taskStatus.value;
    const matchType = !taskType.value || t.type === taskType.value;
    return matchSearch && matchStatus && matchType;
  });
});
const totalPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / pageSize)));
const pagedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredTasks.value.slice(start, start + pageSize);
});
function changePage(delta) {
  const next = currentPage.value + delta;
  if (next >= 1 && next <= totalPages.value) currentPage.value = next;
}
function resetTaskFilters() {
  taskSearch.value = '';
  taskStatus.value = '';
  taskType.value = '';
  currentPage.value = 1;
}

// 任务详情弹窗
const showTaskModal = ref(false);
const currentTask = ref(null);
function openTaskModal(task) {
  currentTask.value = task;
  showTaskModal.value = true;
}
function closeTaskModal() {
  showTaskModal.value = false;
}

// ==================== 新建任务弹窗 ====================
const showCreateTaskModal = ref(false);
const SUBFIELD_DATA = {
  '通信技术': ['5G通信', '6G通信', '卫星互联网', '物联网', '光通信', '网络切片'],
  '人工智能': ['深度学习', '自然语言处理', '计算机视觉', '强化学习', '知识图谱', '大语言模型', '多模态学习'],
  '新能源': ['锂电池', '储能技术', '氢能', '光伏技术', '智能电网', '固态电池'],
  '半导体': ['芯片设计', '先进制程', '功率器件', '第三代半导体', 'Chiplet', '先进封装'],
  '互联网': ['云计算', '大数据', '区块链', '工业互联网', '边缘计算', '数据治理'],
  '无人机': ['无人机集群', '自主导航', '低空经济', '飞控系统', '无人机感知', '航线规划']
};
const newTask = reactive({
  name: '', type: 'trend', priority: 'normal', crossDim1: '', crossDim2: '',
  field: '', subfield: '', startDate: '', endDate: '', keywords: '', desc: ''
});
const crossDimWarning = computed(() => {
  if (newTask.crossDim1 && newTask.crossDim2 && newTask.crossDim1 === newTask.crossDim2) return '两个维度不能相同，请选择不同的维度';
  return '';
});
const subfieldOptions = computed(() => SUBFIELD_DATA[newTask.field] || []);

function openCreateTaskModal() {
  Object.assign(newTask, { name: '', type: 'trend', priority: 'normal', crossDim1: '', crossDim2: '', field: '', subfield: '', startDate: '', endDate: '', keywords: '', desc: '' });
  showCreateTaskModal.value = true;
}
function submitNewTask() {
  if (!newTask.name) { alert('请输入任务名称'); return; }
  if (!newTask.startDate) { alert('请选择开始时间'); return; }
  if (newTask.type === 'cross') {
    if (!newTask.crossDim1 || !newTask.crossDim2) { alert('请选择两个交叉分析维度'); return; }
    if (newTask.crossDim1 === newTask.crossDim2) { alert('两个维度不能相同，请选择不同的维度'); return; }
  }
  taskSeq += 1;
  const now = new Date();
  taskData.value.unshift({
    id: 'TASK-' + String(taskSeq).padStart(3, '0'),
    name: newTask.name, type: newTask.type, status: 'pending', progress: 0,
    createTime: now.toISOString().slice(0, 16).replace('T', ' '), papers: 0, citations: 0
  });
  showCreateTaskModal.value = false;
  alert('任务创建成功！');
}

// ==================== 合并任务弹窗 ====================
const showMergeModal = ref(false);
const mergeSelected = ref([]);
function openMergeTasksModal() {
  mergeSelected.value = [];
  showMergeModal.value = true;
}
function toggleMergeTask(id) {
  const idx = mergeSelected.value.indexOf(id);
  if (idx >= 0) mergeSelected.value.splice(idx, 1);
  else mergeSelected.value.push(id);
}
function mergeSelectedTasks() {
  if (mergeSelected.value.length < 2) { alert('请选择至少两个任务进行合并'); return; }
  alert(`已成功合并 ${mergeSelected.value.length} 个任务，生成综合分析报告！`);
  showMergeModal.value = false;
}

// ==================== 重新解析弹窗 ====================
const showReparseModal = ref(false);
const reparseOption = ref('');
const reparseSelected = ref([]);
function openReparseModal() {
  reparseOption.value = '';
  reparseSelected.value = [];
  showReparseModal.value = true;
}
function startReparse() {
  if (!reparseOption.value) { alert('请选择解析方式'); return; }
  if (reparseSelected.value.length === 0) { alert('请选择要重新解析的任务'); return; }
  alert(`已开始重新解析 ${reparseSelected.value.length} 个任务！`);
  showReparseModal.value = false;
}
</script>

<template>
  <div class="paper-analysis-page">
    <!-- 顶部导航栏（固定） -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'overview' }" @click="switchTab('overview')">
          <i class="fas fa-chart-pie"></i> 论文分析总览
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'cross-analysis' }" @click="switchTab('cross-analysis')">
          <i class="fas fa-th"></i> 二维交叉分析
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'task-list' }" @click="switchTab('task-list')">
          <i class="fas fa-list"></i> 论文分析任务列表
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'task-operation' }" @click="switchTab('task-operation')">
          <i class="fas fa-cogs"></i> 任务操作
        </a>
      </nav>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
      <h1 class="page-title">论文分析</h1>

      <!-- ========== Tab1 论文分析总览 ========== -->
      <div v-show="activeTab === 'overview'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-chart-pie"></i> 论文分析总览</div>
          </div>

          <!-- (1) 关键词可视化 -->
          <div class="chart-card" style="margin-bottom:20px;">
            <div class="chart-title keyword-analysis-header">
              <span><i class="fas fa-cloud" style="color:#1890ff;"></i> 研究热点关键词分析</span>
              <div class="keyword-field-filter">
                <label>技术领域</label>
                <select v-model="currentKeywordField">
                  <option value="">全部技术领域</option>
                  <option value="通信技术">通信技术</option>
                  <option value="人工智能">人工智能</option>
                  <option value="新能源">新能源</option>
                  <option value="半导体">半导体</option>
                  <option value="互联网">互联网</option>
                  <option value="无人机">无人机</option>
                </select>
              </div>
            </div>
            <div class="keyword-visualization">
              <div class="word-cloud-container">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;">关键词词云图</span>
                  <span style="font-size:12px;color:#999;">字体大小代表热度高低</span>
                </div>
                <div class="word-cloud" :class="{ 'has-selection': selectedKeyword }">
                  <span v-for="k in visibleKeywords" :key="k.name" class="word-item"
                        :class="[`word-size-${k.level}`, { active: selectedKeyword && selectedKeyword.name === k.name }]"
                        @click="selectKeyword(k)">{{ k.name }}</span>
                  <button v-if="selectedKeyword" class="word-item-close" @click.stop="closeKeywordSelection">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="keyword-ranking">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;font-weight:500;">关键词热度排行榜 TOP5</span>
                  <span style="font-size:12px;color:#999;">{{ selectedKeyword ? `已选择：${selectedKeyword.name}` : '未选择关键词时显示总体热度' }}</span>
                </div>
                <div>
                  <div v-for="(k, i) in top5Keywords" :key="k.name" class="ranking-item"
                       :class="{ active: selectedKeyword && selectedKeyword.name === k.name }" @click="selectKeyword(k)">
                    <div class="ranking-number" :class="i < 3 ? 'top3' : 'normal'">{{ i + 1 }}</div>
                    <div class="ranking-info">
                      <div class="ranking-name">{{ k.name }}</div>
                      <div class="ranking-meta">{{ k.field }} · 热度等级 {{ k.level }}</div>
                    </div>
                    <div class="ranking-stats">
                      <div class="ranking-count">{{ k.count.toLocaleString() }}</div>
                      <div class="ranking-growth"><i class="fas fa-arrow-up"></i> {{ k.growth }}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 关键词关联论文列表 -->
          <div class="keyword-papers-panel" :class="{ active: selectedKeyword }">
            <div class="keyword-papers-header">
              <div class="keyword-papers-title">
                <i class="fas fa-file-alt"></i>
                <span>相关论文{{ selectedKeyword ? `：${selectedKeyword.name}` : '' }}</span>
                <span class="keyword-tag">{{ keywordPapers.length }} 篇</span>
              </div>
              <button class="keyword-papers-close" @click="closeKeywordSelection"><i class="fas fa-times"></i></button>
            </div>
            <div class="keyword-papers-body">
              <div v-for="(p, i) in keywordPapers" :key="i" class="paper-item" @click="openPaperDetail(p.title)">
                <div class="paper-index">{{ i + 1 }}</div>
                <div class="paper-content">
                  <div class="paper-title">{{ p.title }}</div>
                  <div class="paper-meta">
                    <span><i class="fas fa-user"></i> {{ p.authors }}</span>
                    <span><i class="fas fa-book"></i> {{ p.journal }}</span>
                    <span><i class="far fa-calendar"></i> {{ p.year }}</span>
                  </div>
                </div>
                <div class="paper-citations">
                  <div class="citation-count">{{ p.citations }}</div>
                  <div class="citation-label">引用</div>
                </div>
              </div>
            </div>
          </div>

          <!-- (2) 全球分布 -->
          <div class="chart-card" style="margin-bottom:20px;">
            <div class="chart-title"><i class="fas fa-globe-americas" style="color:#52c41a;"></i> 全球研究产出分布</div>
            <div class="global-distribution">
              <div class="map-container">
                <div class="world-map">
                  <div class="map-inner">
                    <svg class="world-map-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="worldMapBackground" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stop-color="#eef8ff"></stop>
                          <stop offset="100%" stop-color="#f4f3ff"></stop>
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="1000" height="500" fill="url(#worldMapBackground)"></rect>
                      <g>
                        <line v-for="i in 8" :key="'v' + i" class="map-grid-line" :x1="100 + i * 100" y1="35" :x2="100 + i * 100" y2="465"></line>
                        <path v-for="i in 4" :key="'h' + i" class="map-grid-line" :d="`M 35 ${90 + i * 80} Q 500 ${90 + i * 80 + (i % 2 ? 10 : -10)} 965 ${90 + i * 80}`"></path>
                      </g>
                      <g v-for="c in worldMapContinents" :key="c.name">
                        <path class="world-landmass" :d="c.d"></path>
                        <text class="map-svg-label" :x="c.x" :y="c.y">{{ c.name }}</text>
                      </g>
                      <g v-for="r in mapRegions" :key="r.code" class="map-region" tabindex="0"
                         :class="{ active: activeCountry && activeCountry.code === r.code }"
                         @click="activeCountry = activeCountry && activeCountry.code === r.code ? null : r"
                         @mouseenter="activeCountry = r" @mouseleave="activeCountry = null">
                        <circle class="map-region-halo" :cx="r.x" :cy="r.y" :r="r.radius + 9" :style="{ '--region-color': r.color }"></circle>
                        <circle class="map-region-shape" :cx="r.x" :cy="r.y" :r="r.radius" :style="{ '--region-color': r.color }"></circle>
                        <text class="region-value" :x="r.x" :y="r.y">{{ r.valueText }}</text>
                        <title>{{ r.name }}：{{ r.value.toLocaleString() }}篇论文</title>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="country-list">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;font-weight:500;">国家/地区研究产出排名</span>
                  <span style="font-size:12px;color:#999;">按论文数量排序</span>
                </div>
                <div v-for="(c, i) in COUNTRY_DATA" :key="c.code" class="country-item"
                     :class="{ active: activeCountry && activeCountry.code === c.code }" @click="activeCountry = c">
                  <div class="country-rank" :class="i < 3 ? 'top3' : 'normal'">{{ i + 1 }}</div>
                  <div class="country-info">
                    <div class="country-name">{{ c.name }}</div>
                    <div class="country-data">占比 {{ c.percent }}%</div>
                  </div>
                  <div class="country-stats">
                    <div class="country-value">{{ c.value.toLocaleString() }}</div>
                    <div class="country-trend up"><i class="fas fa-arrow-up"></i> {{ c.trend }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- (3) 作者列表 + (4) 合作网络 -->
          <div class="chart-card">
            <div class="chart-title"><i class="fas fa-users" style="color:#722ed1;"></i> 核心作者与合作网络</div>
            <div class="author-section">
              <div class="author-list-panel">
                <div class="author-search">
                  <input type="text" v-model="authorSearch" placeholder="搜索作者姓名、机构...">
                  <i class="fas fa-search" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#999;"></i>
                </div>
                <div class="author-filters">
                  <select v-model="authorInstitution">
                    <option value="">全部机构</option>
                    <option value="cas">中国科学院</option>
                    <option value="thu">清华大学</option>
                    <option value="mit">MIT</option>
                    <option value="stanford">斯坦福大学</option>
                  </select>
                  <select v-model="authorField">
                    <option value="">全部领域</option>
                    <option value="ai">人工智能</option>
                    <option value="cv">计算机视觉</option>
                    <option value="nlp">自然语言处理</option>
                  </select>
                </div>
                <div class="author-list">
                  <div v-for="a in filteredAuthors" :key="a.id" class="author-item"
                       :class="{ active: selectedAuthorId === a.id }" @click="selectAuthor(a.id)">
                    <div class="author-avatar" :style="{ background: a.color }">{{ a.name.charAt(0) }}</div>
                    <div class="author-info">
                      <div class="author-name">{{ a.name }}</div>
                      <div class="author-org">{{ a.org }}</div>
                    </div>
                    <div class="author-metrics">
                      <div class="author-papers">{{ a.papers }} 篇</div>
                      <div class="author-hindex">H指数 {{ a.hIndex }}</div>
                    </div>
                  </div>
                  <div v-if="filteredAuthors.length === 0" style="padding:30px;text-align:center;color:#999;font-size:13px;">未找到匹配的作者</div>
                </div>
              </div>
              <div class="network-container">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                  <span style="font-size:13px;color:#666;">作者合作关系网络</span>
                  <span style="font-size:12px;color:#999;">点击节点查看详情，连线表示合作关系</span>
                </div>
                <div class="network-graph" ref="networkGraphRef">
                  <div v-for="link in networkLinks" :key="link.source + '-' + link.target" class="network-link"
                       :class="{ active: selectedAuthorId && (link.source === selectedAuthorId || link.target === selectedAuthorId) }"
                       :style="{ left: link.left + 'px', top: link.top + 'px', width: link.width + 'px', height: link.height + 'px', transform: `rotate(${link.angle}deg)`, opacity: link.opacity }"></div>
                  <div v-for="a in AUTHOR_DATA" :key="a.id" class="network-node"
                       :class="{ active: selectedAuthorId === a.id }"
                       :style="{ left: (authorPositions[a.id].x - 24) + 'px', top: (authorPositions[a.id].y - 24) + 'px', width: '48px', height: '48px', background: a.color }"
                       @click="selectAuthor(a.id)"
                       @mouseenter="showNetworkTooltip($event, a)" @mouseleave="hideNetworkTooltip">
                    {{ a.name.length > 6 ? a.name.slice(0, 6) : a.name }}
                  </div>
                  <div class="network-tooltip" :class="{ visible: hoveredAuthor }" :style="tooltipStyle">
                    <div class="tooltip-title">{{ hoveredAuthor?.name }}</div>
                    <div class="tooltip-content">
                      机构: {{ hoveredAuthor?.org }}<br>
                      论文数: {{ hoveredAuthor?.papers }}篇<br>
                      H指数: {{ hoveredAuthor?.hIndex }}<br>
                      领域: {{ hoveredAuthor ? fieldNames[hoveredAuthor.field] : '' }}
                    </div>
                  </div>
                  <div class="network-legend">
                    <div class="legend-item"><div class="legend-dot" style="background:#1890ff;"></div>高影响力作者</div>
                    <div class="legend-item"><div class="legend-dot" style="background:#52c41a;"></div>中等影响力</div>
                    <div class="legend-item"><div class="legend-dot" style="background:#faad14;"></div>新兴作者</div>
                    <div class="legend-item" style="margin-bottom:0;"><div class="legend-dot" style="background:#d9d9d9;"></div>合作连线</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab2 二维交叉分析 ========== -->
      <div v-show="activeTab === 'cross-analysis'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-th"></i> 二维交叉分析</div>
          </div>
          <div class="cross-filter-section">
            <div class="cross-filter-row">
              <div class="cross-filter-item">
                <label>选择分析维度</label>
                <select v-model="primaryDimension">
                  <option v-for="(v, k) in DIMENSION_DATA" :key="k" :value="k">{{ v.name }}</option>
                </select>
              </div>
              <div class="cross-filter-divider"><i class="fas fa-exchange-alt"></i></div>
              <div class="cross-filter-item">
                <label>交叉维度</label>
                <select v-model="secondaryDimension">
                  <option v-for="(v, k) in DIMENSION_DATA" :key="k" :value="k" :disabled="k === primaryDimension">{{ v.name }}</option>
                </select>
              </div>
              <button class="cross-analyze-btn" @click="crossRefreshKey++"><i class="fas fa-sync-alt"></i> 刷新分析</button>
            </div>
          </div>
          <div class="cross-table-container">
            <div class="cross-table-wrapper">
              <table class="cross-table">
                <thead>
                  <tr>
                    <th>{{ DIMENSION_DATA[primaryDimension].name }} \ {{ DIMENSION_DATA[secondaryDimension].name }}</th>
                    <th v-for="s in secondaryItems" :key="s">{{ s }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in crossData" :key="row.name">
                    <td>{{ row.name }}</td>
                    <td v-for="cell in row.cells" :key="cell.secondary" :class="'cross-cell-' + cell.level"
                        title="点击查看详情" @click="openCrossDetail(cell)">{{ cell.value }}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="cross-legend">
              <span class="legend-label">相关性强度：</span>
              <div class="legend-item"><div class="legend-color high"></div><span>高相关 (>70%)</span></div>
              <div class="legend-item"><div class="legend-color medium"></div><span>中相关 (30-70%)</span></div>
              <div class="legend-item"><div class="legend-color low"></div><span>低相关 (&lt;30%)</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab3 论文分析任务列表 ========== -->
      <div v-show="activeTab === 'task-list'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-list"></i> 论文分析任务列表</div>
          </div>
          <div class="task-filter-section">
            <div class="task-filter-row">
              <div class="task-search-wrapper">
                <i class="fas fa-search"></i>
                <input type="text" v-model="taskSearch" placeholder="搜索任务名称、ID...">
              </div>
              <select v-model="taskStatus" class="task-filter-select">
                <option value="">全部状态</option>
                <option value="running">运行中</option>
                <option value="completed">已完成</option>
                <option value="failed">失败</option>
                <option value="pending">待处理</option>
              </select>
              <select v-model="taskType" class="task-filter-select">
                <option value="">全部类型</option>
                <option value="trend">趋势分析</option>
                <option value="cross">交叉分析</option>
                <option value="network">网络分析</option>
                <option value="keyword">关键词分析</option>
              </select>
              <button class="task-filter-btn" @click="resetTaskFilters"><i class="fas fa-undo"></i> 重置</button>
            </div>
          </div>
          <div class="task-table-container">
            <table class="task-table">
              <thead>
                <tr>
                  <th>任务名称</th><th>分析类型</th><th>创建时间</th><th>进度</th><th>状态</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in pagedTasks" :key="task.id" @click="openTaskModal(task)">
                  <td>
                    <div class="task-name">{{ task.name }}</div>
                    <div class="task-id">{{ task.id }}</div>
                  </td>
                  <td><span class="task-type-badge" :class="TYPE_MAP[task.type].cls">{{ TYPE_MAP[task.type].text }}</span></td>
                  <td>{{ task.createTime }}</td>
                  <td>
                    <div class="progress-text">{{ task.progress }}%</div>
                    <div class="progress-wrapper">
                      <div class="progress-bar" :style="{ width: task.progress + '%', background: PROGRESS_COLORS[task.status] }"></div>
                    </div>
                  </td>
                  <td>
                    <span class="status-badge" :class="STATUS_MAP[task.status].cls">
                      <i :class="['fas', STATUS_MAP[task.status].icon]"></i> {{ STATUS_MAP[task.status].text }}
                    </span>
                  </td>
                  <td>
                    <div class="task-actions" @click.stop>
                      <button class="action-btn" title="查看详情" @click="openTaskModal(task)"><i class="fas fa-eye"></i></button>
                      <button class="action-btn" title="重新运行" @click="alert('重新运行任务: ' + task.name)"><i class="fas fa-redo"></i></button>
                      <button class="action-btn" title="下载报告" @click="alert('下载任务报告: ' + task.name)"><i class="fas fa-download"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="pagedTasks.length === 0">
                  <td colspan="6" style="text-align:center;padding:40px;color:#999;">暂无匹配任务</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="task-pagination">
            <div class="pagination-info">共 <span>{{ filteredTasks.length }}</span> 个任务</div>
            <div class="pagination-controls">
              <button class="page-btn" :disabled="currentPage <= 1" @click="changePage(-1)"><i class="fas fa-chevron-left"></i></button>
              <span class="page-info">第 {{ currentPage }} 页</span>
              <button class="page-btn" :disabled="currentPage >= totalPages" @click="changePage(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab4 任务操作 ========== -->
      <div v-show="activeTab === 'task-operation'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-cogs"></i> 任务操作</div>
          </div>
          <div class="operation-buttons">
            <button class="operation-btn primary" @click="openCreateTaskModal"><i class="fas fa-plus"></i><span>新增分析任务</span></button>
            <button class="operation-btn secondary" @click="openMergeTasksModal"><i class="fas fa-object-group"></i><span>合并任务</span></button>
            <button class="operation-btn secondary" @click="openReparseModal"><i class="fas fa-sync-alt"></i><span>重新解析</span></button>
          </div>
          <div class="operation-guide">
            <h4 class="guide-title"><i class="fas fa-info-circle"></i> 操作说明</h4>
            <div class="guide-items">
              <div class="guide-item">
                <div class="guide-item-icon"><i class="fas fa-plus"></i></div>
                <div class="guide-item-content">
                  <div class="guide-item-title">新增分析任务</div>
                  <div class="guide-item-desc">创建新的论文分析任务，设置分析范围、关键词和时间周期</div>
                </div>
              </div>
              <div class="guide-item">
                <div class="guide-item-icon"><i class="fas fa-object-group"></i></div>
                <div class="guide-item-content">
                  <div class="guide-item-title">合并任务</div>
                  <div class="guide-item-desc">将多个相关任务整合，生成综合分析报告</div>
                </div>
              </div>
              <div class="guide-item">
                <div class="guide-item-icon"><i class="fas fa-sync-alt"></i></div>
                <div class="guide-item-content">
                  <div class="guide-item-title">重新解析</div>
                  <div class="guide-item-desc">使用最新数据或算法重新分析已有任务</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 任务详情模态框 ========== -->
    <div class="task-modal" :class="{ open: showTaskModal }" @click.self="closeTaskModal">
      <div class="task-modal-content">
        <div class="task-modal-header">
          <div class="task-modal-title">{{ currentTask?.name || '任务详情' }}</div>
          <button class="task-modal-close" @click="closeTaskModal"><i class="fas fa-times"></i></button>
        </div>
        <div class="task-modal-body" v-if="currentTask">
          <div class="modal-section">
            <div class="modal-section-title"><i class="fas fa-info-circle"></i> 基本信息</div>
            <div class="modal-info-grid">
              <div class="modal-info-item"><div class="modal-info-label">任务ID</div><div class="modal-info-value">{{ currentTask.id }}</div></div>
              <div class="modal-info-item"><div class="modal-info-label">分析类型</div><div class="modal-info-value">{{ TYPE_MAP[currentTask.type].text }}</div></div>
              <div class="modal-info-item"><div class="modal-info-label">创建时间</div><div class="modal-info-value">{{ currentTask.createTime }}</div></div>
              <div class="modal-info-item"><div class="modal-info-label">论文数量</div><div class="modal-info-value">{{ currentTask.papers.toLocaleString() }}</div></div>
              <div class="modal-info-item"><div class="modal-info-label">引用总数</div><div class="modal-info-value">{{ currentTask.citations.toLocaleString() }}</div></div>
              <div class="modal-info-item"><div class="modal-info-label">状态</div>
                <div class="modal-info-value"><span class="status-badge" :class="STATUS_MAP[currentTask.status].cls"><i :class="['fas', STATUS_MAP[currentTask.status].icon]"></i> {{ STATUS_MAP[currentTask.status].text }}</span></div>
              </div>
            </div>
          </div>
          <div class="modal-section">
            <div class="modal-section-title"><i class="fas fa-tasks"></i> 执行进度</div>
            <div class="progress-text">{{ currentTask.progress }}%</div>
            <div class="progress-wrapper">
              <div class="progress-bar" :style="{ width: currentTask.progress + '%', background: PROGRESS_COLORS[currentTask.status] }"></div>
            </div>
          </div>
        </div>
        <div class="task-modal-footer">
          <button class="btn-modal btn-modal-secondary" @click="closeTaskModal">关闭</button>
        </div>
      </div>
    </div>

    <!-- ========== 新增分析任务弹窗 ========== -->
    <div class="create-task-modal" :class="{ open: showCreateTaskModal }" @click.self="showCreateTaskModal = false">
      <div class="create-task-content">
        <div class="create-task-header">
          <div class="create-task-title">新增分析任务</div>
          <button class="create-task-close" @click="showCreateTaskModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="create-task-body">
          <div class="form-group">
            <label class="form-label">任务名称 *</label>
            <input type="text" class="form-input" v-model="newTask.name" placeholder="例如：深度学习领域分析">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">分析类型 *</label>
              <select class="form-input" v-model="newTask.type">
                <option value="trend">趋势分析</option>
                <option value="cross">交叉分析</option>
                <option value="network">网络分析</option>
                <option value="keyword">关键词分析</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">优先级</label>
              <select class="form-input" v-model="newTask.priority">
                <option value="normal">普通</option>
                <option value="high">高</option>
                <option value="urgent">紧急</option>
              </select>
            </div>
          </div>
          <div class="cross-dimension-section" v-if="newTask.type === 'cross'">
            <div class="section-title"><i class="fas fa-th-large"></i> 交叉分析维度配置</div>
            <div class="dimension-select-row">
              <div class="dimension-select">
                <label>维度一 *</label>
                <select v-model="newTask.crossDim1">
                  <option value="">请选择...</option>
                  <option value="field">研究领域</option>
                  <option value="institution">机构</option>
                  <option value="author">作者</option>
                  <option value="keyword">关键词</option>
                  <option value="journal">期刊</option>
                  <option value="year">年份</option>
                </select>
              </div>
              <div class="dimension-select">
                <label>维度二 *</label>
                <select v-model="newTask.crossDim2">
                  <option value="">请选择...</option>
                  <option value="field">研究领域</option>
                  <option value="institution">机构</option>
                  <option value="author">作者</option>
                  <option value="keyword">关键词</option>
                  <option value="journal">期刊</option>
                  <option value="year">年份</option>
                </select>
              </div>
            </div>
            <div class="dimension-hint"><i class="fas fa-info-circle"></i> 请选择两个不同的维度进行交叉分析，系统将生成交叉矩阵图表</div>
            <div class="cross-dimension-warning" :class="{ active: crossDimWarning }">
              <i class="fas fa-exclamation-triangle"></i><span>{{ crossDimWarning }}</span>
            </div>
          </div>
          <div class="analysis-scope-section">
            <div class="analysis-scope-title"><i class="fas fa-layer-group"></i> 分析范围</div>
            <div class="scope-field-row">
              <div class="scope-field">
                <label>技术领域</label>
                <select v-model="newTask.field">
                  <option value="">请选择技术领域</option>
                  <option v-for="(subs, f) in SUBFIELD_DATA" :key="f" :value="f">{{ f }}</option>
                </select>
              </div>
              <div class="scope-field">
                <label>子领域</label>
                <select v-model="newTask.subfield" :disabled="!newTask.field">
                  <option value="">{{ newTask.field ? '请选择子领域' : '请先选择技术领域' }}</option>
                  <option v-for="s in subfieldOptions" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>
            <div class="analysis-scope-hint"><i class="fas fa-info-circle"></i> 选择技术领域后，子领域将自动匹配对应的研究方向</div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">开始时间</label>
              <input type="date" class="form-input" v-model="newTask.startDate">
            </div>
            <div class="form-group">
              <label class="form-label">结束时间</label>
              <input type="date" class="form-input" v-model="newTask.endDate">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">关键词（逗号分隔）</label>
            <input type="text" class="form-input" v-model="newTask.keywords" placeholder="例如：深度学习,神经网络,CNN">
          </div>
          <div class="form-group">
            <label class="form-label">任务描述</label>
            <textarea class="form-textarea" v-model="newTask.desc" placeholder="请输入任务描述..."></textarea>
          </div>
        </div>
        <div class="create-task-footer">
          <button class="btn-modal btn-modal-secondary" @click="showCreateTaskModal = false">取消</button>
          <button class="btn-modal btn-modal-primary" @click="submitNewTask"><i class="fas fa-plus"></i> 创建任务</button>
        </div>
      </div>
    </div>

    <!-- ========== 合并任务弹窗 ========== -->
    <div class="merge-tasks-modal" :class="{ open: showMergeModal }" @click.self="showMergeModal = false">
      <div class="merge-tasks-content">
        <div class="merge-tasks-header">
          <div class="merge-tasks-title">合并任务</div>
          <button class="create-task-close" @click="showMergeModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="merge-tasks-body">
          <div class="task-select-list">
            <label v-for="task in taskData" :key="task.id" class="task-select-item"
                   :class="{ selected: mergeSelected.includes(task.id) }" @click="toggleMergeTask(task.id)">
              <input type="checkbox" :checked="mergeSelected.includes(task.id)" @click.stop @change="toggleMergeTask(task.id)">
              <div class="task-select-info">
                <div class="task-name">{{ task.name }}</div>
                <div class="task-id">{{ task.id }} · {{ TYPE_MAP[task.type].text }}</div>
              </div>
            </label>
          </div>
        </div>
        <div class="merge-tasks-footer">
          <div class="merge-summary">已选择 <span>{{ mergeSelected.length }}</span> 个任务</div>
          <div>
            <button class="btn-modal btn-modal-secondary" @click="showMergeModal = false">取消</button>
            <button class="btn-modal btn-modal-primary" @click="mergeSelectedTasks"><i class="fas fa-object-group"></i> 合并任务</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 重新解析弹窗 ========== -->
    <div class="reparse-modal" :class="{ open: showReparseModal }" @click.self="showReparseModal = false">
      <div class="reparse-content">
        <div class="reparse-header">
          <div class="reparse-title">重新解析</div>
          <button class="reparse-close" @click="showReparseModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="reparse-body">
          <div class="reparse-options">
            <div class="reparse-option-card" :class="{ selected: reparseOption === 'update' }" @click="reparseOption = 'update'">
              <div class="reparse-option-title"><i class="fas fa-database"></i> 更新数据</div>
              <div class="reparse-option-desc">使用最新的论文数据重新运行分析，保持原分析参数不变</div>
            </div>
            <div class="reparse-option-card" :class="{ selected: reparseOption === 'algorithm' }" @click="reparseOption = 'algorithm'">
              <div class="reparse-option-title"><i class="fas fa-cogs"></i> 更新算法</div>
              <div class="reparse-option-desc">使用优化后的算法模型重新分析，提升分析精度和效率</div>
            </div>
          </div>
          <div class="reparse-task-list">
            <label v-for="task in taskData" :key="task.id" class="task-select-item"
                   :class="{ selected: reparseSelected.includes(task.id) }"
                   @click="reparseSelected.includes(task.id) ? reparseSelected.splice(reparseSelected.indexOf(task.id), 1) : reparseSelected.push(task.id)">
              <input type="checkbox" :checked="reparseSelected.includes(task.id)" @click.stop
                     @change="reparseSelected.includes(task.id) ? reparseSelected.splice(reparseSelected.indexOf(task.id), 1) : reparseSelected.push(task.id)">
              <div class="task-select-info">
                <div class="task-name">{{ task.name }}</div>
                <div class="task-id">{{ task.id }} · {{ STATUS_MAP[task.status].text }}</div>
              </div>
            </label>
          </div>
        </div>
        <div class="reparse-footer">
          <button class="btn-modal btn-modal-secondary" @click="showReparseModal = false">取消</button>
          <button class="btn-modal btn-modal-primary" @click="startReparse"><i class="fas fa-sync-alt"></i> 开始解析</button>
        </div>
      </div>
    </div>

    <!-- ========== 交叉分析详情侧边栏 ========== -->
    <div class="detail-overlay" :class="{ open: showCrossDetail }" @click="closeCrossDetail"></div>
    <div class="detail-sidebar" :class="{ open: showCrossDetail }">
      <div class="detail-sidebar-header">
        <button class="detail-sidebar-close" @click="closeCrossDetail"><i class="fas fa-times"></i></button>
        <div class="detail-sidebar-title">{{ crossDetail ? crossDetail.primary + ' × ' + crossDetail.secondary : '交叉分析详情' }}</div>
        <div class="detail-sidebar-subtitle">查看相关性详细数据</div>
      </div>
      <div class="detail-sidebar-content" v-if="crossDetail">
        <div class="detail-stat-grid">
          <div class="detail-stat-item">
            <div class="detail-stat-value" :style="{ color: crossDetail.level === 'high' ? '#52c41a' : crossDetail.level === 'medium' ? '#faad14' : '#f5222d' }">{{ crossDetail.value }}%</div>
            <div class="detail-stat-label">相关性分数</div>
          </div>
          <div class="detail-stat-item">
            <div class="detail-stat-value">{{ crossDetail.papers }}</div>
            <div class="detail-stat-label">相关论文数</div>
          </div>
        </div>
        <div class="detail-list-title">分析说明</div>
        <div class="detail-list-item">
          <div class="detail-list-item-title">{{ crossDetail.primary }} 与 {{ crossDetail.secondary }}</div>
          <div class="detail-list-item-meta">
            {{ crossDetail.level === 'high' ? '两者呈高相关性，研究产出高度重合，建议持续关注交叉领域动态。' : crossDetail.level === 'medium' ? '两者呈中等相关性，存在一定研究交叉，可深入挖掘潜在关联。' : '两者相关性较低，研究产出相对独立。' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paper-analysis-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 顶部导航栏 */
.top-navbar {
  position: fixed; top: 48px; right: 0; left: 220px; height: 56px;
  background: #fff; border-bottom: 1px solid #e8e8e8;
  display: flex; align-items: center; padding: 0 20px; z-index: 90;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.navbar-nav { display: flex; gap: 8px; width: 100%; }
.nav-link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 20px; border-radius: 6px; text-decoration: none;
  color: #666; font-size: 14px; transition: all 0.3s; cursor: pointer;
}
.nav-link:hover { background: #f0f5ff; color: #1890ff; }
.nav-link.active { background: #1890ff; color: #fff; }

/* 主内容 */
.main-content { padding: 124px 0 0; }
.page-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; }

/* 模块区块 */
.module-section { background: #fff; border-radius: 4px; padding: 24px; margin-bottom: 20px; }
.module-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #e8e8e8; }
.module-title { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
.module-title i { color: #1890ff; font-size: 18px; }

/* 图表卡片 */
.chart-card { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.chart-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

/* 关键词可视化 */
.keyword-visualization { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
.keyword-analysis-header { justify-content: space-between; gap: 20px; }
.keyword-field-filter { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #666; }
.keyword-field-filter label { white-space: nowrap; }
.keyword-field-filter select { min-width: 150px; height: 34px; padding: 0 10px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; color: #333; cursor: pointer; }
.keyword-field-filter select:focus { outline: none; border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.word-cloud-container { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 400px; }
.word-cloud { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; padding: 20px; min-height: 320px; position: relative; overflow: hidden; }
.word-cloud.has-selection::after { content: ''; position: absolute; inset: 0; z-index: 2; background: rgba(80, 88, 96, 0.42); pointer-events: none; }
.word-item { cursor: pointer; transition: all 0.3s; padding: 4px 8px; border-radius: 4px; position: relative; font-weight: 400; white-space: nowrap; }
.word-item:hover { transform: scale(1.1); background: #f0f5ff; }
.word-item.active { background: #1890ff; color: #fff !important; }
.word-cloud.has-selection .word-item.active { position: absolute; left: 50%; top: 50%; z-index: 3; transform: translate(-50%, -50%) scale(1.45); padding: 12px 18px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.2); white-space: nowrap; }
.word-item-close { display: inline-flex; position: absolute; top: calc(50% - 40px); left: calc(50% + 60px); z-index: 4; width: 24px; height: 24px; padding: 0; border: 2px solid #fff; border-radius: 50%; background: #697586; color: #fff; font-size: 14px; cursor: pointer; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
.word-item-close:hover { background: #4b5563; }
.word-size-1 { font-size: 14px; color: #999; }
.word-size-2 { font-size: 18px; color: #666; }
.word-size-3 { font-size: 22px; color: #333; }
.word-size-4 { font-size: 28px; color: #1890ff; font-weight: 600; }
.word-size-5 { font-size: 36px; color: #fa8c16; font-weight: 700; }
.keyword-ranking { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.ranking-item { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.3s; }
.ranking-item:hover { background: #f5f7fa; }
.ranking-item.active { background: #e6f7ff; border-left: 3px solid #1890ff; }
.ranking-number { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; margin-right: 12px; }
.ranking-number.top3 { background: #fff2e8; color: #fa8c16; }
.ranking-number.normal { background: #f5f5f5; color: #999; }
.ranking-info { flex: 1; }
.ranking-name { font-size: 14px; color: #333; font-weight: 500; }
.ranking-meta { font-size: 12px; color: #999; margin-top: 4px; }
.ranking-stats { text-align: right; }
.ranking-count { font-size: 16px; font-weight: 600; color: #1890ff; }
.ranking-growth { font-size: 12px; color: #52c41a; }

/* 论文条目 */
.paper-item { display: flex; align-items: flex-start; padding: 16px; border-bottom: 1px solid #f0f0f0; transition: all 0.3s; cursor: pointer; }
.paper-item:hover { background: #f8f9fa; }
.paper-item:last-child { border-bottom: none; }
.paper-index { width: 28px; height: 28px; background: #f0f5ff; color: #1890ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; margin-right: 12px; flex-shrink: 0; }
.paper-content { flex: 1; }
.paper-title { font-size: 15px; color: #333; font-weight: 500; margin-bottom: 6px; line-height: 1.5; }
.paper-meta { font-size: 13px; color: #999; display: flex; flex-wrap: wrap; gap: 12px; }
.paper-meta span { display: flex; align-items: center; gap: 4px; }
.paper-citations { margin-left: 16px; text-align: right; flex-shrink: 0; }
.citation-count { font-size: 20px; font-weight: 700; color: #fa8c16; }
.citation-label { font-size: 12px; color: #999; }

/* 关键词关联论文内嵌列表 */
.keyword-papers-panel { display: none; background: #fff; border: 1px solid #d9e3ea; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden; }
.keyword-papers-panel.active { display: block; }
.keyword-papers-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e8eef3; }
.keyword-papers-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: #333; }
.keyword-papers-title i { color: #1890ff; }
.keyword-papers-title .keyword-tag { padding: 3px 9px; border-radius: 4px; background: #e6f7ff; color: #1890ff; font-size: 12px; font-weight: 500; }
.keyword-papers-close { width: 30px; height: 30px; border: none; border-radius: 6px; background: #fff; color: #999; cursor: pointer; }
.keyword-papers-close:hover { background: #ff4d4f; color: #fff; }
.keyword-papers-body { max-height: 520px; overflow-y: auto; padding: 0 20px; }

/* 全球分布 */
.global-distribution { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; margin-bottom: 30px; }
.map-container { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 440px; }
.world-map { width: 100%; height: 400px; position: relative; background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%); border-radius: 8px; overflow: hidden; border: 1px solid #d9d9d9; }
.map-inner { width: 100%; height: 100%; position: absolute; top: 0; left: 0; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.world-map-svg { display: block; width: 100%; height: 100%; }
.world-map-svg .map-grid-line { fill: none; stroke: rgba(148, 163, 184, 0.18); stroke-width: 1; vector-effect: non-scaling-stroke; }
.world-map-svg .world-landmass { fill: #dbeaf5; stroke: #b6cde1; stroke-width: 2; vector-effect: non-scaling-stroke; }
.world-map-svg .map-svg-label { fill: #7890a8; font-size: 15px; font-weight: 600; text-anchor: middle; pointer-events: none; }
.world-map-svg .map-region { cursor: pointer; outline: none; transform-box: fill-box; transform-origin: center; }
.world-map-svg .map-region-halo { fill: var(--region-color); fill-opacity: 0.15; stroke: none; transition: all 0.25s; }
.world-map-svg .map-region-shape { fill: var(--region-color); fill-opacity: 0.9; stroke: #fff; stroke-width: 2; vector-effect: non-scaling-stroke; transition: all 0.25s; }
.world-map-svg .map-region:hover .map-region-halo,
.world-map-svg .map-region:focus .map-region-halo { fill-opacity: 0.32; }
.world-map-svg .map-region:hover .map-region-shape,
.world-map-svg .map-region:focus .map-region-shape { fill-opacity: 1; stroke: #1677ff; stroke-width: 3; }
.world-map-svg .map-region.active .map-region-halo,
.world-map-svg .map-region.highlight .map-region-halo { fill: #1890ff; fill-opacity: 0.3; }
.world-map-svg .map-region.active .map-region-shape,
.world-map-svg .map-region.highlight .map-region-shape { fill: #1890ff; fill-opacity: 1; stroke: #0958d9; stroke-width: 3; }
.world-map-svg .map-region.active,
.world-map-svg .map-region.highlight { transform: scale(1.16); }
.world-map-svg .region-value { fill: #fff; font-size: 11px; font-weight: 700; text-anchor: middle; dominant-baseline: middle; pointer-events: none; }
.country-list { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-height: 440px; overflow-y: auto; }
.country-item { display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.3s; }
.country-item:hover { background: #f5f7fa; }
.country-item.active { background: #e6f7ff; border-left: 3px solid #1890ff; }
.country-rank { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; margin-right: 12px; }
.country-rank.top3 { background: #fff2e8; color: #fa8c16; }
.country-rank.normal { background: #f5f5f5; color: #666; }
.country-info { flex: 1; }
.country-name { font-size: 14px; color: #333; font-weight: 500; }
.country-data { font-size: 12px; color: #999; margin-top: 2px; }
.country-stats { text-align: right; }
.country-value { font-size: 15px; font-weight: 600; color: #1890ff; }
.country-trend { font-size: 11px; margin-top: 2px; }
.country-trend.up { color: #52c41a; }
.country-trend.down { color: #f5222d; }

/* 作者列表 */
.author-section { display: grid; grid-template-columns: 380px 1fr; gap: 20px; margin-bottom: 30px; }
.author-list-panel { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.author-search { margin-bottom: 16px; position: relative; }
.author-search input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 40px 0 12px; font-size: 14px; }
.author-search input:focus { outline: none; border-color: #1890ff; }
.author-filters { display: flex; gap: 8px; margin-bottom: 16px; }
.author-filters select { flex: 1; height: 36px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 8px; font-size: 13px; }
.author-list { max-height: 400px; overflow-y: auto; }
.author-item { display: flex; align-items: center; padding: 14px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.3s; }
.author-item:hover { background: #f5f7fa; }
.author-item.active { background: #e6f7ff; border-left: 3px solid #1890ff; }
.author-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; font-weight: 600; margin-right: 12px; }
.author-info { flex: 1; }
.author-name { font-size: 14px; color: #333; font-weight: 500; }
.author-org { font-size: 12px; color: #999; margin-top: 2px; }
.author-metrics { text-align: right; }
.author-papers { font-size: 13px; color: #1890ff; font-weight: 500; }
.author-hindex { font-size: 12px; color: #999; }

/* 合作网络图 */
.network-container { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: relative; }
.network-graph { width: 100%; height: 450px; position: relative; background: #fafafa; border-radius: 8px; overflow: hidden; }
.network-node { position: absolute; border-radius: 50%; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; font-weight: 500; text-align: center; overflow: hidden; padding: 2px; }
.network-node:hover { transform: scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.network-node.active { box-shadow: 0 0 0 4px rgba(24,144,255,0.4); }
.network-link { position: absolute; background: #d9d9d9; transform-origin: left center; transition: all 0.3s; }
.network-link.active { background: #1890ff; height: 2px; }
.network-tooltip { position: absolute; background: rgba(0,0,0,0.85); color: #fff; padding: 12px 16px; border-radius: 8px; font-size: 13px; pointer-events: none; opacity: 0; transition: opacity 0.3s; z-index: 100; max-width: 280px; }
.network-tooltip.visible { opacity: 1; }
.tooltip-title { font-weight: 600; margin-bottom: 6px; }
.tooltip-content { font-size: 12px; line-height: 1.5; }
.network-legend { position: absolute; bottom: 16px; right: 16px; background: rgba(255,255,255,0.95); padding: 12px 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.network-legend .legend-item { display: flex; align-items: center; margin-bottom: 6px; font-size: 12px; color: #666; }
.network-legend .legend-dot { width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }

/* 二维交叉分析 */
.cross-filter-section { background: #f8fafc; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; border: 1px solid #e8e8e8; }
.cross-filter-row { display: flex; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
.cross-filter-item { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 180px; }
.cross-filter-item label { font-size: 13px; color: #666; font-weight: 500; }
.cross-filter-item select { height: 40px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 0 12px; font-size: 14px; background: #fff; cursor: pointer; transition: all 0.3s; }
.cross-filter-item select:hover { border-color: #40a9ff; }
.cross-filter-item select:focus { outline: none; border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.cross-filter-divider { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; color: #999; font-size: 16px; }
.cross-analyze-btn { height: 40px; padding: 0 24px; background: #1890ff; color: #fff; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px; }
.cross-analyze-btn:hover { background: #40a9ff; }
.cross-table-container { background: #fff; border-radius: 8px; border: 1px solid #e8e8e8; overflow: hidden; }
.cross-table-wrapper { overflow-x: auto; max-height: 500px; overflow-y: auto; }
.cross-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.cross-table th { background: #fafafa; padding: 14px 12px; text-align: center; font-size: 13px; font-weight: 600; color: #333; border-bottom: 2px solid #e8e8e8; border-right: 1px solid #e8e8e8; position: sticky; top: 0; z-index: 10; min-width: 100px; }
.cross-table th:first-child { position: sticky; left: 0; z-index: 20; background: #f0f5ff; min-width: 140px; }
.cross-table th:last-child { border-right: none; }
.cross-table td { padding: 16px 12px; text-align: center; font-size: 14px; border-bottom: 1px solid #f0f0f0; border-right: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s; font-weight: 500; }
.cross-table td:first-child { position: sticky; left: 0; background: #fafafa; font-weight: 600; color: #333; text-align: left; padding-left: 16px; border-right: 2px solid #e8e8e8; z-index: 5; }
.cross-table td:last-child { border-right: none; }
.cross-table tr:hover td { background: #f5f7fa; }
.cross-table tr:hover td:first-child { background: #e6f7ff; }
.cross-table td:hover { transform: scale(1.05); box-shadow: 0 2px 8px rgba(0,0,0,0.15); z-index: 1; position: relative; }
.cross-cell-high { background: #d4edda; color: #155724; }
.cross-cell-medium { background: #fff3cd; color: #856404; }
.cross-cell-low { background: #f8d7da; color: #721c24; }
.cross-legend { display: flex; align-items: center; gap: 20px; padding: 16px 24px; background: #fafafa; border-top: 1px solid #e8e8e8; }
.cross-legend .legend-label { font-size: 13px; color: #666; font-weight: 500; }
.cross-legend .legend-item { display: flex; align-items: center; gap: 8px; }
.cross-legend .legend-color { width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); }
.cross-legend .legend-color.high { background: #d4edda; }
.cross-legend .legend-color.medium { background: #fff3cd; }
.cross-legend .legend-color.low { background: #f8d7da; }

/* 详情侧边栏 */
.detail-sidebar { position: fixed; right: -400px; top: 104px; width: 380px; height: calc(100vh - 104px); background: #fff; box-shadow: -2px 0 12px rgba(0,0,0,0.15); transition: right 0.3s ease; z-index: 200; overflow-y: auto; }
.detail-sidebar.open { right: 0; }
.detail-sidebar-header { padding: 20px 24px; border-bottom: 1px solid #e8e8e8; background: #fafafa; position: relative; }
.detail-sidebar-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 8px; }
.detail-sidebar-subtitle { font-size: 13px; color: #666; }
.detail-sidebar-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border: none; background: transparent; cursor: pointer; color: #999; font-size: 18px; border-radius: 4px; transition: all 0.3s; }
.detail-sidebar-close:hover { background: #f0f0f0; color: #333; }
.detail-sidebar-content { padding: 20px 24px; }
.detail-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
.detail-stat-item { background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center; }
.detail-stat-value { font-size: 24px; font-weight: 700; color: #1890ff; margin-bottom: 4px; }
.detail-stat-label { font-size: 12px; color: #999; }
.detail-list-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; }
.detail-list-item { padding: 12px; background: #f8fafc; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #1890ff; }
.detail-list-item-title { font-size: 13px; font-weight: 500; color: #333; margin-bottom: 4px; }
.detail-list-item-meta { font-size: 12px; color: #999; }
.detail-overlay { position: fixed; top: 104px; left: 220px; right: 0; bottom: 0; background: rgba(0,0,0,0.3); opacity: 0; visibility: hidden; transition: all 0.3s; z-index: 150; }
.detail-overlay.open { opacity: 1; visibility: visible; }

/* 任务列表 */
.task-filter-section { background: #f8fafc; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; border: 1px solid #e8e8e8; }
.task-filter-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.task-search-wrapper { position: relative; flex: 1; min-width: 280px; }
.task-search-wrapper i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #999; }
.task-search-wrapper input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 0 12px 0 40px; font-size: 14px; background: #fff; transition: all 0.3s; }
.task-search-wrapper input:focus { outline: none; border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.task-filter-select { height: 40px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 0 12px; font-size: 14px; background: #fff; cursor: pointer; transition: all 0.3s; min-width: 140px; }
.task-filter-select:hover { border-color: #40a9ff; }
.task-filter-btn { height: 40px; padding: 0 20px; background: #fff; color: #666; border: 1px solid #d9d9d9; border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; gap: 6px; }
.task-filter-btn:hover { background: #f5f7fa; color: #1890ff; border-color: #1890ff; }
.task-table-container { background: #fff; border-radius: 8px; border: 1px solid #e8e8e8; overflow: hidden; }
.task-table { width: 100%; border-collapse: collapse; }
.task-table thead { background: #fafafa; }
.task-table th { padding: 16px; text-align: left; font-size: 13px; font-weight: 600; color: #333; border-bottom: 2px solid #e8e8e8; }
.task-table td { padding: 16px; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #666; vertical-align: middle; }
.task-table tbody tr { transition: all 0.2s; cursor: pointer; }
.task-table tbody tr:hover { background: #f5f7fa; }
.task-name { font-weight: 500; color: #333; margin-bottom: 4px; }
.task-id { font-size: 12px; color: #999; }
.task-type-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; }
.task-type-trend { background: #e6f7ff; color: #1890ff; }
.task-type-cross { background: #f6ffed; color: #52c41a; }
.task-type-network { background: #fff7e6; color: #fa8c16; }
.task-type-keyword { background: #f9f0ff; color: #722ed1; }
.progress-wrapper { width: 100%; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; margin-top: 6px; }
.progress-bar { height: 100%; border-radius: 4px; transition: width 0.3s; }
.progress-text { font-size: 12px; color: #999; margin-top: 6px; }
.status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 4px; font-size: 13px; font-weight: 500; }
.status-badge.running { background: #e6f7ff; color: #1890ff; }
.status-badge.completed { background: #f6ffed; color: #52c41a; }
.status-badge.failed { background: #fff1f0; color: #f5222d; }
.status-badge.pending { background: #f5f5f5; color: #999; }
.task-actions { display: flex; gap: 8px; }
.action-btn { width: 36px; height: 36px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #666; font-size: 14px; transition: all 0.3s; }
.action-btn:hover { background: #1890ff; color: #fff; border-color: #1890ff; }
.task-pagination { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; background: #fafafa; border-top: 1px solid #e8e8e8; }
.pagination-info { font-size: 14px; color: #666; }
.pagination-info span { color: #1890ff; font-weight: 600; }
.pagination-controls { display: flex; align-items: center; gap: 16px; }
.page-btn { width: 36px; height: 36px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #666; transition: all 0.3s; }
.page-btn:hover:not(:disabled) { background: #1890ff; color: #fff; border-color: #1890ff; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { font-size: 14px; color: #666; }

/* 任务操作 */
.operation-buttons { display: flex; gap: 16px; margin-bottom: 30px; }
.operation-btn { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 24px 40px; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 500; transition: all 0.3s; border: 1px solid #e8e8e8; background: #fff; color: #333; }
.operation-btn i { font-size: 24px; }
.operation-btn.primary { background: #1890ff; color: #fff; border-color: #1890ff; }
.operation-btn.primary:hover { background: #40a9ff; }
.operation-btn.secondary:hover { border-color: #1890ff; color: #1890ff; }
.operation-guide { background: #f8fafc; border: 1px solid #e8e8e8; border-radius: 8px; padding: 24px; }
.guide-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.guide-title i { color: #1890ff; }
.guide-items { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.guide-item { display: flex; gap: 12px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #e8e8e8; }
.guide-item-icon { width: 40px; height: 40px; border-radius: 8px; background: #e6f7ff; color: #1890ff; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.guide-item-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 4px; }
.guide-item-desc { font-size: 12px; color: #999; line-height: 1.6; }

/* 弹窗通用 */
.task-modal, .create-task-modal, .merge-tasks-modal, .reparse-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 1000; }
.task-modal.open, .create-task-modal.open, .merge-tasks-modal.open, .reparse-modal.open { display: flex; }
.task-modal-content { background: #fff; width: 900px; max-height: 85vh; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); overflow: hidden; display: flex; flex-direction: column; }
.task-modal-header { padding: 20px 24px; border-bottom: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: space-between; align-items: center; }
.task-modal-title { font-size: 18px; font-weight: 600; color: #333; }
.task-modal-close { width: 36px; height: 36px; border: none; background: transparent; cursor: pointer; color: #999; font-size: 20px; border-radius: 6px; transition: all 0.3s; }
.task-modal-close:hover { background: #f0f0f0; color: #333; }
.task-modal-body { padding: 24px; overflow-y: auto; flex: 1; }
.task-modal-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: flex-end; gap: 12px; }
.modal-section { margin-bottom: 24px; }
.modal-section-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 8px; }
.modal-section-title i { color: #1890ff; }
.modal-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.modal-info-item { background: #f8fafc; padding: 14px 16px; border-radius: 8px; }
.modal-info-label { font-size: 12px; color: #999; margin-bottom: 6px; }
.modal-info-value { font-size: 14px; font-weight: 600; color: #333; }

/* 新建任务弹窗 */
.create-task-content { background: #fff; width: 640px; max-height: 88vh; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); overflow: hidden; display: flex; flex-direction: column; }
.create-task-header { padding: 20px 24px; border-bottom: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: space-between; align-items: center; }
.create-task-title { font-size: 18px; font-weight: 600; color: #333; }
.create-task-close { width: 36px; height: 36px; border: none; background: transparent; cursor: pointer; color: #999; font-size: 20px; border-radius: 6px; }
.create-task-close:hover { background: #f0f0f0; color: #333; }
.create-task-body { padding: 24px; overflow-y: auto; flex: 1; }
.create-task-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: flex-end; gap: 12px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; font-weight: 500; }
.form-input { width: 100%; height: 38px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 0 12px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.form-textarea { width: 100%; min-height: 80px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 10px 12px; font-size: 14px; resize: vertical; font-family: inherit; }
.form-textarea:focus { outline: none; border-color: #1890ff; }
.cross-dimension-section { background: #f8fafc; border: 1px solid #e8e8e8; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
.section-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
.section-title i { color: #1890ff; }
.dimension-select-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px; }
.dimension-select label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; }
.dimension-select select { width: 100%; height: 38px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 0 12px; font-size: 14px; background: #fff; }
.dimension-hint { font-size: 12px; color: #999; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
.cross-dimension-warning { display: none; font-size: 12px; color: #f5222d; background: #fff1f0; border: 1px solid #ffccc7; border-radius: 6px; padding: 8px 12px; align-items: center; gap: 6px; }
.cross-dimension-warning.active { display: flex; }
.analysis-scope-section { background: #f8fafc; border: 1px solid #e8e8e8; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
.analysis-scope-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
.analysis-scope-title i { color: #52c41a; }
.scope-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
.scope-field label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; }
.scope-field select { width: 100%; height: 38px; border: 1px solid #d9d9d9; border-radius: 6px; padding: 0 12px; font-size: 14px; background: #fff; }
.analysis-scope-hint { font-size: 12px; color: #999; display: flex; align-items: center; gap: 6px; }
.btn-modal { padding: 10px 24px; border-radius: 6px; font-size: 14px; cursor: pointer; border: 1px solid #d9d9d9; background: #fff; color: #666; display: inline-flex; align-items: center; gap: 6px; }
.btn-modal.btn-modal-primary { background: #1890ff; color: #fff; border-color: #1890ff; }
.btn-modal.btn-modal-primary:hover { background: #40a9ff; }
.btn-modal.btn-modal-secondary:hover { border-color: #1890ff; color: #1890ff; }

/* 合并任务弹窗 */
.merge-tasks-content { background: #fff; width: 560px; max-height: 80vh; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); overflow: hidden; display: flex; flex-direction: column; }
.merge-tasks-header { padding: 20px 24px; border-bottom: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: space-between; align-items: center; }
.merge-tasks-title { font-size: 18px; font-weight: 600; color: #333; }
.merge-tasks-body { padding: 24px; overflow-y: auto; flex: 1; }
.merge-tasks-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: space-between; align-items: center; }
.merge-summary { font-size: 14px; color: #666; }
.merge-summary span { color: #1890ff; font-weight: 600; }
.task-select-list { display: flex; flex-direction: column; gap: 10px; }
.task-select-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e8e8e8; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.task-select-item:hover { border-color: #1890ff; background: #f0f5ff; }
.task-select-item.selected { border-color: #1890ff; background: #e6f7ff; }
.task-select-info { flex: 1; }

/* 重新解析弹窗 */
.reparse-content { background: #fff; width: 600px; max-height: 80vh; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); overflow: hidden; display: flex; flex-direction: column; }
.reparse-header { padding: 20px 24px; border-bottom: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: space-between; align-items: center; }
.reparse-title { font-size: 18px; font-weight: 600; color: #333; }
.reparse-close { width: 36px; height: 36px; border: none; background: transparent; cursor: pointer; color: #999; font-size: 20px; border-radius: 6px; }
.reparse-close:hover { background: #f0f0f0; color: #333; }
.reparse-body { padding: 24px; overflow-y: auto; flex: 1; }
.reparse-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: flex-end; gap: 12px; }
.reparse-options { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.reparse-option-card { padding: 20px; border: 2px solid #e8e8e8; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.reparse-option-card:hover { border-color: #1890ff; }
.reparse-option-card.selected { border-color: #1890ff; background: #e6f7ff; }
.reparse-option-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.reparse-option-title i { color: #1890ff; }
.reparse-option-desc { font-size: 12px; color: #999; line-height: 1.6; }
</style>
