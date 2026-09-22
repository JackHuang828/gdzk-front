/**
 * 我的素材库（知识库 / 模板库 / 自定义模板 / 知识库合集）mock 数据。
 *
 * 来源：
 * - 原型 HTML：zwrite-vue/src/sections/_views.html
 *   · uploadKnowledge 视图（第 2260-2375 行）：知识库 tab 的 doc-card 合集卡、
 *     模板库 tab 的 template-card 卡片、行业筛选 chips、创建知识库按钮。
 *   · customTemplatePage（第 2376-2492 行）：自定义模板表单与生成的大纲结构。
 *   · knowledgeFolderDetail（第 2495-2566 行）：合集详情头部与合集内 6 个文件卡。
 * - 原型引擎：zwrite-vue/src/engine/engine.js（第 1635-1837 行）
 *   · templateFormForType / templateTypeFromForm：类型 ↔ 表单映射。
 *   · getTemplateCardData：各报告类型的大纲文案（TEMPLATE_OUTLINES）。
 *   · hydrateOfficialTemplates：运行时注入的 12 张官方模板卡（TEMPLATE_CARDS 以此为准）。
 *   · appendPersonalTemplate：新增个人模板的默认结构（PERSONAL_TEMPLATE_SEED）。
 *   · applyKnowledgeFilters / bindKnowledgeFolderControls：合集内标签 / 创建者 / 关键词筛选逻辑。
 *
 * 说明：字符串均为纯文案，不含 HTML 标签；界面固定前缀（如“简介：”“创建于 ”）
 * 在注释中标注，由组件渲染时拼接。
 */

/* ================= 知识库 tab：合集 / 素材卡片 ================= */

/**
 * 知识库 tab 下的 doc-card 卡片。
 * 原型 grid-3 中共有 3 张卡，全部为知识库合集卡（isPack = true）；
 * 原型中没有 isPack = false 的单文件素材卡（单文件仅出现在合集详情内，见 FOLDER_FILES）。
 * 卡片原型无标签数据，tags 均为空数组。
 * meta.createdAt 为日期；界面渲染前缀为“创建于 ”（原文案如“创建于 2026-05-18”）。
 * desc 界面渲染前缀为“简介：”。
 */
export const KNOWLEDGE_PACKS = [
  {
    id: 'pack-ai-hardware',
    name: '深圳AI硬件产业研究资料包',
    desc: '包含研究报告、专家观点、政策文件和企业图谱。',
    meta: { createdAt: '2026-05-18', dateLabel: '创建于 2026-05-18' },
    tags: [],
    isPack: true
  },
  {
    id: 'pack-low-altitude-economy',
    name: '低空经济政策与试点合集',
    desc: '归集政策文件、城市试点、监管平台资料和应用场景案例。',
    meta: { createdAt: '2026-05-12', dateLabel: '创建于 2026-05-12' },
    tags: [],
    isPack: true
  },
  {
    id: 'pack-new-energy-overseas',
    name: '新能源出海专家访谈纪要',
    desc: '沉淀专家访谈、市场简报、区域政策和企业出海材料。',
    meta: { createdAt: '2026-04-28', dateLabel: '创建于 2026-04-28' },
    tags: [],
    isPack: true
  }
];

/* ================= 知识库合集详情：头部信息 ================= */

/**
 * knowledgeFolderDetail 头部可见信息。
 * 合集详情页头部仅有标题与“上传文件”按钮，描述/创建日期取自知识库 tab 同名合集卡；
 * 头部原型无标签展示（tags 为空）。
 */
export const FOLDER_INFO = {
  name: '深圳AI硬件产业研究资料包',
  desc: '包含研究报告、专家观点、政策文件和企业图谱。',
  createdAt: '2026-05-18',
  tags: [],
  breadcrumb: ['我的素材库', '知识库', '深圳AI硬件产业研究资料包'],
  uploadButtonLabel: '上传文件',
  fileCount: 6
};

/* ================= 知识库合集详情：合集内 6 个文件 ================= */

