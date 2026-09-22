/**
 * 「我的报告任务」页面 mock 数据。
 *
 * 来源：
 *  - 任务卡：zwrite-vue/src/sections/_views.html 中 #documents 视图的 .report-task-card
 *    （原型实际只渲染了 7 张，按 HTML 顺序转录，中文逐字照抄）。
 *  - 任务状态筛选：zwrite-vue/src/engine/engine.js 中 setTaskFilter() 的 labels
 *    （all/done/running/draft）。
 *  - 发布审批状态机：engine.js 中 getApprovalState() / preparePublishRequest() /
 *    updateApprovalFlow()，以及 zwrite-vue/src/sections/_modal.html 中
 *    #publishRequestForm（申请发布表单）与 #approvalProgress（审批流程弹窗）。
 *
 * TODO（与任务说明不符之处，按原型实际内容转录）：
 *  1. 任务说明预估约 31 张任务卡，但原型 #documents 中仅有 7 张 .report-task-card
 *     （分页栏写「共 28 项 / 4 页」，其余页码为纯静态 mock，无对应 DOM 或数据），
 *     故 DOCUMENT_TASKS 实际为 7 项，未凭空补造。
 *  2. 任务卡中没有作者信息，author 暂统一为空字符串；原型版本记录里出现的
 *     「Lianzhihui」是当前登录用户名，不是卡片作者。
 *  3. running / draft 状态的卡片没有 data-publish-request 发布按钮，actionLabel 为 null；
 *     其全部操作按钮文案见 fields.actions。
 *  4. 7 张卡片中未出现「自定义报告」类型，reportType 实际只有 研究报告 / 战略咨询报告 / 洞察报告。
 */

/** 任务状态筛选项（对应原型 data-task-filter 按钮与 setTaskFilter 的 labels） */
export const TASK_STATUS_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'done', label: '已完成' },
  { key: 'running', label: '生成中' },
  { key: 'draft', label: '未生成' }
];

/**
 * 报告任务卡列表（按原型 HTML 顺序）。
 * 字段说明：
 *  - id：task-1 起顺序编号。
 *  - title：报告名称（卡片 strong 文案）。
 *  - reportType：报告类型（.report-type 文案：研究报告 / 战略咨询报告 / 洞察报告）。
 *  - status：任务状态，取自 data-task-status：done 已完成 / running 生成中 / draft 未生成。
 *  - author：作者（原型卡片无此字段，暂为空串，见文件顶部 TODO）。
 *  - date：更新时间（.task-time 文案）。
 *  - fields.tags：卡片标签（.tag-list .tag 文案）。
 *  - fields.publishState：发布审批状态，取自 data-publish-state：
 *      none 未申请 / reviewing 审核中 / passed 审批通过 / rejected 审批失败。
 *  - fields.publishStatusText：「发布审核」列可见文案（.publish-status 文案）。
 *  - fields.actions：卡片全部操作按钮文案（.action-chip，按顺序）。
 *  - fields.anomaly：是否带 data-validation-case="anomaly"（数据校验异常样例卡）。
 *  - actionLabel：发布按钮文案（data-publish-request 所在 action-chip）：
 *      '申请发布' 或 '查看申请'；无发布按钮的卡片为 null。
 */
