<script setup>
// 颠覆性与前沿技术分析（1.1.2）：技术研判服务 → 研究需求分析。
// 1:1 还原 HTML 原型：三个 Tab（颠覆性技术识别 / 前沿技术清单 / 技术趋势分析）+ 高级筛选 + 关联分析。
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 跳转到技术详情页（对应原型 goToTechDetail）
function goTechDetail(techName) {
  router.push({ name: 'disruptiveTechDetail', params: { name: techName } });
}

// ==================== 数据源 ====================

// 颠覆性技术数据（与原型 techData 一致，12 项）
const techData = [
  { name: '量子计算', category: '量子技术', field: '信息技术', risk: '高风险', impact: 96, maturity: 92, heat: 95, growth: 68, patents: '8,542', papers: '3,267', projects: '1,856', entityCount: 156, participants: 'IBM、Google、中国科学院、微软、本源量子', applications: ['金融建模', '药物研发', '密码学'] },
  { name: '基因编辑技术', category: '生物技术', field: '医疗健康', risk: '中风险', impact: 94, maturity: 75, heat: 88, growth: 52, patents: '12,458', papers: '5,892', projects: '2,341', entityCount: 289, participants: 'CRISPR Therapeutics、Editas Medicine、Broad研究所、华大基因', applications: ['医疗治疗', '农业改良', '遗传疾病'] },
  { name: '脑机接口', category: '人工智能', field: '医疗健康', risk: '高风险', impact: 91, maturity: 58, heat: 82, growth: 55, patents: '3,215', papers: '1,456', projects: '892', entityCount: 134, participants: 'Neuralink、Synchron、清华大学、浙江大学', applications: ['神经修复', '智能假肢', '人机交互'] },
  { name: '可控核聚变', category: '新能源', field: '能源环保', risk: '高风险', impact: 89, maturity: 45, heat: 78, growth: 42, patents: '5,678', papers: '2,134', projects: '1,567', entityCount: 98, participants: 'ITER组织、Commonwealth Fusion、能量奇点、中国科学院', applications: ['清洁能源', '电力供应', '航天推进'] },
  { name: '6G通信技术', category: '人工智能', field: '信息技术', risk: '中风险', impact: 87, maturity: 38, heat: 85, growth: 48, patents: '6,892', papers: '2,456', projects: '1,234', entityCount: 178, participants: '华为、三星、诺基亚、爱立信、中国信通院', applications: ['全息通信', '空天一体化', '数字孪生'] },
  { name: '固态电池', category: '新能源', field: '能源环保', risk: '低风险', impact: 85, maturity: 65, heat: 90, growth: 45, patents: '9,234', papers: '3,567', projects: '1,678', entityCount: 245, participants: 'QuantumScape、丰田、宁德时代、比亚迪、清陶能源', applications: ['电动汽车', '储能系统', '消费电子'] },
  { name: '生成式AI', category: '人工智能', field: '信息技术', risk: '中风险', impact: 92, maturity: 78, heat: 96, growth: 75, patents: '15,892', papers: '8,923', projects: '3,456', entityCount: 456, participants: 'OpenAI、Google、Meta、百度、阿里巴巴', applications: ['内容创作', '代码辅助', '智能客服'] },
  { name: '钙钛矿太阳能电池', category: '新能源', field: '能源环保', risk: '低风险', impact: 83, maturity: 55, heat: 72, growth: 38, patents: '4,567', papers: '1,987', projects: '876', entityCount: 123, participants: '牛津光伏、协鑫纳米、万度光能', applications: ['光伏发电', '建筑一体化', '便携能源'] },
  { name: 'mRNA疫苗技术', category: '生物技术', field: '医疗健康', risk: '低风险', impact: 90, maturity: 85, heat: 88, growth: 62, patents: '7,823', papers: '4,234', projects: '1,567', entityCount: 198, participants: 'Moderna、BioNTech、辉瑞、中国生物', applications: ['疫苗研发', '肿瘤治疗', '免疫疾病'] },
  { name: '量子通信', category: '量子技术', field: '信息技术', risk: '中风险', impact: 88, maturity: 72, heat: 75, growth: 52, patents: '6,234', papers: '2,876', projects: '1,234', entityCount: 145, participants: '中科大、国盾量子、中国电信', applications: ['安全通信', '量子密钥', '量子网络'] },
  { name: '石墨烯材料', category: '材料科学', field: '智能制造', risk: '低风险', impact: 86, maturity: 68, heat: 70, growth: 35, patents: '9,876', papers: '3,456', projects: '1,234', entityCount: 267, participants: '曼彻斯特大学、华为、中科院金属所', applications: ['柔性电子', '复合材料', '储能器件'] },
  { name: '合成生物学', category: '生物技术', field: '医疗健康', risk: '中风险', impact: 89, maturity: 62, heat: 78, growth: 58, patents: '8,234', papers: '3,567', projects: '1,456', entityCount: 234, participants: 'Ginkgo Bioworks、Amyris、中科院深圳先进院', applications: ['生物制造', '医药生产', '农业育种'] }
];

// 前沿技术清单数据（7 项）
const frontierTechData = [
  { name: '大语言模型', category: '人工智能', maturity: 92, stage: 'commercial', date: '2024-01', heat: 98.5, trend: '+25%', icon: 'fas fa-brain', avatarColor: 'blue', institution: 'OpenAI、Google' },
  { name: '空间太阳能发电', category: '新能源', maturity: 75, stage: 'prototype', date: '2023-11', heat: 85.2, trend: '+18%', icon: 'fas fa-satellite', avatarColor: 'orange', institution: 'NASA、中国航天' },
  { name: '基因治疗递送系统', category: '生物技术', maturity: 58, stage: 'development', date: '2023-09', heat: 82.6, trend: '+32%', icon: 'fas fa-dna', avatarColor: 'green', institution: 'Moderna、BioNTech' },
  { name: '光子芯片', category: '材料科学', maturity: 38, stage: 'research', date: '2024-02', heat: 78.3, trend: '+45%', icon: 'fas fa-microchip', avatarColor: 'purple', institution: 'MIT、中科院' },
  { name: '高空风能发电', category: '新能源', maturity: 75, stage: 'prototype', date: '2023-12', heat: 76.8, trend: '+22%', icon: 'fas fa-wind', avatarColor: 'cyan', institution: 'Google X、Altaeros' },
  { name: '神经形态计算', category: '人工智能', maturity: 58, stage: 'development', date: '2023-10', heat: 74.5, trend: '+38%', icon: 'fas fa-network-wired', avatarColor: 'red', institution: 'Intel、IBM' }
];

// 趋势分析数据（8 项）— 与原型 trendTechData 一致
const trendTechData = [
  { rank: 1, name: '大语言模型', tags: ['trend', 'frontier', 'ai', 'hot'], desc: '基于Transformer架构的大规模预训练语言模型，正在重塑人机交互方式', heat: 98.5, maturity: 92, maturityStage: 'commercial', investment: 280, growth: '+25%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长25%，环比增长8%' },
  { rank: 2, name: '量子计算', tags: ['disruptive', 'frontier', 'quantum'], desc: '利用量子叠加和纠缠原理进行计算，有望在特定问题上实现指数级加速', heat: 92.3, maturity: 75, maturityStage: 'prototype', investment: 150, growth: '+31%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长31%，环比增长12%' },
  { rank: 3, name: '固态电池', tags: ['trend', 'frontier', 'energy'], desc: '采用固态电解质替代液态电解液，能量密度更高、安全性更好', heat: 88.6, maturity: 58, maturityStage: 'development', investment: 95, growth: '+19%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长19%，环比增长5%' },
  { rank: 4, name: '基因编辑', tags: ['disruptive', 'frontier', 'bio'], desc: 'CRISPR等基因编辑技术在医疗诊断和精准治疗领域应用广泛', heat: 85.2, maturity: 92, maturityStage: 'commercial', investment: 78, growth: '+15%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长15%，环比增长3%' },
  { rank: 5, name: '6G通信', tags: ['disruptive', 'comm'], desc: '第六代移动通信技术，预计支持Tbps级传输速率和空天地一体化网络', heat: 82.1, maturity: 38, maturityStage: 'research', investment: 120, growth: '+22%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长22%，环比增长9%' },
  { rank: 6, name: '脑机接口', tags: ['trend', 'frontier', 'bio', 'hot'], desc: '实现大脑与外部设备的直接通信，在医疗康复和增强现实领域前景广阔', heat: 79.4, maturity: 75, maturityStage: 'prototype', investment: 45, growth: '+28%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长28%，环比增长15%' },
  { rank: 7, name: '可控核聚变', tags: ['trend', 'disruptive', 'frontier', 'energy'], desc: '模仿太阳能量产生机制，有望提供几乎无限的清洁能源', heat: 76.8, maturity: 58, maturityStage: 'development', investment: 200, growth: '+12%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长12%，环比增长4%' },
  { rank: 8, name: '空间太阳能', tags: ['energy', 'new'], desc: '在太空部署太阳能发电站，通过无线输电向地面供电，能源潜力巨大', heat: 74.5, maturity: 38, maturityStage: 'research', investment: 35, growth: '+35%', tooltip: '计算周期：2023年Q4至2024年Q1，同比增长35%，环比增长18%' }
];

// 技术对比图表数据
const techComparisonData = {
  names: ['大语言模型', '量子计算', '固态电池', '基因编辑', '6G通信', '脑机接口', '可控核聚变', '空间太阳能'],
  categories: ['ai', 'quantum', 'energy', 'bio', 'comm', 'bio', 'energy', 'energy'],
  heat: [98.5, 92.3, 88.6, 85.2, 82.1, 79.4, 76.8, 74.5],
  maturity: [90, 60, 70, 85, 40, 55, 65, 35],
  investment: [280, 150, 95, 78, 120, 45, 200, 35],
  colors: ['#1890ff', '#1890ff', '#1890ff', '#52c41a', '#52c41a', '#52c41a', '#faad14', '#faad14']
};

// 关联分析数据库
const relationDatabase = {
  '大语言模型': {
    entities: [
      { name: 'OpenAI', type: '企业', desc: 'ChatGPT开发者', strength: 'strong' },
      { name: 'Google', type: '企业', desc: 'Gemini/Bard', strength: 'strong' },
      { name: '清华大学', type: '高校', desc: 'ChatGLM', strength: 'medium' },
      { name: '中科院', type: '机构', desc: '多模态研究', strength: 'medium' },
      { name: 'Anthropic', type: '企业', desc: 'Claude', strength: 'medium' },
      { name: '北京大学', type: '高校', desc: 'NLP实验室', strength: 'weak' }
    ],
    relatedTech: [
      { name: 'Transformer架构', type: '基础技术', desc: '核心算法架构', strength: 'strong' },
      { name: '注意力机制', type: '算法', desc: '关键算法创新', strength: 'strong' },
      { name: '预训练技术', type: '方法', desc: '大规模预训练', strength: 'medium' },
      { name: '强化学习', type: '算法', desc: 'RLHF对齐', strength: 'medium' },
      { name: '知识图谱', type: '技术', desc: '知识增强', strength: 'weak' }
    ],
    applications: [
      { name: '智能客服', type: '应用', desc: '自动问答', strength: 'strong' },
      { name: '内容创作', type: '应用', desc: '文案生成', strength: 'strong' },
      { name: '代码辅助', type: '应用', desc: '编程助手', strength: 'medium' },
      { name: '教育辅导', type: '应用', desc: '个性化学习', strength: 'medium' }
    ]
  },
  '空间太阳能发电': {
    entities: [
      { name: 'NASA', type: '机构', desc: 'SSPS先驱', strength: 'strong' },
      { name: '中国航天科技', type: '企业', desc: '国内主要', strength: 'strong' },
      { name: 'JAXA', type: '机构', desc: '日本航天', strength: 'medium' },
      { name: 'ESA', type: '机构', desc: '欧洲航天', strength: 'medium' },
      { name: '波音', type: '企业', desc: '系统集成', strength: 'weak' }
    ],
    relatedTech: [
      { name: '无线输电', type: '核心技术', desc: '微波/激光传能', strength: 'strong' },
      { name: '高效光伏', type: '核心技术', desc: '空间光伏电池', strength: 'strong' },
      { name: '空间组装', type: '支撑技术', desc: '在轨构建', strength: 'medium' },
      { name: '姿态控制', type: '支撑技术', desc: '定向稳定', strength: 'medium' }
    ],
    applications: [
      { name: '地面供电', type: '应用', desc: '清洁能源', strength: 'strong' },
      { name: '空间站供电', type: '应用', desc: '在轨能源', strength: 'medium' },
      { name: '偏远地区', type: '应用', desc: '无电网区域', strength: 'medium' }
    ]
  }
};

