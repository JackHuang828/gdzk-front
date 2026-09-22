/**
 * 案例广场（caseLibrary）卡片数据。
 * 数据来源：静态原型 d:\byu\ai\zwrite-vue\src\sections\_views.html
 *   - research 面板：第 1325-1393 行（静态 9 张卡）
 *   - strategy 面板：第 1395-1480 行（静态 8 张卡）
 *   - insight 面板：第 1482-1601 行（静态 6 张卡）
 *   - custom 面板：第 1603-1658 行（静态 9 张卡）
 *   - 旧版 caseLibraryLegacy：第 1662-1737 行（仅用于补全个别缺失字段）
 * 行为蓝本：d:\byu\ai\zwrite-vue\src\engine\engine.js
 *   - ensureNineCaseCards（1354-1378 行）：运行时为 strategy 补 1 张、insight 补 3 张卡，
 *     本文件已将补卡并入对应数组（strategy 第 9 张、insight 第 7-9 张）。
 *   - enhanceStrategyCardSummaries / getStrategySummaryForCard（185-225 行）：
 *     战略卡摘要 summary 按其 summaryRules 规则逐字生成。
 *   - extractStrategyInvestment（1529-1533 行）：投资额从「关键指标」文本提取
 *     （匹配 投资额/投资金额/总投资/基金规模 + 数字 + 亿）。
 *   - standardizeInsightSummaries（253-324 行）：洞察卡期号 issue 取自其 issueMap；
 *     注意该函数运行时还会改写「内容简介」文案，本文件保留静态 HTML 原文。
 *   - standardizeResearchVersionCards / enhanceCaseResearchCards（390-503 行）：
 *     运行时会把研究卡作者替换为固定 9 人列表、评分换算为 5 分制等，本文件保留静态原值。
 * 纯数据模块，不含任何 DOM/组件逻辑；字符串均为纯中文文案，不含 HTML 标签。
 */

import { insightMetricSeed } from './metrics.js';

// 研究面板行业 tab 与 metrics.js 的 insightMetricSeed 键完全一致（均 16 项、顺序一致），直接复用
export { insightMetricSeed as RESEARCH_INDUSTRY_SEED };
export const RESEARCH_INDUSTRIES = Object.keys(insightMetricSeed);

// 各面板分页区「共 N 项」
export const CASE_TOTALS = {
  research: 96,
  strategy: 128,
  insight: 64,
  custom: 36
};

// strategy 面板「热门行业」chip 列表（HTML 第 1415-1423 行，共 9 项）
export const STRATEGY_INDUSTRIES = [
  '全部',
  '人工智能',
  '新能源',
  '低空经济',
  '半导体',
  '生物医药',
  '量子计算',
  '具身智能',
  'SaaS'
];

// 案例广场页面标题与副标题（engine.setCaseType 的 pageTitles / pageSubtitles；
// 仅 custom 面板有副标题，其余面板运行时副标题为空）
export const CASE_PAGE_META = {
  research: { title: '研究报告', subtitle: '' },
  strategy: { title: '战略咨询报告', subtitle: '' },
  insight: { title: '洞察报告', subtitle: '' },
  custom: { title: '研报库', subtitle: '外部采购的权威信源，构筑专业报告写作底座。' }
};

