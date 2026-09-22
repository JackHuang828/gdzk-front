import { createRouter, createWebHistory } from 'vue-router';

// 22 个视图路由。meta:
//  view       原型视图 id（同时作为视图根 section 的 id，驱动 CSS :has() 宽度规则）
//  sidebar    侧边栏「战略咨询报告」组高亮 key（create/cases/hotspot/materials/tasks）
//  topbarHidden 顶栏是否隐藏（对应原型 hiddenTopbarViews）
//  wide       .content 是否使用 home-wide 宽布局（对应原型 activateView 中的切换）
//  crumbs     面包屑链（BreadcrumbNav 组件渲染）：字符串数组，或 (route) => 数组（详情页动态末级）；
//             数组项可为字符串或 { text, to }（可点击跳转）；crumbsHome: true 时链首显示「🏠 首页」；
//             未配置则不显示面包屑
const routes = [
  { path: '/', redirect: '/writing/home' },
  { path: '/writing/home', name: 'home', component: () => import('../views/Home/HomeView.vue'),
    meta: { view: 'home', sidebar: 'create', topbarHidden: true, wide: true } },
  { path: '/writing/research-form', name: 'researchForm', component: () => import('../views/Strategy/ResearchFormView.vue'),
    meta: { view: 'researchForm', sidebar: 'create', topbarHidden: true } },
  { path: '/writing/strategy-form', name: 'strategyForm', component: () => import('../views/Strategy/StrategyFormView.vue'),
    meta: { view: 'strategyForm', sidebar: 'create', topbarHidden: true } },
  { path: '/writing/insight-task', name: 'insightTask', component: () => import('../views/Insight/InsightTaskView.vue'),
    meta: { view: 'insightTask', sidebar: 'create', topbarHidden: true } },
  { path: '/writing/custom-form', name: 'customForm', component: () => import('../views/Template/CustomFormView.vue'),
    meta: { view: 'customForm', sidebar: 'create', topbarHidden: true } },
  { path: '/writing/task-report', name: 'taskReportDetail', component: () => import('../views/Strategy/TaskReportDetailView.vue'),
    meta: { view: 'taskReportDetail', sidebar: 'tasks', topbarHidden: true, wide: true } },
  { path: '/writing/report-editor', name: 'reportEditor', component: () => import('../views/Strategy/ReportEditorView.vue'),
    meta: { view: 'reportEditor', sidebar: 'create', topbarHidden: true } },
  { path: '/writing/core-advice', name: 'coreAdvice', component: () => import('../views/Strategy/CoreAdviceView.vue'),
    meta: { view: 'coreAdvice', sidebar: 'create' } },
  { path: '/writing/cases', name: 'caseLibrary', component: () => import('../views/Case/CaseLibraryView.vue'),
    meta: { view: 'caseLibrary', sidebar: 'cases' } },
  { path: '/writing/cases-legacy', name: 'caseLibraryLegacy', component: () => import('../views/Case/CaseLibraryLegacyView.vue'),
    meta: { view: 'caseLibraryLegacy', sidebar: 'cases' } },
  { path: '/writing/research-detail', name: 'researchDetail', component: () => import('../views/Strategy/ResearchDetailView.vue'),
    meta: { view: 'researchDetail', sidebar: 'create' } },
  { path: '/writing/strategy-detail', name: 'strategyDetail', component: () => import('../views/Strategy/StrategyDetailView.vue'),
    meta: { view: 'strategyDetail', sidebar: 'create' } },
  { path: '/writing/hotspot', name: 'hotspotAnalysis', component: () => import('../views/Hotspot/HotspotAnalysisView.vue'),
    meta: { view: 'hotspotAnalysis', sidebar: 'hotspot', topbarHidden: true, wide: true } },
  { path: '/writing/hotspot/field', name: 'hotspotFieldDistributionPage', component: () => import('../views/Hotspot/HotspotFieldDistributionView.vue'),
    meta: { view: 'hotspotFieldDistributionPage', sidebar: 'hotspot', topbarHidden: true, wide: true } },
  { path: '/writing/hotspot/topic/:id', name: 'hotspotTopicDetailPage', component: () => import('../views/Hotspot/HotspotTopicDetailView.vue'),
    meta: { view: 'hotspotTopicDetailPage', sidebar: 'hotspot', topbarHidden: true, wide: true } },
  { path: '/writing/hotspot/event/:id', name: 'hotspotInvestmentEventDetailPage', component: () => import('../views/Hotspot/HotspotEventDetailView.vue'),
    meta: { view: 'hotspotInvestmentEventDetailPage', sidebar: 'hotspot', topbarHidden: true, wide: true } },
  { path: '/insight/library', name: 'insightLibrary', component: () => import('../views/Insight/InsightLibraryView.vue'),
    meta: { view: 'insightLibrary', sidebar: 'create' } },
  { path: '/insight/detail', name: 'insightDetail', component: () => import('../views/Insight/InsightDetailView.vue'),
    meta: { view: 'insightDetail', sidebar: 'create' } },
  { path: '/docs/documents', name: 'documents', component: () => import('../views/Knowledge/DocumentsView.vue'),
    meta: { view: 'documents', sidebar: 'tasks', topbarHidden: true } },
  { path: '/docs/knowledge', name: 'uploadKnowledge', component: () => import('../views/Knowledge/UploadKnowledgeView.vue'),
    meta: { view: 'uploadKnowledge', sidebar: 'materials', topbarHidden: true, wide: true } },
  { path: '/docs/knowledge-folder', name: 'knowledgeFolderDetail', component: () => import('../views/Knowledge/KnowledgeFolderDetailView.vue'),
    meta: { view: 'knowledgeFolderDetail', sidebar: 'materials', topbarHidden: true, wide: true } },
  { path: '/docs/custom-template', name: 'customTemplatePage', component: () => import('../views/Template/CustomTemplatePageView.vue'),
    meta: { view: 'customTemplatePage', sidebar: 'materials', topbarHidden: true, wide: true } },

  // 技术研判服务 → 研究需求分析：科技实体清单
  { path: '/tech/entities', name: 'entityList', component: () => import('../views/Tech/EntityListView.vue'),
    meta: { view: 'entityList', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbs: ['技术研判服务', '研究需求分析', '科技实体清单'] } },
  // 技术研判服务 → 研究需求分析 → 科技实体清单 → 实体详情
  { path: '/tech/entities/:name', name: 'entityDetail', component: () => import('../views/Tech/EntityDetailView.vue'),
    meta: { view: 'entityDetail', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbs: (route) => ['技术研判服务', '研究需求分析', '科技实体清单', route.params.name] } },
  // 技术研判服务 → 研究需求分析：颠覆性与前沿技术分析
  { path: '/tech/disruptive', name: 'disruptiveTech', component: () => import('../views/Tech/DisruptiveTechView.vue'),
    meta: { view: 'disruptiveTech', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbs: ['技术研判服务', '研究需求分析', '颠覆性与前沿技术分析'] } },
  // 技术研判服务 → 研究需求分析 → 颠覆性与前沿技术分析 → 技术详情
  { path: '/tech/disruptive/:name', name: 'disruptiveTechDetail', component: () => import('../views/Tech/DisruptiveTechDetailView.vue'),
    meta: { view: 'disruptiveTechDetail', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbs: (route) => ['技术研判服务', '研究需求分析', { text: '颠覆性与前沿技术分析', to: { name: 'disruptiveTech' } }, route.params.name] } },
  // 技术研判服务 → 研究需求分析：媒体聚焦
  { path: '/tech/media-focus', name: 'mediaFocus', component: () => import('../views/Tech/MediaFocusView.vue'),
    meta: { view: 'mediaFocus', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbs: ['技术研判服务', '研究需求分析', '媒体聚焦'] } },

  // 技术研判服务 → 技术体系分析：技术体系
  { path: '/tech/system', name: 'techSystem', component: () => import('../views/Tech/TechSystemView.vue'),
    meta: { view: 'techSystem', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbs: ['技术研判服务', '技术体系分析', '技术体系'] } },

  // 技术研判服务 → 技术体系分析：论文分析
  { path: '/tech/paper-analysis', name: 'paperAnalysis', component: () => import('../views/Tech/PaperAnalysisView.vue'),
    meta: { view: 'paperAnalysis', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbsHome: true, crumbs: ['战略咨询智能支持', '技术体系分析', '论文分析'] } },

  // 技术研判服务 → 技术体系分析：专利分析
  { path: '/tech/patent-analysis', name: 'patentAnalysis', component: () => import('../views/Tech/PatentAnalysisView.vue'),
    meta: { view: 'patentAnalysis', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbsHome: true, crumbs: ['战略咨询智能支持', '技术体系分析', '专利分析'] } },

  // 技术研判服务 → 技术体系分析：科研项目分析
  { path: '/tech/research-project', name: 'researchProject', component: () => import('../views/Tech/ResearchProjectView.vue'),
    meta: { view: 'researchProject', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbsHome: true, crumbs: ['战略咨询智能支持', '技术体系分析', '科研项目分析'] } },

  // 技术研判服务 → 技术体系分析：社会网络分析
  { path: '/tech/social-network', name: 'socialNetwork', component: () => import('../views/Tech/SocialNetworkView.vue'),
    meta: { view: 'socialNetwork', sidebar: 'techService', topbarHidden: true, wide: true,
      crumbsHome: true, crumbs: ['战略咨询智能支持', '技术体系分析', '社会网络分析'] } },

  // 科技人才智慧服务 → 科技人才库：领域人才分类
  { path: '/talent/library', name: 'talentLibrary', component: () => import('../views/Talent/TalentLibraryView.vue'),
    meta: { view: 'talentLibrary', sidebar: 'talent', topbarHidden: true, wide: true,
      crumbs: ['科技人才智慧服务', '科技人才库'] } },

  // 科技人才智慧服务 → 科技人才画像
  { path: '/talent/list', name: 'talentList', component: () => import('../views/Talent/TalentListView.vue'),
    meta: { view: 'talentList', sidebar: 'talent', topbarHidden: true, wide: true,
      crumbs: ['科技人才智慧服务', '科技人才画像'] } },
  // 科技人才智慧服务 → 科技人才画像 → 画像详情
  { path: '/talent/list/:id', name: 'talentListDetail', component: () => import('../views/Talent/TalentListProfile.vue'),
    meta: { view: 'talentList', sidebar: 'talent', topbarHidden: true, wide: true,
      crumbs: (route) => ['科技人才智慧服务', { text: '科技人才画像', to: { name: 'talentList' } }, '画像详情'] } },

  // 科技人才智慧服务 → 科技人才地图
  { path: '/talent/map', name: 'talentMap', component: () => import('../views/Talent/TalentMapView.vue'),
    meta: { view: 'talentMap', sidebar: 'talent', topbarHidden: true, wide: true,
      crumbs: ['科技人才智慧服务', '科技人才地图'] } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
