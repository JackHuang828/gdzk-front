/* 科技人才画像（2.1.1科技人才画像.html）演示数据
 * 从原型 <script> 内联数据迁移而来，使用 ES module 命名导出。
 * 13 个数据对象：profileTagData / relationTagData / relationScholarData /
 * expertData / projectDetails / titleData / scholarData / orgData /
 * milestoneDetails / companyData / ideologyDetails / mediaReportsData /
 * academicDetailContents
 */

// 1. 基础信息页：专家标签对应的合作网络、论文、专利、项目
export const profileTagData = {
  '人工智能': {
    note: '该网络展示张教授在人工智能标签下的主要合作机构、平台和科研协作关系。连线粗细用于表示合作频次。',
    nodes: [
      { id: 'expert', label: '张教授', x: 350, y: 175, center: true },
      { id: 'tsinghua', label: '清华大学', x: 140, y: 80 },
      { id: 'cas', label: '中科院自动化所', x: 560, y: 80 },
      { id: 'pku', label: '北京大学', x: 120, y: 275 },
      { id: 'platform', label: '国家人工智能平台', x: 575, y: 275 }
    ],
    edges: [
      ['expert', 'tsinghua', 4], ['expert', 'cas', 3], ['expert', 'pku', 2],
      ['expert', 'platform', 3], ['tsinghua', 'cas', 2], ['cas', 'platform', 2]
    ],
    papers: [
      ['面向复杂任务的可验证推理框架', '人工智能学报', '2025', '186'],
      ['科研智能体的工具调用评测方法', '中科院自动化研究所', '2024', '245'],
      ['多模态知识助手关键技术', 'AAAI', '2024', '172']
    ],
    patents: [
      ['一种面向复杂任务的语言模型推理方法', '已授权 · 2024-08'],
      ['基于工具调用的智能体任务规划系统', '审查中 · 2024-05'],
      ['一种多模态知识检索与问答装置', '已授权 · 2023-12']
    ],
    projects: [
      ['国家人工智能公共治理辅助决策平台', '项目负责人', '2024—2026', '进行中'],
      ['科研智能体关键技术与验证环境', '课题负责人', '2023—2025', '阶段验收'],
      ['大模型安全评测与治理机制研究', '技术骨干', '2024—2025', '进行中']
    ]
  },
  '机器学习': {
    note: '机器学习标签下的合作网络以算法优化、数据治理和模型评测为核心，清华大学与产业平台承担主要协作节点。',
    nodes: [
      { id: 'expert', label: '张教授', x: 350, y: 175, center: true },
      { id: 'tsinghua', label: '清华大学', x: 125, y: 88 },
      { id: 'zhejiang', label: '浙江大学', x: 570, y: 85 },
      { id: 'lab', label: '机器学习联合实验室', x: 120, y: 275 },
      { id: 'industry', label: '智能计算企业', x: 575, y: 275 }
    ],
    edges: [
      ['expert', 'tsinghua', 4], ['expert', 'zhejiang', 2], ['expert', 'lab', 3],
      ['expert', 'industry', 3], ['tsinghua', 'lab', 2], ['zhejiang', 'industry', 2]
    ],
    papers: [
      ['面向小样本学习的稳健表征方法', 'NeurIPS', '2025', '154'],
      ['机器学习模型的可解释性评估', 'JMLR', '2024', '221'],
      ['联邦学习中的数据质量控制', 'AAAI', '2024', '138']
    ],
    patents: [
      ['一种小样本分类模型训练方法', '已授权 · 2024-06'],
      ['一种联邦学习数据质量评估系统', '审查中 · 2024-02'],
      ['面向模型解释的特征贡献分析方法', '已公开 · 2023-09']
    ],
    projects: [
      ['机器学习算法优化与开源工具链', '项目负责人', '2024—2026', '进行中'],
      ['可信机器学习评测基准建设', '联合负责人', '2023—2025', '进行中'],
      ['产学研协同智能算法平台', '首席专家', '2022—2025', '阶段验收']
    ]
  },
  '深度学习': {
    note: '深度学习标签下重点关联模型训练平台、智能医疗和自动驾驶场景，网络体现了算法研究到应用验证的协作路径。',
    nodes: [
      { id: 'expert', label: '张教授', x: 350, y: 175, center: true },
      { id: 'tsinghua', label: '清华大学', x: 125, y: 85 },
      { id: 'hospital', label: '协和医院', x: 575, y: 85 },
      { id: 'auto', label: '智能驾驶联合中心', x: 130, y: 280 },
      { id: 'compute', label: '深度学习平台', x: 570, y: 280 }
    ],
    edges: [
      ['expert', 'tsinghua', 4], ['expert', 'hospital', 2], ['expert', 'auto', 3],
      ['expert', 'compute', 4], ['tsinghua', 'compute', 3], ['hospital', 'compute', 1]
    ],
    papers: [
      ['深度神经网络的高效训练与部署', 'ICML', '2025', '198'],
      ['医疗影像中的多尺度特征学习', 'MICCAI', '2024', '266'],
      ['面向自动驾驶的端到端感知决策', 'IEEE T-PAMI', '2024', '187']
    ],
    patents: [
      ['一种分布式深度学习训练调度方法', '已授权 · 2024-10'],
      ['一种医疗影像病灶识别方法', '已授权 · 2024-03'],
      ['一种自动驾驶场景的深度感知系统', '审查中 · 2023-11']
    ],
    projects: [
      ['深度学习平台建设', '项目负责人', '2023—2026', '进行中'],
      ['智能医疗影像分析系统', '技术负责人', '2022—2025', '临床验证'],
      ['自动驾驶算法研究', '学术顾问', '2024—2026', '进行中']
    ]
  },
  '计算机视觉': {
    note: '计算机视觉标签下的合作网络围绕视觉感知、医学影像和多模态理解展开，合作机构覆盖高校、医院与技术平台。',
    nodes: [
      { id: 'expert', label: '张教授', x: 350, y: 175, center: true },
      { id: 'tsinghua', label: '清华大学', x: 130, y: 82 },
      { id: 'pku', label: '北京大学', x: 570, y: 82 },
      { id: 'hospital', label: '协和医院', x: 125, y: 280 },
      { id: 'vision', label: '视觉技术平台', x: 575, y: 280 }
    ],
    edges: [
      ['expert', 'tsinghua', 4], ['expert', 'pku', 2], ['expert', 'hospital', 3],
      ['expert', 'vision', 3], ['tsinghua', 'vision', 2], ['pku', 'hospital', 1]
    ],
    papers: [
      ['视觉基础模型的跨域适应方法', 'CVPR', '2025', '213'],
      ['复杂场景下的目标检测与跟踪', 'IEEE T-IP', '2024', '195'],
      ['医学影像多模态理解模型', 'Medical Image Analysis', '2024', '164']
    ],
    patents: [
      ['一种复杂场景目标检测方法', '已授权 · 2024-07'],
      ['一种医学影像多模态分析装置', '审查中 · 2024-01'],
      ['一种视频目标跟踪与行为识别系统', '已公开 · 2023-08']
    ],
    projects: [
      ['复杂场景视觉感知关键技术', '项目负责人', '2024—2026', '进行中'],
      ['医学影像智能辅助诊断项目', '联合负责人', '2023—2025', '阶段验收'],
      ['城市道路视觉感知示范工程', '技术顾问', '2022—2025', '试点运行']
    ]
  }
};

