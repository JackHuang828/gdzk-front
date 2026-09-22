/**
 * 首页（home）卡片数据。
 * 数据来源：静态原型 d:\byu\ai\zwrite-vue\src\sections\_views.html 第 3-175 行（#home 视图片段）。
 * 行为蓝本：d:\byu\ai\zwrite-vue\src\engine\engine.js
 *   - enhanceHomeShowcaseCards（326-388 行）：运行时重构卡片——
 *     原 .tag-list 替换为 .creative-meta（home-hot-badge 徽章 + 2 个 meta-tag），
 *     .text-action 移入 .creative-hover-panel，面板内含「摘要：desc」。
 *     badge：hotTitles 6 张为「浏览最多」(views)，其余为「评分最高」(rating)。
 * 纯数据模块，不含任何 DOM/组件逻辑；字符串均为纯中文文案，不含 HTML 标签。
 */

// 首页行业筛选 tab（对应 #homeIndustryTabs 的 data-home-industry 按钮，装饰性高亮）
export const HOME_INDUSTRIES = [
  { key: 'all', label: '全部' },
  { key: 'ai', label: '人工智能' },
  { key: 'newenergy', label: '新能源' },
  { key: 'lowalt', label: '低空经济' },
  { key: 'semi', label: '半导体' },
  { key: 'bio', label: '生物医药' },
  { key: 'quantum', label: '量子计算' },
  { key: 'robot', label: '具身智能' },
  { key: 'saas', label: 'SaaS' }
];

// 模板选择下拉（首页 prompt-box 内 data-template-menu-option）
export const HOME_TEMPLATE_OPTIONS = [
  { label: '不使用模板', form: 'customForm' },
  { label: '产业研究报告模板', form: 'researchForm' },
  { label: '城市试点洞察模板', form: 'insightTask' },
  { label: '招商策略咨询模板', form: 'strategyForm' },
  { label: '政策解读与建议模板', form: 'researchForm' }
];

/**
 * 展示卡通用结构：
 * thumb        缩略图修饰类（ai/market/policy/tech/invest/energy）
 * reportType   卡片报告类型文案（研究报告/洞察报告/战略咨询报告）
 * reportMod    report-type 修饰类（'' / 'insight' / 'strategy'）
 * fields       卡面字段行 [标签, 值]
 * tags         标签（运行时渲染为 meta-tag，取前 2 个）
 * badge        运行时徽章：'views' 浏览最多 / 'rating' 评分最高
 * action       操作文案（查看 / 下载 | 查看详情 / 下载）
 * target       原型 data-view（组件层按引擎规则二次映射路由）
 * desc         hover 面板摘要（enhanceHomeShowcaseCards 注入）
 */