// 案例数据库
const caseDatabase = {
  'NASA': [
    { title: 'Artemis登月计划', desc: 'NASA主导的载人重返月球计划，涉及多项前沿空间技术集成。', date: '2024-01', leader: 'NASA', category: '航天工程' },
    { title: 'SSPS可行性研究', desc: 'NASA对空间太阳能电站的系统级可行性论证与方案设计。', date: '2023-08', leader: 'NASA', category: '能源系统' },
    { title: '深空探测技术', desc: 'NASA在深空通信、自主导航领域的突破性进展。', date: '2023-05', leader: 'JPL实验室', category: '深空探测' }
  ],
  '中国航天科技': [
    { title: '天宫空间站建设', desc: '中国独立建造的多舱段空间站，完成在轨组装与运营。', date: '2023-12', leader: '中国航天科技', category: '航天工程' },
    { title: '嫦娥探月工程', desc: '中国月球探测系列任务，实现月面软着陆与采样返回。', date: '2023-06', leader: '中国航天科技', category: '深空探测' },
    { title: 'SSPS概念研究', desc: '中国空间太阳能电站试验基地建设与关键技术验证。', date: '2023-03', leader: '中国航天科技', category: '能源系统' }
  ],
  'JAXA': [
    { title: 'SSPS技术验证', desc: '日本宇宙航空研究开发机构的空间太阳能输电地面实验。', date: '2023-09', leader: 'JAXA', category: '能源系统' },
    { title: '小行星采样返回', desc: 'Hayabusa2小行星采样返回任务的成功实施。', date: '2023-07', leader: 'JAXA', category: '深空探测' },
    { title: '空间碎片清理', desc: 'JAXA开发的在轨碎片清除与主动离轨技术。', date: '2023-04', leader: 'JAXA', category: '空间安全' }
  ],
  '无线输电': [
    { title: '微波无线输电实验', desc: '长距离微波无线能量传输的地面验证实验。', date: '2023-10', leader: '多机构联合', category: '能源传输' },
    { title: '激光传能技术', desc: '激光无线能量传输的效率与安全性研究。', date: '2023-06', leader: '研究联合体', category: '能源传输' },
    { title: '在轨输电验证', desc: '空间到地面无线输电的轨道级概念验证。', date: '2023-02', leader: '国际合作', category: '能源传输' }
  ],
  '地面供电': [
    { title: '偏远地区供电试点', desc: '利用空间太阳能为无电网区域提供持续电力。', date: '2023-11', leader: '示范工程', category: '能源应用' },
    { title: '应急供电系统', desc: '灾害场景下空间太阳能应急供电方案设计。', date: '2023-07', leader: '应急中心', category: '能源应用' },
    { title: '并网技术验证', desc: '空间太阳能地面接收站并网接入技术研究。', date: '2023-03', leader: '电网公司', category: '能源应用' }
  ]
};

// ==================== Tab 切换 ====================
const activeTab = ref('disruptive');

function switchTab(tab) {
  activeTab.value = tab;
}

// ==================== Toast ====================
const toastList = ref([]);
let toastId = 0;
function showToast(message, type = 'info') {
  const id = ++toastId;
  toastList.value.push({ id, message, type });
  setTimeout(() => {
    toastList.value = toastList.value.filter(t => t.id !== id);
  }, 3000);
}

// ==================== 颠覆性技术识别 ====================
const searchKeyword = ref('');
const filterCategory = ref('');
const filterField = ref('');
const filterRisk = ref('');
const filterImpact = ref('');
const filterSort = ref('');
const highlightCard = ref(null);

function getMaturityClass(v) { return v >= 80 ? 'high' : v >= 60 ? 'medium' : ''; }
function getHeatClass(v) { return v >= 80 ? 'high' : v >= 60 ? 'medium' : ''; }

const filteredTechData = computed(() => {
  let data = [...techData];
  if (filterCategory.value) data = data.filter(t => t.category === filterCategory.value);
  if (filterField.value) data = data.filter(t => t.field === filterField.value);
  if (filterRisk.value) data = data.filter(t => t.risk === filterRisk.value);
  if (filterImpact.value) {
    const [min, max] = filterImpact.value.split('-').map(Number);
    data = data.filter(t => t.impact >= min && t.impact <= max);
  }
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase();
    data = data.filter(t => t.name.toLowerCase().includes(kw) || t.participants.toLowerCase().includes(kw) || t.applications.some(a => a.toLowerCase().includes(kw)));
  }
  if (filterSort.value === 'impact') data.sort((a, b) => b.impact - a.impact);
  else if (filterSort.value === 'growth') data.sort((a, b) => b.growth - a.growth);
  else if (filterSort.value === 'hot') data.sort((a, b) => b.heat - a.heat);
  return data;
});

function doSearch() {
  if (searchKeyword.value) {
    showToast(`搜索"${searchKeyword.value}"，匹配${filteredTechData.value.length}项技术`, 'info');
  }
}

function applyFilters() {
  showToast(`筛选完成，共${filteredTechData.value.length}项技术`, 'info');
}

function resetFilters() {
  searchKeyword.value = '';
  filterCategory.value = '';
  filterField.value = '';
  filterRisk.value = '';
  filterImpact.value = '';
  filterSort.value = '';
  showToast('已重置筛选条件', 'info');
}

// 高级筛选弹窗
const showAdvancedFilter = ref(false);
const advFilters = ref({ risk: [], impact: [], investment: [], fields: [], maturityMin: null, maturityMax: null, heatMin: null, heatMax: null, dateStart: null, dateEnd: null });

const riskOptions = ['低风险', '中风险', '高风险'];
const impactOptions = [{ label: '90-100', value: '90-100' }, { label: '80-89', value: '80-89' }, { label: '70-79', value: '70-79' }, { label: '60-69', value: '60-69' }];
const investmentOptions = ['1000万以下', '1000万-5000万', '5000万-1亿', '1亿以上'];
const fieldOptions = [{ id: 'field-ai', label: '人工智能', value: '人工智能' }, { id: 'field-quantum', label: '量子技术', value: '量子技术' }, { id: 'field-bio', label: '生物技术', value: '生物技术' }, { id: 'field-energy', label: '新能源', value: '新能源' }, { id: 'field-material', label: '材料科学', value: '材料科学' }, { id: 'field-it', label: '信息技术', value: '信息技术' }];

function toggleFilterOption(type, value) {
  const arr = advFilters.value[type];
  const idx = arr.indexOf(value);
  if (idx > -1) arr.splice(idx, 1);
  else arr.push(value);
}

function toggleFieldFilter(value) {
  const idx = advFilters.value.fields.indexOf(value);
  if (idx > -1) advFilters.value.fields.splice(idx, 1);
  else advFilters.value.fields.push(value);
}

const selectedFilterTags = computed(() => {
  const tags = [];
  advFilters.value.risk.forEach(v => tags.push({ category: '风险等级', label: v, type: 'risk', value: v }));
  advFilters.value.impact.forEach(v => tags.push({ category: '影响指数', label: v, type: 'impact', value: v }));
  advFilters.value.investment.forEach(v => tags.push({ category: '研发投入', label: v, type: 'investment', value: v }));
  if (advFilters.value.maturityMin) tags.push({ category: '成熟度', label: `${advFilters.value.maturityMin}-${advFilters.value.maturityMax || 100}`, type: 'maturity', value: 'maturity' });
  if (advFilters.value.heatMin) tags.push({ category: '热度', label: `${advFilters.value.heatMin}-${advFilters.value.heatMax || 100}`, type: 'heat', value: 'heat' });
  if (advFilters.value.dateStart) tags.push({ category: '时间', label: `${advFilters.value.dateStart}至${advFilters.value.dateEnd || '至今'}`, type: 'date', value: 'date' });
  advFilters.value.fields.forEach(v => tags.push({ category: '技术领域', label: v, type: 'fields', value: v }));
  return tags;
});

const selectedFilterCount = computed(() => selectedFilterTags.value.length);

function removeFilterTag(type, value) {
  if (type === 'maturity') { advFilters.value.maturityMin = null; advFilters.value.maturityMax = null; }
  else if (type === 'heat') { advFilters.value.heatMin = null; advFilters.value.heatMax = null; }
  else if (type === 'date') { advFilters.value.dateStart = null; advFilters.value.dateEnd = null; }
  else { const arr = advFilters.value[type]; const idx = arr.indexOf(value); if (idx > -1) arr.splice(idx, 1); }
}

function resetAdvancedFilters() {
  advFilters.value = { risk: [], impact: [], investment: [], fields: [], maturityMin: null, maturityMax: null, heatMin: null, heatMax: null, dateStart: null, dateEnd: null };
  showToast('已重置高级筛选', 'info');
}

function applyAdvancedFilters() {
  showToast(`筛选条件已应用，共${selectedFilterCount.value}项`, 'success');
  showAdvancedFilter.value = false;
}

// ==================== 前沿技术清单 ====================
const frontierKeyword = ref('');
const frontierCategory = ref('');
const frontierField = ref('');
const frontierRisk = ref('');
const frontierImpact = ref('');
const frontierSort = ref('');
const currentSelectedTech = ref(null);
const favoriteSet = ref(new Set());

const filteredFrontierData = computed(() => {
  let data = [...frontierTechData];
  if (frontierCategory.value) data = data.filter(t => t.category === frontierCategory.value);
  if (frontierKeyword.value) {
    const kw = frontierKeyword.value.toLowerCase();
    data = data.filter(t => t.name.toLowerCase().includes(kw) || t.category.toLowerCase().includes(kw));
  }
  return data;
});

function selectFrontierTech(tech) {
  currentSelectedTech.value = tech;
  showToast(`已选择：${tech.name}`, 'info');
}

function toggleFavorite(name) {
  if (favoriteSet.value.has(name)) { favoriteSet.value.delete(name); showToast('已取消收藏', 'info'); }
  else { favoriteSet.value.add(name); showToast('已收藏', 'success'); }
}

// 前沿高级筛选弹窗
const showFrontierFilter = ref(false);
const frontierFilterChecks = ref({ maturity: [], risk: [], time: [], heat: [], investment: [] });

const frontierFilterOptions = {
  maturity: [{ label: '概念验证', value: 'concept' }, { label: '实验室阶段', value: 'lab' }, { label: '工程化应用', value: 'engineering' }, { label: '商业化成熟', value: 'commercial' }],
  risk: [{ label: '低风险', value: 'low' }, { label: '中风险', value: 'medium' }, { label: '高风险', value: 'high' }],
  time: [{ label: '近1年', value: '1' }, { label: '近2年', value: '2' }, { label: '近5年', value: '5' }, { label: '5年以上', value: '5+' }],
  heat: [{ label: '90以上极高', value: '90+' }, { label: '80-89高', value: '80-89' }, { label: '70-79中', value: '70-79' }, { label: '70以下低', value: '70-' }],
  investment: [{ label: '10亿以上', value: '10+' }, { label: '1-10亿', value: '1-10' }, { label: '1千万-1亿', value: '0.1-1' }, { label: '1千万以下', value: '0.1-' }]
};

function toggleFrontierFilter(type, value) {
  const arr = frontierFilterChecks.value[type];
  const idx = arr.indexOf(value);
  if (idx > -1) arr.splice(idx, 1);
  else arr.push(value);
}

function resetFrontierFilters() {
  frontierKeyword.value = '';
  frontierCategory.value = '';
  frontierField.value = '';
  frontierRisk.value = '';
  frontierImpact.value = '';
  frontierSort.value = '';
  frontierFilterChecks.value = { maturity: [], risk: [], time: [], heat: [], investment: [] };
  showToast('已重置筛选条件', 'info');
}

function applyFrontierAdvancedFilter() {
  showToast('高级筛选已应用', 'success');
  showFrontierFilter.value = false;
}

// ==================== 关联分析弹窗 ====================
const showRelationModal = ref(false);
const showNodeDetail = ref(false);
const nodeDetail = ref({ name: '', type: '', cases: [], analysis: {}, stats: {} });
const currentRelationData = ref(null);

function generateRelationData(techName) {
  if (relationDatabase[techName]) return relationDatabase[techName];
  return {
    entities: [
      { name: '领先企业A', type: '企业', desc: '核心研发方', strength: 'strong' },
      { name: '知名高校B', type: '高校', desc: '理论研究', strength: 'medium' },
      { name: '研究机构C', type: '机构', desc: '应用研究', strength: 'medium' },
      { name: '初创公司D', type: '企业', desc: '技术转化', strength: 'weak' }
    ],
    relatedTech: [
      { name: '核心技术A', type: '核心技术', desc: '基础支撑', strength: 'strong' },
      { name: '支撑技术B', type: '支撑技术', desc: '关键支撑', strength: 'medium' },
      { name: '配套技术C', type: '配套技术', desc: '辅助配套', strength: 'weak' }
    ],
    applications: [
      { name: '主要应用A', type: '应用', desc: '核心场景', strength: 'strong' },
      { name: '拓展应用B', type: '应用', desc: '延伸场景', strength: 'medium' }
    ]
  };
}

function getStrengthText(s) { return s === 'strong' ? '强' : s === 'medium' ? '中' : '弱'; }
function getStrengthClass(s) { return `strength-${s}`; }

function showFrontierRelationAnalysis() {
  if (!currentSelectedTech.value) return;
  const techName = currentSelectedTech.value.name;
  currentRelationData.value = generateRelationData(techName);
  showRelationModal.value = true;
  nextTick(() => renderRelationNetwork(techName));
}

function showRelationItemDetail(name, type) {
  const item = [...currentRelationData.value.entities, ...currentRelationData.value.relatedTech, ...currentRelationData.value.applications].find(i => i.name === name);
  showNodeDetailPanel(name, type, item || { name, type, strength: 'medium', desc: '' });
}

