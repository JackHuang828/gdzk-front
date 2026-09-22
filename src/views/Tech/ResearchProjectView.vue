<script setup>
// 科研项目分析（1.2.4）：技术体系分析 → 科研项目分析。
// 1:1 还原 HTML 原型：项目检索 / 统计分析 / 任务管理 三个 Tab。
import { ref, computed, reactive } from 'vue';

// ==================== Tab 切换 ====================
const activeTab = ref('project-search');
function switchTab(tab) {
  activeTab.value = tab;
}

// ==================== 项目数据 ====================
const PROJECTS = [
  { id: 'NSFC001', name: '深度学习算法优化研究', leader: '张伟', agency: '国家自然科学基金', funding: 280, startDate: '2023-01-01', endDate: '2026-12-31', status: '进行中', type: 'key', field: 'ai', region: '中国', abstract: '针对大规模深度学习模型训练效率低的问题，研究新型算法优化方法。' },
  { id: 'NSFC002', name: '量子纠缠态生成与操控', leader: '李明', agency: '国家自然科学基金', funding: 350, startDate: '2023-03-01', endDate: '2027-02-28', status: '进行中', type: 'major', field: 'quantum', region: '中国', abstract: '探索高效量子纠缠态制备方案及精准操控技术。' },
  { id: 'MST003', name: '新能源汽车关键材料研发', leader: '王芳', agency: '科技部', funding: 860, startDate: '2023-01-15', endDate: '2027-01-14', status: '进行中', type: 'key', field: 'materials', region: '中国', abstract: '开发高性能电池材料，提升新能源汽车续航能力。' },
  { id: 'MOE004', name: '人工智能辅助医学诊断系统', leader: '刘强', agency: '教育部', funding: 420, startDate: '2023-06-01', endDate: '2026-05-31', status: '进行中', type: 'youth', field: 'biomed', region: '中国', abstract: '构建基于AI的医学影像诊断系统，提高诊断准确率。' },
  { id: 'NSFC005', name: '大规模数据并行处理技术', leader: '陈静', agency: '国家自然科学基金', funding: 195, startDate: '2023-04-01', endDate: '2026-03-31', status: '进行中', type: 'youth', field: 'ai', region: '美国', abstract: '研究面向大数据场景的高效并行处理算法。' },
  { id: 'CAS006', name: '新型半导体材料制备', leader: '赵磊', agency: '中国科学院', funding: 580, startDate: '2022-09-01', endDate: '2026-08-31', status: '已完成', type: 'key', field: 'materials', region: '日本', abstract: '制备新型半导体材料，提升器件性能。' },
  { id: 'MST007', name: '智能电网能量管理优化', leader: '孙丽', agency: '科技部', funding: 720, startDate: '2022-07-01', endDate: '2026-06-30', status: '进行中', type: 'major', field: 'energy', region: '德国', abstract: '优化智能电网能量调度算法，提高能源利用效率。' },
  { id: 'NSFC008', name: '量子通信网络协议研究', leader: '周鹏', agency: '国家自然科学基金', funding: 245, startDate: '2023-02-01', endDate: '2026-01-31', status: '进行中', type: 'youth', field: 'quantum', region: '美国', abstract: '设计安全高效的量子通信网络协议。' },
  { id: 'MOE009', name: '生物信息学数据挖掘', leader: '吴强', agency: '教育部', funding: 380, startDate: '2023-05-01', endDate: '2026-04-30', status: '进行中', type: 'key', field: 'biomed', region: '韩国', abstract: '利用大数据挖掘技术分析生物序列信息。' },
  { id: 'MST010', name: '碳中和路径规划研究', leader: '郑明', agency: '科技部', funding: 920, startDate: '2022-08-01', endDate: '2027-07-31', status: '进行中', type: 'major', field: 'energy', region: '中国', abstract: '研究实现碳中和目标的技术路径和政策建议。' }
];

const researchFieldMap = {
  ai: '人工智能',
  quantum: '量子计算',
  materials: '新材料',
  biomed: '生物医学',
  energy: '能源环境'
};

const statusMap = {
  '进行中': { class: 'tag-green', text: '进行中', order: 1 },
  '已完成': { class: 'tag-blue', text: '已完成', order: 2 },
  '已结题': { class: 'tag-gray', text: '已结题', order: 3 },
  '已终止': { class: 'tag-red', text: '已终止', order: 4 }
};