// 「创作案例」面板卡片（data-home-source-panel="creation"，共 12 张，按 HTML 顺序）
export const HOME_CREATION_CARDS = [
  {
    industry: 'ai', thumb: 'ai', reportType: '研究报告', reportMod: '',
    title: '2024人工智能产业全景研究报告',
    fields: [['作者版本', '产业研究组 · V1.3 · 评分96'], ['发布数据', '2026-05-18 · 浏览2341 · 下载320'], ['标签/关键词', 'AI产业链、企业图谱、投资趋势']],
    tags: ['AI硬件', '产业链'], badge: 'views', action: '查看 / 下载', target: 'strategyDetail',
    desc: '梳理AI硬件、产业链和企业图谱，快速形成可复用的行业研究样张。'
  },
  {
    industry: 'newenergy', thumb: 'market', reportType: '洞察报告', reportMod: 'insight',
    title: '新能源汽车市场消费趋势深度洞察',
    fields: [['状态', '已发布'], ['更新时间', '2026-05-12'], ['内容简介', '新能源汽车消费决策正在从单一价格敏感转向续航、补能体验和智能配置的综合权衡。']],
    tags: ['新能源', '消费洞察'], badge: 'views', action: '查看 / 下载', target: 'strategyDetail',
    desc: '聚焦补能体验、价格带和智能配置变化，呈现消费决策的新拐点。'
  },
  {
    industry: 'semi', thumb: 'policy', reportType: '战略咨询报告', reportMod: 'strategy',
    title: '半导体产业链竞争格局分析',
    fields: [['版本状态', 'V2.1 · 已脱敏 · 可共享'], ['数据来源', '研究报告18篇 + 洞察报告6期 + 专家意见9条'], ['核心建议', '设备补链、材料协同、应用生态建设与招商路径']],
    tags: ['半导体', '竞争格局'], badge: 'views', action: '查看 / 下载', target: 'strategyDetail',
    desc: '围绕设备、材料和应用生态拆解竞争格局，沉淀招商与补链路径。'
  },
  {
    industry: 'ai', thumb: 'tech', reportType: '研究报告', reportMod: '',
    title: '大模型技术演进与商业落地趋势',
    fields: [['作者版本', '技术趋势组 · V1.8 · 评分87'], ['发布数据', '2026-05-09 · 浏览4567 · 下载512'], ['标签/关键词', '模型能力、成本下降、商业场景']],
    tags: ['大模型', '技术趋势'], badge: 'views', action: '查看 / 下载', target: 'strategyDetail',
    desc: '从模型能力、成本变化和应用场景判断商业化落地节奏。'
  },
  {
    industry: 'bio', thumb: 'invest', reportType: '研究报告', reportMod: '',
    title: '生物医药行业投资价值评估',
    fields: [['作者版本', '投资评估组 · V1.0 · 评分83'], ['发布数据', '2026-04-28 · 浏览1290 · 下载168'], ['标签/关键词', '研发管线、资本事件、估值区间']],
    tags: ['生物医药', '投资评估'], badge: 'views', action: '查看 / 下载', target: 'strategyDetail',
    desc: '结合研发管线、资本事件与估值区间，辅助识别高潜项目。'
  },
  {
    industry: 'saas', thumb: 'energy', reportType: '战略咨询报告', reportMod: 'strategy',
    title: '企业数字化转型战略规划方案',
    fields: [['版本状态', 'V1.6 · 已发布 · 机构内可见'], ['数据来源', '研究报告12篇 + 专家意见5条 + 内部素材3份'], ['核心建议', '业务架构重构、数据治理机制与分阶段实施路线']],
    tags: ['市场分析', '战略规划'], badge: 'views', action: '查看 / 下载', target: 'strategyDetail',
    desc: '将业务架构、数据治理和实施路线压缩成可执行的战略方案。'
  },
  {
    industry: 'newenergy', thumb: 'policy', reportType: '研究报告', reportMod: '',
    title: '碳中和政策深度解读与影响分析',
    fields: [['作者版本', '政策解读组 · V1.2 · 评分86'], ['发布数据', '2026-04-18 · 浏览1678 · 下载204'], ['标签/关键词', '政策窗口、行业影响、风险约束']],
    tags: ['政策解读', '影响分析'], badge: 'rating', action: '查看 / 下载', target: 'strategyDetail',
    desc: '追踪政策窗口和行业影响，形成风险约束与行动建议。'
  },
  {
    industry: 'saas', thumb: 'market', reportType: '研究报告', reportMod: '',
    title: '全球SaaS市场增长与竞争分析',
    fields: [['作者版本', '市场分析组 · V1.5 · 评分80'], ['发布数据', '2026-04-11 · 浏览2045 · 下载188'], ['标签/关键词', '增长率、竞争格局、客户分层']],
    tags: ['SaaS', '市场分析'], badge: 'rating', action: '查看 / 下载', target: 'strategyDetail',
    desc: '围绕增长率、竞争格局和客户分层，判断企业服务市场机会。'
  },
  {
    industry: 'lowalt', thumb: 'market', reportType: '洞察报告', reportMod: 'insight',
    title: '低空经济试点城市洞察月刊',
    fields: [['状态', '已发布'], ['更新时间', '2026-05-18'], ['内容简介', '低空经济试点正在从政策发布转向城市运营能力验证，航线、场站和监管平台成为落地重点。']],
    tags: ['低空经济', '城市治理'], badge: 'rating', action: '查看详情 / 下载', target: 'insightDetail',
    desc: '跟踪低空试点、城市治理和基础设施协同，形成月度洞察入口。'
  },
  {
    industry: 'quantum', thumb: 'policy', reportType: '战略咨询报告', reportMod: 'strategy',
    title: '量子计算产业链招商策略',
    fields: [['版本状态', 'V2.1 · 已脱敏 · 可共享'], ['数据来源', '研究报告18篇 + 洞察报告6期 + 专家意见9条'], ['核心建议', '基础研究投入、工程平台、示范应用与招商路径']],
    tags: ['量子计算', '招商策略'], badge: 'rating', action: '查看 / 下载', target: 'strategyDetail',
    desc: '聚焦基础研究、工程平台和示范应用，梳理产业链招商抓手。'
  },
  {
    industry: 'robot', thumb: 'tech', reportType: '研究报告', reportMod: '',
    title: '具身智能产业生态图谱',
    fields: [['作者版本', '产业研究组 · V1.4 · 评分92'], ['发布数据', '2026-03-26 · 浏览1872 · 下载226'], ['标签/关键词', '机器人、传感器、场景落地']],
    tags: ['具身智能', '产业生态'], badge: 'rating', action: '查看 / 下载', target: 'strategyDetail',
    desc: '梳理机器人本体、核心零部件和应用场景，判断产业生态成熟度。'
  },
  {
    industry: 'lowalt', thumb: 'invest', reportType: '战略咨询报告', reportMod: 'strategy',
    title: '低空物流商业化路径',
    fields: [['版本状态', 'V1.2 · 已发布 · 可共享'], ['数据来源', '研究报告10篇 + 政策文件8份 + 专家意见4条'], ['核心建议', '试点航线、场站协同、投融资组合方案']],
    tags: ['低空物流', '投融资'], badge: 'rating', action: '查看 / 下载', target: 'strategyDetail',
    desc: '围绕航线试点、场站协同和投融资组合，形成可落地的商业化方案。'
  }
];