// 2. 关联信息页：标签对应的学术指标与代表成果
export const relationTagData = {
  '人工智能': {
    papers: '234', citations: '18,960', hIndex: '56', patents: '42',
    topics: [['计算机视觉', 40, '#1890ff'], ['机器学习', 30, '#52c41a'], ['深度学习', 20, '#fa8c16'], ['其他', 10, '#722ed1']],
    network: ['128位', '15所', '32项', '高'],
    networkNote: '展示专家在人工智能标签下的合作关系网络与学术影响范围。',
    papersList: [
      ['ImageNet: A large-scale hierarchical image database', 'CVPR 2009', '45,678', '第一作者', '构建大规模图像数据库ImageNet，为计算机视觉领域的发展奠定数据基础。', '计算机视觉'],
      ['Deep Residual Learning for Image Recognition', 'CVPR 2016', '128,456', '通讯作者', '提出残差学习框架，提升深层神经网络的训练稳定性与识别精度。', '深度学习'],
      ['Attention Is All You Need', 'NeurIPS 2017', '89,234', '合作作者', '提出基于注意力机制的Transformer架构，推动了大模型技术发展。', '机器学习'],
      ['面向科研智能体的任务规划与工具调用', 'AAAI 2025', '126', '合作作者', '探索智能体在科研任务中的规划、工具调用与结果验证方法。', '其他']
    ]
  },
  '机器学习': {
    papers: '186', citations: '12,840', hIndex: '48', patents: '31',
    topics: [['监督学习', 34, '#1890ff'], ['表示学习', 28, '#52c41a'], ['强化学习', 22, '#fa8c16'], ['其他', 16, '#722ed1']],
    network: ['96位', '12所', '21项', '较高'],
    networkNote: '机器学习标签下的合作关系主要围绕算法优化、数据治理和模型评测展开。',
    papersList: [
      ['面向小样本学习的稳健表征方法', 'NeurIPS 2025', '154', '通讯作者', '围绕小样本场景构建稳健表征学习方法，提升模型跨任务迁移能力。', '表示学习'],
      ['机器学习模型的可解释性评估', 'JMLR 2024', '221', '第一作者', '提出面向模型解释的统一评估框架，为算法应用的可信验证提供依据。', '其他'],
      ['联邦学习中的数据质量控制', 'AAAI 2024', '138', '合作作者', '针对多方协作中的数据异质性，设计联邦学习数据质量控制机制。', '监督学习'],
      ['面向科研场景的自动机器学习方法', 'ICML 2024', '117', '合作作者', '构建面向科研数据的自动建模流程，降低特征工程与模型选择成本。', '其他']
    ]
  },
  '深度学习': {
    papers: '172', citations: '15,620', hIndex: '51', patents: '36',
    topics: [['神经网络架构', 36, '#1890ff'], ['高效训练', 26, '#52c41a'], ['多模态学习', 24, '#fa8c16'], ['其他', 14, '#722ed1']],
    network: ['104位', '14所', '26项', '高'],
    networkNote: '深度学习标签下的合作网络覆盖模型训练平台、智能医疗和自动驾驶等应用场景。',
    papersList: [
      ['深度神经网络的高效训练与部署', 'ICML 2025', '198', '第一作者', '面向大规模模型训练与部署，提出降低计算开销的优化策略。', '高效训练'],
      ['医疗影像中的多尺度特征学习', 'MICCAI 2024', '266', '通讯作者', '利用多尺度特征融合提升复杂医疗影像中的病灶识别效果。', '多模态学习'],
      ['面向自动驾驶的端到端感知决策', 'IEEE T-PAMI 2024', '187', '合作作者', '探索感知与决策一体化的深度学习方法，支持复杂道路环境下的实时推理。', '神经网络架构'],
      ['深度学习模型的可信评测与安全防护', '人工智能学报 2024', '109', '合作作者', '从鲁棒性、可解释性和风险防护等维度建立深度模型评测方法。', '其他']
    ]
  },
  '计算机视觉': {
    papers: '148', citations: '13,280', hIndex: '44', patents: '29',
    topics: [['视觉感知', 38, '#1890ff'], ['目标检测', 27, '#52c41a'], ['医学影像', 21, '#fa8c16'], ['其他', 14, '#722ed1']],
    network: ['88位', '13所', '24项', '高'],
    networkNote: '计算机视觉标签下的合作网络围绕视觉感知、医学影像和多模态理解展开。',
    papersList: [
      ['视觉基础模型的跨域适应方法', 'CVPR 2025', '213', '通讯作者', '面向不同视觉域之间的分布差异，研究视觉基础模型的高效适应方法。', '视觉感知'],
      ['复杂场景下的目标检测与跟踪', 'IEEE T-IP 2024', '195', '第一作者', '针对遮挡、低照度等复杂条件，提升目标检测与连续跟踪的稳定性。', '目标检测'],
      ['医学影像多模态理解模型', 'Medical Image Analysis 2024', '164', '合作作者', '融合影像与文本信息，为医学影像辅助分析提供多模态建模方案。', '医学影像'],
      ['面向城市空间的三维视觉建模方法', 'ACM MM 2024', '102', '合作作者', '结合多视角数据构建城市空间三维表达，支持复杂环境下的视觉分析。', '其他']
    ]
  }
};

// 3. 关联信息页：合作学者（按标签）
export const relationScholarData = {
  '人工智能': [
    ['李博士', '中科院研究员', '23篇', ['机器学习', '数据挖掘']],
    ['王研究员', '上海交大教授', '18篇', ['计算机视觉', '深度学习']],
    ['赵教授', '北京大学教授', '15篇', ['自然语言处理', '知识图谱']]
  ],
  '机器学习': [
    ['周教授', '浙江大学教授', '21篇', ['监督学习', '表示学习']],
    ['孙研究员', '中科院计算所', '16篇', ['强化学习', '模型评测']],
    ['何博士', '香港科技大学', '12篇', ['联邦学习', '数据治理']]
  ],
  '深度学习': [
    ['王研究员', '上海交大教授', '18篇', ['深度学习', '高效训练']],
    ['陈教授', '斯坦福大学教授', '15篇', ['多模态学习', '视觉感知']],
    ['刘博士', 'MIT研究员', '13篇', ['神经网络架构', '自动驾驶']]
  ],
  '计算机视觉': [
    ['王研究员', '上海交大教授', '18篇', ['计算机视觉', '目标检测']],
    ['陈教授', '斯坦福大学教授', '15篇', ['视觉感知', '深度学习']],
    ['赵教授', '北京大学教授', '11篇', ['医学影像', '多模态理解']]
  ]
};

// 4. 专家列表（基础信息页）
export const expertData = {
  1: {
    name: '张教授',
    title: '清华大学计算机科学与技术系教授 · 博士生导师',
    avatar: '张',
    tags: ['人工智能', '机器学习', '深度学习', '计算机视觉'],
    organization: '清华大学',
    email: 'zhang@tsinghua.edu.cn',
    phone: '010-6277xxxx'
  },
  2: {
    name: '李博士',
    title: '中科院生物物理研究所研究员',
    avatar: '李',
    tags: ['生物技术', '分子生物学', '基因工程'],
    organization: '中科院',
    email: 'li@ibp.ac.cn',
    phone: '010-6488xxxx'
  },
  3: {
    name: '王研究员',
    title: '上海交通大学材料科学与工程学院教授',
    avatar: '王',
    tags: ['新能源', '材料科学', '纳米材料'],
    organization: '上海交大',
    email: 'wang@sjtu.edu.cn',
    phone: '021-5474xxxx'
  }
};

