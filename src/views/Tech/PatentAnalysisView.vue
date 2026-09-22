<script setup>
// 专利分析（1.2.3）：技术研判服务 → 技术体系分析。
// 1:1 还原 HTML 原型：专利分析总览 / 任务管理 / 案例库 / 深度分析 四个 Tab。
import { ref, computed, reactive, onMounted } from 'vue';

// ==================== Tab 切换 ====================
const activeTab = ref('overview');
function switchTab(tab) {
  activeTab.value = tab;
}

// ==================== 关键词数据 ====================
const KEYWORD_DATA = [
  { name: '人工智能', percent: 18.5, count: 15992, trend: 'up', size: 5, yearlyData: [2100, 2800, 3500, 4200, 5100, 5800] },
  { name: '机器学习', percent: 15.2, count: 13140, trend: 'up', size: 4, yearlyData: [1800, 2200, 2800, 3400, 4100, 4800] },
  { name: '深度学习', percent: 12.8, count: 11066, trend: 'up', size: 4, yearlyData: [1500, 1900, 2400, 2900, 3600, 4200] },
  { name: '自然语言处理', percent: 10.5, count: 9077, trend: 'up', size: 3, yearlyData: [1200, 1500, 1900, 2400, 3000, 3500] },
  { name: '计算机视觉', percent: 9.2, count: 7953, trend: 'down', size: 3, yearlyData: [1800, 1700, 1600, 1500, 1400, 1300] },
  { name: '强化学习', percent: 8.6, count: 7435, trend: 'up', size: 3, yearlyData: [800, 1100, 1400, 1800, 2300, 2800] },
  { name: '神经网络', percent: 7.3, count: 6311, trend: 'down', size: 2, yearlyData: [1400, 1300, 1200, 1100, 900, 800] },
  { name: '生成式AI', percent: 6.8, count: 5879, trend: 'up', size: 2, yearlyData: [200, 400, 800, 1500, 2500, 3200] },
  { name: '大语言模型', percent: 5.9, count: 5101, trend: 'up', size: 2, yearlyData: [100, 300, 600, 1200, 2100, 2800] },
  { name: '智能推荐', percent: 5.2, count: 4495, trend: 'down', size: 1, yearlyData: [900, 850, 800, 750, 650, 600] },
];

const selectedKeyword = ref(null);
const top5Keywords = computed(() => KEYWORD_DATA.slice(0, 5));

function selectKeyword(k) {
  selectedKeyword.value = k;
  openKeywordDetail(k.name);
}
function closeKeywordSelection() {
  selectedKeyword.value = null;
  closeDetailPanel();
}

// ==================== 国家/地区数据 ====================
const COUNTRY_DATA = [
  { name: '中国', count: 32580, percent: 37.7, trend: 'up', rank: 1, x: 70, y: 35, color: '#1890ff', yearlyData: [4500, 5200, 6800, 8500, 10200, 12580], institutions: ['清华大学', '华为', '中科院', '腾讯', '阿里巴巴'] },
  { name: '美国', count: 24560, percent: 28.4, trend: 'down', rank: 2, x: 20, y: 35, color: '#52c41a', yearlyData: [3800, 4200, 4500, 4800, 5100, 5560], institutions: ['IBM', '微软', '谷歌', '苹果', '英特尔'] },
  { name: '日本', count: 12450, percent: 14.4, trend: 'up', rank: 3, x: 82, y: 38, color: '#fa8c16', yearlyData: [1800, 2000, 2200, 2500, 2900, 3450], institutions: ['索尼', '松下', '丰田', '东芝', 'NEC'] },
  { name: '德国', count: 8230, percent: 9.5, trend: 'down', rank: 4, x: 48, y: 32, color: '#722ed1', yearlyData: [1200, 1350, 1500, 1650, 1800, 2230], institutions: ['西门子', '博世', '大众', '蒂森克虏伯', 'SAP'] },
  { name: '韩国', count: 6890, percent: 8.0, trend: 'up', rank: 5, x: 78, y: 38, color: '#eb2f96', yearlyData: [900, 1100, 1300, 1600, 2000, 2890], institutions: ['三星', 'LG', '现代', 'SK海力士', '起亚'] },
];

const activeCountry = ref(null);
const mapRegions = computed(() => {
  return COUNTRY_DATA.map(c => {
    const w = 8 + c.percent * 0.5;
    const h = 6 + c.percent * 0.4;
    return { ...c, widthPct: w, heightPct: h };
  });
});
function selectCountry(c) {
  activeCountry.value = activeCountry.value && activeCountry.value.name === c.name ? null : c;
  if (activeCountry.value) openCountryDetail(c.name);
  else closeDetailPanel();
}
function highlightLeaderCountry() {
  const leader = COUNTRY_DATA[0];
  selectCountry(leader);
}

// ==================== 机构数据 ====================
const INSTITUTION_DATA = [
  {
    name: '阿里巴巴', location: '杭州', count: 8560, x: 25, y: 30, size: 80, color: '#1890ff',
    inventors: [
      { name: '王明', patents: 126, avatar: '👨‍💻' },
      { name: '李华', patents: 98, avatar: '👩‍💻' },
      { name: '张伟', patents: 87, avatar: '👨‍🔬' },
      { name: '刘芳', patents: 76, avatar: '👩‍🔬' },
      { name: '陈强', patents: 65, avatar: '👨‍💼' },
    ],
    yearlyData: [1200, 1580, 2100, 2800, 3500, 4200],
    partners: [
      { name: '浙江大学', count: 890, type: '产学研' },
      { name: '蚂蚁集团', count: 756, type: '集团内合作' },
      { name: '清华大学', count: 620, type: '产学研' },
      { name: '中国移动', count: 480, type: '企业合作' },
      { name: '中科院', count: 390, type: '产学研' },
    ],
  },
  {
    name: '腾讯', location: '深圳', count: 7890, x: 55, y: 50, size: 72, color: '#52c41a',
    inventors: [
      { name: '刘强', patents: 118, avatar: '👨‍💻' },
      { name: '陈静', patents: 95, avatar: '👩‍💻' },
      { name: '周杰', patents: 82, avatar: '👨‍🔬' },
      { name: '吴婷', patents: 71, avatar: '👩‍🔬' },
      { name: '赵磊', patents: 63, avatar: '👨‍💼' },
    ],
    yearlyData: [1050, 1420, 1890, 2500, 3200, 3800],
    partners: [
      { name: '深圳大学', count: 820, type: '产学研' },
      { name: '微信团队', count: 680, type: '集团内合作' },
      { name: '北京大学', count: 550, type: '产学研' },
      { name: '华为', count: 420, type: '企业合作' },
      { name: '中科院', count: 360, type: '产学研' },
    ],
  },
  {
    name: '百度', location: '北京', count: 6230, x: 35, y: 25, size: 65, color: '#fa8c16',
    inventors: [
      { name: '张涛', patents: 108, avatar: '👨‍💻' },
      { name: '杨艳', patents: 89, avatar: '👩‍💻' },
      { name: '孙磊', patents: 76, avatar: '👨‍🔬' },
      { name: '杨雪', patents: 65, avatar: '👩‍🔬' },
      { name: '黄勇', patents: 58, avatar: '👨‍💼' },
    ],
    yearlyData: [850, 1120, 1560, 2100, 2750, 3300],
    partners: [
      { name: '清华大学', count: 780, type: '产学研' },
      { name: '北京大学', count: 620, type: '产学研' },
      { name: '中科院', count: 480, type: '产学研' },
      { name: 'Intel', count: 350, type: '国际合作' },
      { name: '小米', count: 290, type: '企业合作' },
    ],
  },
  {
    name: '华为', location: '深圳', count: 5890, x: 60, y: 55, size: 60, color: '#722ed1',
    inventors: [
      { name: '李明', patents: 125, avatar: '👨‍💻' },
      { name: '王芳', patents: 102, avatar: '👩‍💻' },
      { name: '徐杰', patents: 91, avatar: '👨‍🔬' },
      { name: '赵敏', patents: 78, avatar: '👩‍🔬' },
      { name: '杨涛', patents: 66, avatar: '👨‍💼' },
    ],
    yearlyData: [980, 1280, 1720, 2350, 3100, 3700],
    partners: [
      { name: '西安电子科技大学', count: 850, type: '产学研' },
      { name: '东南大学', count: 720, type: '产学研' },
      { name: '清华大学', count: 580, type: '产学研' },
      { name: '爱立信', count: 450, type: '国际合作' },
      { name: '高通', count: 380, type: '国际合作' },
    ],
  },
  {
    name: '字节跳动', location: '北京', count: 4560, x: 40, y: 35, size: 50, color: '#eb2f96',
    inventors: [
      { name: '马超', patents: 98, avatar: '👨‍💻' },
      { name: '林青', patents: 82, avatar: '👩‍💻' },
      { name: '郭峰', patents: 69, avatar: '👨‍🔬' },
      { name: '周莉', patents: 58, avatar: '👩‍🔬' },
      { name: '黄强', patents: 52, avatar: '👨‍💼' },
    ],
    yearlyData: [580, 820, 1200, 1800, 2500, 3100],
    partners: [
      { name: '中科院', count: 680, type: '产学研' },
      { name: '清华大学', count: 520, type: '产学研' },
      { name: '北京大学', count: 420, type: '产学研' },
      { name: '腾讯', count: 320, type: '企业合作' },
      { name: '复旦大学', count: 280, type: '产学研' },
    ],
  },
];

const INSTITUTION_CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [2, 4],
];

const institutionLinks = computed(() => {
  return INSTITUTION_CONNECTIONS.map(([i, j]) => {
    const a = INSTITUTION_DATA[i];
    const b = INSTITUTION_DATA[j];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return { left: a.x, top: a.y, width: length, angle };
  });
});

const activeInstitution = ref(null);
function selectInstitution(inst) {
  activeInstitution.value = activeInstitution.value && activeInstitution.value.name === inst.name ? null : inst;
  if (activeInstitution.value) openInstitutionDetail(inst.name);
  else closeDetailPanel();
}
function highlightTopInstitution() {
  const top = INSTITUTION_DATA[0];
  selectInstitution(top);
}

// ==================== IPC 分类数据 ====================
const IPC_SECTIONS = [
  { code: 'G', name: '物理', percent: 32.5, desc: '计算机技术、通信技术' },
  { code: 'H', name: '电学', percent: 28.8, desc: '电子技术、半导体技术' },
  { code: 'A', name: '人类生活', percent: 15.2, desc: '医疗、农业' },
  { code: 'B', name: '作业', percent: 12.6, desc: '分离、混合、成型' },
  { code: 'C', name: '化学', percent: 6.8, desc: '冶金、石油' },
  { code: 'F', name: '机械工程', percent: 4.1, desc: '照明、加热' },
];