// 「研报库」面板卡片（data-home-source-panel="library"，共 6 张，按 HTML 顺序）
export const HOME_LIBRARY_CARDS = [
  {
    industry: 'ai', thumb: 'ai', reportType: '研究报告', reportMod: '',
    title: '中国人工智能产业年度报告',
    fields: [['发布机构', '国家产业智库'], ['更新时间', '2026-05-20'], ['内容范围', 'AI产业、企业图谱、技术趋势']],
    tags: ['人工智能', '产业链'], badge: 'rating', action: '查看 / 下载', target: 'researchDetail',
    desc: '官方研报沉淀AI产业全景、企业图谱和技术趋势，可加入知识库引用。'
  },
  {
    industry: 'ai', thumb: 'tech', reportType: '研究报告', reportMod: '',
    title: '全球大模型技术商业化白皮书',
    fields: [['发布机构', '前沿技术研究院'], ['更新时间', '2026-05-15'], ['内容范围', '大模型、技术趋势、商业化案例']],
    tags: ['大模型', '技术趋势'], badge: 'rating', action: '查看 / 下载', target: 'researchDetail',
    desc: '覆盖模型能力、成本变化和商业化案例，适合生成前置研判。'
  },
  {
    industry: 'newenergy', thumb: 'energy', reportType: '研究报告', reportMod: '',
    title: '新能源汽车消费市场年度追踪',
    fields: [['发布机构', '消费产业研究中心'], ['更新时间', '2026-05-10'], ['内容范围', '新能源、消费市场、城市排行']],
    tags: ['新能源', '市场分析'], badge: 'rating', action: '查看 / 下载', target: 'researchDetail',
    desc: '持续跟踪新能源消费市场、城市排行和价格带变化。'
  },
  {
    industry: 'robot', thumb: 'invest', reportType: '研究报告', reportMod: '',
    title: '先进制造投资机会与风险评估',
    fields: [['发布机构', '产业投资研究中心'], ['更新时间', '2026-05-08'], ['内容范围', '投资机会、风险评估、阶段建议']],
    tags: ['先进制造', '投资评估'], badge: 'rating', action: '查看 / 下载', target: 'researchDetail',
    desc: '汇总先进制造投资机会、风险评估和阶段性策略建议。'
  },
  {
    industry: 'lowalt', thumb: 'energy', reportType: '洞察报告', reportMod: 'insight',
    title: '低空经济政策环境洞察月报',
    fields: [['状态', '已发布'], ['更新时间', '2026-05-15'], ['内容简介', '低空经济政策进入密集试点期，城市治理规则与基础设施建设节奏决定产业承接能力。']],
    tags: ['低空经济', '政策追踪'], badge: 'rating', action: '查看详情 / 下载', target: 'insightDetail',
    desc: '跟踪低空经济政策密集落地，识别城市治理与航线规划机会。'
  },
  {
    industry: 'quantum', thumb: 'tech', reportType: '研究报告', reportMod: '',
    title: '量子计算技术路线年度报告',
    fields: [['发布机构', '前沿计算实验室'], ['更新时间', '2026-04-26'], ['内容范围', '量子计算、技术路线、产业链']],
    tags: ['量子计算', '技术路线'], badge: 'rating', action: '查看 / 下载', target: 'researchDetail',
    desc: '覆盖量子计算技术路线、应用生态和产业链协同方向。'
  }
];

// 「我的报告」迷你卡片（.mini-report-grid，共 4 张，按 HTML 顺序）
// statusClass: done=已完成（●）/ running=生成中（⌁）；fields 为三行 muted 文案。
export const HOME_MY_REPORTS = [
  {
    target: 'strategyDetail', reportType: '研究报告', reportMod: '', statusClass: 'done',
    title: '2024年人工智能行业深度研究报告',
    fields: [['作者版本', 'ZWrite智能写作 · V1.3 · 评分96'], ['发布数据', '2026-06-01 · 浏览2341 · 下载320'], ['标签/关键词', 'AI产业链、企业图谱']]
  },
  {
    target: 'strategyDetail', reportType: '洞察报告', reportMod: 'insight', statusClass: 'running',
    title: '新能源汽车消费趋势洞察',
    fields: [['状态', '生成中 · 生成趋势图表'], ['更新时间', '2026-06-05'], ['内容简介', '消费偏好与区域分布']]
  },
  {
    target: 'strategyDetail', reportType: '战略咨询报告', reportMod: 'strategy', statusClass: 'done',
    title: '企业数字化转型战略咨询',
    fields: [['版本状态', 'V1.6 · 已发布 · 机构内可见'], ['数据来源', '研究报告12篇 + 专家意见5条'], ['核心建议', '业务架构与数据治理']]
  },
  {
    target: 'strategyDetail', reportType: '研究报告', reportMod: '', statusClass: 'done',
    title: '生物医药产业链全景分析',
    fields: [['作者版本', 'ZWrite智能写作 · V1.0 · 评分89'], ['发布数据', '2026-05-30 · 浏览1290 · 下载168'], ['标签/关键词', '研发管线、区域集群']]
  }
];