function showNodeDetailPanel(name, typeName, nodeData) {
  const typeNames = { core: '核心技术', entity: '科技实体', tech: '关联技术', application: '应用场景' };
  nodeDetail.value = {
    name,
    type: typeNames[typeName] || typeName,
    cases: generateNodeCases(name, typeName),
    analysis: generateNodeAnalysis(name, nodeData),
    stats: generateNodeStats(name, typeName)
  };
  showNodeDetail.value = true;
}

function generateNodeCases(name, type) {
  if (caseDatabase[name]) return caseDatabase[name];
  return [
    { title: `${name}技术突破`, desc: `${name}领域取得关键技术突破，推动产业发展。`, date: '2024-01', leader: '研发团队', category: '技术创新' },
    { title: `${name}应用示范`, desc: `${name}在重点领域的应用示范项目取得阶段性成果。`, date: '2023-09', leader: '应用团队', category: '应用示范' },
    { title: `${name}标准制定`, desc: `围绕${name}的技术标准与规范制定工作持续推进。`, date: '2023-06', leader: '标准化组织', category: '标准化' }
  ];
}

function generateNodeAnalysis(name, nodeData) {
  const strengthMap = { strong: '深度合作', medium: '中度合作', weak: '轻度关联' };
  const maturityMap = { strong: '商业化成熟', medium: '技术开发中', weak: '概念验证' };
  const companiesMap = {
    'NASA': ['SpaceX', '波音', '洛克希德·马丁', '诺斯罗普·格鲁曼'],
    '中国航天科技': ['中国电科', '航天科工', '中科院', '哈工大'],
    'JAXA': ['三菱重工', 'IHI', 'NEC', '东芝'],
    'ESA': ['空客', '泰雷兹', 'OHB', 'DLR'],
    '无线输电': ['MIT', '中国电科46所', ' Nokia', '华为'],
    '高效光伏': ['First Solar', '隆基绿能', '通威股份', '晶澳科技'],
    '地面供电': ['国家电网', '南方电网', '华能集团', '大唐集团']
  };
  const companies = companiesMap[name] || ['合作企业A', '合作企业B', '合作企业C'];
  return {
    depth: strengthMap[nodeData.strength] || '中度合作',
    frequency: Math.floor(Math.random() * 50) + 10 + '次/年',
    maturity: maturityMap[nodeData.strength] || '技术开发中',
    companies,
    techAnalysis: `该节点与核心技术存在${strengthMap[nodeData.strength] || '中度合作'}关系，在技术链条中发挥重要支撑作用。`
  };
}

function generateNodeStats(name, type) {
  const typeSuggestions = {
    entity: '建议加强产学研协同创新，推动核心技术转化与产业化落地。',
    tech: '建议持续加大研发投入，关注技术成熟度提升与成本下降曲线。',
    application: '建议加快示范应用推广，形成可复制的商业模式与运营经验。'
  };
  return {
    relatedTech: Math.floor(Math.random() * 8) + 3,
    papers: Math.floor(Math.random() * 100) + 15,
    projects: Math.floor(Math.random() * 10) + 2,
    suggestion: typeSuggestions[type] || '建议持续关注该方向的技术动态与发展机会。'
  };
}

function exportRelationAnalysis() {
  if (!currentSelectedTech.value) return;
  showToast(`正在导出 ${currentSelectedTech.value.name} 的关联分析报告...`, 'info');
}

function exportFrontierTech() {
  if (!currentSelectedTech.value) return;
  showToast(`正在导出 ${currentSelectedTech.value.name} 的技术档案...`, 'info');
}

function subscribeFrontierTech() {
  if (!currentSelectedTech.value) return;
  showToast(`已订阅 ${currentSelectedTech.value.name} 的更新提醒`, 'success');
}

// ==================== 关系网络图（Canvas 绘制）====================
const networkCanvas = ref(null);
const networkTooltip = ref({ visible: false, x: 0, y: 0, title: '', type: '', desc: '' });
let networkNodes = [];
let networkAnimId = null;

const nodeColors = { core: '#1890ff', entity: '#52c41a', tech: '#fa8c16', application: '#722ed1' };
const typeNames = { core: '核心技术', entity: '科技实体', tech: '关联技术', application: '应用场景' };

function renderRelationNetwork(techName) {
  const canvas = networkCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const data = currentRelationData.value;
  if (!data) return;

  // 构建节点
  networkNodes = [];
  networkNodes.push({ name: techName, type: 'core', x: cx, y: cy, r: 35, strength: 'strong' });

  const angleStart = { entity: Math.PI, tech: 0, application: Math.PI / 2 };
  const angleSpread = { entity: 0.6, tech: 0.6, application: 0.4 };

  data.entities.forEach((item, i) => {
    const angle = angleStart.entity + (i - (data.entities.length - 1) / 2) * angleSpread.entity;
    const dist = 160;
    networkNodes.push({ ...item, type: 'entity', x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, r: 22 });
  });
  data.relatedTech.forEach((item, i) => {
    const angle = angleStart.tech + (i - (data.relatedTech.length - 1) / 2) * angleSpread.tech;
    const dist = 160;
    networkNodes.push({ ...item, type: 'tech', x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, r: 22 });
  });
  data.applications.forEach((item, i) => {
    const angle = angleStart.application + (i - (data.applications.length - 1) / 2) * angleSpread.application - Math.PI / 2;
    const dist = 160;
    networkNodes.push({ ...item, type: 'application', x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, r: 22 });
  });

  // 动画绘制
  let progress = 0;
  if (networkAnimId) cancelAnimationFrame(networkAnimId);

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);

    // 绘制连线
    networkNodes.forEach((node, i) => {
      if (i === 0) return;
      const core = networkNodes[0];
      const lineWidth = node.strength === 'strong' ? 3 : node.strength === 'medium' ? 2 : 1;
      const alpha = node.strength === 'strong' ? 0.6 : node.strength === 'medium' ? 0.4 : 0.25;
      const drawLen = Math.min(progress, 1);
      const tx = core.x + (node.x - core.x) * drawLen;
      const ty = core.y + (node.y - core.y) * drawLen;

      ctx.beginPath();
      ctx.moveTo(core.x, core.y);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = `rgba(24, 144, 255, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // 箭头
      if (progress >= 1) {
        const ang = Math.atan2(node.y - core.y, node.x - core.x);
        const ax = node.x - Math.cos(ang) * (node.r + 4);
        const ay = node.y - Math.sin(ang) * (node.r + 4);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - Math.cos(ang - 0.4) * 8, ay - Math.sin(ang - 0.4) * 8);
        ctx.lineTo(ax - Math.cos(ang + 0.4) * 8, ay - Math.sin(ang + 0.4) * 8);
        ctx.closePath();
        ctx.fillStyle = `rgba(24, 144, 255, ${alpha})`;
        ctx.fill();
      }
    });

    // 绘制节点
    networkNodes.forEach((node, i) => {
      if (i === 0) {
        // core 节点带发光
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 1.8);
        grad.addColorStop(0, 'rgba(24,144,255,0.3)');
        grad.addColorStop(1, 'rgba(24,144,255,0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      const np = Math.min(progress * 1.5, 1);
      const r = node.r * np;
      if (r < 1) return;

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = nodeColors[node.type];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 文字
      if (np >= 0.8) {
        ctx.fillStyle = '#fff';
        ctx.font = `${node.type === 'core' ? '14' : '12'}px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let label = node.name;
        if (label.length > 4) label = label.slice(0, 4) + '...';
        ctx.fillText(label, node.x, node.y);
      }
    });

    if (progress < 1) {
      progress = Math.min(progress + 0.02, 1);
      networkAnimId = requestAnimationFrame(draw);
    }
  }
  progress = 0;
  draw();
}

function handleNetworkMouseMove(e) {
  const canvas = networkCanvas.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
  const my = (e.clientY - rect.top) * (canvas.height / rect.height);

  let hovered = null;
  for (const node of networkNodes) {
    const dx = node.x - mx;
    const dy = node.y - my;
    if (Math.sqrt(dx * dx + dy * dy) <= node.r) { hovered = node; break; }
  }

  if (hovered) {
    canvas.style.cursor = 'pointer';
    networkTooltip.value = {
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      title: hovered.name,
      type: typeNames[hovered.type] || '',
      desc: hovered.desc || ''
    };
  } else {
    canvas.style.cursor = 'grab';
    networkTooltip.value.visible = false;
  }
}

function handleNetworkClick(e) {
  const canvas = networkCanvas.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
  const my = (e.clientY - rect.top) * (canvas.height / rect.height);

  for (const node of networkNodes) {
    const dx = node.x - mx;
    const dy = node.y - my;
    if (Math.sqrt(dx * dx + dy * dy) <= node.r) {
      if (node.type === 'core') {
        showNodeDetailPanel(currentSelectedTech.value.name, 'core', { name: currentSelectedTech.value.name, strength: 'strong', desc: '' });
      } else {
        showRelationItemDetail(node.name, node.type);
      }
      return;
    }
  }
}

// ==================== 技术趋势分析 ====================
const trendFilter = ref('all');
const activeTrendTag = ref(null);
const chartType = ref('heat');
const lineMetric1 = ref('heat');
const lineMetric2 = ref('maturity');
const selectedCategories = ref(['ai', 'quantum', 'energy', 'bio', 'comm']);

const categoryOptions = [
  { id: 'ai', label: '人工智能' },
  { id: 'quantum', label: '量子技术' },
  { id: 'energy', label: '新能源' },
  { id: 'bio', label: '生物技术' },
  { id: 'comm', label: '通信技术' }
];

const metricNames = { heat: '热度指数', maturity: '成熟度', investment: '投资额' };

// 标签显示文本映射 — 与原型一致
const tagLabels = {
  trend: '技术趋势',
  disruptive: '颠覆性技术',
  frontier: '前沿技术',
  ai: 'AI',
  quantum: '量子',
  energy: '能源',
  bio: '生物',
  comm: '通信',
  hot: '热门',
  new: '新兴'
};
// 仅 trend/disruptive/frontier 三类标签可点击聚合
const clickableTags = ['trend', 'disruptive', 'frontier'];

const filteredTrendData = computed(() => {
  if (trendFilter.value === 'all') return trendTechData;
  const filterMap = { ai: 'ai', energy: 'energy', bio: 'bio' };
  return trendTechData.filter(t => {
    const item = trendTechData.find(d => d.name === t.name);
    if (!item) return false;
    // 通过 techComparisonData 的 categories 判断
    const idx = techComparisonData.names.indexOf(t.name);
    if (idx === -1) return false;
    return techComparisonData.categories[idx] === filterMap[trendFilter.value];
  });
});

function filterTrendTechList(filter) {
  trendFilter.value = filter;
  const count = filteredTrendData.value.length;
  showToast(`筛选${filter === 'all' ? '全部' : ''}技术，共${count}项`, 'info');
}

function filterTrendByTag(tagType) {
  if (!clickableTags.includes(tagType)) return;
  if (activeTrendTag.value === tagType) {
    activeTrendTag.value = null;
    showToast('已取消聚合筛选', 'info');
  } else {
    activeTrendTag.value = tagType;
    const count = trendTechData.filter(t => t.tags.includes(tagType)).length;
    showToast(`聚合筛选：${tagLabels[tagType]}，匹配${count}项`, 'info');
  }
}

function toggleCategory(catId) {
  const idx = selectedCategories.value.indexOf(catId);
  if (idx > -1) selectedCategories.value.splice(idx, 1);
  else selectedCategories.value.push(catId);
}

function resetCategoryFilter() {
  selectedCategories.value = ['ai', 'quantum', 'energy', 'bio', 'comm'];
  showToast('已重置筛选条件', 'info');
}

function switchTechChart(type) {
  chartType.value = type;
}

// 图表数据（CSS 柱状图）
const filteredComparisonData = computed(() => {
  const data = { names: [], heat: [], maturity: [], investment: [], colors: [], categories: [] };
  techComparisonData.names.forEach((name, i) => {
    if (selectedCategories.value.includes(techComparisonData.categories[i])) {
      data.names.push(name);
      data.heat.push(techComparisonData.heat[i]);
      data.maturity.push(techComparisonData.maturity[i]);
      data.investment.push(techComparisonData.investment[i]);
      data.colors.push(techComparisonData.colors[i]);
      data.categories.push(techComparisonData.categories[i]);
    }
  });
  return data;
});

const chartBars = computed(() => {
  const data = filteredComparisonData.value;
  const values = chartType.value === 'heat' ? data.heat : chartType.value === 'maturity' ? data.maturity : data.investment;
  const max = Math.max(...values, 1);
  return data.names.map((name, i) => ({
    name,
    value: values[i],
    percent: (values[i] / max) * 100,
    color: data.colors[i]
  }));
});

// 折线图数据（CSS 简化实现）
const lineChartData = computed(() => {
  const data = filteredComparisonData.value;
  const v1 = chartType.value === 'heat' ? data.heat : lineMetric1.value === 'heat' ? data.heat : lineMetric1.value === 'maturity' ? data.maturity : data.investment;
  const v2 = lineMetric2.value === 'heat' ? data.heat : lineMetric2.value === 'maturity' ? data.maturity : data.investment;
  const max1 = Math.max(...v1, 1);
  const max2 = Math.max(...v2, 1);
  return data.names.map((name, i) => ({
    name,
    val1: v1[i],
    val2: v2[i],
    pct1: (v1[i] / max1) * 100,
    pct2: (v2[i] / max2) * 100
  }));
});