// 研究报告面板卡片（共 9 张，按 HTML 顺序）
// authorVersion ← 作者版本；publishData ← 发布数据；keywords ← 标签/关键词；tags ← .tag-list .tag
// target 保留原型 data-view 原值（原型中研究卡均跳转 strategyDetail）。
export const RESEARCH_CASES = [
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '低空经济政策环境研究',
    authorVersion: '用户创作 · V1.2 · 评分96',
    publishData: '2026-05-18 · 浏览1260 · 下载320',
    keywords: '低空经济、政策试点、城市治理',
    tags: ['政策研究', '低空经济']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: 'V2G产业政策建议报告',
    authorVersion: '能源组 · V1.4 · 评分91',
    publishData: '2026-05-16 · 浏览1418 · 下载286',
    keywords: 'V2G、电网互动、政策建议',
    tags: ['V2G', '电网']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '量子计算产业链研究',
    authorVersion: '前沿技术组 · V2.1 · 评分88',
    publishData: '2026-05-14 · 浏览1320 · 下载141',
    keywords: '量子计算、设备材料、应用生态',
    tags: ['量子计算', '产业链']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '无人机物流商业化路径',
    authorVersion: '交通组 · V2.0 · 评分84',
    publishData: '2026-05-11 · 浏览860 · 下载114',
    keywords: '无人机、商业模式、投融资',
    tags: ['无人机', '商业化']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '具身智能产业链研究',
    authorVersion: 'AI组 · V1.1 · 评分82',
    publishData: '2026-05-09 · 浏览1120 · 下载206',
    keywords: '机器人、AI硬件、场景落地',
    tags: ['机器人', 'AI硬件']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '未来产业区域差异化布局',
    authorVersion: '宏观研究 · V1.7 · 评分79',
    publishData: '2026-05-06 · 浏览980 · 下载152',
    keywords: '城市画像、产业政策、招商方向',
    tags: ['产业政策', '区域布局']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '低空基础设施建设白皮书',
    authorVersion: '技术组 · V1.0 · 评分78',
    publishData: '2026-05-02 · 浏览760 · 下载118',
    keywords: '通信导航、基础设施、标准建设',
    tags: ['通信导航', '基础设施']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: 'AI硬件产业发展情报报告',
    authorVersion: '产业研究组 · V1.3 · 评分76',
    publishData: '2026-04-28 · 浏览1024 · 下载196',
    keywords: 'AI硬件、企业图谱、投融资',
    tags: ['AI硬件', '产业链']
  },
  {
    reportType: '研究报告',
    target: 'strategyDetail',
    title: '新能源产业政策地图',
    authorVersion: '宏观研究 · V1.5 · 评分74',
    publishData: '2026-04-20 · 浏览1186 · 下载244',
    keywords: '新能源、政策地图、城市机会',
    tags: ['新能源', '政策地图']
  }
];