// 5. 项目详情（基础信息页工作经历成就项）
export const projectDetails = {
  '深度学习平台建设': {
    background: '随着深度学习技术的快速发展，学术界和工业界对高效的深度学习平台需求日益增长。',
    goal: '构建一个开源、高效、易用的深度学习框架，支持大规模分布式训练和模型部署。',
    achievements: [
      '发布深度学习框架 v1.0，支持CPU/GPU分布式训练',
      'GitHub Stars 超过 50,000',
      '被全球 500+ 企业和研究机构采用',
      '支持 100+ 种神经网络模型'
    ],
    contribution: '作为项目负责人，主导框架架构设计，带领团队完成核心模块开发，推动开源社区建设。'
  },
  '智能医疗影像分析系统': {
    background: '医疗影像诊断面临医生资源不足、诊断效率低等挑战，AI技术有望提升诊断准确率和效率。',
    goal: '开发基于深度学习的医疗影像分析系统，辅助医生进行疾病筛查和诊断。',
    achievements: [
      '肺结节检测准确率达到 95% 以上',
      '眼底病变筛查系统已在 100+ 家医院部署',
      '获得 NMPA 医疗器械三类证',
      '发表顶会论文 8 篇'
    ],
    contribution: '负责算法研发，提出多尺度特征融合网络，显著提升小病灶检测能力。'
  },
  '自动驾驶算法研究': {
    background: '自动驾驶是人工智能领域的重要应用方向，感知、决策、控制是核心技术挑战。',
    goal: '研发高精度、低延迟的自动驾驶感知和决策算法。',
    achievements: [
      '目标检测算法在 KITTI 数据集排名第一',
      '端到端决策模型在仿真环境测试成功率 98%',
      '获得自动驾驶领域专利 15 项',
      '与多家车企建立合作关系'
    ],
    contribution: '主导感知算法研发，设计多传感器融合方案，提升复杂场景下的感知鲁棒性。'
  },
  '机器学习算法优化': {
    background: '传统机器学习算法在大规模数据上面临训练速度慢、内存占用高等问题。',
    goal: '优化经典机器学习算法，提升训练效率和模型性能。',
    achievements: [
      '提出新的优化算法，训练速度提升 3 倍',
      '算法被集成到主流机器学习库',
      '发表高引用论文 5 篇',
      '应用于多个实际业务场景'
    ],
    contribution: '提出改进的优化算法，理论分析收敛性，并在实际数据集验证效果。'
  }
};

// 6. 学者头衔详情
export const titleData = {
  '长江学者': {
    awardDate: '2018年', awardingOrg: '教育部',
    description: '教育部实施的高层次人才计划，面向高等学校择优聘任',
    honors: ['特聘教授聘书', '科研经费支持', '研究生招生指标'],
    eligibility: '具有正高级职称，在教学科研一线工作'
  },
  '国家杰青': {
    awardDate: '2020年', awardingOrg: '国家自然科学基金委员会',
    description: '支持在基础研究方面已取得突出成绩的青年学者自主选择研究方向开展创新研究',
    honors: ['国家杰出青年科学基金', '项目经费400万元', '国际合作交流支持'],
    eligibility: '男性未满45周岁，女性未满48周岁'
  },
  'IEEE Fellow': {
    awardDate: '2019年', awardingOrg: '电气与电子工程师协会',
    description: 'IEEE会士是IEEE授予的最高荣誉，由同行选举产生',
    honors: ['IEEE Fellow证书', '终身荣誉称号', 'IEEE全球资源访问权'],
    eligibility: '在相关领域有显著贡献，IEEE会员满5年以上'
  },
  'CCF Fellow': {
    awardDate: '2021年', awardingOrg: '中国计算机学会',
    description: 'CCF Fellow授予在计算机领域有重大成就和贡献的会员',
    honors: ['CCF Fellow证书', '优先参与CCF活动', '推荐CCF奖项资格'],
    eligibility: 'CCF会员满5年，有显著学术成就'
  }
};

// 7. 学者详情
export const scholarData = {
  '李博士': { institution: '中科院计算技术研究所', title: '研究员', papers: 156, citations: 12890, hIndex: 45, fields: ['机器学习', '数据挖掘'], email: 'li@ict.cas.cn', phone: '010-6260xxxx', intro: '长期从事机器学习与数据挖掘研究，在国际顶级会议发表论文百余篇。' },
  '王研究员': { institution: '上海交通大学', title: '长聘教授', papers: 189, citations: 15680, hIndex: 52, fields: ['计算机视觉', '深度学习'], email: 'wang@sjtu.edu.cn', phone: '021-3420xxxx', intro: '计算机视觉领域知名专家，多项研究成果实现产业化应用。' },
  '赵教授': { institution: '北京大学', title: '教授', papers: 142, citations: 11230, hIndex: 38, fields: ['自然语言处理', '知识图谱'], email: 'zhao@pku.edu.cn', phone: '010-6275xxxx', intro: '专注于自然语言处理与知识图谱研究，承担多项国家重点项目。' },
  '陈教授': { institution: '斯坦福大学', title: '终身教授', papers: 268, citations: 45890, hIndex: 78, fields: ['计算机视觉', '深度学习'], email: 'chen@stanford.edu', phone: '+1-650-xxx', intro: '国际知名计算机视觉专家，CVPR/ICCV程序委员会主席。' },
  '刘博士': { institution: 'MIT', title: '研究员', papers: 98, citations: 8920, hIndex: 32, fields: ['机器学习', '强化学习'], email: 'liu@mit.edu', phone: '+1-617-xxx', intro: 'MIT计算机科学与人工智能实验室核心成员，专注强化学习研究。' }
};

// 8. 机构详情
export const orgData = {
  '清华大学': {
    type: '顶尖研究型大学', location: '北京市海淀区', founded: '1911年',
    ranking: 'QS世界大学排名第14位', students: '42,000+', teachers: '3,500+', papers: '12,500篇',
    intro: '中国最著名的高等学府之一，在计算机科学、人工智能等领域处于国际领先地位。',
    strengths: ['计算机科学与技术', '人工智能', '软件工程', '自动化'],
    achievements: ['国家自然科学奖一等奖5项', '国家技术发明奖8项', 'SCI论文年均增长15%']
  },
  '北京大学': {
    type: '综合性研究型大学', location: '北京市海淀区', founded: '1898年',
    ranking: 'QS世界大学排名第18位', students: '48,000+', teachers: '4,000+', papers: '11,200篇',
    intro: '中国最古老的现代综合性大学之一，在计算机科学、数学等领域享有盛誉。',
    strengths: ['计算机科学', '数学', '软件工程', '信息与通信工程'],
    achievements: ['国家自然科学奖一等奖3项', '973计划项目15项', 'ESI高被引论文占比28%']
  },
  '浙江大学': {
    type: '研究型综合大学', location: '浙江省杭州市', founded: '1897年',
    ranking: 'QS世界大学排名第45位', students: '60,000+', teachers: '4,500+', papers: '14,800篇',
    intro: '中国排名前列的综合性大学，在计算机、控制科学等学科具有显著优势。',
    strengths: ['计算机科学', '控制科学与工程', '软件工程', '人工智能'],
    achievements: ['国家科技进步奖一等奖2项', '国家重点实验室5个', 'PCT国际专利申请量全国前三']
  },
  '中科院计算技术研究所': {
    type: '国家级科研机构', location: '北京市海淀区', founded: '1956年',
    ranking: '计算机领域排名第一', students: '800+', teachers: '400+', papers: '2,500篇',
    intro: '中国计算机科学的发源地，在计算机系统结构、人工智能等领域代表国家最高水平。',
    strengths: ['计算机系统结构', '人工智能', '网络技术', '信息安全'],
    achievements: ['国家科技进步特等奖1项', '国家自然科学奖5项', '培养计算机领域院士最多']
  },
  '上海交通大学': {
    type: '研究型大学', location: '上海市闵行区', founded: '1896年',
    ranking: 'QS世界大学排名第47位', students: '40,000+', teachers: '3,000+', papers: '10,500篇',
    intro: '中国著名的高等学府，在计算机、电子信息等领域具有重要影响力。',
    strengths: ['计算机科学', '电子信息', '人工智能', '软件工程'],
    achievements: ['国家自然科学奖一等奖2项', '国家863计划项目20项', '科技成果转化率超30%']
  }
};