// 领域分布数据
const fieldDistribution = computed(() => {
  const fields = {};
  filteredComparisonData.value.categories.forEach(c => {
    const label = categoryOptions.find(o => o.id === c)?.label || c;
    fields[label] = (fields[label] || 0) + 1;
  });
  const total = Object.values(fields).reduce((a, b) => a + b, 0) || 1;
  const colors = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2'];
  return Object.entries(fields).map(([name, count], i) => ({
    name,
    percent: Math.round((count / total) * 100),
    color: colors[i % colors.length]
  }));
});

// 标签云数据
const tagCloudData = [
  { name: '大语言模型', size: 'size-xl' },
  { name: '量子计算', size: 'size-lg' },
  { name: '固态电池', size: 'size-lg' },
  { name: '基因编辑', size: 'size-md' },
  { name: '6G通信', size: 'size-md' },
  { name: '脑机接口', size: 'size-md' },
  { name: '可控核聚变', size: 'size-sm' },
  { name: '空间太阳能', size: 'size-sm' },
  { name: '生成式AI', size: 'size-md' },
  { name: 'mRNA疫苗', size: 'size-xs' },
  { name: '石墨烯', size: 'size-xs' },
  { name: '合成生物学', size: 'size-xs' }
];

// ==================== 生命周期 ====================
onMounted(() => {
  // 初始高亮第一张卡片
  nextTick(() => {
    // 初始化时不需要特别做什么，Vue 响应式自动处理
  });
});

onUnmounted(() => {
  if (networkAnimId) cancelAnimationFrame(networkAnimId);
});

// 关闭弹窗时清理动画
watch(showRelationModal, (val) => {
  if (!val && networkAnimId) {
    cancelAnimationFrame(networkAnimId);
    networkAnimId = null;
  }
});
</script>