// 战略咨询报告面板卡片（共 9 张：HTML 静态 8 张 + engine.ensureNineCaseCards 补 1 张，按追加顺序）
// agency   ← 委托机构
// publishData ← 项目日期（战略卡无「发布数据」字段，取卡片日期）
// keywords ← 关键指标（战略卡无「标签/关键词」字段，保留关键指标原文）
// investment ← 按 engine.extractStrategyInvestment 规则从关键指标提取的投资额
// summary  ← engine.getStrategySummaryForCard 规则生成（规则未命中时按其兜底模板生成）
// TODO: 战略卡静态 HTML 与 engine 均无「作者版本」字段，authorVersion 暂置空字符串。
export const STRATEGY_CASES = [
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '低空经济监管平台建设',
    authorVersion: '',
    publishData: '2026-05-18',
    keywords: '投资额12.8亿 · ROI21% · 满意度98',
    tags: ['低空经济', '战略规划', '监管平台'],
    agency: '深圳市发改委',
    investment: '12.8亿',
    summary: '围绕低空经济监管与城市级运行平台建设，梳理试点场景、数据接入和分阶段落地路径。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: 'V2G产业化示范路径',
    authorVersion: '',
    publishData: '2026-05-16',
    keywords: '投资额9.6亿 · ROI18% · 满意度97',
    tags: ['V2G', '招商策略', '电网'],
    agency: '能源集团',
    investment: '9.6亿',
    summary: '聚焦车网互动产业化示范，评估基础设施投入、运营机制和规模化推广的关键约束。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '量子计算招商策略',
    authorVersion: '',
    publishData: '2026-05-14',
    keywords: '招商目标28家 · 基金规模8.2亿 · 满意度96',
    tags: ['量子计算', '招商策略', '产业链'],
    agency: '前沿技术局',
    investment: '8.2亿',
    summary: '面向量子计算产业链招商，拆解核心器件、应用场景、基金配置和目标企业引育策略。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '具身智能产业生态建设',
    authorVersion: '',
    publishData: '2026-05-09',
    keywords: '应用场景12个 · ROI17% · 满意度95',
    tags: ['机器人', '产业生态', '组织协同'],
    agency: '科创集团',
    // 新静态卡关键指标中无投资额（engine 提取结果为 0）；此值取自旧版 caseLibraryLegacy 同名卡（投资额6.4亿）
    investment: '6.4亿',
    summary: '围绕机器人与产业生态主题，结合应用场景12个 · ROI17% · 满意度95形成可执行的战略建议和实施路径。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '低空物流商业化路径',
    authorVersion: '',
    publishData: '2026-05-02',
    keywords: '试点航线6条 · 投资额5.9亿 · ROI16%',
    tags: ['低空物流', '投资评估', '商业化'],
    agency: '交通集团',
    investment: '5.9亿',
    summary: '面向交通运输与低空物流商业化，评估航线、场站、投融资组合和运营闭环。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '新能源材料区域布局',
    authorVersion: '',
    publishData: '2026-04-28',
    keywords: '目标企业32家 · 投资额4.8亿 · 满意度93',
    tags: ['新能源', '招商策略', '材料'],
    agency: '产业园区',
    investment: '4.8亿',
    summary: '围绕新能源材料产业布局，提炼区域机会、招商方向和重点企业协同路径。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '智能网联汽车政策试点',
    authorVersion: '',
    publishData: '2026-04-20',
    keywords: '示范区3个 · 政策工具14项 · 满意度92',
    tags: ['智能汽车', '政策建议', '试点'],
    agency: '工信部门',
    // TODO: 关键指标中无投资额/基金规模，旧版 legacy 亦无此卡，engine 提取结果为 0，暂置 null
    investment: null,
    summary: '围绕智能汽车与政策建议主题，结合示范区3个 · 政策工具14项 · 满意度92形成可执行的战略建议和实施路径。'
  },
  {
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: 'AI算力基础设施评估',
    authorVersion: '',
    publishData: '2026-04-12',
    keywords: '投资额3.2亿 · 风险项8个 · 满意度91',
    tags: ['AI算力', '投资评估', '基础设施'],
    agency: '数据集团',
    investment: '3.2亿',
    summary: '聚焦人工智能与算力基础设施，分析项目导入、投资评估和产业承载条件。'
  },
  {
    // 本卡由 engine.ensureNineCaseCards 动态补入（HTML 静态稿中不存在）
    reportType: '战略咨询报告',
    target: 'strategyDetail',
    title: '产业园区低碳转型路径',
    authorVersion: '',
    publishData: '2026-04-08',
    keywords: '改造园区5个 · 节能率18% · 满意度90',
    tags: ['产业政策', '低碳转型'],
    agency: '城市更新集团',
    // TODO: 补卡关键指标中无投资额，engine 提取结果为 0，暂置 null
    investment: null,
    summary: '聚焦区域产业政策和园区转型，输出差异化布局、低碳改造和招商承载建议。'
  }
];