// 项目详情数据
const projectDetailData = {
  NSFC001: {
    background: '面向大规模深度学习模型参数量持续增长、训练成本高和推理效率不足等问题，项目聚焦算法结构与计算资源协同优化，为智能分析和行业模型部署提供基础能力。',
    objective: '构建覆盖模型压缩、训练加速和推理优化的算法体系，在保证模型精度的前提下，降低训练资源消耗并提升复杂场景下的响应效率。',
    route: ['建立面向任务的模型性能评测基线', '研究稀疏化、量化与知识蒸馏等轻量化方法', '开展分布式训练和异构算力协同优化', '在公共服务与科研数据场景进行验证和迭代'],
    results: ['形成一套深度学习模型训练效率评测指标体系', '完成混合精度训练优化原型，训练耗时降低约28%', '开发面向多卡环境的自适应任务调度组件', '在图像分类与文本分析任务中保持较高模型精度', '提交算法优化相关技术报告和软件著作权材料'],
    patents: ['一种基于稀疏化的深度学习模型压缩方法', '面向异构计算环境的神经网络训练调度方法', '一种深度学习模型的自适应量化方法', '基于知识蒸馏的轻量级模型构建方法', '一种大规模神经网络的快速推理系统'],
    papers: ['面向大模型训练的动态稀疏优化方法研究', '异构算力环境下深度学习任务调度机制', '混合精度训练对模型收敛效率的影响分析', '知识蒸馏在行业智能模型中的应用探索', '深度学习模型压缩技术的评测与比较']
  },
  NSFC002: {
    background: '量子纠缠态是量子计算、量子通信和精密测量的重要资源。现有制备过程对环境噪声和操控精度较为敏感，项目围绕纠缠态生成、保持与调控开展系统研究。',
    objective: '提升多粒子纠缠态制备的稳定性和可重复性，形成适用于实验平台的精准操控方案，为量子信息处理提供可靠的基础态资源。',
    route: ['设计适配超导与光量子平台的纠缠态制备方案', '研究噪声建模、误差抑制与状态保真度评估方法', '开发脉冲序列优化和实时反馈控制模块', '完成典型量子算法与通信链路验证'],
    results: ['建立量子纠缠态制备与保真度评估实验流程', '完成多种噪声条件下的纠缠态稳定性测试', '形成一套量子操控脉冲参数优化方法', '在模拟平台上实现典型纠缠态的可重复生成', '完成量子实验数据分析软件原型开发'],
    patents: ['一种多粒子量子纠缠态的生成装置及方法', '量子比特操控脉冲的自适应优化方法', '一种量子纠缠态保真度检测系统', '面向噪声环境的量子态校准方法', '一种量子实验数据的实时反馈控制装置'],
    papers: ['噪声环境下多粒子纠缠态制备方法研究', '基于脉冲优化的超导量子比特操控实验', '量子纠缠态保真度的评估与误差分析', '量子态实时反馈控制策略的仿真研究', '纠缠资源在量子信息处理中的应用展望']
  },
  MST003: {
    background: '新能源汽车快速发展对高能量密度、长寿命和高安全性电池材料提出更高要求。项目围绕正负极、电解液及复合材料开展协同研发，支撑动力电池性能提升。',
    objective: '开发兼顾能量密度、循环寿命和安全性的新能源汽车关键材料，打通材料配方、工艺验证和电池性能评价之间的技术链路。',
    route: ['分析动力电池材料的性能需求与失效机理', '开展正负极及电解液配方设计和材料制备', '完成材料结构表征与电芯级性能测试', '进行中试工艺验证和应用场景适配评估'],
    results: ['完成高镍正极材料配方的多轮优化', '开发低阻抗复合负极材料样品', '形成适配快充场景的电解液添加剂方案', '完成小试电芯循环寿命和安全性能测试', '建立新能源汽车电池材料性能评价数据库'],
    patents: ['一种高稳定性新能源汽车正极材料及其制备方法', '用于动力电池的复合负极材料', '一种高安全性锂电池电解液添加剂', '新能源汽车电池材料的表面包覆方法', '一种动力电池材料性能测试装置'],
    papers: ['高镍正极材料结构稳定性与循环性能研究', '快充型锂离子电池电解液体系优化', '复合负极材料的界面调控及储锂机制', '新能源汽车动力电池安全性能评价方法', '面向高能量密度电池的材料体系发展趋势']
  },
  MOE004: {
    background: '医学影像数据量快速增长，但基层医疗机构在影像判读、辅助筛查和优质医疗资源配置方面仍存在不足。项目结合人工智能与医学知识，建设可解释的辅助诊断系统。',
    objective: '构建面向典型疾病筛查的医学影像辅助诊断模型，提升异常识别效率与结果可解释性，形成可供临床人员使用的辅助决策工具。',
    route: ['整理脱敏医学影像与标注数据集', '研究多尺度特征提取和病灶识别算法', '融合临床知识构建可解释诊断模型', '开展多中心回顾性验证和系统交互优化'],
    results: ['完成多模态医学影像数据治理与标注规范', '开发肺部和脑部影像辅助识别模型原型', '增加病灶区域可视化与诊断依据提示功能', '完成多中心样本的初步准确性验证', '形成面向临床试用的系统原型和评估报告'],
    patents: ['一种基于深度学习的医学影像病灶识别方法', '面向多模态影像的辅助诊断系统', '一种医学人工智能模型的可解释输出方法', '医学影像数据的隐私保护处理方法', '一种临床辅助诊断结果的交互展示装置'],
    papers: ['多模态医学影像融合诊断模型研究', '面向病灶识别的可解释深度学习方法', '医学影像人工智能系统的临床评价框架', '隐私保护场景下的医疗数据协同建模', '人工智能辅助医学诊断的应用边界与治理']
  },
  NSFC005: {
    background: '科研计算、智能分析和公共服务产生的数据规模不断扩大，传统串行处理方式难以满足大规模数据的实时处理要求。项目聚焦数据并行组织、任务调度和存储访问优化。',
    objective: '形成面向异构计算环境的大规模数据并行处理方法，提高数据密集型任务的吞吐率、资源利用率和运行稳定性。',
    route: ['分析典型数据处理任务的访问与计算特征', '设计数据分区、并行执行和负载均衡策略', '研究内存、存储与计算资源协同调度机制', '在科研数据和智能分析任务中开展性能验证'],
    results: ['完成大规模数据处理基准任务集建设', '开发数据分区与并行调度原型组件', '实现面向混合负载的资源动态分配策略', '在典型数据集上验证吞吐率提升效果', '形成数据并行处理性能分析工具和技术报告'],
    patents: ['一种大规模数据的分布式并行处理方法', '面向异构算力的数据任务调度方法', '一种数据处理系统的动态负载均衡方法', '大数据计算中的内存与存储协同管理方法', '一种高并发数据处理任务的性能监测系统'],
    papers: ['面向异构集群的大规模数据并行调度研究', '数据密集型任务的分区策略与负载均衡', '混合存储架构下的数据访问优化方法', '大数据处理平台的性能建模与瓶颈分析', '面向科研场景的数据并行计算框架设计']
  },
  CAS006: {
    background: '先进计算、通信和智能终端对半导体材料的性能、可靠性和制造一致性提出更高要求。项目针对新型半导体材料制备中的缺陷控制和工艺稳定性开展研究。',
    objective: '探索新型半导体材料的制备工艺与性能调控方法，提升材料纯度、晶体质量及其在器件制造中的适配能力。',
    route: ['开展材料体系筛选与生长机理分析', '优化薄膜沉积、掺杂和热处理工艺', '建立材料结构、缺陷与器件性能关联模型', '完成样品制备、器件验证和工艺参数固化'],
    results: ['完成新型半导体材料制备工艺窗口摸底', '获得多批次高均匀性薄膜样品', '建立材料缺陷表征与质量评价流程', '完成基础器件样品的电学性能验证', '形成制备工艺参数数据库和实验规范'],
    patents: ['一种新型半导体薄膜材料的制备方法', '半导体材料生长过程中的缺陷控制方法', '一种高均匀性半导体薄膜沉积装置', '面向功率器件的宽禁带半导体材料', '半导体材料制备工艺参数的智能优化方法'],
    papers: ['新型半导体材料生长机理与缺陷调控研究', '薄膜沉积工艺对半导体器件性能的影响', '宽禁带半导体材料的制备与表征进展', '半导体材料缺陷检测及质量评价方法', '面向先进器件制造的材料工艺协同优化']
  },
  MST007: {
    background: '新能源发电比例提升后，电网负荷波动和多能源协同调度更加复杂。项目面向智能电网的实时感知、负荷预测和能量优化，提升电网运行的灵活性与可靠性。',
    objective: '构建融合预测分析和智能调度的能量管理方案，实现源网荷储协同优化，降低峰谷差并提升可再生能源消纳能力。',
    route: ['采集电网运行、负荷和新能源出力数据', '建立多时间尺度负荷与发电预测模型', '设计源网荷储协同优化调度算法', '建设仿真验证平台并开展典型区域测试'],
    results: ['完成智能电网多源数据接入和治理模块', '开发短期负荷预测模型与运行监测看板', '形成储能参与削峰填谷的调度策略', '在仿真场景中验证新能源消纳能力提升', '完成智能能量管理系统原型和试运行报告'],
    patents: ['一种智能电网的多源能量协同调度方法', '面向新能源出力的负荷预测方法', '一种储能系统参与电网削峰填谷的控制方法', '智能电网运行状态的异常检测系统', '一种基于边缘计算的能量管理终端'],
    papers: ['源网荷储协同下的智能电网能量管理研究', '新能源出力不确定性下的调度优化方法', '储能参与电力系统削峰填谷的策略分析', '智能电网多源数据融合与运行监测', '面向区域电网的负荷预测模型比较研究']
  },
  NSFC008: {
    background: '量子通信能够提供高安全等级的信息传输能力，但网络规模化部署仍面临协议协同、节点管理和链路稳定性等问题。项目围绕量子通信网络协议和运行机制展开研究。',
    objective: '设计适用于多节点量子通信网络的安全协议和资源管理机制，提升量子密钥分发的可靠性、扩展性与运行效率。',
    route: ['分析量子通信网络节点与链路的运行约束', '设计密钥分发、路由和认证协议', '研究链路状态感知与密钥资源调度方法', '通过仿真网络和实验链路进行协议验证'],
    results: ['完成量子通信网络协议需求与安全性分析', '设计多节点密钥分发协议流程', '开发量子链路状态监测与资源调度模块', '完成典型网络拓扑下的协议仿真测试', '形成量子通信网络部署建议和测试报告'],
    patents: ['一种量子通信网络的密钥分发方法', '面向多节点量子网络的安全认证方法', '量子通信链路的状态监测与切换方法', '一种量子密钥资源的动态调度系统', '量子通信网络协议的仿真验证平台'],
    papers: ['多节点量子通信网络路由协议研究', '量子密钥分发网络的资源调度方法', '量子通信链路状态感知与可靠性分析', '面向规模化部署的量子网络安全认证', '量子通信网络协议仿真平台设计与实现']
  },
  MOE009: {
    background: '基因组、转录组和蛋白质组数据的快速积累为疾病机制研究和精准医学提供了丰富资源，但多组学数据维度高、关联复杂，需要高效的数据挖掘与知识发现方法。',
    objective: '构建面向生物序列和多组学数据的分析流程，识别关键特征、潜在关联和候选生物标志物，为生物医学研究提供数据支撑。',
    route: ['建立标准化的生物数据清洗与注释流程', '开展特征选择、聚类和关联规则分析', '融合通路知识构建多组学关联网络', '通过公开数据集和实验结果开展交叉验证'],
    results: ['完成多组学数据标准化处理流程', '建立面向基因表达数据的特征筛选模型', '构建疾病相关基因与通路关联网络', '筛选出一批候选生物标志物', '开发生物信息学数据挖掘分析工具原型'],
    patents: ['一种多组学生物数据的联合分析方法', '基于基因表达数据的特征筛选方法', '生物信息学数据的知识关联网络构建方法', '一种生物序列的异常模式识别方法', '面向生物医学研究的数据挖掘系统'],
    papers: ['多组学数据融合分析与疾病标志物发现', '基于知识网络的生物信息学数据挖掘方法', '基因表达特征选择与疾病分类研究', '生物序列数据的异常模式识别分析', '生物医学大数据分析流程的构建与评估']
  },
  MST010: {
    background: '碳达峰碳中和目标下，能源结构、产业结构和区域发展条件差异较大，需要综合考虑技术成熟度、经济成本和减排潜力，形成分阶段、可实施的转型路径。',
    objective: '构建面向区域和重点行业的碳排放分析与路径规划方法，识别关键减排技术和政策工具，为碳中和行动方案提供决策参考。',
    route: ['开展区域碳排放核算和排放源识别', '建立能源需求、技术进步和政策情景模型', '评估重点行业减排技术组合与成本', '形成分阶段路径方案并开展敏感性分析'],
    results: ['完成重点区域碳排放基础数据整理', '建立能源消费与碳排放预测模型', '形成电力、交通和工业领域减排技术清单', '完成多情景碳中和路径测算', '提交区域碳中和路线图和政策建议报告'],
    patents: ['一种区域碳排放核算与预测方法', '面向多情景的碳中和路径规划系统', '重点行业减排技术组合评估方法', '一种能源消费结构优化分析平台', '碳排放数据的动态监测与预警方法'],
    papers: ['区域碳排放预测与碳中和路径规划研究', '多情景下能源转型与减排成本分析', '重点行业低碳技术组合评价方法', '碳中和目标下能源结构优化路径', '面向政策决策的碳排放数据分析框架']
  }
};

function getProjectDetail(project) {
  return projectDetailData[project.id] || {
    background: project.abstract,
    objective: `围绕"${project.name}"形成可验证的研究方案和应用成果。`,
    route: ['完成需求分析与数据准备', '开展关键技术研究与方案设计', '进行原型开发和阶段性验证', '形成应用评估与推广建议'],
    results: ['完成项目总体方案设计', '形成关键技术验证结果', '完成阶段性原型开发', '开展典型场景应用测试', '提交项目阶段总结报告'],
    patents: [`一种${project.name}相关的关键技术方法`, `面向${project.name}的系统及设备`, `一种${project.name}数据处理方法`, `基于${project.name}的智能分析方法`, `一种${project.name}应用平台`],
    papers: [`${project.name}关键技术研究`, `${project.name}的应用场景与实现方法`, `面向${project.name}的系统设计`, `${project.name}技术路线评估`, `${project.name}发展趋势分析`]
  };
}

function getResearchField(field) {
  return researchFieldMap[field] || field || '综合领域';
}

// ==================== 项目检索 ====================
const projectSearch = ref('');
const fundingAgency = ref('');
const projectType = ref('');
const researchField = ref('');
const currentProjectPage = ref(1);
const projectPageSize = 10;
const projectSortColumn = ref('');
const projectSortOrder = ref('asc');