export const DOCUMENT_TASKS = [
  {
    id: 'task-1',
    title: '量子计算产业链招商策略',
    reportType: '战略咨询报告',
    status: 'running',
    author: '',
    date: '2026-06-09 15:42',
    fields: {
      tags: ['量子计算', '招商策略'],
      publishState: 'none',
      publishStatusText: '未申请',
      actions: ['查看进度', '暂停生成'],
      anomaly: false
    },
    actionLabel: null
  },
  {
    id: 'task-2',
    title: '新能源汽车消费趋势洞察',
    reportType: '洞察报告',
    status: 'running',
    author: '',
    date: '2026-06-09 14:08',
    fields: {
      tags: ['新能源', '消费洞察'],
      publishState: 'none',
      publishStatusText: '未申请',
      actions: ['查看进度', '暂停生成'],
      anomaly: true
    },
    actionLabel: null
  },
  {
    id: 'task-3',
    title: '2024年人工智能行业深度研究报告',
    reportType: '研究报告',
    status: 'done',
    author: '',
    date: '2026-06-08 16:20',
    fields: {
      tags: ['AI硬件', '产业链'],
      publishState: 'reviewing',
      publishStatusText: '审核中',
      actions: ['查看详情', '下载', '查看申请'],
      anomaly: false
    },
    actionLabel: '查看申请'
  },
  {
    id: 'task-4',
    title: '新能源汽车渠道下沉战略方案',
    reportType: '战略咨询报告',
    status: 'done',
    author: '',
    date: '2026-06-06 10:35',
    fields: {
      tags: ['新能源汽车', '渠道策略'],
      publishState: 'none',
      publishStatusText: '未申请',
      actions: ['查看详情', '下载', '申请发布'],
      anomaly: false
    },
    actionLabel: '申请发布'
  },
  {
    id: 'task-5',
    title: '低空经济监管平台建设方案',
    reportType: '战略咨询报告',
    status: 'draft',
    author: '',
    date: '2026-06-04 09:12',
    fields: {
      tags: ['低空经济', '监管平台'],
      publishState: 'none',
      publishStatusText: '未申请',
      actions: ['继续编辑', '删除'],
      anomaly: false
    },
    actionLabel: null
  },
  {
    id: 'task-6',
    title: '生物医药产业链全景分析',
    reportType: '研究报告',
    status: 'done',
    author: '',
    date: '2026-05-30 17:26',
    fields: {
      tags: ['生物医药', '产业链'],
      publishState: 'passed',
      publishStatusText: '审批通过',
      actions: ['查看详情', '下载', '查看申请'],
      anomaly: false
    },
    actionLabel: '查看申请'
  },
  {
    id: 'task-7',
    title: '低空经济试点城市洞察月刊',
    reportType: '洞察报告',
    status: 'done',
    author: '',
    date: '2026-05-18 11:40',
    fields: {
      tags: ['低空经济', '趋势图表'],
      publishState: 'rejected',
      publishStatusText: '审批失败',
      actions: ['查看详情', '下载', '查看申请'],
      anomaly: true
    },
    actionLabel: '查看申请'
  }
];

/**
 * 发布审批 mock 种子数据。
 * 对应原型审批状态机：none（未申请）→ reviewing（审核中）→ passed（通过）/ rejected（驳回）；
 * reviewing 可 revoke 为 revoked（已取消），rejected 可重新申请回到申请表单。
 */
