/**
 * 报告写作相关 mock 数据：洞察模板库、数据溯源行。
 * 迁移自原型引擎 INSIGHT_TEMPLATE_LIBRARY / SOURCE_TRACE_ROWS。
 */

export const INSIGHT_DEFAULT_TEMPLATE_ID = 'tech-monthly-default';

export const INSIGHT_TEMPLATE_LIBRARY = [
  {
    id: 'tech-monthly-default',
    title: '{{技术主题}}洞察月刊',
    desc: '系统内置默认洞察模板，围绕技术主题生成结构化月刊。',
    source: '系统内置',
    modules: ['技术概念', '研究趋势', '研究热点', '发文排行', '合作排行', '合作网络', '地区分布', '融合度分析']
  },
  {
    id: 'city-pilot-insight',
    title: '城市试点洞察模板',
    desc: '适用于城市排行、政策信号、场景变化和图表化洞察。',
    source: '用户端写作模板',
    modules: ['试点概况', '政策信号', '城市排行', '项目分布', '场景变化', '关键指标', '风险约束', '后续跟踪']
  },
  {
    id: 'consumer-trend-insight',
    title: '消费趋势洞察模板',
    desc: '适用于现象观察、人群行为、消费心理和机会判断。',
    source: '用户端写作模板',
    modules: ['现象描述', '人群分层', '消费动机', '渠道变化', '价格带变化', '品牌偏好', '机会判断', '行动建议']
  }
];

export function getInsightTemplateById(id) {
  return INSIGHT_TEMPLATE_LIBRARY.find(template => template.id === id) || INSIGHT_TEMPLATE_LIBRARY[0];
}

export function getActiveInsightTemplate(id) {
  return getInsightTemplateById(id || INSIGHT_DEFAULT_TEMPLATE_ID);
}

// 数据溯源 Modal 中的来源行（对应原型 [data-source-row]）
export const SOURCE_TRACE_ROWS = [
  {
    id: 'src-policy',
    name: '低空经济城市试点政策库',
    scope: '政策文件与城市试点项目',
    metrics: [
      ['试点城市数', '32', '个', '城市维度'],
      ['新增政策文件', '48', '份', '政策类型'],
      ['监管平台覆盖率', '76', '%', '城市层级']
    ]
  },
  {
    id: 'src-project',
    name: '城市产业项目与投融资数据集',
    scope: '项目备案、融资事件、企业主体',
    metrics: [
      ['示范航线', '148', '条', '项目类型'],
      ['公开融资事件', '19', '起', '融资轮次'],
      ['头部企业集中度', '41', '%', '企业维度']
    ]
  },
  {
    id: 'src-research',
    name: '技术论文与专利统计数据集',
    scope: '论文、专利、机构合作关系',
    metrics: [
      ['近三年论文量', '12,486', '篇', '年份/学科'],
      ['专利申请量', '8,742', '件', '申请人/地区'],
      ['跨机构合作边数', '326', '条', '合作网络']
    ]
  }
];

// 附件上传限制（对应原型 ATTACHMENT_UPLOAD_LIMIT）
export const ATTACHMENT_UPLOAD_LIMIT = 5;
export const ATTACHMENT_OVER_LIMIT_MESSAGE = '最多上传 5 个附件';