// 洞察报告面板卡片（共 9 张：HTML 静态 6 张 + engine.ensureNineCaseCards 补 3 张，按追加顺序）
// status ← 状态；updateTime ← 更新时间；summary ← 内容简介（静态原文）；
// issue ← 期号，取自 engine.standardizeInsightSummaries 的 issueMap（运行时以徽章形式注入）。
// 注意：engine 运行时会用其 summaries 映射改写「内容简介」，如需与引擎完全一致可另行映射。
export const INSIGHT_CASES = [
  {
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '低空经济洞察月刊',
    status: '已发布',
    updateTime: '2026-05-18',
    issue: '第9期',
    summary: '低空经济正由政策试点转向城市级场景验证，基础设施与运营规范成为落地关键。',
    tags: ['低空经济', '趋势图表']
  },
  {
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '深圳20+8产业月度洞察',
    status: '已发布',
    updateTime: '2026-05-16',
    issue: '第12期',
    summary: '深圳重点产业集群延续分化增长，半导体与智能网联汽车的项目活跃度领先。',
    tags: ['深圳20+8', '月度洞察']
  },
  {
    reportType: '洞察报告',
    target: 'insightDetail',
    title: 'V2G试点城市趋势跟踪',
    status: '已发布',
    updateTime: '2026-05-14',
    issue: '第6期',
    summary: 'V2G试点进入规模验证阶段，电价机制和车网协同能力决定城市推广速度。',
    tags: ['V2G', '指标对比']
  },
  {
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '人工智能硬件洞察月刊',
    status: '已发布',
    updateTime: '2026-05-12',
    issue: '第11期',
    summary: 'AI硬件创新重心向端侧算力迁移，专利和资本正在向核心器件加速集中。',
    tags: ['AI硬件', '企业图谱']
  },
  {
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '新材料产业链月度洞察',
    status: '已发布',
    updateTime: '2026-05-09',
    issue: '第8期',
    summary: '新材料产业的高端供给缺口仍然突出，政策与专利热点正共同推动国产替代。',
    tags: ['新材料', '专利热点']
  },
  {
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '生物医药创新趋势月刊',
    status: '已发布',
    updateTime: '2026-05-06',
    issue: '第7期',
    summary: '创新药研发资源进一步向优势区域集中，资本更关注临床价值明确的成熟管线。',
    tags: ['生物医药', '创新趋势']
  },
  {
    // 本卡由 engine.ensureNineCaseCards 动态补入（HTML 静态稿中不存在）
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '量子计算投资情绪周报',
    status: '已发布',
    updateTime: '2026-05-20',
    issue: '第4期',
    summary: '量子计算投资情绪升温，专利变化与机构关注度提示早期布局机会。',
    tags: ['量子计算', '投资情绪']
  },
  {
    // 本卡由 engine.ensureNineCaseCards 动态补入（HTML 静态稿中不存在）
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '计算机行业需求侧洞察',
    status: '已发布',
    updateTime: '2026-05-17',
    issue: '第5期',
    summary: '计算机行业采购预算更偏向安全、算力和业务系统升级，需求结构出现分化。',
    tags: ['计算机', '需求洞察']
  },
  {
    // 本卡由 engine.ensureNineCaseCards 动态补入（HTML 静态稿中不存在）
    reportType: '洞察报告',
    target: 'insightDetail',
    title: '食品饮料消费偏好月报',
    status: '已发布',
    updateTime: '2026-05-10',
    issue: '第10期',
    summary: '食品饮料消费偏好向健康化、场景化和价格带重构迁移，年轻客群驱动渠道变化。',
    tags: ['食品饮料', '消费洞察']
  }
];

// 研报库（custom）面板卡片（共 9 张，按 HTML 顺序）
// publisher ← 发布机构；updateTime ← 更新时间；scope ← 内容范围
export const CUSTOM_CASES = [
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '中国人工智能产业年度报告',
    publisher: '麦肯锡咨询',
    updateTime: '2026-05-28',
    scope: '产业链图谱、技术趋势、投融资变化',
    tags: ['人工智能', '产业链']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '全球大模型技术商业化白皮书',
    publisher: 'Gartner',
    updateTime: '2026-05-24',
    scope: '模型能力、成本变化、场景落地',
    tags: ['大模型', '技术趋势']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '新能源汽车消费市场年度追踪',
    publisher: '中信证券',
    updateTime: '2026-05-20',
    scope: '消费偏好、价格带、区域分布',
    tags: ['新能源', '消费洞察']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '低空经济政策环境年度报告',
    publisher: '德勤咨询',
    updateTime: '2026-05-18',
    scope: '政策试点、城市治理、低空物流',
    tags: ['低空经济', '政策']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '量子计算技术路线年度报告',
    publisher: 'IDC',
    updateTime: '2026-05-16',
    scope: '技术路线、应用生态、招商路径',
    tags: ['量子计算', '技术路线']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '半导体产业投资趋势白皮书',
    publisher: '华泰证券研究所',
    updateTime: '2026-05-12',
    scope: '资本事件、产能布局、政策影响',
    tags: ['半导体', '投资趋势']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '生物医药创新管线年度报告',
    publisher: 'IQVIA',
    updateTime: '2026-05-09',
    scope: '研发管线、临床进展、资本事件',
    tags: ['生物医药', '创新管线']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: '具身智能产业生态图谱',
    publisher: '赛迪顾问',
    updateTime: '2026-05-06',
    scope: '核心零部件、场景落地、企业图谱',
    tags: ['具身智能', '产业生态']
  },
  {
    reportType: '研报库',
    target: 'researchDetail',
    title: 'SaaS市场增长与竞争报告',
    publisher: '艾瑞咨询',
    updateTime: '2026-05-01',
    scope: '市场规模、竞争格局、客户分层',
    tags: ['SaaS', '市场分析']
  }
];

