<script setup>
// 技术体系（1.2.1）：技术研判服务 → 技术体系分析。
// 1:1 还原 HTML 原型：技术体系 / 在线编辑 / 技术体系案例库 / 专家交互 四个 Tab + 新建/编辑/意见/回复弹窗。
import { ref, computed, reactive } from 'vue';

// ==================== Tab 切换 ====================
const activeTab = ref('tech-system');
function switchTab(tab) {
  activeTab.value = tab;
}

// ==================== 技术体系数据 ====================
const techSystems = ref([
  {
    id: 1, name: '人工智能技术体系', type: '颠覆性技术', typeKey: 'disruptive',
    icon: 'fa-robot', iconColor: 'blue', status: 'completed', statusText: '已完成', progress: 100,
    tags: ['机器学习', '深度学习', 'NLP'], manager: '张教授', collaborators: 5, opinions: 3,
    email: 'zhang@example.com', field: 'ai',
    desc: '人工智能是当前最具变革性的技术之一，涉及机器学习、深度学习、自然语言处理、计算机视觉等多个领域。本技术体系旨在系统梳理人工智能技术发展脉络，分析关键技术演进趋势，为战略决策提供支撑。',
    tagsStr: '机器学习,深度学习,NLP'
  },
  {
    id: 2, name: '量子技术体系', type: '前沿技术', typeKey: 'frontier',
    icon: 'fa-atom', iconColor: 'purple', status: 'inprogress', statusText: '进行中', progress: 60,
    tags: ['量子计算', '量子通信', '量子测量'], manager: '李博士', collaborators: 3, opinions: 2,
    email: 'li@example.com', field: 'quantum',
    desc: '量子技术是未来科技竞争的战略高地，包括量子计算、量子通信、量子测量三大方向。本技术体系重点分析各方向的最新进展、技术路线及产业化前景。',
    tagsStr: '量子计算,量子通信,量子测量'
  },
  {
    id: 3, name: '生物技术体系', type: '颠覆性技术', typeKey: 'disruptive',
    icon: 'fa-dna', iconColor: 'green', status: 'draft', statusText: '草稿', progress: 30,
    tags: ['基因编辑', '细胞治疗', '合成生物'], manager: '王研究员', collaborators: 4, opinions: 1,
    email: 'wang@example.com', field: 'biotech',
    desc: '生物技术正在深刻改变人类的生产生活方式，基因编辑、细胞治疗、合成生物学等前沿技术不断突破。本技术体系关注生物技术领域的重大进展和创新趋势。',
    tagsStr: '基因编辑,细胞治疗,合成生物'
  }
]);

// 筛选
const filterType = ref('');
const filterStatus = ref('');
const filterTime = ref('');
const filterKeyword = ref('');

const filteredSystems = computed(() => {
  return techSystems.value.filter(s => {
    if (filterType.value && s.typeKey !== filterType.value) return false;
    if (filterStatus.value && s.status !== filterStatus.value) return false;
    if (filterKeyword.value && !s.name.includes(filterKeyword.value)) return false;
    return true;
  });
});

function resetSystemFilters() {
  filterType.value = '';
  filterStatus.value = '';
  filterTime.value = '';
  filterKeyword.value = '';
}

function viewSystem(id) {
  alert('查看技术体系详情 ID: ' + id + '（详情页待生成）');
}
function editSystem(id) {
  const data = techSystems.value.find(s => s.id === id);
  if (!data) return;
  Object.assign(editForm, {
    id: data.id, name: data.name, type: data.typeKey, manager: data.manager,
    email: data.email, field: data.field, desc: data.desc,
    tags: data.tagsStr, progress: data.progress
  });
  showEditModal.value = true;
}
function deleteSystem(id) {
  if (confirm('确定要删除该技术体系吗？')) {
    techSystems.value = techSystems.value.filter(s => s.id !== id);
  }
}
function copySystem(id) {
  const data = techSystems.value.find(s => s.id === id);
  if (!data) return;
  const newId = Math.max(...techSystems.value.map(s => s.id)) + 1;
  techSystems.value.push({ ...data, id: newId, name: data.name + '（副本）', status: 'draft', statusText: '草稿', progress: 0 });
}

// ==================== 新建/编辑弹窗 ====================
const showCreateModal = ref(false);
const showEditModal = ref(false);

const createForm = reactive({
  name: '', type: '', manager: '', email: '', field: '', desc: '', tags: ''
});
const editForm = reactive({
  id: null, name: '', type: '', manager: '', email: '', field: '', desc: '', tags: '', progress: 0
});

function openCreateModal() {
  Object.assign(createForm, { name: '', type: '', manager: '', email: '', field: '', desc: '', tags: '' });
  showCreateModal.value = true;
}
function submitTechSystem() {
  if (!createForm.name || !createForm.type || !createForm.manager) {
    alert('请填写必填项');
    return;
  }
  const iconMap = { ai: 'fa-robot', quantum: 'fa-atom', biotech: 'fa-dna' };
  const colorMap = { ai: 'blue', quantum: 'purple', biotech: 'green' };
  const newId = Math.max(...techSystems.value.map(s => s.id), 0) + 1;
  techSystems.value.push({
    id: newId, name: createForm.name,
    type: createForm.type === 'frontier' ? '前沿技术' : '颠覆性技术',
    typeKey: createForm.type,
    icon: iconMap[createForm.field] || 'fa-microchip',
    iconColor: colorMap[createForm.field] || 'blue',
    status: 'draft', statusText: '草稿', progress: 0,
    tags: createForm.tags ? createForm.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    manager: createForm.manager, collaborators: 0, opinions: 0,
    email: createForm.email, field: createForm.field, desc: createForm.desc,
    tagsStr: createForm.tags
  });
  showCreateModal.value = false;
}
function saveTechSystem() {
  const data = techSystems.value.find(s => s.id === editForm.id);
  if (!data) return;
  data.name = editForm.name;
  data.typeKey = editForm.type;
  data.type = editForm.type === 'frontier' ? '前沿技术' : '颠覆性技术';
  data.manager = editForm.manager;
  data.email = editForm.email;
  data.field = editForm.field;
  data.desc = editForm.desc;
  data.tagsStr = editForm.tags;
  data.tags = editForm.tags ? editForm.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  data.progress = editForm.progress;
  if (editForm.progress >= 100) { data.status = 'completed'; data.statusText = '已完成'; }
  else if (editForm.progress > 0) { data.status = 'inprogress'; data.statusText = '进行中'; }
  else { data.status = 'draft'; data.statusText = '草稿'; }
  showEditModal.value = false;
}

// ==================== 在线编辑 - 树形结构 ====================
const treeData = [
  {
    id: 1, name: '人工智能技术体系', icon: 'fa-microchip', iconColor: 'root', draggable: true,
    maturity: 85, importance: '高', desc: '人工智能是计算机科学的一个重要分支，旨在创建能够模拟人类智能的机器和系统。',
    links: ['机器学习', '自然语言处理'],
    children: [
      {
        id: 2, name: '机器学习', icon: 'fa-brain', iconColor: 'blue', draggable: true,
        maturity: 90, importance: '高', desc: '机器学习是人工智能的核心技术，通过算法让计算机从数据中学习规律。',
        links: ['深度学习', '神经网络'],
        children: [
          { id: 3, name: '深度学习', icon: 'fa-project-diagram', iconColor: 'purple', draggable: true, maturity: 88, importance: '中', desc: '基于多层神经网络的机器学习方法，在图像、语音等领域表现突出。', links: [], children: [] },
          { id: 4, name: '神经网络', icon: 'fa-network-wired', iconColor: 'orange', draggable: true, maturity: 75, importance: '高', desc: '模拟生物神经元结构的计算模型，是深度学习的基础。', links: [], children: [] }
        ]
      },
      { id: 5, name: '自然语言处理', icon: 'fa-comments', iconColor: 'green', draggable: false, maturity: 80, importance: '高', desc: '让计算机理解、生成人类语言的技术，包括文本分析、机器翻译等。', links: [], children: [] },
      { id: 6, name: '计算机视觉', icon: 'fa-eye', iconColor: 'gradient', draggable: false, maturity: 82, importance: '中', desc: '使机器能够从图像或多维数据中获取高级理解的技术。', links: [], children: [] }
    ]
  }
];