const IPC_CLASSES = [
  {
    code: 'G06N', desc: '基于特定计算模型的计算机系统', count: 45678, percent: 19.5, trend: 'up', section: 'G',
    yearlyData: [5800, 7200, 8900, 10200, 12500, 15600],
    legalStatus: { valid: 28500, pending: 10200, expired: 6978 },
    corePatents: [
      { id: 'CN202110890123.4', title: '基于深度学习的推荐方法及装置', applicant: '阿里巴巴', date: '2021-08-15' },
      { id: 'CN202210567890.2', title: '神经网络模型的训练方法', applicant: '腾讯', date: '2022-05-20' },
      { id: 'CN202310234567.8', title: '机器学习加速处理方法', applicant: '百度', date: '2023-03-08' },
    ],
    hotTechnologies: ['深度学习', '神经网络', '强化学习', '联邦学习', '迁移学习'],
  },
  {
    code: 'G06F', desc: '电数字数据处理', count: 32156, percent: 13.7, trend: 'up', section: 'G',
    yearlyData: [4200, 5100, 6200, 7800, 9500, 12500],
    legalStatus: { valid: 19800, pending: 7560, expired: 4796 },
    corePatents: [
      { id: 'CN202110234567.1', title: '分布式数据处理系统', applicant: '华为', date: '2021-04-12' },
      { id: 'CN202210678901.3', title: '云计算资源调度方法', applicant: '阿里巴巴', date: '2022-06-28' },
      { id: 'CN202310345678.4', title: '高性能计算优化技术', applicant: '字节跳动', date: '2023-04-15' },
    ],
    hotTechnologies: ['云计算', '边缘计算', '分布式系统', '数据加密', '容错处理'],
  },
  {
    code: 'H04L', desc: '数字信息的传输', count: 28945, percent: 12.3, trend: 'up', section: 'H',
    yearlyData: [3800, 4600, 5600, 6900, 8500, 10500],
    legalStatus: { valid: 17600, pending: 6840, expired: 4505 },
    corePatents: [
      { id: 'CN202110345678.2', title: '5G网络切片资源分配方法', applicant: '华为', date: '2021-05-18' },
      { id: 'CN202210789012.4', title: '高速数据传输协议', applicant: '中兴', date: '2022-07-22' },
      { id: 'CN202310456789.5', title: '网络安全加密传输系统', applicant: '腾讯', date: '2023-05-10' },
    ],
    hotTechnologies: ['5G通信', '网络安全', '物联网', '软件定义网络', '光传输'],
  },
  {
    code: 'G10L', desc: '语音分析合成', count: 21345, percent: 9.1, trend: 'down', section: 'G',
    yearlyData: [3200, 3800, 4200, 4500, 4800, 5200],
    legalStatus: { valid: 13200, pending: 4800, expired: 3345 },
    corePatents: [
      { id: 'CN202110456789.3', title: '语音识别降噪方法', applicant: '科大讯飞', date: '2021-06-25' },
      { id: 'CN202210890123.5', title: '多语种语音合成系统', applicant: '百度', date: '2022-08-30' },
      { id: 'CN202310567890.6', title: '情感语音转换技术', applicant: '阿里巴巴', date: '2023-06-12' },
    ],
    hotTechnologies: ['语音识别', '自然语言处理', '语音合成', '声纹识别', '对话系统'],
  },
  {
    code: 'H04N', desc: '图像通信', count: 19876, percent: 8.5, trend: 'up', section: 'H',
    yearlyData: [2600, 3100, 3800, 4600, 5600, 6800],
    legalStatus: { valid: 12200, pending: 4500, expired: 3176 },
    corePatents: [
      { id: 'CN202110567890.4', title: '视频编解码优化方法', applicant: '字节跳动', date: '2021-07-08' },
      { id: 'CN202210901234.6', title: '超高清视频传输技术', applicant: '华为', date: '2022-09-15' },
      { id: 'CN202310678901.7', title: '图像增强处理系统', applicant: '腾讯', date: '2023-07-20' },
    ],
    hotTechnologies: ['视频压缩', '图像处理', '流媒体', 'AR/VR', '视频分析'],
  },
  {
    code: 'A61K', desc: '医用配制品', count: 16543, percent: 7.1, trend: 'up', section: 'A',
    yearlyData: [2100, 2500, 3000, 3600, 4300, 5100],
    legalStatus: { valid: 10800, pending: 3800, expired: 1943 },
    corePatents: [
      { id: 'CN202110678901.5', title: '纳米药物递送系统', applicant: '中国科学院', date: '2021-08-02' },
      { id: 'CN202211012345.7', title: '抗肿瘤药物组合物', applicant: '恒瑞医药', date: '2022-10-18' },
      { id: 'CN202310789012.8', title: '生物相容性材料', applicant: '复旦大学', date: '2023-08-25' },
    ],
    hotTechnologies: ['生物制药', '基因治疗', '免疫疗法', '疫苗技术', '精准医疗'],
  },
  {
    code: 'B60W', desc: '混合动力车辆的控制', count: 14321, percent: 6.1, trend: 'down', section: 'B',
    yearlyData: [2200, 2800, 3200, 2900, 2400, 1800],
    legalStatus: { valid: 8500, pending: 3200, expired: 2621 },
    corePatents: [
      { id: 'CN202111123456.6', title: '新能源汽车能量管理方法', applicant: '比亚迪', date: '2021-11-12' },
      { id: 'CN202212345678.8', title: '自动驾驶控制系统', applicant: '华为', date: '2022-12-05' },
      { id: 'CN202313456789.9', title: '电池热管理装置', applicant: '宁德时代', date: '2023-09-30' },
    ],
    hotTechnologies: ['新能源汽车', '动力电池', '自动驾驶', '智能座舱', '车联网'],
  },
  {
    code: 'G06V', desc: '图像识别', count: 12876, percent: 5.5, trend: 'up', section: 'G',
    yearlyData: [1600, 2100, 2800, 3500, 4500, 5800],
    legalStatus: { valid: 7800, pending: 3000, expired: 2076 },
    corePatents: [
      { id: 'CN202112345678.7', title: '人脸识别方法及装置', applicant: '商汤科技', date: '2021-12-20' },
      { id: 'CN202213456789.9', title: '目标检测与跟踪系统', applicant: '旷视科技', date: '2022-11-28' },
      { id: 'CN202314567890.1', title: '医学图像分析技术', applicant: '腾讯', date: '2023-10-15' },
    ],
    hotTechnologies: ['计算机视觉', '人脸识别', '目标检测', 'OCR识别', '3D重建'],
  },
  {
    code: 'C07K', desc: '肽', count: 10987, percent: 4.7, trend: 'down', section: 'C',
    yearlyData: [1800, 2100, 2200, 2000, 1700, 1400],
    legalStatus: { valid: 6800, pending: 2500, expired: 1687 },
    corePatents: [
      { id: 'CN202113456789.8', title: '抗菌肽序列设计方法', applicant: '中国农业大学', date: '2021-12-30' },
      { id: 'CN202215678901.2', title: '多肽药物合成工艺', applicant: '药明康德', date: '2022-11-15' },
      { id: 'CN202316789012.3', title: '蛋白质折叠预测技术', applicant: '上海生化所', date: '2023-11-08' },
    ],
    hotTechnologies: ['蛋白质工程', '酶工程', '抗体药物', '合成生物学', '代谢工程'],
  },
  {
    code: 'H01L', desc: '半导体器件', count: 9865, percent: 4.2, trend: 'up', section: 'H',
    yearlyData: [1200, 1500, 1800, 2300, 2900, 3600],
    legalStatus: { valid: 5800, pending: 2400, expired: 1665 },
    corePatents: [
      { id: 'CN202114567890.9', title: '先进制程芯片制造方法', applicant: '中芯国际', date: '2021-11-22' },
      { id: 'CN202216789012.4', title: '3D芯片堆叠封装技术', applicant: '华为', date: '2022-10-08' },
      { id: 'CN202317890123.5', title: '化合物半导体材料', applicant: '三安光电', date: '2023-12-18' },
    ],
    hotTechnologies: ['先进制程', '封装测试', '第三代半导体', '存储器', '功率器件'],
  },
];

const selectedSection = ref(null);
const filteredIPCClasses = computed(() => {
  return selectedSection.value
    ? IPC_CLASSES.filter(ipc => ipc.section === selectedSection.value)
    : IPC_CLASSES.slice(0, 10);
});
function filterIPCBySection(code) {
  selectedSection.value = selectedSection.value === code ? null : code;
}
function selectIPC(ipc) {
  openIPCDetail(ipc.code);
}
function highlightTopIPC() {
  const top = IPC_CLASSES[0];
  openIPCDetail(top.code);
}

// ==================== 详情面板 ====================
const detailPanelOpen = ref(false);
const detailPanelTitle = ref('详情分析');
const detailPanelContent = ref('');

function openDetailPanel(title, content) {
  detailPanelTitle.value = title;
  detailPanelContent.value = content;
  detailPanelOpen.value = true;
}
function closeDetailPanel() {
  detailPanelOpen.value = false;
}

function showKeywordDetail(name) {
  const kw = KEYWORD_DATA.find(k => k.name === name);
  if (!kw) return;
  const trendColor = kw.trend === 'up' ? '#52c41a' : '#f5222d';
  const trendLabel = kw.trend === 'up' ? '+12.5' : '-3.2';
  const content = `
    <div class="detail-section">
      <div class="detail-section-title">关键词概况</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-label">关键词名称</div><div class="detail-content-value">${name}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">专利数量</div><div class="detail-content-value">${kw.count.toLocaleString()} 项</div></li>
        <li class="detail-content-item"><div class="detail-content-label">占比</div><div class="detail-content-value">${kw.percent}%</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">发展趋势（2019-2024）</div>
      <div class="detail-trend-chart" style="--trend-color: ${trendColor};">
        ${kw.yearlyData.map((v, i) => {
          const max = Math.max(...kw.yearlyData);
          const h = (v / max * 100).toFixed(0);
          return `<div class="trend-bar-item"><div class="trend-bar" style="height:${h}%;background:${trendColor};"></div><span class="trend-year">${2019 + i}</span><span class="trend-val">${v.toLocaleString()}</span></div>`;
        }).join('')}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">核心专利列表</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-value">CN123456789A - 基于${name}的智能系统</div></li>
        <li class="detail-content-item"><div class="detail-content-value">CN123456790B - ${name}算法优化方法</div></li>
        <li class="detail-content-item"><div class="detail-content-value">CN123456791A - ${name}应用装置</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">主要申请机构</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-value">阿里巴巴 - 2,340 项</div></li>
        <li class="detail-content-item"><div class="detail-content-value">腾讯 - 1,890 项</div></li>
        <li class="detail-content-item"><div class="detail-content-value">百度 - 1,560 项</div></li>
      </ul>
    </div>
  `;
  openDetailPanel(`${name} - 深度分析`, content);
}
function openKeywordDetail(name) { showKeywordDetail(name); }

function showCountryDetail(name) {
  const country = COUNTRY_DATA.find(c => c.name === name);
  if (!country) return;
  const trendColor = country.trend === 'up' ? '#52c41a' : '#f5222d';
  const content = `
    <div class="detail-section">
      <div class="detail-section-title">国家概况</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-label">国家名称</div><div class="detail-content-value">${name}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">专利数量</div><div class="detail-content-value">${country.count.toLocaleString()} 项</div></li>
        <li class="detail-content-item"><div class="detail-content-label">全球占比</div><div class="detail-content-value">${country.percent}%</div></li>
        <li class="detail-content-item"><div class="detail-content-label">排名</div><div class="detail-content-value">第 ${country.rank} 位</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">历年专利增长曲线（2019-2024）</div>
      <div class="detail-trend-chart" style="--trend-color: ${trendColor};">
        ${country.yearlyData.map((v, i) => {
          const max = Math.max(...country.yearlyData);
          const h = (v / max * 100).toFixed(0);
          return `<div class="trend-bar-item"><div class="trend-bar" style="height:${h}%;background:${trendColor};"></div><span class="trend-year">${2019 + i}</span><span class="trend-val">${v.toLocaleString()}</span></div>`;
        }).join('')}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">主要机构</div>
      <ul class="detail-content-list">
        ${country.institutions.map((inst, i) => `<li class="detail-content-item"><div class="detail-content-value">${inst} - ${Math.floor(country.count * (0.25 - i * 0.05)).toLocaleString()} 项</div></li>`).join('')}
      </ul>
    </div>
  `;
  openDetailPanel(`${name} - 专利布局详情`, content);
}
function openCountryDetail(name) { showCountryDetail(name); }

function showInstitutionDetail(name) {
  const inst = INSTITUTION_DATA.find(i => i.name === name);
  if (!inst) return;
  const content = `
    <div class="detail-section">
      <div class="detail-section-title">机构概况</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-label">机构名称</div><div class="detail-content-value">${inst.name}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">所在地</div><div class="detail-content-value">${inst.location}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">专利总数</div><div class="detail-content-value">${inst.count.toLocaleString()} 项</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">核心发明人</div>
      <ul class="detail-content-list">
        ${inst.inventors.map(inv => `<li class="detail-content-item"><div class="detail-content-value">${inv.avatar} ${inv.name} - ${inv.patents} 项专利</div></li>`).join('')}
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">历年专利申请趋势（2019-2024）</div>
      <div class="detail-trend-chart" style="--trend-color: ${inst.color};">
        ${inst.yearlyData.map((v, i) => {
          const max = Math.max(...inst.yearlyData);
          const h = (v / max * 100).toFixed(0);
          return `<div class="trend-bar-item"><div class="trend-bar" style="height:${h}%;background:${inst.color};"></div><span class="trend-year">${2019 + i}</span><span class="trend-val">${v.toLocaleString()}</span></div>`;
        }).join('')}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">主要合作机构</div>
      <ul class="detail-content-list">
        ${inst.partners.map(p => `<li class="detail-content-item"><div class="detail-content-value">${p.name} - ${p.count} 项 (${p.type})</div></li>`).join('')}
      </ul>
    </div>
  `;
  openDetailPanel(`${inst.name} - 机构详情`, content);
}
function openInstitutionDetail(name) { showInstitutionDetail(name); }