// 9. 里程碑详情（科研成长轨迹）
export const milestoneDetails = {
  '本科毕业': {
    date: '2000年6月', event: '浙江大学计算机科学与技术系本科毕业',
    contribution: '以优异成绩毕业，专业排名前5%。在校期间获得ACM程序设计竞赛省级一等奖，参与多个校企合作项目，积累了扎实的计算机基础。',
    honor: '优秀毕业生、ACM程序设计竞赛省级一等奖',
    events: ['浙江省优秀学生干部', '连续三年获得奖学金', '校程序设计大赛冠军'],
    tags: ['学术基础', '竞赛经历', '实践经验'],
    newsTitle: '浙江大学计算机学院优秀毕业生名单公布', newsSource: '浙江大学新闻网', newsDate: '2000年6月20日',
    icon: 'fa-graduation-cap'
  },
  '硕士毕业': {
    date: '2003年6月', event: '北京大学计算机软件与理论硕士毕业',
    contribution: '完成分布式系统研究，发表核心期刊论文。在分布式计算和云计算领域取得重要进展，论文被引用超过200次。',
    honor: '优秀硕士学位论文、北京市优秀毕业生',
    events: ['发表SCI论文2篇、EI论文4篇', '获国家发明专利1项', '参与863项目核心技术攻关'],
    tags: ['学术研究', '论文发表', '专利成果'],
    newsTitle: '北京大学发布年度优秀硕士论文榜单', newsSource: '北京大学研究生院官网', newsDate: '2003年7月10日',
    icon: 'fa-university'
  },
  '博士毕业': {
    date: '2006年6月', event: '清华大学计算机科学与技术博士毕业',
    contribution: '深入研究机器学习算法，发表3篇SCI论文。在国际顶级会议NeurIPS、ICML上发表重要研究成果。',
    honor: '清华大学优秀博士毕业生、全国优秀博士论文提名',
    events: ['发表SCI论文8篇，引用超过500次', '获中国计算机学会科技进步奖', '受邀在CVPR做口头报告'],
    tags: ['机器学习', '顶会论文', '学术荣誉'],
    newsTitle: '清华大学计算机系多位博士获全国优秀论文提名', newsSource: '清华大学官网', newsDate: '2006年10月15日',
    icon: 'fa-award'
  },
  '博士后研究': {
    date: '2009年6月', event: '完成斯坦福大学博士后研究',
    contribution: '参与ImageNet项目，为深度学习发展做出重要贡献。与国际顶尖学者合作，发表多篇高影响力论文。',
    honor: '斯坦福大学优秀博士后、Google Faculty Research Award',
    events: ['参与ImageNet大规模视觉识别挑战赛', '与Fei-Fei Li教授团队深度合作', '发表Nature子刊论文1篇'],
    tags: ['国际合作', '深度学习', '前沿研究'],
    newsTitle: '斯坦福大学AI实验室发布年度突出贡献博士后名单', newsSource: 'Stanford News', newsDate: '2009年8月25日',
    icon: 'fa-globe-americas'
  },
  '副教授': {
    date: '2012年9月', event: '清华大学计算机科学与技术系晋升副教授',
    contribution: '主持国家自然科学基金项目2项，带领团队在计算机视觉领域取得突破性进展，建立人工智能实验室。',
    honor: '清华大学青年骨干教师、腾讯杰出科学奖',
    events: ['主持NSFC项目2项，总经费300万', '获批组建人工智能研究团队', '团队发表CCF A类论文15篇'],
    tags: ['科研主持', '团队建设', '学科建设'],
    newsTitle: '清华大学计算机系新晋副教授任职公示', newsSource: '清华大学人事处公告', newsDate: '2012年9月5日',
    icon: 'fa-chalkboard-teacher'
  },
  '长江学者': {
    date: '2015年12月', event: '入选长江学者特聘教授',
    contribution: '在计算机视觉领域取得突破性进展，提出多项创新算法，被国际同行广泛引用和跟踪研究。',
    honor: '教育部颁发长江学者特聘教授聘书、年薪制岗位',
    events: ['教育部正式批准入选', '获长江学者特聘教授称号', '受邀在人民大会堂参加颁奖典礼'],
    tags: ['国家人才计划', '学术顶尖', '行业引领'],
    newsTitle: '教育部公布2015年度长江学者特聘教授名单', newsSource: '教育部官网', newsDate: '2015年12月28日',
    icon: 'fa-crown'
  },
  '国家杰青': {
    date: '2017年8月', event: '获得国家杰出青年科学基金',
    contribution: '深度学习理论与方法研究获得国家最高级别青年人才项目支持，项目经费400万元。',
    honor: '国家自然科学基金委颁发证书、获直接经费资助400万',
    events: ['NSFC评审全票通过', '获批杰青项目经费400万', '项目研究方向获国家重点支持'],
    tags: ['国家最高级别人才项目', '科研经费支持', '前沿方向'],
    newsTitle: '2017年国家杰出青年科学基金评审结果揭晓', newsSource: '国家自然科学基金委官网', newsDate: '2017年8月15日',
    icon: 'fa-flag'
  },
  'IEEE Fellow': {
    date: '2020年1月', event: '当选IEEE Fellow',
    contribution: '在计算机视觉和机器学习领域的杰出贡献获得国际学术界最高认可，当选IEEE会士。',
    honor: 'IEEE正式会员最高等级、国际学术界最高荣誉之一',
    events: ['IEEE董事会正式批准', '全球仅约0.1%科学家获此殊荣', '收到IEEE官方贺信'],
    tags: ['国际最高荣誉', 'IEEE顶级会员', '全球顶尖'],
    newsTitle: 'IEEE Fellow评选结果公布，多位华人科学家入选', newsSource: 'IEEE官方公告', newsDate: '2020年1月15日',
    icon: 'fa-medal'
  }
};