/**
 * 合集内文件卡（knowledge-file-card）。
 * 原型卡片只展示：文件名、解析状态、时间、操作（查看详情 / 下载 / 删除），
 * 未展示文件类型与文件大小，故 type / size 置 null。
 * meta.statusTone 对应原型状态样式：''（默认，解析完成）/ 'warning'（解析中）/ 'danger'（解析失败）。
 * meta.tags 为 data-tags 原始值（英文，用于筛选）；meta.owner 为 data-owner 值（mine / others）。
 */
// TODO: 原型未给出文件类型（PDF/Word 等）与文件大小，type / size 待后端或后续设计补全。
export const FOLDER_FILES = [
  {
    id: 'folder-file-1',
    name: '2026年AI硬件产业链深度研究报告',
    type: null,
    size: null,
    meta: {
      status: '解析完成',
      statusTone: 'done',
      updatedAt: '2026-05-18 16:40',
      tags: ['research', 'ai', 'chain'],
      owner: 'mine',
      actions: ['查看详情', '下载', '删除']
    }
  },
  {
    id: 'folder-file-2',
    name: 'AI硬件关键芯片专家访谈纪要',
    type: null,
    size: null,
    meta: {
      status: '解析完成',
      statusTone: 'done',
      updatedAt: '2026-05-11 10:25',
      tags: ['insight', 'ai', 'chip'],
      owner: 'mine',
      actions: ['查看详情', '下载', '删除']
    }
  },
  {
    id: 'folder-file-3',
    name: '智能终端产业扶持政策汇编',
    type: null,
    size: null,
    meta: {
      status: '解析中',
      statusTone: 'warning',
      updatedAt: '2026-04-30 14:08',
      tags: ['strategy', 'ai', 'investment'],
      owner: 'others',
      actions: ['查看详情', '下载', '删除']
    }
  },
  {
    id: 'folder-file-4',
    name: 'AI硬件核心企业图谱',
    type: null,
    size: null,
    meta: {
      status: '解析完成',
      statusTone: 'done',
      updatedAt: '2026-04-22 09:36',
      tags: ['research', 'ai', 'chain'],
      owner: 'others',
      actions: ['查看详情', '下载', '删除']
    }
  },
  {
    id: 'folder-file-5',
    name: 'AI硬件投融资事件数据表',
    type: null,
    size: null,
    meta: {
      status: '解析失败',
      statusTone: 'danger',
      updatedAt: '2026-04-16 18:12',
      tags: ['other', 'ai', 'investment'],
      owner: 'mine',
      actions: ['查看详情', '下载', '删除']
    }
  },
  {
    id: 'folder-file-6',
    name: '内部研讨会纪要：产业链机会判断',
    type: null,
    size: null,
    meta: {
      status: '解析失败',
      statusTone: 'danger',
      updatedAt: '2026-04-02 11:50',
      tags: ['other', 'ai', 'chain'],
      owner: 'others',
      actions: ['查看详情', '下载', '删除']
    }
  }
];

/* ================= 模板库 tab：模板卡片 ================= */

/**
 * 模板库 template-card 数组。
 * 注意：HTML 中静态写有 3 张卡，但引擎 hydrateOfficialTemplates()（engine.js 1765-1797）
 * 在初始化时会用以下 12 张官方模板整体替换模板网格，故本数组以引擎注入数据为准。
 * 静态 HTML 与引擎数据的差异：
 * - HTML“战略咨询招商模板”在引擎中为“招商策略咨询模板”（描述相同）；
 * - HTML“政策解读与建议模板”（战略咨询报告）不在引擎 12 张官方模板内，属静态占位，不收录；
 * - HTML“产业研究报告模板”与引擎第 1 张完全一致。
 * templateForm 由 templateFormForType(type) 得出：
 *   研究报告→researchForm，洞察报告→insightTask，战略咨询报告→strategyForm，其它→customForm。
 * 模板卡原型无标签数据，tags 均为空数组（筛选走 templateType，见 KNOWLEDGE_FILTERS.templateTypes）。
 * 每张卡操作区文案为“预览 / 使用模板 / 删除”。
 */
