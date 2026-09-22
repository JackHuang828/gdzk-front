/* 人才TOP100 筛选条件配置与匹配规则（原 talent-library-page.js 内置）。
 * 字段格式：[key, 标签, 选项, 类型]；类型 range 表示最小值—最大值区间。 */
export const TOP_FILTER_GROUPS = [
  {
    title: '研究方向',
    open: true,
    fields: [
      ['primaryDiscipline', '一级学科', ['数学', '物理学', '化学', '生命科学', '医学', '计算机科学与技术', '电子信息', '机械与制造', '材料科学与工程', '能源动力', '航空航天', '环境与海洋', '交叉学科']],
      ['secondaryDiscipline', '二级学科', ['应用数学', '统计学', '运筹学与控制论', '量子物理与量子信息', '凝聚态物理', '光学工程', '材料化学', '合成化学', '能源化学', '合成生物学', '基因组学', '生物信息学', '精准医学', '生物医学工程', '医学人工智能', '人工智能', '机器学习', '计算机视觉', '数据科学', '量子计算', '集成电路', '智能传感', '智能制造', '机器人技术', '工业互联网', '新材料', '先进复合材料', '储能材料', '新能源', '智能电网', '氢能技术', '航空航天技术', '空天信息', '飞行器设计', '环境科学', '海洋技术', '碳中和技术', 'AI for Science', '具身智能', '大语言模型应用']],
      ['tertiaryDiscipline', '三级学科', ['自然语言处理', '智能体与生成式AI', '知识表示与推理', '深度学习', '强化学习', '联邦学习', '科学机器学习', '材料计算', '药物计算', '量子算法', '量子芯片', '量子测量', '基因线路设计', '细胞工厂', '生物制造', '固态电池材料', '电池电解质', '高比能正极材料']],
      ['quaternaryDiscipline', '四级学科', ['复杂场景表征学习', '神经网络训练优化', '模型压缩部署', '知识增强推理', '语言模型对齐', '多模态语义理解', '行业智能体编排', '多智能体协同', '可信生成与评测', '量子近似优化', '量子误差缓解', '量子机器学习', '细胞工厂构建', '基因线路调控', '生物元件标准化', '材料性质预测', '科学方程学习', '实验数据融合', '固态电解质界面', '锂金属负极保护', '高比能正极材料']],
    ],
  },
  {
    title: '学术成果',
    fields: [
      ['paperPeriod', '论文时间范围', ['近3年', '近5年', '近10年']],
      ['paperQuality', '高质量论文', ['Top期刊论文', '一区论文', '高被引论文', '热点论文']],
      ['authorRole', '论文作者角色', ['第一作者', '通讯作者', '共同第一/共同通讯']],
      ['academicImpact', '学术影响力', [], 'range'],
      ['patentCount', '专利数量', [], 'range'],
      ['paperCount', '论文数量', [], 'range'],
    ],
  },
  {
    title: '行业经验',
    fields: [
      ['industryYears', '相关行业技术经验', ['3—5年', '5—10年', '10年以上']],
      ['enterpriseRole', '企业技术任职', ['企业CTO', '首席科学家', '研发总监', '技术负责人', '首席工程师']],
    ],
  },
  {
    title: '科研项目参与情况',
    fields: [
      ['projectLevel', '项目级别', ['国家级重大/重点', '国家级一般', '省部级', '地市级', '行业或企业项目', '国际合作项目']],
      ['projectRole', '项目角色', ['项目负责人', '课题负责人', '子课题负责人', '任务负责人', '参与人']],
      ['projectTopic', '项目主题', ['与当前技术方向相关', '基础理论', '关键技术攻关', '工程应用验证']],
      ['projectStatus', '项目状态', ['在研', '已结题']],
      ['projectPeriod', '项目时间', ['近3年', '近5年', '近10年']],
      ['projectCount', '主持项目数量', ['1项', '2—3项', '4—5项', '5项以上']],
    ],
  },
  {
    title: '荣誉奖项',
    fields: [
      ['awardLevel', '科技奖励级别', ['国家级', '省部级', '行业协会级']],
      ['awardRank', '获奖等级', ['一等奖', '二等奖', '其他']],
      ['awardRole', '获奖角色', ['第一完成人', '主要完成人', '参与人']],
      ['awardPeriod', '获奖时间', ['近5年', '近10年']],
      ['talentPlan', '人才计划', ['国家级人才计划', '省部级人才计划', '青年人才计划']],
      ['academicTitle', '学术称号/人才标签', ['高被引学者', '青年学者', '学术带头人']],
    ],
  },
];