function showIPCDetail(code) {
  const ipc = IPC_CLASSES.find(i => i.code === code);
  if (!ipc) return;
  const content = `
    <div class="detail-section">
      <div class="detail-section-title">分类概况</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-label">IPC分类号</div><div class="detail-content-value">${ipc.code}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">分类描述</div><div class="detail-content-value">${ipc.desc}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">专利数量</div><div class="detail-content-value">${ipc.count.toLocaleString()} 项</div></li>
        <li class="detail-content-item"><div class="detail-content-label">占比</div><div class="detail-content-value">${ipc.percent}%</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">法律状态分布</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-value">有效专利: ${ipc.legalStatus.valid.toLocaleString()} 项</div></li>
        <li class="detail-content-item"><div class="detail-content-value">审查中: ${ipc.legalStatus.pending.toLocaleString()} 项</div></li>
        <li class="detail-content-item"><div class="detail-content-value">已失效: ${ipc.legalStatus.expired.toLocaleString()} 项</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">核心专利</div>
      <ul class="detail-content-list">
        ${ipc.corePatents.map(p => `<li class="detail-content-item"><div class="detail-content-value">${p.id}<br>${p.title}<br><span style="color:#999;font-size:12px;">申请人: ${p.applicant} | 申请日: ${p.date}</span></div></li>`).join('')}
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">热点技术</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${ipc.hotTechnologies.map(t => `<span style="padding:4px 12px;background:#e6f7ff;color:#1890ff;border-radius:4px;font-size:12px;">${t}</span>`).join('')}
      </div>
    </div>
  `;
  openDetailPanel(`${ipc.code} - ${ipc.desc}`, content);
}
function openIPCDetail(code) { showIPCDetail(code); }

// ==================== 任务管理数据 ====================
const TASK_DATA = ref([
  { id: 'PT001', name: '人工智能专利综合分析', type: 'general', priority: 'high', status: 'completed', progress: 100, time: '2024-03-15 10:30' },
  { id: 'PT002', name: '量子计算技术趋势分析', type: 'trend', priority: 'high', status: 'running', progress: 65, time: '2024-03-16 14:20' },
  { id: 'PT003', name: '区块链技术竞争分析', type: 'competitor', priority: 'medium', status: 'pending', progress: 0, time: '2024-03-16 16:45' },
  { id: 'PT004', name: '生物医学工程专利全景', type: 'landscape', priority: 'medium', status: 'completed', progress: 100, time: '2024-03-14 09:15' },
  { id: 'PT005', name: '自动驾驶技术分析', type: 'general', priority: 'low', status: 'failed', progress: 45, time: '2024-03-13 11:00' },
  { id: 'PT006', name: '5G通信专利趋势', type: 'trend', priority: 'high', status: 'running', progress: 80, time: '2024-03-17 08:30' },
  { id: 'PT007', name: '云计算专利竞争分析', type: 'competitor', priority: 'medium', status: 'completed', progress: 100, time: '2024-03-12 15:20' },
  { id: 'PT008', name: '网络安全技术全景', type: 'landscape', priority: 'low', status: 'pending', progress: 0, time: '2024-03-17 10:00' },
]);

const STATUS_MAP = {
  completed: { text: '已完成', cls: 'tag-green' },
  running: { text: '进行中', cls: 'tag-blue' },
  pending: { text: '待处理', cls: 'tag-gray' },
  failed: { text: '失败', cls: 'tag-red' },
};
const TYPE_MAP = {
  general: '综合分析',
  trend: '趋势分析',
  competitor: '竞争分析',
  landscape: '技术全景',
};
const PRIORITY_MAP = {
  high: { text: '高', cls: 'tag-red' },
  medium: { text: '中', cls: 'tag-orange' },
  low: { text: '低', cls: 'tag-blue' },
};

const taskSearch = ref('');
const taskStatusFilter = ref('');
const taskPriorityFilter = ref('');
const currentTaskPage = ref(1);
const taskPageSize = 5;

const filteredTasks = computed(() => {
  return TASK_DATA.value.filter(t => {
    const term = taskSearch.value.toLowerCase();
    const matchSearch = !term || t.name.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
    const matchStatus = !taskStatusFilter.value || t.status === taskStatusFilter.value;
    const matchPriority = !taskPriorityFilter.value || t.priority === taskPriorityFilter.value;
    return matchSearch && matchStatus && matchPriority;
  });
});
const totalTaskPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / taskPageSize)));
const pagedTasks = computed(() => {
  const start = (currentTaskPage.value - 1) * taskPageSize;
  return filteredTasks.value.slice(start, start + taskPageSize);
});
function goToTaskPage(page) {
  currentTaskPage.value = page;
}
function viewTaskDetail(task) {
  showToast(`查看任务详情: ${task.name}`, 'info');
}
function editTask(task) {
  editingTask.value = { ...task };
  showEditTaskModal.value = true;
}
function downloadTaskReport(task) {
  downloadTaskId.value = task.id;
  showDownloadModal.value = true;
}
function deleteTask(task) {
  if (confirm(`确定要删除任务 "${task.name}" 吗？`)) {
    TASK_DATA.value = TASK_DATA.value.filter(t => t.id !== task.id);
    showToast('任务已删除', 'success');
  }
}

// ==================== 新建任务弹窗 ====================
const showCreateTaskModal = ref(false);
const newTask = reactive({
  name: '', type: 'general', priority: 'medium', field: '', desc: '',
});
function openCreateTaskModal() {
  Object.assign(newTask, { name: '', type: 'general', priority: 'medium', field: '', desc: '' });
  showCreateTaskModal.value = true;
}
function submitNewTask() {
  if (!newTask.name) { showToast('请输入任务名称', 'warning'); return; }
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const seq = TASK_DATA.value.length + 1;
  TASK_DATA.value.unshift({
    id: 'PT' + String(seq).padStart(3, '0'),
    name: newTask.name, type: newTask.type, priority: newTask.priority,
    status: 'pending', progress: 0, time: timeStr,
  });
  showCreateTaskModal.value = false;
  showToast('任务创建成功！', 'success');
}

// ==================== 编辑任务弹窗 ====================
const showEditTaskModal = ref(false);
const editingTask = ref(null);
function closeEditTaskModal() {
  showEditTaskModal.value = false;
  editingTask.value = null;
}
function saveEditedTask() {
  if (!editingTask.value.name) { showToast('请输入任务名称', 'warning'); return; }
  const idx = TASK_DATA.value.findIndex(t => t.id === editingTask.value.id);
  if (idx >= 0) {
    TASK_DATA.value[idx] = { ...editingTask.value };
    showToast('任务已更新', 'success');
  }
  closeEditTaskModal();
}

// ==================== 合并任务弹窗 ====================
const showMergeModal = ref(false);
const mergeSelected = ref([]);
function openMergeModal() {
  mergeSelected.value = [];
  showMergeModal.value = true;
}
function toggleMergeTask(id) {
  const idx = mergeSelected.value.indexOf(id);
  if (idx >= 0) mergeSelected.value.splice(idx, 1);
  else mergeSelected.value.push(id);
}
function mergeTasks() {
  if (mergeSelected.value.length < 2) { showToast('请选择至少两个任务进行合并', 'warning'); return; }
  showToast(`已成功合并 ${mergeSelected.value.length} 个任务，生成综合分析报告！`, 'success');
  showMergeModal.value = false;
}

// ==================== 下载弹窗 ====================
const showDownloadModal = ref(false);
const downloadTaskId = ref('');
const downloadFormat = ref('pdf');
function closeDownloadModal() {
  showDownloadModal.value = false;
  downloadTaskId.value = '';
}
function confirmDownload() {
  showToast(`报告下载已开始（${downloadFormat.value.toUpperCase()} 格式）`, 'success');
  closeDownloadModal();
}

// ==================== 案例库数据 ====================
const CASE_DATA = [
  {
    id: 'C001', title: '人工智能专利布局战略分析', subtitle: '深度学习技术领域', field: 'ai',
    tags: ['机器学习', '深度学习', '神经网络'],
    desc: '对人工智能领域TOP10企业专利布局进行全面分析,揭示技术发展趋势和竞争态势,为企业专利战略提供决策支持。',
    patentCount: 12580, analysisDepth: '深度', completeness: 95, rating: 4.8,
    downloads: 2341, fileSize: '15.6 MB', date: '2024-03-10', views: 1250, needAuth: false,
  },
  {
    id: 'C002', title: '量子计算专利技术全景', subtitle: '量子比特技术', field: 'quantum',
    tags: ['量子算法', '量子纠错'],
    desc: '系统梳理量子计算技术发展脉络,构建技术全景图,识别关键突破点,为技术路线规划提供依据。',
    patentCount: 8930, analysisDepth: '全面', completeness: 98, rating: 4.9,
    downloads: 1892, fileSize: '18.2 MB', date: '2024-03-08', views: 980, needAuth: false,
  },
  {
    id: 'C003', title: '区块链技术专利竞争分析', subtitle: '分布式账本技术', field: 'blockchain',
    tags: ['智能合约', '共识算法'],
    desc: '对比分析主要企业的区块链专利布局,评估技术竞争力,揭示竞争格局。',
    patentCount: 7640, analysisDepth: '标准', completeness: 88, rating: 4.6,
    downloads: 1432, fileSize: '12.4 MB', date: '2024-03-05', views: 876, needAuth: false,
  },
  {
    id: 'C004', title: '生物医学工程专利导航', subtitle: '医疗影像技术', field: 'biomed',
    tags: ['医学影像', '辅助诊断'],
    desc: '为医疗企业提供专利导航服务,指导研发方向和专利布局,规避侵权风险。',
    patentCount: 6580, analysisDepth: '深度', completeness: 92, rating: 4.7,
    downloads: 1127, fileSize: '14.8 MB', date: '2024-03-02', views: 756, needAuth: true,
  },
  {
    id: 'C005', title: '新能源电池技术专利分析', subtitle: '锂离子电池', field: 'ai',
    tags: ['电池材料', '充电技术'],
    desc: '深入分析新能源电池技术专利格局,识别技术突破点,为材料研发提供参考。',
    patentCount: 9250, analysisDepth: '全面', completeness: 90, rating: 4.5,
    downloads: 986, fileSize: '11.2 MB', date: '2024-02-28', views: 654, needAuth: false,
  },
  {
    id: 'C006', title: '自动驾驶专利技术路线', subtitle: '智能感知技术', field: 'ai',
    tags: ['感知融合', '决策规划'],
    desc: '构建自动驾驶技术路线图,预测技术演进方向,为企业战略规划提供依据。',
    patentCount: 5830, analysisDepth: '标准', completeness: 85, rating: 4.4,
    downloads: 765, fileSize: '9.8 MB', date: '2024-02-25', views: 543, needAuth: false,
  },
  {
    id: 'C007', title: '5G通信专利竞争态势', subtitle: '无线接入技术', field: 'ai',
    tags: ['射频技术', '天线设计'],
    desc: '分析5G通信领域的专利竞争态势,识别技术热点和空白点,指导研发方向。',
    patentCount: 10240, analysisDepth: '全面', completeness: 94, rating: 4.8,
    downloads: 2105, fileSize: '16.7 MB', date: '2024-02-20', views: 1120, needAuth: true,
  },
  {
    id: 'C008', title: '半导体芯片专利布局', subtitle: '集成电路设计', field: 'ai',
    tags: ['芯片架构', '制程工艺'],
    desc: '梳理半导体芯片领域的专利布局,分析技术演进路径和竞争格局。',
    patentCount: 13450, analysisDepth: '深度', completeness: 96, rating: 4.9,
    downloads: 2876, fileSize: '21.3 MB', date: '2024-02-15', views: 1432, needAuth: false,
  },
];

const FIELD_MAP = {
  ai: '人工智能', quantum: '量子计算', blockchain: '区块链', biomed: '生物医学',
};

const currentCasePage = ref(1);
const casePageSize = 6;
const totalCasePages = computed(() => Math.max(1, Math.ceil(CASE_DATA.length / casePageSize)));
const pagedCases = computed(() => {
  const start = (currentCasePage.value - 1) * casePageSize;
  return CASE_DATA.slice(start, start + casePageSize);
});
function goToCasePage(page) {
  currentCasePage.value = page;
}
function viewCase(c) {
  if (c.needAuth) {
    showAuthModal.value = true;
    authCase.value = c;
  } else {
    showToast(`查看案例: ${c.title}`, 'info');
  }
}
function downloadCase(c) {
  if (c.needAuth) {
    showAuthModal.value = true;
    authCase.value = c;
  } else {
    showToast(`下载案例报告: ${c.title}（${c.fileSize}）`, 'success');
  }
}

// ==================== 授权弹窗 ====================
const showAuthModal = ref(false);
const authCase = ref(null);
function closeAuthModal() {
  showAuthModal.value = false;
  authCase.value = null;
}
function requestAuth() {
  showToast('授权申请已提交，请等待管理员审批', 'success');
  closeAuthModal();
}