// 10. 合作企业详情（行为信息页）
export const companyData = {
  '百度': {
    icon: 'fa-robot', iconColor: '#2932e1',
    projects: 8, budget: '1200万', patents: 12, papers: 15, cooperationYears: '2018-2024',
    projectDetails: [
      { name: '自动驾驶感知系统研发', time: '2023.01 - 2025.12', budget: '500万', status: '进行中', description: '研发基于深度学习的自动驾驶视觉感知系统，包括目标检测、语义分割、场景理解等核心算法，支持复杂城市道路环境下的自动驾驶决策。', patents: ['基于深度学习的图像识别方法', '自动驾驶决策算法及装置', '多传感器融合方法'], papers: ['End-to-End Autonomous Driving Perception System', 'Real-time Object Detection for Autonomous Vehicles'], fundUsage: { equipment: 45, personnel: 30, materials: 15, others: 10 } },
      { name: '计算机视觉算法研究', time: '2022.06 - 2024.06', budget: '350万', status: '进行中', description: '研究计算机视觉核心算法，包括图像分类、目标检测、图像分割、人脸识别等，应用于智能监控、医疗影像等领域。', patents: ['智能医疗影像分析方法', '基于CNN的目标检测方法', '人脸识别优化算法'], papers: ['Advanced Computer Vision Techniques', 'Medical Image Analysis Using Deep Learning', 'Face Recognition in Wild Conditions'], fundUsage: { equipment: 40, personnel: 35, materials: 15, others: 10 } },
      { name: '自然语言处理应用', time: '2021.09 - 2023.09', budget: '200万', status: '已结题', description: '开发基于Transformer的自然语言处理应用系统，包括智能问答、文本分类、情感分析等功能，应用于搜索引擎和智能客服。', patents: ['自然语言处理模型训练方法', '智能问答系统'], papers: ['Transformer-based NLP Applications', 'Intelligent QA System Design'], fundUsage: { equipment: 35, personnel: 40, materials: 15, others: 10 } },
      { name: '智能医疗影像分析', time: '2021.01 - 2022.12', budget: '150万', status: '已结题', description: '开发智能医疗影像诊断系统，支持CT、MRI、X光等多种医学影像的自动识别和诊断，辅助医生进行疾病诊断。', patents: ['智能医疗影像分析方法'], papers: ['Medical Image Analysis Using Deep Learning'], fundUsage: { equipment: 50, personnel: 25, materials: 20, others: 5 } }
    ]
  },
  '阿里巴巴': {
    icon: 'fa-shopping-cart', iconColor: '#ff6a00',
    projects: 5, budget: '800万', patents: 8, papers: 10, cooperationYears: '2019-2024',
    projectDetails: [
      { name: '智能推荐系统优化', time: '2023.03 - 2025.03', budget: '400万', status: '进行中', description: '优化电商平台推荐系统算法，结合用户行为分析、商品知识图谱和实时特征工程，提升推荐精准度和用户体验。', patents: ['推荐系统优化算法', '用户行为预测方法', '知识图谱构建方法'], papers: ['Personalized Recommendation System', 'Knowledge Graph for E-commerce'], fundUsage: { equipment: 30, personnel: 45, materials: 15, others: 10 } },
      { name: '知识图谱构建平台', time: '2021.06 - 2023.06', budget: '280万', status: '已结题', description: '构建商品知识图谱平台，整合商品属性、品牌关系、用户偏好等多维度数据，支持智能搜索和推荐应用。', patents: ['知识图谱构建方法', '实体关系抽取算法'], papers: ['Large-scale Knowledge Graph Construction', 'Entity Relation Extraction'], fundUsage: { equipment: 35, personnel: 40, materials: 20, others: 5 } },
      { name: '数据挖掘与分析', time: '2020.01 - 2021.12', budget: '120万', status: '已结题', description: '开发用户行为数据挖掘系统，分析用户购物习惯、浏览偏好，为营销策略提供数据支持。', patents: ['用户行为分析方法'], papers: ['User Behavior Mining for E-commerce'], fundUsage: { equipment: 40, personnel: 35, materials: 20, others: 5 } }
    ]
  },
  '华为': {
    icon: 'fa-microchip', iconColor: '#ce0e2d',
    projects: 2, budget: '800万', patents: 8, papers: 6, cooperationYears: '2021-2024',
    projectDetails: [
      { name: '边缘计算平台开发', time: '2022.01 - 2024.12', budget: '600万', status: '进行中', description: '开发面向物联网场景的边缘计算平台，实现AI模型在边缘设备的部署和优化，支持实时数据处理和智能决策。', patents: ['边缘计算任务调度方法', '模型压缩优化方法', '边缘AI推理框架'], papers: ['Edge Computing for IoT Applications', 'Model Compression for Edge Devices'], fundUsage: { equipment: 50, personnel: 30, materials: 15, others: 5 } },
      { name: '深度学习框架优化', time: '2021.06 - 2023.06', budget: '200万', status: '已结题', description: '优化深度学习训练和推理框架，提升在华为昇腾芯片上的性能表现，支持大规模分布式训练。', patents: ['分布式训练优化方法', '模型并行策略'], papers: ['Deep Learning Framework Optimization'], fundUsage: { equipment: 45, personnel: 35, materials: 15, others: 5 } }
    ]
  }
};

