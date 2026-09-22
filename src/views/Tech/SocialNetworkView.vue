<script setup>
// 社会网络分析（1.2.5）：技术研判服务 → 技术体系分析。
// 1:1 还原 HTML 原型：网络可视化 / 结果分析 / 任务管理 / 数据上传 / 网络维护 五个 Tab。
// 可视化使用 SVG/Div 实现（无 canvas、无第三方图表库）。
import { ref, reactive, computed, onUnmounted } from 'vue';

// ==================== 通用提示 Toast ====================
const toasts = ref([]);
let toastSeq = 0;
function showToast(message, type = 'info') {
  const id = ++toastSeq;
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    const idx = toasts.value.findIndex(t => t.id === id);
    if (idx >= 0) toasts.value.splice(idx, 1);
  }, 2600);
}

// ==================== Tab 切换 ====================
const activeTab = ref('network-visualization');
function switchTab(tab) {
  activeTab.value = tab;
}

// ==================== Tab1 网络可视化 ====================
const NODE_TYPE_CONFIG = {
  person: { color: '#1890ff', label: '研究人员' },
  institution: { color: '#52c41a', label: '研究机构' },
  topic: { color: '#fa8c16', label: '研究主题' },
  technology: { color: '#722ed1', label: '技术领域' }
};
const COMMUNITY_CONFIG = {
  c1: { color: '#1890ff', name: '量子信息社群' },
  c2: { color: '#52c41a', name: '人工智能社群' },
  c3: { color: '#fa8c16', name: '高校协同社群' }
};
const EDGE_TYPE_CONFIG = {
  collaboration: '合作关系',
  citation: '引用关系',
  funding: '资助关系',
  affiliation: '隶属关系'
};

// 确定性示例数据（位置为力导向布局的初始坐标）
const NETWORK_NODES = [
  { id: 1, name: '量子计算', type: 'technology', community: 'c1', degree: 156, funding: 920000, citation: 9600, centrality: 0.92, fx: 250, fy: 232, institution: '中科院量子所', field: '量子信息', activity: '高活跃', related: ['中科院量子所', '潘建伟', '清华大学', '超导量子比特'] },
  { id: 2, name: '中科院量子所', type: 'institution', community: 'c1', degree: 142, funding: 880000, citation: 7200, centrality: 0.87, fx: 128, fy: 120, institution: '中国科学院', field: '量子通信', activity: '高活跃', related: ['量子计算', '潘建伟', '中科大', '清华大学'] },
  { id: 3, name: '潘建伟', type: 'person', community: 'c1', degree: 128, funding: 650000, citation: 8800, centrality: 0.88, fx: 142, fy: 332, institution: '中国科学技术大学', field: '量子信息', activity: '高活跃', related: ['中科院量子所', '清华大学', '量子计算', '中科大'] },
  { id: 4, name: '深度学习', type: 'technology', community: 'c2', degree: 118, funding: 760000, citation: 9100, centrality: 0.9, fx: 560, fy: 302, institution: '清华大学', field: '人工智能', activity: '高活跃', related: ['自然语言处理', '计算机视觉', '大语言模型', '清华大学'] },
  { id: 5, name: '清华大学', type: 'institution', community: 'c3', degree: 112, funding: 720000, citation: 6800, centrality: 0.95, fx: 420, fy: 282, institution: '高等院校', field: '综合研究', activity: '高活跃', related: ['北京大学', '潘建伟', '深度学习', '量子计算'] },
  { id: 6, name: '自然语言处理', type: 'technology', community: 'c2', degree: 96, funding: 580000, citation: 7400, centrality: 0.85, fx: 702, fy: 182, institution: '清华大学', field: 'NLP', activity: '高活跃', related: ['深度学习', 'GPT', '大语言模型'] },
  { id: 7, name: '计算机视觉', type: 'technology', community: 'c2', degree: 92, funding: 540000, citation: 6200, centrality: 0.8, fx: 690, fy: 402, institution: '清华大学', field: '图像处理', activity: '中活跃', related: ['深度学习', '图像识别', '张钹'] },
  { id: 8, name: '北京大学', type: 'institution', community: 'c3', degree: 88, funding: 460000, citation: 5300, centrality: 0.78, fx: 522, fy: 158, institution: '高等院校', field: '综合研究', activity: '中活跃', related: ['清华大学', '张钹'] },
  { id: 9, name: '中科大', type: 'institution', community: 'c1', degree: 74, funding: 420000, citation: 4100, centrality: 0.72, fx: 302, fy: 92, institution: '中国科学技术大学', field: '量子物理', activity: '中活跃', related: ['潘建伟', '中科院量子所'] },
  { id: 10, name: '张钹', type: 'person', community: 'c2', degree: 98, funding: 380000, citation: 5900, centrality: 0.76, fx: 580, fy: 442, institution: '清华大学', field: '人工智能', activity: '中活跃', related: ['深度学习', '北京大学', '清华大学'] },
  { id: 11, name: 'GPT', type: 'topic', community: 'c2', degree: 84, funding: 360000, citation: 6700, centrality: 0.7, fx: 822, fy: 128, institution: 'OpenAI', field: '大模型', activity: '高活跃', related: ['自然语言处理', '大语言模型'] },
  { id: 12, name: '超导量子比特', type: 'topic', community: 'c1', degree: 66, funding: 410000, citation: 3300, centrality: 0.64, fx: 332, fy: 382, institution: '中科院量子所', field: '量子器件', activity: '中活跃', related: ['量子计算', '中科院量子所'] },
  { id: 13, name: '图像识别', type: 'topic', community: 'c2', degree: 72, funding: 320000, citation: 4600, centrality: 0.62, fx: 822, fy: 452, institution: '商汤科技', field: '计算机视觉', activity: '中活跃', related: ['计算机视觉'] },
  { id: 14, name: '大语言模型', type: 'topic', community: 'c2', degree: 103, funding: 520000, citation: 7900, centrality: 0.81, fx: 832, fy: 262, institution: '多机构合作', field: '大模型', activity: '高活跃', related: ['GPT', '自然语言处理', '深度学习'] }
];

const NETWORK_EDGES = [
  { source: 1, target: 2, type: 'collaboration', weight: 0.92, papers: 28, startDate: '2018-06-15' },
  { source: 1, target: 3, type: 'collaboration', weight: 0.9, papers: 24, startDate: '2019-03-10' },
  { source: 1, target: 9, type: 'collaboration', weight: 0.74, papers: 12, startDate: '2020-09-01' },
  { source: 1, target: 12, type: 'funding', weight: 0.94, papers: 18, startDate: '2019-11-20' },
  { source: 2, target: 3, type: 'affiliation', weight: 0.83, papers: 16, startDate: '2017-04-18' },
  { source: 2, target: 9, type: 'collaboration', weight: 0.78, papers: 9, startDate: '2021-01-12' },
  { source: 2, target: 12, type: 'funding', weight: 0.81, papers: 11, startDate: '2020-06-08' },
  { source: 3, target: 5, type: 'collaboration', weight: 0.92, papers: 21, startDate: '2018-10-25' },
  { source: 3, target: 9, type: 'affiliation', weight: 0.86, papers: 14, startDate: '2016-07-01' },
  { source: 5, target: 8, type: 'collaboration', weight: 0.7, papers: 8, startDate: '2021-05-16' },
  { source: 5, target: 4, type: 'collaboration', weight: 0.78, papers: 13, startDate: '2020-02-22' },
  { source: 1, target: 5, type: 'collaboration', weight: 0.89, papers: 19, startDate: '2019-08-30' },
  { source: 4, target: 6, type: 'citation', weight: 0.93, papers: 35, startDate: '2019-12-05' },
  { source: 4, target: 7, type: 'citation', weight: 0.91, papers: 31, startDate: '2020-03-14' },
  { source: 4, target: 14, type: 'citation', weight: 0.88, papers: 26, startDate: '2021-07-19' },
  { source: 6, target: 11, type: 'citation', weight: 0.82, papers: 17, startDate: '2022-02-11' },
  { source: 11, target: 14, type: 'citation', weight: 0.87, papers: 22, startDate: '2022-09-01' },
  { source: 6, target: 14, type: 'collaboration', weight: 0.85, papers: 15, startDate: '2022-04-20' },
  { source: 7, target: 13, type: 'funding', weight: 0.79, papers: 10, startDate: '2021-11-08' },
  { source: 4, target: 10, type: 'citation', weight: 0.76, papers: 9, startDate: '2020-10-02' },
  { source: 10, target: 8, type: 'collaboration', weight: 0.72, papers: 7, startDate: '2021-06-28' }
];

// 控制面板状态
const layoutMode = ref('force');
const labelMode = ref('all');
const nodeSizeMode = ref('degree');
const nodeColorMode = ref('type');
const zoom = ref(1);
const zoomPercent = computed(() => Math.round(zoom.value * 100) + '%');
const clusteringEnabled = ref(false);
const physicsEnabled = ref(false);
const highlightedNames = ref([]);

const networkSvgRef = ref(null);
const selectedNode = ref(null);
const selectedEdgeKey = ref(null);
const edgeTooltip = reactive({ visible: false, x: 0, y: 0, title: '', content: '' });

// 物理引擎 / 拖拽产生的实时坐标
const livePos = ref(null);
let rafId = null;