// 各面板分页页数（research 4 页 / strategy 5 页 / insight 3 页 / custom 3 页）
export const CASE_PAGE_COUNTS = {
  research: 4,
  strategy: 5,
  insight: 3,
  custom: 3
};

// 洞察面板指标初始静态值（HTML 第 1487-1490 行，div 不可点击；行业 tab 点击后被 getInsightMetricData 覆盖为可点按钮）
export const INSIGHT_STATIC_METRICS = [
  { label: '技术总数', value: '126' },
  { label: '投资增长', value: '+18%' },
  { label: '新增专利', value: '342' },
  { label: '推送覆盖', value: '8.6k' }
];

/**
 * 复刻 engine.enhanceCaseResearchCards（451-503 行）：研究面板卡片运行时被改写为
 * case-research-card 结构（作者/版本/认证徽章/标签/页脚日期·浏览·下载·评分）。
 * 返回改写后的展示模型；评分换算、认证判定与引擎逐字一致。
 */
export function buildResearchCardModel(card, index) {
  const rawAuthor = card.authorVersion || '';
  const author = /评分|V\d/i.test(rawAuthor) ? rawAuthor.split('·')[0].trim() : rawAuthor.trim() || '产业研究组';
  const version = rawAuthor.match(/V\d+(?:\.\d+)?/i)?.[0] || `V1.${index % 5}`;
  const date = card.publishData.match(/20\d{2}-\d{2}-\d{2}/)?.[0] || '2026-05-18';
  const views = card.publishData.match(/浏览\s*([\d,]+)/)?.[1] || String(1200 + index * 145);
  const downloads = card.publishData.match(/下载\s*([\d,]+)/)?.[1] || String(180 + index * 28);
  const rawScore =
    card.publishData.match(/(?:用户)?评分\s*([\d.]+)/)?.[1] ||
    rawAuthor.match(/评分\s*([\d.]+)/)?.[1] ||
    String(4.5 + (index % 5) * 0.2);
  const numericScore = Number(rawScore);
  const score = Number.isFinite(numericScore)
    ? (numericScore > 10 ? (numericScore / 20).toFixed(1) : numericScore.toFixed(1))
    : '4.8';
  const tags = [...new Set(card.tags.filter(Boolean))].slice(0, 2);
  const secondTag = tags[1] || (card.title.includes('政策') ? '趋势图表' : '技术评估');
  const isUser = /用户/.test(author) || index % 3 === 1;
  return {
    title: card.title,
    author,
    version,
    cert: isUser ? '认证用户' : '',
    firstTag: tags[0] || '产业研究',
    secondTag,
    date,
    views,
    downloads,
    score,
    tags
  };
}