const filteredProjects = computed(() => {
  let result = PROJECTS.filter(p => {
    const term = projectSearch.value.toLowerCase();
    const matchKeyword = !term || p.name.toLowerCase().includes(term) || p.id.toLowerCase().includes(term);
    let matchAgency = true;
    if (fundingAgency.value) {
      if (fundingAgency.value === 'nsfc') matchAgency = p.agency.includes('自然科学基金');
      else if (fundingAgency.value === 'mst') matchAgency = p.agency === '科技部';
      else if (fundingAgency.value === 'cas') matchAgency = p.agency.includes('中科院');
      else if (fundingAgency.value === 'moe') matchAgency = p.agency === '教育部';
    }
    const matchType = !projectType.value || p.type === projectType.value;
    const matchField = !researchField.value || p.field === researchField.value;
    return matchKeyword && matchAgency && matchType && matchField;
  });

  if (projectSortColumn.value) {
    result = [...result].sort((a, b) => {
      let valA, valB;
      switch (projectSortColumn.value) {
        case 'id': valA = a.id; valB = b.id; break;
        case 'name': valA = a.name; valB = b.name; break;
        case 'leader': valA = a.leader; valB = b.leader; break;
        case 'agency': valA = a.agency; valB = b.agency; break;
        case 'funding': valA = a.funding; valB = b.funding; break;
        case 'field': valA = getResearchField(a.field); valB = getResearchField(b.field); break;
        case 'startDate': valA = a.startDate; valB = b.startDate; break;
        case 'status': valA = statusMap[a.status].order; valB = statusMap[b.status].order; break;
        default: return 0;
      }
      if (typeof valA === 'number') {
        return projectSortOrder.value === 'asc' ? valA - valB : valB - valA;
      }
      return projectSortOrder.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }
  return result;
});

const totalProjectPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / projectPageSize)));
const pagedProjects = computed(() => {
  const start = (currentProjectPage.value - 1) * projectPageSize;
  return filteredProjects.value.slice(start, start + projectPageSize);
});

function sortProjects(column) {
  if (projectSortColumn.value === column) {
    projectSortOrder.value = projectSortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    projectSortColumn.value = column;
    projectSortOrder.value = 'asc';
  }
  currentProjectPage.value = 1;
}

function goToProjectPage(page) {
  currentProjectPage.value = page;
}

function searchProjects() {
  currentProjectPage.value = 1;
}

// ==================== 统计分析 ====================
const statsDimension = ref('all');
const statsTimeRange = ref('all');
const statsField = ref('');
const statsRegion = ref('');
const statsRefreshKey = ref(0);

const filteredStatsProjects = computed(() => {
  statsRefreshKey.value;
  let result = [...PROJECTS];
  if (statsTimeRange.value !== 'all') {
    result = result.filter(p => p.startDate.includes(statsTimeRange.value));
  }
  if (statsField.value) {
    result = result.filter(p => p.field === statsField.value);
  }
  if (statsRegion.value) {
    result = result.filter(p => p.region === statsRegion.value);
  }
  return result;
});

const statsCards = computed(() => {
  const fp = filteredStatsProjects.value;
  return {
    total: fp.length,
    funding: fp.reduce((sum, p) => sum + p.funding, 0),
    ongoing: fp.filter(p => p.status === '进行中').length,
    institutions: [...new Set(fp.map(p => p.agency))].length
  };
});

const fieldChartData = computed(() => {
  const keys = ['ai', 'quantum', 'materials', 'biomed', 'energy'];
  const colors = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2'];
  const baseProjects = statsRegion.value ? filteredStatsProjects.value : (statsTimeRange.value !== 'all' ? PROJECTS.filter(p => p.startDate.includes(statsTimeRange.value)) : PROJECTS);
  const counts = keys.map(k => baseProjects.filter(p => p.field === k).length);
  const max = Math.max(...counts, 1);
  return keys.map((k, i) => ({
    key: k,
    label: researchFieldMap[k],
    count: counts[i],
    color: colors[i],
    percent: max > 0 ? (counts[i] / max) * 100 : 0,
    selected: statsField.value === k
  }));
});

const regionChartData = computed(() => {
  const labels = ['中国', '美国', '日本', '德国', '韩国'];
  const colors = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2'];
  const baseProjects = statsField.value ? filteredStatsProjects.value : (statsTimeRange.value !== 'all' ? PROJECTS.filter(p => p.startDate.includes(statsTimeRange.value)) : PROJECTS);
  const counts = labels.map(l => baseProjects.filter(p => p.region === l).length);
  const max = Math.max(...counts, 1);
  return labels.map((l, i) => ({
    label: l,
    count: counts[i],
    color: colors[i],
    percent: max > 0 ? (counts[i] / max) * 100 : 0,
    selected: statsRegion.value === l
  }));
});

function updateStatistics() {
  statsRefreshKey.value++;
}

function filterByField(field) {
  statsField.value = field;
  statsRegion.value = '';
  updateStatistics();
}

function filterByRegion(region) {
  statsRegion.value = region;
  statsField.value = '';
  updateStatistics();
}

function refreshStatistics() {
  updateStatistics();
}

