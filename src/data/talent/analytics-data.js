/* 核心统计与可视化分析数据（原 talent-library-page.js 内置）。 */
import { people } from '../../hooks/talent-people';

export const analyticsKeywordsData = [
  { name: '人工智能', count: 345, size: 'large', color: '#1890ff', category: 'ai' },
  { name: '深度学习', count: 289, size: 'large', color: '#1890ff', category: 'ai' },
  { name: '量子计算', count: 156, size: 'medium', color: '#722ed1', category: 'quantum' },
  { name: '量子通信', count: 134, size: 'medium', color: '#722ed1', category: 'quantum' },
  { name: '自然语言处理', count: 223, size: 'medium', color: '#1890ff', category: 'ai' },
  { name: '生物信息', count: 198, size: 'medium', color: '#52c41a', category: 'bio' },
  { name: '基因组学', count: 167, size: 'medium', color: '#52c41a', category: 'bio' },
  { name: '计算机视觉', count: 245, size: 'large', color: '#1890ff', category: 'ai' },
  { name: '强化学习', count: 189, size: 'medium', color: '#1890ff', category: 'ai' },
  { name: '机器学习', count: 312, size: 'large', color: '#1890ff', category: 'ai' },
  { name: '医疗AI', count: 145, size: 'small', color: '#52c41a', category: 'bio' },
  { name: '量子密码', count: 123, size: 'small', color: '#722ed1', category: 'quantum' },
  { name: '材料科学', count: 178, size: 'medium', color: '#faad14', category: 'material' },
  { name: '纳米技术', count: 156, size: 'medium', color: '#faad14', category: 'material' },
  { name: '自动驾驶', count: 198, size: 'medium', color: '#1890ff', category: 'ai' },
  { name: '机器人', count: 167, size: 'medium', color: '#1890ff', category: 'ai' },
  { name: '大数据', count: 267, size: 'large', color: '#1890ff', category: 'ai' },
  { name: '云计算', count: 234, size: 'large', color: '#1890ff', category: 'ai' },
  { name: '5G通信', count: 145, size: 'small', color: '#ff4d4f', category: 'comm' },
  { name: '物联网', count: 134, size: 'small', color: '#ff4d4f', category: 'comm' },
];

export const analyticsRegionData = [
  { name: '北京', value: 456, color: '#1890ff' },
  { name: '上海', value: 289, color: '#52c41a' },
  { name: '广东', value: 234, color: '#faad14' },
  { name: '江苏', value: 156, color: '#ff4d4f' },
  { name: '浙江', value: 110, color: '#722ed1' },
];

export const analyticsInstitutionData = [
  { name: '科研院所', value: 45, color: '#1890ff', percentage: 52 },
  { name: '高等院校', value: 28, color: '#52c41a', percentage: 32 },
  { name: '企业', value: 14, color: '#faad14', percentage: 16 },
];

export const analyticsFieldData = [
  { name: '人工智能', value: 523, color: '#1890ff' },
  { name: '量子信息', value: 234, color: '#722ed1' },
  { name: '生物信息', value: 267, color: '#52c41a' },
  { name: '材料科学', value: 156, color: '#faad14' },
  { name: '通信工程', value: 65, color: '#ff4d4f' },
];

export const analyticsImpactData = [
  { name: '90-100分', value: 156, color: '#1890ff' },
  { name: '80-89分', value: 289, color: '#52c41a' },
  { name: '70-79分', value: 345, color: '#faad14' },
  { name: '60-69分', value: 234, color: '#ff4d4f' },
  { name: '60分以下', value: 221, color: '#722ed1' },
];