<template>
  <div class="disruptive-tech-page">
    <!-- 顶部导航栏 -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'disruptive' }" @click="switchTab('disruptive')">
          <i class="fas fa-bolt"></i> 颠覆性技术识别
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'frontier' }" @click="switchTab('frontier')">
          <i class="fas fa-list-ul"></i> 前沿技术清单
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'trend' }" @click="switchTab('trend')">
          <i class="fas fa-chart-line"></i> 技术趋势分析
        </a>
      </nav>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- ====== 颠覆性技术识别 ====== -->
      <div v-show="activeTab === 'disruptive'">
        <!-- 搜索筛选区域 -->
        <div class="search-filter-section">
          <div class="search-row">
            <div class="search-input-wrapper">
              <input type="text" class="search-input" placeholder="搜索技术名称、关键字..." v-model="searchKeyword" @keyup.enter="doSearch" />
              <button class="search-icon-btn" @click="doSearch"><i class="fas fa-search"></i></button>
            </div>
            <button class="btn-primary-blue" @click="showAdvancedFilter = true">
              <i class="fas fa-filter"></i> 高级筛选
            </button>
            <button class="btn-reset-filter" @click="resetFilters">重置筛选</button>
          </div>
          <div class="filter-row">
            <select class="filter-select" v-model="filterCategory" @change="applyFilters">
              <option value="">全部分类</option>
              <option value="人工智能">人工智能</option>
              <option value="量子技术">量子技术</option>
              <option value="生物技术">生物技术</option>
              <option value="新能源">新能源</option>
              <option value="材料科学">材料科学</option>
            </select>
            <select class="filter-select" v-model="filterField" @change="applyFilters">
              <option value="">全部领域</option>
              <option value="信息技术">信息技术</option>
              <option value="医疗健康">医疗健康</option>
              <option value="能源环保">能源环保</option>
              <option value="智能制造">智能制造</option>
            </select>
            <select class="filter-select" v-model="filterRisk" @change="applyFilters">
              <option value="">全部风险</option>
              <option value="低风险">低风险</option>
              <option value="中风险">中风险</option>
              <option value="高风险">高风险</option>
            </select>
            <select class="filter-select" v-model="filterImpact" @change="applyFilters">
              <option value="">影响指数</option>
              <option value="90-100">90-100</option>
              <option value="80-89">80-89</option>
              <option value="70-79">70-79</option>
            </select>
            <select class="filter-select" v-model="filterSort" @change="applyFilters">
              <option value="">默认排序</option>
              <option value="impact">影响指数从高到低</option>
              <option value="growth">增长率从高到低</option>
              <option value="hot">热度从高到低</option>
            </select>
          </div>
        </div>

        <!-- 颠覆性技术卡片网格 -->
        <div class="disruptive-grid">
          <div v-for="tech in filteredTechData" :key="tech.name" class="tech-card" @click="goTechDetail(tech.name)">
            <div class="card-header">
              <span class="tech-name">{{ tech.name }}</span>
              <span class="impact-badge">影响指数 {{ tech.impact }}</span>
            </div>
            <div class="card-metrics">
              <div class="metrics-row">
                <div class="metric-item">
                  <div class="metric-value" :class="getMaturityClass(tech.maturity)">{{ tech.maturity }}</div>
                  <div class="metric-label">技术成熟度</div>
                </div>
                <div class="metric-item">
                  <div class="metric-value" :class="getHeatClass(tech.heat)">{{ tech.heat }}</div>
                  <div class="metric-label">市场热度</div>
                </div>
              </div>
              <div class="metrics-row">
                <div class="metric-item">
                  <div class="metric-value"><i class="fas fa-file-alt metric-icon"></i>{{ tech.patents }}</div>
                  <div class="metric-label">相关专利</div>
                </div>
                <div class="metric-item">
                  <div class="metric-value"><i class="fas fa-book metric-icon"></i>{{ tech.papers }}</div>
                  <div class="metric-label">学术论文</div>
                </div>
                <div class="metric-item">
                  <div class="metric-value"><i class="fas fa-flask metric-icon"></i>{{ tech.projects }}</div>
                  <div class="metric-label">科研项目</div>
                </div>
                <div class="metric-item">
                  <div class="metric-value"><i class="fas fa-building metric-icon"></i>{{ tech.entityCount }}</div>
                  <div class="metric-label">参与实体</div>
                </div>
              </div>
            </div>
            <div class="card-section">
              <div class="section-label"><i class="fas fa-building"></i> 主要参与方</div>
              <div class="section-content">{{ tech.participants }}</div>
            </div>
            <div class="card-section">
              <div class="section-label"><i class="fas fa-th-large"></i> 应用场景</div>
              <div class="tag-list">
                <span v-for="app in tech.applications" :key="app" class="tag">{{ app }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="growth-rate"><i class="fas fa-arrow-up"></i>+{{ tech.growth }}% 年增长率</span>
              <span class="view-detail">查看详情 <i class="fas fa-chevron-right"></i></span>
            </div>
          </div>
        </div>
        <div v-if="!filteredTechData.length" class="empty-placeholder">
          <i class="fas fa-search"></i>
          <p>未找到匹配的技术</p>
        </div>
      </div>

      <!-- ====== 前沿技术清单 ====== -->
      <div v-show="activeTab === 'frontier'">
        <div class="frontier-container">
          <!-- 左侧 -->
          <div class="frontier-left">
            <div class="search-filter-section">
              <div class="search-row">
                <div class="search-input-wrapper">
                  <input type="text" class="search-input" placeholder="搜索技术名称、关键字..." v-model="frontierKeyword" @keyup.enter="showToast('搜索完成', 'info')" />
                  <button class="search-icon-btn" @click="showToast('搜索完成', 'info')"><i class="fas fa-search"></i></button>
                </div>
                <button class="btn-primary-blue" @click="showFrontierFilter = true">
                  <i class="fas fa-filter"></i> 高级筛选
                </button>
                <button class="btn-reset-filter" @click="resetFrontierFilters">重置筛选</button>
              </div>
              <div class="filter-row">
                <select class="filter-select" v-model="frontierCategory">
                  <option value="">全部分类</option>
                  <option value="人工智能">人工智能</option>
                  <option value="量子技术">量子技术</option>
                  <option value="生物技术">生物技术</option>
                  <option value="新能源">新能源</option>
                  <option value="材料科学">材料科学</option>
                </select>
                <select class="filter-select" v-model="frontierField">
                  <option value="">全部领域</option>
                  <option value="信息技术">信息技术</option>
                  <option value="医疗健康">医疗健康</option>
                  <option value="能源环保">能源环保</option>
                  <option value="智能制造">智能制造</option>
                </select>
                <select class="filter-select" v-model="frontierRisk">
                  <option value="">全部风险</option>
                  <option value="低风险">低风险</option>
                  <option value="中风险">中风险</option>
                  <option value="高风险">高风险</option>
                </select>
                <select class="filter-select" v-model="frontierImpact">
                  <option value="">影响指数</option>
                  <option value="90-100">90-100</option>
                  <option value="80-89">80-89</option>
                  <option value="70-79">70-79</option>
                  <option value="60-69">60-69</option>
                </select>
                <select class="filter-select" v-model="frontierSort">
                  <option value="">默认排序</option>
                  <option value="latest">最新发布</option>
                  <option value="hot">热度最高</option>
                  <option value="potential">潜力最大</option>
                </select>
              </div>
            </div>

            <!-- 技术清单表格 -->
            <div class="tech-table-container">
              <div class="tech-table-header">
                <span class="tech-table-title">前沿技术清单</span>
                <span class="tech-table-count">共 {{ filteredFrontierData.length }} 项技术</span>
              </div>
              <table class="tech-table">
                <thead>
                  <tr>
                    <th style="width:35%">技术名称</th>
                    <th style="width:15%">成熟度</th>
                    <th style="width:15%">发布日期</th>
                    <th style="width:12%">热度指数</th>
                    <th style="width:13%">趋势</th>
                    <th style="width:10%">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tech in filteredFrontierData" :key="tech.name"
                      :class="{ selected: currentSelectedTech?.name === tech.name }"
                      @click="selectFrontierTech(tech)">
                    <td>
                      <div class="tech-info-cell">
                        <div class="tech-avatar" :class="tech.avatarColor"><i :class="tech.icon"></i></div>
                        <div class="tech-name-info">
                          <span class="tech-name-text">{{ tech.name }}</span>
                          <span class="tech-category">{{ tech.category }}</span>
                        </div>
                      </div>
                    </td>
                    <td><span class="status-tag" :class="tech.stage">{{ tech.maturity }}</span></td>
                    <td>{{ tech.date }}</td>
                    <td>{{ tech.heat }}</td>
                    <td>
                      <span class="trend-indicator">
                        <i class="fas fa-arrow-up"></i>{{ tech.trend }}
                      </span>
                    </td>
                    <td>
                      <div class="action-btns">
                        <button class="btn-icon" @click.stop="selectFrontierTech(tech)"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon" @click.stop="toggleFavorite(tech.name)"><i :class="['far', 'fa-star', { fas: favoriteSet.has(tech.name) }]" :style="{ color: favoriteSet.has(tech.name) ? '#faad14' : '' }"></i></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
              </div>
            </div>
          </div>

          <!-- 右侧详情 -->
          <div class="frontier-right">
            <div class="panel-card">
              <div class="panel-card-title">技术详情</div>
              <div v-if="!currentSelectedTech" class="no-selection-tip">
                <i class="fas fa-hand-pointer"></i>
                <p>请从左侧列表中选择一项技术查看详细信息</p>
              </div>
              <div v-else id="frontierDetailContent">
                <div class="tech-detail-item">
                  <span class="tech-detail-label">技术名称</span>
                  <span class="tech-detail-value">{{ currentSelectedTech.name }}</span>
                </div>
                <div class="tech-detail-item">
                  <span class="tech-detail-label">技术分类</span>
                  <span class="tech-detail-value">{{ currentSelectedTech.category }}</span>
                </div>
                <div class="tech-detail-item">
                  <span class="tech-detail-label">成熟度评分</span>
                  <span class="tech-detail-value">{{ currentSelectedTech.maturity }}</span>
                </div>
                <div class="tech-detail-item">
                  <span class="tech-detail-label">发布日期</span>
                  <span class="tech-detail-value">{{ currentSelectedTech.date }}</span>
                </div>
                <div class="tech-detail-item">
                  <span class="tech-detail-label">热度指数</span>
                  <span class="tech-detail-value">{{ currentSelectedTech.heat }}</span>
                </div>
                <div class="tech-detail-item">
                  <span class="tech-detail-label">趋势变化</span>
                  <span class="tech-detail-value" style="color: #52c41a;">{{ currentSelectedTech.trend }}</span>
                </div>
                <div class="tech-detail-item">
                  <span class="tech-detail-label">研究机构</span>
                  <span class="tech-detail-value">{{ currentSelectedTech.institution }}</span>
                </div>
                <div class="detail-action-btns">
                  <button class="btn-full btn-primary-full" @click="goTechDetail(currentSelectedTech.name)">
                    <i class="fas fa-file-alt"></i> 查看详情
                  </button>
                  <button class="btn-full btn-secondary-full" @click="showFrontierRelationAnalysis">
                    <i class="fas fa-project-diagram"></i> 关联分析
                  </button>
                  <button class="btn-full btn-secondary-full" @click="exportFrontierTech">
                    <i class="fas fa-download"></i> 导出技术档案
                  </button>
                  <button class="btn-full btn-secondary-full" @click="subscribeFrontierTech">
                    <i class="fas fa-bell"></i> 订阅更新提醒
                  </button>
                </div>
              </div>
            </div>

            <!-- 统计数据 -->
            <div class="panel-card">
              <div class="panel-card-title">领域分布</div>
              <div class="field-distribution">
                <div v-for="field in [
                  { name: '人工智能', percent: 35, color: '#1890ff' },
                  { name: '新能源', percent: 25, color: '#52c41a' },
                  { name: '生物技术', percent: 20, color: '#fa8c16' },
                  { name: '材料科学', percent: 12, color: '#722ed1' },
                  { name: '其他', percent: 8, color: '#bfbfbf' }
                ]" :key="field.name" class="field-item">
                  <span class="field-name">{{ field.name }}</span>
                  <div class="field-bar">
                    <div class="field-fill" :style="{ width: field.percent + '%', background: field.color }"></div>
                  </div>
                  <span class="field-percent">{{ field.percent }}%</span>
                </div>
              </div>
            </div>

            <!-- 统计数据 -->
            <div class="panel-card">
              <div class="panel-card-title">热度趋势</div>
              <div class="stats-row">
                <div class="stat-box">
                  <div class="stat-box-value">7</div>
                  <div class="stat-box-label">前沿技术</div>
                </div>
                <div class="stat-box">
                  <div class="stat-box-value">98</div>
                  <div class="stat-box-label">最高热度</div>
                </div>
                <div class="stat-box">
                  <div class="stat-box-value">+28%</div>
                  <div class="stat-box-label">平均增长</div>
                </div>
              </div>
              <div class="chart-container" style="height: 120px;">
                <div class="mini-line-chart">
                  <div v-for="(val, i) in [65, 72, 78, 85, 92, 98]" :key="i" class="mini-bar"
                       :style="{ height: val + '%', background: 'linear-gradient(180deg, #1890ff, #36cfc9)' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ====== 技术趋势分析 ====== -->
      <div v-show="activeTab === 'trend'">
        <div class="trend-analysis-container">
          <!-- 左侧：热门技术趋势排行 -->
          <div class="trend-panel-card">
            <div class="trend-section-header">
              <h3 class="trend-section-title"><i class="fas fa-list-ol"></i> 热门技术趋势排行</h3>
              <div class="trend-filter-tabs">
                <button class="trend-tab" :class="{ active: trendFilter === 'all' }" @click="filterTrendTechList('all')">全部</button>
                <button class="trend-tab" :class="{ active: trendFilter === 'ai' }" @click="filterTrendTechList('ai')">人工智能</button>
                <button class="trend-tab" :class="{ active: trendFilter === 'energy' }" @click="filterTrendTechList('energy')">新能源</button>
                <button class="trend-tab" :class="{ active: trendFilter === 'bio' }" @click="filterTrendTechList('bio')">生物技术</button>
              </div>
            </div>

            <div class="trend-tech-list">
              <div v-for="tech in filteredTrendData" :key="tech.name"
                   class="trend-tech-item"
                   :class="{ 'tag-highlighted': activeTrendTag && tech.tags.includes(activeTrendTag) }"
                   @click="goTechDetail(tech.name)">
                <div class="trend-rank" :class="`rank-${tech.rank}`">{{ tech.rank }}</div>
                <div class="trend-tech-info">
                  <div class="trend-tech-name">{{ tech.name }}</div>
                  <div class="trend-tech-tags">
                    <span v-for="tag in tech.tags" :key="tag"
                          class="tech-tag-small"
                          :class="[tag, { 'active-filter': activeTrendTag === tag }]"
                          @click.stop="filterTrendByTag(tag)">{{ tagLabels[tag] }}</span>
                  </div>
                  <div class="trend-tech-desc">{{ tech.desc }}</div>
                </div>
                <div class="trend-tech-metrics">
                  <div class="metric-item">
                    <span class="metric-label">热度</span>
                    <span class="metric-value heat">{{ tech.heat }}</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">成熟度</span>
                    <span class="metric-value maturity" :class="tech.maturityStage">{{ tech.maturity }}</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">投资额</span>
                    <span class="metric-value investment">${{ tech.investment }}亿</span>
                  </div>
                </div>
                <div class="trend-tech-growth" :data-tooltip="tech.tooltip">
                  <i class="fas fa-arrow-up"></i> {{ tech.growth }}
                </div>
              </div>
            </div>

            <!-- 标签云 -->
            <div class="trend-chart-section">
              <div class="trend-chart-title">技术标签云</div>
              <div class="tech-tag-cloud">
                <span v-for="tag in tagCloudData" :key="tag.name" class="tag-cloud-item" :class="tag.size"
                      @click="showToast(`标签：${tag.name}`, 'info')">{{ tag.name }}</span>
              </div>
            </div>
          </div>

          <!-- 右侧：技术指标对比 -->
          <div class="trend-panel-card">
            <div class="trend-section-header">
              <h3 class="trend-section-title"><i class="fas fa-chart-bar"></i> 技术指标对比</h3>
            </div>

            <!-- 类别筛选框 -->
            <div class="category-filter-section" style="margin-bottom: 16px; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div class="filter-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 13px; font-weight: 600; color: #333;">
                  <i class="fas fa-filter" style="margin-right: 6px; color: #1890ff;"></i>类别筛选
                </span>
                <button @click="resetCategoryFilter" style="font-size: 12px; color: #1890ff; background: none; border: none; cursor: pointer; padding: 2px 8px;">
                  <i class="fas fa-undo"></i> 重置
                </button>
              </div>
              <div class="category-checkboxes" style="display: flex; flex-wrap: wrap; gap: 8px;">
                <label v-for="cat in categoryOptions" :key="cat.id" class="category-checkbox"
                       :class="{ active: selectedCategories.includes(cat.id) }"
                       @click="toggleCategory(cat.id)">
                  <span class="checkbox-label">{{ cat.label }}</span>
                </label>
              </div>
              <div class="selected-count" style="margin-top: 8px; font-size: 12px; color: #666;">
                已选择 <span style="font-weight: 600; color: #1890ff;">{{ filteredComparisonData.names.length }}</span> 项技术
              </div>
            </div>

            <!-- 图表切换 -->
            <div class="chart-tabs">
              <button class="chart-tab" :class="{ active: chartType === 'heat' }" @click="switchTechChart('heat')">热度指数</button>
              <button class="chart-tab" :class="{ active: chartType === 'maturity' }" @click="switchTechChart('maturity')">成熟度</button>
              <button class="chart-tab" :class="{ active: chartType === 'investment' }" @click="switchTechChart('investment')">投资额</button>
            </div>

            <!-- CSS 柱状图 -->
            <div class="tech-chart-container" style="height: 400px;">
              <div class="css-bar-chart">
                <div v-for="bar in chartBars" :key="bar.name" class="css-bar-row">
                  <span class="css-bar-label">{{ bar.name }}</span>
                  <div class="css-bar-track">
                    <div class="css-bar-fill" :style="{ width: bar.percent + '%', background: bar.color }">
                      <span class="css-bar-value">{{ bar.value }}{{ chartType === 'investment' ? '亿$' : '' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 图例 -->
            <div class="tech-legend">
              <div class="legend-row"><span class="legend-color" style="background: #1890ff;"></span><span class="legend-text">Top 3 领先技术</span></div>
              <div class="legend-row"><span class="legend-color" style="background: #52c41a;"></span><span class="legend-text">4-6名 成长技术</span></div>
              <div class="legend-row"><span class="legend-color" style="background: #faad14;"></span><span class="legend-text">7-8名 新兴技术</span></div>
            </div>

            <!-- 折线图对比 -->
            <div class="trend-chart-section" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
              <div class="trend-section-header" style="margin-bottom: 16px;">
                <h3 class="trend-section-title" style="font-size: 15px;">
                  <i class="fas fa-chart-line" style="color: #1890ff;"></i>
                  趋势对比分析
                </h3>
                <div class="line-chart-controls" style="display: flex; gap: 12px; align-items: center;">
                  <select class="filter-select" v-model="lineMetric1" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #d9d9d9; font-size: 13px; cursor: pointer;">
                    <option value="heat">热度指数</option>
                    <option value="maturity">成熟度</option>
                    <option value="investment">投资额</option>
                  </select>
                  <span style="color: #999;">对比</span>
                  <select class="filter-select" v-model="lineMetric2" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #d9d9d9; font-size: 13px; cursor: pointer;">
                    <option value="heat">热度指数</option>
                    <option value="maturity">成熟度</option>
                    <option value="investment">投资额</option>
                  </select>
                </div>
              </div>
              <div class="css-line-chart">
                <div v-for="item in lineChartData" :key="item.name" class="css-line-row">
                  <span class="css-bar-label">{{ item.name }}</span>
                  <div class="css-bar-track">
                    <div class="css-line-fill-1" :style="{ width: item.pct1 + '%' }"></div>
                    <div class="css-line-fill-2" :style="{ width: item.pct2 + '%' }"></div>
                  </div>
                  <span class="css-line-val1">{{ item.val1 }}</span>
                  <span class="css-line-val2">{{ item.val2 }}</span>
                </div>
              </div>
              <div class="line-chart-legend" style="display: flex; justify-content: center; gap: 24px; margin-top: 12px;">
                <div class="legend-item" style="display: flex; align-items: center; gap: 6px;">
                  <span style="width: 24px; height: 3px; background: #1890ff; border-radius: 2px;"></span>
                  <span style="font-size: 12px; color: #666;">{{ metricNames[lineMetric1] }}</span>
                </div>
                <div class="legend-item" style="display: flex; align-items: center; gap: 6px;">
                  <span style="width: 24px; height: 3px; background: #52c41a; border-radius: 2px;"></span>
                  <span style="font-size: 12px; color: #666;">{{ metricNames[lineMetric2] }}</span>
                </div>
              </div>
            </div>

            <!-- 领域分布 -->
            <div class="trend-chart-section">
              <div class="trend-chart-title">领域分布</div>
              <div class="field-distribution">
                <div v-for="field in fieldDistribution" :key="field.name" class="field-item">
                  <span class="field-name">{{ field.name }}</span>
                  <div class="field-bar">
                    <div class="field-fill" :style="{ width: field.percent + '%', background: field.color }"></div>
                  </div>
                  <span class="field-percent">{{ field.percent }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== 高级筛选弹窗（颠覆性） ====== -->
    <div v-if="showAdvancedFilter" class="advanced-filter-modal show" @click.self="showAdvancedFilter = false">
      <div class="advanced-filter-content">
        <div class="advanced-filter-header">
          <h3>高级筛选</h3>
          <button class="advanced-filter-close" @click="showAdvancedFilter = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="advanced-filter-body">
          <!-- 技术成熟程度 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-vial"></i> 技术成熟程度</div>
            <div class="filter-range">
              <input type="number" class="filter-range-input" v-model="advFilters.maturityMin" placeholder="最小值" min="0" max="100" />
              <span class="filter-range-separator">—</span>
              <input type="number" class="filter-range-input" v-model="advFilters.maturityMax" placeholder="最大值" min="0" max="100" />
            </div>
          </div>
          <!-- 风险等级 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-exclamation-triangle"></i> 风险等级</div>
            <div class="filter-options">
              <span v-for="opt in riskOptions" :key="opt" class="filter-option"
                    :class="{ active: advFilters.risk.includes(opt) }"
                    @click="toggleFilterOption('risk', opt)">{{ opt }}</span>
            </div>
          </div>
          <!-- 技术发展时间范围 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-calendar"></i> 技术发展时间范围</div>
            <div class="filter-range">
              <input type="date" class="filter-date-input" v-model="advFilters.dateStart" />
              <span class="filter-range-separator">—</span>
              <input type="date" class="filter-date-input" v-model="advFilters.dateEnd" />
            </div>
          </div>
          <!-- 影响指数 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-bolt"></i> 影响指数</div>
            <div class="filter-options">
              <span v-for="opt in impactOptions" :key="opt.value" class="filter-option"
                    :class="{ active: advFilters.impact.includes(opt.value) }"
                    @click="toggleFilterOption('impact', opt.value)">{{ opt.label }}</span>
            </div>
          </div>
          <!-- 技术领域 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-layer-group"></i> 技术领域</div>
            <div class="filter-checkbox-group">
              <label v-for="opt in fieldOptions" :key="opt.id" class="filter-checkbox-item">
                <input type="checkbox" :checked="advFilters.fields.includes(opt.value)" @change="toggleFieldFilter(opt.value)" />
                <span>{{ opt.label }}</span>
              </label>
            </div>
          </div>
          <!-- 市场热度 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-fire"></i> 市场热度</div>
            <div class="filter-range">
              <input type="number" class="filter-range-input" v-model="advFilters.heatMin" placeholder="最小值" min="0" max="100" />
              <span class="filter-range-separator">—</span>
              <input type="number" class="filter-range-input" v-model="advFilters.heatMax" placeholder="最大值" min="0" max="100" />
            </div>
          </div>
          <!-- 研发投入规模 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-dollar-sign"></i> 研发投入规模</div>
            <div class="filter-options">
              <span v-for="opt in investmentOptions" :key="opt" class="filter-option"
                    :class="{ active: advFilters.investment.includes(opt) }"
                    @click="toggleFilterOption('investment', opt)">{{ opt }}</span>
            </div>
          </div>
          <!-- 已选条件 -->
          <div class="filter-section">
            <div class="filter-section-title"><i class="fas fa-tags"></i> 已选条件</div>
            <div class="filter-tags">
              <span v-if="!selectedFilterTags.length" style="color: #999; font-size: 13px;">暂无已选条件</span>
              <span v-for="tag in selectedFilterTags" :key="tag.type + tag.value" class="filter-tag">
                {{ tag.label }}
                <i class="fas fa-times filter-tag-remove" @click="removeFilterTag(tag.type, tag.value)"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="advanced-filter-footer">
          <span class="advanced-filter-selected">已选 <strong>{{ selectedFilterCount }}</strong> 项条件</span>
          <div class="advanced-filter-actions">
            <button class="btn-filter-reset" @click="resetAdvancedFilters">重置</button>
            <button class="btn-filter-apply" @click="applyAdvancedFilters">应用筛选</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== 前沿高级筛选弹窗 ====== -->
    <div v-if="showFrontierFilter" class="filter-modal-overlay active" @click.self="showFrontierFilter = false">
      <div class="filter-modal">
        <div class="filter-modal-header">
          <span class="filter-modal-title">高级筛选</span>
          <button class="filter-modal-close" @click="showFrontierFilter = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="filter-modal-body">
          <div v-for="(opts, key) in frontierFilterOptions" :key="key" class="filter-section">
            <div class="filter-section-title">{{ { maturity: '技术成熟程度', risk: '风险等级', time: '时间范围', heat: '技术热度', investment: '投资规模' }[key] }}</div>
            <div class="checkbox-group">
              <label v-for="opt in opts" :key="opt.value" class="checkbox-item"
                     :class="{ active: frontierFilterChecks[key].includes(opt.value) }"
                     @click="toggleFrontierFilter(key, opt.value)">
                <input type="checkbox" :checked="frontierFilterChecks[key].includes(opt.value)" />
                {{ opt.label }}
              </label>
            </div>
          </div>
        </div>
        <div class="filter-modal-footer">
          <button class="btn-modal btn-modal-cancel" @click="showFrontierFilter = false">取消</button>
          <button class="btn-modal btn-modal-confirm" @click="applyFrontierAdvancedFilter">应用筛选</button>
        </div>
      </div>
    </div>

    <!-- ====== 关联分析弹窗 ====== -->
    <div v-if="showRelationModal" class="relation-modal-overlay active" @click.self="showRelationModal = false">
      <div class="relation-modal">
        <div class="relation-modal-header">
          <span class="relation-modal-title">
            <i class="fas fa-project-diagram"></i>
            {{ currentSelectedTech?.name }} - 关联分析
          </span>
          <button class="relation-modal-close" @click="showRelationModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="relation-modal-body">
          <!-- 关系网络图 -->
          <div class="relation-network-section">
            <div class="network-toolbar">
              <span class="network-title">技术生态关系图谱</span>
              <div class="network-legend">
                <div class="legend-item"><span class="legend-dot core"></span> 核心技术</div>
                <div class="legend-item"><span class="legend-dot entity"></span> 科技实体</div>
                <div class="legend-item"><span class="legend-dot tech"></span> 关联技术</div>
                <div class="legend-item"><span class="legend-dot application"></span> 应用场景</div>
              </div>
            </div>
            <div class="network-canvas-container">
              <canvas ref="networkCanvas" width="800" height="450"
                      @mousemove="handleNetworkMouseMove"
                      @mouseleave="networkTooltip.visible = false"
                      @click="handleNetworkClick"></canvas>
              <div class="network-tooltip" :class="{ visible: networkTooltip.visible }"
                   :style="{ left: networkTooltip.x + 12 + 'px', top: networkTooltip.y - 30 + 'px' }">
                <div class="tooltip-title">{{ networkTooltip.title }}</div>
                <div class="tooltip-type">{{ networkTooltip.type }}</div>
                <div v-if="networkTooltip.desc" class="tooltip-desc">{{ networkTooltip.desc }}</div>
              </div>
              <div class="network-hint">
                <i class="fas fa-info-circle"></i> 滚轮缩放 · 拖拽节点 · 点击查看详情
              </div>
            </div>
          </div>

          <!-- 关联详情 -->
          <div class="relation-details-section">
            <div class="relation-detail-card">
              <div class="detail-card-header">
                <i class="fas fa-building"></i> 关联科技实体
                <span class="relation-count">{{ currentRelationData?.entities.length || 0 }}</span>
              </div>
              <div class="detail-card-content">
                <div v-for="item in currentRelationData?.entities" :key="item.name" class="relation-item"
                     @click="showRelationItemDetail(item.name, 'entity')">
                  <div class="relation-item-icon entity"><i class="fas fa-building"></i></div>
                  <div class="relation-item-info">
                    <div class="relation-item-name">{{ item.name }}</div>
                    <div class="relation-item-desc">{{ item.desc }}</div>
                  </div>
                  <span class="relation-item-strength" :class="getStrengthClass(item.strength)">{{ getStrengthText(item.strength) }}</span>
                </div>
              </div>
            </div>

            <div class="relation-detail-card">
              <div class="detail-card-header">
                <i class="fas fa-microchip"></i> 关联技术
                <span class="relation-count">{{ currentRelationData?.relatedTech.length || 0 }}</span>
              </div>
              <div class="detail-card-content">
                <div v-for="item in currentRelationData?.relatedTech" :key="item.name" class="relation-item"
                     @click="showRelationItemDetail(item.name, 'tech')">
                  <div class="relation-item-icon tech"><i class="fas fa-microchip"></i></div>
                  <div class="relation-item-info">
                    <div class="relation-item-name">{{ item.name }}</div>
                    <div class="relation-item-desc">{{ item.desc }}</div>
                  </div>
                  <span class="relation-item-strength" :class="getStrengthClass(item.strength)">{{ getStrengthText(item.strength) }}</span>
                </div>
              </div>
            </div>

            <div class="relation-detail-card">
              <div class="detail-card-header">
                <i class="fas fa-rocket"></i> 应用场景
                <span class="relation-count">{{ currentRelationData?.applications.length || 0 }}</span>
              </div>
              <div class="detail-card-content">
                <div v-for="item in currentRelationData?.applications" :key="item.name" class="relation-item"
                     @click="showRelationItemDetail(item.name, 'application')">
                  <div class="relation-item-icon application"><i class="fas fa-rocket"></i></div>
                  <div class="relation-item-info">
                    <div class="relation-item-name">{{ item.name }}</div>
                    <div class="relation-item-desc">{{ item.desc }}</div>
                  </div>
                  <span class="relation-item-strength" :class="getStrengthClass(item.strength)">{{ getStrengthText(item.strength) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relation-modal-footer">
          <button class="btn-modal btn-modal-secondary" @click="showRelationModal = false">关闭</button>
          <button class="btn-modal btn-modal-primary" @click="exportRelationAnalysis">
            <i class="fas fa-download"></i> 导出分析报告
          </button>
        </div>
      </div>
    </div>

    <!-- ====== 节点详情面板 ====== -->
    <div v-if="showNodeDetail" class="node-detail-panel active">
      <div class="node-detail-header">
        <span class="node-type-badge">{{ nodeDetail.type }}</span>
        <span class="node-detail-title">{{ nodeDetail.name }}</span>
        <button class="node-detail-close" @click="showNodeDetail = false"><i class="fas fa-times"></i></button>
      </div>
      <div class="node-detail-body">
        <!-- 关联案例 -->
        <div class="detail-section">
          <div class="detail-section-title"><i class="fas fa-folder-open"></i> 关联案例</div>
          <div v-for="c in nodeDetail.cases" :key="c.title" class="case-item">
            <div class="case-title">{{ c.title }}</div>
            <div class="case-desc">{{ c.desc }}</div>
            <div class="case-meta">
              <span><i class="fas fa-calendar"></i> {{ c.date }}</span>
              <span><i class="fas fa-user"></i> {{ c.leader }}</span>
              <span><i class="fas fa-tag"></i> {{ c.category }}</span>
            </div>
          </div>
        </div>
        <!-- 关联分析 -->
        <div class="detail-section">
          <div class="detail-section-title"><i class="fas fa-chart-bar"></i> 关联分析</div>
          <div class="analysis-grid">
            <div class="analysis-item">
              <div class="analysis-label">合作深度</div>
              <div class="analysis-value">{{ nodeDetail.analysis.depth }}</div>
            </div>
            <div class="analysis-item">
              <div class="analysis-label">合作频率</div>
              <div class="analysis-value">{{ nodeDetail.analysis.frequency }}</div>
            </div>
            <div class="analysis-item">
              <div class="analysis-label">技术成熟度</div>
              <div class="analysis-value">{{ nodeDetail.analysis.maturity }}</div>
            </div>
            <div class="analysis-item">
              <div class="analysis-label">关联企业</div>
              <div class="analysis-value" style="font-size: 12px;">{{ nodeDetail.analysis.companies?.length || 0 }} 家</div>
            </div>
          </div>
          <div v-if="nodeDetail.analysis.companies" class="company-list" style="margin-top: 12px;">
            <span v-for="c in nodeDetail.analysis.companies" :key="c" class="company-tag">{{ c }}</span>
          </div>
          <p style="margin-top: 12px; font-size: 13px; color: #64748b; line-height: 1.6;">{{ nodeDetail.analysis.techAnalysis }}</p>
        </div>
        <!-- 统计信息 -->
        <div class="detail-section">
          <div class="detail-section-title"><i class="fas fa-chart-pie"></i> 统计信息</div>
          <div class="stats-grid">
            <div class="stats-item">
              <div class="stats-value">{{ nodeDetail.stats.relatedTech }}</div>
              <div class="stats-label">关联技术</div>
            </div>
            <div class="stats-item">
              <div class="stats-value">{{ nodeDetail.stats.papers }}</div>
              <div class="stats-label">学术论文</div>
            </div>
            <div class="stats-item">
              <div class="stats-value">{{ nodeDetail.stats.projects }}</div>
              <div class="stats-label">科研项目</div>
            </div>
          </div>
          <div class="suggestion-box">
            <div class="suggestion-title"><i class="fas fa-lightbulb"></i> 发展建议</div>
            <div class="suggestion-content">{{ nodeDetail.stats.suggestion }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== Toast ====== -->
    <div class="toast-container">
      <div v-for="t in toastList" :key="t.id" class="toast-item" :class="`toast-${t.type}`">
        <i :class="t.type === 'success' ? 'fas fa-check-circle' : t.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle'"></i>
        {{ t.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/** { margin: 0; padding: 0; box-sizing: border-box; }*/
/*
.disruptive-tech-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}
*/
.disruptive-tech-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #d8e7fc; padding: 32px 0 0; }

/* 顶部导航栏 */
.top-navbar {
  position: fixed;
  top: 48px;
  left: 220px;
  right: 0;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 56px;
  z-index: 90;
}
.navbar-nav { display: flex; gap: 8px; flex-shrink: 0; }
.nav-link {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  width: auto; height: auto;
  padding: 8px 20px; border-radius: 6px; text-decoration: none;
  color: #666; font-size: 14px; cursor: pointer; transition: all 0.3s;
  white-space: nowrap; flex-shrink: 0;
}
.nav-link:hover { background: #f0f5ff; color: #1890ff; }
.nav-link.active { background: #1890ff; color: #fff; }

/* 主内容 */
.main-content { padding: 104px 0 0; overflow-x: hidden; }

/* 搜索筛选 */
.search-filter-section {
  background: #fff; border-radius: 8px; padding: 20px;
  margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.search-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
.search-input-wrapper { position: relative; flex: 1; max-width: 400px; }
.search-input {
  width: 100%; height: 40px; border: 1px solid #d9d9d9;
  border-radius: 4px; padding: 0 40px 0 12px; font-size: 14px;
  color: #333; outline: none; transition: all 0.3s;
}
.search-input:focus { border-color: #1890ff; }
.search-input::placeholder { color: #bfbfbf; }
.search-icon-btn {
  position: absolute; right: 0; top: 0; width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; color: #999; cursor: pointer; font-size: 16px;
}
.search-icon-btn:hover { color: #1890ff; }
.btn-primary-blue {
  height: 40px; padding: 0 20px; background: #1890ff; color: #fff;
  border: none; border-radius: 4px; font-size: 14px; cursor: pointer;
  display: flex; align-items: center; gap: 6px; transition: all 0.3s;
}
.btn-primary-blue:hover { background: #40a9ff; }
.btn-reset-filter {
  height: 40px; padding: 0 20px; background: #fff; color: #666;
  border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;
  cursor: pointer; transition: all 0.3s;
}
.btn-reset-filter:hover { border-color: #1890ff; color: #1890ff; }
.filter-row { display: flex; gap: 12px; flex-wrap: wrap; }
.filter-select {
  height: 36px; padding: 0 12px; border: 1px solid #d9d9d9;
  border-radius: 4px; font-size: 14px; color: #333;
  background: #fff; cursor: pointer; outline: none; min-width: 120px;
}
.filter-select:focus { border-color: #1890ff; }

/* 颠覆性技术卡片 */
.disruptive-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px;
}
.tech-card {
  background: #fff; border: 1px solid #e8e8e8; border-radius: 8px;
  padding: 20px; cursor: pointer; transition: all 0.3s ease;
  position: relative; overflow: hidden;
}
.tech-card:hover {
  border-color: #fa8c16;
  box-shadow: 0 4px 20px rgba(250,140,22,0.15);
  transform: translateY(-2px);
}
.tech-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
  background: linear-gradient(180deg, #fa8c16, #ff9c6e);
}
.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-left: 8px; }
.tech-name { font-size: 16px; font-weight: 600; color: #333; }
.impact-badge {
  padding: 4px 12px; background: linear-gradient(135deg, #fa8c16, #ff9c6e);
  color: #fff; border-radius: 12px; font-size: 12px; font-weight: 500;
}
.card-metrics { margin-bottom: 16px; margin-left: 8px; }
.metrics-row {
  display: flex; gap: 16px; margin-bottom: 8px; padding: 12px;
  background: #fafafa; border-radius: 6px;
}
.metrics-row:last-child { margin-bottom: 0; }
.metric-item { flex: 1; text-align: center; }
.metric-value { font-size: 20px; font-weight: 600; color: #333; }
.metric-value.high { color: #52c41a; }
.metric-value.medium { color: #faad14; }
.metric-label { font-size: 12px; color: #999; margin-top: 4px; }
.metric-icon { font-size: 14px; margin-right: 4px; color: #1890ff; }
.card-section { margin-bottom: 12px; padding-left: 8px; }
.section-label { font-size: 12px; color: #999; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
.section-content { font-size: 13px; color: #666; line-height: 1.5; }
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { padding: 4px 10px; background: #fff2e8; color: #fa8c16; border-radius: 4px; font-size: 12px; }
.card-footer {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; padding-top: 12px; border-top: 1px solid #f0f0f0; padding-left: 8px;
}
.growth-rate { font-size: 13px; color: #52c41a; font-weight: 500; }
.growth-rate i { margin-right: 4px; }
.view-detail { font-size: 13px; color: #1890ff; display: flex; align-items: center; gap: 4px; }
.empty-placeholder {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 400px; color: #999;
}
.empty-placeholder i { font-size: 64px; margin-bottom: 16px; color: #d9d9d9; }

/* 前沿技术清单 */
.frontier-container { display: grid; grid-template-columns: 1fr 400px; gap: 24px; align-items: start; }
.frontier-left { display: flex; flex-direction: column; gap: 20px; }
.frontier-right { display: flex; flex-direction: column; gap: 20px; }

/* 技术表格 */
.tech-table-container {
  background: #fff; border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;
}
.tech-table-header { padding: 16px 20px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; }
.tech-table-title { font-size: 16px; font-weight: 600; color: #333; }
.tech-table-count { font-size: 13px; color: #999; }
.tech-table { width: 100%; border-collapse: collapse; }
.tech-table th { background: #fafafa; padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #666; border-bottom: 1px solid #f0f0f0; }
.tech-table td { padding: 12px 14px; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #333; }
.tech-table tr:hover { background: #f5f7fa; }
.tech-table tr.selected { background: #e6f7ff !important; box-shadow: inset 3px 0 0 #1890ff; }
.tech-info-cell { display: flex; align-items: center; gap: 12px; }
.tech-avatar {
  width: 40px; height: 40px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: #fff; flex-shrink: 0;
}
.tech-avatar.blue { background: linear-gradient(135deg, #1890ff, #36cfc9); }
.tech-avatar.green { background: linear-gradient(135deg, #52c41a, #95de64); }
.tech-avatar.orange { background: linear-gradient(135deg, #fa8c16, #ffc53d); }
.tech-avatar.purple { background: linear-gradient(135deg, #722ed1, #b37feb); }
.tech-avatar.red { background: linear-gradient(135deg, #f5222d, #ff7875); }
.tech-avatar.cyan { background: linear-gradient(135deg, #13c2c2, #5cdbd3); }
.tech-name-info { display: flex; flex-direction: column; gap: 4px; }
.tech-name-text { font-weight: 500; color: #333; }
.tech-category { font-size: 12px; color: #999; }
.status-tag { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; }
.status-tag.research { background: #e6f7ff; color: #1890ff; }
.status-tag.development { background: #f6ffed; color: #52c41a; }
.status-tag.prototype { background: #fff2e8; color: #fa8c16; }
.status-tag.commercial { background: #f9f0ff; color: #722ed1; }
.trend-indicator { display: flex; align-items: center; gap: 4px; color: #52c41a; font-weight: 500; }
.action-btns { display: flex; gap: 8px; }
.btn-icon {
  width: 32px; height: 32px; border-radius: 4px; border: 1px solid #d9d9d9;
  background: #fff; color: #666; cursor: pointer; display: flex;
  align-items: center; justify-content: center; transition: all 0.3s;
}
.btn-icon:hover { border-color: #1890ff; color: #1890ff; background: #f0f5ff; }
.pagination { display: flex; justify-content: flex-end; align-items: center; gap: 8px; padding: 16px 20px; border-top: 1px solid #f0f0f0; }
.page-btn {
  min-width: 32px; height: 32px; padding: 0 8px; border: 1px solid #d9d9d9;
  background: #fff; border-radius: 4px; font-size: 13px; color: #666;
  cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s;
}
.page-btn:hover { border-color: #1890ff; color: #1890ff; }
.page-btn.active { background: #1890ff; color: #fff; border-color: #1890ff; }
.page-btn:disabled { color: #bfbfbf; cursor: not-allowed; }

/* 右侧面板 */
.panel-card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.panel-card-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 16px; padding-left: 12px; border-left: 3px solid #1890ff; }
.tech-detail-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
.tech-detail-item:last-child { border-bottom: none; }
.tech-detail-label { color: #999; }
.tech-detail-value { color: #333; font-weight: 500; }
.detail-action-btns { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
.btn-full {
  width: 100%; height: 36px; border-radius: 4px; font-size: 13px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.3s;
}
.btn-primary-full { background: #1890ff; color: #fff; border: none; }
.btn-primary-full:hover { background: #40a9ff; }
.btn-secondary-full { background: #fff; color: #666; border: 1px solid #d9d9d9; }
.btn-secondary-full:hover { border-color: #1890ff; color: #1890ff; }
.no-selection-tip { text-align: center; padding: 40px 20px; color: #999; }
.no-selection-tip i { font-size: 48px; margin-bottom: 12px; color: #d9d9d9; }
.stats-row { display: flex; gap: 12px; margin-bottom: 16px; }
.stat-box { flex: 1; background: #f8fafc; border-radius: 6px; padding: 12px; text-align: center; }
.stat-box-value { font-size: 20px; font-weight: 600; color: #1890ff; }
.stat-box-label { font-size: 12px; color: #999; margin-top: 4px; }
.mini-line-chart { display: flex; align-items: flex-end; gap: 8px; height: 100%; }
.mini-bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.5s; }

/* 趋势分析 */
.trend-analysis-container { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.trend-panel-card {
  background: #fff; border-radius: 8px; padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow-y: auto;
}
.trend-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.trend-section-title { font-size: 18px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 10px; margin: 0; }
.trend-section-title i { color: #1890ff; }
.trend-filter-tabs { display: flex; gap: 8px; }
.trend-tab {
  padding: 6px 14px; border: 1px solid #e5e7eb; background: #fff;
  border-radius: 20px; font-size: 13px; color: #6b7280; cursor: pointer; transition: all 0.2s;
}
.trend-tab:hover { border-color: #1890ff; color: #1890ff; }
.trend-tab.active { background: #1890ff; border-color: #1890ff; color: #fff; }

.trend-tech-list { display: flex; flex-direction: column; gap: 12px; }
.trend-tech-item {
  display: flex; align-items: center; gap: 16px; padding: 16px;
  background: #f8fafc; border-radius: 10px; transition: all 0.2s; cursor: pointer;
}
.trend-tech-item:hover { background: #e6f7ff; transform: translateX(4px); }
.trend-tech-item.tag-highlighted {
  background: #e6f7ff !important;
  box-shadow: inset 0 0 0 2px #1890ff, 0 4px 12px rgba(24,144,255,0.15);
}
.trend-rank {
  width: 32px; height: 32px; border-radius: 50%; background: #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 600; color: #6b7280; flex-shrink: 0;
}
.trend-rank.rank-1 { background: linear-gradient(135deg, #ffd700, #ffb800); color: #fff; }
.trend-rank.rank-2 { background: linear-gradient(135deg, #c0c0c0, #a0a0a0); color: #fff; }
.trend-rank.rank-3 { background: linear-gradient(135deg, #cd7f32, #b87333); color: #fff; }
.trend-tech-info { flex: 1; min-width: 0; }
.trend-tech-name { font-size: 15px; font-weight: 600; color: #1f2937; margin-bottom: 6px; }
.trend-tech-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
.trend-tech-desc {
  font-size: 12px; color: #6b7280; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
  -webkit-box-orient: vertical; box-orient: vertical; overflow: hidden;
}
.tech-tag-small { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; }
.tech-tag-small.ai { background: #e6f7ff; color: #1890ff; }
.tech-tag-small.energy { background: #f6ffed; color: #52c41a; }
.tech-tag-small.bio { background: #f9f0ff; color: #722ed1; }
.tech-tag-small.quantum { background: #fff7e6; color: #fa8c16; }
.tech-tag-small.comm { background: #e6fffb; color: #13c2c2; }
.tech-tag-small.trend { background: linear-gradient(135deg, #1890ff, #36cfc9); color: #fff; }
.tech-tag-small.disruptive { background: linear-gradient(135deg, #f5222d, #ff7875); color: #fff; }
.tech-tag-small.frontier { background: linear-gradient(135deg, #722ed1, #b37feb); color: #fff; }
.tech-tag-small.active-filter { box-shadow: 0 0 0 2px #fff, 0 0 0 4px currentColor; }
.trend-tech-heat { width: 120px; flex-shrink: 0; }
.heat-bar { height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; margin-bottom: 4px; }
.heat-fill { height: 100%; background: linear-gradient(90deg, #1890ff, #52c41a); border-radius: 3px; transition: width 0.3s; }
.heat-value { font-size: 12px; color: #1890ff; font-weight: 600; }
.trend-tech-metrics { display: flex; gap: 20px; flex-shrink: 0; padding: 0 16px; }
.trend-tech-metrics .metric-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.trend-tech-metrics .metric-label { font-size: 11px; color: #9ca3af; }
.trend-tech-metrics .metric-value { font-size: 13px; font-weight: 600; }
.metric-value.maturity { padding: 2px 8px; border-radius: 10px; font-size: 11px; }
.metric-value.maturity.research { background: #f0f5ff; color: #2f54eb; }
.metric-value.maturity.prototype { background: #fff7e6; color: #fa8c16; }
.metric-value.maturity.development { background: #e6fffb; color: #13c2c2; }
.metric-value.maturity.commercial { background: #f6ffed; color: #52c41a; }
.metric-value.investment { color: #722ed1; }
.trend-tech-growth {
  font-size: 13px; font-weight: 600; color: #52c41a;
  flex-shrink: 0; min-width: 60px; text-align: right; cursor: help;
  position: relative; padding: 4px 8px; border-radius: 6px; transition: background 0.2s;
}
.trend-tech-growth:hover { background: #f6ffed; }
.trend-tech-growth::before {
  content: attr(data-tooltip); position: absolute; bottom: 100%; right: 0;
  background: rgba(0,0,0,0.85); color: #fff; padding: 10px 14px; border-radius: 8px;
  font-size: 12px; font-weight: normal; white-space: nowrap; z-index: 100;
  opacity: 0; visibility: hidden; transition: all 0.2s; margin-bottom: 8px;
  line-height: 1.5; max-width: 280px; white-space: normal;
}
.trend-tech-growth:hover::before { opacity: 1; visibility: visible; }

/* 图表切换 */
.chart-tabs { display: flex; gap: 8px; margin-bottom: 16px; background: #f5f7fa; padding: 4px; border-radius: 8px; }
.chart-tab {
  flex: 1; padding: 8px 12px; border: none; background: transparent;
  border-radius: 6px; font-size: 13px; color: #666; cursor: pointer;
  transition: all 0.2s; font-weight: 500;
}
.chart-tab:hover { background: rgba(255,255,255,0.5); }
.chart-tab.active { background: #fff; color: #1890ff; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
.tech-chart-container { height: 280px; margin-bottom: 16px; position: relative; }

/* CSS 柱状图 */
.css-bar-chart { display: flex; flex-direction: column; gap: 10px; max-height: 280px; overflow-y: auto; }
.css-bar-row { display: flex; align-items: center; gap: 8px; }
.css-bar-label { width: 100px; font-size: 12px; color: #4b5563; text-align: right; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.css-bar-track { flex: 1; height: 24px; background: #f0f0f0; border-radius: 4px; position: relative; overflow: hidden; }
.css-bar-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; transition: width 0.5s; min-width: 40px; }
.css-bar-value { font-size: 11px; color: #fff; font-weight: 600; white-space: nowrap; }

/* CSS 折线图（简化为双条对比） */
.css-line-chart { display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; }
.css-line-row { display: flex; align-items: center; gap: 8px; }
.css-line-fill-1 { height: 8px; background: #1890ff; border-radius: 4px; transition: width 0.5s; min-width: 20px; }
.css-line-fill-2 { height: 8px; background: #52c41a; border-radius: 4px; transition: width 0.5s; min-width: 20px; margin-top: 2px; }
.css-line-val1 { font-size: 11px; color: #1890ff; font-weight: 600; min-width: 40px; }
.css-line-val2 { font-size: 11px; color: #52c41a; font-weight: 600; min-width: 40px; }

/* 图例 */
.tech-legend { display: flex; flex-wrap: wrap; gap: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.legend-row { display: flex; align-items: center; gap: 6px; }
.legend-color { width: 12px; height: 12px; border-radius: 2px; }
.legend-text { font-size: 12px; color: #666; }

/* 标签云 */
.tech-tag-cloud { display: flex; flex-wrap: wrap; gap: 10px; padding: 10px 0; }
.tag-cloud-item { padding: 6px 14px; background: #f8fafc; border-radius: 20px; font-weight: 500; transition: all 0.2s; cursor: pointer; }
.tag-cloud-item:hover { background: #e6f7ff; transform: scale(1.05); }
.tag-cloud-item.size-xl { font-size: 18px; }
.tag-cloud-item.size-lg { font-size: 16px; }
.tag-cloud-item.size-md { font-size: 14px; }
.tag-cloud-item.size-sm { font-size: 13px; }
.tag-cloud-item.size-xs { font-size: 12px; }

/* 领域分布 */
.trend-chart-section { margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
.trend-chart-title { font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 16px; }
.field-distribution { display: flex; flex-direction: column; gap: 12px; }
.field-item { display: flex; align-items: center; gap: 12px; }
.field-name { width: 80px; font-size: 13px; color: #4b5563; flex-shrink: 0; }
.field-bar { flex: 1; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
.field-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
.field-percent { width: 40px; font-size: 13px; font-weight: 600; color: #1f2937; text-align: right; flex-shrink: 0; }

/* 类别筛选 */
.category-checkbox {
  display: inline-flex; align-items: center; padding: 4px 12px;
  border-radius: 16px; font-size: 12px; cursor: pointer;
  transition: all 0.2s; border: 1px solid #d9d9d9; background: #fff;
}
.category-checkbox:hover { border-color: #1890ff; }
.category-checkbox.active { background: #e6f7ff; border-color: #1890ff; color: #1890ff; }
.category-checkbox.active .checkbox-label::before { content: '✓ '; }

/* 弹窗通用 */
.advanced-filter-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.advanced-filter-content { background: #fff; border-radius: 12px; width: 800px; max-width: 90%; max-height: 85vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.advanced-filter-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #e8e8e8; }
.advanced-filter-header h3 { font-size: 18px; font-weight: 600; color: #333; }
.advanced-filter-close { width: 32px; height: 32px; border: none; background: #f5f5f5; border-radius: 6px; cursor: pointer; color: #666; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
.advanced-filter-close:hover { background: #e8e8e8; color: #333; }
.advanced-filter-body { padding: 24px; }
.filter-section { margin-bottom: 24px; }
.filter-section:last-child { margin-bottom: 0; }
.filter-section-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
.filter-section-title i { color: #1890ff; }
.filter-options { display: flex; flex-wrap: wrap; gap: 10px; }
.filter-option { padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 14px; color: #666; transition: all 0.3s; }
.filter-option:hover { border-color: #1890ff; color: #1890ff; }
.filter-option.active { background: #1890ff; border-color: #1890ff; color: #fff; }
.filter-range { display: flex; align-items: center; gap: 12px; }
.filter-range-input { flex: 1; padding: 10px 14px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; outline: none; transition: all 0.3s; }
.filter-range-input:focus { border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.filter-range-separator { color: #999; font-size: 14px; }
.filter-checkbox-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.filter-checkbox-item { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border: 1px solid #e8e8e8; border-radius: 6px; cursor: pointer; transition: all 0.3s; }
.filter-checkbox-item:hover { border-color: #1890ff; background: #f0f5ff; }
.filter-checkbox-item input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; accent-color: #1890ff; }
.filter-date-range { display: flex; align-items: center; gap: 12px; }
.filter-date-input { padding: 10px 14px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; outline: none; transition: all 0.3s; }
.filter-date-input:focus { border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.advanced-filter-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-top: 1px solid #e8e8e8; background: #fafafa; border-radius: 0 0 12px 12px; }
.advanced-filter-selected { font-size: 14px; color: #666; }
.advanced-filter-selected strong { color: #1890ff; }
.advanced-filter-actions { display: flex; gap: 12px; }
.btn-filter-reset { padding: 10px 20px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; color: #666; font-size: 14px; cursor: pointer; transition: all 0.3s; }
.btn-filter-reset:hover { border-color: #1890ff; color: #1890ff; }
.btn-filter-apply { padding: 10px 24px; border: none; border-radius: 6px; background: #1890ff; color: #fff; font-size: 14px; cursor: pointer; transition: all 0.3s; }
.btn-filter-apply:hover { background: #40a9ff; }
.filter-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.filter-tag { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: #f0f5ff; border: 1px solid #91d5ff; border-radius: 4px; font-size: 13px; color: #1890ff; }
.filter-tag-remove { cursor: pointer; opacity: 0.7; transition: opacity 0.3s; }
.filter-tag-remove:hover { opacity: 1; }

/* 前沿高级筛选弹窗 */
.filter-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.filter-modal { background: #fff; border-radius: 8px; width: 600px; max-height: 80vh; overflow-y: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.filter-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.filter-modal-title { font-size: 16px; font-weight: 600; color: #333; }
.filter-modal-close { width: 32px; height: 32px; border: none; background: transparent; color: #999; cursor: pointer; font-size: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.filter-modal-close:hover { background: #f5f5f5; color: #666; }
.filter-modal-body { padding: 24px; }
.checkbox-group { display: flex; flex-wrap: wrap; gap: 12px; }
.checkbox-item { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: pointer; transition: all 0.3s; font-size: 13px; color: #666; }
.checkbox-item:hover { background: #e6f7ff; color: #1890ff; }
.checkbox-item.active { background: #e6f7ff; color: #1890ff; border: 1px solid #1890ff; }
.filter-modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid #f0f0f0; background: #fafafa; }
.btn-modal { height: 36px; padding: 0 20px; border-radius: 4px; font-size: 14px; cursor: pointer; transition: all 0.3s; }
.btn-modal-cancel { background: #fff; border: 1px solid #d9d9d9; color: #666; }
.btn-modal-cancel:hover { border-color: #1890ff; color: #1890ff; }
.btn-modal-confirm { background: #1890ff; border: none; color: #fff; }
.btn-modal-confirm:hover { background: #40a9ff; }

/* 关联分析弹窗 */
.relation-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 1100; display: flex; align-items: center; justify-content: center; padding: 20px; }
.relation-modal { background: #fff; border-radius: 12px; width: 100%; max-width: 1100px; max-height: 90vh; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; }
.relation-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); color: #fff; }
.relation-modal-title { font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
.relation-modal-title i { font-size: 20px; }
.relation-modal-close { width: 36px; height: 36px; border: none; background: rgba(255,255,255,0.2); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s; }
.relation-modal-close:hover { background: rgba(255,255,255,0.3); transform: rotate(90deg); }
.relation-modal-body { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
.relation-network-section { background: #f8fafc; border-radius: 10px; padding: 16px; border: 1px solid #e2e8f0; }
.network-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
.network-title { font-size: 15px; font-weight: 600; color: #1e293b; }
.network-legend { display: flex; gap: 16px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; }
.legend-dot.core { background: #1890ff; }
.legend-dot.entity { background: #52c41a; }
.legend-dot.tech { background: #fa8c16; }
.legend-dot.application { background: #722ed1; }
.network-canvas-container { position: relative; height: 400px; background: #fff; border-radius: 8px; overflow: hidden; }
.network-canvas-container canvas { width: 100%; height: 100%; cursor: grab; }
.network-tooltip { position: absolute; background: rgba(0,0,0,0.85); color: #fff; padding: 10px 14px; border-radius: 6px; font-size: 13px; pointer-events: none; opacity: 0; transition: opacity 0.2s; z-index: 10; max-width: 280px; }
.network-tooltip.visible { opacity: 1; }
.tooltip-title { font-weight: 600; margin-bottom: 4px; color: #fff; }
.tooltip-type { font-size: 11px; color: #aaa; margin-bottom: 6px; }
.tooltip-desc { color: #ddd; line-height: 1.5; }
.network-hint { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: #fff; padding: 6px 14px; border-radius: 20px; font-size: 12px; display: flex; align-items: center; gap: 6px; pointer-events: none; }

.relation-details-section { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.relation-detail-card { background: #fff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; }
.detail-card-header { display: flex; align-items: center; gap: 8px; padding: 14px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; font-size: 14px; color: #1e293b; }
.detail-card-header i { color: #1890ff; }
.relation-count { margin-left: auto; background: #1890ff; color: #fff; font-size: 12px; font-weight: 600; padding: 2px 10px; border-radius: 12px; }
.detail-card-content { padding: 12px; max-height: 200px; overflow-y: auto; }
.relation-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; background: #f8fafc; transition: all 0.2s; cursor: pointer; }
.relation-item:hover { background: #e6f7ff; transform: translateX(4px); }
.relation-item:last-child { margin-bottom: 0; }
.relation-item-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.relation-item-icon.entity { background: #f6ffed; color: #52c41a; }
.relation-item-icon.tech { background: #fff7e6; color: #fa8c16; }
.relation-item-icon.application { background: #f9f0ff; color: #722ed1; }
.relation-item-info { flex: 1; min-width: 0; }
.relation-item-name { font-size: 13px; font-weight: 500; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.relation-item-desc { font-size: 11px; color: #64748b; margin-top: 2px; }
.relation-item-strength { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px; }
.strength-strong { background: #ff4d4f; color: #fff; }
.strength-medium { background: #faad14; color: #fff; }
.strength-weak { background: #d9d9d9; color: #666; }
.relation-modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid #f0f0f0; background: #fafafa; }
.btn-modal-secondary { background: #fff; border: 1px solid #d9d9d9; color: #666; }
.btn-modal-secondary:hover { border-color: #1890ff; color: #1890ff; }
.btn-modal-primary { background: #1890ff; border: 1px solid #1890ff; color: #fff; }
.btn-modal-primary:hover { background: #40a9ff; border-color: #40a9ff; }

/* 节点详情面板 */
.node-detail-panel { position: fixed; top: 50%; right: 0; transform: translateY(-50%); width: 380px; max-height: 85vh; background: #fff; border-radius: 12px 0 0 12px; box-shadow: -4px 0 20px rgba(0,0,0,0.15); z-index: 1200; display: flex; flex-direction: column; }
.node-detail-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); color: #fff; border-radius: 12px 0 0 0; }
.node-detail-title { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; flex: 1; }
.node-type-badge { font-size: 11px; padding: 3px 10px; border-radius: 12px; background: rgba(255,255,255,0.25); font-weight: 500; }
.node-detail-close { width: 32px; height: 32px; border: none; background: rgba(255,255,255,0.2); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.2s; }
.node-detail-close:hover { background: rgba(255,255,255,0.3); transform: rotate(90deg); }
.node-detail-body { flex: 1; overflow-y: auto; padding: 16px; }
.detail-section { margin-bottom: 20px; }
.detail-section:last-child { margin-bottom: 0; }
.detail-section-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; }
.detail-section-title i { color: #1890ff; }
.case-item { background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 10px; border-left: 3px solid #1890ff; }
.case-item:last-child { margin-bottom: 0; }
.case-title { font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
.case-desc { font-size: 12px; color: #64748b; line-height: 1.5; }
.case-meta { display: flex; gap: 12px; margin-top: 8px; font-size: 11px; color: #94a3b8; }
.case-meta span { display: flex; align-items: center; gap: 4px; }
.analysis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.analysis-item { background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center; }
.analysis-label { font-size: 11px; color: #64748b; margin-bottom: 6px; }
.analysis-value { font-size: 16px; font-weight: 600; color: #1890ff; }
.company-list { display: flex; flex-wrap: wrap; gap: 6px; }
.company-tag { font-size: 11px; padding: 4px 10px; background: #e6f7ff; color: #1890ff; border-radius: 12px; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.stats-item { background: #f8fafc; border-radius: 8px; padding: 12px 8px; text-align: center; }
.stats-value { font-size: 18px; font-weight: 700; color: #1890ff; margin-bottom: 4px; }
.stats-label { font-size: 11px; color: #64748b; }
.suggestion-box { background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%); border-radius: 8px; padding: 14px; margin-top: 12px; border: 1px solid #b7eb8f; }
.suggestion-title { font-size: 12px; font-weight: 600; color: #389e0d; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.suggestion-content { font-size: 12px; color: #52c41a; line-height: 1.6; }

/* Toast */
.toast-container { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
.toast-item {
  padding: 10px 20px; border-radius: 6px; font-size: 14px; display: flex;
  align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: toastIn 0.3s ease;
}
.toast-success { background: #f6ffed; border: 1px solid #b7eb8f; color: #389e0d; }
.toast-error { background: #fff2f0; border: 1px solid #ffccc7; color: #cf1322; }
.toast-info { background: #e6f7ff; border: 1px solid #91d5ff; color: #1890ff; }
@keyframes toastIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
</style>