export const TEMPLATE_CARDS = [
  {
    id: 'tpl-industry-research',
    templateType: '研究报告',
    templateForm: 'researchForm',
    title: '产业研究报告模板',
    desc: '适用于产业链梳理、市场空间测算、竞争格局与趋势研判。',
    tags: []
  },
  {
    id: 'tpl-tech-roadmap',
    templateType: '研究报告',
    templateForm: 'researchForm',
    title: '技术路线研究模板',
    desc: '适用于技术成熟度、专利趋势、平台能力和应用场景分析。',
    tags: []
  },
  {
    id: 'tpl-investment-value',
    templateType: '研究报告',
    templateForm: 'researchForm',
    title: '投资价值研究模板',
    desc: '适用于行业估值、融资事件、重点企业和风险区间分析。',
    tags: []
  },
  {
    id: 'tpl-consumer-insight',
    templateType: '洞察报告',
    templateForm: 'insightTask',
    title: '消费趋势洞察模板',
    desc: '适用于现象观察、人群行为、消费心理和机会判断。',
    tags: []
  },
  {
    id: 'tpl-city-pilot-insight',
    templateType: '洞察报告',
    templateForm: 'insightTask',
    title: '城市试点洞察模板',
    desc: '适用于城市排行、政策信号、场景变化和图表化洞察。',
    tags: []
  },
  {
    id: 'tpl-monthly-insight',
    templateType: '洞察报告',
    templateForm: 'insightTask',
    title: '月刊专题洞察模板',
    desc: '适用于固定周期的行业指标跟踪、热点复盘和订阅推送。',
    tags: []
  },
  {
    id: 'tpl-investment-consulting',
    templateType: '战略咨询报告',
    templateForm: 'strategyForm',
    title: '招商策略咨询模板',
    desc: '围绕产业机会、目标企业、园区承载、政策工具和实施路线生成咨询报告。',
    tags: []
  },
  {
    id: 'tpl-transformation-consulting',
    templateType: '战略咨询报告',
    templateForm: 'strategyForm',
    title: '转型战略咨询模板',
    desc: '适用于企业数字化转型、组织调整、业务升级和行动路线。',
    tags: []
  },
  {
    id: 'tpl-park-planning',
    templateType: '战略咨询报告',
    templateForm: 'strategyForm',
    title: '园区规划咨询模板',
    desc: '适用于产业园定位、项目导入、配套政策和实施路径。',
    tags: []
  },
  {
    id: 'tpl-free-outline',
    templateType: '其它',
    templateForm: 'customForm',
    title: '自由大纲写作模板',
    desc: '适用于开放主题的长文、材料汇编、观点文章和专项说明。',
    tags: []
  },
  {
    id: 'tpl-meeting-minutes',
    templateType: '其它',
    templateForm: 'customForm',
    title: '会议纪要整理模板',
    desc: '适用于会议记录、访谈纪要、行动项归纳和后续任务拆解。',
    tags: []
  },
  {
    id: 'tpl-material-compilation',
    templateType: '其它',
    templateForm: 'customForm',
    title: '综合材料汇编模板',
    desc: '适用于多来源素材整合、背景说明、事实梳理和汇报材料生成。',
    tags: []
  }
];

/* ================= 各报告类型的模板大纲（引擎 getTemplateCardData） ================= */

/**
 * 按报告类型的大纲数据，逐字照抄 engine.js getTemplateCardData 中的 outlines（1662-1687 行）。
 * 结构：[章节标题, 章节说明]。
 * 模板详情弹窗（renderTemplateDetail）与“使用模板”均按卡片 templateType 取对应数组；
 * 找不到时回退到“其它”。
 */
