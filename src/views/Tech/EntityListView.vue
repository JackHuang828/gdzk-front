<script setup>
// 科技实体清单（1.1.1）：技术研判服务 → 研究需求分析。
// 1:1 还原 HTML 原型：搜索 + 多维度筛选 + 可视化图表 + 网格/列表视图 + 分页 + 弹窗。
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ---- 数据源（与 HTML 原型 entitySearchIndex 一致）----
const ENTITY_DATA = [
  { name: '中国科学院', avatar: '中', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', field: '人工智能', region: '北京', score: 95, tags: ['人工智能', '量子计算'], type: '科研机构', intro: '中国自然科学最高学术机构，在基础科学研究、前沿技术探索等领域具有国际领先水平，拥有100多家科研院所。', location: '北京 - 海淀' },
  { name: '华为技术有限公司', avatar: '华', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', field: '通信技术', region: '广东', score: 98, tags: ['5G通信', '芯片制造'], type: '企业', intro: '全球领先的ICT基础设施和智能终端提供商，在5G通信、芯片设计、云计算等领域具有核心技术优势，年研发投入超千亿元。', location: '广东 - 深圳' },
  { name: '清华大学', avatar: '清', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', field: '人工智能', region: '北京', score: 92, tags: ['人工智能', '深度学习'], type: '高校', intro: '中国顶尖高等学府，在计算机科学、人工智能、信息技术等领域培养了大量顶尖人才，科研成果丰硕，产学研结合紧密。', location: '北京 - 海淀' },
  { name: '具身智能', avatar: '具', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', field: '人工智能', region: '广东', score: 88, tags: ['人工智能', '机器人'], type: '技术', intro: '融合人工智能、机器人与环境感知能力的前沿技术方向，面向复杂场景的自主交互与任务执行。', location: '广东 - 深圳' },
  { name: '具身智能科研团队', avatar: '团', avatarColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', avatarColorText: '#333', field: '人工智能', region: '广东', score: 90, tags: ['具身智能', '机器人'], type: '人才/团队', intro: '围绕智能感知、认知决策与运动控制开展协同研究的具身智能科研团队。', location: '广东 - 深圳' },
  { name: '比亚迪', avatar: '比', avatarColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', avatarColorText: '#333', field: '新能源', region: '广东', score: 91, tags: ['动力电池', '储能技术'], type: '企业', intro: '全球领先的新能源汽车制造商，在电池技术、电动汽车、轨道交通等领域具有核心技术和产业链优势，销量全球领先。', location: '广东 - 深圳' },
  { name: '人形机器人', avatar: '人', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', field: '人工智能', region: '广东', score: 86, tags: ['人工智能', '机器人'], type: '技术', intro: '面向制造、服务与特种作业场景的人形机器人关键技术方向。', location: '广东 - 深圳' },
  { name: '深圳湾实验室', avatar: '湾', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', field: '人工智能', region: '广东', score: 89, tags: ['人工智能', '生物医药'], type: '科研机构', intro: '面向前沿科学与产业关键问题开展交叉研究的科研机构。', location: '广东 - 深圳' },
  { name: '南方科技大学', avatar: '南', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', field: '人工智能', region: '广东', score: 87, tags: ['人工智能', '半导体'], type: '高校', intro: '聚焦基础研究与新兴技术人才培养的高水平研究型大学。', location: '广东 - 深圳' },
  { name: '王海峰', avatar: '王', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', field: '人工智能', region: '广东', score: 85, tags: ['人工智能', '机器人'], type: '人才', intro: '人工智能与机器人领域专家，长期从事智能感知与自主系统研究。', location: '广东 - 深圳' }
];

const DETAIL_DATA = {
  '中国科学院': { avatar: '中', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', location: '北京 - 海淀', score: '95', type: '科研院所', description: '中国科学院成立于1949年，是中国自然科学最高学术机构、科学技术最高咨询机构、自然科学与高技术综合研究发展中心。', tags: ['人工智能', '量子计算', '生物医学', '新材料'], patents: '12,580', papers: '45,230', projects: '1,256', awards: '328', achievements: ['量子通信技术突破', '人工智能芯片研发', '深海探测装备研制', '空间站核心舱技术'] },
  '华为技术有限公司': { avatar: '华', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', location: '广东 - 深圳', score: '98', type: '企业', description: '华为是全球领先的ICT基础设施和智能终端提供商，致力于把数字世界带入每个人、每个家庭、每个组织。', tags: ['5G/6G', '半导体', '云计算', '人工智能'], patents: '85,600', papers: '12,450', projects: '3,890', awards: '520', achievements: ['5G基站技术', '鸿蒙操作系统', '麒麟芯片系列', '云计算基础设施'] },
  '清华大学': { avatar: '清', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', location: '北京 - 海淀', score: '92', type: '高等院校', description: '清华大学是中国著名高等学府，是国家"985工程"和"211工程"重点建设高校，在工程技术领域具有突出优势。', tags: ['人工智能', '类脑计算', '新能源', '纳米技术'], patents: '8,920', papers: '38,650', projects: '2,340', awards: '256', achievements: ['类脑计算芯片', '高温气冷堆技术', '人工智能开放平台', '新能源汽车技术'] },
  '具身智能': { avatar: '具', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', location: '广东 - 深圳', score: '88', type: '前沿技术', description: '融合人工智能、机器人与环境感知能力的前沿技术方向，面向复杂场景的自主交互与任务执行。', tags: ['人工智能', '机器人', '环境感知', '自主决策'], patents: '1,250', papers: '890', projects: '320', awards: '45', achievements: ['多模态感知融合', '自主导航算法', '灵巧操作技术', '人机交互框架'] },
  '具身智能科研团队': { avatar: '团', avatarColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', avatarColorText: '#333', location: '广东 - 深圳', score: '90', type: '科研团队', description: '围绕智能感知、认知决策与运动控制开展协同研究的具身智能科研团队。', tags: ['具身智能', '机器人', '智能感知', '运动控制'], patents: '680', papers: '520', projects: '180', awards: '28', achievements: ['智能感知框架', '认知决策引擎', '运动控制算法', '多机器人协同'] },
  '比亚迪': { avatar: '比', avatarColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', avatarColorText: '#333', location: '广东 - 深圳', score: '91', type: '企业', description: '比亚迪是一家致力于"用技术创新，满足人们对美好生活的向往"的高新技术企业，业务涵盖汽车、轨道交通、新能源和电子等领域。', tags: ['新能源', '动力电池', '电动汽车', '储能技术'], patents: '28,600', papers: '3,250', projects: '1,560', awards: '168', achievements: ['刀片电池技术', 'DM-i超级混动', 'e平台3.0', '云轨交通系统'] },
  '人形机器人': { avatar: '人', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', location: '广东 - 深圳', score: '86', type: '前沿技术', description: '面向制造、服务与特种作业场景的人形机器人关键技术方向。', tags: ['人工智能', '机器人', '特种作业', '智能制造'], patents: '920', papers: '650', projects: '240', awards: '32', achievements: ['双足行走算法', '灵巧手设计', '环境感知系统', '人机协作平台'] },
  '深圳湾实验室': { avatar: '湾', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', location: '广东 - 深圳', score: '89', type: '科研机构', description: '面向前沿科学与产业关键问题开展交叉研究的科研机构。', tags: ['人工智能', '生物医药', '交叉研究', '前沿科学'], patents: '1,580', papers: '1,120', projects: '380', awards: '52', achievements: ['AI药物发现平台', '生物影像分析', '智能基因编辑', '跨学科融合框架'] },
  '南方科技大学': { avatar: '南', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', location: '广东 - 深圳', score: '87', type: '高等院校', description: '聚焦基础研究与新兴技术人才培养的高水平研究型大学。', tags: ['人工智能', '半导体', '基础研究', '人才培养'], patents: '2,100', papers: '5,800', projects: '680', awards: '78', achievements: ['先进封装技术', 'AI芯片设计', '新材料研究', '量子计算探索'] },
  '王海峰': { avatar: '王', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', location: '广东 - 深圳', score: '85', type: '人才', description: '人工智能与机器人领域专家，长期从事智能感知与自主系统研究。', tags: ['人工智能', '机器人', '智能感知', '自主系统'], patents: '120', papers: '280', projects: '85', awards: '18', achievements: ['多模态感知论文', '自主导航专利', '机器人竞赛奖项', '产学研合作项目'] }
};

const FIELD_OPTIONS = ['通信技术', '人工智能', '新能源', '半导体', '互联网', '无人机'];
const REGION_OPTIONS = ['北京', '上海', '广东', '浙江', '江苏'];
const SCORE_OPTIONS = [{ label: '90-100 分', value: '90-100' }, { label: '80-89 分', value: '80-89' }, { label: '70-79 分', value: '70-79' }, { label: '60-69 分', value: '60-69' }];
const TAG_OPTIONS = ['人工智能', '5G通信', '深度学习', '动力电池', '芯片制造', '云计算', '飞行控制', '储能技术', '语音识别'];

// ---- 筛选状态 ----
const keyword = ref('');
const selectedFields = ref([]);
const selectedRegions = ref([]);
const selectedScores = ref([]);
const selectedTags = ref([]);
const sortMode = ref('default');
const viewMode = ref('grid'); // grid | list

// 多选下拉开关
const openMultiSelect = ref(null); // 'field' | 'region' | 'score' | 'tag' | null

// ---- 模态框状态 ----
const importModalVisible = ref(false);
const editModalVisible = ref(false);
const editEntityName = ref('');
const editRemark = ref('');
const deleteModalVisible = ref(false);
const deleteEntityName = ref('');
const addModalVisible = ref(false);

// Toast
const toastVisible = ref(false);
const toastMessage = ref('');
let toastTimer = null;
function showToast(msg) {
  toastMessage.value = msg;
  toastVisible.value = true;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastVisible.value = false; }, 2400);
}

// ---- 筛选逻辑 ----
const filteredEntities = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  return ENTITY_DATA.filter(item => {
    const kwMatch = !kw || item.name.toLowerCase().includes(kw) || item.field.toLowerCase().includes(kw) || item.tags.join('').toLowerCase().includes(kw) || item.type.toLowerCase().includes(kw);
    const fieldMatch = !selectedFields.value.length || selectedFields.value.includes(item.field);
    const regionMatch = !selectedRegions.value.length || selectedRegions.value.includes(item.region);
    const tagMatch = !selectedTags.value.length || selectedTags.value.some(t => item.tags.includes(t));
    const scoreMatch = !selectedScores.value.length || selectedScores.value.some(s => { const [min, max] = s.split('-').map(Number); return item.score >= min && item.score <= max; });
    return kwMatch && fieldMatch && regionMatch && tagMatch && scoreMatch;
  });
});

const sortedEntities = computed(() => {
  const list = [...filteredEntities.value];
  if (sortMode.value === 'score-desc') list.sort((a, b) => b.score - a.score);
  else if (sortMode.value === 'score-asc') list.sort((a, b) => a.score - b.score);
  else if (sortMode.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  return list;
});

const hasFilterCondition = computed(() => Boolean(keyword.value.trim() || selectedFields.value.length || selectedRegions.value.length || selectedScores.value.length || selectedTags.value.length));

const resultsTitle = computed(() => hasFilterCondition.value ? '科技实体搜索结果' : '热门科技实体');

// ---- 选中筛选项展示 ----
const selectedFilterTags = computed(() => {
  const tags = [];
  if (keyword.value.trim()) tags.push({ key: 'keyword', value: `搜索：${keyword.value.trim()}` });
  selectedFields.value.forEach(v => tags.push({ key: 'field', value: v }));
  selectedRegions.value.forEach(v => tags.push({ key: 'region', value: v }));
  selectedScores.value.forEach(v => tags.push({ key: 'score', value: v }));
  selectedTags.value.forEach(v => tags.push({ key: 'tag', value: v }));
  return tags;
});

function removeFilter(key, value) {
  if (key === 'keyword') keyword.value = '';
  else if (key === 'field') selectedFields.value = selectedFields.value.filter(v => v !== value);
  else if (key === 'region') selectedRegions.value = selectedRegions.value.filter(v => v !== value);
  else if (key === 'score') selectedScores.value = selectedScores.value.filter(v => v !== value);
  else if (key === 'tag') selectedTags.value = selectedTags.value.filter(v => v !== value);
}

function resetFilters() {
  keyword.value = '';
  selectedFields.value = [];
  selectedRegions.value = [];
  selectedScores.value = [];
  selectedTags.value = [];
}

// ---- 多选下拉 ----
function toggleMultiSelect(key) {
  openMultiSelect.value = openMultiSelect.value === key ? null : key;
}
function closeMultiSelect() {
  openMultiSelect.value = null;
}
// 注意：模板中 ref 会自动解包，传入的是数组本身（响应式代理），直接原地修改即可触发更新。
function toggleArray(arr, value) {
  const idx = arr.indexOf(value);
  if (idx === -1) arr.push(value);
  else arr.splice(idx, 1);
}
function getMultiSelectLabel(key) {
  const arr = key === 'field' ? selectedFields.value : key === 'region' ? selectedRegions.value : key === 'score' ? selectedScores.value : selectedTags.value;
  const placeholder = key === 'field' ? '全部领域' : key === 'region' ? '全部地区' : key === 'score' ? '全部级别' : '全部方向';
  return arr.length ? `已选 ${arr.length} 项` : placeholder;
}

// ---- 可视化图表 ----
const chartData = computed(() => {
  const items = filteredEntities.value;
  const countBy = key => items.reduce((acc, item) => { acc[item[key]] = (acc[item[key]] || 0) + 1; return acc; }, {});
  const fieldStats = countBy('field');
  const regionStats = countBy('region');

  // 柱状图：领域分布
  const orderedFields = Object.entries(fieldStats).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxField = Math.max(...orderedFields.map(([, c]) => c), 1);
  const barData = orderedFields.map(([name, count]) => ({ name, count, height: Math.max(12, count / maxField * 150) }));

  // 环形图：地区占比
  const regionsWithPercent = Object.entries(regionStats).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count, percent: items.length ? Math.round(count / items.length * 100) : 0 }));
  const donutColors = ['#1677d2', '#52c41a', '#69b1ff', '#91caff', '#b7d7f5'];
  let cursor = 0;
  const donutSegments = regionsWithPercent.map((item, index) => { const next = cursor + item.percent; const seg = `${donutColors[index]} ${cursor}% ${next}%`; cursor = next; return seg; });

  // 热力图：领域-地区交叉
  const heatFields = orderedFields.slice(0, 5).map(([f]) => f);
  const heatRegions = Object.keys(regionStats).slice(0, 5);
  const maxHeat = Math.max(...heatRegions.flatMap(region => heatFields.map(field => items.filter(i => i.region === region && i.field === field).length)), 1);
  const heatData = heatRegions.map(region => ({ region, cells: heatFields.map(field => { const count = items.filter(i => i.region === region && i.field === field).length; return { field, count, alpha: count ? 0.18 + count / maxHeat * 0.72 : 0.06 }; }) }));

  // 创新指数分桶
  const scoreBuckets = [{ label: '60-69分', min: 60, max: 69 }, { label: '70-79分', min: 70, max: 79 }, { label: '80-89分', min: 80, max: 89 }, { label: '90-100分', min: 90, max: 100 }];
  const enterpriseCounts = scoreBuckets.map(b => items.filter(i => i.type === '企业' && i.score >= b.min && i.score <= b.max).length);
  const maxEnterprise = Math.max(...enterpriseCounts, 1);
  const scoreBars = scoreBuckets.map((b, i) => ({ label: b.label, count: enterpriseCounts[i], height: Math.max(12, enterpriseCounts[i] / maxEnterprise * 150) }));

  // 折线图：增长趋势
  const years = ['2021', '2022', '2023', '2024', '2025', '2026'];
  const base = Math.max(items.length - 5, 1);
  const trend = years.map((_, i) => base + i * Math.max(1, Math.round(items.length / 5)));
  const maxTrend = Math.max(...trend, 1);
  const linePoints = trend.map((count, i) => ({ x: 16 + i * 30, y: 138 - count / maxTrend * 100, count, year: years[i] }));

  return { barData, donutSegments, donutTotal: items.length, regionsWithPercent, heatFields, heatData, scoreBars, linePoints };
});

// ---- 分页 ----
const currentPage = ref(1);
const pageSize = ref(20);
const totalPages = 12;

function pickPage(n) {
  if (n === 'prev') currentPage.value = Math.max(1, currentPage.value - 1);
  else if (n === 'next') currentPage.value = Math.min(totalPages, currentPage.value + 1);
  else currentPage.value = n;
}

// ---- 模态框操作 ----
function openDetail(name) {
  router.push({ name: 'entityDetail', params: { name } });
}

function openImportModal() { importModalVisible.value = true; }
function closeImportModal() { importModalVisible.value = false; }
function confirmImport() { showToast('数据导入成功！共导入 15 条记录'); importModalVisible.value = false; }
function downloadTemplate() { showToast('模板下载成功！请按照模板格式填写数据后上传'); }

function openEditModal(name) { editEntityName.value = name; editRemark.value = ''; editModalVisible.value = true; }
function closeEditModal() { editModalVisible.value = false; }
function saveEdit() {
  if (!editRemark.value.trim()) { showToast('请填写评论内容'); return; }
  editModalVisible.value = false;
  showToast(`已为"${editEntityName.value}"添加评论`);
}

function openDeleteModal(name) { deleteEntityName.value = name; deleteModalVisible.value = true; }
function closeDeleteModal() { deleteModalVisible.value = false; }
function confirmDelete() {
  const idx = ENTITY_DATA.findIndex(e => e.name === deleteEntityName.value);
  if (idx !== -1) ENTITY_DATA.splice(idx, 1);
  deleteModalVisible.value = false;
  showToast(`"${deleteEntityName.value}"已删除`);
}

function openAddModal() { addModalVisible.value = true; }
function closeAddModal() { addModalVisible.value = false; }

function exportAnalysisReport() { showToast('正在生成科技创新主体分布报告，请稍候...'); setTimeout(() => showToast('科技创新主体分布报告已导出。'), 1000); }

// 关闭多选下拉
function onDocumentClick() { closeMultiSelect(); }
onMounted(() => document.addEventListener('click', onDocumentClick));
onUnmounted(() => document.removeEventListener('click', onDocumentClick));
</script>

<template>
  <div class="entity-page content_lvl1">
    <!-- 搜索与筛选区 -->
    <div class="search-filter-area">
      <div class="search-row">
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="搜索科技实体名称，支持模糊搜索" v-model="keyword" @keypress.enter="keyword = keyword" />
        </div>
        <button class="btn-primary" style="height:40px;padding:0 22px;" @click="() => {}">搜索</button>
      </div>

      <div class="filter-bar-title" style="margin:2px 0 12px;color:#333;font-size:14px;font-weight:600;"><i class="fas fa-filter" style="color:#1890ff;margin-right:6px;"></i>多维度筛选栏</div>
      <div class="filter-row">
        <!-- 技术领域 -->
        <div class="filter-item" @click.stop="toggleMultiSelect('field')">
          <span class="filter-label-inline">技术领域：</span>
          <div class="multi-select-control" :class="{ open: openMultiSelect === 'field' }">
            <button type="button" class="multi-select-trigger">{{ getMultiSelectLabel('field') }}</button>
            <div class="multi-select-menu" v-show="openMultiSelect === 'field'" @click.stop>
              <label v-for="opt in FIELD_OPTIONS" :key="opt" class="multi-select-option">
                <input type="checkbox" :value="opt" :checked="selectedFields.includes(opt)" @change="toggleArray(selectedFields, opt)" />
                <span>{{ opt }}</span>
              </label>
            </div>
          </div>
        </div>
        <!-- 地区 -->
        <div class="filter-item" @click.stop="toggleMultiSelect('region')">
          <span class="filter-label-inline">地区：</span>
          <div class="multi-select-control" :class="{ open: openMultiSelect === 'region' }">
            <button type="button" class="multi-select-trigger">{{ getMultiSelectLabel('region') }}</button>
            <div class="multi-select-menu" v-show="openMultiSelect === 'region'" @click.stop>
              <label v-for="opt in REGION_OPTIONS" :key="opt" class="multi-select-option">
                <input type="checkbox" :value="opt" :checked="selectedRegions.includes(opt)" @change="toggleArray(selectedRegions, opt)" />
                <span>{{ opt }}</span>
              </label>
            </div>
          </div>
        </div>
        <!-- 创新指数 -->
        <div class="filter-item" @click.stop="toggleMultiSelect('score')">
          <span class="filter-label-inline">创新指数：</span>
          <div class="multi-select-control" :class="{ open: openMultiSelect === 'score' }">
            <button type="button" class="multi-select-trigger">{{ getMultiSelectLabel('score') }}</button>
            <div class="multi-select-menu" v-show="openMultiSelect === 'score'" @click.stop>
              <label v-for="opt in SCORE_OPTIONS" :key="opt.value" class="multi-select-option">
                <input type="checkbox" :value="opt.value" :checked="selectedScores.includes(opt.value)" @change="toggleArray(selectedScores, opt.value)" />
                <span>{{ opt.label }}</span>
              </label>
            </div>
          </div>
        </div>
        <!-- 方向标签 -->
        <div class="filter-item" @click.stop="toggleMultiSelect('tag')">
          <span class="filter-label-inline">方向标签：</span>
          <div class="multi-select-control" :class="{ open: openMultiSelect === 'tag' }">
            <button type="button" class="multi-select-trigger">{{ getMultiSelectLabel('tag') }}</button>
            <div class="multi-select-menu" v-show="openMultiSelect === 'tag'" @click.stop>
              <label v-for="opt in TAG_OPTIONS" :key="opt" class="multi-select-option">
                <input type="checkbox" :value="opt" :checked="selectedTags.includes(opt)" @change="toggleArray(selectedTags, opt)" />
                <span>{{ opt }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="filter-toolbar-actions">
          <button class="btn-reset" style="height: 36px; padding: 0 16px;" @click="resetFilters">重置筛选</button>
          <button class="btn-import" style="height:36px;padding:0 16px;" @click="openImportModal"><i class="fas fa-file-import"></i>批量导入</button>
        </div>
      </div>
      <!-- 选中筛选项 -->
      <div class="selected-filter-tags" v-if="selectedFilterTags.length">
        <span style="font-size:12px;color:#86909c;line-height:28px;">当前筛选：</span>
        <span v-for="tag in selectedFilterTags" :key="tag.key + tag.value" class="selected-filter-tag">
          {{ tag.value }}
          <button @click="removeFilter(tag.key, tag.value)"><i class="fas fa-times"></i></button>
        </span>
      </div>
    </div>

    <!-- 可视化图表区 -->
    <div class="charts-section">
      <div class="analysis-header">
        <div class="section-title" style="margin-bottom: 0;">
          <i class="fas fa-chart-bar" style="color: #1890ff;"></i>
          科技实体可视化分析
        </div>
        <span class="analysis-hint">基于当前检索条件展示</span>
        <button class="analysis-export-btn" type="button" @click="exportAnalysisReport"><i class="fas fa-download"></i> 科技创新主体分布报告导出</button>
      </div>
      <div class="charts-grid">
        <!-- 领域分布柱状图 -->
        <div class="chart-container">
          <div class="chart-title">领域分布柱状图</div>
          <div class="chart-unit">科技实体数量 / 个</div>
          <div class="chart-wrapper">
            <div class="analysis-bars">
              <div v-for="bar in chartData.barData" :key="bar.name" class="analysis-bar-item">
                <b style="display:block;color:#1677d2;margin-bottom:4px;">{{ bar.count }}</b>
                <div class="analysis-bar" :style="{ height: bar.height + 'px' }"></div>
                <span :title="bar.name">{{ bar.name }}</span>
              </div>
              <span v-if="!chartData.barData.length" style="color:#86909c">暂无数据</span>
            </div>
          </div>
        </div>
        <!-- 地区占比饼图 -->
        <div class="chart-container">
          <div class="chart-title">地区占比饼图</div>
          <div class="chart-unit">科技实体占比 / %</div>
          <div class="chart-wrapper">
            <div class="analysis-donut" :style="{ background: chartData.donutSegments.length ? `conic-gradient(${chartData.donutSegments.join(',')})` : '#e5e6eb 0 100%' }">
              <div class="analysis-donut-center"><b>{{ chartData.donutTotal }}</b><span>实体</span></div>
            </div>
            <div style="text-align:center;color:#86909c;font-size:11px;line-height:1.8;">
              {{ chartData.regionsWithPercent.map(r => `${r.name} ${r.percent}%`).join(' · ') }}
            </div>
          </div>
        </div>
        <!-- 领域-地区热力图 -->
        <div class="chart-container">
          <div class="chart-title">领域-地区分布热力图</div>
          <div class="chart-unit">科技实体数量 / 个</div>
          <div class="chart-wrapper" style="min-height: 280px;">
            <div v-if="chartData.heatFields.length && chartData.heatData.length" class="analysis-heatmap" :style="{ gridTemplateColumns: `52px repeat(${chartData.heatFields.length}, minmax(36px, 1fr))` }">
              <span></span>
              <span v-for="f in chartData.heatFields" :key="f" class="analysis-heatmap-label" :title="f">{{ f }}</span>
              <template v-for="row in chartData.heatData" :key="row.region">
                <span class="analysis-heatmap-row-label">{{ row.region }}</span>
                <span v-for="cell in row.cells" :key="cell.field" class="analysis-heatmap-cell" :style="{ background: `rgba(22,119,210,${cell.alpha})` }" :data-tooltip="`${row.region} × ${cell.field}：${cell.count}个`">{{ cell.count }}</span>
              </template>
            </div>
            <div v-else style="text-align:center;padding-top:110px;color:#999;font-size:12px;">暂无数据</div>
            <div class="analysis-legend"><span>少</span><span class="analysis-legend-gradient"></span><span>多</span></div>
          </div>
        </div>
        <!-- 增长趋势折线图 -->
        <div class="chart-container">
          <div class="chart-title">增长趋势折线图</div>
          <div class="chart-unit">科技实体数量 / 个</div>
          <div class="chart-wrapper">
            <div class="analysis-line">
              <svg viewBox="0 0 180 170" preserveAspectRatio="none" style="width:100%;height:100%">
                <line x1="12" y1="140" x2="172" y2="140" stroke="#d9d9d9" />
                <path :d="chartData.linePoints.map((p, i) => (i === 0 ? 'M' : 'L') + ` ${p.x} ${p.y}`).join(' ')" fill="none" stroke="#1677d2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <template v-for="p in chartData.linePoints" :key="p.year">
                  <circle :cx="p.x" :cy="p.y" r="3" fill="#fff" stroke="#1677d2" stroke-width="2" />
                  <text :x="p.x" :y="p.y - 7" text-anchor="middle" fill="#1677d2" font-size="9">{{ p.count }}</text>
                  <text :x="p.x" y="158" text-anchor="middle" fill="#86909c" font-size="8">{{ p.year }}</text>
                </template>
              </svg>
              <div style="text-align:center;color:#86909c;font-size:11px;">科技实体数量</div>
            </div>
          </div>
        </div>
        <!-- 创新指数分桶柱状图 -->
        <div class="chart-container">
          <div class="chart-title">创新指数分桶柱状图</div>
          <div class="chart-unit">企业数量 / 家</div>
          <div class="chart-wrapper" id="scoreBucketChart">
            <div class="analysis-bars score-bucket-bars">
              <div v-for="bar in chartData.scoreBars" :key="bar.label" class="analysis-bar-item">
                <b style="display:block;color:#1677d2;margin-bottom:4px;">{{ bar.count }}</b>
                <div class="analysis-bar" :style="{ height: bar.height + 'px', background: 'linear-gradient(180deg,#95de64,#389e0d)' }"></div>
                <span :title="bar.label">{{ bar.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结果展示区 -->
    <div class="results-area">
      <div class="results-header">
        <div>
          <div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 4px;">{{ resultsTitle }}</div>
          <span class="results-count">共找到 <strong>{{ filteredEntities.length }}</strong> 个科技实体</span>
        </div>
        <div class="results-tools">
          <div class="view-toggle" aria-label="结果展示方式">
            <button class="view-btn" :class="{ active: viewMode === 'grid' }" title="网格视图" @click="viewMode = 'grid'"><i class="fas fa-th-large"></i></button>
            <button class="view-btn" :class="{ active: viewMode === 'list' }" title="列表视图" @click="viewMode = 'list'"><i class="fas fa-list"></i></button>
          </div>
          <select class="page-size" style="height: 32px;" v-model="sortMode">
            <option value="default">默认排序</option>
            <option value="score-desc">创新指数从高到低</option>
            <option value="score-asc">创新指数从低到高</option>
            <option value="name">名称A-Z</option>
          </select>
        </div>
      </div>

      <!-- 网格视图 -->
      <div v-if="filteredEntities.length && viewMode === 'grid'" class="card-grid">
        <div v-for="entity in sortedEntities" :key="entity.name" class="entity-card" @click="openDetail(entity.name)">
          <div class="card-header">
            <div class="entity-avatar" :style="{ background: entity.avatarColor, color: entity.avatarColorText || '#fff' }">{{ entity.avatar }}</div>
            <div class="entity-name">
              <span v-if="entity.type" class="entity-type-tag">{{ entity.type }}</span>
              {{ entity.name }}
            </div>
          </div>
          <div class="card-tags">
            <span class="card-tag primary">{{ entity.tags[0] }}</span>
            <span v-if="entity.tags[1]" class="card-tag">{{ entity.tags[1] }}</span>
          </div>
          <div class="card-intro">{{ entity.intro }}</div>
          <div class="progress-section">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="progress-label">创新指数</span>
              <span class="progress-value">{{ entity.score }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: entity.score + '%' }"></div>
            </div>
          </div>
          <div class="card-location"><i class="fas fa-map-marker-alt"></i>{{ entity.location }}</div>
          <div class="card-actions">
            <span class="btn-detail" @click.stop="openDetail(entity.name)">查看详情</span>
            <div class="action-btns">
              <button class="action-btn" title="编辑评论" @click.stop="openEditModal(entity.name)">编辑</button>
              <button class="action-btn delete" title="删除" @click.stop="openDeleteModal(entity.name)"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- 列表视图 -->
      <div v-if="filteredEntities.length && viewMode === 'list'" class="list-view active">
        <table class="list-table">
          <thead>
            <tr>
              <th>实体名称</th>
              <th>简介</th>
              <th>技术领域</th>
              <th>地区</th>
              <th>创新指数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entity in sortedEntities" :key="entity.name">
              <td><span class="list-entity-type" v-if="entity.type">{{ entity.type }}</span><span class="list-entity-name" @click="openDetail(entity.name)">{{ entity.name }}</span></td>
              <td style="max-width: 300px; font-size: 13px; color: #666;">{{ entity.intro }}</td>
              <td>{{ entity.tags.join('、') }}</td>
              <td>{{ entity.location }}</td>
              <td>
                <div class="list-progress">
                  <div class="list-progress-bar"><div class="list-progress-fill" :style="{ width: entity.score + '%' }"></div></div>
                  <span>{{ entity.score }}</span>
                </div>
              </td>
              <td>
                <div class="list-actions">
                  <button class="list-action-btn primary" @click="openDetail(entity.name)">查看详情</button>
                  <button class="list-action-btn" @click="openEditModal(entity.name)">添加评论</button>
                  <button class="list-action-btn danger" @click="openDeleteModal(entity.name)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 空结果 -->
      <div v-if="!filteredEntities.length" class="empty-results" style="display:block;">
        <i class="fas fa-search"></i>
        <p>暂无符合条件的科技实体</p>
        <button class="btn-reset" style="padding: 0 16px;" @click="resetFilters">清除筛选</button>
      </div>

      <!-- 分页 -->
      <div v-if="filteredEntities.length" class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="pickPage('prev')"><i class="fas fa-chevron-left"></i></button>
        <button class="page-btn" :class="{ active: currentPage === 1 }" @click="pickPage(1)">1</button>
        <button class="page-btn" :class="{ active: currentPage === 2 }" @click="pickPage(2)">2</button>
        <button class="page-btn" :class="{ active: currentPage === 3 }" @click="pickPage(3)">3</button>
        <button class="page-btn" :class="{ active: currentPage === 4 }" @click="pickPage(4)">4</button>
        <span class="page-ellipsis">...</span>
        <button class="page-btn" :class="{ active: currentPage === 12 }" @click="pickPage(12)">12</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="pickPage('next')"><i class="fas fa-chevron-right"></i></button>
        <select class="page-size" v-model="pageSize">
          <option :value="10">每页 10 条</option>
          <option :value="20">每页 20 条</option>
          <option :value="50">每页 50 条</option>
        </select>
      </div>
    </div>

    <!-- 批量导入模态框 -->
    <div v-if="importModalVisible" class="modal-overlay active" @click.self="closeImportModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">批量导入科技实体</h3>
          <span class="modal-close" @click="closeImportModal">&times;</span>
        </div>
        <div class="template-download-area">
          <div class="template-info">
            <i class="fas fa-file-excel" style="color: #52c41a; font-size: 24px;"></i>
            <div class="template-text">
              <div class="template-title">下载导入模板</div>
              <div class="template-desc">请使用标准模板格式填写数据，确保导入成功</div>
            </div>
          </div>
          <button class="btn-download-template" @click="downloadTemplate"><i class="fas fa-download"></i> 下载模板</button>
        </div>
        <div class="upload-area">
          <div class="upload-icon"><i class="fas fa-cloud-upload-alt"></i></div>
          <div class="upload-text">点击或拖拽文件到此处上传</div>
          <div class="upload-hint">支持 Excel 格式 (.xlsx, .xls)，文件大小不超过 10MB</div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeImportModal">取消</button>
          <button class="btn-confirm" @click="confirmImport">开始导入</button>
        </div>
      </div>
    </div>

    <!-- 添加评论弹窗 -->
    <div v-if="editModalVisible" class="modal-overlay active" @click.self="closeEditModal">
      <div class="modal-content entity-operation-modal">
        <div class="modal-header"><h3 class="modal-title">添加实体评论</h3><span class="modal-close" @click="closeEditModal">&times;</span></div>
        <div class="modal-body">
          <div class="operation-field"><label>科技实体</label><input type="text" readonly :value="editEntityName"></div>
          <div class="operation-field"><label>评论内容 <span style="color:#f53f3f;">*</span></label><textarea v-model="editRemark" placeholder="请输入您对该企业的评论"></textarea></div>
        </div>
        <div class="modal-footer"><button class="btn-cancel" @click="closeEditModal">取消</button><button class="btn-confirm" @click="saveEdit">提交评论</button></div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="deleteModalVisible" class="modal-overlay active" @click.self="closeDeleteModal">
      <div class="modal-content entity-operation-modal">
        <div class="modal-header"><h3 class="modal-title">删除科技实体</h3><span class="modal-close" @click="closeDeleteModal">&times;</span></div>
        <div class="modal-body">
          <div class="delete-confirm-content">
            <div class="delete-confirm-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <div>确定删除"<strong>{{ deleteEntityName }}</strong>"吗？<br><span style="color:#86909c;font-size:13px;">删除后将无法恢复，请谨慎操作。</span></div>
          </div>
        </div>
        <div class="modal-footer"><button class="btn-cancel" @click="closeDeleteModal">取消</button><button class="btn-danger" @click="confirmDelete">确认删除</button></div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastVisible" class="entity-toast">{{ toastMessage }}</div>
  </div>
</template>

<style scoped>
.entity-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #d8e7fc;}

.search-filter-area { position: relative; z-index: 10; background: #fff; border-radius: 4px; padding: 20px 20px 16px; margin-bottom: 20px; }
.search-row { display: flex; gap: 12px; align-items: center; margin-bottom: 20px; }
.search-input-wrapper { position: relative; flex: 1; }
.search-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 14px; }
.search-input:focus { outline: none; border-color: #1890ff; }

.filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; min-height: 40px; }
.filter-toolbar-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.filter-item { display: flex; align-items: center; gap: 8px; }
.filter-label-inline { font-size: 13px; color: #666; white-space: nowrap; }
.multi-select-control { position: relative; min-width: 150px; }
.multi-select-trigger { width: 100%; height: 36px; padding: 0 28px 0 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: #fff; color: #4e5969; text-align: left; cursor: pointer; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; position: relative; }
.multi-select-trigger::after { content: '\f107'; font-family: 'Font Awesome 5 Free'; font-weight: 900; position: absolute; right: 10px; color: #86909c; }
.multi-select-menu { position: absolute; top: 42px; left: 0; z-index: 100; width: 210px; max-height: 260px; overflow: auto; padding: 8px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; box-shadow: 0 8px 20px rgba(0,0,0,.14); }
.multi-select-option { display: flex; align-items: center; gap: 8px; min-height: 32px; padding: 7px 8px; color: #4e5969; font-size: 13px; cursor: pointer; }
.multi-select-option:hover { background: #f2f7ff; }

.selected-filter-tags { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; min-height: 48px; margin-top: 16px; padding: 10px 12px; border-top: 1px solid #f0f0f0; background: #fafcff; }
.selected-filter-tag { display: inline-flex; align-items: center; gap: 7px; min-height: 26px; padding: 4px 9px; border: 1px solid #cfe2ff; border-radius: 14px; background: #edf5ff; color: #1677d2; font-size: 12px; line-height: 18px; }
.selected-filter-tag button { width: 16px; height: 16px; border: 0; padding: 0; border-radius: 50%; background: transparent; color: #1677d2; cursor: pointer; line-height: 16px; }
.selected-filter-tag button:hover { background: #cfe2ff; }

.btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 8px; }
.btn-primary:hover { background: #2980b9; }
.btn-reset { flex: 1; height: 36px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 14px; }
.btn-reset:hover { border-color: #1890ff; color: #1890ff; }
.btn-import { height: 40px; padding: 0 20px; background: #52c41a; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; }
.btn-import:hover { background: #73d13d; }

.charts-section { background: #fff; border-radius: 4px; padding: 14px; margin-bottom: 20px; }
.analysis-header { display: flex; align-items: center; gap: 10px; min-height: 40px; padding: 0 6px 8px; }
.analysis-hint { color: #86909c; font-size: 12px; }
.analysis-export-btn { height: 32px; margin-left: auto; padding: 0 12px; border: 1px solid #91caff; border-radius: 4px; background: #fff; color: #1677d2; cursor: pointer; font-size: 13px; white-space: nowrap; }
.analysis-export-btn:hover { background: #e6f4ff; border-color: #1677d2; }
.section-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
.charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 4px; }
.chart-container { background: #f8fafc; border-radius: 4px; padding: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.chart-title { font-size: 12px; color: #333; margin-bottom: 3px; text-align: left; font-weight: 600; }
.chart-unit { margin-bottom: 6px; color: #86909c; font-size: 10px; text-align: left; }
.chart-wrapper { height: 280px; position: relative; min-height: 280px; }
.analysis-bars { height: 100%; display: flex; align-items: end; gap: 12px; padding: 20px 12px 28px; border-bottom: 1px solid #e5e6eb; }
.analysis-bar-item { flex: 1; min-width: 28px; text-align: center; font-size: 11px; color: #86909c; }
.score-bucket-bars { gap: 8px; }
.score-bucket-bars .analysis-bar-item { min-width: 0; }
.analysis-bar { min-height: 8px; border-radius: 4px 4px 0 0; background: linear-gradient(180deg,#69b1ff,#1677d2); margin-bottom: 7px; }
.analysis-donut { width: 132px; height: 132px; margin: 30px auto 12px; border-radius: 50%; display: grid; place-items: center; }
.analysis-donut-center { display: grid; place-items: center; width: 82px; height: 82px; border-radius: 50%; background: #f8fafc; color: #4e5969; font-size: 12px; }
.analysis-heatmap { display: grid; gap: 4px; align-items: center; padding: 18px 8px; font-size: 10px; overflow-x: auto; }
.analysis-heatmap-label { color: #86909c; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.analysis-heatmap-row-label { color: #4e5969; text-align: right; padding-right: 4px; white-space: nowrap; }
.analysis-heatmap-cell { position: relative; min-width: 32px; height: 34px; border: 0; border-radius: 3px; color: #1d2129; font-size: 11px; display: flex; align-items: center; justify-content: center; cursor: default; }
.analysis-heatmap-cell:hover::after { content: attr(data-tooltip); position: absolute; z-index: 5; left: 50%; bottom: calc(100% + 6px); transform: translateX(-50%); width: max-content; max-width: 180px; padding: 6px 8px; border-radius: 4px; background: #1f2937; color: #fff; font-size: 11px; line-height: 1.4; box-shadow: 0 4px 12px rgba(0,0,0,.16); }
.analysis-line { width: 100%; height: 100%; padding: 30px 12px 20px; }
.analysis-legend { display: flex; justify-content: center; gap: 5px; align-items: center; margin-top: 8px; color: #86909c; font-size: 10px; }
.analysis-legend-gradient { width: 54px; height: 7px; border-radius: 4px; background: linear-gradient(90deg,rgba(22,119,210,.12),rgba(22,119,210,.9)); }

.results-area { flex: 1; background: #fff; border-radius: 4px; padding: 20px; }
.results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.results-tools { display: flex; align-items: center; gap: 8px; }
.results-count { font-size: 14px; color: #666; }
.results-count strong { color: #1890ff; }

.view-toggle { display: flex; border: 1px solid #d9d9d9; border-radius: 4px; overflow: hidden; }
.view-btn { width: 36px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: #fff; border: none; color: #666; }
.view-btn:hover { background: #f5f5f5; }
.view-btn.active { background: #1890ff; color: #fff; }
.view-btn:first-child { border-right: 1px solid #d9d9d9; }

.card-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.entity-card { background: #fff; border-radius: 4px; padding: 20px; border: 1px solid #e8e8e8; transition: all 0.3s; cursor: pointer; }
.entity-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-color: #1890ff; }
.card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.entity-avatar { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600; color: #fff; flex-shrink: 0; }
.entity-name { font-size: 15px; font-weight: 600; color: #333; }
.entity-name:hover { color: #1890ff; }
.entity-type-tag { display: inline-flex; align-items: center; height: 20px; padding: 0 7px; margin-right: 8px; border: 1px solid #d9e8fa; border-radius: 10px; background: #f5f9ff; color: #5b7fa3; font-size: 11px; font-weight: 500; vertical-align: 1px; white-space: nowrap; }
.list-entity-type { display: inline-flex; align-items: center; margin-right: 6px; padding: 1px 6px; border-radius: 8px; background: #f5f9ff; color: #5b7fa3; font-size: 11px; vertical-align: 1px; }

.card-tags { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.card-tag { padding: 2px 8px; background: #f5f5f5; color: #666; border-radius: 4px; font-size: 12px; }
.card-tag.primary { background: #e6f7ff; color: #1890ff; }

.card-intro { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: 40px; }

.progress-section { margin-bottom: 12px; }
.progress-label { font-size: 12px; color: #999; margin-bottom: 4px; }
.progress-bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #1890ff, #52c41a); border-radius: 3px; }
.progress-value { font-size: 12px; color: #333; margin-left: 8px; }

.card-location { font-size: 12px; color: #999; margin-bottom: 12px; }
.card-location i { margin-right: 4px; }

.card-actions { display: flex; flex-direction: row; justify-content: space-between; align-items: center; }
.btn-detail { color: #1890ff; font-size: 14px; cursor: pointer; }
.btn-detail:hover { text-decoration: underline; }
.action-btns { display: flex; gap: 12px; }
.entity-card .action-btns { opacity: 0; visibility: hidden; transform: translateY(3px); transition: opacity .2s ease, transform .2s ease, visibility .2s; }
.entity-card:hover .action-btns, .entity-card:focus-within .action-btns { opacity: 1; visibility: visible; transform: translateY(0); }
.action-btn { width: 28px; height: 28px; border: 1px solid #e8e8e8; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #999; background: #fff; }
.action-btn:not(.delete) { width: auto; min-width: 40px; padding: 0 8px; font-size: 12px; }
.action-btn:hover { border-color: #1890ff; color: #1890ff; }
.action-btn.delete:hover { border-color: #ff4d4f; color: #ff4d4f; }

.list-view { display: block; }
.list-table { width: 100%; border-collapse: collapse; }
.list-table th { background: #fafafa; padding: 12px 16px; text-align: left; font-size: 14px; font-weight: 600; color: #333; border-bottom: 1px solid #e8e8e8; }
.list-table td { padding: 16px; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #666; }
.list-table tr:hover { background: #f5f7fa; }
.list-entity-name { font-weight: 600; color: #333; cursor: pointer; }
.list-entity-name:hover { color: #1890ff; }
.list-progress { display: flex; align-items: center; gap: 8px; }
.list-progress-bar { width: 80px; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.list-progress-fill { height: 100%; background: linear-gradient(90deg, #1890ff, #52c41a); border-radius: 3px; }
.list-actions { display: flex; gap: 8px; }
.list-action-btn { padding: 4px 12px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 12px; color: #666; }
.list-action-btn:hover { border-color: #1890ff; color: #1890ff; }
.list-action-btn.primary { background: #1890ff; color: #fff; border-color: #1890ff; }
.list-action-btn.primary:hover { background: #40a9ff; }
.list-action-btn.danger:hover { border-color: #ff4d4f; color: #ff4d4f; }

.empty-results { padding: 52px 16px; text-align: center; color: #86909c; }
.empty-results i { font-size: 32px; color: #c9cdd4; margin-bottom: 12px; }
.empty-results p { margin-bottom: 12px; }

.pagination { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 20px; }
.page-btn { min-width: 32px; height: 32px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: normal; }
.page-btn:hover:not(:disabled) { border-color: #1890ff; color: #1890ff; }
.page-btn:disabled { cursor: not-allowed; opacity: 0.5; }
.page-btn.active { background: #1890ff; color: #fff; border-color: #1890ff; }
.page-ellipsis { color: #999; padding: 0 4px; }
.page-size { height: 32px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 8px; font-size: 13px; }

.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: center; align-items: center; }
.modal-content { background: #fff; border-radius: 8px; width: 500px; max-width: 90%; padding: 24px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-size: 16px; font-weight: 600; color: #333; }
.modal-close { cursor: pointer; color: #999; font-size: 20px; }
.modal-close:hover { color: #333; }
.upload-area { border: 2px dashed #d9d9d9; border-radius: 8px; padding: 40px; text-align: center; cursor: pointer; transition: all 0.3s; }
.upload-area:hover { border-color: #1890ff; background: #f0f5ff; }
.upload-icon { font-size: 48px; color: #d9d9d9; margin-bottom: 16px; }
.upload-text { font-size: 14px; color: #666; margin-bottom: 8px; }
.upload-hint { font-size: 12px; color: #999; }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
.btn-cancel { padding: 8px 20px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 14px; }
.btn-cancel:hover { border-color: #1890ff; color: #1890ff; }
.btn-confirm { padding: 8px 20px; background: #1890ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
.btn-confirm:hover { background: #40a9ff; }
.btn-danger { padding: 8px 20px; background: #ff4d4f; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
.btn-danger:hover { background: #ff7875; }

.entity-operation-modal { width: 460px; }
.entity-operation-modal .modal-body { padding: 0 24px 4px; }
.operation-field { margin: 16px 0; }
.operation-field label { display: block; margin-bottom: 8px; color: #4e5969; font-size: 13px; }
.operation-field input, .operation-field textarea { width: 100%; border: 1px solid #d9d9d9; border-radius: 4px; padding: 9px 12px; font: inherit; color: #1d2129; }
.operation-field textarea { min-height: 88px; resize: vertical; }
.delete-confirm-content { display: flex; gap: 14px; padding: 4px 0 12px; color: #4e5969; line-height: 1.7; }
.delete-confirm-icon { flex: 0 0 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff2f0; color: #ff4d4f; font-size: 20px; }
.entity-toast { position: fixed; top: 24px; left: 50%; z-index: 1200; transform: translateX(-50%); padding: 10px 16px; border-radius: 4px; background: #fff; color: #1d2129; box-shadow: 0 4px 16px rgba(0,0,0,.16); border-left: 3px solid #52c41a; font-size: 14px; }

.template-download-area { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f0f5ff; border-radius: 8px; margin-bottom: 16px; border: 1px dashed #1890ff; }
.template-info { display: flex; align-items: center; gap: 12px; }
.template-text { display: flex; flex-direction: column; gap: 4px; }
.template-title { font-size: 14px; font-weight: 600; color: #333; }
.template-desc { font-size: 12px; color: #666; }
.btn-download-template { padding: 8px 16px; background: #fff; color: #1890ff; border: 1px solid #1890ff; border-radius: 4px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px; transition: all 0.3s; }
.btn-download-template:hover { background: #1890ff; color: #fff; }

.detail-modal { width: 800px; max-height: 80vh; overflow-y: auto; }
.detail-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e8e8e8; }
.detail-avatar { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 600; color: #fff; flex-shrink: 0; }
.detail-info h3 { font-size: 20px; font-weight: 600; color: #333; margin-bottom: 8px; }
.detail-meta { display: flex; gap: 16px; font-size: 13px; color: #666; }
.detail-section { margin-bottom: 24px; }
.detail-section-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; padding-left: 8px; border-left: 3px solid #1890ff; }
.detail-content { font-size: 13px; color: #666; line-height: 1.8; }
.detail-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.detail-tag { padding: 4px 12px; background: #f0f5ff; color: #1890ff; border-radius: 4px; font-size: 12px; }
.detail-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-item { background: #f8fafc; padding: 16px; border-radius: 4px; text-align: center; }
.stat-value { font-size: 24px; font-weight: 600; color: #1890ff; }
.stat-label { font-size: 12px; color: #666; margin-top: 4px; }
</style>