// 确定性伪随机（随机布局用）
function seededRand(n) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// 当前布局下的节点坐标表
const positions = computed(() => {
  if (livePos.value) return livePos.value;
  const map = {};
  if (layoutMode.value === 'circular') {
    const cx = 500, cy = 300, r = 225;
    NETWORK_NODES.forEach((n, i) => {
      const angle = (2 * Math.PI * i) / NETWORK_NODES.length - Math.PI / 2;
      map[n.id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
  } else if (layoutMode.value === 'hierarchical') {
    const rows = { technology: 90, person: 230, institution: 370, topic: 510 };
    const groups = { technology: [], person: [], institution: [], topic: [] };
    NETWORK_NODES.forEach(n => groups[n.type].push(n));
    Object.keys(groups).forEach(type => {
      const list = groups[type];
      list.forEach((n, i) => {
        map[n.id] = { x: 120 + ((i + 1) * 760) / (list.length + 1), y: rows[type] };
      });
    });
  } else if (layoutMode.value === 'random') {
    NETWORK_NODES.forEach(n => {
      map[n.id] = { x: 70 + seededRand(n.id) * 860, y: 60 + seededRand(n.id + 99) * 480 };
    });
  } else {
    NETWORK_NODES.forEach(n => { map[n.id] = { x: n.fx, y: n.fy }; });
  }
  return map;
});

const networkTransform = computed(() => `translate(500 300) scale(${zoom.value}) translate(-500 -300)`);

const renderedEdges = computed(() => NETWORK_EDGES.map(e => {
  const s = positions.value[e.source];
  const t = positions.value[e.target];
  return { ...e, key: e.source + '-' + e.target, sx: s.x, sy: s.y, tx: t.x, ty: t.y };
}));

// 聚类（社群）虚线圈
const clusterOverlays = computed(() => {
  if (!clusteringEnabled.value) return [];
  const groups = {};
  NETWORK_NODES.forEach(n => {
    (groups[n.community] = groups[n.community] || []).push(n);
  });
  return Object.keys(groups).map(key => {
    const list = groups[key];
    const cx = list.reduce((sum, n) => sum + positions.value[n.id].x, 0) / list.length;
    const cy = list.reduce((sum, n) => sum + positions.value[n.id].y, 0) / list.length;
    const r = list.reduce((max, n) => {
      const dx = positions.value[n.id].x - cx;
      const dy = positions.value[n.id].y - cy;
      return Math.max(max, Math.sqrt(dx * dx + dy * dy));
    }, 0) + 46;
    return { key, cx, cy, r, color: COMMUNITY_CONFIG[key].color, name: COMMUNITY_CONFIG[key].name };
  });
});

function nodeRadius(n) {
  if (nodeSizeMode.value === 'uniform') return 20;
  if (nodeSizeMode.value === 'funding') return 14 + (n.funding / 1000000) * 24;
  if (nodeSizeMode.value === 'citation') return 14 + (n.citation / 10000) * 24;
  return 14 + (n.degree / 160) * 24;
}
function nodeFill(n) {
  if (nodeColorMode.value === 'community') return COMMUNITY_CONFIG[n.community].color;
  if (nodeColorMode.value === 'centrality') {
    if (n.centrality >= 0.85) return '#f5222d';
    if (n.centrality >= 0.7) return '#fa8c16';
    return '#52c41a';
  }
  return NODE_TYPE_CONFIG[n.type].color;
}
function nodeLabelVisible(n) {
  if (labelMode.value === 'none') return false;
  if (labelMode.value === 'important') return n.degree >= 95;
  return true;
}
function nodeDimmed(n) {
  return highlightedNames.value.length > 0 && !highlightedNames.value.includes(n.name);
}

// 缩放
function setZoom(v) {
  zoom.value = Math.max(0.5, Math.min(3, Math.round(v * 10) / 10));
}
function zoomIn() { setZoom(zoom.value + 0.2); }
function zoomOut() { setZoom(zoom.value - 0.2); }
function onWheel(e) {
  setZoom(zoom.value + (e.deltaY > 0 ? -0.1 : 0.1));
}
function resetNetwork() {
  zoom.value = 1;
  livePos.value = null;
  highlightedNames.value = [];
  stopPhysics();
  showToast('视图已重置');
}

// 高级功能
function toggleClustering() {
  clusteringEnabled.value = !clusteringEnabled.value;
  if (!clusteringEnabled.value) highlightedNames.value = [];
  showToast(clusteringEnabled.value ? '聚类标记已开启' : '聚类标记已关闭');
}
function ensureLivePos() {
  if (!livePos.value) {
    const next = {};
    NETWORK_NODES.forEach(n => { next[n.id] = { ...positions.value[n.id] }; });
    livePos.value = next;
  }
}
function startPhysics() {
  function step() {
    const pos = livePos.value;
    if (!pos) return;
    const repulsion = 9000;
    // 节点排斥
    for (let i = 0; i < NETWORK_NODES.length; i++) {
      for (let j = i + 1; j < NETWORK_NODES.length; j++) {
        const a = NETWORK_NODES[i], b = NETWORK_NODES[j];
        let dx = pos[b.id].x - pos[a.id].x;
        let dy = pos[b.id].y - pos[a.id].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = repulsion / (dist * dist);
        dx = (dx / dist) * force;
        dy = (dy / dist) * force;
        pos[a.id].x -= dx * 0.04;
        pos[a.id].y -= dy * 0.04;
        pos[b.id].x += dx * 0.04;
        pos[b.id].y += dy * 0.04;
      }
    }
    // 连线吸引
    NETWORK_EDGES.forEach(e => {
      const s = pos[e.source], t = pos[e.target];
      let dx = t.x - s.x, dy = t.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - 150) * 0.0008;
      dx = (dx / dist) * force * dist;
      dy = (dy / dist) * force * dist;
      s.x += dx * 0.04; s.y += dy * 0.04;
      t.x -= dx * 0.04; t.y -= dy * 0.04;
    });
    Object.values(pos).forEach(p => {
      p.x = Math.max(42, Math.min(958, p.x));
      p.y = Math.max(42, Math.min(558, p.y));
    });
    rafId = requestAnimationFrame(step);
  }
  rafId = requestAnimationFrame(step);
}
function stopPhysics() {
  physicsEnabled.value = false;
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
}
function togglePhysics() {
  physicsEnabled.value = !physicsEnabled.value;
  if (physicsEnabled.value) {
    ensureLivePos();
    startPhysics();
    showToast('物理引擎已开启');
  } else {
    stopPhysics();
    livePos.value = null;
    showToast('物理引擎已关闭');
  }
}
function exportNetworkImage() {
  showToast('网络图已导出为 PNG 图像');
}

// 节点交互
function openNodeInfo(n) {
  selectedNode.value = n;
}
function closeNodeInfo() {
  selectedNode.value = null;
}
function canvasBackgroundClick() {
  selectedNode.value = null;
  selectedEdgeKey.value = null;
  edgeTooltip.visible = false;
}
const relatedNodeEdges = computed(() => {
  if (!selectedNode.value) return [];
  return NETWORK_EDGES.filter(e => e.source === selectedNode.value.id || e.target === selectedNode.value.id);
});
const selectedNodeCloseness = computed(() => selectedNode.value ? selectedNode.value.centrality.toFixed(3) : '0');
const selectedNodeBetweenness = computed(() => selectedNode.value ? (selectedNode.value.centrality * 1.05).toFixed(3) : '0');

// 拖拽节点
let draggingNode = null;
function toSvgPoint(e) {
  const svg = networkSvgRef.value;
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function onNodePointerDown(e, n) {
  ensureLivePos();
  draggingNode = n;
  const p = toSvgPoint(e);
  livePos.value[n.id] = { x: p.x, y: p.y };
  openNodeInfo(n);
  selectedEdgeKey.value = null;
  edgeTooltip.visible = false;
  const target = e.currentTarget;
  if (target.setPointerCapture) target.setPointerCapture(e.pointerId);
}
function onNodePointerMove(e) {
  if (!draggingNode) return;
  const p = toSvgPoint(e);
  livePos.value[draggingNode.id] = {
    x: Math.max(42, Math.min(958, p.x)),
    y: Math.max(42, Math.min(558, p.y))
  };
}
function onNodePointerUp() {
  draggingNode = null;
}

// 连线 tooltip
function showEdgeTooltip(e, edge) {
  edgeTooltip.title = EDGE_TYPE_CONFIG[edge.type];
  edgeTooltip.content = `连接节点：${NETWORK_NODES.find(n => n.id === edge.source).name} - ${NETWORK_NODES.find(n => n.id === edge.target).name} ｜ 相关数据 ${edge.papers} 条 ｜ 起始时间 ${edge.startDate}`;
  edgeTooltip.x = e.clientX + 12;
  edgeTooltip.y = e.clientY + 12;
  edgeTooltip.visible = true;
}
function selectEdge(edge) {
  selectedEdgeKey.value = edge.key;
  selectedNode.value = null;
}

// ==================== Tab2 结果分析 ====================
const METRIC_CARDS = [
  { key: 'nodes', icon: 'fa-project-diagram', cls: 'blue', value: '18,560', label: '节点总数' },
  { key: 'edges', icon: 'fa-link', cls: 'green', value: '156,820', label: '连接总数' },
  { key: 'density', icon: 'fa-compress-arrows-alt', cls: 'orange', value: '0.42', label: '网络密度' },
  { key: 'path', icon: 'fa-route', cls: 'purple', value: '3.2', label: '平均路径长度' }
];
const METRIC_DETAIL = {
  nodes: {
    title: '节点总数',
    description: '网络中所有实体的总数量，包括研究人员、研究机构、研究主题和技术领域等。',
    detail: '当前网络共有 18,560 个节点，其中研究人员 8,240 人，研究机构 3,180 家，研究主题 4,520 个，技术领域 2,620 个。'
  },
  edges: {
    title: '连接总数',
    description: '网络中所有节点之间关系的总和，包括合作关系、引用关系、资助关系和隶属关系。',
    detail: '当前网络共有 156,820 条连接，其中合作关系 58,420 条，引用关系 42,180 条，资助关系 28,560 条，隶属关系 27,660 条。'
  },
  density: {
    title: '网络密度',
    description: '反映网络连接紧密程度的指标，值越接近1表示网络越紧密连接。',
    detail: '当前网络密度为 0.42，表明网络结构较为紧密，节点间存在丰富的相互关联。0.42 属于中等偏上水平。'
  },
  path: {
    title: '平均路径长度',
    description: '反映信息传递效率的指标，表示任意两个节点之间最短路径的平均长度。',
    detail: '当前网络平均路径长度为 3.2，意味着任意两个节点之间平均通过 3.2 个节点即可建立联系，说明网络信息传递效率较高。'
  }
};
const showMetricModal = ref(false);
const currentMetric = ref(null);
function openMetric(key) {
  currentMetric.value = METRIC_DETAIL[key];
  showMetricModal.value = true;
}

// 关键节点
const KEY_TYPE_LABEL = { person: '研究人员', institution: '研究机构', topic: '研究主题', technology: '技术领域' };
const KEY_TYPE_STYLE = {
  person: 'background:#e6f7ff;color:#1890ff;',
  institution: 'background:#f6ffed;color:#52c41a;',
  topic: 'background:#fff2e8;color:#fa8c16;',
  technology: 'background:#f9f0ff;color:#722ed1;'
};
const keyNodes = ref([
  { name: '量子计算', type: 'technology', degree: 156, betweenness: 0.892, closeness: 0.654 },
  { name: '中科院量子所', type: 'institution', degree: 142, betweenness: 0.945, closeness: 0.623 },
  { name: '潘建伟', type: 'person', degree: 128, betweenness: 0.756, closeness: 0.598 },
  { name: '深度学习', type: 'technology', degree: 118, betweenness: 0.623, closeness: 0.545 },
  { name: '清华大学', type: 'institution', degree: 112, betweenness: 0.589, closeness: 0.512 }
]);
const keyNodeTypeFilter = ref('');
const keyNodeSortBy = ref('degree');
const visibleKeyNodes = computed(() => {
  const list = keyNodes.value
    .filter(n => !keyNodeTypeFilter.value || n.type === keyNodeTypeFilter.value)
    .slice();
  list.sort((a, b) => {
    if (keyNodeSortBy.value === 'degree') return b.degree - a.degree;
    if (keyNodeSortBy.value === 'betweenness') return b.betweenness - a.betweenness;
    return b.closeness - a.closeness;
  });
  return list;
});

const KEY_NODE_PROFILES = {
  量子计算: {
    role: '技术枢纽节点：连接量子算法、量子芯片、量子纠错等细分主题，并承接高校、科研院所与产业转化资源。',
    community: '量子信息核心社区（124 个节点 / 342 条关系 · 社区凝聚度 0.789）',
    links: [
      { target: '清华大学', relation: '研究机构关联', strength: '0.89' },
      { target: '潘建伟', relation: '专家关联', strength: '0.90' },
      { target: '超导量子比特', relation: '关键技术关联', strength: '0.94' },
      { target: '量子纠错', relation: '技术主题关联', strength: '0.87' },
      { target: '中科院量子所', relation: '科研机构关联', strength: '0.84' }
    ],
    reasons: [
      '直接连接 5 个高权重研究实体，覆盖机构、专家、关键器件与技术主题。',
      '中介中心性位居技术节点前列，承担量子硬件与算法研究链路之间的桥接作用。',
      '在论文、专利与重大项目三类关系中同时保持高活跃度，具备跨成果类型扩散能力。'
    ]
  },
  中科院量子所: {
    role: '专业支撑节点：面向量子器件、测控系统和实验平台，连接基础研究与工程验证环节。',
    community: '量子信息核心社区（124 个节点 / 342 条关系 · 社区凝聚度 0.789）',
    links: [
      { target: '量子计算', relation: '技术研发', strength: '0.84' },
      { target: '清华大学', relation: '联合研究', strength: '0.84' },
      { target: '潘建伟', relation: '专家合作', strength: '0.83' },
      { target: '超导量子比特', relation: '器件研发关联', strength: '0.81' }
    ],
    reasons: [
      '与量子计算、中科院相关团队和高校平台形成稳定的联合研发关系。',
      '中介中心性高，能够将专业器件研发资源导入跨机构协同项目。',
      '承担多个实验平台与关键技术验证项目，是社区中的专业化资源入口。'
    ]
  },
  潘建伟: {
    role: '学术桥接节点：跨接量子通信、量子计算与精密测量研究方向，并带动人才与项目协同。',
    community: '量子信息核心社区（124 个节点 / 342 条关系 · 社区凝聚度 0.789）',
    links: [
      { target: '清华大学', relation: '机构任职/合作', strength: '0.92' },
      { target: '量子计算', relation: '研究方向关联', strength: '0.90' },
      { target: '中科院量子所', relation: '学术合作', strength: '0.83' },
      { target: '量子通信', relation: '论文主题关联', strength: '0.79' }
    ],
    reasons: [
      '同时连接核心机构、关键技术主题及多类合作成果，关系覆盖面广。',
      '在研究人员节点中具备较强的中介能力，是跨团队知识流动的重要通道。',
      '高影响力论文与重大项目参与度持续提升了节点的网络可见度和影响范围。'
    ]
  },
  深度学习: {
    role: '算法基础枢纽节点：连接表示学习、生成式模型、视觉智能和语言智能等应用技术路线。',
    community: '人工智能方法社区（156 个节点 / 418 条关系 · 社区凝聚度 0.823）',
    links: [
      { target: '自然语言处理', relation: '技术主题关联', strength: '0.93' },
      { target: '计算机视觉', relation: '技术主题关联', strength: '0.91' },
      { target: '清华大学', relation: '机构研究关联', strength: '0.78' },
      { target: '大语言模型', relation: '技术演进关联', strength: '0.88' }
    ],
    reasons: [
      '与自然语言处理、计算机视觉和大语言模型构成高频共现与技术演进关系。',
      '连接基础算法与多类智能应用，具有显著的跨主题传导能力。',
      '相关论文产出和项目合作密度高，持续吸引机构与研究人员节点汇聚。'
    ]
  },
  清华大学: {
    role: '跨域协同枢纽节点：通过人才培养、联合研究和技术转化，连接人工智能与量子信息等多个子网。',
    community: '量子信息核心社区 / 人工智能方法社区 · 跨社区连接节点',
    links: [
      { target: '潘建伟', relation: '科研人员合作', strength: '0.92' },
      { target: '量子计算', relation: '技术研究关联', strength: '0.89' },
      { target: '中科院量子所', relation: '联合研究', strength: '0.84' },
      { target: '超导量子比特', relation: '成果主题关联', strength: '0.76' }
    ],
    reasons: [
      '与核心专家、科研院所及前沿技术主题保持多类型直接关系。',
      '跨社区连接度较高，可促进量子信息与人工智能方向的资源共享。',
      '高水平人才、论文成果与国家级项目在同一机构节点汇聚，形成持续影响力。'
    ]
  }
};
const FALLBACK_PROFILE = {
  role: '该实体在当前研究关系网络中承担连接与信息传导作用。',
  community: '当前研究领域关联社区',
  links: [
    { target: '相关研究机构', relation: '协同关系', strength: '0.82' },
    { target: '相关专家', relation: '研究关联', strength: '0.79' },
    { target: '相关技术主题', relation: '主题关联', strength: '0.76' }
  ],
  reasons: [
    '直接关联多个研究实体，具有较高连接度。',
    '在当前子网中承担信息传导与资源连接作用。',
    '与成果、项目或机构保持持续活跃关联。'
  ]
};
const showKeyNodeModal = ref(false);
const currentKeyNodeName = ref('');
const currentKeyProfile = computed(() => KEY_NODE_PROFILES[currentKeyNodeName.value] || FALLBACK_PROFILE);
function openKeyNodeAnalysis(name) {
  currentKeyNodeName.value = name;
  showKeyNodeModal.value = true;
}

// 社区（集群）
const clusters = ref([
  { id: 1, name: '量子计算集群', subtitle: '核心研究方向', cohesion: 0.789, size: 124, color: '#1890ff', cores: ['量子计算', '中科院量子所', '潘建伟', '中科大'] },
  { id: 2, name: '深度学习集群', subtitle: '人工智能核心', cohesion: 0.823, size: 156, color: '#52c41a', cores: ['深度学习', 'TensorFlow', '谷歌', '百度', '阿里云'] },
  { id: 3, name: '自然语言处理集群', subtitle: '文本处理研究', cohesion: 0.756, size: 98, color: '#fa8c16', cores: ['NLP', 'GPT', 'OpenAI', '清华大学'] },
  { id: 4, name: '计算机视觉集群', subtitle: '图像处理研究', cohesion: 0.682, size: 112, color: '#722ed1', cores: ['CNN', '图像识别', '旷视', '商汤', '中科院'] }
]);
const clusterCohesionFilter = ref('');
const clusterSizeFilter = ref('');
const filteredClusters = computed(() => clusters.value.filter(c => {
  if (clusterCohesionFilter.value === 'high' && !(c.cohesion > 0.7)) return false;
  if (clusterCohesionFilter.value === 'medium' && !(c.cohesion >= 0.5 && c.cohesion <= 0.7)) return false;
  if (clusterCohesionFilter.value === 'low' && !(c.cohesion < 0.5)) return false;
  if (clusterSizeFilter.value === 'large' && !(c.size > 100)) return false;
  if (clusterSizeFilter.value === 'medium' && !(c.size >= 50 && c.size <= 100)) return false;
  if (clusterSizeFilter.value === 'small' && !(c.size < 50)) return false;
  return true;
}));
function cohesionColor(c) {
  return c > 0.7 ? '#52c41a' : c >= 0.5 ? '#faad14' : '#ff4d4f';
}
const showClusterModal = ref(false);
const currentCluster = ref(null);
function openClusterDetail(c) {
  currentCluster.value = c;
  showClusterModal.value = true;
}
function highlightClusterInGraph(c) {
  switchTab('network-visualization');
  clusteringEnabled.value = true;
  highlightedNames.value = c.cores.filter(name => NETWORK_NODES.some(n => n.name === name));
  showClusterModal.value = false;
  showToast(`已在网络图中高亮「${c.name}」`);
}

// ==================== Tab3 任务管理 ====================
const TASK_STATUS_CONFIG = {
  running: { label: '运行中', icon: 'fa-spinner fa-spin' },
  completed: { label: '已完成', icon: 'fa-check-circle' },
  failed: { label: '失败', icon: 'fa-times-circle' },
  pending: { label: '等待中', icon: 'fa-clock' }
};
const TASK_TYPE_CONFIG = {
  network: '网络分析',
  clustering: '聚类分析',
  centrality: '中心性计算',
  path: '路径分析'
};

const tasks = ref([
  {
    id: 'task001', name: '量子计算网络分析', status: 'running', progress: 65, type: 'network',
    params: '节点：机构/人物/技术主题；关系：合作、引用；范围：近5年',
    execTime: '2024-03-20 09:00', createTime: '2024-03-15 09:30', priority: '高',
    description: '识别量子计算领域的核心机构、研究人员与技术主题，分析合作和引用关系形成的网络结构。',
    inputData: ['量子计算领域论文 12,684 篇', '机构与研究人员实体 8,240 个', '合作、引用关系 46,580 条', '数据时间范围：2019-01-01 至 2024-03-15'],
    logs: [
      { time: '2024-03-20 09:00', stage: '任务启动', detail: '读取任务配置并创建网络分析作业' },
      { time: '2024-03-20 09:08', stage: '数据预处理', detail: '完成实体去重与关系类型标准化' },
      { time: '2024-03-20 09:26', stage: '网络构建', detail: '已生成 65% 的节点关系矩阵，正在计算网络指标' }
    ],
    intermediateResults: ['已识别 18,560 个有效节点，覆盖机构、人物、技术主题三类实体', '已完成合作关系和引用关系的权重归一化', '当前网络密度 0.42，平均路径长度 3.2'],
    outputFiles: [
      { name: '量子计算网络分析_节点清单.csv', type: '节点清单', size: '2.8 MB', status: '处理中' },
      { name: '量子计算网络分析_阶段报告.pdf', type: '阶段报告', size: '1.4 MB', status: '已生成' }
    ],
    history: [
      { time: '2024-03-15 09:30', action: '创建任务', operator: '系统用户', detail: '创建网络分析任务并设置高优先级' },
      { time: '2024-03-20 08:55', action: '修改配置', operator: '系统用户', detail: '将分析范围调整为近5年数据' },
      { time: '2024-03-20 09:00', action: '开始执行', operator: '调度服务', detail: '任务进入运行状态' }
    ]
  },
  {
    id: 'task002', name: '深度学习社群聚类', status: 'completed', progress: 100, type: 'clustering',
    params: '算法：Louvain；相似度：余弦；最小社群规模：10',
    execTime: '2024-03-18 14:30', createTime: '2024-03-14 14:20', priority: '普通',
    description: '基于深度学习相关实体及其论文合作关系识别研究社群，输出社群规模、凝聚度和核心节点。',
    inputData: ['深度学习论文 8,932 篇', '研究机构 1,260 家，研究人员 5,480 人', '论文合作关系 21,406 条', '特征向量维度：128'],
    logs: [
      { time: '2024-03-18 14:30', stage: '任务启动', detail: '加载深度学习领域网络数据' },
      { time: '2024-03-18 14:42', stage: '特征计算', detail: '完成节点向量和边权重计算' },
      { time: '2024-03-18 15:06', stage: '聚类计算', detail: 'Louvain 算法完成 42 个社群划分' },
      { time: '2024-03-18 15:18', stage: '任务完成', detail: '生成聚类评估结果和社群清单' }
    ],
    intermediateResults: ['识别 42 个有效社群，平均社群规模 138 个节点', '最大社群包含 486 个节点，凝聚度为 0.78', '已标记 126 个跨社群连接节点'],
    outputFiles: [
      { name: '深度学习社群聚类_社群清单.xlsx', type: '社群清单', size: '3.6 MB', status: '已生成' },
      { name: '深度学习社群聚类_分析报告.pdf', type: '完整报告', size: '2.1 MB', status: '已生成' }
    ],
    history: [
      { time: '2024-03-14 14:20', action: '创建任务', operator: '系统用户', detail: '创建聚类分析任务' },
      { time: '2024-03-18 14:30', action: '开始执行', operator: '调度服务', detail: '任务进入运行状态' },
      { time: '2024-03-18 15:18', action: '生成报告', operator: '分析服务', detail: '聚类结果和分析报告生成完成' }
    ]
  },
  {
    id: 'task003', name: 'NLP领域中心性计算', status: 'running', progress: 32, type: 'centrality',
    params: '指标：度/介数/接近中心性；TopN：50；权重：引用关系',
    execTime: '2024-03-20 10:30', createTime: '2024-03-15 10:15', priority: '普通',
    description: '计算自然语言处理领域节点在合作与引用网络中的中心性，识别具有关键连接作用的机构、人员和技术主题。',
    inputData: ['NLP 论文 6,745 篇', '技术主题节点 2,180 个', '机构和研究人员节点 6,320 个', '引用关系 35,208 条'],
    logs: [
      { time: '2024-03-20 10:30', stage: '任务启动', detail: '初始化中心性计算参数' },
      { time: '2024-03-20 10:36', stage: '网络校验', detail: '完成网络连通性检查，发现 2 个孤立子图' },
      { time: '2024-03-20 10:48', stage: '指标计算', detail: '已完成度中心性计算，正在计算介数中心性' }
    ],
    intermediateResults: ['已完成 8,500 个节点的度中心性排序', '当前 Top 50 节点中机构节点占比 46%', '待完成介数中心性与接近中心性融合评分'],
    outputFiles: [{ name: 'NLP领域中心性计算_节点排名.csv', type: '节点排名', size: '1.9 MB', status: '处理中' }],
    history: [
      { time: '2024-03-15 10:15', action: '创建任务', operator: '系统用户', detail: '创建中心性计算任务' },
      { time: '2024-03-20 10:30', action: '开始执行', operator: '调度服务', detail: '任务进入运行状态' }
    ]
  },
  {
    id: 'task004', name: '计算机视觉路径分析', status: 'failed', progress: 45, type: 'path',
    params: '算法：最短路径；起点：计算机视觉；终点：应用实体',
    execTime: '2024-03-19 16:00', createTime: '2024-03-13 16:45', priority: '低',
    description: '分析计算机视觉核心技术主题到产业应用实体之间的最短关联路径，定位技术扩散和转化环节。',
    inputData: ['计算机视觉主题节点 1,820 个', '产业应用实体 3,460 个', '技术关联边 18,760 条', '路径约束：最多经过 6 个中间节点'],
    logs: [
      { time: '2024-03-19 16:00', stage: '任务启动', detail: '加载计算机视觉技术网络' },
      { time: '2024-03-19 16:17', stage: '路径计算', detail: '完成起点节点映射，开始搜索应用实体路径' },
      { time: '2024-03-19 16:32', stage: '任务中断', detail: '部分应用实体缺少有效映射关系，路径搜索未能继续' }
    ],
    intermediateResults: ['已建立 1,820 个技术主题的索引', '已完成 45% 的起点到应用实体映射', '失败原因：输入数据中存在未关联的应用实体'],
    outputFiles: [{ name: '计算机视觉路径分析_错误日志.txt', type: '错误日志', size: '28 KB', status: '已生成' }],
    history: [
      { time: '2024-03-13 16:45', action: '创建任务', operator: '系统用户', detail: '创建路径分析任务' },
      { time: '2024-03-19 16:00', action: '开始执行', operator: '调度服务', detail: '任务进入运行状态' },
      { time: '2024-03-19 16:32', action: '执行失败', operator: '分析服务', detail: '因实体映射缺失终止执行' }
    ]
  },
  {
    id: 'task005', name: '知识图谱构建', status: 'pending', progress: 0, type: 'network',
    params: '网络类型：知识图谱；实体类型：机构/技术；关系阈值：0.65',
    execTime: '2024-03-21 11:00', createTime: '2024-03-15 11:00', priority: '普通',
    description: '构建机构、技术主题与研究成果之间的知识图谱，为后续网络检索和关联分析提供结构化数据。',
    inputData: ['机构实体 3,180 个', '技术实体 2,620 个', '论文及专利记录 24,600 条', '待处理候选关系 68,420 条'],
    logs: [{ time: '2024-03-15 11:00', stage: '任务创建', detail: '任务已进入调度队列，等待执行资源' }],
    intermediateResults: ['已完成任务参数校验', '待执行实体标准化、关系抽取和图谱入库'],
    outputFiles: [{ name: '知识图谱构建_实体关系图谱.json', type: '图谱文件', size: '待生成', status: '待处理' }],
    history: [
      { time: '2024-03-15 11:00', action: '创建任务', operator: '系统用户', detail: '创建知识图谱构建任务' },
      { time: '2024-03-15 11:01', action: '进入队列', operator: '调度服务', detail: '任务等待执行资源' }
    ]
  }
]);

const taskStats = reactive({ total: 24, running: 8, completed: 14, failed: 2 });
const TASK_STAT_CARDS = [
  { key: 'total', icon: 'fa-tasks', cls: 'blue', label: '总任务数' },
  { key: 'running', icon: 'fa-spinner fa-spin', cls: 'green', label: '运行中' },
  { key: 'completed', icon: 'fa-check-circle', cls: 'green', label: '已完成' },
  { key: 'failed', icon: 'fa-times-circle', cls: 'red', label: '失败' }
];

const taskSearch = ref('');
const taskStatus = ref('');
const taskType = ref('');
const selectedTaskIds = ref([]);
const filteredTasks = computed(() => tasks.value.filter(t => {
  const term = taskSearch.value.trim().toLowerCase();
  const matchSearch = !term || t.name.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
  const matchStatus = !taskStatus.value || t.status === taskStatus.value;
  const matchType = !taskType.value || t.type === taskType.value;
  return matchSearch && matchStatus && matchType;
}));
function filterTasksByStatus(status) {
  taskStatus.value = status === 'all' ? '' : status;
}
const allTasksChecked = computed({
  get() { return filteredTasks.value.length > 0 && filteredTasks.value.every(t => selectedTaskIds.value.includes(t.id)); },
  set(val) {
    if (val) selectedTaskIds.value = filteredTasks.value.map(t => t.id);
    else selectedTaskIds.value = [];
  }
});
function toggleTaskCheck(id, checked) {
  if (checked) {
    if (!selectedTaskIds.value.includes(id)) selectedTaskIds.value.push(id);
  } else {
    selectedTaskIds.value = selectedTaskIds.value.filter(x => x !== id);
  }
}

// 任务详情
const showTaskModal = ref(false);
const currentTask = ref(null);
function openTaskDetail(t) {
  currentTask.value = t;
  showTaskModal.value = true;
}

// 创建任务
const TASK_PARAM_OPTIONS = [
  '节点：机构/人物/技术主题；关系：合作、引用；范围：近5年',
  '算法：Louvain；相似度：余弦；最小社群规模：10',
  '指标：度/介数/接近中心性；TopN：50；权重：引用关系',
  '算法：最短路径；起点：计算机视觉；终点：应用实体',
  '网络类型：知识图谱；实体类型：机构/技术；关系阈值：0.65'
];
const DEFAULT_TASK_PARAMS = {
  network: '节点：机构/人物/技术主题；关系：合作、引用；范围：近5年',
  clustering: '算法：Louvain；相似度：余弦；最小社群规模：10',
  centrality: '指标：度/介数/接近中心性；TopN：50；权重：引用关系',
  path: '算法：最短路径；起点：核心技术；终点：应用实体'
};
const showCreateTaskModal = ref(false);
const newTask = reactive({ name: '', type: '', keyParams: '', execTime: '', desc: '', priority: 'normal' });
function openCreateTaskModal() {
  Object.assign(newTask, { name: '', type: '', keyParams: '', execTime: '', desc: '', priority: 'normal' });
  showCreateTaskModal.value = true;
}
function formatDateTime(v) {
  return v ? String(v).replace('T', ' ').slice(0, 16) : '';
}
function submitCreateTask() {
  if (!newTask.name.trim() || !newTask.type) {
    showToast('请填写必填项：任务名称和分析类型', 'error');
    return;
  }
  const seq = tasks.value.length + 1;
  const id = 'task' + String(100 + seq);
  const createTime = formatDateTime(new Date().toISOString());
  const params = newTask.keyParams || DEFAULT_TASK_PARAMS[newTask.type] || '按当前网络数据执行分析，采用系统默认参数';
  const priorityLabel = newTask.priority === 'high' ? '高' : newTask.priority === 'low' ? '低' : '普通';
  tasks.value.unshift({
    id,
    name: newTask.name.trim(),
    status: 'pending',
    progress: 0,
    type: newTask.type,
    params,
    execTime: formatDateTime(newTask.execTime) || '待定',
    createTime,
    priority: priorityLabel,
    description: newTask.desc.trim() || '根据所选关键参数执行社会网络分析，输出结构化分析结果。',
    inputData: ['当前网络实体与关系数据', '实体类型：机构、人员、技术主题', '关系类型：合作、引用、资助', '数据范围：系统当前有效数据集'],
    logs: [{ time: createTime, stage: '任务创建', detail: '任务已创建并进入等待队列' }],
    intermediateResults: ['已完成任务参数校验', '等待调度服务分配分析资源'],
    outputFiles: [{ name: newTask.name.trim() + '_分析结果.xlsx', type: '分析结果', size: '待生成', status: '待处理' }],
    history: [{ time: createTime, action: '创建任务', operator: '系统用户', detail: '通过任务管理页面创建任务' }]
  });
  taskStats.total += 1;
  showCreateTaskModal.value = false;
  showToast(`任务「${newTask.name.trim()}」创建成功`, 'success');
}

// ==================== Tab4 数据上传 ====================
const uploadTab = ref('template');
function switchUploadTab(tab) {
  uploadTab.value = tab;
}
const TEMPLATES = [
  { key: 'cooperation', name: '技术合作网络分析', desc: '分析技术领域内的合作关系网络', icon: 'fa-project-diagram', cls: 'blue', tag: '网络分析', tagCls: 'background:#e6f7ff;color:#1890ff;' },
  { key: 'citation', name: '论文引用网络分析', desc: '分析学术论文之间的引用关系', icon: 'fa-quote-right', cls: 'green', tag: '引用分析', tagCls: 'background:#f6ffed;color:#52c41a;' },
  { key: 'social', name: '社交网络关系分析', desc: '分析研究人员和机构间的社交关系', icon: 'fa-users', cls: 'orange', tag: '社交分析', tagCls: 'background:#fff2e8;color:#fa8c16;' }
];
const currentTemplate = ref('cooperation');
function selectTemplate(key) {
  currentTemplate.value = key;
}
function triggerDownload(content, fileName, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
function downloadTemplate(format) {
  const tpl = TEMPLATES.find(t => t.key === currentTemplate.value);
  const fileName = tpl.name + '_模板.' + format;
  if (format === 'json') {
    triggerDownload(JSON.stringify({
      nodes: [
        { id: 1, name: '示例节点A', type: '机构', field: '人工智能' },
        { id: 2, name: '示例节点B', type: '人员', field: '机器学习' }
      ],
      edges: [{ source: 1, target: 2, type: '合作', weight: 1 }]
    }, null, 2), fileName, 'application/json');
  } else {
    triggerDownload('id,name,type,field\n1,示例节点A,机构,人工智能\n2,示例节点B,人员,机器学习', fileName, 'text/csv');
  }
  showToast(`模板下载成功：${fileName}`, 'success');
}

const fileInputRef = ref(null);
const uploadDragOver = ref(false);
const uploadedFile = reactive({ exists: true, name: '示例文件.xlsx', size: 1.8 * 1024 * 1024, confirmed: false });
// initial=初始错误警告 / pending=已读取待确认 / confirmed=校验通过 / empty=未上传
const validationPhase = ref('initial');
const showValidationDetail = ref(false);
function toggleValidationDetail() {
  showValidationDetail.value = !showValidationDetail.value;
}
const previewNodes = ref([]);
const previewEdges = ref([]);
const previewSort = reactive({ table: '', key: '', dir: 'asc' });
const SAMPLE_NODES = [
  { id: 'node001', name: '清华大学', type: '研究机构', field: '量子计算' },
  { id: 'node002', name: '潘建伟', type: '研究人员', field: '量子信息' },
  { id: 'node003', name: '量子计算', type: '技术主题', field: '前沿技术' },
  { id: 'node004', name: '中科院量子信息重点实验室', type: '研究机构', field: '量子通信' },
  { id: 'node005', name: '超导量子比特', type: '技术主题', field: '量子计算' }
];
const SAMPLE_EDGES = [
  { source: '清华大学', target: '量子计算', type: '研究合作', weight: '0.95' },
  { source: '潘建伟', target: '量子计算', type: '研究贡献', weight: '0.88' },
  { source: '中科院量子信息重点实验室', target: '超导量子比特', type: '技术研发', weight: '0.82' },
  { source: '清华大学', target: '中科院量子信息重点实验室', type: '联合研究', weight: '0.76' },
  { source: '量子计算', target: '超导量子比特', type: '技术关联', weight: '0.71' }
];
function sortPreview(table, key) {
  if (previewSort.table === table && previewSort.key === key) {
    previewSort.dir = previewSort.dir === 'asc' ? 'desc' : 'asc';
  } else {
    previewSort.table = table;
    previewSort.key = key;
    previewSort.dir = 'asc';
  }
}
function sortedPreview(list) {
  if (previewSort.table && previewSort.key) {
    const key = previewSort.key;
    const dir = previewSort.dir === 'asc' ? 1 : -1;
    return list.slice().sort((a, b) => String(a[key]).localeCompare(String(b[key]), 'zh-CN') * dir);
  }
  return list;
}
const displayedPreviewNodes = computed(() => sortedPreview(previewNodes.value));
const displayedPreviewEdges = computed(() => sortedPreview(previewEdges.value));
const selectedPreviewRow = ref(null);
function selectPreviewRow(table, row) {
  const labels = table === 'nodes' ? ['ID', '名称', '类型', '领域'] : ['源节点', '目标节点', '关系类型', '权重'];
  const keys = table === 'nodes' ? ['id', 'name', 'type', 'field'] : ['source', 'target', 'type', 'weight'];
  selectedPreviewRow.value = {
    title: (table === 'nodes' ? '节点数据' : '连接数据') + ' · 记录详情',
    items: labels.map((label, i) => ({ label, value: row[keys[i]] }))
  };
}
function formatFileSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}
function triggerFilePicker() {
  fileInputRef.value && fileInputRef.value.click();
}
function handleFileSelected(e) {
  const file = e.target.files[0];
  if (file) loadUploadedFile(file);
}
function loadUploadedFile(file) {
  uploadedFile.exists = true;
  uploadedFile.name = file.name;
  uploadedFile.size = file.size;
  uploadedFile.confirmed = false;
  validationPhase.value = 'pending';
  showValidationDetail.value = false;
  previewNodes.value = [];
  previewEdges.value = [];
  selectedPreviewRow.value = null;
}
function onFileDrop(e) {
  uploadDragOver.value = false;
  const file = e.dataTransfer.files[0];
  if (file) loadUploadedFile(file);
}
function confirmUploadedFile() {
  if (!uploadedFile.exists) {
    showToast('请先选择要确认的文件', 'error');
    return;
  }
  uploadedFile.confirmed = true;
  validationPhase.value = 'confirmed';
  previewNodes.value = SAMPLE_NODES.slice();
  previewEdges.value = SAMPLE_EDGES.slice();
  showToast('文件校验通过，已载入预览数据', 'success');
}
function resetUploadData(showMessage) {
  uploadedFile.exists = false;
  uploadedFile.name = '';
  uploadedFile.size = 0;
  uploadedFile.confirmed = false;
  validationPhase.value = 'empty';
  showValidationDetail.value = false;
  previewNodes.value = [];
  previewEdges.value = [];
  selectedPreviewRow.value = null;
  if (fileInputRef.value) fileInputRef.value.value = '';
  if (showMessage) showToast('数据已清空');
}
function removeUploadedFile() {
  resetUploadData(false);
}
function clearUploadData() {
  resetUploadData(true);
}

// 导入进度
const showImportModal = ref(false);
const importProgress = ref(0);
const importStatus = ref('准备导入');
const importMessage = ref('');
const importCountdown = ref(0);
const importTimers = [];
function clearImportTimers() {
  while (importTimers.length) clearTimeout(importTimers.shift());
}
function importData() {
  if (!uploadedFile.exists || !uploadedFile.confirmed) {
    showToast('请先确认文件并完成数据校验', 'error');
    return;
  }
  clearImportTimers();
  showImportModal.value = true;
  importProgress.value = 0;
  importStatus.value = '准备导入';
  importMessage.value = '正在导入 ' + uploadedFile.name + '...';
  importCountdown.value = 0;
  importTimers.push(setTimeout(() => { importProgress.value = 28; importStatus.value = '已读取文件结构'; }, 250));
  importTimers.push(setTimeout(() => { importProgress.value = 56; importStatus.value = '已导入节点数据 5 条'; }, 650));
  importTimers.push(setTimeout(() => { importProgress.value = 82; importStatus.value = '已导入连接数据 5 条'; }, 1050));
  importTimers.push(setTimeout(() => {
    importProgress.value = 100;
    importStatus.value = '已导入完成';
    importMessage.value = '数据导入完成，进度 100%';
    importTimers.push(setTimeout(() => {
      importMessage.value = '即将跳转到任务管理页面，您可以使用上传的数据开始分析任务';
      importStatus.value = '导入完成';
      let seconds = 5;
      importCountdown.value = seconds;
      const timer = setInterval(() => {
        seconds -= 1;
        if (seconds <= 0) {
          clearInterval(timer);
          showImportModal.value = false;
          switchTab('task-management');
          showToast('数据导入完成，已进入任务管理页面', 'success');
          return;
        }
        importCountdown.value = seconds;
      }, 1000);
    }, 500));
  }, 1450));
}
onUnmounted(clearImportTimers);

// ==================== Tab5 网络维护 ====================
const NODE_ICON_BY_TYPE = {
  institution: { color: 'blue', icon: 'fa-university' },
  person: { color: 'green', icon: 'fa-user-graduate' },
  technology: { color: 'purple', icon: 'fa-atom' },
  topic: { color: 'orange', icon: 'fa-tag' }
};
const DATA_SOURCE_LABEL = {
  manual: '手动录入',
  official: '官方数据集',
  paper: '论文数据库',
  patent: '专利数据库',
  project: '项目数据库'
};
const maintenanceNodes = ref([
  { id: 'node001', name: '清华大学', type: 'institution', tags: ['研究机构', '高校'], weight: 0.95, dataSource: 'official', icon: 'fa-university', color: 'blue', desc: '中国顶尖高校' },
  { id: 'node002', name: '潘建伟', type: 'person', tags: ['研究人员', '院士'], weight: 0.88, dataSource: 'paper', icon: 'fa-user-graduate', color: 'green', desc: '量子通信领域专家' },
  { id: 'node003', name: '量子计算', type: 'technology', tags: ['技术领域', '前沿技术'], weight: 0.92, dataSource: 'patent', icon: 'fa-atom', color: 'purple', desc: '下一代计算技术' },
  { id: 'node004', name: '深度学习', type: 'technology', tags: ['技术领域', '人工智能'], weight: 0.9, dataSource: 'paper', icon: 'fa-brain', color: 'orange', desc: '机器学习分支' },
  { id: 'node005', name: '中科院量子所', type: 'institution', tags: ['研究机构', '科研院所'], weight: 0.87, dataSource: 'official', icon: 'fa-flask', color: 'blue', desc: '量子研究专业机构' },
  { id: 'node006', name: '自然语言处理', type: 'technology', tags: ['技术领域', 'NLP'], weight: 0.85, dataSource: 'project', icon: 'fa-robot', color: 'green', desc: '人工智能核心技术' }
]);
const nodeSearch = ref('');
const filteredMaintenanceNodes = computed(() => {
  const term = nodeSearch.value.trim().toLowerCase();
  if (!term) return maintenanceNodes.value;
  return maintenanceNodes.value.filter(n =>
    n.name.toLowerCase().includes(term) ||
    n.id.toLowerCase().includes(term) ||
    n.tags.join(' ').toLowerCase().includes(term)
  );
});
function reanalyzeNetwork() {
  showToast('网络重新分析已开始，统计指标与可视化将随后更新', 'success');
}
function exportNetworkData() {
  const data = {
    nodes: maintenanceNodes.value.slice(0, 3).map(n => ({ id: n.id, name: n.name, type: n.type, weight: n.weight })),
    exportTime: new Date().toISOString()
  };
  triggerDownload(JSON.stringify(data, null, 2), 'network_data_' + Date.now() + '.json', 'application/json');
  showToast('网络数据导出成功', 'success');
}

// 添加/编辑节点
const showNodeFormModal = ref(false);
const editingNodeId = ref(null);
const nodeForm = reactive({ name: '', type: '', tags: '', weight: 0.5, dataSource: 'manual', desc: '' });
function openAddNode() {
  editingNodeId.value = null;
  Object.assign(nodeForm, { name: '', type: '', tags: '', weight: 0.5, dataSource: 'manual', desc: '' });
  showNodeFormModal.value = true;
}
function openEditNode(n) {
  editingNodeId.value = n.id;
  Object.assign(nodeForm, {
    name: n.name,
    type: n.type,
    tags: n.tags.join(', '),
    weight: n.weight,
    dataSource: n.dataSource,
    desc: n.desc || ''
  });
  showNodeFormModal.value = true;
}
function saveNode() {
  if (!nodeForm.name.trim() || !nodeForm.type) {
    showToast('请填写必填项：节点名称和节点类型', 'error');
    return;
  }
  const tags = nodeForm.tags.split(/[,，]/).map(t => t.trim()).filter(Boolean);
  const visual = NODE_ICON_BY_TYPE[nodeForm.type];
  if (editingNodeId.value) {
    const target = maintenanceNodes.value.find(n => n.id === editingNodeId.value);
    if (target) {
      target.name = nodeForm.name.trim();
      target.type = nodeForm.type;
      target.tags = tags.length ? tags : [KEY_TYPE_LABEL[nodeForm.type]];
      target.weight = Number(nodeForm.weight) || 0.5;
      target.dataSource = nodeForm.dataSource;
      target.desc = nodeForm.desc.trim();
      target.icon = visual.icon;
      target.color = visual.color;
    }
    showToast(`节点「${nodeForm.name.trim()}」更新成功`, 'success');
  } else {
    const nextNum = maintenanceNodes.value.length + 1;
    maintenanceNodes.value.push({
      id: 'node' + String(nextNum).padStart(3, '0'),
      name: nodeForm.name.trim(),
      type: nodeForm.type,
      tags: tags.length ? tags : [KEY_TYPE_LABEL[nodeForm.type]],
      weight: Number(nodeForm.weight) || 0.5,
      dataSource: nodeForm.dataSource,
      icon: visual.icon,
      color: visual.color,
      desc: nodeForm.desc.trim()
    });
    showToast(`节点「${nodeForm.name.trim()}」创建成功`, 'success');
  }
  showNodeFormModal.value = false;
}
function deleteNode(n) {
  if (!window.confirm(`确定要删除节点 "${n.name}" 吗？\n\n删除后，该节点及其所有相关的连接将从网络中被永久移除。`)) return;
  const idx = maintenanceNodes.value.findIndex(x => x.id === n.id);
  if (idx >= 0) maintenanceNodes.value.splice(idx, 1);
  showToast(`节点「${n.name}」已删除`);
}

// 节点详情
const NODE_DETAIL_MAP = {
  node001: {
    id: 'node001', name: '清华大学', type: '研究机构', tags: '高校、双一流', weight: '0.95', source: '官方数据集',
    networkPosition: '机构层 · 量子计算合作子网核心节点，位于研究机构与技术主题的高密度连接区域。',
    centrality: '度中心性 0.95 · 中介中心性 0.81 · 接近中心性 0.76',
    description: '承担量子信息、人工智能等方向的基础研究与人才培养，在当前网络中承担跨机构合作枢纽角色。',
    connections: [
      { target: '潘建伟', relation: '科研人员合作', strength: '0.92' },
      { target: '量子计算', relation: '技术研究关联', strength: '0.89' },
      { target: '中科院量子所', relation: '联合研究', strength: '0.84' },
      { target: '超导量子比特', relation: '成果主题关联', strength: '0.76' }
    ],
    papers: ['《量子计算体系结构与关键技术研究》（2024）', '《超导量子比特控制技术进展》（2023）', '《量子信息科学交叉研究网络分析》（2023）'],
    projects: ['量子信息科学国家实验室协同研究项目', '量子计算核心器件与系统验证项目', '新一代人工智能基础理论研究专项']
  },
  node002: {
    id: 'node002', name: '潘建伟', type: '研究人员', tags: '院士、量子信息', weight: '0.88', source: '论文数据库',
    networkPosition: '研究人员层 · 量子信息研究社群核心，连接高校、科研院所与量子通信技术主题。',
    centrality: '度中心性 0.88 · 中介中心性 0.86 · 接近中心性 0.73',
    description: '在量子通信、量子计算和量子精密测量方向具有较高学术影响力，是网络中的关键人才节点。',
    connections: [
      { target: '清华大学', relation: '机构任职/合作', strength: '0.92' },
      { target: '量子计算', relation: '研究方向关联', strength: '0.90' },
      { target: '中科院量子所', relation: '学术合作', strength: '0.83' },
      { target: '量子通信', relation: '论文主题关联', strength: '0.79' }
    ],
    papers: ['《量子纠缠与量子通信实验研究》（2024）', '《量子计算发展路径与关键问题》（2023）', '《量子信息领域科研合作网络演化》（2022）'],
    projects: ['量子通信关键技术验证项目', '量子计算基础理论与实验平台项目', '国家重大科技基础设施协同建设项目']
  },
  node003: {
    id: 'node003', name: '量子计算', type: '技术领域', tags: '前沿技术、量子信息', weight: '0.92', source: '专利数据库',
    networkPosition: '技术领域层 · 量子信息技术主节点，位于量子算法、量子芯片和量子软件等主题的中心位置。',
    centrality: '度中心性 0.92 · 中介中心性 0.89 · 接近中心性 0.82',
    description: '汇聚量子算法、量子硬件、量子纠错和量子应用等方向，是当前网络中跨机构、跨成果类型的核心技术节点。',
    connections: [
      { target: '清华大学', relation: '研究机构关联', strength: '0.89' },
      { target: '潘建伟', relation: '专家关联', strength: '0.90' },
      { target: '超导量子比特', relation: '关键技术关联', strength: '0.94' },
      { target: '量子纠错', relation: '技术主题关联', strength: '0.87' },
      { target: '中科院量子所', relation: '科研机构关联', strength: '0.84' }
    ],
    papers: ['《量子计算硬件体系与算法协同演进》（2024）', '《量子纠错编码的工程化实现路径》（2023）', '《面向产业应用的量子算法研究综述》（2022）'],
    projects: ['量子计算原型机研制项目', '量子算法与软件生态培育项目', '量子信息前沿技术战略预研项目']
  },
  node004: {
    id: 'node004', name: '深度学习', type: '技术领域', tags: '人工智能、机器学习', weight: '0.90', source: '论文数据库',
    networkPosition: '技术领域层 · 人工智能研究网络核心主题，与计算机视觉、自然语言处理和大模型形成高频关联。',
    centrality: '度中心性 0.90 · 中介中心性 0.84 · 接近中心性 0.80',
    description: '覆盖表示学习、神经网络、强化学习和生成式模型等方向，是人工智能网络中连接基础算法与应用场景的枢纽。',
    connections: [
      { target: '自然语言处理', relation: '技术主题关联', strength: '0.93' },
      { target: '计算机视觉', relation: '技术主题关联', strength: '0.91' },
      { target: '清华大学', relation: '机构研究关联', strength: '0.78' },
      { target: '大语言模型', relation: '技术演进关联', strength: '0.88' }
    ],
    papers: ['《深度学习模型的可解释性与鲁棒性研究》（2024）', '《生成式人工智能基础模型训练方法》（2023）', '《深度学习技术产业化应用图谱分析》（2022）'],
    projects: ['人工智能基础模型与可信学习项目', '智能感知与决策关键技术项目', '深度学习算法工程化验证项目']
  },
  node005: {
    id: 'node005', name: '中科院量子所', type: '研究机构', tags: '科研院所、量子信息', weight: '0.87', source: '官方数据集',
    networkPosition: '机构层 · 量子信息专业研究机构节点，位于量子通信、量子计算和量子器件关系链路交汇处。',
    centrality: '度中心性 0.87 · 中介中心性 0.79 · 接近中心性 0.71',
    description: '聚焦量子信息基础理论、实验技术与器件研发，在量子计算研究网络中承担专业化支撑作用。',
    connections: [
      { target: '量子计算', relation: '技术研发', strength: '0.84' },
      { target: '清华大学', relation: '联合研究', strength: '0.84' },
      { target: '潘建伟', relation: '专家合作', strength: '0.83' },
      { target: '超导量子比特', relation: '器件研发关联', strength: '0.81' }
    ],
    papers: ['《量子器件制备与测控技术进展》（2024）', '《量子通信网络节点协同机制研究》（2023）', '《量子信息实验平台开放共享实践》（2022）'],
    projects: ['量子器件与测控系统研发项目', '量子通信网络实验验证项目', '量子信息公共技术平台建设项目']
  },
  node006: {
    id: 'node006', name: '自然语言处理', type: '技术领域', tags: '人工智能、NLP', weight: '0.85', source: '项目数据库',
    networkPosition: '技术领域层 · 语言智能研究子网核心，与深度学习、知识图谱和大语言模型形成多跳关联。',
    centrality: '度中心性 0.85 · 中介中心性 0.80 · 接近中心性 0.77',
    description: '覆盖文本理解、信息抽取、机器翻译和对话系统等方向，是连接知识资源与智能应用的重要技术节点。',
    connections: [
      { target: '深度学习', relation: '算法基础关联', strength: '0.93' },
      { target: '知识图谱', relation: '知识增强关联', strength: '0.86' },
      { target: '大语言模型', relation: '技术演进关联', strength: '0.91' },
      { target: '清华大学', relation: '论文研究关联', strength: '0.75' }
    ],
    papers: ['《自然语言处理技术发展与应用趋势》（2024）', '《面向知识增强的大语言模型研究》（2023）', '《跨模态语义理解方法与评测体系》（2022）'],
    projects: ['自然语言理解与知识服务项目', '多语种智能处理关键技术项目', '大语言模型安全评测与治理项目']
  }
};
const showNodeDetailModal = ref(false);
const currentNodeDetail = ref(null);
const currentNodeAnalysis = computed(() => {
  if (!currentNodeDetail.value) return null;
  return KEY_NODE_PROFILES[currentNodeDetail.value.name] || {
    role: `${currentNodeDetail.value.type}网络节点：在${currentNodeDetail.value.tags}关系网络中承担连接与信息传导作用。`,
    community: `${currentNodeDetail.value.tags}关联社区 · 基于当前节点连接关系动态识别`,
    reasons: [
      `直接关联 ${currentNodeDetail.value.connections.length} 个节点，覆盖多类实体和关系类型。`,
      '节点中心性与连接度处于当前子网较高水平，可支持跨节点的信息触达。',
      '与研究成果、机构或项目保持关联，在网络演化中具有持续活跃特征。'
    ]
  };
});
function openNodeDetail(n) {
  currentNodeDetail.value = NODE_DETAIL_MAP[n.id] || null;
  showNodeDetailModal.value = true;
}
// 详情弹窗中的星形网络关系图坐标
const detailGraphLinks = computed(() => {
  const detail = currentNodeDetail.value;
  if (!detail) return [];
  const conns = detail.connections || [];
  return conns.map((c, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / Math.max(conns.length, 1);
    const tx = 380 + Math.cos(angle) * 250;
    const ty = 180 + Math.sin(angle) * 122;
    return {
      ...c,
      tx: tx.toFixed(1),
      ty: ty.toFixed(1),
      lx: ((380 + tx) / 2).toFixed(1),
      ly: ((180 + ty) / 2 - 7).toFixed(1),
      ly2: ((180 + ty) / 2 + 7).toFixed(1),
      rx: (tx - 75).toFixed(1),
      ry: (ty - 28).toFixed(1),
      labelLines: graphLabelParts(c.target),
      relationShort: String(c.relation || '').slice(0, 10)
    };
  });
});
function graphLabelParts(label) {
  const text = String(label == null ? '' : label);
  if (text.length <= 8) return [text];
  return [text.slice(0, 8), text.slice(8, 16)];
}
</script>

<template>
  <div class="sna-page">
    <!-- 顶部导航栏（固定） -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'network-visualization' }" @click="switchTab('network-visualization')">
          <i class="fas fa-project-diagram"></i> 网络可视化
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'result-analysis' }" @click="switchTab('result-analysis')">
          <i class="fas fa-chart-line"></i> 结果分析
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'task-management' }" @click="switchTab('task-management')">
          <i class="fas fa-clipboard-list"></i> 任务管理
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'data-upload' }" @click="switchTab('data-upload')">
          <i class="fas fa-cloud-upload-alt"></i> 数据上传
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'network-maintenance' }" @click="switchTab('network-maintenance')">
          <i class="fas fa-tools"></i> 网络维护
        </a>
      </nav>
    </div>

    <!-- 主内容 -->
    <div class="main-content">

      <!-- ========== Tab1 网络可视化 ========== -->
      <div v-show="activeTab === 'network-visualization'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title">
              <i class="fas fa-project-diagram"></i> 网络可视化
            </div>
          </div>

          <!-- 可视化设置与控制面板 -->
          <div class="control-panel">
            <div class="control-panel-title">
              <i class="fas fa-sliders-h"></i> 可视化设置与控制
            </div>

            <div class="control-row">
              <div>
                <label class="control-label">布局方式</label>
                <select v-model="layoutMode" class="control-select">
                  <option value="force">力导向布局</option>
                  <option value="circular">环形布局</option>
                  <option value="hierarchical">层次布局</option>
                  <option value="random">随机布局</option>
                </select>
              </div>
              <div>
                <label class="control-label">标签显示</label>
                <select v-model="labelMode" class="control-select">
                  <option value="all">全部显示</option>
                  <option value="important">仅重要节点</option>
                  <option value="none">隐藏标签</option>
                </select>
              </div>
              <div>
                <label class="control-label">节点大小</label>
                <select v-model="nodeSizeMode" class="control-select">
                  <option value="degree">度数</option>
                  <option value="funding">经费</option>
                  <option value="citation">引用数</option>
                  <option value="uniform">统一大小</option>
                </select>
              </div>
            </div>

            <div class="control-row">
              <div class="control-slider-field">
                <label class="control-label">缩放比例</label>
                <div class="slider-wrapper">
                  <input type="range" class="slider-input" min="0.5" max="3" step="0.1" v-model.number="zoom">
                  <span class="slider-value">{{ zoomPercent }}</span>
                </div>
              </div>
              <div>
                <label class="control-label">节点颜色</label>
                <select v-model="nodeColorMode" class="control-select">
                  <option value="type">按类型</option>
                  <option value="community">按社群</option>
                  <option value="centrality">按中心性</option>
                </select>
              </div>
            </div>

            <div class="control-row">
              <button class="btn-advanced" :class="{ active: clusteringEnabled }" @click="toggleClustering">
                <i class="fas fa-object-group"></i> 聚类
              </button>
              <button class="btn-advanced" :class="{ active: physicsEnabled }" @click="togglePhysics">
                <i class="fas fa-atom"></i> 物理引擎
              </button>
              <button class="btn-advanced" @click="resetNetwork">
                <i class="fas fa-redo"></i> 重置视图
              </button>
              <button class="btn-advanced" @click="exportNetworkImage">
                <i class="fas fa-download"></i> 导出图像
              </button>
            </div>
          </div>

          <!-- 网络可视化区域（SVG 实现） -->
          <div class="network-card">
            <div class="network-container">
              <svg ref="networkSvgRef" class="network-canvas" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet"
                   @wheel.prevent="onWheel" @click="canvasBackgroundClick">
                <defs>
                  <radialGradient id="snBg" cx="50%" cy="42%" r="75%">
                    <stop offset="0%" stop-color="#ffffff"></stop>
                    <stop offset="100%" stop-color="#eef3f8"></stop>
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="1000" height="600" fill="url(#snBg)"></rect>
                <g :transform="networkTransform">
                  <!-- 聚类虚线圈 -->
                  <g v-if="clusteringEnabled">
                    <g v-for="c in clusterOverlays" :key="'cluster-' + c.key">
                      <circle class="sn-cluster" :cx="c.cx" :cy="c.cy" :r="c.r" :stroke="c.color"></circle>
                      <text class="sn-cluster-label" :x="c.cx" :y="c.cy - c.r + 20" :fill="c.color">{{ c.name }}</text>
                    </g>
                  </g>
                  <!-- 连线 -->
                  <g class="sn-edges">
                    <template v-for="e in renderedEdges" :key="e.key">
                      <line class="sn-edge"
                            :class="{ related: selectedNode && (e.source === selectedNode.id || e.target === selectedNode.id), selected: selectedEdgeKey === e.key }"
                            :x1="e.sx" :y1="e.sy" :x2="e.tx" :y2="e.ty"></line>
                      <line class="sn-edge-hit" :x1="e.sx" :y1="e.sy" :x2="e.tx" :y2="e.ty"
                            @mouseenter="showEdgeTooltip($event, e)" @mousemove="showEdgeTooltip($event, e)"
                            @mouseleave="edgeTooltip.visible = false" @click.stop="selectEdge(e)"></line>
                    </template>
                  </g>
                  <!-- 节点 -->
                  <g v-for="n in NETWORK_NODES" :key="n.id" class="sn-node-group" :class="{ dimmed: nodeDimmed(n) }"
                     @click.stop @pointerdown="onNodePointerDown($event, n)" @pointermove="onNodePointerMove($event)"
                     @pointerup="onNodePointerUp" @pointercancel="onNodePointerUp">
                    <circle v-if="highlightedNames.includes(n.name) || (selectedNode && selectedNode.id === n.id)"
                            class="sn-node-halo" :cx="positions[n.id].x" :cy="positions[n.id].y" :r="nodeRadius(n) + 9"></circle>
                    <circle class="sn-node-circle" :cx="positions[n.id].x" :cy="positions[n.id].y"
                            :r="nodeRadius(n)" :fill="nodeFill(n)"></circle>
                    <text v-if="nodeLabelVisible(n)" class="sn-node-label"
                          :x="positions[n.id].x" :y="positions[n.id].y + nodeRadius(n) + 16">{{ n.name }}</text>
                  </g>
                </g>
              </svg>

              <!-- 缩放控制按钮 -->
              <div class="zoom-controls">
                <button class="zoom-btn" title="放大" @click="zoomIn"><i class="fas fa-plus"></i></button>
                <button class="zoom-btn" title="缩小" @click="zoomOut"><i class="fas fa-minus"></i></button>
                <button class="zoom-btn" title="适应屏幕" @click="resetNetwork"><i class="fas fa-expand"></i></button>
              </div>
            </div>
          </div>
        </div>

        <!-- 节点信息面板 -->
        <div v-if="selectedNode" class="node-info-panel">
          <div class="node-info-header">
            <h3>{{ selectedNode.name }}</h3>
            <div class="node-type">{{ NODE_TYPE_CONFIG[selectedNode.type].label }}</div>
            <button class="btn-close-info" @click="closeNodeInfo"><i class="fas fa-times"></i></button>
          </div>
          <div class="node-info-body">
            <div class="info-section">
              <div class="info-section-title"><i class="fas fa-chart-bar"></i> 核心指标</div>
              <div class="info-item">
                <span class="info-item-label">度中心性</span>
                <span class="info-item-value">{{ selectedNode.degree }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-label">接近中心性</span>
                <span class="info-item-value">{{ selectedNodeCloseness }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-label">中介中心性</span>
                <span class="info-item-value">{{ selectedNodeBetweenness }}</span>
              </div>
            </div>
            <div class="info-section">
              <div class="info-section-title"><i class="fas fa-database"></i> 详细信息</div>
              <div class="info-item">
                <span class="info-item-label">所属机构</span>
                <span class="info-item-value">{{ selectedNode.institution }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-label">研究领域</span>
                <span class="info-item-value">{{ selectedNode.field }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-label">活跃度</span>
                <span class="info-item-value">{{ selectedNode.activity }}</span>
              </div>
            </div>
            <div class="info-section">
              <div class="info-section-title"><i class="fas fa-link"></i> 关联实体</div>
              <div class="related-entities">
                <span v-for="r in selectedNode.related" :key="r" class="entity-tag">{{ r }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 连线信息提示 -->
        <div v-show="edgeTooltip.visible" class="edge-tooltip"
             :style="{ left: edgeTooltip.x + 'px', top: edgeTooltip.y + 'px' }">
          <div class="edge-tooltip-title">{{ edgeTooltip.title }}</div>
          <div class="edge-tooltip-content">{{ edgeTooltip.content }}</div>
        </div>
      </div>
      <!-- ========== Tab2 结果分析 ========== -->
      <div v-show="activeTab === 'result-analysis'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title">
              <i class="fas fa-chart-line"></i> 结果分析
            </div>
          </div>

          <!-- 网络统计指标 -->
          <div class="stats-grid">
            <div v-for="m in METRIC_CARDS" :key="m.key" class="stat-card stat-clickable" @click="openMetric(m.key)">
              <div class="stat-icon" :class="m.cls"><i class="fas" :class="m.icon"></i></div>
              <div class="stat-value">{{ m.value }}</div>
              <div class="stat-label">{{ m.label }}</div>
            </div>
          </div>

          <!-- 关键节点列表 -->
          <div class="table-card">
            <div class="chart-title">
              <i class="fas fa-star" style="color:#faad14;"></i> 关键节点列表
            </div>
            <div class="filter-row">
              <label class="control-label" style="min-width:60px;">节点类型</label>
              <select v-model="keyNodeTypeFilter" class="filter-select">
                <option value="">全部类型</option>
                <option value="person">研究人员</option>
                <option value="institution">研究机构</option>
                <option value="topic">研究主题</option>
                <option value="technology">技术领域</option>
              </select>
              <label class="control-label" style="min-width:80px; margin-left:16px;">排序依据</label>
              <select v-model="keyNodeSortBy" class="filter-select">
                <option value="degree">度中心性</option>
                <option value="betweenness">中介中心性</option>
                <option value="closeness">接近中心性</option>
              </select>
            </div>
            <div class="table-scroll">
              <table class="data-table key-node-table">
                <thead>
                  <tr>
                    <th style="width:60px;">排名</th>
                    <th>节点名称</th>
                    <th>类型</th>
                    <th>度中心性</th>
                    <th>中介中心性</th>
                    <th>接近中心性</th>
                    <th style="width:100px;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(n, i) in visibleKeyNodes" :key="n.name" class="key-node-clickable" @click="openKeyNodeAnalysis(n.name)">
                    <td><span class="rank-badge" :class="i < 3 ? 'top' : 'normal'">{{ i + 1 }}</span></td>
                    <td><strong>{{ n.name }}</strong></td>
                    <td><span class="entity-tag" :style="KEY_TYPE_STYLE[n.type]">{{ KEY_TYPE_LABEL[n.type] }}</span></td>
                    <td>{{ n.degree }}</td>
                    <td>{{ n.betweenness.toFixed(3) }}</td>
                    <td>{{ n.closeness.toFixed(3) }}</td>
                    <td>
                      <button class="btn-inline" @click.stop="openKeyNodeAnalysis(n.name)">
                        <i class="fas fa-eye"></i> 详情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 社区(集群)列表 -->
          <div class="table-card">
            <div class="chart-title">
              <i class="fas fa-object-group" style="color:#1890ff;"></i> 社区(集群)列表
            </div>
            <div class="filter-row">
              <label class="control-label" style="min-width:60px;">凝聚度</label>
              <select v-model="clusterCohesionFilter" class="filter-select">
                <option value="">全部</option>
                <option value="high">高(&gt;0.7)</option>
                <option value="medium">中(0.5-0.7)</option>
                <option value="low">低(&lt;0.5)</option>
              </select>
              <label class="control-label" style="min-width:80px; margin-left:16px;">节点数量</label>
              <select v-model="clusterSizeFilter" class="filter-select">
                <option value="">全部</option>
                <option value="large">大型(&gt;100)</option>
                <option value="medium">中型(50-100)</option>
                <option value="small">小型(&lt;50)</option>
              </select>
            </div>
            <div class="cluster-grid">
              <div v-for="c in filteredClusters" :key="c.id" class="cluster-card" @click="openClusterDetail(c)">
                <div class="cluster-card-head">
                  <div class="cluster-card-id" :style="{ background: 'linear-gradient(135deg, ' + c.color + ' 0%, ' + c.color + 'dd 100%)' }">{{ c.id }}</div>
                  <div class="cluster-card-heading">
                    <div class="cluster-card-name">{{ c.name }}</div>
                    <div class="cluster-card-sub">{{ c.subtitle }} · {{ c.size }} 个节点</div>
                  </div>
                  <div class="cluster-card-cohesion">
                    <div class="cluster-cohesion-value" :style="{ color: cohesionColor(c) }">{{ (c.cohesion * 100).toFixed(1) }}%</div>
                    <div class="cluster-cohesion-label">凝聚度</div>
                  </div>
                </div>
                <div class="cluster-card-foot">
                  <div class="cluster-core-label">核心节点({{ c.cores.length }}个)：</div>
                  <div class="related-entities">
                    <span v-for="core in c.cores" :key="core" class="entity-tag">{{ core }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab3 任务管理 ========== -->
      <div v-show="activeTab === 'task-management'" class="tab-content">
        <div class="module-section">
          <div class="module-header module-header-between">
            <div class="module-title">
              <i class="fas fa-clipboard-list"></i> 任务管理
            </div>
            <button class="btn-filter" @click="openCreateTaskModal">
              <i class="fas fa-plus"></i> 创建任务
            </button>
          </div>

          <!-- 统计卡片 -->
          <div class="stats-grid">
            <div v-for="s in TASK_STAT_CARDS" :key="s.key" class="stat-card stat-clickable"
                 :class="{ active: taskStatus === (s.key === 'total' ? '' : s.key) }"
                 @click="filterTasksByStatus(s.key)">
              <div class="stat-icon" :class="s.cls"><i class="fas" :class="s.icon"></i></div>
              <div class="stat-value">{{ taskStats[s.key] }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
          </div>

          <!-- 搜索与筛选栏 -->
          <div class="filter-section">
            <div class="filter-row" style="margin-bottom:0;">
              <div class="search-wrapper">
                <input type="text" v-model="taskSearch" class="search-input" placeholder="搜索任务名称或ID...">
                <i class="fas fa-search search-icon"></i>
              </div>
              <select v-model="taskStatus" class="filter-select">
                <option value="">全部状态</option>
                <option value="running">运行中</option>
                <option value="completed">已完成</option>
                <option value="failed">失败</option>
                <option value="pending">等待中</option>
              </select>
              <select v-model="taskType" class="filter-select">
                <option value="">全部类型</option>
                <option value="network">网络分析</option>
                <option value="clustering">聚类分析</option>
                <option value="centrality">中心性计算</option>
                <option value="path">路径分析</option>
              </select>
            </div>
          </div>

          <!-- 任务列表 -->
          <div class="table-card">
            <div class="table-scroll">
              <table class="data-table task-table">
                <thead>
                  <tr>
                    <th style="width:40px;"><input type="checkbox" v-model="allTasksChecked"></th>
                    <th>任务名称</th>
                    <th style="width:110px;">状态</th>
                    <th style="width:190px;">进度</th>
                    <th style="width:110px;">类型</th>
                    <th style="width:250px;">关键参数</th>
                    <th style="width:150px;">执行时间</th>
                    <th style="width:150px;">创建时间</th>
                    <th style="width:90px;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in filteredTasks" :key="t.id" class="task-row" @click="openTaskDetail(t)">
                    <td @click.stop>
                      <input type="checkbox" :checked="selectedTaskIds.includes(t.id)"
                             @change="toggleTaskCheck(t.id, $event.target.checked)">
                    </td>
                    <td>
                      <div class="task-name">{{ t.name }}</div>
                      <div class="task-id">ID: {{ t.id }}</div>
                    </td>
                    <td>
                      <span class="status-badge" :class="t.status">
                        <i class="fas" :class="TASK_STATUS_CONFIG[t.status].icon"></i> {{ TASK_STATUS_CONFIG[t.status].label }}
                      </span>
                    </td>
                    <td>
                      <div class="progress-wrapper">
                        <div class="progress-bar">
                          <div class="progress-fill" :class="t.status" :style="{ width: t.progress + '%' }"></div>
                        </div>
                        <span class="progress-text">{{ t.progress }}%</span>
                      </div>
                    </td>
                    <td>{{ TASK_TYPE_CONFIG[t.type] }}</td>
                    <td class="task-params-cell">{{ t.params }}</td>
                    <td>{{ t.execTime }}</td>
                    <td>{{ t.createTime }}</td>
                    <td @click.stop>
                      <button class="btn-inline" @click="openTaskDetail(t)"><i class="fas fa-eye"></i></button>
                    </td>
                  </tr>
                  <tr v-if="filteredTasks.length === 0">
                    <td colspan="9" class="table-empty">暂无符合条件的任务</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- ========== Tab4 数据上传 ========== -->
      <div v-show="activeTab === 'data-upload'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title">
              <i class="fas fa-cloud-upload-alt"></i> 数据上传
            </div>
          </div>

          <!-- 导入方式切换 + 上传区 -->
          <div class="upload-card">
            <div class="upload-tabs">
              <div class="upload-tab" :class="{ active: uploadTab === 'template' }" @click="switchUploadTab('template')">
                <i class="fas fa-file-alt"></i> 模板导入
              </div>
              <div class="upload-tab" :class="{ active: uploadTab === 'file' }" @click="switchUploadTab('file')">
                <i class="fas fa-upload"></i> 文件上传
              </div>
            </div>

            <!-- 模板导入视图 -->
            <div v-show="uploadTab === 'template'" class="upload-template-layout">
              <div>
                <div class="chart-title"><i class="fas fa-list"></i> 选择模板</div>
                <div v-for="t in TEMPLATES" :key="t.key" class="template-item"
                     :class="{ active: currentTemplate === t.key }" @click="selectTemplate(t.key)">
                  <div class="template-item-inner">
                    <div class="template-icon" :class="t.cls"><i class="fas" :class="t.icon"></i></div>
                    <div class="template-info">
                      <div class="template-name">{{ t.name }}</div>
                      <div class="template-desc">{{ t.desc }}</div>
                      <div class="template-tag" :style="t.tagCls">{{ t.tag }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="chart-title"><i class="fas fa-download"></i> 下载模板</div>
                <div class="download-card">
                  <div class="download-card-head">
                    <div>
                      <div class="download-name">JSON 模板</div>
                      <div class="download-hint">结构化数据格式，适用于程序化处理</div>
                    </div>
                    <button class="btn-advanced" @click="downloadTemplate('json')">
                      <i class="fas fa-download"></i> 下载
                    </button>
                  </div>
                  <pre class="code-block">{
  "nodes": [...],
  "edges": [...]
}</pre>
                </div>
                <div class="download-card">
                  <div class="download-card-head">
                    <div>
                      <div class="download-name">CSV 模板</div>
                      <div class="download-hint">表格数据格式，便于在 Excel 中编辑</div>
                    </div>
                    <button class="btn-advanced" @click="downloadTemplate('csv')">
                      <i class="fas fa-download"></i> 下载
                    </button>
                  </div>
                  <pre class="code-block">id,name,type,field
1,节点A,类型1,领域1
2,节点B,类型2,领域2</pre>
                </div>
              </div>
            </div>

            <!-- 文件上传视图 -->
            <div v-show="uploadTab === 'file'" class="upload-file-view">
              <div class="upload-area" :class="{ dragover: uploadDragOver }" @click="triggerFilePicker"
                   @dragover.prevent="uploadDragOver = true" @dragleave.prevent="uploadDragOver = false" @drop.prevent="onFileDrop">
                <i class="fas fa-cloud-upload-alt upload-area-icon"></i>
                <p class="upload-area-title">点击或拖拽文件到此处上传</p>
                <p class="upload-area-hint">支持 JSON、CSV、Excel 格式文件</p>
                <input ref="fileInputRef" type="file" style="display:none;" accept=".json,.csv,.xlsx,.xls"
                       @change="handleFileSelected">
              </div>

              <div v-if="uploadedFile.exists" class="uploaded-file-info" :class="{ confirmed: uploadedFile.confirmed }">
                <div class="uploaded-file-row">
                  <i class="fas fa-file-alt uploaded-file-icon"></i>
                  <div class="uploaded-file-meta">
                    <div class="uploaded-file-name">{{ uploadedFile.name }}</div>
                    <div class="uploaded-file-size">
                      {{ formatFileSize(uploadedFile.size) }} · {{ uploadedFile.confirmed ? '校验通过，可以导入' : '已读取，待确认' }}
                    </div>
                  </div>
                  <div class="uploaded-file-actions">
                    <button class="btn-advanced" @click="removeUploadedFile"><i class="fas fa-trash"></i> 移除</button>
                    <button v-if="!uploadedFile.confirmed" class="btn-confirm" @click="confirmUploadedFile">
                      <i class="fas fa-check"></i> 确认
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 数据预览与验证 -->
          <div class="table-card validation-card">
            <div class="chart-title"><i class="fas fa-check-circle" style="color:#52c41a;"></i> 数据预览与验证</div>

            <!-- 初始错误/警告状态 -->
            <div v-if="validationPhase === 'initial' || validationPhase === 'pending'" class="validation-grid">
              <div class="validation-box validation-error" @click="toggleValidationDetail">
                <div class="validation-box-head">
                  <i class="fas fa-times-circle"></i>
                  <span>错误 (1)</span>
                </div>
                <div class="validation-box-desc">没有找到节点数据</div>
              </div>
              <div class="validation-box validation-warning" @click="toggleValidationDetail">
                <div class="validation-box-head">
                  <i class="fas fa-exclamation-triangle"></i>
                  <span>警告 (2)</span>
                </div>
                <div class="validation-box-desc">部分字段缺失</div>
              </div>
            </div>
            <div v-if="(validationPhase === 'initial' || validationPhase === 'pending') && showValidationDetail" class="validation-detail">
              <div class="validation-detail-title">问题详情</div>
              <p><strong>错误：</strong>数据文件中缺少必需的 "nodes" 字段。请确保您的数据包含节点信息。</p>
              <p class="validation-detail-sub"><strong>解决方案：</strong></p>
              <ul>
                <li>检查数据文件格式是否正确</li>
                <li>确保包含 "nodes" 和 "edges" 两个主要字段</li>
                <li>参考模板文件格式重新准备数据</li>
              </ul>
            </div>

            <!-- 校验通过状态 -->
            <div v-if="validationPhase === 'confirmed'" class="validation-grid">
              <div class="validation-box validation-success">
                <div class="validation-box-head"><i class="fas fa-check-circle"></i><span>节点数据 (5)</span></div>
                <div class="validation-box-desc">节点字段完整，类型校验通过</div>
              </div>
              <div class="validation-box validation-success">
                <div class="validation-box-head"><i class="fas fa-check-circle"></i><span>连接数据 (5)</span></div>
                <div class="validation-box-desc">关系字段完整，权重校验通过</div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="validationPhase === 'empty'" class="validation-inline validation-inline-empty">
              <i class="fas fa-inbox"></i>
              <span>暂未上传文件，请先在「文件上传」中选择数据文件</span>
            </div>

            <!-- 节点数据预览 -->
            <div class="preview-block">
              <div class="preview-title"><i class="fas fa-circle preview-dot-blue"></i>节点数据 (前5条)</div>
              <div class="table-scroll">
                <table class="data-table preview-table">
                  <thead>
                    <tr>
                      <th @click="sortPreview('nodes', 'id')">ID <i class="fas fa-sort"></i></th>
                      <th @click="sortPreview('nodes', 'name')">名称 <i class="fas fa-sort"></i></th>
                      <th @click="sortPreview('nodes', 'type')">类型 <i class="fas fa-sort"></i></th>
                      <th @click="sortPreview('nodes', 'field')">领域 <i class="fas fa-sort"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="displayedPreviewNodes.length === 0">
                      <td colspan="4" class="preview-empty">
                        <i class="fas fa-inbox"></i>
                        <p>暂无数据</p>
                      </td>
                    </tr>
                    <tr v-for="row in displayedPreviewNodes" :key="'np-' + row.id" class="upload-data-row"
                        :class="{ selected: selectedPreviewRow && selectedPreviewRow.title.indexOf('节点') >= 0 && selectedPreviewRow.items[0].value === row.id }"
                        @click="selectPreviewRow('nodes', row)">
                      <td>{{ row.id }}</td>
                      <td>{{ row.name }}</td>
                      <td>{{ row.type }}</td>
                      <td>{{ row.field }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 行详情 -->
            <div v-if="selectedPreviewRow" class="upload-row-detail">
              <div class="upload-row-detail-title">{{ selectedPreviewRow.title }}</div>
              <div class="upload-row-detail-content">
                <div v-for="(item, idx) in selectedPreviewRow.items" :key="idx" class="upload-row-detail-item">
                  <span class="upload-row-detail-label">{{ item.label }}</span>
                  <span class="upload-row-detail-value">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <!-- 连接数据预览 -->
            <div class="preview-block">
              <div class="preview-title"><i class="fas fa-circle preview-dot-green"></i>连接数据 (前5条)</div>
              <div class="table-scroll">
                <table class="data-table preview-table">
                  <thead>
                    <tr>
                      <th @click="sortPreview('edges', 'source')">源节点 <i class="fas fa-sort"></i></th>
                      <th @click="sortPreview('edges', 'target')">目标节点 <i class="fas fa-sort"></i></th>
                      <th @click="sortPreview('edges', 'type')">关系类型 <i class="fas fa-sort"></i></th>
                      <th @click="sortPreview('edges', 'weight')">权重 <i class="fas fa-sort"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="displayedPreviewEdges.length === 0">
                      <td colspan="4" class="preview-empty">
                        <i class="fas fa-inbox"></i>
                        <p>暂无数据</p>
                      </td>
                    </tr>
                    <tr v-for="(row, idx) in displayedPreviewEdges" :key="'ep-' + idx" class="upload-data-row"
                        @click="selectPreviewRow('edges', row)">
                      <td>{{ row.source }}</td>
                      <td>{{ row.target }}</td>
                      <td>{{ row.type }}</td>
                      <td>{{ row.weight }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="upload-footer">
            <button class="btn-cancel" @click="clearUploadData"><i class="fas fa-trash"></i> 清空数据</button>
            <button class="btn-confirm" :disabled="!uploadedFile.confirmed" @click="importData">
              <i class="fas fa-check"></i> 导入数据
            </button>
          </div>
        </div>
      </div>

      <!-- 数据导入进度提示框 -->
      <div v-show="showImportModal" class="modal-overlay import-modal-overlay">
        <div class="modal-content import-modal-content">
          <div class="modal-header">
            <div class="modal-title"><i class="fas fa-cloud-upload-alt" style="color:#1890ff;"></i> 导入进度</div>
          </div>
          <div class="modal-body">
            <div class="import-message">{{ importMessage }}</div>
            <div class="import-progress-bar">
              <div class="import-progress-fill" :style="{ width: importProgress + '%' }"></div>
            </div>
            <div class="import-progress-meta">
              <span>{{ importStatus }}</span>
              <strong>{{ importProgress }}%</strong>
            </div>
            <div v-if="importCountdown > 0" class="import-countdown">
              <i class="fas fa-check-circle"></i> 导入完成，{{ importCountdown }} 秒后跳转到任务管理页面
            </div>
          </div>
        </div>
      </div>
      <!-- ========== Tab5 网络维护 ========== -->
      <div v-show="activeTab === 'network-maintenance'" class="tab-content">
        <div class="module-section">
          <div class="module-header module-header-between">
            <div class="module-title">
              <i class="fas fa-tools"></i> 网络维护
            </div>
            <div class="header-actions">
              <button class="btn-advanced" @click="reanalyzeNetwork"><i class="fas fa-sync-alt"></i> 重新分析</button>
              <button class="btn-advanced" @click="exportNetworkData"><i class="fas fa-download"></i> 导出数据</button>
            </div>
          </div>

          <!-- 搜索与添加 -->
          <div class="filter-section">
            <div class="filter-row" style="margin-bottom:0; justify-content:space-between;">
              <div class="search-wrapper">
                <input type="text" v-model="nodeSearch" class="search-input" placeholder="搜索节点名称、ID或标签...">
                <i class="fas fa-search search-icon"></i>
              </div>
              <button class="btn-filter" @click="openAddNode"><i class="fas fa-plus"></i> 添加节点</button>
            </div>
          </div>

          <!-- 节点卡片网格 -->
          <div class="node-cards-grid">
            <div v-for="n in filteredMaintenanceNodes" :key="n.id" class="node-card" @click="openNodeDetail(n)">
              <div class="node-card-header">
                <div class="node-card-icon" :class="n.color"><i class="fas" :class="n.icon"></i></div>
                <div class="node-card-actions" @click.stop>
                  <button class="node-action-btn" title="编辑" @click="openEditNode(n)"><i class="fas fa-edit"></i></button>
                  <button class="node-action-btn delete" title="删除" @click="deleteNode(n)"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div class="node-card-body">
                <div class="node-card-name">{{ n.name }}</div>
                <div class="node-card-id">ID: {{ n.id }}</div>
                <div class="node-card-tags">
                  <span v-for="tag in n.tags" :key="tag" class="node-tag">{{ tag }}</span>
                </div>
                <div class="node-card-meta">
                  <div class="node-meta-item"><i class="fas fa-weight-hanging"></i><span>权重: {{ Number(n.weight).toFixed(2) }}</span></div>
                  <div class="node-meta-item"><i class="fas fa-database"></i><span>{{ DATA_SOURCE_LABEL[n.dataSource] }}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="filteredMaintenanceNodes.length === 0" class="table-empty" style="padding:60px;">
            <i class="fas fa-inbox" style="font-size:32px; display:block; margin-bottom:8px;"></i>
            暂无匹配的节点
          </div>
        </div>
      </div>

      <!-- ========== 指标详情弹窗 ========== -->
      <div v-show="showMetricModal" class="modal-overlay" @click.self="showMetricModal = false">
        <div class="modal-content">

          <div class="modal-header">
            <div class="modal-title"><i class="fas fa-info-circle" style="color:#1890ff;"></i> 指标详情</div>
            <button class="modal-close" @click="showMetricModal = false"><i class="fas fa-times"></i></button>
          </div>
          <div v-if="currentMetric" class="modal-body">
            <h3 class="metric-modal-title">{{ currentMetric.title }}</h3>
            <p class="metric-modal-desc">{{ currentMetric.description }}</p>
            <div class="metric-modal-detail">{{ currentMetric.detail }}</div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showMetricModal = false">关闭</button>
          </div>
        </div>
      </div>

      <!-- ========== 关键节点深度分析弹窗 ========== -->
      <div v-show="showKeyNodeModal" class="modal-overlay" @click.self="showKeyNodeModal = false">
        <div class="modal-content key-node-modal-content">
          <div class="modal-header">
            <div class="modal-title"><i class="fas fa-sitemap" style="color:#1890ff;"></i> {{ currentKeyNodeName }} · 关键节点深度分析</div>
            <button class="modal-close" @click="showKeyNodeModal = false"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div class="key-node-grid">
              <section class="key-node-section key-node-section-full">
                <div class="key-node-section-title"><i class="fas fa-link" style="color:#1890ff;"></i> 所有直接关联</div>
                <div class="key-node-links">
                  <div v-for="(l, i) in currentKeyProfile.links" :key="i" class="node-detail-connection">
                    <span class="node-detail-connection-target">{{ l.target }}</span>
                    <span class="node-detail-connection-relation">{{ l.relation }}</span>
                    <span class="node-detail-connection-strength">强度 {{ l.strength }}</span>
                  </div>
                </div>
              </section>
              <section class="key-node-section">
                <div class="key-node-section-title"><i class="fas fa-user-tag" style="color:#722ed1;"></i> 网络中的具体角色</div>
                <div class="key-node-text">{{ currentKeyProfile.role }}</div>
              </section>
              <section class="key-node-section">
                <div class="key-node-section-title"><i class="fas fa-users" style="color:#52c41a;"></i> 所属社区</div>
                <div class="key-node-text">{{ currentKeyProfile.community }}</div>
              </section>
              <section class="key-node-section key-node-section-full">
                <div class="key-node-section-title"><i class="fas fa-star" style="color:#faad14;"></i> 关键节点判定原因</div>
                <ol class="key-node-reasons">
                  <li v-for="(r, i) in currentKeyProfile.reasons" :key="i">{{ r }}</li>
                </ol>
              </section>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showKeyNodeModal = false">关闭</button>
          </div>
        </div>
      </div>

      <!-- ========== 集群详情弹窗 ========== -->
      <div v-show="showClusterModal" class="modal-overlay" @click.self="showClusterModal = false">
        <div class="modal-content" v-if="currentCluster">
          <div class="modal-header">
            <div class="modal-title"><i class="fas fa-object-group" style="color:#1890ff;"></i> {{ currentCluster.name }} · 集群详情</div>
            <button class="modal-close" @click="showClusterModal = false"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div class="task-detail-summary">
              <div class="task-detail-summary-item">
                <div class="task-detail-summary-label">集群编号</div>
                <div class="task-detail-summary-value">#{{ currentCluster.id }}</div>
              </div>
              <div class="task-detail-summary-item">
                <div class="task-detail-summary-label">节点数量</div>
                <div class="task-detail-summary-value">{{ currentCluster.size }} 个</div>
              </div>
              <div class="task-detail-summary-item">
                <div class="task-detail-summary-label">凝聚度</div>
                <div class="task-detail-summary-value" :style="{ color: cohesionColor(currentCluster) }">
                  {{ (currentCluster.cohesion * 100).toFixed(1) }}%
                </div>
              </div>
              <div class="task-detail-summary-item">
                <div class="task-detail-summary-label">核心节点</div>
                <div class="task-detail-summary-value">{{ currentCluster.cores.length }} 个</div>
              </div>
            </div>
            <div class="task-detail-section">
              <div class="task-detail-section-title"><i class="fas fa-info-circle" style="color:#1890ff; margin-right:8px;"></i>集群说明</div>
              <div class="task-detail-section-body cluster-description">
                「{{ currentCluster.name }}」（{{ currentCluster.subtitle }}）共包含 {{ currentCluster.size }}
                个节点，社区凝聚度为 {{ (currentCluster.cohesion * 100).toFixed(1) }}%。核心节点在合作、引用等关系网络中承担关键连接作用，可在网络可视化中高亮查看。
              </div>
            </div>
            <div class="task-detail-section">
              <div class="task-detail-section-title"><i class="fas fa-star" style="color:#faad14; margin-right:8px;"></i>核心节点</div>
              <div class="task-detail-section-body">
                <div class="related-entities">
                  <span v-for="core in currentCluster.cores" :key="core" class="entity-tag">{{ core }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showClusterModal = false">关闭</button>
            <button class="btn-confirm" @click="highlightClusterInGraph(currentCluster)">
              <i class="fas fa-project-diagram"></i> 在网络图中高亮
            </button>
          </div>
        </div>
      </div>

      <!-- ========== 创建任务弹窗 ========== -->
      <div v-show="showCreateTaskModal" class="modal-overlay" @click.self="showCreateTaskModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title"><i class="fas fa-plus-circle" style="color:#1890ff;"></i> 创建新任务</div>
            <button class="modal-close" @click="showCreateTaskModal = false"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">任务名称 <span class="required">*</span></label>
              <input type="text" v-model="newTask.name" class="form-input" placeholder="请输入任务名称">
            </div>
            <div class="form-group">
              <label class="form-label">分析类型 <span class="required">*</span></label>
              <select v-model="newTask.type" class="form-select">
                <option value="">请选择分析类型</option>
                <option value="network">网络分析</option>
                <option value="clustering">聚类分析</option>
                <option value="centrality">中心性计算</option>
                <option value="path">路径分析</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">关键参数</label>
              <select v-model="newTask.keyParams" class="form-select">
                <option value="">请选择关键参数</option>
                <option v-for="(opt, i) in TASK_PARAM_OPTIONS" :key="i" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">执行时间</label>
              <input type="datetime-local" v-model="newTask.execTime" class="form-input" step="60">
              <div class="form-hint">可选择具体的年月日和时分，未设置时默认为待定。</div>
            </div>
            <div class="form-group">
              <label class="form-label">任务描述</label>
              <textarea v-model="newTask.desc" class="form-textarea" placeholder="请输入任务描述（可选）"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">优先级</label>
              <select v-model="newTask.priority" class="form-select">
                <option value="normal">普通</option>
                <option value="high">高</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showCreateTaskModal = false">取消</button>
            <button class="btn-confirm" @click="submitCreateTask">创建任务</button>
          </div>
        </div>
      </div>

      <!-- ========== 任务详情弹窗 ========== -->
      <div v-show="showTaskModal" class="modal-overlay" @click.self="showTaskModal = false">
        <div class="modal-content task-detail-modal-content">
          <template v-if="currentTask">
            <div class="modal-header">
              <div class="modal-title"><i class="fas fa-clipboard-check" style="color:#1890ff;"></i> {{ currentTask.name }} · 任务详情</div>
              <button class="modal-close" @click="showTaskModal = false"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div class="task-detail-summary">
                <div class="task-detail-summary-item">
                  <div class="task-detail-summary-label">任务编号</div>
                  <div class="task-detail-summary-value">{{ currentTask.id }}</div>
                </div>
                <div class="task-detail-summary-item">
                  <div class="task-detail-summary-label">当前状态</div>
                  <div class="task-detail-summary-value">
                    <span class="status-badge" :class="currentTask.status">
                      <i class="fas" :class="TASK_STATUS_CONFIG[currentTask.status].icon"></i> {{ TASK_STATUS_CONFIG[currentTask.status].label }}
                    </span>
                  </div>
                </div>
                <div class="task-detail-summary-item">
                  <div class="task-detail-summary-label">执行进度</div>
                  <div class="task-detail-summary-value">{{ currentTask.progress }}%</div>
                </div>
                <div class="task-detail-summary-item">
                  <div class="task-detail-summary-label">分析类型</div>
                  <div class="task-detail-summary-value">{{ TASK_TYPE_CONFIG[currentTask.type] }}</div>
                </div>
              </div>

              <div class="task-detail-section">
                <div class="task-detail-section-title"><i class="fas fa-sliders-h" style="color:#1890ff; margin-right:8px;"></i>完整配置</div>
                <div class="task-detail-section-body">
                  <div class="task-detail-config">
                    <div class="task-detail-config-item"><strong>任务名称</strong><span>{{ currentTask.name }}</span></div>
                    <div class="task-detail-config-item"><strong>优先级</strong><span>{{ currentTask.priority }}</span></div>
                    <div class="task-detail-config-item"><strong>关键参数</strong><span>{{ currentTask.params }}</span></div>
                    <div class="task-detail-config-item"><strong>执行时间</strong><span>{{ currentTask.execTime }}</span></div>
                    <div class="task-detail-config-item"><strong>创建时间</strong><span>{{ currentTask.createTime }}</span></div>
                    <div class="task-detail-config-item"><strong>任务说明</strong><span>{{ currentTask.description }}</span></div>
                  </div>
                </div>
              </div>

              <div class="task-detail-section">
                <div class="task-detail-section-title"><i class="fas fa-database" style="color:#1890ff; margin-right:8px;"></i>输入数据</div>
                <div class="task-detail-section-body">
                  <div class="task-detail-list">
                    <div v-for="(d, i) in currentTask.inputData" :key="i" class="task-detail-list-item">{{ d }}</div>
                  </div>
                </div>
              </div>

              <div class="task-detail-section">
                <div class="task-detail-section-title"><i class="fas fa-stream" style="color:#1890ff; margin-right:8px;"></i>执行日志</div>
                <div class="task-detail-section-body task-detail-table-wrap">
                  <table class="task-detail-table">
                    <thead><tr><th>时间</th><th>阶段</th><th>日志信息</th></tr></thead>
                    <tbody>
                      <tr v-for="(log, i) in currentTask.logs" :key="i">
                        <td>{{ log.time }}</td><td>{{ log.stage }}</td><td>{{ log.detail }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="task-detail-section">
                <div class="task-detail-section-title"><i class="fas fa-project-diagram" style="color:#1890ff; margin-right:8px;"></i>中间结果</div>
                <div class="task-detail-section-body">
                  <div class="task-detail-list">
                    <div v-for="(r, i) in currentTask.intermediateResults" :key="i" class="task-detail-list-item">{{ r }}</div>
                  </div>
                </div>
              </div>

              <div class="task-detail-section">
                <div class="task-detail-section-title"><i class="fas fa-file-alt" style="color:#1890ff; margin-right:8px;"></i>最终输出文件</div>
                <div class="task-detail-section-body">
                  <div v-for="(f, i) in currentTask.outputFiles" :key="i" class="task-detail-file">
                    <span class="task-detail-file-name"><i class="fas fa-file-alt" style="margin-right:8px;"></i>{{ f.name }}</span>
                    <span class="task-detail-file-meta">{{ f.type }} · {{ f.size }} · {{ f.status }}</span>
                  </div>
                </div>
              </div>

              <div class="task-detail-section">
                <div class="task-detail-section-title"><i class="fas fa-history" style="color:#1890ff; margin-right:8px;"></i>操作历史</div>
                <div class="task-detail-section-body task-detail-table-wrap">
                  <table class="task-detail-table">
                    <thead><tr><th>时间</th><th>操作</th><th>操作人</th><th>说明</th></tr></thead>
                    <tbody>
                      <tr v-for="(h, i) in currentTask.history" :key="i">
                        <td>{{ h.time }}</td><td>{{ h.action }}</td><td>{{ h.operator }}</td><td>{{ h.detail }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-cancel" @click="showTaskModal = false">关闭</button>
            </div>
          </template>
        </div>
      </div>

      <!-- ========== 添加/编辑节点弹窗 ========== -->
      <div v-show="showNodeFormModal" class="modal-overlay" @click.self="showNodeFormModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              <i class="fas fa-plus-circle" style="color:#1890ff;"></i> {{ editingNodeId ? '编辑节点' : '添加节点' }}
            </div>
            <button class="modal-close" @click="showNodeFormModal = false"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">节点名称 <span class="required">*</span></label>
              <input type="text" v-model="nodeForm.name" class="form-input" placeholder="请输入节点名称">
            </div>
            <div class="form-group">
              <label class="form-label">节点类型 <span class="required">*</span></label>
              <select v-model="nodeForm.type" class="form-select">
                <option value="">请选择节点类型</option>
                <option value="institution">研究机构</option>
                <option value="person">研究人员</option>
                <option value="technology">技术领域</option>
                <option value="topic">研究主题</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">标签 <span class="form-optional">(多个标签用逗号分隔)</span></label>
              <input type="text" v-model="nodeForm.tags" class="form-input" placeholder="例如: 高校, 985, 双一流">
            </div>
            <div class="form-group">
              <label class="form-label">权重 <span class="form-optional">(0-1之间)</span></label>
              <input type="number" v-model.number="nodeForm.weight" min="0" max="1" step="0.01" class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">数据源</label>
              <select v-model="nodeForm.dataSource" class="form-select">
                <option value="manual">手动录入</option>
                <option value="official">官方数据集</option>
                <option value="paper">论文数据库</option>
                <option value="patent">专利数据库</option>
                <option value="project">项目数据库</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">描述</label>
              <textarea v-model="nodeForm.desc" class="form-textarea" placeholder="请输入节点描述（可选）"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showNodeFormModal = false">取消</button>
            <button class="btn-confirm" @click="saveNode">保存</button>
          </div>
        </div>
      </div>

      <!-- ========== 节点详情弹窗 ========== -->
      <div v-show="showNodeDetailModal" class="modal-overlay" @click.self="showNodeDetailModal = false">
        <div class="modal-content node-detail-modal-content">
          <template v-if="currentNodeDetail">
            <div class="modal-header">
              <div class="modal-title"><i class="fas fa-sitemap" style="color:#1890ff;"></i> {{ currentNodeDetail.name }} · 关键节点深度分析</div>
              <button class="modal-close" @click="showNodeDetailModal = false"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div class="node-detail-overview">
                <div class="node-detail-overview-icon"><i class="fas fa-sitemap"></i></div>
                <div>
                  <div class="node-detail-overview-name">
                    {{ currentNodeDetail.name }}
                    <span class="entity-tag" style="margin-left:8px; background:#e6f7ff; color:#1890ff;">{{ currentNodeDetail.type }}</span>
                  </div>
                  <div class="node-detail-overview-meta">
                    ID：{{ currentNodeDetail.id }}　|　权重：{{ currentNodeDetail.weight }}　|　数据源：{{ currentNodeDetail.source }}<br>
                    标签：{{ currentNodeDetail.tags }}
                  </div>
                </div>
              </div>

              <div class="node-detail-grid">
                <div class="node-detail-section node-detail-section-full">
                  <div class="node-detail-section-title"><i class="fas fa-lightbulb" style="color:#faad14; margin-right:8px;"></i>节点深度摘要</div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-analysis-summary">{{ currentNodeDetail.description }}</div>
                  </div>
                </div>

                <div class="node-detail-section node-detail-section-full">
                  <div class="node-detail-section-title">
                    <i class="fas fa-project-diagram" style="color:#1890ff; margin-right:8px;"></i>网络位置与连接关系图
                    <span class="section-title-extra">中心节点：{{ currentNodeDetail.name }} · 关联节点：{{ currentNodeDetail.connections.length }} 个</span>
                  </div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-network-layout">
                      <div class="node-detail-network-graph">
                        <svg viewBox="0 0 760 360" role="img" :aria-label="currentNodeDetail.name + '的网络关系图'">
                          <defs>
                            <marker id="nodeGraphArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#91caff"></path>
                            </marker>
                          </defs>
                          <template v-for="l in detailGraphLinks" :key="l.target">
                            <line class="node-network-link" x1="380" y1="180" :x2="l.tx" :y2="l.ty" marker-end="url(#nodeGraphArrow)"></line>
                            <text class="node-network-link-label" :x="l.lx" :y="l.ly">{{ l.relationShort }}</text>
                            <text class="node-network-link-strength" :x="l.lx" :y="l.ly2">{{ l.strength }}</text>
                            <rect class="node-network-neighbor" :x="l.rx" :y="l.ry" width="150" height="56" rx="10"></rect>
                            <text class="node-network-neighbor-label" :x="l.tx" :y="l.ty - 5">
                              <tspan v-for="(part, pi) in l.labelLines" :key="pi" :x="l.tx" :dy="pi === 0 ? 0 : 15">{{ part }}</tspan>
                            </text>
                          </template>
                          <rect class="node-network-center" x="295" y="143" width="170" height="74" rx="14"></rect>
                          <text class="node-network-center-label" x="380" y="174">
                            <tspan v-for="(part, pi) in graphLabelParts(currentNodeDetail.name)" :key="pi" x="380" :dy="pi === 0 ? 0 : 15">{{ part }}</tspan>
                          </text>
                          <text x="380" y="204" class="node-center-type">{{ currentNodeDetail.type }}</text>
                          <text v-if="detailGraphLinks.length === 0" x="380" y="272" text-anchor="middle" fill="#999" font-size="13">暂无连接关系</text>
                        </svg>
                      </div>
                      <div class="node-detail-network-side">
                        <div class="node-detail-network-side-title"><i class="fas fa-crosshairs" style="color:#1890ff; margin-right:6px;"></i>网络中的具体位置</div>
                        <div class="node-detail-network-side-text">{{ currentNodeDetail.networkPosition }}</div>
                        <div class="node-detail-network-side-title"><i class="fas fa-chart-line" style="color:#1890ff; margin-right:6px;"></i>网络指标</div>
                        <div class="node-detail-network-side-text">{{ currentNodeDetail.centrality }}</div>
                        <div class="node-detail-network-side-title"><i class="fas fa-info-circle" style="color:#1890ff; margin-right:6px;"></i>图例</div>
                        <div class="node-detail-network-legend"><span class="node-detail-network-legend-dot"></span>当前节点</div>
                        <div class="node-detail-network-legend"><span class="node-detail-network-legend-dot neighbor"></span>关联节点</div>
                        <div class="node-detail-network-legend"><span class="legend-line"></span>关系连线（标注关系类型与强度）</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="node-detail-section node-detail-section-full">
                  <div class="node-detail-section-title">
                    <i class="fas fa-link" style="color:#1890ff; margin-right:8px;"></i>所有直接关联
                    <span class="section-title-extra">共 {{ currentNodeDetail.connections.length }} 条</span>
                  </div>
                  <div class="node-detail-section-body">
                    <div v-if="currentNodeDetail.connections.length === 0" class="node-detail-empty">暂无直接关联数据</div>
                    <template v-else>
                      <div v-for="(c, i) in currentNodeDetail.connections" :key="i" class="node-detail-connection">
                        <span class="node-detail-connection-target">{{ i + 1 }}. {{ c.target }}</span>
                        <span class="node-detail-connection-relation">{{ c.relation }}</span>
                        <span class="node-detail-connection-strength">关联强度 {{ c.strength }}</span>
                      </div>
                    </template>
                  </div>
                </div>

                <div class="node-detail-section">
                  <div class="node-detail-section-title"><i class="fas fa-user-tag" style="color:#722ed1; margin-right:8px;"></i>网络中的具体角色</div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-analysis-summary">{{ currentNodeAnalysis.role }}</div>
                  </div>
                </div>
                <div class="node-detail-section">
                  <div class="node-detail-section-title"><i class="fas fa-users" style="color:#52c41a; margin-right:8px;"></i>所属社区</div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-analysis-summary">该节点与同社区实体保持高频研究或合作关系，是社区结构中的关键连接点。</div>
                    <div class="node-detail-community-tag"><i class="fas fa-circle" style="font-size:8px; margin-right:6px;"></i>{{ currentNodeAnalysis.community }}</div>
                  </div>
                </div>

                <div class="node-detail-section node-detail-section-full">
                  <div class="node-detail-section-title"><i class="fas fa-star" style="color:#faad14; margin-right:8px;"></i>关键节点判定原因</div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-list">
                      <div v-for="(r, i) in currentNodeAnalysis.reasons" :key="i" class="node-detail-list-item">
                        <strong>{{ i + 1 }}.</strong><i class="fas fa-star" style="color:#faad14; margin-right:8px;"></i>{{ r }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="node-detail-section">
                  <div class="node-detail-section-title"><i class="fas fa-book" style="color:#1890ff; margin-right:8px;"></i>相关文献</div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-list">
                      <div v-for="(p, i) in currentNodeDetail.papers" :key="i" class="node-detail-list-item">
                        <i class="fas fa-file-alt" style="color:#1890ff; margin-right:8px;"></i>{{ p }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="node-detail-section">
                  <div class="node-detail-section-title"><i class="fas fa-briefcase" style="color:#1890ff; margin-right:8px;"></i>相关项目</div>
                  <div class="node-detail-section-body">
                    <div class="node-detail-list">
                      <div v-for="(p, i) in currentNodeDetail.projects" :key="i" class="node-detail-list-item">
                        <i class="fas fa-file-alt" style="color:#1890ff; margin-right:8px;"></i>{{ p }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-cancel" @click="showNodeDetailModal = false">关闭</button>
            </div>
          </template>
        </div>
      </div>

      <!-- ========== Toast 提示 ========== -->
      <div class="toast-container">
        <div v-for="t in toasts" :key="t.id" class="toast" :class="'toast-' + t.type">
          <i class="fas toast-icon"
             :class="t.type === 'success' ? 'fa-check-circle' : (t.type === 'error' ? 'fa-times-circle' : 'fa-info-circle')"></i>
          <span>{{ t.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sna-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}
.sna-page * { margin: 0; padding: 0; box-sizing: border-box; }

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
.main-content { padding: 124px 0 0; min-width: 800px; min-height: 100vh; background: #f5f7fa; }
.page-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; }

/* 模块区块 */
.module-section { margin-bottom: 20px; width: 100%; }
.module-header {
  background: #fff; border-radius: 4px 4px 0 0;
  padding: 16px 20px; border-bottom: 1px solid #e8e8e8;
}
.module-header-between { display: flex; justify-content: space-between; align-items: center; }
.header-actions { display: flex; gap: 12px; }
.module-title { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
.module-title i { color: #1890ff; font-size: 18px; }
.chart-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

/* 统计卡片 */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px; }
.table-card .stats-grid, .module-section > .stats-grid { margin: 0 20px 20px; }
.module-section > .stats-grid:first-child,
.module-header + .stats-grid { margin: 20px; }
.stat-card {
  background: #fff; border-radius: 4px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 120px;
  border: 1px solid transparent; transition: all 0.3s;
}
.stat-clickable { cursor: pointer; }
.stat-clickable:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.12); border-color: #91d5ff; }
.stat-card.active { border-color: #1890ff; box-shadow: 0 0 0 2px rgba(24,144,255,0.15); }
.stat-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 12px; }
.stat-icon.blue { background: #e6f7ff; color: #1890ff; }
.stat-icon.green { background: #f6ffed; color: #52c41a; }
.stat-icon.orange { background: #fff2e8; color: #fa8c16; }
.stat-icon.purple { background: #f9f0ff; color: #722ed1; }
.stat-icon.red { background: #fff1f0; color: #ff4d4f; }
.stat-value { font-size: 32px; font-weight: 700; color: #333; margin-bottom: 4px; }
.stat-label { font-size: 14px; color: #999; }

/* 筛选区 */
.filter-section { background: #fff; border-radius: 4px; padding: 20px; margin: 0 0 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.module-section .filter-section { margin: 20px; box-shadow: none; border: 1px solid #f0f0f0; }
.filter-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.search-wrapper { position: relative; flex: 1; max-width: 400px; }
.search-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 40px 0 12px; font-size: 14px; }
.search-input:focus { outline: none; border-color: #1890ff; }
.search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; cursor: pointer; }
.filter-select { height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 13px; min-width: 150px; background: #fff; }
.filter-select:focus { outline: none; border-color: #1890ff; }
.btn-filter { height: 40px; padding: 0 20px; background: #1890ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; white-space: nowrap; }
.btn-filter:hover { background: #40a9ff; }

/* 网络可视化画布区域（与原型 1.2.5 一致） */
.network-card {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin: 20px;
}
.network-container {
  position: relative;
  height: 600px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}
.network-canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
  display: block;
}
.network-canvas:active { cursor: grabbing; }

/* 缩放控制按钮（右下角竖排白色卡片） */
.zoom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
}
.zoom-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e8e8e8;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 16px;
  transition: all 0.2s;
  padding: 0;
}
.zoom-btn:hover {
  background: #f0f5ff;
  color: #1890ff;
  border-color: #1890ff;
}

/* 网络可视化控制面板（与原型 1.2.5 一致） */
.control-panel {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  box-sizing: border-box;
  width: 100%;
}
.control-panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.control-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.control-row:last-child { margin-bottom: 0; }
.control-label {
  font-size: 13px;
  color: #666;
  min-width: 80px;
  white-space: nowrap;
}
.control-select {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 13px;
  min-width: 150px;
  background: #fff;
  cursor: pointer;
}
.control-select:focus {
  outline: none;
  border-color: #1890ff;
}
.control-slider-field { min-width: 200px; }
.slider-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 200px;
}
.slider-input {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #e8e8e8;
  border-radius: 3px;
  cursor: pointer;
}
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #1890ff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.slider-input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border: none;
  background: #1890ff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.slider-value {
  font-size: 13px;
  color: #666;
  min-width: 50px;
  text-align: right;
}
.btn-advanced {
  height: 36px;
  padding: 0 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-advanced:hover {
  border-color: #1890ff;
  color: #1890ff;
}
.btn-advanced.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}
.btn-advanced i {
  font-size: 14px;
}

/* 表格卡片 + 数据表格 */
.table-card {
  background: #fff; border-radius: 4px; padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 0 20px 20px;
}
.table-scroll { overflow-x: auto; width: 100%; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { background: #fafafa; padding: 14px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #333; border-bottom: 1px solid #e8e8e8; white-space: nowrap; }
.data-table td { padding: 14px 16px; border-bottom: 1px solid #e8e8e8; font-size: 13px; color: #666; }
.data-table tr:hover td { background: #f5f7fa; }
.task-table { min-width: 1260px; }
.key-node-table { min-width: 700px; }
.preview-table { min-width: 600px; }
.task-name { font-weight: 600; color: #1890ff; }
.task-id { font-size: 12px; color: #999; margin-top: 2px; }
.task-params-cell { color: #666; }
.task-row { cursor: pointer; }
.table-empty { text-align: center; color: #999; padding: 40px; font-size: 13px; }
.rank-badge { width: 28px; height: 28px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
.rank-badge.top { background: #fff2e8; color: #fa8c16; }
.rank-badge.normal { background: #f5f5f5; color: #999; }
.key-node-clickable { cursor: pointer; transition: background-color .2s ease; }
.key-node-clickable:hover > td { background: #f0f7ff; }
.key-node-clickable:hover > td:nth-child(2) strong { color: #1677ff; text-decoration: underline; }
.btn-inline {
  height: 32px; padding: 0 12px; border: 1px solid #d9d9d9; background: #fff;
  border-radius: 4px; cursor: pointer; font-size: 12px; color: #666;
  display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;
}
.btn-inline:hover { border-color: #1890ff; color: #1890ff; }

/* 集群卡片 */
.cluster-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.cluster-card { background: #fafafa; border: 1px solid #f0f0f0; border-radius: 6px; padding: 20px; cursor: pointer; transition: all 0.3s; min-height: 140px; }
.cluster-card:hover { transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.12); border-color: #d6e9ff; background: #fff; }
.cluster-card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.cluster-card-id { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; flex: 0 0 auto; }
.cluster-card-heading { flex: 1; min-width: 0; }
.cluster-card-name { font-weight: 600; color: #333; font-size: 14px; }
.cluster-card-sub { font-size: 12px; color: #999; margin-top: 2px; }
.cluster-card-cohesion { text-align: right; flex: 0 0 auto; }
.cluster-cohesion-value { font-size: 18px; font-weight: 700; }
.cluster-cohesion-label { font-size: 11px; color: #999; }
.cluster-card-foot { border-top: 1px solid #f0f0f0; padding-top: 12px; }
.cluster-core-label { font-size: 12px; color: #666; margin-bottom: 8px; }

/* 状态徽章 */
.status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 500; white-space: nowrap; }
.status-badge.running { background: #e6f7ff; color: #1890ff; }
.status-badge.completed { background: #f6ffed; color: #52c41a; }
.status-badge.failed { background: #fff1f0; color: #ff4d4f; }
.status-badge.pending { background: #fff7e6; color: #fa8c16; }

/* 进度条 */
.progress-wrapper { display: flex; align-items: center; gap: 10px; }
.progress-bar { flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%); border-radius: 4px; transition: width 0.3s ease; }
.progress-fill.completed { background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%); }
.progress-fill.failed { background: linear-gradient(90deg, #ff4d4f 0%, #ff7875 100%); }
.progress-fill.pending { background: #d9d9d9; }
.progress-text { font-size: 12px; color: #666; min-width: 40px; text-align: right; }

/* 模态框 */
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 1000;
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.modal-content {
  background: #fff; border-radius: 8px; width: 100%; max-width: 600px;
  max-height: 90vh; overflow-y: auto; animation: modalSlideIn 0.3s ease;
}
@keyframes modalSlideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.task-detail-modal-content { max-width: 1120px; }
.node-detail-modal-content { max-width: 980px; }
.key-node-modal-content { max-width: 900px; }
.import-modal-content { max-width: 560px; }
.modal-header { padding: 20px; border-bottom: 1px solid #e8e8e8; display: flex; justify-content: space-between; align-items: center; }
.modal-title { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
.modal-close { background: none; border: none; font-size: 20px; color: #999; cursor: pointer; line-height: 1; }
.modal-close:hover { color: #333; }
.modal-body { padding: 20px; }
.modal-footer { padding: 16px 20px; border-top: 1px solid #e8e8e8; display: flex; justify-content: flex-end; gap: 12px; }
.btn-cancel {
  height: 36px; padding: 0 20px; border: 1px solid #d9d9d9; background: #fff;
  border-radius: 4px; cursor: pointer; font-size: 14px; color: #666;
  display: inline-flex; align-items: center; gap: 6px;
}
.btn-cancel:hover { border-color: #1890ff; color: #1890ff; }
.btn-confirm {
  height: 36px; padding: 0 20px; border: none; background: #1890ff;
  border-radius: 4px; cursor: pointer; font-size: 14px; color: #fff;
  display: inline-flex; align-items: center; gap: 6px;
}
.btn-confirm:hover { background: #40a9ff; }
.btn-confirm:disabled { background: #d9d9d9; cursor: not-allowed; }

/* ===== 数据上传模块（与原型 1.2.5 一致） ===== */
.upload-card {
  display: block;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 0;
  text-align: left;
  border: none;
  min-height: 0;
}
.upload-tabs {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
}
.upload-tab {
  padding: 16px 24px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.upload-tab:hover { color: #1890ff; }
.upload-tab.active { color: #1890ff; border-bottom-color: #1890ff; font-weight: 500; }

.upload-template-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}
.template-item {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
  background: #fff;
}
.template-item:last-child { margin-bottom: 0; }
.template-item:hover { border-color: #1890ff; box-shadow: 0 2px 8px rgba(24,144,255,0.15); }
.template-item.active { border-color: #1890ff; background: #e6f7ff; box-shadow: 0 2px 8px rgba(24,144,255,0.15); }
.template-item-inner { display: flex; align-items: center; gap: 12px; }
.template-icon {
  width: 48px; height: 48px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 20px; flex: 0 0 auto;
}
.template-icon.blue { background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%); }
.template-icon.green { background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%); }
.template-icon.orange { background: linear-gradient(135deg, #fa8c16 0%, #ffa940 100%); }
.template-icon.purple { background: linear-gradient(135deg, #722ed1 0%, #9254de 100%); }
.template-info { flex: 1; min-width: 0; }
.template-name { font-weight: 600; color: #333; font-size: 14px; }
.template-desc { font-size: 12px; color: #666; margin-top: 4px; }
.template-tag {
  display: inline-block; margin-top: 8px;
  padding: 2px 8px; border-radius: 4px; font-size: 11px;
}

.download-card {
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}
.download-card:last-child { margin-bottom: 0; }
.download-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.download-name { font-weight: 600; color: #333; font-size: 14px; }
.download-hint { font-size: 12px; color: #999; margin-top: 4px; }
.code-block {
  font-size: 12px;
  color: #666;
  background: #f0f0f0;
  padding: 12px;
  border-radius: 4px;
  font-family: monospace;
  margin: 0;
  white-space: pre;
  overflow-x: auto;
}

.upload-file-view { padding: 20px; }
.upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 60px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #fafafa;
}
.upload-area:hover { border-color: #1890ff; background: #e6f7ff; }
.upload-area.dragover { border-color: #1890ff; background: #e6f7ff; }
.upload-area-icon { font-size: 48px; color: #d9d9d9; margin-bottom: 16px; display: block; }
.upload-area-title { font-size: 16px; color: #333; margin: 0 0 8px; }
.upload-area-hint { font-size: 13px; color: #999; margin: 0; }

.uploaded-file-info {
  margin-top: 16px;
  padding: 16px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
}
.uploaded-file-row { display: flex; align-items: center; gap: 12px; }
.uploaded-file-icon { font-size: 24px; color: #52c41a; }
.uploaded-file-meta { flex: 1; min-width: 0; }
.uploaded-file-name { font-weight: 600; color: #333; }
.uploaded-file-size { font-size: 12px; color: #666; margin-top: 2px; }
.uploaded-file-actions { display: flex; gap: 8px; }

.validation-card { margin-bottom: 20px; }
.validation-grid { display: flex; gap: 16px; margin-bottom: 20px; }
.validation-box {
  flex: 1;
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.validation-box.error, .validation-error { background: #fff1f0; border: 1px solid #ffa39e; }
.validation-box.warning, .validation-warning { background: #fffbe6; border: 1px solid #ffe58f; }
.validation-box.success, .validation-success { background: #f6ffed; border: 1px solid #b7eb8f; }
.validation-box-head { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.validation-error .validation-box-head { color: #ff4d4f; }
.validation-warning .validation-box-head { color: #faad14; }
.validation-success .validation-box-head { color: #52c41a; }
.validation-box-desc { font-size: 12px; color: #666; margin-top: 8px; }
.validation-detail {
  background: #fafafa;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}
.validation-detail-title { font-weight: 600; color: #333; margin-bottom: 12px; }
.validation-detail ul { margin: 4px 0 0 20px; }
.validation-detail-sub { margin-top: 8px; }
.validation-inline {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 16px;
}
.validation-inline-empty {
  background: #fafafa;
  border: 1px solid #d9d9d9;
  color: #666;
}

.preview-block { margin-bottom: 20px; }
.preview-block:last-child { margin-bottom: 0; }
.preview-title { font-weight: 600; color: #333; margin-bottom: 12px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
.preview-dot-blue { font-size: 8px; color: #1890ff; }
.preview-dot-green { font-size: 8px; color: #52c41a; }
.preview-empty { text-align: center; color: #999; padding: 40px; }
.preview-empty i { font-size: 32px; display: block; margin-bottom: 8px; }
.preview-empty p { margin: 0; }
.upload-data-row { cursor: pointer; transition: background 0.2s ease; }
.upload-data-row:hover td { background: #f0f8ff !important; }
.upload-data-row.selected td { background: #e6f7ff !important; box-shadow: inset 3px 0 0 #1890ff; }

.upload-row-detail {
  margin: 0 0 20px;
  padding: 16px;
  background: #f6faff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
}
.upload-row-detail-title { font-weight: 600; color: #1890ff; margin-bottom: 10px; }
.upload-row-detail-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 24px;
  font-size: 13px;
  color: #555;
}
.upload-row-detail-item { display: flex; gap: 8px; }
.upload-row-detail-label { min-width: 64px; color: #999; }
.upload-row-detail-value { color: #333; font-weight: 600; }

.upload-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin: 20px 0;
}

/* 导入进度弹窗 */
.import-modal-overlay { z-index: 2000; }
.import-message { font-size: 15px; color: #333; margin-bottom: 18px; }
.import-progress-bar { height: 12px; background: #f0f0f0; border-radius: 10px; overflow: hidden; }
.import-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #52c41a);
  border-radius: 10px;
  transition: width 0.4s ease;
}
.import-progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 13px;
  color: #666;
}
.import-progress-meta strong { color: #1890ff; }
.import-countdown {
  margin-top: 18px;
  padding: 12px;
  background: #f6ffed;
  color: #389e0d;
  border-radius: 4px;
  text-align: center;
  font-size: 13px;
}

/* 表单 */
.form-group { margin-bottom: 20px; }
.form-group:last-child { margin-bottom: 0; }
.form-label { display: block; font-size: 13px; color: #666; margin-bottom: 8px; }
.required { color: #ff4d4f; }
.form-optional { color: #999; font-weight: normal; }
.form-input, .form-select { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 14px; background: #fff; }
.form-input:focus, .form-select:focus { outline: none; border-color: #1890ff; }
.form-textarea { width: 100%; min-height: 100px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 12px; font-size: 14px; resize: vertical; font-family: inherit; }
.form-textarea:focus { outline: none; border-color: #1890ff; }
.form-hint { font-size: 12px; color: #999; margin-top: 6px; }

/* 指标详情弹窗 */
.metric-modal-title { font-size: 17px; color: #1890ff; margin-bottom: 12px; }
.metric-modal-desc { font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 14px; }
.metric-modal-detail { background: #f6faff; border: 1px solid #d6e9ff; border-radius: 6px; padding: 14px; font-size: 13px; color: #4a5d75; line-height: 1.8; }
/*STYLE-MARKER*/
</style>