export const TEMPLATE_OUTLINES = {
  '研究报告': [
    ['一、研究对象与核心问题', '明确技术领域、研究范围、时间跨度和核心判断口径。'],
    ['二、产业结构与技术路线', '梳理产业链、关键技术、重点企业和发展阶段。'],
    ['三、市场数据与趋势判断', '测算市场空间、投资热度、专利变化和风险因素。'],
    ['四、结论与后续观察', '形成研究结论、专家意见和可持续跟踪指标。']
  ],
  '洞察报告': [
    ['一、洞察主题与现象描述', '明确观察对象、时间范围、指标口径和趋势信号。'],
    ['二、数据概览与图表分析', '展示趋势图、分布图和关键指标变化。'],
    ['三、热点变化与机会判断', '分析政策、资本、用户或城市试点变化带来的机会。'],
    ['四、订阅推送与持续跟踪', '定义后续自动生成、周期推送和更新提醒逻辑。']
  ],
  '战略咨询报告': [
    ['一、项目背景与战略问题', '明确委托主体、目标、关键约束和需要解决的问题。'],
    ['二、数据来源与关键指标', '汇总研报、洞察、专家意见和项目量化指标。'],
    ['三、核心建议与实施路径', '输出核心建议、路径拆解、阶段目标和预期效果。'],
    ['四、风险控制与落地计划', '识别风险、资源需求、组织协同和行动排期。']
  ],
  '其它': [
    ['一、写作目标与内容边界', '根据用户自由描述确定文章主题、读者对象和输出形态。'],
    ['二、资料归纳与结构拆解', '组织素材、引用来源、关键事实和可编辑大纲。'],
    ['三、正文生成与观点表达', '按章节展开论证、案例、数据和结论。'],
    ['四、总结与后续补充', '生成总结、附录、引用来源和可继续编辑的内容。']
  ]
};

/* ================= 个人模板：新增默认结构（appendPersonalTemplate） ================= */

/**
 * 在自定义模板页保存后，appendPersonalTemplate（engine.js 1810-1836 行）
 * 会向模板库网格顶部插入一张个人模板卡，其默认值如下：
 * - title：取页面“模板标题”输入框，为空时兜底“我的自定义模板”；
 * - templateForm：取页面选中的类型按钮 data-template-form，未取到时兜底 'customForm'；
 * - templateType：由 templateTypeFromForm(form) 得出，customForm → “其它”；
 * - desc：取“适用行业场景与模板简述”输入框，为空时兜底下方默认文案；
 * - 大纲来源：个人模板本身不携带大纲，预览 / 详情时按 templateType 取 TEMPLATE_OUTLINES；
 * - 卡内操作项为“预览 / 使用模板 / 删除”（个人模板渲染为 action-chip 样式）。
 */
export const PERSONAL_TEMPLATE_SEED = {
  title: '我的自定义模板',
  templateType: '其它',
  templateForm: 'customForm',
  desc: '由用户自定义创建，可继续编辑大纲、章节结构和适用行业场景。',
  outlineSource: 'TEMPLATE_OUTLINES[templateType]',
  actions: ['预览', '使用模板', '删除']
};

/**
 * 附加：自定义模板页（customTemplatePage）原型内的示例草稿与生成大纲。
 * 来源：_views.html 2391-2490 行。原型默认选中“研究报告”（researchForm），
 * 点击“生成模板”后展示的大纲含 标题 / 摘要 / 正文（含子项）/ 结论 块。
 * outline 中 badge 原文案带折叠箭头“摘要⌄”“结论⌄”（⌄ 为界面符号），这里存纯文案，
 * collapsible 标记该块在原型中可折叠。
 */