// 11. 意识形态详情（心理信息页）
export const ideologyDetails = {
  '科学精神': {
    name: '科学精神', score: '95%',
    description: '坚持实事求是的科学态度，追求真理，勇于创新。',
    indicators: [
      { name: '严谨治学', score: 96, basis: '论文数据重复验证率100%，无实验数据异常' },
      { name: '数据真实', score: 98, basis: '开放数据集被引用超过5000次，代码开源' },
      { name: '方法规范', score: 94, basis: '实验方法论被多篇顶级期刊引用' },
      { name: '结果可复现', score: 92, basis: '主要成果已获国际团队独立复现' }
    ],
    statements: [
      { text: '科研的核心是求真，任何偏离事实的研究都是对科学的亵渎。', source: '2023年学术会议主旨演讲', date: '2023-05-20' },
      { text: '我们要求实验室所有数据都要可追溯、可复现。', source: '实验室组会纪要', date: '2023-08-15' },
      { text: '宁可慢一点，也要确保每一步都经得起检验。', source: '科技日报专访', date: '2024-01-10' }
    ],
    evidence: '在多项研究中坚持开放数据和方法，支持结果可复现。',
    dataSources: ['科研诚信数据库', '论文撤稿监测系统', '开放数据平台日志', '学术不端举报记录']
  },
  '学术规范': {
    name: '学术规范', score: '88%',
    description: '严格遵守学术道德规范，杜绝学术不端行为。',
    indicators: [
      { name: '引用规范', score: 92, basis: '论文引用格式规范，无疑似不当引用' },
      { name: '署名合理', score: 90, basis: '作者贡献声明完整，无署名争议' },
      { name: '无抄袭行为', score: 95, basis: '查重率低于5%，远低于警戒线' },
      { name: '无数据造假', score: 85, basis: '原始数据存档完整，抽查合规' }
    ],
    statements: [
      { text: '学术规范是科研工作的底线，任何时候都不能突破。', source: '学术道德委员会发言', date: '2022-11-08' },
      { text: '我要求团队成员对每一处引用负责，确保标注清晰。', source: '实验室管理规范', date: '2023-02-14' },
      { text: '学术声誉需要长期积累，毁掉它却很容易。', source: '新生培训讲话', date: '2023-09-01' }
    ],
    evidence: '所有论文均经过严格的学术审查，无撤稿或学术不端记录。',
    dataSources: ['学术不端举报系统', '论文查重数据库', '期刊撤稿公示', '作者贡献声明档案']
  },
  '社会责任': {
    name: '社会责任', score: '82%',
    description: '积极承担科研人员社会责任，关注技术伦理。',
    indicators: [
      { name: '技术向善', score: 88, basis: 'AI伦理研究项目3项，发表相关论文5篇' },
      { name: '关注伦理', score: 85, basis: '参与制定AI伦理准则2项' },
      { name: '服务社会', score: 80, basis: '科普文章12篇，讲座8场' },
      { name: '科普宣传', score: 75, basis: '媒体采访报道28篇' }
    ],
    statements: [
      { text: '人工智能发展必须服务于人类福祉，不能成为伤害人类的工具。', source: '联合国AI伦理论坛', date: '2023-07-12' },
      { text: '科学家有责任向公众普及科技知识，消除误解。', source: '科普节目访谈', date: '2023-10-20' },
      { text: '技术本身没有善恶，关键在于使用它的人。', source: '学术报告', date: '2024-02-28' }
    ],
    evidence: '积极参与AI伦理讨论，推动技术向善发展。',
    dataSources: ['AI伦理研究项目库', '科普活动记录', '媒体报道档案', '社会影响力评估报告']
  },
  '国际合作': {
    name: '国际合作态度', score: '78%',
    description: '开放包容的国际合作理念，促进学术交流。',
    indicators: [
      { name: '开放合作', score: 82, basis: '国际合作论文占比45%，合作国家15个' },
      { name: '尊重多元', score: 80, basis: '团队成员来自8个国家，多元文化融合' },
      { name: '平等交流', score: 75, basis: '国际会议主旨演讲12次' },
      { name: '共享成果', score: 76, basis: '开源项目Star数超过2万' }
    ],
    statements: [
      { text: '科学无国界，但科学家有祖国。我们要在开放合作中坚持底线。', source: '学术访谈', date: '2023-06-15' },
      { text: '国际合作是推动科技进步的重要途径，要以开放心态参与。', source: '国际学术论坛', date: '2023-09-22' },
      { text: '在核心技术上要坚持自主可控，同时积极参与国际合作。', source: '政策建议报告', date: '2024-01-05' }
    ],
    evidence: '与多个国际顶尖研究机构保持长期合作关系。',
    dataSources: ['国际合作项目数据库', '论文作者署名分析', '学术会议参与记录', '开放源代码贡献统计']
  }
};

// 12. 媒体报道数据（心理信息页舆情指标）
export const mediaReportsData = [
  { title: '跨学科研究的魅力：张教授与合作者的故事', source: '交叉科学学报', date: '2021-12-12', summary: '讲述张教授开展跨学科研究的故事和心得体会。', url: '#' },
  { title: '科技前沿的张教授：从学者到战略科学家的蜕变', source: '战略研究', date: '2022-01-05', summary: '分析张教授从学术研究到战略咨询的转型之路。', url: '#' }
];

// 13. 学术指标详情（关联信息页关键学术指标弹窗）
// papers / citations / hindex / patents 各自的 detail tab 内容
export const academicDetailContents = {
  papers: {
    title: '发表论文详情',
    icon: 'fa-file-alt',
    tabs: [
      { id: 'papers-list', label: '高被引论文', icon: 'fa-list', type: 'paper-list', items: [
        { rank: 'TOP 1', top: true, title: '基于深度学习的图像识别算法研究', venue: 'IEEE TPAMI', year: '2024', citations: 245, tag: '计算机视觉' },
        { rank: 'TOP 2', top: true, title: 'Transformer架构在大规模语言模型中的应用', venue: 'Nature Machine Intelligence', year: '2024', citations: 189, tag: '自然语言处理' },
        { rank: 'TOP 3', top: false, title: '面向小样本学习的特征增强方法', venue: 'NeurIPS', year: '2023', citations: 156, tag: '机器学习' },
        { rank: 'TOP 4', top: false, title: '跨模态学习的理论与应用研究', venue: 'CVPR', year: '2023', citations: 134, tag: '多模态学习' },
        { rank: 'TOP 5', top: false, title: '图神经网络在推荐系统中的应用', venue: 'KDD', year: '2023', citations: 112, tag: '推荐系统' }
      ]},
      { id: 'papers-year', label: '年份分布', icon: 'fa-calendar', type: 'bars', items: [
        { label: '2024', value: 68, percent: 85 },
        { label: '2023', value: 58, percent: 75 },
        { label: '2022', value: 45, percent: 65 },
        { label: '2021', value: 35, percent: 50 },
        { label: '2020', value: 28, percent: 40 }
      ]},
      { id: 'papers-field', label: '领域分布', icon: 'fa-folder', type: 'bars', items: [
        { label: '计算机视觉', value: '89篇', percent: 80, color: 'blue' },
        { label: '自然语言处理', value: '72篇', percent: 65, color: 'blue' },
        { label: '机器学习', value: '45篇', percent: 55, color: 'blue' },
        { label: '多模态学习', value: '28篇', percent: 35, color: 'blue' }
      ]}
    ]
  },
  citations: {
    title: '引用趋势分析',
    icon: 'fa-chart-line',
    summary: [
      { value: '18,960', label: '总引用数' },
      { value: '+23.5%', label: '同比增长', green: true },
      { value: '81.2', label: '篇均引用' }
    ],
    tabs: [
      { id: 'citations-trend', label: '引用趋势', icon: 'fa-chart-line', type: 'trend-bars', items: [
        { year: '2020', value: '2,340', percent: 45, highlight: false },
        { year: '2021', value: '3,120', percent: 55, highlight: false },
        { year: '2022', value: '4,250', percent: 68, highlight: false },
        { year: '2023', value: '5,680', percent: 82, highlight: false },
        { year: '2024', value: '3,570', percent: 100, highlight: true }
      ]},
      { id: 'citations-paper', label: '高被引论文', icon: 'fa-file-alt', type: 'paper-list', items: [
        { rank: 'TOP 1', top: true, title: '基于深度学习的图像识别算法研究', venue: '', year: '2024', citations: 245 },
        { rank: 'TOP 2', top: true, title: 'Transformer架构在大规模语言模型中的应用', venue: '', year: '2024', citations: 189 },
        { rank: 'TOP 3', top: false, title: '面向小样本学习的特征增强方法', venue: '', year: '2023', citations: 156 }
      ]},
      { id: 'citations-dist', label: '引用分布', icon: 'fa-pie-chart', type: 'bars', items: [
        { label: 'IEEE/ACM期刊', value: '8,960', percent: 75, color: 'purple' },
        { label: '顶会论文', value: '6,420', percent: 60, color: 'purple' },
        { label: '中文核心期刊', value: '3,580', percent: 35, color: 'purple' }
      ]}
    ]
  },
  hindex: {
    title: 'H指数分析',
    icon: 'fa-chart-bar',
    hindexValue: 56,
    desc: 'H指数为56，表示该专家至少有56篇论文被引用了至少56次。',
    highlight: '5%',
    stats: [
      { value: '234', label: '发表论文总数' },
      { value: '189', label: '被引用论文数' },
      { value: '18,960', label: '总引用次数' },
      { value: '81.2', label: '篇均引用' }
    ],
    ranks: [
      { icon: 'fa-globe', label: '全球同领域排名', value: '前5%' },
      { icon: 'fa-flag', label: '国内同领域排名', value: '前2%' },
      { icon: 'fa-building', label: '机构内排名', value: '第1位' }
    ]
  },
  patents: {
    title: '发明专利详情',
    icon: 'fa-lightbulb',
    tabs: [
      { id: 'patents-list', label: '专利列表', icon: 'fa-list', type: 'patent-list', items: [
        { title: '一种基于深度学习的图像识别方法及系统', status: '已授权', statusClass: 'granted', code: 'CN202410012345.6', date: '2024-01-15' },
        { title: '一种自然语言处理模型的训练方法', status: '已授权', statusClass: 'granted', code: 'CN202310098765.4', date: '2023-08-22' },
        { title: '一种多模态数据融合的推荐方法', status: '审查中', statusClass: 'pending', code: 'CN202410056789.2', date: '2024-02-28' },
        { title: '一种图神经网络加速方法', status: '已授权', statusClass: 'granted', code: 'CN202210123456.7', date: '2022-05-10' }
      ]},
      { id: 'patents-type', label: '类型分布', icon: 'fa-pie-chart', type: 'bars', items: [
        { label: '发明专利', value: '28项', percent: 70, color: 'orange' },
        { label: '实用新型', value: '10项', percent: 25, color: 'orange' },
        { label: '外观设计', value: '4项', percent: 8, color: 'orange' }
      ]},
      { id: 'patents-year', label: '年份分布', icon: 'fa-calendar', type: 'bars', items: [
        { label: '2024', value: '15项', percent: 65, color: 'orange' },
        { label: '2023', value: '12项', percent: 55, color: 'orange' },
        { label: '2022', value: '8项', percent: 40, color: 'orange' },
        { label: '2021', value: '5项', percent: 30, color: 'orange' },
        { label: '2020', value: '2项', percent: 20, color: 'orange' }
      ]}
    ]
  }
};

