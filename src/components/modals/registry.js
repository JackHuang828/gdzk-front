/**
 * Modal 注册表：type -> { component, title, desc, wide }
 * title/desc 可为字符串或 (ctx) => string。
 * 17 类 Modal 全量注册（customTemplate 为原型占位、无触发入口，不注册）：
 * upload、downloadFormat、insightMetricDetail、createKnowledge、materialSelect、
 * newInsight、subscribeSettings、reportRating、publishRequest、approvalProgress、
 * versionManager、sourceTrace、validationLog、deleteKnowledge、deleteTemplate、templateDetail。
 */
import UploadModal from './UploadModal.vue';
import MaterialSelectModal from './MaterialSelectModal.vue';
import VersionManagerModal from './VersionManagerModal.vue';
import SourceTraceModal from './SourceTraceModal.vue';
import ValidationLogModal from './ValidationLogModal.vue';
import DownloadFormatModal from './DownloadFormatModal.vue';
import InsightMetricModal from './InsightMetricModal.vue';
import ReportRatingModal from './ReportRatingModal.vue';
import NewInsightModal from './NewInsightModal.vue';
import SubscribeSettingsModal from './SubscribeSettingsModal.vue';
import PublishRequestModal from './PublishRequestModal.vue';
import ApprovalProgressModal from './ApprovalProgressModal.vue';
import CreateKnowledgeModal from './CreateKnowledgeModal.vue';
import DeleteKnowledgeModal from './DeleteKnowledgeModal.vue';
import DeleteTemplateModal from './DeleteTemplateModal.vue';
import TemplateDetailModal from './TemplateDetailModal.vue';
import EntityDetailModal from './EntityDetailModal.vue';

export const modalRegistry = {
  upload: {
    component: UploadModal,
    title: ctx => ctx?.title || '上传附件',
    desc: '选择资料来源，上传后可作为报告生成、洞察分析和成果复用的可信证据。'
  },
  materialSelect: {
    component: MaterialSelectModal,
    title: '选择知识库素材',
    desc: '从我的知识库中选择本次写作任务需要引用的素材。'
  },
  versionManager: {
    component: VersionManagerModal,
    title: '版本管理',
    desc: '查看历史保存记录，支持预览或恢复到指定版本。',
    wide: true
  },
  sourceTrace: {
    component: SourceTraceModal,
    title: '数据溯源',
    desc: '查看该引用对应的数据集、指标口径和维度信息。',
    wide: true
  },
  validationLog: {
    component: ValidationLogModal,
    title: '校验日志文档',
    desc: '记录本次洞察报告生成后的数据校验过程、结果与异常信息。',
    wide: true
  },
  downloadFormat: {
    component: DownloadFormatModal,
    title: '下载报告',
    desc: '请选择下载格式，系统将按所选格式生成报告文件。'
  },
  insightMetricDetail: {
    component: InsightMetricModal,
    title: ctx => `${ctx?.metric?.label || '指标'}详情`,
    desc: ctx => ctx?.desc || '领域的历史趋势与构成分析。',
    wide: true
  },
  reportRating: {
    component: ReportRatingModal,
    title: '评分及反馈',
    desc: '对报告质量进行评价，系统会用于后续模板推荐和生成质量优化。'
  },
  newInsight: {
    component: NewInsightModal,
    title: '新建洞察',
    desc: '配置洞察主题、指标范围和订阅推送，生成月刊或专题报告。'
  },
  subscribeSettings: {
    component: SubscribeSettingsModal,
    title: '订阅洞察报告',
    desc: '选择订阅周期和发送方式，系统会定期生成并推送该洞察报告。'
  },
  publishRequest: {
    component: PublishRequestModal,
    title: '申请发布为官方报告'
  },
  approvalProgress: {
    component: ApprovalProgressModal,
    title: '审批流程'
  },
  createKnowledge: {
    component: CreateKnowledgeModal,
    title: '创建知识库合集',
    desc: '填写知识库合集信息，可同步批量上传文档，后续进入合集维护标签和解析状态。'
  },
  deleteKnowledge: {
    component: DeleteKnowledgeModal
  },
  deleteTemplate: {
    component: DeleteTemplateModal
  },
  templateDetail: {
    component: TemplateDetailModal,
    title: '模板详情',
    desc: '预览模板标题、适用行业场景和系统预填大纲，可直接关联到首页创作。'
  },
  entityDetail: {
    component: EntityDetailModal,
    title: ctx => ctx?.entity?.name || '科技实体详情',
    wide: true
  }
};