function exportStatisticsReport() {
  const report = `科研项目统计分析报告
=======================

统计时间: ${new Date().toLocaleString()}

核心指标:
- 项目总数: ${statsCards.value.total}
- 总经费: ${statsCards.value.funding.toLocaleString()}万元
- 进行中项目: ${statsCards.value.ongoing}
- 参与机构: ${statsCards.value.institutions}

筛选条件:
- 维度: ${statsDimension.value}
- 时间范围: ${statsTimeRange.value}
- 研究领域: ${statsField.value || '全部'}
- 地区: ${statsRegion.value || '全部'}
`;
  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `科研项目统计报告_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================== 任务管理 ====================
const TASKS = ref([
  { id: 'TASK001', name: '深度学习算法优化分析', type: '技术分析', status: 'running', priority: 'high', progress: 65, createTime: '2024-01-15', projectId: 'NSFC001' },
  { id: 'TASK002', name: '量子纠缠态研究趋势分析', type: '趋势分析', status: 'pending', priority: 'medium', progress: 0, createTime: '2024-01-18', projectId: 'NSFC002' },
  { id: 'TASK003', name: '新能源材料专利布局分析', type: '专利分析', status: 'running', priority: 'high', progress: 80, createTime: '2024-01-20', projectId: 'MST003' },
  { id: 'TASK004', name: 'AI医学诊断系统评估', type: '技术评估', status: 'completed', priority: 'medium', progress: 100, createTime: '2024-01-10', projectId: 'MOE004' },
  { id: 'TASK005', name: '大数据并行处理性能分析', type: '性能分析', status: 'failed', priority: 'low', progress: 45, createTime: '2024-01-12', projectId: 'NSFC005' },
  { id: 'TASK006', name: '半导体材料制备工艺分析', type: '工艺分析', status: 'running', priority: 'high', progress: 55, createTime: '2024-01-14', projectId: 'CAS006' },
  { id: 'TASK007', name: '智能电网优化方案研究', type: '方案研究', status: 'pending', priority: 'medium', progress: 0, createTime: '2024-01-16', projectId: 'MST007' },
  { id: 'TASK008', name: '量子通信网络协议分析', type: '协议分析', status: 'running', priority: 'low', progress: 30, createTime: '2024-01-17', projectId: 'NSFC008' },
  { id: 'TASK009', name: '生物信息学数据挖掘', type: '数据挖掘', status: 'completed', priority: 'medium', progress: 100, createTime: '2024-01-08', projectId: 'MOE009' },
  { id: 'TASK010', name: '碳中和路径可行性分析', type: '可行性分析', status: 'pending', priority: 'high', progress: 0, createTime: '2024-01-19', projectId: 'MST010' }
]);

const taskStatusMap = {
  'pending': { class: 'tag-orange', text: '待处理', order: 1 },
  'running': { class: 'tag-blue', text: '进行中', order: 2 },
  'completed': { class: 'tag-green', text: '已完成', order: 3 },
  'failed': { class: 'tag-red', text: '失败', order: 4 }
};

const taskPriorityMap = {
  'high': { class: 'tag-red', text: '高', order: 1 },
  'medium': { class: 'tag-orange', text: '中', order: 2 },
  'low': { class: 'tag-blue', text: '低', order: 3 }
};

const taskAnalysisData = {
  '技术分析': {
    inputData: ['技术主题词与领域分类词表', '相关论文、专利摘要及技术实体信息', '近五年技术指标和应用场景数据'],
    process: ['完成文本清洗、分词和实体标准化', '按照技术主题进行聚类和层级归并', '计算技术热度、成熟度及关联强度', '结合时间序列识别技术演化方向'],
    intermediate: ['技术主题聚类结果与关键词矩阵', '技术实体关联网络和主题演化曲线', '重点技术的指标对比与潜力评分'],
    finalOutput: ['技术分析综合报告', '重点技术清单及优先级排序', '面向决策的技术发展建议']
  },
  '趋势分析': {
    inputData: ['按年度汇总的论文与专利数量', '研究热点关键词及主题词频', '政策事件、产业动态和技术节点记录'],
    process: ['按时间窗口计算主题增长率和热度', '识别新兴、成长、成熟和衰退主题', '分析政策、产业事件与技术变化的关联', '对重点主题进行趋势外推和情景校验'],
    intermediate: ['年度研究产出趋势序列', '热点主题生命周期判断结果', '技术趋势拐点和影响因素列表'],
    finalOutput: ['技术趋势分析报告', '未来三年重点方向预测', '需要持续跟踪的技术主题清单']
  },
  '专利分析': {
    inputData: ['专利申请、授权及法律状态数据', 'IPC/CPC 分类号与专利家族信息', '申请人、发明人、引用关系和地域数据'],
    process: ['完成专利去重、家族合并和分类映射', '构建国家—技术领域专利矩阵', '计算申请人集中度、引用影响力和质量评分', '识别竞争主体与技术空白区域'],
    intermediate: ['专利布局矩阵和申请趋势图', '重点申请人竞争力对比结果', '高价值专利及技术空白清单'],
    finalOutput: ['专利布局分析报告', '重点竞争机构与核心专利列表', '专利布局优化及风险规避建议']
  },
  '技术评估': {
    inputData: ['技术性能、可靠性和成本指标', '实验测试数据与行业基准值', '技术成熟度、应用约束和专家评价'],
    process: ['统一指标口径并进行异常值处理', '采用多指标综合评价方法计算得分', '对技术成熟度、应用价值和风险进行分层', '通过敏感性分析检验评价结论稳定性'],
    intermediate: ['技术指标标准化结果', '技术成熟度与应用价值评分矩阵', '关键短板和风险因素识别结果'],
    finalOutput: ['技术综合评估报告', '技术等级与应用优先级建议', '后续验证、补强和转化建议']
  },
  '性能分析': {
    inputData: ['系统运行日志与资源监控数据', '不同硬件配置和负载规模', '响应时间、吞吐量、并发数和资源占用指标'],
    process: ['清理日志并构建统一性能基线', '按负载、硬件和任务类型进行分组对比', '定位延迟、吞吐和资源利用率瓶颈', '通过对照实验验证优化措施效果'],
    intermediate: ['多场景性能基准曲线', '资源利用率和瓶颈定位结果', '优化前后性能差异及置信区间'],
    finalOutput: ['系统性能分析报告', '关键瓶颈及影响因素清单', '容量规划和性能优化方案']
  },
  '工艺分析': {
    inputData: ['工艺流程、设备参数和材料批次信息', '过程质量检测与成品性能数据', '缺陷类型、发生频次和环境条件'],
    process: ['建立工艺参数与质量指标的对应关系', '分析参数敏感性和缺陷相关性', '设计关键参数组合与对照试验', '验证优化工艺的稳定性和可复制性'],
    intermediate: ['工艺流程节点与质量控制点', '参数敏感性排序和缺陷因果线索', '优化工艺参数窗口及验证结果'],
    finalOutput: ['工艺分析与优化报告', '关键工序控制标准建议', '工艺稳定性提升和质量改进方案']
  },
  '方案研究': {
    inputData: ['研究需求、建设目标和约束条件', '候选技术方案及实施资源', '成本、周期、风险和预期效益数据'],
    process: ['拆解需求并建立方案评价指标', '形成候选方案并开展技术经济比较', '进行场景推演、风险评估和资源校验', '根据评估结果迭代方案组合'],
    intermediate: ['候选方案对比矩阵', '关键实施路径与资源配置结果', '风险—收益平衡分析和情景结果'],
    finalOutput: ['方案研究报告', '推荐方案及备选方案排序', '分阶段实施计划与保障措施']
  },
  '协议分析': {
    inputData: ['协议规范、接口定义和消息格式', '典型通信抓包与时序数据', '安全机制、异常码和兼容性要求'],
    process: ['解析协议字段与状态转换关系', '还原关键消息交互和调用时序', '检查一致性、异常处理和安全边界', '对不同版本和实现进行兼容性对比'],
    intermediate: ['协议状态机和消息时序图', '字段依赖、异常路径和安全检查结果', '版本差异及兼容性问题清单'],
    finalOutput: ['协议分析报告', '关键接口与风险点说明', '协议优化、测试和兼容性建议']
  },
  '数据挖掘': {
    inputData: ['结构化业务数据与非结构化文本', '数据字典、标签体系和业务规则', '历史样本及目标变量定义'],
    process: ['完成数据质量检查、缺失值处理和特征构造', '采用聚类、分类或关联规则提取模式', '通过交叉验证评估模型和规则稳定性', '结合业务反馈解释并筛选有效结果'],
    intermediate: ['数据质量画像和特征重要性排序', '用户/对象分群及关联规则结果', '模型评估指标和典型样本解释'],
    finalOutput: ['数据挖掘分析报告', '可复用的特征与规则清单', '面向业务应用的数据洞察和行动建议']
  },
  '可行性分析': {
    inputData: ['项目需求、建设边界和目标指标', '技术、人员、设备和数据资源清单', '投资估算、运维成本及预期收益'],
    process: ['开展技术可行性和资源匹配分析', '测算投资回收、运行成本和实施周期', '识别合规、技术、市场和组织风险', '通过多情景和敏感性分析验证结论'],
    intermediate: ['资源匹配和实施条件评估表', '成本—收益测算模型及情景结果', '风险分级、应对措施和关键里程碑'],
    finalOutput: ['项目可行性分析报告', '立项建议及实施优先级', '预算、进度和风险控制建议']
  }
};

function getTaskAnalysisData(task) {
  return taskAnalysisData[task.type] || {
    inputData: [`${task.name}相关基础数据`, '项目配置、业务规则和历史记录', '任务目标及评价指标'],
    process: ['完成数据清洗和口径统一', '提取关键特征并建立分析模型', '开展结果校验与专家复核', '形成可追溯的分析结论'],
    intermediate: ['数据质量检查结果', '关键指标和阶段性分析结果', '异常项与待核查问题清单'],
    finalOutput: [`${task.name}分析报告`, '核心发现和重点问题清单', '后续实施与优化建议']
  };
}

function getProgressClass(progress) {
  if (progress === 100) return 'success';
  if (progress >= 50) return 'warning';
  return '';
}

const taskStatusFilter = ref('');
const currentTaskPage = ref(1);
const taskPageSize = 10;
const taskSortColumn = ref('');
const taskSortOrder = ref('asc');
const isMergeMode = ref(false);
const selectedTasks = ref(new Set());

const filteredTasks = computed(() => {
  let result = TASKS.value.filter(t => {
    return !taskStatusFilter.value || t.status === taskStatusFilter.value;
  });

  if (taskSortColumn.value) {
    result = [...result].sort((a, b) => {
      let valA, valB;
      switch (taskSortColumn.value) {
        case 'name': valA = a.name; valB = b.name; break;
        case 'type': valA = a.type; valB = b.type; break;
        case 'status': valA = taskStatusMap[a.status].order; valB = taskStatusMap[b.status].order; break;
        case 'priority': valA = taskPriorityMap[a.priority].order; valB = taskPriorityMap[b.priority].order; break;
        case 'progress': valA = a.progress; valB = b.progress; break;
        default: return 0;
      }
      if (typeof valA === 'number') {
        return taskSortOrder.value === 'asc' ? valA - valB : valB - valA;
      }
      return taskSortOrder.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }
  return result;
});

const totalTaskPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / taskPageSize)));
const pagedTasks = computed(() => {
  const start = (currentTaskPage.value - 1) * taskPageSize;
  return filteredTasks.value.slice(start, start + taskPageSize);
});

const selectAllTasks = ref(false);

const allTaskChecked = computed(() => {
  if (!isMergeMode.value) return false;
  const pageTaskIds = pagedTasks.value.map(t => t.id);
  return pageTaskIds.length > 0 && pageTaskIds.every(id => selectedTasks.value.has(id));
});

function filterTasksByStatus(status) {
  taskStatusFilter.value = status;
  currentTaskPage.value = 1;
}

function sortTasks(column) {
  if (taskSortColumn.value === column) {
    taskSortOrder.value = taskSortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    taskSortColumn.value = column;
    taskSortOrder.value = 'asc';
  }
  currentTaskPage.value = 1;
}

function goToTaskPage(page) {
  currentTaskPage.value = page;
}

function toggleSelectAllTasks() {
  const pageTaskIds = pagedTasks.value.map(t => t.id);
  if (allTaskChecked.value) {
    pageTaskIds.forEach(id => selectedTasks.value.delete(id));
  } else {
    pageTaskIds.forEach(id => selectedTasks.value.add(id));
  }
}

function toggleTaskSelection(taskId) {
  if (!isMergeMode.value) return;
  if (selectedTasks.value.has(taskId)) {
    selectedTasks.value.delete(taskId);
  } else {
    selectedTasks.value.add(taskId);
  }
}

function enableMergeMode() {
  isMergeMode.value = true;
  selectedTasks.value = new Set();
}

function cancelMergeMode() {
  isMergeMode.value = false;
  selectedTasks.value = new Set();
}

const selectedTasksCount = computed(() => selectedTasks.value.size);

function confirmMerge() {
  if (selectedTasks.value.size < 2) {
    alert('请至少选择2个任务进行合并');
    return;
  }
  const selectedTaskList = TASKS.value.filter(t => selectedTasks.value.has(t.id));
  const mergedName = selectedTaskList.map(t => t.name).join(' + ');
  const mergedTask = {
    id: 'TASK' + String(TASKS.value.length + 1).padStart(3, '0'),
    name: mergedName,
    type: '综合分析',
    status: 'pending',
    priority: 'high',
    progress: 0,
    createTime: new Date().toISOString().split('T')[0],
    projectId: selectedTaskList[0].projectId
  };
  selectedTasks.value.forEach(taskId => {
    const task = TASKS.value.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      task.progress = 100;
    }
  });
  TASKS.value.unshift(mergedTask);
  cancelMergeMode();
  currentTaskPage.value = 1;
  alert(`已成功合并 ${selectedTaskList.length} 个任务，生成综合分析报告！`);
}

// 新建任务
function createNewTask() {
  const newId = 'TASK' + String(TASKS.value.length + 1).padStart(3, '0');
  const newTask = {
    id: newId,
    name: `新分析任务${TASKS.value.length + 1}`,
    type: '技术分析',
    status: 'pending',
    priority: 'medium',
    progress: 0,
    createTime: new Date().toISOString().split('T')[0],
    projectId: 'NSFC001'
  };
  TASKS.value.unshift(newTask);
  currentTaskPage.value = 1;
  alert(`任务 ${newId} 创建成功！`);
}

// ==================== 详情面板 ====================
const showDetailPanel = ref(false);
const detailPanelType = ref('');
const currentDetailProject = ref(null);
const currentDetailTask = ref(null);

function viewProject(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (project) {
    currentDetailProject.value = project;
    detailPanelType.value = 'project';
    showDetailPanel.value = true;
  }
}

function showRelatedAnalysis(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (project) {
    currentDetailProject.value = project;
    detailPanelType.value = 'related';
    showDetailPanel.value = true;
  }
}

function viewTaskDetail(taskId) {
  const task = TASKS.value.find(t => t.id === taskId);
  if (task) {
    currentDetailTask.value = task;
    detailPanelType.value = 'task';
    showDetailPanel.value = true;
  }
}

function closeDetailPanel() {
  showDetailPanel.value = false;
}

const relatedProjects = computed(() => {
  if (!currentDetailProject.value || detailPanelType.value !== 'related') return [];
  return PROJECTS.filter(p => p.id !== currentDetailProject.value.id && p.field === currentDetailProject.value.field).slice(0, 3);
});

const currentTaskProject = computed(() => {
  if (!currentDetailTask.value) return null;
  return PROJECTS.find(p => p.id === currentDetailTask.value.projectId);
});

const currentTaskAnalysis = computed(() => {
  if (!currentDetailTask.value) return null;
  return getTaskAnalysisData(currentDetailTask.value);
});
</script>

<template>
  <div class="research-project-page">
    <!-- 顶部导航栏（固定） -->
    <div class="top-navbar">
      <nav class="navbar-nav">
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'project-search' }" @click="switchTab('project-search')">
          <i class="fas fa-search"></i> 项目检索
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'statistics' }" @click="switchTab('statistics')">
          <i class="fas fa-chart-bar"></i> 统计分析
        </a>
        <a href="javascript:void(0)" class="nav-link" :class="{ active: activeTab === 'task-management' }" @click="switchTab('task-management')">
          <i class="fas fa-clipboard-list"></i> 任务管理
        </a>
      </nav>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
      <h1 class="page-title">科研项目分析</h1>

      <!-- ========== Tab1 项目检索 ========== -->
      <div v-show="activeTab === 'project-search'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title">
              <i class="fas fa-search"></i> 项目检索
            </div>
            <button class="btn btn-primary" @click="searchProjects">
              <i class="fas fa-search"></i> 检索
            </button>
          </div>

          <!-- (1) 搜索与筛选条件 -->
          <div class="filter-section">
            <div class="filter-row">
              <div class="form-group" style="margin: 0; flex: 1;">
                <label class="form-label">项目关键词</label>
                <div class="search-wrapper">
                  <input type="text" v-model="projectSearch" class="search-input" placeholder="请输入项目名称或关键词..." @keypress.enter="searchProjects">
                  <i class="fas fa-search search-icon"></i>
                </div>
              </div>
              <div class="form-group" style="margin: 0; flex: 0 0 180px;">
                <label class="form-label">资助机构</label>
                <select v-model="fundingAgency" class="form-input" style="height: 40px;" @change="searchProjects">
                  <option value="">全部机构</option>
                  <option value="nsfc">国家自然科学基金</option>
                  <option value="mst">科技部</option>
                  <option value="cas">中国科学院</option>
                  <option value="moe">教育部</option>
                </select>
              </div>
              <div class="form-group" style="margin: 0; flex: 0 0 180px;">
                <label class="form-label">项目类型</label>
                <select v-model="projectType" class="form-input" style="height: 40px;" @change="searchProjects">
                  <option value="">全部类型</option>
                  <option value="key">重点项目</option>
                  <option value="major">重大项目</option>
                  <option value="youth">青年项目</option>
                  <option value="international">国际合作项目</option>
                </select>
              </div>
              <div class="form-group" style="margin: 0; flex: 0 0 180px;">
                <label class="form-label">研究领域</label>
                <select v-model="researchField" class="form-input" style="height: 40px;" @change="searchProjects">
                  <option value="">全部领域</option>
                  <option value="ai">人工智能</option>
                  <option value="quantum">量子计算</option>
                  <option value="materials">新材料</option>
                  <option value="biomed">生物医学</option>
                  <option value="energy">能源环境</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 项目列表 -->
          <div class="chart-card">
            <table class="data-table">
              <thead>
                <tr>
                  <th @click="sortProjects('id')">项目编号 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'id' }"></i></th>
                  <th @click="sortProjects('name')">项目标题 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'name' }"></i></th>
                  <th @click="sortProjects('leader')">负责人 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'leader' }"></i></th>
                  <th @click="sortProjects('agency')">承担机构 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'agency' }"></i></th>
                  <th @click="sortProjects('funding')">经费金额（万元） <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'funding' }"></i></th>
                  <th @click="sortProjects('field')">研究领域 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'field' }"></i></th>
                  <th @click="sortProjects('startDate')">起止时间 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'startDate' }"></i></th>
                  <th @click="sortProjects('status')">状态 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': projectSortColumn === 'status' }"></i></th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in pagedProjects" :key="p.id">
                  <td>{{ p.id }}</td>
                  <td><a href="javascript:void(0)" class="project-name-link" @click="viewProject(p.id)">{{ p.name }}</a></td>
                  <td>{{ p.leader }}</td>
                  <td>{{ p.agency }}</td>
                  <td>{{ p.funding.toLocaleString() }}</td>
                  <td>{{ getResearchField(p.field) }}</td>
                  <td>{{ p.startDate }} ~ {{ p.endDate }}</td>
                  <td><span class="tag" :class="statusMap[p.status].class">{{ statusMap[p.status].text }}</span></td>
                  <td>
                    <div class="action-buttons">
                      <button class="action-btn" title="查看详情" @click="viewProject(p.id)">
                        <i class="fas fa-eye"></i> 查看详情
                      </button>
                      <button class="action-btn" title="关联分析" @click="showRelatedAnalysis(p.id)">
                        <i class="fas fa-project-diagram"></i> 关联分析
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="pagedProjects.length === 0">
                  <td colspan="9" style="text-align:center;padding:40px;color:#999;">暂无匹配的项目</td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <span class="page-info">共 {{ filteredProjects.length }} 条，第 {{ currentProjectPage }}/{{ totalProjectPages }} 页</span>
              <button v-for="i in totalProjectPages" :key="i" class="page-btn" :class="{ active: i === currentProjectPage }" @click="goToProjectPage(i)">{{ i }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== Tab2 统计分析 ========== -->
      <div v-show="activeTab === 'statistics'" class="tab-content">
        <div class="module-section">
          <div class="module-header">
            <div class="module-title">
              <i class="fas fa-chart-bar"></i> 统计分析
            </div>
            <button class="btn btn-primary" @click="exportStatisticsReport">
              <i class="fas fa-download"></i> 导出报告
            </button>
          </div>

          <!-- (1) 筛选与控制栏 -->
          <div class="filter-bar">
            <div class="filter-controls">
              <select v-model="statsDimension" class="filter-select" @change="updateStatistics">
                <option value="all">全部维度</option>
                <option value="field">研究领域</option>
                <option value="region">地域分布</option>
                <option value="status">项目状态</option>
              </select>
              <select v-model="statsTimeRange" class="filter-select" @change="updateStatistics">
                <option value="all">全部时间</option>
                <option value="2023">2023年</option>
                <option value="2024">2024年</option>
                <option value="2025">2025年</option>
                <option value="2026">2026年</option>
              </select>
              <select v-model="statsField" class="filter-select" @change="updateStatistics">
                <option value="">全部领域</option>
                <option value="ai">人工智能</option>
                <option value="quantum">量子计算</option>
                <option value="materials">新材料</option>
                <option value="biomed">生物医学</option>
                <option value="energy">能源环境</option>
              </select>
            </div>
            <div class="filter-controls">
              <button class="btn btn-secondary" @click="refreshStatistics">
                <i class="fas fa-sync-alt"></i> 刷新
              </button>
            </div>
          </div>

          <!-- (2) 数据卡片 -->
          <div class="stats-grid" style="background: #f5f7fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <div class="stat-card">
              <div class="stat-icon blue">
                <i class="fas fa-database"></i>
              </div>
              <div class="stat-value">{{ statsCards.total }}</div>
              <div class="stat-label">项目总数</div>
              <div class="stat-trend up"><i class="fas fa-arrow-up"></i> 较上月 +2</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon green">
                <i class="fas fa-dollar-sign"></i>
              </div>
              <div class="stat-value">{{ statsCards.funding.toLocaleString() }}</div>
              <div class="stat-label">总经费（万元）</div>
              <div class="stat-trend up"><i class="fas fa-arrow-up"></i> 较上月 +850</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon orange">
                <i class="fas fa-spinner"></i>
              </div>
              <div class="stat-value">{{ statsCards.ongoing }}</div>
              <div class="stat-label">进行中</div>
              <div class="stat-trend up"><i class="fas fa-arrow-up"></i> 较上月 +3</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon purple">
                <i class="fas fa-building"></i>
              </div>
              <div class="stat-value">{{ statsCards.institutions }}</div>
              <div class="stat-label">参与机构</div>
              <div class="stat-trend"><i class="fas fa-minus"></i> 持平</div>
            </div>
          </div>

          <!-- (3)(4) 研究领域分布图表和国家/地区分布图表 -->
          <div class="charts-section">
            <!-- 研究领域分布图表 -->
            <div class="chart-card">
              <div class="chart-title">
                <span>研究领域分布</span>
                <div class="chart-legend">
                  <div class="legend-item" :class="{ active: !statsField }" @click="filterByField('')">
                    <div class="legend-color" style="background: #999;"></div>
                    <span>全部</span>
                  </div>
                  <div v-for="item in fieldChartData" :key="item.key" class="legend-item" :class="{ active: statsField === item.key }" @click="filterByField(item.key)">
                    <div class="legend-color" :style="{ background: item.color }"></div>
                    <span>{{ item.label }}</span>
                  </div>
                </div>
              </div>
              <div class="chart-canvas">
                <div class="bar-chart">
                  <div v-for="item in fieldChartData" :key="item.key" class="bar-item" :class="{ active: item.selected }" @click="filterByField(item.key)">
                    <div class="bar-value">{{ item.count }}</div>
                    <div class="bar" :style="{ height: Math.max(item.percent, 4) + '%', background: item.selected ? '#0050b3' : item.color }"></div>
                    <div class="bar-label">{{ item.label }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 国家/地区分布图表 -->
            <div class="chart-card">
              <div class="chart-title">
                <span>国家/地区分布</span>
                <div class="chart-legend">
                  <div class="legend-item" :class="{ active: !statsRegion }" @click="filterByRegion('')">
                    <div class="legend-color" style="background: #999;"></div>
                    <span>全部</span>
                  </div>
                  <div v-for="item in regionChartData" :key="item.label" class="legend-item" :class="{ active: statsRegion === item.label }" @click="filterByRegion(item.label)">
                    <div class="legend-color" :style="{ background: item.color }"></div>
                    <span>{{ item.label }}</span>
                  </div>
                </div>
              </div>
              <div class="chart-canvas">
                <div class="bar-chart">
                  <div v-for="item in regionChartData" :key="item.label" class="bar-item" :class="{ active: item.selected }" @click="filterByRegion(item.label)">
                    <div class="bar-value">{{ item.count }}</div>
                    <div class="bar" :style="{ height: Math.max(item.percent, 4) + '%', background: item.selected ? '#0050b3' : item.color }"></div>
                    <div class="bar-label">{{ item.label }}</div>
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
          <div class="module-header">
            <div class="module-title">
              <i class="fas fa-clipboard-list"></i> 任务管理
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-secondary" @click="enableMergeMode">
                <i class="fas fa-object-group"></i> 合并任务
              </button>
              <button class="btn btn-primary" @click="createNewTask">
                <i class="fas fa-plus"></i> 新建任务
              </button>
            </div>
          </div>

          <!-- 合并任务提示区域 -->
          <div class="merge-section" :class="{ show: isMergeMode }">
            <div class="merge-info">
              <i class="fas fa-info-circle"></i>
              已选择 <strong class="selected-tasks-count">{{ selectedTasksCount }}</strong> 个任务，继续选择其他任务或确认合并
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-primary" @click="confirmMerge">
                <i class="fas fa-check"></i> 确认合并
              </button>
              <button class="btn btn-secondary" @click="cancelMergeMode">
                <i class="fas fa-times"></i> 取消
              </button>
            </div>
          </div>

          <!-- (4) 状态筛选 -->
          <div class="status-filter-bar">
            <div class="status-filter" :class="{ active: taskStatusFilter === '' }" @click="filterTasksByStatus('')">全部状态</div>
            <div class="status-filter" :class="{ active: taskStatusFilter === 'pending' }" @click="filterTasksByStatus('pending')">待处理</div>
            <div class="status-filter" :class="{ active: taskStatusFilter === 'running' }" @click="filterTasksByStatus('running')">进行中</div>
            <div class="status-filter" :class="{ active: taskStatusFilter === 'completed' }" @click="filterTasksByStatus('completed')">已完成</div>
            <div class="status-filter" :class="{ active: taskStatusFilter === 'failed' }" @click="filterTasksByStatus('failed')">失败</div>
          </div>

          <!-- (3) 任务条目 -->
          <div class="chart-card" style="box-shadow: none; padding: 0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 50px;">
                    <input type="checkbox" class="task-checkbox" :checked="allTaskChecked" :disabled="!isMergeMode" @click="toggleSelectAllTasks">
                  </th>
                  <th @click="sortTasks('name')">任务名称 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': taskSortColumn === 'name' }"></i></th>
                  <th @click="sortTasks('type')">任务类型 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': taskSortColumn === 'type' }"></i></th>
                  <th @click="sortTasks('status')">状态 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': taskSortColumn === 'status' }"></i></th>
                  <th @click="sortTasks('priority')">优先级 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': taskSortColumn === 'priority' }"></i></th>
                  <th @click="sortTasks('progress')">进度 <i class="fas fa-sort sort-icon" :class="{ 'sort-active': taskSortColumn === 'progress' }"></i></th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in pagedTasks" :key="t.id">
                  <td>
                    <input type="checkbox" class="task-checkbox" :checked="selectedTasks.has(t.id)" :disabled="!isMergeMode" @click="toggleTaskSelection(t.id)">
                  </td>
                  <td>
                    <a href="javascript:void(0)" class="task-name-link" @click="viewTaskDetail(t.id)">{{ t.name }}</a>
                  </td>
                  <td>{{ t.type }}</td>
                  <td>
                    <span class="tag" :class="taskStatusMap[t.status].class" style="cursor: pointer;" @click="filterTasksByStatus(t.status)">{{ taskStatusMap[t.status].text }}</span>
                  </td>
                  <td>
                    <span class="tag" :class="taskPriorityMap[t.priority].class">{{ taskPriorityMap[t.priority].text }}</span>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div class="progress-bar" style="flex: 1; height: 6px; background: #f0f0f0; border-radius: 3px;">
                        <div class="progress-fill" :class="getProgressClass(t.progress)" :style="{ width: t.progress + '%' }"></div>
                      </div>
                      <span style="font-size: 12px; color: #666; width: 32px;">{{ t.progress }}%</span>
                    </div>
                  </td>
                  <td>{{ t.createTime }}</td>
                </tr>
                <tr v-if="pagedTasks.length === 0">
                  <td colspan="7" style="text-align:center;padding:40px;color:#999;">暂无匹配的任务</td>
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
    </div>

    <!-- ========== 详情面板（右侧滑入） ========== -->
    <div class="detail-overlay" :class="{ open: showDetailPanel }" @click="closeDetailPanel"></div>
    <div class="detail-panel" :class="{ open: showDetailPanel }">
      <div class="detail-panel-header">
        <div class="detail-panel-title">
          {{ detailPanelType === 'project' ? '项目详情' : detailPanelType === 'related' ? '项目关联分析' : detailPanelType === 'task' ? '任务详情' : '详情' }}
        </div>
        <button class="detail-panel-close" @click="closeDetailPanel"><i class="fas fa-times"></i></button>
      </div>
      <div class="detail-panel-content">

        <!-- 项目详情 -->
        <div v-if="detailPanelType === 'project' && currentDetailProject" style="padding: 24px;">
          <div class="detail-header-row">
            <div>
              <h2 class="detail-h2">{{ currentDetailProject.name }}</h2>
              <div class="detail-meta-row">
                <span><i class="fas fa-hashtag"></i>{{ currentDetailProject.id }}</span>
                <span><i class="fas fa-user"></i>{{ currentDetailProject.leader }}</span>
                <span><i class="fas fa-building"></i>{{ currentDetailProject.agency }}</span>
              </div>
            </div>
            <span class="tag" :class="statusMap[currentDetailProject.status].class">{{ statusMap[currentDetailProject.status].text }}</span>
          </div>

          <div class="detail-stat-grid-3">
            <div class="detail-stat-box">
              <div class="detail-stat-box-label">经费金额</div>
              <div class="detail-stat-box-value">{{ currentDetailProject.funding.toLocaleString() }} <span class="detail-stat-unit">万元</span></div>
            </div>
            <div class="detail-stat-box">
              <div class="detail-stat-box-label">开始日期</div>
              <div class="detail-stat-box-date">{{ currentDetailProject.startDate }}</div>
            </div>
            <div class="detail-stat-box">
              <div class="detail-stat-box-label">结束日期</div>
              <div class="detail-stat-box-date">{{ currentDetailProject.endDate }}</div>
            </div>
          </div>

          <!-- 项目阶段 -->
          <div class="detail-section">
            <h3 class="detail-h3">项目阶段</h3>
            <div class="timeline-row">
              <div class="timeline-line"></div>
              <div class="timeline-step">
                <div class="timeline-dot done"></div>
                <div class="timeline-label">项目启动</div>
                <div class="timeline-date">{{ currentDetailProject.startDate }}</div>
              </div>
              <div class="timeline-step">
                <div class="timeline-dot current"></div>
                <div class="timeline-label">研究中</div>
                <div class="timeline-date">当前阶段</div>
              </div>
              <div class="timeline-step">
                <div class="timeline-dot"></div>
                <div class="timeline-label">项目结题</div>
                <div class="timeline-date">{{ currentDetailProject.endDate }}</div>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="detail-h3">项目背景</h3>
            <p class="detail-text">{{ getProjectDetail(currentDetailProject).background }}</p>
          </div>

          <div class="detail-section">
            <h3 class="detail-h3">研究目标</h3>
            <p class="detail-text">{{ getProjectDetail(currentDetailProject).objective }}</p>
          </div>

          <div class="detail-section">
            <h3 class="detail-h3">技术路线</h3>
            <ol class="detail-ol">
              <li v-for="(step, index) in getProjectDetail(currentDetailProject).route" :key="index">{{ step }}</li>
            </ol>
          </div>

          <div class="detail-section">
            <h3 class="detail-h3">阶段性成果</h3>
            <ul class="detail-numbered-list">
              <li v-for="(item, index) in getProjectDetail(currentDetailProject).results" :key="index" class="detail-numbered-item">
                <span class="detail-number-badge">{{ index + 1 }}</span>
                <span class="detail-numbered-text">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h3 class="detail-h3">相关专利</h3>
            <ul class="detail-numbered-list">
              <li v-for="(item, index) in getProjectDetail(currentDetailProject).patents" :key="index" class="detail-numbered-item">
                <span class="detail-number-badge">{{ index + 1 }}</span>
                <span class="detail-numbered-text">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h3 class="detail-h3">相关论文</h3>
            <ul class="detail-numbered-list">
              <li v-for="(item, index) in getProjectDetail(currentDetailProject).papers" :key="index" class="detail-numbered-item">
                <span class="detail-number-badge">{{ index + 1 }}</span>
                <span class="detail-numbered-text">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 关联分析 -->
        <div v-if="detailPanelType === 'related' && currentDetailProject" style="padding: 24px;">
          <div class="related-banner">
            <div class="related-banner-title">{{ currentDetailProject.name }}</div>
            <div class="related-banner-subtitle">关联网络分析视图</div>
          </div>

          <div class="related-grid">
            <div class="related-card">
              <div class="related-card-title"><i class="fas fa-project-diagram" style="color: #1890ff;"></i> 相关项目</div>
              <div class="related-list">
                <div v-for="rp in relatedProjects" :key="rp.id" class="related-list-item">
                  <div class="related-list-name">{{ rp.name }}</div>
                  <div class="related-list-meta">{{ rp.agency }}</div>
                </div>
                <div v-if="relatedProjects.length === 0" class="related-list-empty">暂无同领域项目</div>
              </div>
            </div>
            <div class="related-card">
              <div class="related-card-title"><i class="fas fa-users" style="color: #52c41a;"></i> 相关人员</div>
              <div class="related-list">
                <div class="related-list-item">
                  <div class="related-list-name">{{ currentDetailProject.leader }}</div>
                  <div class="related-list-meta">项目负责人</div>
                </div>
                <div class="related-list-item">
                  <div class="related-list-name">李明</div>
                  <div class="related-list-meta">协作研究员</div>
                </div>
                <div class="related-list-item">
                  <div class="related-list-name">王芳</div>
                  <div class="related-list-meta">合作专家</div>
                </div>
              </div>
            </div>
            <div class="related-card">
              <div class="related-card-title"><i class="fas fa-building" style="color: #fa8c16;"></i> 相关机构</div>
              <div class="related-list">
                <div class="related-list-item">
                  <div class="related-list-name">{{ currentDetailProject.agency }}</div>
                  <div class="related-list-meta">资助机构</div>
                </div>
                <div class="related-list-item">
                  <div class="related-list-name">清华大学</div>
                  <div class="related-list-meta">合作单位</div>
                </div>
              </div>
            </div>
            <div class="related-card">
              <div class="related-card-title"><i class="fas fa-lightbulb" style="color: #722ed1;"></i> 技术关联</div>
              <div class="related-list">
                <div class="related-list-item">
                  <div class="related-list-name">{{ getResearchField(currentDetailProject.field) }}</div>
                  <div class="related-list-meta">主要研究领域</div>
                </div>
                <div class="related-list-item">
                  <div class="related-list-name">数据挖掘</div>
                  <div class="related-list-meta">交叉领域</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 任务详情 -->
        <div v-if="detailPanelType === 'task' && currentDetailTask" style="padding: 24px;">
          <div class="detail-header-row">
            <div>
              <h2 class="detail-h2">{{ currentDetailTask.name }}</h2>
              <div class="detail-meta-row">
                <span><i class="fas fa-hashtag"></i>{{ currentDetailTask.id }}</span>
                <span><i class="fas fa-tag"></i>{{ currentDetailTask.type }}</span>
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <span class="tag" :class="taskStatusMap[currentDetailTask.status].class">{{ taskStatusMap[currentDetailTask.status].text }}</span>
              <span class="tag" :class="taskPriorityMap[currentDetailTask.priority].class">{{ taskPriorityMap[currentDetailTask.priority].text }}</span>
            </div>
          </div>

          <div class="detail-stat-grid-2">
            <div class="detail-stat-box">
              <div class="detail-stat-box-label">执行进度</div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div class="progress-bar" style="flex: 1; height: 8px; background: #e8e8e8; border-radius: 4px;">
                  <div class="progress-fill" :class="getProgressClass(currentDetailTask.progress)" :style="{ width: currentDetailTask.progress + '%' }"></div>
                </div>
                <span class="detail-progress-text">{{ currentDetailTask.progress }}%</span>
              </div>
            </div>
            <div class="detail-stat-box">
              <div class="detail-stat-box-label">创建时间</div>
              <div class="detail-stat-box-date">{{ currentDetailTask.createTime }}</div>
            </div>
          </div>

          <!-- 任务阶段 -->
          <div class="detail-section">
            <h3 class="detail-h3">任务阶段</h3>
            <div class="timeline-row">
              <div class="timeline-line"></div>
              <div class="timeline-step">
                <div class="timeline-dot" :class="{ done: currentDetailTask.progress >= 33 }"></div>
                <div class="timeline-label">任务创建</div>
                <div class="timeline-date">{{ currentDetailTask.createTime }}</div>
              </div>
              <div class="timeline-step">
                <div class="timeline-dot" :class="currentDetailTask.progress >= 66 ? 'done' : currentDetailTask.progress > 0 ? 'current' : ''"></div>
                <div class="timeline-label">分析执行</div>
                <div class="timeline-date">{{ currentDetailTask.status === 'running' ? '进行中' : currentDetailTask.status === 'completed' ? '已完成' : '待开始' }}</div>
              </div>
              <div class="timeline-step">
                <div class="timeline-dot" :class="{ done: currentDetailTask.progress === 100 }"></div>
                <div class="timeline-label">任务完成</div>
                <div class="timeline-date">{{ currentDetailTask.status === 'completed' ? currentDetailTask.createTime : '预计完成时间待定' }}</div>
              </div>
            </div>
          </div>

          <!-- 关联项目 -->
          <div v-if="currentTaskProject" class="detail-section">
            <h3 class="detail-h3">关联项目</h3>
            <div class="related-project-box">
              <div class="related-project-name">{{ currentTaskProject.name }}</div>
              <div class="related-project-meta">
                <span style="margin-right: 12px;"><i class="fas fa-user" style="color: #999; margin-right: 4px;"></i>{{ currentTaskProject.leader }}</span>
                <span><i class="fas fa-building" style="color: #999; margin-right: 4px;"></i>{{ currentTaskProject.agency }}</span>
              </div>
            </div>
          </div>

          <!-- 分析详情 -->
          <div class="detail-section">
            <h3 class="detail-h3">分析详情</h3>
            <div class="analysis-grid" v-if="currentTaskAnalysis">
              <div class="analysis-block">
                <div class="analysis-block-title"><i class="fas fa-database" style="color: #1890ff;"></i>输入数据</div>
                <ul class="analysis-list">
                  <li v-for="(item, index) in currentTaskAnalysis.inputData" :key="index">{{ item }}</li>
                </ul>
              </div>
              <div class="analysis-block">
                <div class="analysis-block-title"><i class="fas fa-cogs" style="color: #52c41a;"></i>分析过程</div>
                <ul class="analysis-list">
                  <li v-for="(item, index) in currentTaskAnalysis.process" :key="index">{{ item }}</li>
                </ul>
              </div>
              <div class="analysis-block">
                <div class="analysis-block-title"><i class="fas fa-chart-line" style="color: #fa8c16;"></i>中间结果</div>
                <ul class="analysis-list">
                  <li v-for="(item, index) in currentTaskAnalysis.intermediate" :key="index">{{ item }}</li>
                </ul>
              </div>
              <div class="analysis-block">
                <div class="analysis-block-title"><i class="fas fa-file-alt" style="color: #722ed1;"></i>最终输出</div>
                <ul class="analysis-list">
                  <li v-for="(item, index) in currentTaskAnalysis.finalOutput" :key="index">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.research-project-page {
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
.module-section { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); border: 1px solid #e8e8e8; }
.module-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.module-title { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 8px; }
.module-title i { color: #1890ff; font-size: 18px; }

/* 筛选区 */
.filter-section { background: #fafafa; border: 1px solid #e8e8e8; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
.filter-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 13px; font-weight: 500; color: #333; margin-bottom: 8px; }
.form-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 12px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #1890ff; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; transition: all 0.3s; }
.btn-primary { background: #1890ff; color: #fff; }
.btn-primary:hover { background: #40a9ff; }
.btn-secondary { background: #fff; color: #666; border: 1px solid #d9d9d9; }
.btn-secondary:hover { border-color: #1890ff; color: #1890ff; }

/* 搜索框 */
.search-wrapper { position: relative; }
.search-input { width: 100%; height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 40px 0 12px; font-size: 14px; }
.search-input:focus { outline: none; border-color: #1890ff; }
.search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; cursor: pointer; }
.search-wrapper .search-icon:hover { color: #1890ff; }

/* 数据表格 */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { background: #fafafa; padding: 14px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #333; border-bottom: 1px solid #e8e8e8; cursor: pointer; transition: all 0.3s; user-select: none; }
.data-table th:hover { background: #f0f5ff; color: #1890ff; }
.data-table th .sort-icon { margin-left: 6px; color: #d9d9d9; font-size: 11px; }
.data-table th .sort-icon.sort-active { color: #1890ff; }
.data-table td { padding: 14px 16px; border-bottom: 1px solid #e8e8e8; font-size: 13px; color: #666; }
.data-table tr:hover { background: #f5f7fa; }
.project-name-link { color: #1890ff; text-decoration: none; font-weight: 500; cursor: pointer; }
.project-name-link:hover { text-decoration: underline; }

/* 操作按钮组 */
.action-buttons { display: flex; gap: 6px; }
.action-btn { padding: 5px 12px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 12px; color: #666; transition: all 0.3s; }
.action-btn:hover { border-color: #1890ff; color: #1890ff; background: #f0f5ff; }

/* 分页 */
.pagination { display: flex; align-items: center; gap: 8px; padding: 16px 0; }
.page-info { font-size: 13px; color: #999; margin-right: 8px; }
.page-btn { width: 32px; height: 32px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; font-size: 13px; color: #666; transition: all 0.3s; }
.page-btn:hover { border-color: #1890ff; color: #1890ff; }
.page-btn.active { background: #1890ff; color: #fff; border-color: #1890ff; }

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

/* 图表卡片 */
.chart-card { background: #fff; border-radius: 4px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.chart-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
.chart-legend { display: flex; gap: 16px; font-size: 13px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.legend-item.active { font-weight: 600; }
.legend-color { width: 12px; height: 12px; border-radius: 3px; }

/* 柱状图（CSS-only） */
.chart-canvas { width: 100%; height: 320px; position: relative; }
.bar-chart { display: flex; align-items: flex-end; justify-content: space-around; height: 100%; padding: 20px 0; gap: 12px; }
.bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.3s; }
.bar-item:hover .bar { filter: brightness(1.1); }
.bar-item.active .bar { filter: brightness(1.1); box-shadow: 0 0 8px rgba(24, 144, 255, 0.5); }
.bar { width: 100%; max-width: 60px; border-radius: 4px 4px 0 0; transition: all 0.3s; position: relative; min-height: 4px; }
.bar-label { font-size: 12px; color: #666; margin-top: 8px; text-align: center; }
.bar-value { font-size: 12px; font-weight: 600; color: #333; margin-bottom: 4px; }

/* 统计卡片 */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
.stat-card { background: #fff; border-radius: 4px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s; }
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.stat-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 12px; }
.stat-icon.blue { background: #e6f7ff; color: #1890ff; }
.stat-icon.green { background: #f6ffed; color: #52c41a; }
.stat-icon.orange { background: #fff2e8; color: #fa8c16; }
.stat-icon.purple { background: #f9f0ff; color: #722ed1; }
.stat-value { font-size: 32px; font-weight: 700; color: #333; margin-bottom: 4px; }
.stat-label { font-size: 14px; color: #999; }
.stat-trend { font-size: 12px; margin-top: 4px; }
.stat-trend.up { color: #52c41a; }
.stat-trend.down { color: #f5222d; }

/* 筛选控制栏 */
.filter-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.filter-controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.filter-select { height: 40px; border: 1px solid #d9d9d9; border-radius: 4px; padding: 0 32px 0 12px; font-size: 14px; min-width: 120px; cursor: pointer; appearance: none; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") no-repeat right 12px center; }
.filter-select:focus { outline: none; border-color: #1890ff; }

/* 图表容器 */
.charts-section { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

/* 任务管理模块 */
.task-checkbox { width: 18px; height: 18px; cursor: pointer; border: 2px solid #d9d9d9; border-radius: 4px; transition: all 0.3s; }
.task-checkbox:disabled { cursor: not-allowed; opacity: 0.5; }
.task-name-link { color: #1890ff; text-decoration: none; font-weight: 500; cursor: pointer; }
.task-name-link:hover { text-decoration: underline; }
.status-filter-bar { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.status-filter { padding: 6px 16px; border: 1px solid #d9d9d9; border-radius: 4px; cursor: pointer; font-size: 13px; transition: all 0.3s; background: #fff; }
.status-filter:hover { border-color: #1890ff; color: #1890ff; }
.status-filter.active { background: #1890ff; color: #fff; border-color: #1890ff; }
.merge-section { display: none; padding: 16px; background: #fff2e8; border: 1px solid #ffd591; border-radius: 4px; margin-bottom: 16px; }
.merge-section.show { display: flex; justify-content: space-between; align-items: center; }
.merge-info { font-size: 13px; color: #fa8c16; }
.merge-info strong { font-weight: 600; }
.selected-tasks-count { margin-left: 8px; padding: 2px 8px; background: #fff; border-radius: 3px; }

/* 详情面板（右侧滑入） */
.detail-overlay { position: fixed; top: 104px; left: 220px; right: 0; bottom: 0; background: rgba(0,0,0,0.3); opacity: 0; visibility: hidden; transition: all 0.3s; z-index: 150; }
.detail-overlay.open { opacity: 1; visibility: visible; }
.detail-panel { position: fixed; top: 0; right: -720px; width: 720px; max-width: 90vw; height: 100vh; background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,0.2); transition: right 0.3s ease; z-index: 200; overflow-y: auto; display: flex; flex-direction: column; }
.detail-panel.open { right: 0; }
.detail-panel-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #e8e8e8; position: sticky; top: 0; background: #fff; z-index: 10; }
.detail-panel-title { font-size: 18px; font-weight: 600; color: #333; }
.detail-panel-close { width: 32px; height: 32px; border: none; background: #f5f5f5; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #999; transition: all 0.3s; }
.detail-panel-close:hover { background: #ff4d4f; color: #fff; }
.detail-panel-content { padding: 0; overflow-y: auto; flex: 1; }

/* 详情面板内部样式 */
.detail-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e8e8e8; }
.detail-h2 { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 8px; }
.detail-meta-row { display: flex; gap: 12px; font-size: 13px; color: #666; }
.detail-meta-row i { color: #999; margin-right: 4px; }

.detail-stat-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.detail-stat-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
.detail-stat-box { padding: 16px; background: #fafafa; border-radius: 8px; }
.detail-stat-box-label { font-size: 12px; color: #999; margin-bottom: 8px; }
.detail-stat-box-value { font-size: 24px; font-weight: 700; color: #1890ff; }
.detail-stat-unit { font-size: 14px; font-weight: 400; color: #666; }
.detail-stat-box-date { font-size: 18px; font-weight: 600; color: #333; }
.detail-progress-text { font-size: 20px; font-weight: 700; color: #1890ff; }

.detail-section { margin-bottom: 24px; }
.detail-h3 { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 12px; }
.detail-text { font-size: 14px; color: #666; line-height: 1.8; }
.detail-ol { margin: 0; padding-left: 22px; color: #555; font-size: 13px; line-height: 1.8; }
.detail-ol li { padding: 5px 0; }

/* 编号列表（renderProjectDetailList 等效） */
.detail-numbered-list { list-style: none; margin: 0; padding: 0; }
.detail-numbered-item { display: flex; gap: 10px; align-items: flex-start; padding: 11px 0; border-bottom: 1px solid #f0f0f0; }
.detail-number-badge { flex: 0 0 22px; width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background: #e6f7ff; color: #1890ff; text-align: center; font-size: 12px; font-weight: 600; }
.detail-numbered-text { font-size: 13px; color: #555; line-height: 1.7; }

/* 项目阶段时间线 */
.timeline-row { position: relative; display: flex; gap: 8px; padding: 8px 0 0; }
.timeline-line { position: absolute; left: 16.66%; right: 16.66%; top: 16px; height: 2px; background: #e8e8e8; }
.timeline-step { flex: 1; position: relative; z-index: 1; text-align: center; }
.timeline-dot { width: 16px; height: 16px; margin: 0 auto 10px; border-radius: 50%; background: #d9d9d9; border: 3px solid #fff; }
.timeline-dot.done { background: #52c41a; box-shadow: 0 0 0 3px #52c41a; }
.timeline-dot.current { background: #1890ff; box-shadow: 0 0 0 3px #1890ff; }
.timeline-label { font-size: 14px; font-weight: 600; color: #333; }
.timeline-date { font-size: 12px; color: #999; margin-top: 4px; }

/* 关联分析 */
.related-banner { margin-bottom: 20px; padding: 16px; background: #e6f7ff; border-radius: 8px; border-left: 4px solid #1890ff; }
.related-banner-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 4px; }
.related-banner-subtitle { font-size: 12px; color: #666; }
.related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.related-card { padding: 20px; background: #fafafa; border-radius: 8px; }
.related-card-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.related-list { display: flex; flex-direction: column; gap: 8px; }
.related-list-item { padding: 10px; background: #fff; border-radius: 4px; border: 1px solid #e8e8e8; font-size: 13px; }
.related-list-name { font-weight: 600; color: #333; margin-bottom: 4px; }
.related-list-meta { font-size: 12px; color: #999; }
.related-list-empty { padding: 10px; text-align: center; color: #999; font-size: 13px; }

/* 任务详情 - 关联项目 */
.related-project-box { padding: 16px; background: #f0f5ff; border-radius: 8px; border-left: 4px solid #1890ff; }
.related-project-name { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 4px; }
.related-project-meta { font-size: 12px; color: #666; }
.related-project-meta i { color: #999; margin-right: 4px; }

/* 任务详情 - 分析块（renderTaskAnalysisBlock 等效） */
.analysis-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.analysis-block { padding: 16px; background: #fafafa; border: 1px solid #e8e8e8; border-radius: 8px; min-height: 190px; }
.analysis-block-title { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #333; }
.analysis-list { margin: 0; padding-left: 18px; color: #666; font-size: 13px; line-height: 1.8; }
.analysis-list li { padding: 3px 0; }
</style>