export const TOP_RECOMMENDED_SCHEMES = [
  {
    id: 'ai-frontier',
    name: '人工智能前沿研究人才',
    desc: '聚焦高质量论文与持续学术影响力',
    filters: { primaryDiscipline: '计算机科学与技术', paperQuality: '高被引论文', academicImpact: { min: '90', max: '' } },
  },
  {
    id: 'quantum-core',
    name: '量子计算关键技术专家',
    desc: '适用于量子算法与重点项目攻关',
    filters: { primaryDiscipline: '电子信息', secondaryDiscipline: '量子计算', tertiaryDiscipline: '量子算法', projectLevel: '国家级重大/重点', academicImpact: { min: '90', max: '' } },
  },
  {
    id: 'energy-storage',
    name: '先进储能材料转化人才',
    desc: '关注固态电池、专利积累与技术转化能力',
    filters: { primaryDiscipline: '材料科学与工程', secondaryDiscipline: '储能材料', tertiaryDiscipline: '固态电池材料', patentCount: { min: '20', max: '' } },
  },
];

/* 演示人才在 TOP100 各筛选维度上的属性映射。 */
export function top100PrimaryDiscipline(person) {
  const map = { 人工智能: '计算机科学与技术', 量子计算: '电子信息', 合成生物学: '生命科学', 'AI for Science': '交叉学科', 储能材料: '材料科学与工程' };
  return map[person.secondary] || '';
}

export function top100NumericMetric(person, key) {
  const impact = Number(person.impact);
  if (key === 'academicImpact') return impact;
  if (key === 'paperCount') return Math.round(impact * 1.8);
  if (key === 'patentCount') return person.outcome === '发明专利' ? Math.round(impact / 4) : Math.round(impact / 16);
  return 0;
}

export function top100MatchingAttrs(person) {
  return {
    primaryDiscipline: top100PrimaryDiscipline(person),
    secondaryDiscipline: person.secondary,
    tertiaryDiscipline: person.tertiary,
    quaternaryDiscipline: person.quaternary,
    paperPeriod: '近3年',
    projectLevel: person.project === '国家重点研发计划' ? '国家级重大/重点' : person.project === '国家自然科学基金' ? '国家级一般' : '行业或企业项目',
    projectRole: person.projectDetail.includes('课题负责人') ? '课题负责人' : person.projectDetail.includes('负责人') ? '项目负责人' : '参与人',
    projectTopic: person.tertiary,
    projectStatus: '在研',
    projectPeriod: '近3年',
    projectCount: Number(person.impact) >= 95 ? '4—5项' : Number(person.impact) >= 91 ? '2—3项' : '1项',
    paperQuality: person.outcome === '高被引论文' ? '高被引论文' : 'Top期刊论文',
    authorRole: person.projectDetail.includes('负责人') ? '通讯作者' : '第一作者',
    industryYears: person.institution === '华为技术' ? '10年以上' : '3—5年',
    enterpriseRole: person.institution === '华为技术' ? '首席科学家' : '',
    awardLevel: person.outcome === '国家级奖项' ? '国家级' : '省部级',
    awardRank: person.outcome === '国家级奖项' ? '一等奖' : '其他',
    awardRole: person.outcome === '国家级奖项' ? '主要完成人' : '参与人',
    awardPeriod: '近5年',
    talentPlan: Number(person.impact) >= 94 ? '国家级人才计划' : '青年人才计划',
    academicTitle: person.outcome === '高被引论文' ? '高被引学者' : person.type === '青年人才' ? '青年学者' : '学术带头人',
  };
}