// ==================== 深度分析矩阵数据 ====================
const MATRIX_DATA = {
  countries: ['中国', '美国', '日本', '德国', '韩国'],
  fields: ['人工智能', '量子计算', '区块链', '生物医学', '5G通信', '半导体'],
  counts: [
    [12580, 3450, 2890, 5670, 8930, 10240],
    [8920, 5230, 3450, 6230, 7580, 15234],
    [4560, 1890, 1230, 3450, 4560, 8900],
    [2340, 1560, 890, 5670, 2340, 6780],
    [3450, 890, 670, 1230, 5670, 4560],
  ],
  growth: [
    [68.5, 45.2, 52.3, 38.7, 55.8, 62.1],
    [23.4, 35.6, 28.9, 15.2, 18.7, 12.3],
    [12.5, 18.7, 15.3, 22.1, 14.8, 8.9],
    [18.2, 12.5, 10.2, 28.9, 16.5, 11.7],
    [35.8, 22.4, 28.7, 19.5, 42.3, 38.2],
  ],
  citations: [
    [45, 38, 32, 52, 41, 48],
    [62, 75, 58, 68, 55, 71],
    [38, 45, 35, 42, 36, 40],
    [48, 52, 40, 55, 44, 47],
    [42, 48, 38, 45, 39, 43],
  ],
  quality: [
    [7.8, 7.2, 6.8, 8.1, 7.5, 7.9],
    [8.9, 9.2, 8.5, 8.8, 8.3, 9.0],
    [7.5, 7.8, 7.2, 7.6, 7.3, 7.7],
    [8.2, 8.5, 7.8, 8.4, 8.0, 8.3],
    [7.9, 8.1, 7.5, 7.8, 7.6, 8.0],
  ],
};

const matrixXAxis = ref('all');
const matrixYAxis = ref('all');
const matrixMetric = ref('count');
const highlightedCell = ref(null);

const X_AXIS_OPTIONS = [
  { value: 'china', label: '中国', index: 0 },
  { value: 'usa', label: '美国', index: 1 },
  { value: 'japan', label: '日本', index: 2 },
  { value: 'germany', label: '德国', index: 3 },
  { value: 'korea', label: '韩国', index: 4 },
  { value: 'all', label: '全部国家', index: -1 },
];
const Y_AXIS_OPTIONS = [
  { value: 'ai', label: '人工智能', index: 0 },
  { value: 'quantum', label: '量子计算', index: 1 },
  { value: 'blockchain', label: '区块链', index: 2 },
  { value: 'biomed', label: '生物医学', index: 3 },
  { value: '5g', label: '5G通信', index: 4 },
  { value: 'semiconductor', label: '半导体', index: 5 },
  { value: 'all', label: '全部领域', index: -1 },
];

const matrixRows = computed(() => {
  const xOpt = X_AXIS_OPTIONS.find(o => o.value === matrixXAxis.value);
  const yOpt = Y_AXIS_OPTIONS.find(o => o.value === matrixYAxis.value);
  let countryIndices = xOpt.index >= 0 ? [xOpt.index] : [0, 1, 2, 3, 4];
  let fieldIndices = yOpt.index >= 0 ? [yOpt.index] : [0, 1, 2, 3, 4, 5];
  return countryIndices.map(ci => {
    return fieldIndices.map(fi => {
      const count = MATRIX_DATA.counts[ci][fi];
      const growth = MATRIX_DATA.growth[ci][fi];
      const citations = MATRIX_DATA.citations[ci][fi];
      const quality = MATRIX_DATA.quality[ci][fi];
      return { country: MATRIX_DATA.countries[ci], field: MATRIX_DATA.fields[fi], count, growth, citations, quality, ci, fi };
    });
  });
});
const matrixFieldLabels = computed(() => {
  const yOpt = Y_AXIS_OPTIONS.find(o => o.value === matrixYAxis.value);
  const fieldIndices = yOpt.index >= 0 ? [yOpt.index] : [0, 1, 2, 3, 4, 5];
  return fieldIndices.map(i => MATRIX_DATA.fields[i]);
});
const matrixCountryLabels = computed(() => {
  const xOpt = X_AXIS_OPTIONS.find(o => o.value === matrixXAxis.value);
  const countryIndices = xOpt.index >= 0 ? [xOpt.index] : [0, 1, 2, 3, 4];
  return countryIndices.map(i => MATRIX_DATA.countries[i]);
});

const matrixMaxValue = computed(() => {
  let max = 0, min = Infinity;
  matrixRows.value.forEach(row => row.forEach(cell => {
    if (cell.count > max) max = cell.count;
    if (cell.count < min) min = cell.count;
  }));
  return { max, min };
});

function getMatrixColor(count) {
  const { max, min } = matrixMaxValue.value;
  if (max === min) return '#e6f7ff';
  const normalized = (count - min) / (max - min);
  if (normalized < 0.2) return '#e6f7ff';
  if (normalized < 0.4) return '#91d5ff';
  if (normalized < 0.6) return '#40a9ff';
  if (normalized < 0.8) return '#1890ff';
  return '#0050b3';
}
function getMatrixTextColor(count) {
  const { max, min } = matrixMaxValue.value;
  if (max === min) return '#333';
  const normalized = (count - min) / (max - min);
  return normalized > 0.6 ? '#fff' : '#333';
}
function getMatrixDisplayValue(cell) {
  if (matrixMetric.value === 'count') return cell.count.toLocaleString();
  if (matrixMetric.value === 'growth') return `${cell.growth.toFixed(1)}%`;
  if (matrixMetric.value === 'citations') return cell.citations.toFixed(1);
  return cell.quality.toFixed(1);
}
function getMatrixChangeInfo(cell) {
  if (matrixMetric.value === 'count') return { text: `${cell.growth > 0 ? '+' : ''}${cell.growth.toFixed(1)}%`, cls: cell.growth > 0 ? 'up' : 'down', icon: cell.growth > 0 ? 'up' : 'down' };
  if (matrixMetric.value === 'growth') return { text: cell.count.toLocaleString() + ' 项', cls: cell.growth > 0 ? 'up' : 'down', icon: cell.growth > 0 ? 'up' : 'down' };
  if (matrixMetric.value === 'citations') return { text: '平均引用', cls: '', icon: '' };
  return { text: '质量评分', cls: '', icon: '' };
}
function showCellDetail(cell) {
  highlightedCell.value = `${cell.ci}-${cell.fi}`;
  const content = `
    <div class="detail-section">
      <div class="detail-section-title">单元格详情</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-label">国家/地区</div><div class="detail-content-value">${cell.country}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">技术领域</div><div class="detail-content-value">${cell.field}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">专利数量</div><div class="detail-content-value">${cell.count.toLocaleString()} 项</div></li>
        <li class="detail-content-item"><div class="detail-content-label">增长率</div><div class="detail-content-value">${cell.growth > 0 ? '+' : ''}${cell.growth.toFixed(1)}%</div></li>
        <li class="detail-content-item"><div class="detail-content-label">平均引用数</div><div class="detail-content-value">${cell.citations.toFixed(1)}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">专利质量评分</div><div class="detail-content-value">${cell.quality.toFixed(1)}</div></li>
      </ul>
    </div>
  `;
  openDetailPanel(`${cell.country} - ${cell.field}`, content);
}

// 关键洞察
const maxGrowthCell = computed(() => {
  let max = 0, cell = null;
  matrixRows.value.forEach(row => row.forEach(c => {
    if (c.growth > max) { max = c.growth; cell = c; }
  }));
  return cell ? { country: cell.country, field: cell.field, value: cell.growth } : { country: '中国', field: '人工智能', value: 68.5 };
});
const maxCountCell = computed(() => {
  let max = 0, cell = null;
  matrixRows.value.forEach(row => row.forEach(c => {
    if (c.count > max) { max = c.count; cell = c; }
  }));
  return cell ? { country: cell.country, field: cell.field, value: cell.count } : { country: '美国', field: '半导体', value: 15234 };
});

function highlightMatrixCell(type) {
  const cell = type === 'growth' ? maxGrowthCell.value : maxCountCell.value;
  showToast(`定位到: ${cell.country} + ${cell.field}`, 'info');
}

function exportMatrixData() {
  let csv = '国家,技术领域,专利数量,增长率,平均引用,质量评分\n';
  for (let i = 0; i < MATRIX_DATA.countries.length; i++) {
    for (let j = 0; j < MATRIX_DATA.fields.length; j++) {
      csv += `${MATRIX_DATA.countries[i]},${MATRIX_DATA.fields[j]},${MATRIX_DATA.counts[i][j]},${MATRIX_DATA.growth[i][j]},${MATRIX_DATA.citations[i][j]},${MATRIX_DATA.quality[i][j]}\n`;
    }
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '专利矩阵数据.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据已导出成功！', 'success');
}

// ==================== 报告管理数据 ====================
const REPORT_DATA = ref([
  { id: 'R001', title: '人工智能专利综合分析报告', type: 'comprehensive', format: 'pdf', size: '15.6 MB', date: '2024-03-15', checked: false },
  { id: 'R002', title: '量子计算技术趋势报告', type: 'trend', format: 'pdf', size: '12.8 MB', date: '2024-03-12', checked: false },
  { id: 'R003', title: '5G通信竞争态势分析', type: 'competitive', format: 'word', size: '8.4 MB', date: '2024-03-10', checked: false },
  { id: 'R004', title: '半导体技术全景报告', type: 'landscape', format: 'ppt', size: '25.2 MB', date: '2024-03-08', checked: false },
]);

const REPORT_TYPE_MAP = {
  comprehensive: '综合分析报告', trend: '技术趋势报告', competitive: '竞争态势报告',
  landscape: '技术全景报告', summary: '执行摘要报告',
};
const REPORT_FORMAT_MAP = { pdf: 'PDF', word: 'Word', ppt: 'PPT', excel: 'Excel' };

const currentReportPage = ref(1);
const reportPageSize = 5;
const totalReportPages = computed(() => Math.max(1, Math.ceil(REPORT_DATA.value.length / reportPageSize)));
const pagedReports = computed(() => {
  const start = (currentReportPage.value - 1) * reportPageSize;
  return REPORT_DATA.value.slice(start, start + reportPageSize);
});
function goToReportPage(page) {
  currentReportPage.value = page;
}
function toggleReportCheckbox(id) {
  const r = REPORT_DATA.value.find(r => r.id === id);
  if (r) r.checked = !r.checked;
}
const selectAllReports = ref(false);
function toggleSelectAllReports() {
  REPORT_DATA.value.forEach(r => r.checked = selectAllReports.value);
}
function previewReportDetails(r) {
  const content = `
    <div class="detail-section">
      <div class="detail-section-title">报告信息</div>
      <ul class="detail-content-list">
        <li class="detail-content-item"><div class="detail-content-label">报告标题</div><div class="detail-content-value">${r.title}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">报告类型</div><div class="detail-content-value">${REPORT_TYPE_MAP[r.type]}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">输出格式</div><div class="detail-content-value">${REPORT_FORMAT_MAP[r.format]}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">文件大小</div><div class="detail-content-value">${r.size}</div></li>
        <li class="detail-content-item"><div class="detail-content-label">生成日期</div><div class="detail-content-value">${r.date}</div></li>
      </ul>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">报告摘要</div>
      <p style="font-size:14px;color:#666;line-height:1.8;">${getReportSummary(r.id)}</p>
    </div>
  `;
  openDetailPanel(r.title, content);
}
function getReportSummary(id) {
  const summaries = {
    R001: '本报告对全球人工智能专利技术发展趋势进行了全面分析，重点关注大模型、机器学习、计算机视觉等新兴技术领域。报告基于大量专利数据，通过多维度分析方法，为决策者提供了详细的技术发展洞察和战略建议。',
    R002: '本报告聚焦于量子计算技术发展趋势分析，通过对近五年专利数据的深入研究，识别出量子计算在金融、材料科学等领域的应用方向和发展趋势。',
    R003: '本报告分析了5G通信领域的竞争态势，对比了主要企业的专利布局情况，揭示了技术热点和竞争格局。',
    R004: '本报告构建了半导体技术全景图，涵盖了从材料、设计、制造到封装测试的全产业链专利分析。',
  };
  return summaries[id] || '暂无报告摘要。';
}
function downloadReport(r) {
  showToast(`下载报告: ${r.title}（${r.size}）`, 'success');
}
function shareReport(r) {
  showToast(`分享链接已复制: ${r.title}`, 'success');
}