// 14. 合作指标详情（行为信息页合作企业 4 个指标卡）
export const metricDetailData = {
  '合作指数': {
    summary: { label: '合作指数综合评分', value: '85%' },
    desc: '产学研合作活跃度综合评估，基于项目数量、合作企业数、资金规模、产出成果等维度计算。',
    breakdowns: [
      [{ label: '项目合作', value: '35%' }, { label: '企业合作', value: '25%' }, { label: '资金规模', value: '20%' }],
      [{ label: '成果产出', value: '15%' }, { label: '持续性', value: '5%' }]
    ],
    type: 'cooperation-network'
  },
  '专利': {
    summary: { label: '联合申请专利总数', value: '28项' },
    breakdowns: [
      [{ label: '发明专利', value: '20项' }, { label: '实用新型', value: '5项' }, { label: '软件著作权', value: '3项' }]
    ],
    type: 'patent-table',
    patents: [
      { name: '基于深度学习的图像识别方法及系统', type: '发明专利', date: '2023-05-15', status: '已授权', statusClass: 'granted' },
      { name: '一种自动驾驶决策算法及装置', type: '发明专利', date: '2023-03-20', status: '审理中', statusClass: 'pending' },
      { name: '智能医疗影像分析方法及系统', type: '发明专利', date: '2022-11-08', status: '已授权', statusClass: 'granted' },
      { name: '基于卷积神经网络的目标检测方法', type: '发明专利', date: '2022-08-12', status: '已授权', statusClass: 'granted' },
      { name: '自然语言处理模型训练方法', type: '发明专利', date: '2022-06-30', status: '已授权', statusClass: 'granted' },
      { name: '一种知识图谱构建方法', type: '发明专利', date: '2022-04-18', status: '已授权', statusClass: 'granted' },
      { name: '推荐系统优化算法', type: '发明专利', date: '2021-12-05', status: '已授权', statusClass: 'granted' },
      { name: '边缘计算任务调度方法', type: '发明专利', date: '2021-09-22', status: '已授权', statusClass: 'granted' },
      { name: '智能语音识别系统', type: '实用新型', date: '2021-07-10', status: '已授权', statusClass: 'granted' },
      { name: '数据加密存储装置', type: '实用新型', date: '2021-05-28', status: '已失效', statusClass: 'expired' }
    ],
    footer: '显示前10项，共28项专利'
  },
  '项目': {
    summary: { label: '企业合作项目总数', value: '15个' },
    breakdowns: [
      [{ label: '重大项目', value: '3个' }, { label: '重点研发', value: '5个' }, { label: '一般合作', value: '7个' }]
    ],
    type: 'project-table',
    projects: [
      { name: '自动驾驶感知系统研发', company: '百度', period: '2023.01-2025.12', budget: '500万', status: '进行中', statusClass: 'pending' },
      { name: '智能推荐系统优化', company: '阿里巴巴', period: '2023.03-2025.03', budget: '400万', status: '进行中', statusClass: 'pending' },
      { name: '计算机视觉算法研究', company: '百度', period: '2022.06-2024.06', budget: '350万', status: '进行中', statusClass: 'pending' },
      { name: '边缘计算平台开发', company: '华为', period: '2022.01-2024.12', budget: '600万', status: '进行中', statusClass: 'pending' },
      { name: '自然语言处理应用', company: '百度', period: '2021.09-2023.09', budget: '200万', status: '已结题', statusClass: 'granted' },
      { name: '知识图谱构建平台', company: '阿里巴巴', period: '2021.06-2023.06', budget: '280万', status: '已结题', statusClass: 'granted' },
      { name: '智能医疗影像分析', company: '百度', period: '2021.01-2022.12', budget: '150万', status: '已结题', statusClass: 'granted' }
    ],
    footer: '显示前7项，共15个项目'
  },
  '资金': {
    summary: { label: '合作资金总额', value: '2800万元' },
    type: 'fund-chart',
    sources: [
      { label: '百度', value: '1200万 (43%)', color: '#2932e1', startDeg: 0, endDeg: 154 },
      { label: '阿里巴巴', value: '800万 (29%)', color: '#ff6a00', startDeg: 154, endDeg: 257 },
      { label: '华为', value: '800万 (28%)', color: '#ce0e2d', startDeg: 257, endDeg: 360 }
    ],
    usage: [
      [{ label: '设备采购', value: '40%' }, { label: '人员费用', value: '30%' }, { label: '材料费用', value: '20%' }],
      [{ label: '其他费用', value: '10%' }, { label: '资金使用率', value: '98%' }]
    ]
  }
};