const INDUSTRY_PATTERNS = {
  '人工智能': /人工智能|AI|大模型|算力|机器人|具身智能|智能硬件/i,
  '新能源': /新能源|碳中和|储能|材料|电池/i,
  '低空经济': /低空|无人机|通航/i,
  '量子计算': /量子/i,
  '电力设备': /V2G|电网|电力设备|电力/i,
  '产业政策': /政策|城市治理|政策研究|区域布局|招商|战略|监管|试点|商业化|产业生态|组织协同/i,
  '通信及通信设备': /通信|导航|基础设施/i,
  '交通运输': /交通|物流/i,
  '房地产': /房地产/i,
  '国防军工': /国防|军工/i,
  '机械设备': /机械|设备|机器人/i,
  '食品饮料': /食品|饮料/i,
  '非银金融': /金融|券商|投融资|投资|投资评估/i,
  '计算机': /计算机|软件|SaaS/i,
  '其他': /其他|综合|自由/i
};

/** 复刻 engine.cardMatchesIndustry（1436-1456 行）：卡片全文含行业名或命中行业正则 */
export function cardMatchesIndustry(text, industry) {
  return text.includes(industry) || !!INDUSTRY_PATTERNS[industry]?.test(text);
}

const TAG_INDUSTRY_RULES = [
  ['人工智能', /人工智能|AI|大模型|算力|智能硬件|具身智能/i],
  ['新能源', /新能源|储能|电池|材料|碳中和/i],
  ['低空经济', /低空|无人机|通航/i],
  ['量子计算', /量子/i],
  ['电力设备', /V2G|电网|电力|电力设备/i],
  ['产业政策', /招商|战略|监管|政策|试点|区域|产业生态|组织协同|商业化/i],
  ['通信及通信设备', /通信|导航|基础设施/i],
  ['交通运输', /交通|物流/i],
  ['房地产', /房地产|园区|城市更新/i],
  ['国防军工', /国防|军工|安全通信/i],
  ['机械设备', /机械|设备|机器人|高端装备|工业控制/i],
  ['食品饮料', /食品|饮料|健康消费/i],
  ['非银金融', /金融|券商|投融资|投资|投资评估|风险管理/i],
  ['计算机', /计算机|软件|SaaS|安全软件|算力平台/i]
];

/** 复刻 engine.resolveFixedIndustryFromTag（1414-1434 行）：标签文本映射到标准行业 */
export function resolveIndustryFromTag(tagText = '') {
  const exact = Object.keys(INDUSTRY_PATTERNS).find(industry => industry !== '全部' && tagText.includes(industry));
  if (exact) return exact;
  return TAG_INDUSTRY_RULES.find(([, pattern]) => pattern.test(tagText))?.[0] || '其他';
}

/**
 * 复刻 engine.ensureCaseListRows（3288-3312 行）：列表视图单元格模型。
 * 返回 { title, tags, type, keyData, coreContent }；研究卡传入 enhance 后的 researchModel。
 */
export function buildCaseListRow(card, panelType, researchModel) {
  const typeByPanel = { research: '研究报告', strategy: '战略咨询报告', insight: '洞察报告', custom: '研报库' };
  const type = card.reportType || typeByPanel[panelType] || '报告';
  const tags = [...new Set((researchModel ? researchModel.tags : card.tags) || [])].slice(0, 3);
  let keyData = '';
  let coreContent = '';
  if (panelType === 'strategy') {
    keyData = [`委托机构：${card.agency}`, card.keywords, `日期：${card.publishData}`].filter(Boolean).join('；');
    coreContent = tags.length ? `关联标签：${tags.join('、')}` : '报告核心内容摘要待完善。';
  } else if (panelType === 'research') {
    const meta = `${researchModel.author}${researchModel.version}${researchModel.cert}`;
    const foot = `□ ${researchModel.date} · ⊙ ${researchModel.views} · ⇩ ${researchModel.downloads} · ★ ${researchModel.score}`;
    keyData = [meta, foot].filter(Boolean).join('；');
    coreContent = tags.length ? `关联标签：${tags.join('、')}` : '报告核心内容摘要待完善。';
  } else if (panelType === 'insight') {
    keyData = [card.status, card.updateTime && `更新：${card.updateTime}`].filter(Boolean).join('；');
    coreContent = card.summary;
  } else {
    keyData = [card.publisher, card.updateTime].filter(Boolean).join('；');
    coreContent = card.scope;
  }
  return { title: card.title, tags, type, keyData, coreContent };
}