// ==================== 报告生成器弹窗 ====================
const showReportGeneratorModal = ref(false);
const reportForm = reactive({ type: 'comprehensive', format: 'pdf', notes: '' });
function openReportGeneratorModal() {
  Object.assign(reportForm, { type: 'comprehensive', format: 'pdf', notes: '' });
  showReportGeneratorModal.value = true;
}
function generateReport() {
  showReportGeneratorModal.value = false;
  showToast('报告生成中，请稍候...', 'info');
  setTimeout(() => {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const newId = 'R' + String(REPORT_DATA.value.length + 1).padStart(3, '0');
    const sizes = ['8.5 MB', '12.3 MB', '15.6 MB', '18.2 MB', '21.0 MB'];
    REPORT_DATA.value.unshift({
      id: newId,
      title: reportForm.type === 'comprehensive' ? '综合分析报告' : REPORT_TYPE_MAP[reportForm.type],
      type: reportForm.type, format: reportForm.format,
      size: sizes[Math.floor(Math.random() * sizes.length)], date: dateStr, checked: false,
    });
    showToast('报告生成完成！', 'success');
  }, 2000);
}

// ==================== Toast 提示 ====================
const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
let toastTimer = null;
function showToast(message, type = 'success') {
  toastMessage.value = message;
  toastType.value = type;
  toastVisible.value = true;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastVisible.value = false; }, 3000);
}
</script>