// 15. 话题/价值观详情（心理信息页热点话题与价值观表述）
export const topicDetails = {
  '人工智能伦理': {
    name: '人工智能伦理', mentions: 15,
    views: '强调AI发展必须遵循伦理原则，确保技术向善。',
    sources: [
      { type: '学术论文', title: '《人工智能伦理框架研究》', author: '张伟, 李明, 王强', journal: '《中国科学》期刊', year: '2023', date: '2023-06-15', quote: '本文提出了一种基于可信度评估的AI伦理框架，强调技术在发展过程中必须遵循"向善"原则，确保人工智能系统符合人类价值观。' },
      { type: '访谈', title: '联合国AI伦理论坛主旨演讲', author: '张伟', journal: '联合国教科文组织', year: '2023', date: '2023-04-05', quote: 'AI技术的发展必须以人为本，我们需要在技术创新的同时建立完善的伦理审查机制。' }
    ]
  },
  '深度学习': {
    name: '深度学习', mentions: 28,
    views: '深度学习是推动AI发展的核心技术，需要持续创新。',
    sources: [
      { type: '学术论文', title: 'Multi-Scale Feature Fusion for Visual Recognition', author: '张伟, 王晓, 刘强', journal: 'CVPR 2023', year: '2023', date: '2023-06-20', quote: '本文提出了一种多尺度特征融合方法，显著提升了模型在复杂场景下的识别精度。' },
      { type: '课程讲座', title: '清华大学人工智能导论', author: '张伟', journal: '学堂在线', year: '2023', date: '2023-09-01', quote: '深度学习是现代人工智能的基石，理解其原理对于开展前沿研究至关重要。' }
    ]
  },
  '医疗AI': {
    name: '医疗AI', mentions: 12,
    views: 'AI在医疗领域有巨大潜力，但必须确保安全可靠。',
    sources: [
      { type: '学术论文', title: '智能辅助诊断系统在临床中的应用研究', author: '张伟, 陈华, 李明', journal: 'Nature Machine Intelligence', year: '2024', date: '2024-01-10', quote: '本研究开发的AI辅助诊断系统在多个临床场景中展现出优异的性能，有效降低了误诊率。' },
      { type: '访谈', title: '医疗AI应用白皮书发布采访', author: '张伟', journal: '健康报', year: '2024', date: '2024-02-20', quote: 'AI技术在医疗领域的应用必须以安全为前提，需要经过严格的临床验证才能推广使用。' }
    ]
  },
  '科研诚信': {
    name: '科研诚信', mentions: 8,
    views: '科研诚信是学术研究的基石，必须严格遵守。',
    sources: [
      { type: '访谈', title: '科研诚信主题访谈', author: '张伟', journal: '科学通报', year: '2023', date: '2023-11-15', quote: '科研诚信是学者安身立命之本，任何学术不端行为都应受到严肃处理。' }
    ]
  },
  '产学研合作': {
    name: '产学研合作', mentions: 20,
    views: '产学研深度合作是推动科技成果转化的重要路径。',
    sources: [
      { type: '访谈', title: '产学研协同创新论坛发言', author: '张伟', journal: '科技日报', year: '2024', date: '2024-03-10', quote: '产学研合作要建立长效机制，让高校、科研院所与企业形成真正的创新共同体。' }
    ]
  }
};

export const valueDetails = {
  '科研价值观': {
    name: '科研价值观',
    quote: '科学研究应该服务于社会，解决实际问题，而不是为了发论文而发论文。',
    source: '2023年科技论坛访谈',
    views: '强调科研工作的实用导向与社会责任，反对纯粹以论文数量为导向的研究模式。',
    sources: [
      { type: '访谈', title: '2023年科技论坛主旨发言', author: '张教授', journal: '科技论坛', year: '2023', date: '2023-09-12', quote: '科学研究应该服务于社会，解决实际问题，而不是为了发论文而发论文。' }
    ]
  },
  '人才培养观': {
    name: '人才培养观',
    quote: '培养学生要注重创新思维和实践能力的结合，让他们敢于挑战权威。',
    source: '2024年教育峰会发言',
    views: '注重学生创新思维与实践能力并重，鼓励挑战权威的学术精神。',
    sources: [
      { type: '访谈', title: '2024年教育峰会发言', author: '张教授', journal: '教育峰会', year: '2024', date: '2024-05-18', quote: '培养学生要注重创新思维和实践能力的结合，让他们敢于挑战权威。' }
    ]
  },
  'AI发展观': {
    name: 'AI发展观',
    quote: 'AI技术的发展必须以人为本，确保技术向善，避免算法歧视。',
    source: '2023年人工智能大会主题演讲',
    views: '主张AI技术发展应以人为本，强调技术向善与避免算法歧视。',
    sources: [
      { type: '访谈', title: '2023年人工智能大会主题演讲', author: '张教授', journal: '人工智能大会', year: '2023', date: '2023-12-08', quote: 'AI技术的发展必须以人为本，确保技术向善，避免算法歧视。' }
    ]
  }
};

// 列表筛选下拉框选项（来自 talent-profile-list-runtime.js createPage 内联 options）
// 人才列表数据改为从后端 /api/talent/person/list 获取（见 hooks/talent-profile.js fetchProfileList）
// 学科层级树：primary → { secondary → { tertiary → [quaternary...] } }
export const disciplineTree = {
  '计算机科学与技术': {
    '人工智能': {
      '机器学习': ['科学机器学习', '计算机视觉', '强化学习'],
      '深度学习': ['计算机视觉', '自然语言处理', '大模型预训练'],
    },
    'AI for Science': {
      '科学机器学习': ['蛋白质结构预测', '分子动力学模拟'],
      '数据驱动建模': ['气候建模', '材料信息学'],
    },
    '智能制造': {
      '工业互联网': ['数字孪生', '边缘计算'],
      '智能机器人': ['运动规划', '具身智能'],
    },
  },
  '物理学': {
    '量子计算': {
      '量子算法': ['量子纠错', '量子计算架构'],
      '量子信息': ['量子纠缠', '量子退火'],
    },
    '凝聚态物理': {
      '拓扑物态': ['拓扑绝缘体', '马约拉纳费米子'],
      '超导物理': ['高温超导', '非常规超导'],
    },
  },
  '生命科学': {
    '生物信息学': {
      '结构生物学': ['蛋白质结构预测', '冷冻电镜技术'],
      '基因编辑': ['单细胞分析', '基因治疗'],
    },
    '合成生物学': {
      '基因回路': ['逻辑门电路', '生物传感器'],
      '代谢工程': ['细胞工厂', '生物制造'],
    },
  },
  '材料科学与工程': {
    '新材料': {
      '储能材料': ['固态电解质', '电池材料筛选'],
      '新能源材料': ['钙钛矿材料', '纳米材料'],
    },
    '功能材料': {
      '智能材料': ['形状记忆合金', '压电材料'],
      '生物医用材料': ['可降解支架', '组织工程材料'],
    },
  },
  '能源动力': {
    '新能源': {
      '新能源材料': ['固态电解质', '电池材料筛选'],
      '储能技术': ['电化学储能', '物理储能'],
    },
    '储能材料': {
      '固态电解质': ['氧化物固态电解质', '硫化物固态电解质'],
      '电池材料筛选': ['锂离子电池材料', '钠离子电池材料'],
    },
  },
  '数学': {
    '应用数学': {
      '计算数学': ['数值分析', '科学计算'],
      '概率统计': ['随机过程', '贝叶斯统计'],
    },
    '基础数学': {
      '数论': ['解析数论', '代数数论'],
      '几何拓扑': ['微分几何', '代数拓扑'],
    },
  },
};

// 非学科类筛选选项（扁平数组）
export const listFilterOptions = {
  primary: Object.keys(disciplineTree),
  institution: ['中国科学院', '清华大学', '北京大学', '华为技术'],
  outcome: ['高被引论文', '发明专利', '国家级奖项'],
  project: ['国家重点研发计划', '国家自然科学基金', '重大工程项目'],
  type: ['领军人才', '青年人才', '项目人才'],
  region: ['北京', '广东', '海外']
};