export const CUSTOM_TEMPLATE_DRAFT = {
  title: '区域产业发展深度分析模板',
  templateType: '研究报告',
  templateForm: 'researchForm',
  writingRequirement: '适用于区域产业研究、招商研判和政策建议场景，围绕产业基础、竞争格局、机会判断和实施路径形成结构化报告。',
  sceneDesc: '适用于产业链梳理、市场空间测算、竞争格局、区域招商和趋势研判。系统将根据用户输入生成摘要、正文章节、结论与引用附录。',
  referenceUpload: {
    label: '上传参考文档（选填）',
    dropzoneText: '拖拽或点击上传参考文档',
    rules: ['格式限制：Word（.doc / .docx）或 TXT（.txt）', '大小限制：单文件不超过 50MB'],
    accept: ['.doc', '.docx', '.txt']
  },
  generateButtonText: '生成模板',
  saveButtonText: '保存至模板库',
  addSectionText: '＋ 添加一级标题',
  outline: [
    {
      kind: 'title',
      badge: '标题',
      title: '区域产业发展深度分析模板'
    },
    {
      kind: 'summary',
      badge: '摘要',
      collapsible: true,
      title: '摘要',
      desc: '概述研究对象、分析范围、核心结论和关键建议，为报告提供快速阅读入口。'
    },
    {
      kind: 'section',
      badge: '正文',
      title: '一、产业基础与发展环境',
      desc: '梳理产业基础、政策环境、市场规模和需要回答的核心问题。',
      subItems: [
        { title: '产业基础', desc: '结合知识库素材识别产业链关键环节、资源条件与能力短板。' },
        { title: '政策与市场环境', desc: '分析政策信号、市场变化及其对产业发展的影响。' }
      ]
    },
    {
      kind: 'section',
      badge: '正文',
      title: '二、竞争格局与机会研判',
      desc: '比较重点企业、区域载体和技术路径，判断差异化机会与风险。',
      subItems: [
        { title: '竞争格局', desc: '呈现主要参与者、竞争要素和市场结构变化。' },
        { title: '机会研判', desc: '提炼未来增长空间、落地场景和关键行动方向。' }
      ]
    },
    {
      kind: 'conclusion',
      badge: '结论',
      collapsible: true,
      title: '总结',
      desc: '归纳核心判断、行动建议和后续跟踪指标。'
    }
  ]
};

/* ================= 素材库筛选控件 ================= */

/**
 * 素材库相关筛选 / 搜索控件选项。
 * - templateTypes：模板库 tab 行业筛选 chips（industry-tabs，“全部”为默认选中），
 *   点击后按模板卡 data-template-type 过滤（bindTemplateFilters）。
 * - templateSearchPlaceholder / folderSearchPlaceholder：两个搜索框的占位文案。
 * - fileTags：合集内文件 data-tags 出现过的全部标签值（applyKnowledgeFilters 按此筛选）。
 *   其中 research / insight / strategy / other 为资料类别，ai / chain / chip / investment 为内容标签；
 *   原型合集详情为 single 布局、未渲染标签筛选按钮，故标签的中文显示名缺失。
 * - owners：合集内文件 data-owner 取值（mine / others），引擎以“创建者：{label}”形式展示；
 *   原型中没有创建者下拉菜单的静态 HTML，选项中文文案缺失。
 */
// TODO: 合集详情的标签筛选按钮与创建者下拉在原型 HTML 中无静态结构（引擎仅有绑定逻辑），
//       fileTags 的中文标签名、owners 的中文选项文案待设计补全。
export const KNOWLEDGE_FILTERS = {
  templateTypes: ['全部', '研究报告', '洞察报告', '战略咨询报告', '其它'],
  templateSearchPlaceholder: '搜索模板名称、行业、场景',
  folderSearchPlaceholder: '搜索文件标题、全文关键词',
  fileTags: ['research', 'insight', 'strategy', 'other', 'ai', 'chain', 'chip', 'investment'],
  owners: [
    { value: 'mine', label: null },
    { value: 'others', label: null }
  ]
};

/* ================= 附加：知识库容量与页面文案 ================= */

/**
 * 知识库 tab 工具栏的容量条可见信息（_views.html 2272-2277 行）。
 */
export const KNOWLEDGE_CAPACITY = {
  label: '知识库容量',
  total: '1 GB',
  usedLabel: '已用',
  used: '610 MB',
  upgradeText: '扩容'
};

/**
 * 素材库两个 tab 的标题与说明文案（_views.html 2269-2270、2311-2312 行）。
 */
export const KNOWLEDGE_PAGE_COPY = {
  knowledgeTab: {
    title: '知识库文件夹',
    desc: '按资料包管理研究报告、专家观点、政策文件和项目成果，进入文件夹后可继续按标签筛选。',
    createButtonText: '创建知识库'
  },
  templatesTab: {
    title: '写作模板',
    desc: '模板用于定义报告大纲、分析框架、章节参数和输出格式，可复制系统模板后保存为个人模板。',
    customButtonText: '自定义模板'
  }
};