export const analyticsDetailData = {
  region: { title: '地域分布详情', icon: 'fa-map-marker-alt', data: analyticsRegionData, chartType: 'bar', summary: '人才主要集中在经济发达地区，北京占比最高达36.6%，上海和广东紧随其后。区域分布呈现“东多西少”的特点，与地区经济发展水平密切相关。' },
  institution: { title: '机构分布详情', icon: 'fa-university', data: analyticsInstitutionData, chartType: 'pie', summary: '科研院所占比最高达52%，说明高水平人才主要集中在国家级科研机构。高等院校占比32%，企业占比16%，产学研合作有待加强。' },
  field: { title: '研究领域详情', icon: 'fa-atom', data: analyticsFieldData, chartType: 'bar', summary: '人工智能是当前人才规模最大的研究领域，量子信息、生物信息和材料科学等方向形成多元布局。' },
  impact: { title: '学术影响力详情', icon: 'fa-chart-line', data: analyticsImpactData, chartType: 'bar', summary: '影响力得分90分以上人才占比12.5%，80分以上占比23.2%。整体学术影响力较高，但仍有提升空间，需要加强青年人才培养。' },
  paper: { title: '论文产出详情', icon: 'fa-file-alt', data: [{ name: '人工智能', value: 15234, color: '#1890ff' }, { name: '生物信息', value: 12567, color: '#52c41a' }, { name: '量子信息', value: 8234, color: '#722ed1' }, { name: '材料科学', value: 5678, color: '#faad14' }, { name: '通信工程', value: 4179, color: '#ff4d4f' }], chartType: 'bar', summary: '论文产出整体呈增长趋势，人工智能领域论文数量最多，占比33.2%。平均每人每年发表论文3.68篇，科研产出能力较强。' },
  patent: { title: '专利数量详情', icon: 'fa-lightbulb', data: [{ name: '人工智能', value: 5123, color: '#1890ff' }, { name: '量子信息', value: 2345, color: '#722ed1' }, { name: '材料科学', value: 2134, color: '#faad14' }, { name: '生物信息', value: 1456, color: '#52c41a' }, { name: '通信工程', value: 1398, color: '#ff4d4f' }], chartType: 'bar', summary: '专利数量增长显著，人工智能领域专利占比41.1%。平均每人拥有专利9.99件，技术创新能力突出。' },
  project: { title: '科研项目详情', icon: 'fa-flask', data: [{ name: '国家自然科学基金', value: 1234, color: '#1890ff' }, { name: '国家重点研发计划', value: 956, color: '#52c41a' }, { name: '973计划', value: 456, color: '#722ed1' }, { name: '863计划', value: 345, color: '#faad14' }, { name: '国家重大科技专项', value: 465, color: '#ff4d4f' }], chartType: 'bar', summary: '科研项目参与度高，国家级项目占比100%。平均每人参与项目2.77项，科研活跃度较高，承担重大科研任务能力强。' },
};

export const CHART_LABELS = {
  region: '地域分布',
  institution: '机构类型分布',
  field: '研究领域分布',
  impact: '学术影响力分布',
  paper: '论文产出分布',
  patent: '专利数量分布',
  project: '科研项目分布',
};

function analyticsTalentText(person) {
  return [person.name, person.institution, person.field, person.type, person.tertiary, person.secondary, person.project, person.projectDetail, person.outcome, person.outcomeDetail].join(' ');
}

const analyticsKeywordTalentIds = {
  人工智能: ['t1', 't2', 't3', 't6'], 深度学习: ['t1', 't6'], 量子计算: ['t4'], 量子通信: ['t4'],
  自然语言处理: ['t2'], 生物信息: ['t5'], 基因组学: ['t5'], 计算机视觉: ['t1', 't3'],
  强化学习: ['t1'], 机器学习: ['t1', 't6'], 医疗AI: ['t5'], 量子密码: ['t4'],
  材料科学: ['t7'], 纳米技术: ['t7'], 自动驾驶: ['t3'], 机器人: ['t3'],
  大数据: ['t6'], 云计算: ['t3'], '5G通信': ['t3'], 物联网: ['t3'],
};

export function analyticsKeywordTalentList(keyword) {
  const list = people.value;
  const ids = analyticsKeywordTalentIds[keyword] || [];
  const matched = list.filter((person) => ids.includes(person.id) || analyticsTalentText(person).includes(keyword));
  return matched.length ? matched : list.slice(0, 3);
}

export function analyticsChartTalentList(type, name) {
  const list = people.value;
  const fieldMap = { 人工智能: '人工智能', 量子信息: '量子计算', 生物信息: '生物技术', 材料科学: '新材料', 通信工程: '通信工程' };
  let matched = [];
  if (type === 'region') {
    const institutionMap = { 北京: ['中国科学院', '清华大学', '北京大学'], 上海: ['上海交通大学', '复旦大学'], 广东: ['华为技术'], 江苏: ['南京大学', '东南大学'], 浙江: ['浙江大学'] };
    const institutions = institutionMap[name] || [];
    matched = list.filter((person) => person.region === name || institutions.some((institution) => person.institution.includes(institution)));
  } else if (type === 'institution') {
    matched = list.filter((person) => (name === '科研院所' ? person.institution.includes('中国科学院') : name === '高等院校' ? person.institution.includes('大学') : ['华为技术', '百度', '阿里巴巴'].some((institution) => person.institution.includes(institution))));
  } else if (type === 'field' || type === 'paper' || type === 'patent') {
    matched = list.filter((person) => person.field === (fieldMap[name] || name) || person.secondary === name || person.tertiary === name);
  } else if (type === 'impact') {
    const score = Number(name === '60分以下' ? 59 : name.slice(0, 2));
    const min = name === '60分以下' ? 0 : score;
    const max = name === '90-100分' ? 100 : name === '80-89分' ? 89.99 : name === '70-79分' ? 79.99 : name === '60-69分' ? 69.99 : 59.99;
    matched = list.filter((person) => Number(person.impact) >= min && Number(person.impact) <= max);
  } else if (type === 'project') {
    matched = list.filter((person) => person.project.includes(name) || (person.projectDetail || '').includes(name));
  }
  return matched.length ? matched : list.slice(0, 3);
}