export const APPROVAL_SEED = {
  /**
   * 审批流程三个节点（审批流程弹窗 .approval-node，节点顺序：提交申请 → 审批中 → 结果）。
   * time 为原型弹窗中的默认展示时间。
   */
  nodes: [
    { key: 'submit', label: '提交申请', time: '2026-06-08 09:20' },
    { key: 'review', label: '审批中', time: '2026-06-08 10:05' },
    { key: 'outcome', label: '等待结果', time: '--' }
  ],

  /**
   * 各审批状态下的界面表现（对应 updateApprovalFlow 的 statusMap 及结果节点文案）。
   * - cardStatusText：任务卡「发布审核」列文案（提交/取消申请时由引擎改写）。
   * - flowTitle：审批弹窗当前状态标题（approvalCurrentStatus）。
   * - activeNode：当前高亮的流程节点 key。
   * - outcomeTitle / outcomeTime / outcomeReasonLead / outcomeReasonDetail：
   *   结果节点的标题、结果时间、结论文案；驳回时原型为两行（原 <br> 拆为两个字段，不含 HTML）。
   * - canRevoke：是否显示「取消申请」按钮（仅审核中可取消）。
   * - canReapply：是否显示「重新申请」按钮（仅驳回后可重新申请）。
   * - requestButtonText：任务卡上发布按钮（data-publish-request）的文案。
   */
  states: {
    none: {
      cardStatusText: '未申请',
      flowTitle: '未提交申请',
      activeNode: 'submit',
      outcomeTitle: '等待结果',
      outcomeTime: '--',
      outcomeReasonLead: '',
      outcomeReasonDetail: '',
      canRevoke: false,
      canReapply: false,
      requestButtonText: '申请发布'
    },
    reviewing: {
      cardStatusText: '审核中',
      flowTitle: '审批中',
      activeNode: 'review',
      outcomeTitle: '等待结果',
      outcomeTime: '--',
      outcomeReasonLead: '',
      outcomeReasonDetail: '',
      canRevoke: true,
      canReapply: false,
      requestButtonText: '查看申请'
    },
    passed: {
      cardStatusText: '审批通过',
      flowTitle: '审批通过',
      activeNode: 'outcome',
      outcomeTitle: '审批通过',
      outcomeTime: '2026-06-08 15:30',
      outcomeReasonLead: '报告已进入案例广场',
      outcomeReasonDetail: '',
      canRevoke: false,
      canReapply: false,
      requestButtonText: '查看申请'
    },
    rejected: {
      cardStatusText: '审批失败',
      flowTitle: '审批失败',
      activeNode: 'outcome',
      outcomeTitle: '审批失败',
      outcomeTime: '2026-06-08 14:42',
      outcomeReasonLead: '报告需修改后重新提交',
      outcomeReasonDetail: '失败原因：报告摘要缺少数据来源说明',
      canRevoke: false,
      canReapply: true,
      requestButtonText: '查看申请'
    },
    revoked: {
      cardStatusText: '已取消',
      flowTitle: '已取消申请',
      activeNode: 'submit',
      outcomeTitle: '等待结果',
      outcomeTime: '--',
      outcomeReasonLead: '',
      outcomeReasonDetail: '',
      canRevoke: false,
      canReapply: false,
      requestButtonText: '申请发布'
    }
  },

  /**
   * 「申请发布为官方报告」表单默认值（对应 #publishRequestForm 与 preparePublishRequest）。
   * 报告名称/发布类型由所点击任务卡带入，以下为弹窗内置兜底与其他字段默认文案。
   */
  requestForm: {
    modalTitle: '申请发布为官方报告',
    defaultReportTitle: '2024年人工智能行业深度研究报告',
    fallbackReportTitle: '待发布报告',
    defaultReportType: '研究报告',
    /** 系统识别标签（只读字段内置文案） */
    systemTags: '人工智能 / AI硬件 / 产业链 / 投资趋势',
    /** 发布摘要输入框内置文案 */
    defaultSummary: '用于案例广场卡片展示：梳理AI硬件产业链、企业图谱、投资趋势及重点机会，已完成引用溯源。',
    /** 脱敏要求复选项 */
    desensitizeOptions: ['数字（除了时间）', '手机号', '关键词'],
    /** 脱敏关键词输入框占位提示 */
    desensitizePlaceholder: '请输入需要脱敏的关键词，多个关键词请使用逗号分隔，例如：客户A，项目代号，内部部门名称。',
    /** 授权范围单选项（第一项默认选中） */
    authScopes: ['全平台公开', '机构用户'],
    defaultAuthScope: '全平台公开',
    /** 提交按钮上方提示文案 */
    hint: '确认系统识别信息，补充摘要和脱敏要求后提交运营中心审核。',
    submitText: '提交发布申请',
    /** 提交成功后的 toast：发布申请已提交，等待运营中心审核 */
    submitToast: '发布申请已提交，等待运营中心审核',
    revokeText: '取消申请',
    /** 取消申请后的 toast：已取消发布申请，报告返回未申请状态 */
    revokeToast: '已取消发布申请，报告返回未申请状态',
    reapplyText: '重新申请'
  }
};

/** 按审批状态取种子配置，未知状态回退到 none（对应 getApprovalState 的兜底）。 */
export function getApprovalStateSeed(state) {
  return APPROVAL_SEED.states[state] || APPROVAL_SEED.states.none;
}