const selectedNodeId = ref(1);
const selectedNode = ref(treeData[0]);

function findNode(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

function selectNode(id) {
  selectedNodeId.value = id;
  const node = findNode(treeData, id);
  if (node) selectedNode.value = node;
}

const nodeForm = reactive({
  name: '', desc: '', maturity: '85', importance: 'high'
});
function syncNodeForm() {
  nodeForm.name = selectedNode.value.name;
  nodeForm.desc = selectedNode.value.desc;
  nodeForm.maturity = String(selectedNode.value.maturity);
  const impMap = { '关键': 'critical', '高': 'high', '中': 'medium', '低': 'low' };
  nodeForm.importance = impMap[selectedNode.value.importance] || 'high';
}
syncNodeForm();

function saveNodeChanges() {
  selectedNode.value.name = nodeForm.name;
  selectedNode.value.desc = nodeForm.desc;
  selectedNode.value.maturity = Number(nodeForm.maturity);
  const impMap = { critical: '关键', high: '高', medium: '中', low: '低' };
  selectedNode.value.importance = impMap[nodeForm.importance] || '高';
  alert('节点修改已保存');
}

function editorAction(action) {
  const map = { add: '添加节点', delete: '删除节点', link: '添加链接', edit: '编辑' };
  alert(`${map[action]}功能（当前节点：${selectedNode.value.name}）`);
}

// ==================== 案例库 ====================
const cases = ref([
  {
    id: 1, title: '智能图像识别系统案例', icon: 'fa-image', iconColor: 'blue',
    tags: ['卷积神经网络', '深度学习', '目标检测'],
    desc: '基于卷积神经网络和深度学习算法开发的图像识别系统,实现了高精度的物体检测和分类,广泛应用于安防监控、自动驾驶等领域。',
    org: '中科院', rating: '4.9', views: '2,345'
  },
  {
    id: 2, title: '量子密钥分发网络案例', icon: 'fa-microchip', iconColor: 'purple',
    tags: ['量子通信', 'BB84协议', '网络安全'],
    desc: '采用BB84量子密钥分发协议构建的量子通信网络,实现了理论上的无条件安全通信,在金融、政务等高安全需求场景中具有重要应用价值。',
    org: '清华大学', rating: '4.8', views: '1,876'
  },
  {
    id: 3, title: 'CRISPR基因编辑技术应用案例', icon: 'fa-dna', iconColor: 'green',
    tags: ['CRISPR-Cas9', '基因治疗', '精准医疗'],
    desc: '利用CRISPR-Cas9基因编辑技术治疗遗传性疾病案例,实现了对特定基因的精准编辑和修复,为基因治疗提供了新的技术路径。',
    org: '北京大学', rating: '4.7', views: '1,543'
  }
]);

const caseKeyword = ref('');
const caseField = ref('');
const caseOrg = ref('');
const caseSort = ref('');
const filteredCases = computed(() => cases.value);
function resetCaseFilters() {
  caseKeyword.value = '';
  caseField.value = '';
  caseOrg.value = '';
  caseSort.value = '';
}
function viewCase(caseId) {
  alert('查看案例详情 ID: ' + caseId + '（详情页待生成）');
}

// ==================== 专家交互 ====================
const expertOpinionsData = {
  1: {
    systemName: '人工智能技术体系',
    opinions: [
      { id: 1, expertName: '张教授', expertTitle: '人工智能研究所所长', branch: 'machine-learning', branchName: '机器学习', branchPath: '机器学习 -> 神经网络算法', content: '建议在神经网络算法部分增加关于Transformer架构的详细说明,这是当前最主流的深度学习架构之一,在自然语言处理和计算机视觉领域都有广泛应用。', status: 'pending', time: '2024-03-15 14:30', replies: [] },
      { id: 2, expertName: '李博士', expertTitle: '计算机视觉专家', branch: 'computer-vision', branchName: '计算机视觉', branchPath: '计算机视觉', content: '建议将目标检测和语义识别作为两个独立分支,因为它们在技术路径和应用场景上有明显差异,分开描述会更加清晰。', status: 'confirmed', time: '2024-03-14 10:20', replies: [{ content: '感谢您的建议,我们已经将目标检测和语义识别分为独立章节进行详细说明。', time: '2024-03-14 16:00', from: '项目组' }] },
      { id: 3, expertName: '王研究员', expertTitle: '机器学习研究员', branch: 'nlp', branchName: '自然语言处理', branchPath: '自然语言处理 -> 文本生成', content: '建议补充大型语言模型(LLM)相关内容,包括GPT、BERT等模型的对比分析,以及在文本生成、理解、翻译等方面的应用。', status: 'pending', time: '2024-03-13 16:45', replies: [] },
      { id: 4, expertName: '赵教授', expertTitle: '深度学习专家', branch: 'deep-learning', branchName: '深度学习', branchPath: '深度学习 -> 模型优化', content: '建议在模型优化部分增加关于知识蒸馏、模型剪枝、量化等技术的详细介绍,这些技术在实际应用中非常重要。', status: 'confirmed', time: '2024-03-12 09:30', replies: [{ content: '已补充模型优化技术的详细说明,包括原理、应用场景和实现方法。', time: '2024-03-13 10:15', from: '项目组' }] },
      { id: 5, expertName: '钱研究员', expertTitle: '强化学习专家', branch: 'machine-learning', branchName: '机器学习', branchPath: '机器学习 -> 强化学习', content: '建议增加强化学习在智能决策、游戏AI、机器人控制等方面的应用案例。', status: 'pending', time: '2024-03-11 15:45', replies: [] },
      { id: 6, expertName: '孙博士', expertTitle: '语音识别专家', branch: 'nlp', branchName: '自然语言处理', branchPath: '自然语言处理 -> 语音识别', content: '建议补充端到端语音识别技术的最新进展,包括wav2vec、Conformer等模型。', status: 'pending', time: '2024-03-10 14:20', replies: [] },
      { id: 7, expertName: '李教授', expertTitle: '图像生成专家', branch: 'computer-vision', branchName: '计算机视觉', branchPath: '计算机视觉 -> 图像生成', content: '建议增加关于生成对抗网络(GAN)和扩散模型在图像生成中的应用对比。', status: 'confirmed', time: '2024-03-09 11:30', replies: [{ content: '已添加GAN和扩散模型的详细对比分析,包括优缺点和应用场景。', time: '2024-03-09 16:00', from: '项目组' }] },
      { id: 8, expertName: '周博士', expertTitle: '推荐系统专家', branch: 'machine-learning', branchName: '机器学习', branchPath: '机器学习 -> 推荐系统', content: '建议补充深度推荐系统技术,包括深度召回、多任务学习、序列建模等。', status: 'pending', time: '2024-03-08 10:50', replies: [] }
    ]
  },
  2: {
    systemName: '量子技术体系',
    opinions: [
      { id: 9, expertName: '刘院士', expertTitle: '量子信息实验室主任', branch: 'quantum-computing', branchName: '量子计算', branchPath: '量子计算 -> 量子比特', content: '建议在量子比特部分增加关于超导量子比特、离子阱量子比特、光量子比特等不同实现方式的对比分析。', status: 'confirmed', time: '2024-03-10 15:20', replies: [{ content: '已采纳您的建议,增加了不同量子比特实现方式的详细对比说明。', time: '2024-03-11 10:00', from: '项目组' }] },
      { id: 10, expertName: '陈教授', expertTitle: '量子通信专家', branch: 'quantum-communication', branchName: '量子通信', branchPath: '量子通信', content: '建议补充关于量子中继技术的内容,这是实现长距离量子通信的关键技术。', status: 'confirmed', time: '2024-03-09 11:45', replies: [{ content: '已添加量子中继器的技术原理和应用场景说明。', time: '2024-03-10 09:30', from: '项目组' }] },
      { id: 11, expertName: '杨研究员', expertTitle: '量子算法专家', branch: 'quantum-computing', branchName: '量子计算', branchPath: '量子计算 -> 量子算法', content: '建议补充Shor算法、Grover算法等核心量子算法的详细说明,包括算法原理和应用场景。', status: 'pending', time: '2024-03-08 16:30', replies: [] },
      { id: 12, expertName: '周博士', expertTitle: '量子模拟专家', branch: 'quantum-simulation', branchName: '量子模拟', branchPath: '量子模拟', content: '建议增加量子模拟在化学分子结构分析、材料科学中的应用案例。', status: 'pending', time: '2024-03-07 14:15', replies: [] },
      { id: 13, expertName: '吴教授', expertTitle: '量子测量专家', branch: 'quantum-sensing', branchName: '量子传感', branchPath: '量子传感', content: '建议补充量子传感技术在精密测量、导航定位等方面的最新进展。', status: 'confirmed', time: '2024-03-06 10:45', replies: [] }
    ]
  },
  3: {
    systemName: '生物技术体系',
    opinions: [
      { id: 14, expertName: '吴博士', expertTitle: '基因治疗研究员', branch: 'gene-editing', branchName: '基因编辑', branchPath: '基因编辑 -> CRISPR', content: '建议在CRISPR技术部分增加关于脱靶效应及其降低方法的内容,这是基因编辑安全性的关键问题。', status: 'confirmed', time: '2024-03-08 14:00', replies: [{ content: '已补充CRISPR-Cas9、Cas12、Cas13等不同系统的脱靶效应分析及优化策略。', time: '2024-03-09 09:00', from: '项目组' }] },
      { id: 15, expertName: '郑教授', expertTitle: '细胞生物学专家', branch: 'cell-therapy', branchName: '细胞治疗', branchPath: '细胞治疗 -> CAR-T', content: '建议增加CAR-T细胞治疗的临床应用案例,包括疗效评估和副作用管理。', status: 'confirmed', time: '2024-03-07 10:30', replies: [{ content: '已添加CAR-T在血液肿瘤治疗中的临床试验数据和毒性管理方案。', time: '2024-03-08 11:00', from: '项目组' }] },
      { id: 16, expertName: '孙研究员', expertTitle: '合成生物学专家', branch: 'synthetic-biology', branchName: '合成生物学', branchPath: '合成生物学', content: '建议补充合成生物学在生物制造、药物合成等领域的应用案例。', status: 'pending', time: '2024-03-06 15:20', replies: [] },
      { id: 17, expertName: '林博士', expertTitle: '基因测序专家', branch: 'gene-sequencing', branchName: '基因测序', branchPath: '基因测序 -> NGS', content: '建议完善第三代测序技术(纳米孔测序)的技术特点和优势说明。', status: 'pending', time: '2024-03-05 11:40', replies: [] },
      { id: 18, expertName: '马教授', expertTitle: '蛋白质工程专家', branch: 'protein-engineering', branchName: '蛋白质工程', branchPath: '蛋白质工程', content: '建议增加蛋白质结构预测(AlphaFold等)技术的内容及其在药物设计中的应用。', status: 'confirmed', time: '2024-03-04 16:55', replies: [] }
    ]
  }
};

const currentExpertSystemId = ref('');
const currentBranchFilter = ref('all');
const currentStatusFilter = ref('all');

const currentOpinions = computed(() => {
  if (!currentExpertSystemId.value) return [];
  const sys = expertOpinionsData[currentExpertSystemId.value];
  if (!sys) return [];
  let list = sys.opinions;
  if (currentBranchFilter.value !== 'all') {
    list = list.filter(op => op.branch === currentBranchFilter.value);
  }
  if (currentStatusFilter.value !== 'all') {
    list = list.filter(op => op.status === currentStatusFilter.value);
  }
  return list;
});

const opinionStats = computed(() => {
  if (!currentExpertSystemId.value) return { total: 0, confirmed: 0, pending: 0 };
  const list = expertOpinionsData[currentExpertSystemId.value].opinions;
  return {
    total: list.length,
    confirmed: list.filter(op => op.status === 'confirmed').length,
    pending: list.filter(op => op.status === 'pending').length
  };
});

const branchTags = computed(() => {
  const tags = [{ id: 'all', name: '全部', icon: 'fa-list', count: 0 }];
  if (!currentExpertSystemId.value) return tags;
  const list = expertOpinionsData[currentExpertSystemId.value].opinions;
  const branchMeta = {
    'machine-learning': { name: '机器学习', icon: 'fa-microchip' },
    'deep-learning': { name: '深度学习', icon: 'fa-network-wired' },
    nlp: { name: '自然语言处理', icon: 'fa-comments' },
    'computer-vision': { name: '计算机视觉', icon: 'fa-eye' },
    'quantum-computing': { name: '量子计算', icon: 'fa-atom' },
    'quantum-communication': { name: '量子通信', icon: 'fa-key' },
    'quantum-simulation': { name: '量子模拟', icon: 'fa-flask' },
    'quantum-sensing': { name: '量子传感', icon: 'fa-satellite-dish' },
    'gene-editing': { name: '基因编辑', icon: 'fa-dna' },
    'cell-therapy': { name: '细胞治疗', icon: 'fa-cells' },
    'synthetic-biology': { name: '合成生物学', icon: 'fa-leaf' },
    'gene-sequencing': { name: '基因测序', icon: 'fa-align-left' },
    'protein-engineering': { name: '蛋白质工程', icon: 'fa-cube' }
  };
  const counts = {};
  list.forEach(op => { counts[op.branch] = (counts[op.branch] || 0) + 1; });
  tags[0].count = list.length;
  Object.keys(counts).forEach(branch => {
    const meta = branchMeta[branch] || { name: branch, icon: 'fa-tag' };
    tags.push({ id: branch, name: meta.name, icon: meta.icon, count: counts[branch] });
  });
  return tags;
});

function switchExpertSystem() {
  currentBranchFilter.value = 'all';
  currentStatusFilter.value = 'all';
}
function filterByBranch(branch) {
  currentBranchFilter.value = branch;
}
function filterByStatus(status) {
  currentStatusFilter.value = status;
}
function confirmOpinion(id) {
  if (!currentExpertSystemId.value) return;
  const op = expertOpinionsData[currentExpertSystemId.value].opinions.find(o => o.id === id);
  if (op) op.status = 'confirmed';
}

// 新增意见弹窗
const showAddOpinionModal = ref(false);
const opinionForm = reactive({ expertName: '', expertOrg: '', branch: '', content: '' });
function openAddOpinionModal() {
  if (!currentExpertSystemId.value) {
    alert('请先选择技术体系');
    return;
  }
  Object.assign(opinionForm, { expertName: '', expertOrg: '', branch: '', content: '' });
  showAddOpinionModal.value = true;
}
function submitOpinion() {
  if (!opinionForm.expertName || !opinionForm.expertOrg || !opinionForm.branch || !opinionForm.content) {
    alert('请填写必填项');
    return;
  }
  const sys = expertOpinionsData[currentExpertSystemId.value];
  const branchNames = {
    'machine-learning': '机器学习', 'deep-learning': '深度学习', nlp: '自然语言处理',
    'computer-vision': '计算机视觉', other: '其他'
  };
  const maxId = Math.max(...Object.values(expertOpinionsData).flatMap(s => s.opinions.map(o => o.id)));
  sys.opinions.unshift({
    id: maxId + 1, expertName: opinionForm.expertName, expertTitle: opinionForm.expertOrg,
    branch: opinionForm.branch, branchName: branchNames[opinionForm.branch] || '其他',
    branchPath: branchNames[opinionForm.branch] || '其他',
    content: opinionForm.content, status: 'pending',
    time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
    replies: []
  });
  showAddOpinionModal.value = false;
}

// 回复弹窗
const showReplyModal = ref(false);
const currentReplyOpinion = ref(null);
const replyContent = ref('');
function openReplyModal(id) {
  if (!currentExpertSystemId.value) return;
  currentReplyOpinion.value = expertOpinionsData[currentExpertSystemId.value].opinions.find(o => o.id === id);
  replyContent.value = '';
  showReplyModal.value = true;
}
function submitReply() {
  if (!replyContent.value) {
    alert('请输入回复内容');
    return;
  }
  if (!currentReplyOpinion.value.replies) currentReplyOpinion.value.replies = [];
  currentReplyOpinion.value.replies.push({
    from: '项目组',
    time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
    content: replyContent.value
  });
  showReplyModal.value = false;
}
</script>

<template>
  <div class="tech-system-page">
    <!-- 顶部导航栏（固定） -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'tech-system' }" @click="switchTab('tech-system')">
          <i class="fas fa-sitemap"></i> 技术体系
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'online-editor' }" @click="switchTab('online-editor')">
          <i class="fas fa-edit"></i> 在线编辑
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'case-library' }" @click="switchTab('case-library')">
          <i class="fas fa-book"></i> 技术体系案例库
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'expert-interaction' }" @click="switchTab('expert-interaction')">
          <i class="fas fa-comments"></i> 专家交互
        </a>
      </nav>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
      <h1 class="page-title">技术体系分析</h1>

      <!-- ========== Tab1 技术体系 ========== -->
      <div v-show="activeTab === 'tech-system'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-sitemap"></i> 技术体系</div>
            <button class="btn-primary" @click="openCreateModal"><i class="fas fa-plus"></i> 新建技术体系</button>
          </div>

          <!-- 筛选条件 -->
          <div class="filter-section">
            <div class="filter-row">
              <select class="filter-select" v-model="filterType">
                <option value="">全部技术类型</option>
                <option value="disruptive">颠覆性技术</option>
                <option value="frontier">前沿技术</option>
              </select>
              <select class="filter-select" v-model="filterStatus">
                <option value="">全部状态</option>
                <option value="completed">已完成</option>
                <option value="inprogress">进行中</option>
                <option value="draft">草稿</option>
              </select>
              <select class="filter-select" v-model="filterTime">
                <option value="">全部更新时间</option>
                <option value="today">今天</option>
                <option value="week">本周</option>
                <option value="month">本月</option>
              </select>
              <div class="search-wrapper">
                <input type="text" class="search-input" placeholder="搜索技术体系名称..." v-model="filterKeyword">
                <i class="fas fa-search search-icon"></i>
              </div>
              <button class="btn-primary"><i class="fas fa-filter"></i> 筛选</button>
              <button class="btn-secondary" @click="resetSystemFilters">重置</button>
            </div>
          </div>

          <!-- 技术体系卡片 -->
          <div class="card-grid">
            <div v-for="sys in filteredSystems" :key="sys.id" class="tech-system-card" @click="viewSystem(sys.id)">
              <div class="card-header">
                <div class="card-icon" :class="sys.iconColor"><i :class="['fas', sys.icon]"></i></div>
                <div class="card-title-group">
                  <h3 class="card-title">{{ sys.name }}</h3>
                  <span class="card-type">{{ sys.type }}</span>
                </div>
              </div>
              <div class="card-body">
                <div class="card-status">
                  <span class="status-badge" :class="sys.status">{{ sys.statusText }}</span>
                  <div class="progress-bar"><div class="progress-fill" :style="{ width: sys.progress + '%' }"></div></div>
                  <span class="progress-text">{{ sys.progress }}%</span>
                </div>
                <div class="card-tags">
                  <span v-for="tag in sys.tags" :key="tag" class="card-tag">{{ tag }}</span>
                </div>
                <div class="card-meta">
                  <span><i class="fas fa-user"></i> {{ sys.manager }}</span>
                  <span><i class="fas fa-users"></i> 协作: {{ sys.collaborators }}人</span>
                  <span><i class="fas fa-comments"></i> 专家意见: {{ sys.opinions }}条</span>
                </div>
              </div>
              <div class="card-actions">
                <button class="btn-card btn-view" @click.stop="viewSystem(sys.id)"><i class="fas fa-eye"></i> 查看详情</button>
                <button class="btn-card btn-edit" @click.stop="editSystem(sys.id)"><i class="fas fa-edit"></i> 编辑</button>
                <button class="btn-card btn-delete" @click.stop="deleteSystem(sys.id)"><i class="fas fa-trash"></i> 删除</button>
                <button class="btn-card btn-copy" @click.stop="copySystem(sys.id)"><i class="fas fa-copy"></i> 复制</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab2 在线编辑 ========== -->
      <div v-show="activeTab === 'online-editor'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-edit"></i> 在线编辑</div>
          </div>

          <!-- 编辑器工具栏 -->
          <div class="editor-toolbar">
            <div class="toolbar-group">
              <span class="toolbar-label">技术体系</span>
              <select class="toolbar-select">
                <option value="">选择要编辑的技术体系...</option>
                <option value="1">人工智能技术体系</option>
                <option value="2">量子技术体系</option>
                <option value="3">生物技术体系</option>
              </select>
            </div>
            <div class="toolbar-group">
              <span class="toolbar-label">编辑工具</span>
              <button class="toolbar-btn" @click="editorAction('add')"><i class="fas fa-plus"></i> 添加节点</button>
              <button class="toolbar-btn" @click="editorAction('delete')"><i class="fas fa-minus"></i> 删除节点</button>
              <button class="toolbar-btn" @click="editorAction('link')"><i class="fas fa-link"></i> 添加链接</button>
              <button class="toolbar-btn" @click="editorAction('edit')"><i class="fas fa-pen"></i> 编辑</button>
            </div>
          </div>

          <!-- 树形结构编辑器 -->
          <div class="tree-editor-container">
            <div class="tree-sidebar">
              <h5 class="tree-sidebar-title"><i class="fas fa-sitemap"></i> 技术体系结构</h5>
              <div class="drag-hint">
                <i class="fas fa-info-circle"></i>
                <span>提示：拖拽节点可调整层级和顺序，将节点拖放到其他节点上可成为其子节点</span>
              </div>
              <div class="tree-structure">
                <template v-for="root in treeData" :key="root.id">
                  <div class="tree-node" :class="{ active: selectedNodeId === root.id }">
                    <div class="node-content" @click="selectNode(root.id)">
                      <div class="node-drag-handle"><i class="fas fa-grip-vertical"></i></div>
                      <div class="node-icon" :class="root.iconColor"><i :class="['fas', root.icon]"></i></div>
                      <div class="node-info">
                        <span class="node-name">{{ root.name }}</span>
                        <div class="node-metrics">
                          <span class="metric-badge" style="background:#f6ffed;color:#52c41a;"><i class="fas fa-check-circle"></i> 成熟度: {{ root.maturity }}%</span>
                          <span class="metric-badge" style="background:#fff7e6;color:#fa8c16;"><i class="fas fa-star"></i> 重要性: {{ root.importance }}</span>
                        </div>
                      </div>
                    </div>
                    <template v-for="child in root.children" :key="child.id">
                      <div class="tree-node" :class="{ active: selectedNodeId === child.id }" style="margin-left:40px;">
                        <div class="node-content" @click="selectNode(child.id)">
                          <div class="node-drag-handle"><i class="fas fa-grip-vertical"></i></div>
                          <div class="node-icon" :class="child.iconColor"><i :class="['fas', child.icon]"></i></div>
                          <div class="node-info">
                            <span class="node-name">{{ child.name }}</span>
                            <div class="node-metrics">
                              <span class="metric-badge" style="background:#f6ffed;color:#52c41a;"><i class="fas fa-check-circle"></i> 成熟度: {{ child.maturity }}%</span>
                              <span class="metric-badge" style="background:#fff7e6;color:#fa8c16;"><i class="fas fa-star"></i> 重要性: {{ child.importance }}</span>
                            </div>
                          </div>
                        </div>
                        <div v-for="grand in child.children" :key="grand.id" class="tree-node" :class="{ active: selectedNodeId === grand.id }" style="margin-left:40px;">
                          <div class="node-content" @click="selectNode(grand.id)">
                            <div class="node-drag-handle"><i class="fas fa-grip-vertical"></i></div>
                            <div class="node-icon" :class="grand.iconColor"><i :class="['fas', grand.icon]"></i></div>
                            <div class="node-info">
                              <span class="node-name">{{ grand.name }}</span>
                              <div class="node-metrics">
                                <span class="metric-badge" style="background:#f6ffed;color:#52c41a;"><i class="fas fa-check-circle"></i> 成熟度: {{ grand.maturity }}%</span>
                                <span class="metric-badge" style="background:#fff7e6;color:#fa8c16;"><i class="fas fa-star"></i> 重要性: {{ grand.importance }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>

            <!-- 节点详情面板 -->
            <div class="node-detail-panel">
              <h5><i class="fas fa-info-circle" style="color:#1890ff;margin-right:8px;"></i>节点详情</h5>
              <div class="form-group">
                <label class="form-label">节点名称</label>
                <input type="text" class="form-input" v-model="nodeForm.name">
              </div>
              <div class="form-group">
                <label class="form-label">节点描述</label>
                <textarea class="form-input form-textarea" v-model="nodeForm.desc"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">成熟度</label>
                <select class="form-input" v-model="nodeForm.maturity">
                  <option value="90">极高 (90%)</option>
                  <option value="85">高 (85%)</option>
                  <option value="70">中 (70%)</option>
                  <option value="50">低 (50%)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">重要性</label>
                <select class="form-input" v-model="nodeForm.importance">
                  <option value="critical">关键</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">相关链接</label>
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <div v-for="link in selectedNode.links" :key="link" style="display:flex;align-items:center;gap:8px;padding:8px;background:#f5f7fa;border-radius:6px;">
                    <i class="fas fa-link" style="color:#1890ff;"></i>
                    <span style="flex:1;font-size:13px;color:#666;">{{ link }}</span>
                  </div>
                  <div v-if="!selectedNode.links || selectedNode.links.length === 0" style="font-size:13px;color:#999;">暂无相关链接</div>
                </div>
              </div>
              <button class="btn-primary" style="width:100%;margin-top:16px;" @click="saveNodeChanges"><i class="fas fa-save"></i> 保存修改</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab3 技术体系案例库 ========== -->
      <div v-show="activeTab === 'case-library'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-book"></i> 技术体系案例库</div>
            <div class="case-stats"><span class="stat-text"><i class="fas fa-folder"></i> 共 <strong>{{ cases.length }}</strong> 个案例</span></div>
          </div>

          <!-- 搜索筛选 -->
          <div class="case-filter-section">
            <div class="filter-row">
              <div class="search-wrapper" style="max-width:300px;">
                <input type="text" class="search-input" placeholder="搜索案例标题、描述..." v-model="caseKeyword">
                <i class="fas fa-search search-icon"></i>
              </div>
              <select class="filter-select" v-model="caseField">
                <option value="">全部技术领域</option>
                <option value="ai">人工智能</option>
                <option value="quantum">量子技术</option>
                <option value="biotech">生物技术</option>
                <option value="materials">新材料</option>
              </select>
              <select class="filter-select" v-model="caseOrg">
                <option value="">全部来源单位</option>
                <option value="cas">中科院</option>
                <option value="tsinghua">清华大学</option>
                <option value="pku">北京大学</option>
                <option value="zju">浙江大学</option>
              </select>
              <select class="filter-select" v-model="caseSort">
                <option value="">按评分排序</option>
                <option value="high">评分从高到低</option>
                <option value="low">评分从低到高</option>
                <option value="views">浏览量从高到低</option>
              </select>
              <button class="btn-primary"><i class="fas fa-search"></i> 搜索</button>
              <button class="btn-secondary" @click="resetCaseFilters">重置</button>
            </div>
          </div>

          <!-- 案例卡片 -->
          <div class="case-card-grid">
            <div v-for="c in filteredCases" :key="c.id" class="case-card-item" @click="viewCase(c.id)">
              <div class="case-card-header">
                <div class="case-card-icon" :class="c.iconColor"><i :class="['fas', c.icon]"></i></div>
                <h4 class="case-card-title">{{ c.title }}</h4>
              </div>
              <div class="case-card-body">
                <div class="case-card-tags">
                  <span v-for="tag in c.tags" :key="tag" class="case-tag">{{ tag }}</span>
                </div>
                <p class="case-card-desc">{{ c.desc }}</p>
                <div class="case-card-meta">
                  <span class="meta-item"><i class="fas fa-building"></i> {{ c.org }}</span>
                  <span class="meta-item rating"><i class="fas fa-star"></i> {{ c.rating }}</span>
                  <span class="meta-item views"><i class="fas fa-eye"></i> {{ c.views }}</span>
                </div>
              </div>
              <div class="case-card-actions">
                <button class="btn-card btn-view-detail" @click.stop="viewCase(c.id)"><i class="fas fa-eye"></i> 查看详情</button>
                <button class="btn-card btn-download" @click.stop="alert('下载案例')"><i class="fas fa-download"></i> 下载</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab4 专家交互 ========== -->
      <div v-show="activeTab === 'expert-interaction'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-user-tie"></i> 专家交互</div>
            <div style="display:flex;gap:10px;align-items:center;">
              <select class="filter-select" style="width:220px;" v-model="currentExpertSystemId" @change="switchExpertSystem">
                <option value="">选择技术体系</option>
                <option value="1">人工智能技术体系</option>
                <option value="2">量子技术体系</option>
                <option value="3">生物技术体系</option>
              </select>
              <button class="btn-primary" @click="openAddOpinionModal"><i class="fas fa-plus"></i> 新增专家意见</button>
            </div>
          </div>

          <div class="expert-layout">
            <!-- 技术分支标签 -->
            <div class="branch-tags">
              <div v-for="tag in branchTags" :key="tag.id" class="branch-tag"
                   :class="{ active: currentBranchFilter === tag.id }" @click="filterByBranch(tag.id)">
                <i :class="['fas', tag.icon]"></i> {{ tag.name }}
                <span class="tag-count">{{ tag.count }}</span>
              </div>
            </div>

            <!-- 意见概览 -->
            <div class="opinion-overview">
              <div class="overview-item">
                <div class="overview-value">{{ opinionStats.total }}</div>
                <div class="overview-label">总意见数</div>
              </div>
              <div class="overview-item middle">
                <div class="overview-value">{{ opinionStats.confirmed }}</div>
                <div class="overview-label">已确认</div>
              </div>
              <div class="overview-item">
                <div class="overview-value">{{ opinionStats.pending }}</div>
                <div class="overview-label">待确认</div>
              </div>
            </div>

            <!-- 专家意见列表 -->
            <div class="opinion-list-header">
              <h4><i class="fas fa-comments" style="margin-right:6px;color:#1890ff;"></i>专家意见列表</h4>
              <div style="display:flex;gap:8px;">
                <button class="filter-status-btn" :class="{ active: currentStatusFilter === 'all' }" @click="filterByStatus('all')"><i class="fas fa-list"></i> 全部</button>
                <button class="filter-status-btn" :class="{ active: currentStatusFilter === 'confirmed' }" @click="filterByStatus('confirmed')"><i class="fas fa-check-circle" style="color:#52c41a;"></i> 已确认</button>
                <button class="filter-status-btn" :class="{ active: currentStatusFilter === 'pending' }" @click="filterByStatus('pending')"><i class="fas fa-clock" style="color:#faad14;"></i> 待确认</button>
              </div>
            </div>

            <div class="opinion-list">
              <div v-if="!currentExpertSystemId" class="opinion-empty">
                <i class="fas fa-inbox"></i>
                <div>请先选择技术体系查看专家意见</div>
              </div>
              <div v-else-if="currentOpinions.length === 0" class="opinion-empty">
                <i class="fas fa-inbox"></i>
                <div>暂无专家意见</div>
              </div>
              <div v-for="op in currentOpinions" :key="op.id" class="opinion-item">
                <div class="opinion-header">
                  <div class="opinion-author">
                    <i class="fas fa-user-tie"></i>
                    {{ op.expertName }}
                    <span class="opinion-title">{{ op.expertTitle }}</span>
                  </div>
                  <div class="opinion-time">{{ op.time }}</div>
                </div>
                <div class="opinion-branch"><i class="fas fa-code-branch"></i> 分支: {{ op.branchPath }}</div>
                <div class="opinion-content">{{ op.content }}</div>

                <div v-if="op.replies && op.replies.length > 0" class="reply-box">
                  <div v-for="(reply, idx) in op.replies" :key="idx" style="margin-bottom:8px;">
                    <div class="reply-meta">
                      <span class="reply-from">{{ reply.from }}</span>
                      <span class="reply-time">{{ reply.time }}</span>
                    </div>
                    <div class="reply-content">{{ reply.content }}</div>
                  </div>
                </div>

                <div class="opinion-actions">
                  <button v-if="op.status === 'pending'" class="btn-primary btn-sm" @click="confirmOpinion(op.id)"><i class="fas fa-check"></i> 确认</button>
                  <button class="btn-secondary btn-sm" @click="openReplyModal(op.id)"><i class="fas fa-reply"></i> 回复</button>
                  <span class="opinion-status" :class="op.status">{{ op.status === 'pending' ? '待确认' : '已确认' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 新建技术体系弹窗 ========== -->
    <div class="modal-overlay" v-show="showCreateModal" @click.self="showCreateModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-plus-circle"></i> 新建技术体系</h3>
          <button class="modal-close" @click="showCreateModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-tag"></i> 体系名称 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="createForm.name" placeholder="请输入技术体系名称">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-layer-group"></i> 技术类型 <span class="required">*</span></label>
            <select class="form-input" v-model="createForm.type">
              <option value="">请选择技术类型</option>
              <option value="disruptive">颠覆性技术</option>
              <option value="frontier">前沿技术</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> 负责人 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="createForm.manager" placeholder="请输入负责人姓名">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-envelope"></i> 负责人邮箱</label>
            <input type="email" class="form-input" v-model="createForm.email" placeholder="请输入负责人邮箱">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-sitemap"></i> 技术领域</label>
            <select class="form-input" v-model="createForm.field">
              <option value="">请选择技术领域</option>
              <option value="ai">人工智能</option>
              <option value="quantum">量子技术</option>
              <option value="biotech">生物技术</option>
              <option value="materials">新材料</option>
              <option value="energy">新能源</option>
              <option value="aerospace">航空航天</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-align-left"></i> 描述</label>
            <textarea class="form-input form-textarea" v-model="createForm.desc" placeholder="请输入技术体系的详细描述（500字以内）" maxlength="500"></textarea>
            <div class="char-count">{{ createForm.desc.length }}/500</div>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-tags"></i> 技术标签</label>
            <input type="text" class="form-input" v-model="createForm.tags" placeholder="请输入技术标签,多个标签用逗号分隔">
            <div class="hint-text">例如: 深度学习,自然语言处理,计算机视觉</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="showCreateModal = false"><i class="fas fa-times"></i> 取消</button>
          <button class="btn-primary" @click="submitTechSystem"><i class="fas fa-check"></i> 创建体系</button>
        </div>
      </div>
    </div>

    <!-- ========== 编辑技术体系弹窗 ========== -->
    <div class="modal-overlay" v-show="showEditModal" @click.self="showEditModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-edit"></i> 编辑技术体系</h3>
          <button class="modal-close" @click="showEditModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-tag"></i> 体系名称 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="editForm.name" placeholder="请输入技术体系名称">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-layer-group"></i> 技术类型 <span class="required">*</span></label>
            <select class="form-input" v-model="editForm.type">
              <option value="">请选择技术类型</option>
              <option value="disruptive">颠覆性技术</option>
              <option value="frontier">前沿技术</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> 负责人 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="editForm.manager" placeholder="请输入负责人姓名">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-envelope"></i> 负责人邮箱</label>
            <input type="email" class="form-input" v-model="editForm.email" placeholder="请输入负责人邮箱">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-sitemap"></i> 技术领域</label>
            <select class="form-input" v-model="editForm.field">
              <option value="">请选择技术领域</option>
              <option value="ai">人工智能</option>
              <option value="quantum">量子技术</option>
              <option value="biotech">生物技术</option>
              <option value="materials">新材料</option>
              <option value="energy">新能源</option>
              <option value="aerospace">航空航天</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-align-left"></i> 描述</label>
            <textarea class="form-input form-textarea" v-model="editForm.desc" placeholder="请输入技术体系的详细描述（500字以内）" maxlength="500"></textarea>
            <div class="char-count">{{ editForm.desc.length }}/500</div>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-tags"></i> 技术标签</label>
            <input type="text" class="form-input" v-model="editForm.tags" placeholder="请输入技术标签,多个标签用逗号分隔">
            <div class="hint-text">例如: 深度学习,自然语言处理,计算机视觉</div>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-tasks"></i> 完成进度</label>
            <div class="edit-progress-control">
              <input type="range" min="0" max="100" step="1" v-model.number="editForm.progress">
              <span class="edit-progress-value">{{ editForm.progress }}%</span>
            </div>
            <div class="hint-text">拖动进度条手动调整技术体系完成进度</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="showEditModal = false"><i class="fas fa-times"></i> 取消</button>
          <button class="btn-primary" @click="saveTechSystem"><i class="fas fa-check"></i> 保存修改</button>
        </div>
      </div>
    </div>

    <!-- ========== 新增专家意见弹窗 ========== -->
    <div class="opinion-modal-overlay" v-show="showAddOpinionModal" @click.self="showAddOpinionModal = false">
      <div class="opinion-modal-content">
        <div class="opinion-modal-header">
          <h3 class="opinion-modal-title"><i class="fas fa-plus-circle"></i> 新增专家意见</h3>
          <button class="opinion-modal-close" @click="showAddOpinionModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="opinion-modal-body">
          <div class="form-group">
            <label class="form-label"><i class="fas fa-user"></i> 专家姓名 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="opinionForm.expertName" placeholder="请输入专家姓名">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-building"></i> 所属单位 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="opinionForm.expertOrg" placeholder="请输入专家所属单位">
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-code-branch"></i> 技术分支 <span class="required">*</span></label>
            <select class="form-input" v-model="opinionForm.branch">
              <option value="">请选择技术分支</option>
              <option value="machine-learning">机器学习</option>
              <option value="deep-learning">深度学习</option>
              <option value="nlp">自然语言处理</option>
              <option value="computer-vision">计算机视觉</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-align-left"></i> 意见内容 <span class="required">*</span></label>
            <textarea class="form-input form-textarea" v-model="opinionForm.content" placeholder="请输入专家意见内容"></textarea>
          </div>
        </div>
        <div class="opinion-modal-footer">
          <button class="btn-secondary" @click="showAddOpinionModal = false"><i class="fas fa-times"></i> 取消</button>
          <button class="btn-success" @click="submitOpinion"><i class="fas fa-check"></i> 提交意见</button>
        </div>
      </div>
    </div>

    <!-- ========== 回复专家意见弹窗 ========== -->
    <div class="opinion-modal-overlay" v-show="showReplyModal" @click.self="showReplyModal = false">
      <div class="opinion-modal-content reply-modal-content">
        <div class="opinion-modal-header">
          <h3 class="opinion-modal-title"><i class="fas fa-reply"></i> 回复专家意见</h3>
          <button class="opinion-modal-close" @click="showReplyModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="opinion-modal-body">
          <div v-if="currentReplyOpinion" class="reply-quote">
            <div class="reply-quote-name">{{ currentReplyOpinion.expertName }}</div>
            <div class="reply-quote-content">{{ currentReplyOpinion.content }}</div>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="fas fa-reply"></i> 回复内容 <span class="required">*</span></label>
            <textarea class="form-input form-textarea" v-model="replyContent" placeholder="请输入回复内容" style="min-height:120px;"></textarea>
          </div>
        </div>
        <div class="opinion-modal-footer">
          <button class="btn-secondary" @click="showReplyModal = false"><i class="fas fa-times"></i> 取消</button>
          <button class="btn-primary" @click="submitReply"><i class="fas fa-paper-plane"></i> 发送回复</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-system-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}

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

/* 筛选区 */
.filter-section { background: #fff; border-radius: 4px; padding: 20px; margin-bottom: 20px; }
.filter-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
.filter-row:last-child { margin-bottom: 0; }
.search-wrapper { position: relative; flex: 1; max-width: 400px; }
.search-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 40px 0 12px; font-size: 14px; }
.search-input:focus { outline: none; border-color: #1890ff; }
.search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; cursor: pointer; }
.filter-select { height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 13px; min-width: 150px; }
.filter-select:focus { outline: none; border-color: #1890ff; }

.btn-primary { height: 40px; padding: 0 20px; background: #1890ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary:hover { background: #40a9ff; }
.btn-secondary { height: 40px; padding: 0 20px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 14px; color: #666; display: inline-flex; align-items: center; gap: 6px; }
.btn-secondary:hover { border-color: #1890ff; color: #1890ff; }
.btn-success { height: 40px; padding: 0 20px; background: #52c41a; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
.btn-success:hover { background: #73d13d; }
.btn-sm { height: 32px; padding: 0 16px; font-size: 12px; }

/* 模块区块 */
.module-section { background: #fff; border-radius: 4px; padding: 24px; margin-bottom: 20px; }
.module-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #e8e8e8; }
.module-title { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 10px; }
.module-title i { color: #1890ff; font-size: 18px; }

/* 状态徽章 */
.status-badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
.status-badge.completed { background: #f6ffed; color: #52c41a; }
.status-badge.inprogress { background: #e6f7ff; color: #1890ff; }
.status-badge.draft { background: #f5f5f5; color: #999; }

/* 技术体系卡片 */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.tech-system-card {
  background: #fff; border-radius: 12px; padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;
  cursor: pointer; border: 1px solid #f0f0f0;
}
.tech-system-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); transform: translateY(-2px); }
.card-header { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 16px; }
.card-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
.card-icon.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.card-icon.purple { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.card-icon.green { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.card-title-group { flex: 1; }
.card-title { font-size: 16px; font-weight: 600; color: #333; margin: 0 0 6px 0; }
.card-type { font-size: 12px; color: #666; background: #f5f5f5; padding: 2px 8px; border-radius: 4px; }
.card-body { margin-bottom: 16px; }
.card-status { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.progress-bar { flex: 1; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #1890ff 0%, #36cfc9 100%); border-radius: 3px; transition: width 0.3s ease; }
.progress-text { font-size: 12px; color: #999; min-width: 40px; text-align: right; }
.card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.card-tag { padding: 4px 10px; background: #f0f5ff; color: #1890ff; border-radius: 12px; font-size: 12px; }
.card-meta { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #999; }
.card-meta span { display: flex; align-items: center; gap: 4px; }
.card-actions { display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px; border-top: 1px solid #f0f0f0; padding-top: 16px; margin-top: 0; }
.btn-card {
  flex: 1; padding: 8px; border: 1px solid #d9d9d9; border-radius: 6px;
  background: #fff; font-size: 12px; color: #666; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 4px;
}
.btn-card:hover { background: #f5f5f5; }
.btn-card.btn-view { color: #1890ff; border-color: #1890ff; }
.btn-card.btn-view:hover { background: #e6f7ff; }
.btn-card.btn-edit { color: #52c41a; border-color: #52c41a; }
.btn-card.btn-edit:hover { background: #f6ffed; }
.btn-card.btn-delete { color: #ff4d4f; border-color: #ff4d4f; }
.btn-card.btn-delete:hover { background: #fff1f0; }
.btn-card.btn-copy { color: #722ed1; border-color: #722ed1; }
.btn-card.btn-copy:hover { background: #f9f0ff; }

/* 编辑器工具栏 */
.editor-toolbar {
  background: #f5f5f5; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
}
.toolbar-group { display: flex; align-items: center; gap: 8px; }
.toolbar-label { font-size: 13px; color: #666; font-weight: 500; margin-right: 8px; }
.toolbar-btn {
  padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff;
  font-size: 13px; color: #666; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
}
.toolbar-btn:hover { background: #e6f7ff; border-color: #1890ff; color: #1890ff; }
.toolbar-btn i { font-size: 14px; }
.toolbar-select { padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 13px; color: #333; background: #fff; cursor: pointer; }
.toolbar-select:focus { outline: none; border-color: #1890ff; }

/* 树形结构编辑器 */
.tree-editor-container { display: grid; grid-template-columns: 1fr 320px; gap: 20px; background: #fafafa; border-radius: 12px; padding: 20px; }
.tree-sidebar { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.tree-sidebar-title {
  font-size: 15px; font-weight: 600; color: #333; margin: 0 0 20px 0;
  display: flex; align-items: center; gap: 8px; padding-bottom: 12px; border-bottom: 2px solid #f0f0f0;
}
.tree-sidebar-title i { color: #1890ff; }
.tree-structure { max-height: 600px; overflow-y: auto; }
.tree-node { margin-bottom: 8px; position: relative; }
.node-content {
  display: flex; align-items: flex-start; gap: 12px; padding: 12px;
  background: #fafafa; border-radius: 8px; cursor: pointer; transition: all 0.2s;
  border: 2px solid transparent;
}
.node-content:hover { background: #f0f5ff; }
.tree-node.active > .node-content { background: #e6f7ff; border-color: #1890ff; }
.node-drag-handle { cursor: move; color: #999; padding: 4px; border-radius: 4px; transition: all 0.2s; }
.node-drag-handle:hover { background: #e0e0e0; color: #666; }
.drag-hint {
  font-size: 12px; color: #999; margin-bottom: 12px; padding: 8px 12px;
  background: #f5f5f5; border-radius: 6px; display: flex; align-items: center; gap: 6px;
}
.drag-hint i { color: #1890ff; }
.node-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; flex-shrink: 0; }
.node-icon.root { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.node-icon.blue { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.node-icon.purple { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }
.node-icon.orange { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }
.node-icon.green { background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); }
.node-icon.gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.node-info { flex: 1; }
.node-name { font-size: 14px; font-weight: 600; color: #333; display: block; margin-bottom: 8px; }
.node-metrics { display: flex; gap: 8px; flex-wrap: wrap; }
.metric-badge { font-size: 11px; padding: 3px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px; }

/* 节点详情面板 */
.node-detail-panel { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.node-detail-panel h5 { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 20px; }

/* 表单控件 */
.form-group { margin-bottom: 20px; }
.form-group:last-child { margin-bottom: 0; }
.form-label { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: #333; margin-bottom: 8px; }
.required { color: #ff4d4f; }
.form-input { width: 100%; height: 36px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 13px; }
.form-input:focus { outline: none; border-color: #1890ff; }
.form-textarea { width: 100%; min-height: 80px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 12px; font-size: 13px; resize: vertical; font-family: inherit; }
.form-textarea:focus { outline: none; border-color: #1890ff; }

/* 案例库 */
.case-stats { font-size: 13px; color: #666; }
.case-stats strong { color: #1890ff; font-size: 16px; }
.case-filter-section { background: #fafafa; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
.case-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.case-card-item {
  background: #fff; border-radius: 12px; padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;
  cursor: pointer; border: 1px solid #f0f0f0;
}
.case-card-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); transform: translateY(-2px); }
.case-card-header { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 16px; }
.case-card-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
.case-card-icon.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.case-card-icon.purple { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.case-card-icon.green { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.case-card-title { font-size: 16px; font-weight: 600; color: #333; margin: 0; }
.case-card-body { margin-bottom: 16px; }
.case-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.case-tag { padding: 4px 10px; background: #f0f5ff; color: #1890ff; border-radius: 12px; font-size: 12px; }
.case-card-desc { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 12px; min-height: 48px; }
.case-card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #999; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.case-card-meta .meta-item { display: flex; align-items: center; gap: 4px; }
.case-card-meta .meta-item.rating { color: #fa8c16; font-weight: 500; }
.case-card-actions { display: flex; gap: 8px; border-top: 1px solid #f0f0f0; padding-top: 16px; }
.btn-card.btn-view-detail { color: #1890ff; border-color: #1890ff; }
.btn-card.btn-view-detail:hover { background: #e6f7ff; }
.btn-card.btn-download { color: #52c41a; border-color: #52c41a; }
.btn-card.btn-download:hover { background: #f6ffed; }

/* 专家交互 */
.expert-layout { display: grid; grid-template-columns: 1fr; gap: 20px; }
.branch-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; padding: 16px; background: #fafafa; border-radius: 8px; }
.branch-tag {
  padding: 8px 16px; background: #fff; border: 1px solid #d9d9d9; border-radius: 20px;
  cursor: pointer; font-size: 13px; color: #666; transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
}
.branch-tag:hover { border-color: #1890ff; color: #1890ff; }
.branch-tag.active { background: #1890ff; color: #fff; border-color: #1890ff; }
.branch-tag .tag-count { background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 10px; font-size: 11px; }
.branch-tag.active .tag-count { background: rgba(255,255,255,0.2); color: #fff; }

/* 意见概览 */
.opinion-overview {
  display: flex; gap: 16px; margin-bottom: 16px; padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: #fff;
}
.overview-item { flex: 1; text-align: center; }
.overview-item.middle { border-left: 1px solid rgba(255,255,255,0.3); border-right: 1px solid rgba(255,255,255,0.3); }
.overview-value { font-size: 28px; font-weight: 600; }
.overview-label { font-size: 13px; opacity: 0.9; margin-top: 4px; }

.opinion-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.opinion-list-header h4 { font-size: 14px; font-weight: 600; color: #333; margin: 0; }
.filter-status-btn {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;
  background: #f5f5f5; border: 1px solid #d9d9d9; border-radius: 6px;
  font-size: 12px; color: #666; cursor: pointer; transition: all 0.3s;
}
.filter-status-btn:hover { background: #e6f7ff; border-color: #1890ff; color: #1890ff; }
.filter-status-btn.active { background: #1890ff; border-color: #1890ff; color: #fff; }

.opinion-list { max-height: 600px; overflow-y: auto; }
.opinion-empty { text-align: center; padding: 60px 20px; color: #999; }
.opinion-empty i { font-size: 48px; margin-bottom: 16px; display: block; }
.opinion-item { background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e8e8e8; transition: all 0.3s; }
.opinion-item:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #1890ff; }
.opinion-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.opinion-author { font-size: 15px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
.opinion-author i { color: #1890ff; }
.opinion-title { font-size: 12px; font-weight: 400; color: #999; margin-left: 8px; }
.opinion-time { font-size: 12px; color: #999; }
.opinion-branch { font-size: 13px; color: #1890ff; margin-bottom: 12px; padding: 4px 10px; background: #f0f5ff; border-radius: 6px; display: inline-block; }
.opinion-content { font-size: 14px; color: #666; line-height: 1.8; margin-bottom: 16px; }
.reply-box { margin: 16px 0; padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 3px solid #52c41a; }
.reply-meta { font-size: 12px; margin-bottom: 8px; }
.reply-from { font-weight: 600; color: #1890ff; }
.reply-time { color: #999; margin-left: 8px; }
.reply-content { font-size: 13px; color: #666; line-height: 1.6; }
.opinion-actions { display: flex; gap: 10px; align-items: center; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.opinion-status { font-size: 12px; padding: 4px 12px; border-radius: 12px; font-weight: 500; }
.opinion-status.pending { background: #fff7e6; color: #fa8c16; }
.opinion-status.confirmed { background: #f6ffed; color: #52c41a; }

/* 弹窗 */
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 2000;
  display: flex; align-items: center; justify-content: center;
}
.modal-content { background: #fff; border-radius: 12px; width: 520px; max-height: 90vh; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: flex; flex-direction: column; }
.modal-header { padding: 24px 24px 20px; border-bottom: 1px solid #e8e8e8; display: flex; justify-content: space-between; align-items: center; }
.modal-title { font-size: 18px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; margin: 0; }
.modal-close { width: 32px; height: 32px; border-radius: 6px; border: none; background: #f5f5f5; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #999; transition: all 0.2s; }
.modal-close:hover { background: #e8e8e8; color: #333; }
.modal-body { padding: 24px; max-height: calc(90vh - 160px); overflow-y: auto; flex: 1; }
.char-count { text-align: right; font-size: 12px; color: #999; margin-top: 4px; }
.hint-text { font-size: 12px; color: #999; margin-top: 4px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; display: flex; justify-content: flex-end; gap: 12px; background: #fafafa; }
.edit-progress-control { display: flex; align-items: center; gap: 12px; }
.edit-progress-control input[type="range"] { flex: 1; accent-color: #1890ff; cursor: pointer; }
.edit-progress-value { min-width: 48px; color: #1890ff; font-size: 14px; font-weight: 600; text-align: right; }

/* 意见弹窗 */
.opinion-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 3000;
  display: flex; align-items: center; justify-content: center;
}
.opinion-modal-content { background: #fff; border-radius: 12px; width: 540px; max-height: 90vh; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: flex; flex-direction: column; }
.opinion-modal-header { padding: 24px 24px 20px; border-bottom: 1px solid #e8e8e8; display: flex; justify-content: space-between; align-items: center; }
.opinion-modal-title { font-size: 18px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; margin: 0; }
.opinion-modal-close { width: 32px; height: 32px; border-radius: 6px; border: none; background: #f5f5f5; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #999; transition: all 0.2s; }
.opinion-modal-close:hover { background: #e8e8e8; color: #333; }
.opinion-modal-body { padding: 24px; max-height: calc(90vh - 180px); overflow-y: auto; flex: 1; }
.opinion-modal-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; display: flex; justify-content: flex-end; gap: 12px; background: #fafafa; }
.reply-modal-content { width: 600px; }
.reply-quote { background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 3px solid #1890ff; }
.reply-quote-name { font-size: 13px; font-weight: 600; color: #333; margin-bottom: 8px; }
.reply-quote-content { font-size: 12px; color: #666; line-height: 1.6; }
</style>