<template>
  <div class="patent-analysis-page">
    <!-- 顶部导航栏（固定） -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'overview' }" @click="switchTab('overview')">
          <i class="fas fa-chart-pie"></i> 专利分析总览
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'task-management' }" @click="switchTab('task-management')">
          <i class="fas fa-tasks"></i> 任务管理
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'case-library' }" @click="switchTab('case-library')">
          <i class="fas fa-folder-open"></i> 案例库
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'deep-analysis' }" @click="switchTab('deep-analysis')">
          <i class="fas fa-search-plus"></i> 深度分析
        </a>
      </nav>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
      <h1 class="page-title">专利分析</h1>

      <!-- ========== Tab1 专利分析总览 ========== -->
      <div v-show="activeTab === 'overview'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-chart-pie"></i> 专利分析总览</div>
          </div>

          <!-- (1) 关键词可视化 -->
          <div class="chart-card" style="margin-bottom:20px;">
            <div class="chart-title"><i class="fas fa-cloud" style="color:#1890ff;"></i> 研究热点关键词分析</div>
            <div class="keyword-visualization">
              <div class="word-cloud-container">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;">关键词词云图</span>
                  <span style="font-size:12px;color:#999;">字体大小代表热度高低</span>
                </div>
                <div class="word-cloud">
                  <div v-for="kw in KEYWORD_DATA" :key="kw.name" class="word-item"
                       :class="[`word-size-${kw.size}`, { active: selectedKeyword && selectedKeyword.name === kw.name }]"
                       @click="selectKeyword(kw)">
                    {{ kw.name }}
                    <span class="word-percent">{{ kw.percent }}%</span>
                    <i :class="`fas fa-arrow-${kw.trend === 'up' ? 'up' : 'down'} word-trend ${kw.trend}`"></i>
                  </div>
                </div>
              </div>
              <div class="keyword-ranking">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;font-weight:500;">关键词热度排行榜 TOP5</span>
                  <span style="font-size:12px;color:#1890ff;cursor:pointer;">查看全部 <i class="fas fa-arrow-right"></i></span>
                </div>
                <div>
                  <div v-for="(kw, i) in top5Keywords" :key="kw.name" class="ranking-item"
                       :class="{ active: selectedKeyword && selectedKeyword.name === kw.name }" @click="selectKeyword(kw)">
                    <div class="ranking-number" :class="i < 3 ? 'top3' : 'normal'">{{ i + 1 }}</div>
                    <div class="ranking-info">
                      <div class="ranking-name">{{ kw.name }}</div>
                      <div class="ranking-meta">{{ kw.count.toLocaleString() }} 项专利</div>
                    </div>
                    <div class="ranking-stats">
                      <div class="ranking-count">{{ kw.percent }}%</div>
                      <div class="ranking-growth" :class="{ negative: kw.trend === 'down' }">
                        <i :class="`fas fa-arrow-${kw.trend === 'up' ? 'up' : 'down'}`"></i>
                        {{ kw.trend === 'up' ? '+12.5' : '-3.2' }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- (2) 全球专利布局分布 -->
          <div class="chart-card" style="margin-bottom:20px;">
            <div class="chart-title"><i class="fas fa-globe-americas" style="color:#52c41a;"></i> 全球专利布局分布</div>
            <div class="global-distribution">
              <div class="map-container">
                <div class="world-map">
                  <div v-for="r in mapRegions" :key="r.name" class="map-region"
                       :class="{ active: activeCountry && activeCountry.name === r.name }"
                       :style="{ left: r.x + '%', top: r.y + '%', width: r.widthPct + '%', height: r.heightPct + '%', background: r.color, opacity: 0.8 }"
                       @click="selectCountry(r)">
                    {{ r.name }}
                  </div>
                </div>
              </div>
              <div class="country-list">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;font-weight:500;">国家/地区专利布局排名</span>
                  <span style="font-size:12px;color:#999;">按专利数量排序</span>
                </div>
                <div v-for="(c, i) in COUNTRY_DATA" :key="c.name" class="country-item"
                     :class="{ active: activeCountry && activeCountry.name === c.name }" @click="selectCountry(c)">
                  <div class="country-rank" :class="i < 3 ? 'top3' : 'normal'">{{ c.rank }}</div>
                  <div class="country-info">
                    <div class="country-name">{{ c.name }}</div>
                    <div class="country-progress-track">
                      <div class="country-progress-fill" :style="{ width: c.percent + '%' }"></div>
                    </div>
                  </div>
                  <div class="country-stats">
                    <div class="country-value">{{ c.count.toLocaleString() }}</div>
                    <div class="country-percent">{{ c.percent }}%</div>
                    <div class="country-trend" :class="c.trend">
                      <i :class="`fas fa-arrow-${c.trend}`"></i>
                    </div>
                  </div>
                </div>
                <div class="summary-box" style="margin-top:20px;" @click="highlightLeaderCountry">
                  <div class="summary-item">
                    <div class="summary-label">领先国家专利数</div>
                    <div class="summary-value">32,580</div>
                  </div>
                  <div style="width:1px;height:40px;background:rgba(255,255,255,0.3);"></div>
                  <div class="summary-item">
                    <div class="summary-label">增长国家数量</div>
                    <div class="summary-value">12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- (3) 顶级机构协作网络 -->
          <div class="chart-card" style="margin-bottom:20px;">
            <div class="chart-title"><i class="fas fa-project-diagram" style="color:#722ed1;"></i> 顶级机构协作网络</div>
            <div class="institution-network">
              <div class="network-graph">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;">机构协作关系图</span>
                  <span style="font-size:12px;color:#999;">圆圈大小代表专利数量</span>
                </div>
                <div class="node-canvas">
                  <div v-for="link in institutionLinks" :key="link.left + '-' + link.top" class="connection-line"
                       :style="{ left: link.left + '%', top: link.top + '%', width: link.width + '%', transform: `rotate(${link.angle}deg)` }"></div>
                  <div v-for="inst in INSTITUTION_DATA" :key="inst.name" class="node"
                       :class="{ active: activeInstitution && activeInstitution.name === inst.name }"
                       :style="{ left: inst.x + '%', top: inst.y + '%', width: inst.size + 'px', height: inst.size + 'px', background: inst.color, marginLeft: -(inst.size/2) + 'px', marginTop: -(inst.size/2) + 'px' }"
                       :title="inst.name"
                       @click="selectInstitution(inst)">
                    {{ inst.name.substring(0, 2) }}
                  </div>
                </div>
              </div>
              <div class="institution-list">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;font-weight:500;">顶级机构排名</span>
                  <span style="font-size:12px;color:#999;">按专利数量排序</span>
                </div>
                <div v-for="(inst, i) in INSTITUTION_DATA" :key="inst.name" class="institution-item"
                     :class="{ active: activeInstitution && activeInstitution.name === inst.name }" @click="selectInstitution(inst)">
                  <div class="inst-rank" :class="i < 3 ? 'top3' : 'normal'">{{ i + 1 }}</div>
                  <div class="inst-info">
                    <div class="inst-name">{{ inst.name }}</div>
                    <div class="inst-location"><i class="fas fa-map-marker-alt"></i> {{ inst.location }}</div>
                  </div>
                  <div class="inst-stats">
                    <div class="inst-count">{{ inst.count.toLocaleString() }}</div>
                  </div>
                </div>
                <div class="summary-box" style="margin-top:20px;background:linear-gradient(135deg,#722ed1 0%,#9254de 100%);" @click="highlightTopInstitution">
                  <div class="summary-item">
                    <div class="summary-label">机构总数</div>
                    <div class="summary-value">128</div>
                  </div>
                  <div style="width:1px;height:40px;background:rgba(255,255,255,0.3);"></div>
                  <div class="summary-item">
                    <div class="summary-label">最高专利数</div>
                    <div class="summary-value">8,560</div>
                  </div>
                  <div style="width:1px;height:40px;background:rgba(255,255,255,0.3);"></div>
                  <div class="summary-item">
                    <div class="summary-label">平均专利数</div>
                    <div class="summary-value">675</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- (4) IPC技术分类分布 -->
          <div class="chart-card">
            <div class="chart-title"><i class="fas fa-tags" style="color:#fa8c16;"></i> IPC技术分类分布</div>
            <div class="ipc-analysis">
              <div class="ipc-section-chart">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;">IPC部类分布</span>
                  <span style="font-size:12px;color:#999;">点击筛选具体分类</span>
                </div>
                <div class="ipc-sections">
                  <div v-for="s in IPC_SECTIONS" :key="s.code" class="section-item"
                       :class="{ active: selectedSection === s.code }" @click="filterIPCBySection(s.code)">
                    <div class="section-name">{{ s.code }} - {{ s.name }}</div>
                    <div class="section-percent">{{ s.percent }}%</div>
                    <div class="section-desc">{{ s.desc }}</div>
                  </div>
                </div>
              </div>
              <div class="ipc-list">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                  <span style="font-size:14px;color:#666;font-weight:500;">IPC具体分类 TOP10</span>
                  <span style="font-size:12px;color:#999;">按专利数量排序</span>
                </div>
                <div v-for="ipc in filteredIPCClasses" :key="ipc.code" class="ipc-item"
                     :class="ipc.trend === 'up' ? 'trend-up' : 'trend-down'" @click="selectIPC(ipc)">
                  <div class="ipc-code">{{ ipc.code }}</div>
                  <div class="ipc-desc">{{ ipc.desc }}</div>
                  <div class="ipc-stats">
                    <div class="ipc-count">{{ ipc.count.toLocaleString() }}</div>
                    <div class="ipc-percent">{{ ipc.percent }}%</div>
                  </div>
                </div>
                <div v-if="filteredIPCClasses.length === 0" style="padding:30px;text-align:center;color:#999;font-size:13px;">暂无匹配的IPC分类</div>
                <div class="summary-box" style="margin-top:20px;background:linear-gradient(135deg,#fa8c16 0%,#ffa940 100%);" @click="highlightTopIPC">
                  <div class="summary-item">
                    <div class="summary-label">分类总数</div>
                    <div class="summary-value">10</div>
                  </div>
                  <div style="width:1px;height:40px;background:rgba(255,255,255,0.3);"></div>
                  <div class="summary-item">
                    <div class="summary-label">增长分类</div>
                    <div class="summary-value">6</div>
                  </div>
                  <div style="width:1px;height:40px;background:rgba(255,255,255,0.3);"></div>
                  <div class="summary-item">
                    <div class="summary-label">最高占比</div>
                    <div class="summary-value">19.5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab2 任务管理 ========== -->
      <div v-show="activeTab === 'task-management'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-tasks"></i> 任务管理</div>
            <div style="display:flex;gap:12px;">
              <button class="btn btn-secondary" @click="openMergeModal"><i class="fas fa-compress-arrows-alt"></i> 合并任务</button>
              <button class="btn btn-primary" @click="openCreateTaskModal"><i class="fas fa-plus"></i> 新建任务</button>
            </div>
          </div>

          <div class="filter-section">
            <div class="filter-row">
              <div class="search-wrapper">
                <input type="text" class="search-input" v-model="taskSearch" placeholder="搜索任务名称、技术领域...">
                <i class="fas fa-search search-icon"></i>
              </div>
              <select class="filter-select" v-model="taskStatusFilter">
                <option value="">全部状态</option>
                <option value="completed">已完成</option>
                <option value="running">进行中</option>
                <option value="pending">待处理</option>
                <option value="failed">失败</option>
              </select>
              <select class="filter-select" v-model="taskPriorityFilter">
                <option value="">全部优先级</option>
                <option value="high">高优先级</option>
                <option value="medium">中优先级</option>
                <option value="low">低优先级</option>
              </select>
            </div>
          </div>

          <div class="chart-card">
            <table class="data-table">
              <thead>
                <tr>
                  <th>任务ID</th><th>任务名称</th><th>分析类型</th><th>优先级</th>
                  <th>状态</th><th>进度</th><th>创建时间</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in pagedTasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td><a href="javascript:void(0)" @click="viewTaskDetail(task)" style="color:#1890ff;text-decoration:none;font-weight:500;">{{ task.name }}</a></td>
                  <td>{{ TYPE_MAP[task.type] }}</td>
                  <td><span class="tag" :class="PRIORITY_MAP[task.priority].cls">{{ PRIORITY_MAP[task.priority].text }}</span></td>
                  <td><span class="tag" :class="STATUS_MAP[task.status].cls">{{ STATUS_MAP[task.status].text }}</span></td>
                  <td>
                    <div class="progress-bar" style="width:120px;">
                      <div class="progress-fill" :class="task.status === 'completed' ? 'success' : task.status === 'failed' ? 'error' : ''" :style="{ width: task.progress + '%' }"></div>
                    </div>
                    <span style="font-size:12px;color:#999;">{{ task.progress }}%</span>
                  </td>
                  <td>{{ task.time.split(' ')[0] }}</td>
                  <td>
                    <div style="display:flex;gap:8px;">
                      <button class="report-action-btn" title="查看详情" @click="viewTaskDetail(task)"><i class="fas fa-eye"></i></button>
                      <button class="report-action-btn" title="编辑任务" @click="editTask(task)"><i class="fas fa-edit"></i></button>
                      <button class="report-action-btn" title="下载报告" @click="downloadTaskReport(task)"><i class="fas fa-download"></i></button>
                      <button class="report-action-btn" title="删除任务" style="color:#f5222d;border-color:#f5222d;" @click="deleteTask(task)"><i class="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="pagedTasks.length === 0">
                  <td colspan="8" style="text-align:center;padding:40px;color:#999;">暂无匹配任务</td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <span class="page-info">共 {{ filteredTasks.length }} 条，第 {{ currentTaskPage }}/{{ totalTaskPages }} 页</span>
              <button v-for="i in totalTaskPages" :key="i" class="page-btn" :class="{ active: i === currentTaskPage }" @click="goToTaskPage(i)">{{ i }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab3 案例库 ========== -->
      <div v-show="activeTab === 'case-library'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-folder-open"></i> 专利分析案例库</div>
          </div>
          <div class="case-card-grid">
            <div v-for="c in pagedCases" :key="c.id" class="case-card" @click="viewCase(c)" style="position:relative;">
              <div class="case-header">
                <div class="case-title">{{ c.title }}</div>
                <div class="case-subtitle">{{ c.subtitle }}</div>
              </div>
              <div class="case-body">
                <div>
                  <span v-for="tag in c.tags" :key="tag" class="case-tag">{{ tag }}</span>
                </div>
                <div class="case-desc">{{ c.desc }}</div>
                <div class="case-metrics">
                  <div class="case-metric-item">
                    <div class="case-metric-value">{{ c.patentCount.toLocaleString() }}</div>
                    <div class="case-metric-label">专利数量</div>
                  </div>
                  <div class="case-metric-item">
                    <div class="case-metric-value">{{ c.completeness }}%</div>
                    <div class="case-metric-label">完整度</div>
                  </div>
                  <div class="case-metric-item">
                    <div class="case-rating">
                      <span class="case-stars">★★★★★</span>
                      <span class="case-score">{{ c.rating }}</span>
                    </div>
                    <div class="case-metric-label">用户评分</div>
                  </div>
                </div>
              </div>
              <div class="case-footer">
                <div class="case-meta-row">
                  <div class="case-meta-item"><i class="fas fa-calendar"></i> {{ c.date }}</div>
                  <div class="case-meta-item"><i class="fas fa-download"></i> {{ c.downloads.toLocaleString() }}</div>
                  <div class="case-meta-item"><i class="fas fa-database"></i> {{ c.fileSize }}</div>
                  <div class="case-meta-item"><i class="fas fa-clock"></i> {{ c.analysisDepth }}</div>
                </div>
                <div class="case-actions" @click.stop>
                  <button v-if="c.needAuth" class="case-btn case-btn-auth" @click="downloadCase(c)">
                    <i class="fas fa-lock"></i> 授权访问
                  </button>
                  <button v-else class="case-btn case-btn-download" @click="downloadCase(c)">
                    <i class="fas fa-download"></i> 下载
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination" style="margin-top:24px;">
            <span class="page-info">共 {{ CASE_DATA.length }} 条，第 {{ currentCasePage }}/{{ totalCasePages }} 页</span>
            <button v-for="i in totalCasePages" :key="i" class="page-btn" :class="{ active: i === currentCasePage }" @click="goToCasePage(i)">{{ i }}</button>
          </div>
        </div>
      </div>

      <!-- ========== Tab4 深度分析 ========== -->
      <div v-show="activeTab === 'deep-analysis'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title"><i class="fas fa-search-plus"></i> 深度专利分析</div>
            <button class="btn btn-primary" @click="exportMatrixData"><i class="fas fa-download"></i> 导出数据</button>
          </div>

          <div class="filter-section">
            <div class="filter-row" style="align-items:flex-end;">
              <div class="form-group" style="margin:0;flex:1;">
                <label class="form-label">X轴 - 国家/地区</label>
                <select class="form-input" style="height:40px;" v-model="matrixXAxis">
                  <option v-for="o in X_AXIS_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
                </select>
              </div>
              <div class="form-group" style="margin:0;flex:1;">
                <label class="form-label">Y轴 - 技术领域</label>
                <select class="form-input" style="height:40px;" v-model="matrixYAxis">
                  <option v-for="o in Y_AXIS_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
                </select>
              </div>
              <div class="form-group" style="margin:0;flex:1;">
                <label class="form-label">核心指标</label>
                <select class="form-input" style="height:40px;" v-model="matrixMetric">
                  <option value="count">专利数量</option>
                  <option value="growth">增长率</option>
                  <option value="citations">平均引用</option>
                  <option value="quality">专利质量</option>
                </select>
              </div>
            </div>
          </div>

          <div class="chart-card" style="margin-top:20px;">
            <div class="chart-title">
              <i class="fas fa-th" style="color:#1890ff;"></i> 国家-技术领域专利矩阵
              <span class="trend-indicator"><i class="fas fa-info-circle"></i> 点击单元格查看详情</span>
            </div>
            <div style="overflow-x:auto;padding:20px;">
              <div class="matrix-grid" :style="{ gridTemplateColumns: `repeat(${matrixFieldLabels.length}, 1fr)` }">
                <div v-for="(row, ri) in matrixRows" :key="ri">
                  <div v-for="(cell, ci) in row" :key="ri + '-' + ci" class="matrix-cell"
                       :class="{ highlighted: highlightedCell === cell.ci + '-' + cell.fi }"
                       :style="{ backgroundColor: getMatrixColor(cell.count), color: getMatrixTextColor(cell.count) }"
                       @click="showCellDetail(cell)">
                    <div class="matrix-cell-value">{{ getMatrixDisplayValue(cell) }}</div>
                    <div class="matrix-cell-change" :class="getMatrixChangeInfo(cell).cls">
                      <template v-if="getMatrixChangeInfo(cell).icon">
                        <i :class="`fas fa-arrow-${getMatrixChangeInfo(cell).icon}`"></i>
                      </template>
                      {{ getMatrixChangeInfo(cell).text }}
                    </div>
                    <div class="matrix-cell-label">{{ cell.country }} - {{ cell.field }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:16px;padding:12px;background:#fafafa;border-radius:8px;">
              <span style="font-size:12px;color:#666;">低</span>
              <div style="width:200px;height:12px;background:linear-gradient(to right,#e6f7ff,#1890ff,#096dd9,#003a8c);border-radius:6px;"></div>
              <span style="font-size:12px;color:#666;">高</span>
              <span style="font-size:12px;color:#999;margin-left:12px;">颜色越深，专利数量/强度越高</span>
            </div>
          </div>

          <div class="chart-card" style="margin-top:20px;">
            <div class="chart-title"><i class="fas fa-lightbulb" style="color:#faad14;"></i> 关键洞察</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
              <div class="insight-item" style="cursor:pointer;" @click="highlightMatrixCell('growth')">
                <div class="insight-icon"><i class="fas fa-rocket" style="color:#52c41a;"></i></div>
                <div class="insight-content">
                  <div class="insight-title">最高增长组合</div>
                  <div class="insight-value">{{ maxGrowthCell.country }} + {{ maxGrowthCell.field }}</div>
                  <div class="insight-metric">增长率: +{{ maxGrowthCell.value.toFixed(1) }}%</div>
                </div>
                <div class="insight-arrow"><i class="fas fa-chevron-right"></i></div>
              </div>
              <div class="insight-item" style="cursor:pointer;" @click="highlightMatrixCell('count')">
                <div class="insight-icon"><i class="fas fa-trophy" style="color:#1890ff;"></i></div>
                <div class="insight-content">
                  <div class="insight-title">最高值组合</div>
                  <div class="insight-value">{{ maxCountCell.country }} + {{ maxCountCell.field }}</div>
                  <div class="insight-metric">专利数量: {{ maxCountCell.value.toLocaleString() }} 项</div>
                </div>
                <div class="insight-arrow"><i class="fas fa-chevron-right"></i></div>
              </div>
            </div>
          </div>

          <div class="chart-card" style="margin-top:20px;">
            <div class="chart-title">
              <i class="fas fa-file-alt" style="color:#722ed1;"></i> 报告管理
              <button class="btn btn-primary" style="margin-left:auto;" @click="openReportGeneratorModal"><i class="fas fa-plus"></i> 生成报告</button>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:40px;"><input type="checkbox" v-model="selectAllReports" @change="toggleSelectAllReports"></th>
                  <th>报告标题</th><th>报告类型</th><th>格式</th><th>文件大小</th><th>生成日期</th><th style="width:120px;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in pagedReports" :key="r.id" style="cursor:pointer;" @click="previewReportDetails(r)">
                  <td @click.stop><input type="checkbox" :checked="r.checked" @change="toggleReportCheckbox(r.id)"></td>
                  <td><span style="color:#1890ff;font-weight:500;">{{ r.title }}</span></td>
                  <td>{{ REPORT_TYPE_MAP[r.type] }}</td>
                  <td><span class="tag tag-blue">{{ REPORT_FORMAT_MAP[r.format] }}</span></td>
                  <td>{{ r.size }}</td>
                  <td>{{ r.date }}</td>
                  <td @click.stop>
                    <div class="report-actions">
                      <button class="report-action-btn" title="预览" @click="previewReportDetails(r)"><i class="fas fa-eye"></i></button>
                      <button class="report-action-btn" title="下载" @click="downloadReport(r)"><i class="fas fa-download"></i></button>
                      <button class="report-action-btn" title="分享" @click="shareReport(r)"><i class="fas fa-share-alt"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <span class="page-info">共 {{ REPORT_DATA.length }} 条，第 {{ currentReportPage }}/{{ totalReportPages }} 页</span>
              <button v-for="i in totalReportPages" :key="i" class="page-btn" :class="{ active: i === currentReportPage }" @click="goToReportPage(i)">{{ i }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 详情面板（侧边栏） ========== -->
    <div class="detail-panel" :class="{ open: detailPanelOpen }">
      <div class="detail-panel-header">
        <div class="detail-panel-title">{{ detailPanelTitle }}</div>
        <button class="detail-panel-close" @click="closeDetailPanel"><i class="fas fa-times"></i></button>
      </div>
      <div class="detail-panel-body" v-html="detailPanelContent"></div>
    </div>

    <!-- ========== 新建任务弹窗 ========== -->
    <div class="modal-overlay" :class="{ open: showCreateTaskModal }" @click.self="showCreateTaskModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">新建分析任务</div>
          <button class="modal-close" @click="showCreateTaskModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">任务名称</label>
            <input type="text" class="form-input" v-model="newTask.name" placeholder="请输入任务名称">
          </div>
          <div class="form-group">
            <label class="form-label">分析类型</label>
            <select class="form-input" v-model="newTask.type">
              <option value="general">综合分析</option>
              <option value="trend">趋势分析</option>
              <option value="competitor">竞争分析</option>
              <option value="landscape">技术全景</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">优先级</label>
            <select class="form-input" v-model="newTask.priority">
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">技术领域</label>
            <input type="text" class="form-input" v-model="newTask.field" placeholder="请输入技术领域">
          </div>
          <div class="form-group">
            <label class="form-label">任务描述</label>
            <textarea class="form-textarea" v-model="newTask.desc" placeholder="请输入任务描述..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showCreateTaskModal = false">取消</button>
          <button class="btn btn-primary" @click="submitNewTask"><i class="fas fa-plus"></i> 创建任务</button>
        </div>
      </div>
    </div>

    <!-- ========== 编辑任务弹窗 ========== -->
    <div class="modal-overlay" :class="{ open: showEditTaskModal }" @click.self="closeEditTaskModal">
      <div class="modal-content" v-if="editingTask">
        <div class="modal-header">
          <div class="modal-title">编辑任务</div>
          <button class="modal-close" @click="closeEditTaskModal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">任务名称</label>
            <input type="text" class="form-input" v-model="editingTask.name">
          </div>
          <div class="form-group">
            <label class="form-label">分析类型</label>
            <select class="form-input" v-model="editingTask.type">
              <option value="general">综合分析</option>
              <option value="trend">趋势分析</option>
              <option value="competitor">竞争分析</option>
              <option value="landscape">技术全景</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">优先级</label>
            <select class="form-input" v-model="editingTask.priority">
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">状态</label>
            <select class="form-input" v-model="editingTask.status">
              <option value="completed">已完成</option>
              <option value="running">进行中</option>
              <option value="pending">待处理</option>
              <option value="failed">失败</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">进度</label>
            <input type="number" class="form-input" v-model.number="editingTask.progress" min="0" max="100">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeEditTaskModal">取消</button>
          <button class="btn btn-primary" @click="saveEditedTask"><i class="fas fa-save"></i> 保存</button>
        </div>
      </div>
    </div>

    <!-- ========== 合并任务弹窗 ========== -->
    <div class="modal-overlay" :class="{ open: showMergeModal }" @click.self="showMergeModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">合并任务</div>
          <button class="modal-close" @click="showMergeModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <p style="color:#999;font-size:13px;margin-bottom:16px;">请选择至少两个任务进行合并，系统将生成综合分析报告。</p>
          <div class="task-select-list">
            <label v-for="task in TASK_DATA" :key="task.id" class="task-select-item"
                   :class="{ selected: mergeSelected.includes(task.id) }" @click="toggleMergeTask(task.id)">
              <input type="checkbox" :checked="mergeSelected.includes(task.id)" @click.stop @change="toggleMergeTask(task.id)">
              <div class="task-select-info">
                <div class="task-name">{{ task.name }}</div>
                <div class="task-id">{{ task.id }} · {{ TYPE_MAP[task.type] }}</div>
              </div>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <div class="merge-summary">已选择 <span>{{ mergeSelected.length }}</span> 个任务</div>
          <div style="display:flex;gap:12px;">
            <button class="btn btn-secondary" @click="showMergeModal = false">取消</button>
            <button class="btn btn-primary" @click="mergeTasks"><i class="fas fa-compress-arrows-alt"></i> 合并任务</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 下载弹窗 ========== -->
    <div class="modal-overlay" :class="{ open: showDownloadModal }" @click.self="closeDownloadModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">下载任务报告</div>
          <button class="modal-close" @click="closeDownloadModal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <p style="color:#666;font-size:14px;margin-bottom:20px;">请选择下载格式：</p>
          <div class="download-option" :class="{ selected: downloadFormat === 'pdf' }" @click="downloadFormat = 'pdf'">
            <input type="radio" :checked="downloadFormat === 'pdf'" @click.stop="downloadFormat = 'pdf'">
            <div class="option-info">
              <div class="option-name">PDF 文档</div>
              <div class="option-desc">完整的分析报告，包含图表和数据</div>
            </div>
            <div class="option-icon"><i class="fas fa-file-pdf"></i></div>
          </div>
          <div class="download-option" :class="{ selected: downloadFormat === 'word' }" @click="downloadFormat = 'word'">
            <input type="radio" :checked="downloadFormat === 'word'" @click.stop="downloadFormat = 'word'">
            <div class="option-info">
              <div class="option-name">Word 文档</div>
              <div class="option-desc">可编辑的报告文档</div>
            </div>
            <div class="option-icon"><i class="fas fa-file-word"></i></div>
          </div>
          <div class="download-option" :class="{ selected: downloadFormat === 'excel' }" @click="downloadFormat = 'excel'">
            <input type="radio" :checked="downloadFormat === 'excel'" @click.stop="downloadFormat = 'excel'">
            <div class="option-info">
              <div class="option-name">Excel 表格</div>
              <div class="option-desc">专利数据明细表格</div>
            </div>
            <div class="option-icon"><i class="fas fa-file-excel"></i></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeDownloadModal">取消</button>
          <button class="btn btn-primary" @click="confirmDownload"><i class="fas fa-download"></i> 下载</button>
        </div>
      </div>
    </div>

    <!-- ========== 报告生成器弹窗 ========== -->
    <div class="modal-overlay" :class="{ open: showReportGeneratorModal }" @click.self="showReportGeneratorModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">生成分析报告</div>
          <button class="modal-close" @click="showReportGeneratorModal = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:20px;">
            <div class="form-group">
              <label class="form-label">报告类型</label>
              <select class="form-input" style="height:40px;" v-model="reportForm.type">
                <option value="comprehensive">综合分析报告</option>
                <option value="trend">技术趋势报告</option>
                <option value="competitive">竞争态势报告</option>
                <option value="landscape">技术全景报告</option>
                <option value="summary">执行摘要报告</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">输出格式</label>
              <select class="form-input" style="height:40px;" v-model="reportForm.format">
                <option value="pdf">PDF文档</option>
                <option value="word">Word文档</option>
                <option value="ppt">PowerPoint演示</option>
              </select>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label">自定义说明</label>
            <textarea class="form-textarea" style="height:80px;" v-model="reportForm.notes" placeholder="添加报告的特殊要求或说明..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showReportGeneratorModal = false">取消</button>
          <button class="btn btn-primary" @click="generateReport">生成报告</button>
        </div>
      </div>
    </div>

    <!-- ========== 授权弹窗 ========== -->
    <div class="modal-overlay" :class="{ open: showAuthModal }" @click.self="closeAuthModal">
      <div class="modal-content" v-if="authCase">
        <div class="modal-header">
          <div class="modal-title">授权访问</div>
          <button class="modal-close" @click="closeAuthModal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div style="text-align:center;padding:20px 0;">
            <div style="font-size:48px;color:#fa8c16;margin-bottom:20px;"><i class="fas fa-lock"></i></div>
            <h3 style="text-align:center;margin-bottom:16px;color:#333;">该案例需要授权才能访问</h3>
            <div style="background:#fff7e6;border:1px solid #ffd591;border-radius:8px;padding:20px;text-align:left;margin-bottom:20px;">
              <div style="font-size:14px;color:#666;line-height:1.8;">
                案例名称: {{ authCase.title }}<br>
                技术领域: {{ authCase.subtitle }}<br>
                文件大小: {{ authCase.fileSize }}
              </div>
            </div>
            <p style="color:#999;font-size:13px;margin-bottom:20px;">您可以通过以下方式获取访问权限：</p>
            <ul style="list-style:none;padding:0;text-align:left;color:#666;font-size:13px;line-height:2;">
              <li><i class="fas fa-check" style="color:#52c41a;margin-right:8px;"></i>申请机构授权</li>
              <li><i class="fas fa-check" style="color:#52c41a;margin-right:8px;"></i>购买单独的案例访问权限</li>
              <li><i class="fas fa-check" style="color:#52c41a;margin-right:8px;"></i>升级到高级会员</li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeAuthModal">取消</button>
          <button class="btn btn-primary" @click="requestAuth"><i class="fas fa-paper-plane"></i> 申请授权</button>
        </div>
      </div>
    </div>

    <!-- ========== Toast 提示 ========== -->
    <div class="toast" :class="[`toast-${toastType}`, { show: toastVisible }]">
      <i :class="toastType === 'success' ? 'fas fa-check-circle' : toastType === 'warning' ? 'fas fa-exclamation-triangle' : toastType === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle'"></i>
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
.patent-analysis-page {
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
.word-cloud-container { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 400px; }
.word-cloud { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; padding: 20px; min-height: 320px; }
.word-item { cursor: pointer; transition: all 0.3s; padding: 4px 8px; border-radius: 4px; position: relative; }
.word-item:hover { transform: scale(1.1); background: #f0f5ff; }
.word-item.active { background: #1890ff; color: #fff !important; }
.word-item .word-percent { font-size: 11px; color: #999; margin-left: 4px; }
.word-item.active .word-percent { color: rgba(255,255,255,0.9); }
.word-item .word-trend { font-size: 12px; margin-left: 4px; }
.word-item .word-trend.up { color: #52c41a; }
.word-item .word-trend.down { color: #f5222d; }
.word-item.active .word-trend { color: rgba(255,255,255,0.9); }
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
.ranking-growth.negative { color: #f5222d; }

/* 全球分布视图 */
.global-distribution { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; margin-bottom: 30px; }
.map-container { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 440px; }
.world-map { width: 100%; height: 400px; position: relative; background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%); border-radius: 8px; overflow: hidden; border: 1px solid #d9d9d9; }
.map-region { position: absolute; cursor: pointer; transition: all 0.3s; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.5); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.map-region:hover { transform: scale(1.08); filter: brightness(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 10; }
.map-region.active { box-shadow: 0 0 0 3px #1890ff, 0 4px 12px rgba(0,0,0,0.2); z-index: 20; }
.country-list { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-height: 440px; overflow-y: auto; }
.country-item { display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.3s; }
.country-item:hover { background: #f5f7fa; }
.country-item.active { background: #e6f7ff; border-left: 3px solid #1890ff; }
.country-rank { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; margin-right: 12px; }
.country-rank.top3 { background: #fff2e8; color: #fa8c16; }
.country-rank.normal { background: #f5f5f5; color: #666; }
.country-info { flex: 1; }
.country-name { font-size: 14px; color: #333; font-weight: 500; }
.country-progress-track { position: relative; height: 6px; margin-top: 6px; background: #f0f0f0; border-radius: 3px; overflow: visible; }
.country-progress-fill { position: relative; height: 100%; background: #1890ff; border-radius: 3px; }
.country-progress-fill::after { content: ''; position: absolute; top: 50%; right: -5px; width: 10px; height: 10px; border: 2px solid #fff; border-radius: 50%; background: #1890ff; box-shadow: 0 1px 4px rgba(24,144,255,0.35); transform: translateY(-50%); }
.country-stats { text-align: right; }
.country-value { font-size: 15px; font-weight: 600; color: #1890ff; }
.country-percent { font-size: 11px; color: #999; }
.country-trend { font-size: 11px; margin-top: 2px; }
.country-trend.up { color: #52c41a; }
.country-trend.down { color: #f5222d; }

/* 机构协作网络 */
.institution-network { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
.network-graph { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 450px; }
.node-canvas { width: 100%; height: 400px; position: relative; background: #fafafa; border-radius: 8px; overflow: hidden; }
.node { position: absolute; border-radius: 50%; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.node:hover { transform: scale(1.2); z-index: 10; }
.node.active { box-shadow: 0 0 0 4px #1890ff; z-index: 20; }
.connection-line { position: absolute; height: 2px; background: #d9d9d9; transform-origin: left center; opacity: 0.5; }
.institution-list { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-height: 450px; overflow-y: auto; }
.institution-item { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.3s; }
.institution-item:hover { background: #f5f7fa; }
.institution-item.active { background: #e6f7ff; border-left: 3px solid #1890ff; }
.inst-rank { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; margin-right: 12px; }
.inst-rank.top3 { background: #fff2e8; color: #fa8c16; }
.inst-rank.normal { background: #f5f5f5; color: #666; }
.inst-info { flex: 1; }
.inst-name { font-size: 14px; color: #333; font-weight: 500; }
.inst-location { font-size: 12px; color: #999; margin-top: 2px; }
.inst-stats { text-align: right; }
.inst-count { font-size: 16px; font-weight: 600; color: #1890ff; }

/* IPC分类分析 */
.ipc-analysis { display: grid; grid-template-columns: 0.6fr 1fr; gap: 20px; margin-bottom: 30px; }
.ipc-section-chart { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.ipc-sections { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 16px; }
.section-item { padding: 16px; border-radius: 8px; cursor: pointer; transition: all 0.3s; background: #f8fafc; border: 2px solid transparent; }
.section-item:hover { border-color: #1890ff; background: #e6f7ff; }
.section-item.active { border-color: #1890ff; background: #e6f7ff; }
.section-name { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 8px; }
.section-percent { font-size: 24px; font-weight: 700; color: #1890ff; }
.section-desc { font-size: 12px; color: #999; margin-top: 4px; }
.ipc-list { background: #fff; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.ipc-item { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.3s; }
.ipc-item:hover { background: #f5f7fa; }
.ipc-item.active { background: #e6f7ff; border-left: 3px solid #1890ff; }
.ipc-code { width: 90px; font-size: 14px; font-weight: 600; color: #1890ff; margin-right: 12px; }
.ipc-desc { flex: 1; font-size: 14px; color: #333; }
.ipc-stats { text-align: right; }
.ipc-count { font-size: 15px; font-weight: 600; color: #333; }
.ipc-percent { font-size: 12px; color: #999; margin-top: 2px; }

/* 摘要信息 */
.summary-box { background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%); border-radius: 8px; padding: 20px; color: #fff; display: flex; gap: 20px; align-items: center; cursor: pointer; transition: all 0.3s; }
.summary-box:hover { box-shadow: 0 4px 12px rgba(24,144,255,0.3); }
.summary-item { flex: 1; text-align: center; }
.summary-label { font-size: 13px; opacity: 0.9; margin-bottom: 8px; }
.summary-value { font-size: 28px; font-weight: 700; }

/* 详情面板 */
.detail-panel { position: fixed; right: -600px; top: 104px; width: 600px; height: calc(100vh - 104px); background: #fff; box-shadow: -4px 0 16px rgba(0,0,0,0.1); z-index: 100; transition: right 0.3s; overflow-y: auto; }
.detail-panel.open { right: 0; }
.detail-panel-header { padding: 20px; border-bottom: 1px solid #e8e8e8; display: flex; justify-content: space-between; align-items: center; background: #fafafa; position: sticky; top: 0; z-index: 10; }
.detail-panel-title { font-size: 18px; font-weight: 600; color: #333; }
.detail-panel-close { width: 36px; height: 36px; border: none; background: transparent; cursor: pointer; color: #999; font-size: 20px; border-radius: 6px; transition: all 0.3s; }
.detail-panel-close:hover { background: #f0f0f0; color: #333; }
.detail-panel-body { padding: 20px; }
.detail-panel-body :deep(.detail-section) { margin-bottom: 24px; }
.detail-panel-body :deep(.detail-section-title) { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
.detail-panel-body :deep(.detail-section-title::before) { content: ''; width: 4px; height: 16px; background: #1890ff; border-radius: 2px; }
.detail-panel-body :deep(.detail-content-list) { list-style: none; padding: 0; }
.detail-panel-body :deep(.detail-content-item) { padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
.detail-panel-body :deep(.detail-content-item:last-child) { border-bottom: none; }
.detail-panel-body :deep(.detail-content-label) { font-size: 12px; color: #999; margin-bottom: 4px; }
.detail-panel-body :deep(.detail-content-value) { font-size: 14px; color: #333; }
.detail-panel-body :deep(.detail-trend-chart) { display: flex; align-items: flex-end; justify-content: space-around; height: 200px; gap: 8px; padding-top: 20px; }
.detail-panel-body :deep(.trend-bar-item) { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; height: 100%; justify-content: flex-end; }
.detail-panel-body :deep(.trend-bar) { width: 100%; max-width: 40px; border-radius: 4px 4px 0 0; transition: height 0.3s; min-height: 4px; }
.detail-panel-body :deep(.trend-year) { font-size: 11px; color: #999; }
.detail-panel-body :deep(.trend-val) { font-size: 11px; color: #666; font-weight: 500; }

/* 筛选区 */
.filter-section { background: #fff; border-radius: 4px; padding: 20px; margin-bottom: 20px; }
.filter-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.search-wrapper { position: relative; flex: 1; max-width: 400px; }
.search-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 40px 0 12px; font-size: 14px; }
.search-input:focus { outline: none; border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; cursor: pointer; }
.filter-select { height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 13px; min-width: 150px; background: #fff; cursor: pointer; }
.filter-select:focus { outline: none; border-color: #1890ff; }

/* 按钮 */
.btn { padding: 8px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; transition: all 0.3s; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary { background: #1890ff; color: #fff; }
.btn-primary:hover { background: #40a9ff; }
.btn-secondary { background: #fff; color: #666; border: 1px solid #d9d9d9; }
.btn-secondary:hover { border-color: #1890ff; color: #1890ff; }

/* 数据表格 */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { background: #fafafa; padding: 14px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #333; border-bottom: 1px solid #e8e8e8; }
.data-table td { padding: 14px 16px; border-bottom: 1px solid #e8e8e8; font-size: 13px; color: #666; }
.data-table tr:hover { background: #f5f7fa; }

/* 标签 */
.tag { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; }
.tag-blue { background: #e6f7ff; color: #1890ff; }
.tag-green { background: #f6ffed; color: #52c41a; }
.tag-orange { background: #fff2e8; color: #fa8c16; }
.tag-red { background: #fff1f0; color: #f5222d; }
.tag-gray { background: #f5f5f5; color: #999; }

/* 进度条 */
.progress-bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: #1890ff; border-radius: 3px; transition: width 0.3s; }
.progress-fill.success { background: #52c41a; }
.progress-fill.warning { background: #fa8c16; }
.progress-fill.error { background: #f5222d; }

/* 分页 */
.pagination { display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 20px; }
.page-btn { width: 36px; height: 36px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; transition: all 0.3s; font-size: 14px; color: #666; }
.page-btn:hover { border-color: #1890ff; color: #1890ff; }
.page-btn.active { background: #1890ff; color: #fff; border-color: #1890ff; }
.page-info { font-size: 13px; color: #999; margin-right: 8px; }

/* 模态框 */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 1000; }
.modal-overlay.open { display: flex; }
.modal-content { background: #fff; width: 700px; max-height: 85vh; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.15); display: flex; flex-direction: column; }
.modal-header { padding: 20px; border-bottom: 1px solid #e8e8e8; display: flex; justify-content: space-between; align-items: center; background: #fafafa; }
.modal-title { font-size: 16px; font-weight: 600; color: #333; }
.modal-close { width: 32px; height: 32px; border: none; background: transparent; cursor: pointer; color: #999; font-size: 18px; border-radius: 4px; transition: all 0.3s; }
.modal-close:hover { background: #f0f0f0; color: #333; }
.modal-body { padding: 24px; overflow-y: auto; flex: 1; }
.modal-footer { padding: 16px 24px; border-top: 1px solid #e8e8e8; background: #fafafa; display: flex; justify-content: space-between; align-items: center; gap: 12px; }

/* 表单 */
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 13px; font-weight: 500; color: #333; margin-bottom: 8px; }
.form-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 14px; background: #fff; }
.form-input:focus { outline: none; border-color: #1890ff; box-shadow: 0 0 0 3px rgba(24,144,255,0.1); }
.form-textarea { width: 100%; min-height: 100px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 12px; font-size: 14px; font-family: inherit; resize: vertical; }
.form-textarea:focus { outline: none; border-color: #1890ff; }

/* 任务选择列表 */
.task-select-list { display: flex; flex-direction: column; gap: 10px; }
.task-select-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e8e8e8; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.task-select-item:hover { border-color: #1890ff; background: #f0f5ff; }
.task-select-item.selected { border-color: #1890ff; background: #e6f7ff; }
.task-select-info { flex: 1; }
.task-select-info .task-name { font-size: 14px; color: #333; font-weight: 500; }
.task-select-info .task-id { font-size: 12px; color: #999; margin-top: 2px; }
.merge-summary { font-size: 14px; color: #666; }
.merge-summary span { color: #1890ff; font-weight: 600; }

/* 案例卡片 */
.case-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.case-card { background: #fff; border: 1px solid #e8e8e8; border-radius: 12px; overflow: hidden; transition: all 0.3s; cursor: pointer; position: relative; }
.case-card:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.12); transform: translateY(-6px); border-color: #1890ff; }
.case-header { padding: 24px; background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%); color: #fff; }
.case-title { font-size: 17px; font-weight: 600; margin-bottom: 8px; line-height: 1.4; }
.case-subtitle { font-size: 13px; opacity: 0.95; }
.case-body { padding: 20px; }
.case-tag { display: inline-block; padding: 4px 12px; background: #e6f7ff; color: #1890ff; border-radius: 4px; font-size: 12px; margin: 0 4px 8px 0; }
.case-desc { font-size: 13px; color: #666; line-height: 1.6; margin-top: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.case-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; padding: 16px; background: #fafafa; border-radius: 8px; }
.case-metric-item { text-align: center; }
.case-metric-value { font-size: 18px; font-weight: 600; color: #1890ff; }
.case-metric-label { font-size: 12px; color: #999; margin-top: 4px; }
.case-footer { padding: 16px 20px; border-top: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
.case-meta-row { display: flex; gap: 16px; font-size: 12px; color: #666; flex-wrap: wrap; }
.case-meta-item { display: flex; align-items: center; gap: 4px; }
.case-actions { display: flex; gap: 8px; }
.case-btn { padding: 6px 14px; border-radius: 4px; font-size: 13px; cursor: pointer; transition: all 0.2s; border: none; display: flex; align-items: center; gap: 6px; }
.case-btn-download { background: #1890ff; color: #fff; }
.case-btn-download:hover { background: #40a9ff; }
.case-btn-auth { background: #fa8c16; color: #fff; }
.case-btn-auth:hover { background: #ffa940; }
.case-rating { display: flex; align-items: center; gap: 4px; color: #faad14; font-size: 13px; justify-content: center; }
.case-stars { letter-spacing: 1px; }
.case-score { font-weight: 600; margin-left: 4px; }

/* 矩阵图 */
.matrix-grid { display: grid; gap: 8px; min-width: 800px; }
.matrix-cell { padding: 16px; border-radius: 8px; cursor: pointer; transition: all 0.3s; position: relative; min-height: 100px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.matrix-cell:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 2; }
.matrix-cell.highlighted { border: 3px solid #faad14; box-shadow: 0 0 20px rgba(250, 173, 20, 0.4); transform: scale(1.08); z-index: 3; }
.matrix-cell-value { font-size: 24px; font-weight: 700; color: inherit; margin-bottom: 4px; }
.matrix-cell-change { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
.matrix-cell-change.up { color: #52c41a; }
.matrix-cell-change.down { color: #f5222d; }
.matrix-cell-label { font-size: 12px; color: inherit; opacity: 0.8; margin-top: 8px; }

/* 关键洞察 */
.insight-item { display: flex; align-items: center; gap: 16px; padding: 20px; background: #fafafa; border-radius: 8px; border: 1px solid #e8e8e8; transition: all 0.3s; }
.insight-item:hover { background: #f0f9ff; border-color: #1890ff; transform: translateX(4px); }
.insight-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 50%; font-size: 20px; flex-shrink: 0; }
.insight-content { flex: 1; }
.insight-title { font-size: 13px; color: #999; margin-bottom: 4px; }
.insight-value { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 4px; }
.insight-metric { font-size: 14px; color: #666; }
.insight-arrow { color: #999; transition: transform 0.3s; }
.insight-item:hover .insight-arrow { transform: translateX(4px); color: #1890ff; }

/* 趋势指示器 */
.trend-indicator { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: #999; margin-left: 8px; font-weight: normal; }
.trend-indicator.up { color: #52c41a; }
.trend-indicator.down { color: #f5222d; }

/* 报告表格操作按钮 */
.report-actions { display: flex; gap: 8px; }
.report-action-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; transition: all 0.2s; color: #666; font-size: 13px; }
.report-action-btn:hover { border-color: #1890ff; color: #1890ff; background: #e6f7ff; }

/* 下载选项 */
.download-option { display: flex; align-items: center; padding: 12px 15px; border: 1px solid #e8e8e8; border-radius: 6px; margin-bottom: 10px; cursor: pointer; transition: all 0.2s; }
.download-option:hover { border-color: #1890ff; background: #f0f7ff; }
.download-option.selected { border-color: #1890ff; background: #e6f7ff; }
.download-option input { margin-right: 12px; accent-color: #1890ff; }
.download-option .option-info { flex: 1; }
.download-option .option-name { font-size: 14px; color: #333; font-weight: 500; }
.download-option .option-desc { font-size: 12px; color: #999; margin-top: 2px; }
.download-option .option-icon { font-size: 24px; color: #1890ff; margin-left: 10px; }

/* Toast 提示 */
.toast { position: fixed; top: 80px; right: 20px; padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; gap: 10px; font-size: 14px; z-index: 10000; opacity: 0; transform: translateX(100px); transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.toast.show { opacity: 1; transform: translateX(0); }
.toast-success { background: #f6ffed; color: #52c41a; border: 1px solid #b7eb8f; }
.toast-warning { background: #fffbe6; color: #faad14; border: 1px solid #ffe58f; }
.toast-error { background: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
.toast-info { background: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
</style>