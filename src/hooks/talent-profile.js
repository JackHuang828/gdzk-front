/* 科技人才画像：组合式状态与事件处理
 * 关键约束：模板内 @click="activeExpertId = e.id" 这种直接给 ref 赋值的写法
 * 在本工程 setup 下不会触发响应式更新，必须通过显式 setter 方法赋值。
 * 因此所有状态变更都通过这里的 setter 完成，模板只调用方法、不直接赋值。
 */
import { ref, reactive, computed } from 'vue';
import {
  profileTagData, relationTagData, relationScholarData, expertData,
  projectDetails, titleData, scholarData, orgData, milestoneDetails,
  companyData, ideologyDetails, mediaReportsData, academicDetailContents,
  metricDetailData, topicDetails, valueDetails,
  disciplineTree as fallbackDisciplineTree
} from '../data/talent/profile-data';
import { P as staticTalentList } from '../data/talent/people';
import {
  fetchFilterOptions as fetchFilterOptionsApi,
  fetchDisciplineTree as fetchDisciplineTreeApi,
  fetchTalentPersonPage,
} from '../api/talent';
import { DEFAULT_LIST_FILTER_OPTIONS, PAGE_SIZE } from '../constants/talent';

// 筛选下拉选项：默认从 constants 导入，API 成功后覆盖
export const listFilterOptions = reactive(JSON.parse(JSON.stringify(DEFAULT_LIST_FILTER_OPTIONS)));

/** 从后端 /talent/filter-options 拉取筛选下拉选项，失败保留默认 */
export async function fetchFilterOptions() {
  try {
    const opts = await fetchFilterOptionsApi();
    if (opts && typeof opts === 'object') {
      Object.keys(DEFAULT_LIST_FILTER_OPTIONS).forEach(k => {
        if (Array.isArray(opts[k])) listFilterOptions[k] = opts[k];
      });
    }
  } catch (e) {
    console.warn('[filter-options] API 不可用，使用内置默认数据:', e.message);
  }
}

// 学科树：默认用硬编码，API 成功后覆盖
export const disciplineTree = ref(JSON.parse(JSON.stringify(fallbackDisciplineTree)));

/** 把后端返回的层级 VO 树转换成前端 { primary: { secondary: { tertiary: [quaternary...] } } } 格式 */
function convertDisciplineTree(voList) {
  const result = {};
  if (!Array.isArray(voList)) return result;
  for (const p of voList) {
    const pName = p.name;
    result[pName] = {};
    if (!Array.isArray(p.children)) continue;
    for (const s of p.children) {
      const sName = s.name;
      result[pName][sName] = {};
      if (!Array.isArray(s.children)) continue;
      for (const t of s.children) {
        const tName = t.name;
        result[pName][sName][tName] = [];
        if (Array.isArray(t.children)) {
          for (const q of t.children) result[pName][sName][tName].push(q.name);
        }
      }
    }
  }
  return result;
}

/** 从后端 /talent/discipline/tree 拉取学科树，失败则保留默认值 */
export async function fetchDisciplineTree() {
  try {
    const voList = await fetchDisciplineTreeApi();
    if (Array.isArray(voList) && voList.length > 0) {
      disciplineTree.value = convertDisciplineTree(voList);
    }
  } catch (e) {
    console.warn('[discipline-tree] API 不可用，使用内置默认数据:', e.message);
  }
}

// ===== 顶层状态 =====
export const activeModule = ref('basic-info');          // 4 个顶部模块
export const activeExpertId = ref(1);                    // 当前专家 id
export const activeTag = ref('人工智能');                 // 基础信息页标签
export const activeDetailTab = ref('profile-basic-panel'); // 基础信息详情子页签
export const activeBehaviorTab = ref('behavior-migration-panel'); // 行为信息子页签
export const activeRelationTopic = ref(null);           // 关联信息研究主题筛选（null=全部）
export const expandedMigrationId = ref(null);            // 行为信息迁徙详情展开项
export const expandedMedia = ref(false);                 // 心理信息媒体报道展开
export const searchKeyword = ref('');                    // 专家搜索关键词
export const activeFilterCategory = ref('all');          // 专家筛选分类

// ===== 列表检索页状态 =====
export const viewMode = ref('list');                     // 'list' | 'detail'
export const currentPage = ref(1);                      // 列表当前页码
export const listKeyword = ref('');                      // 列表搜索关键词
export const listFilters = reactive({                    // 9 个下拉筛选
  primary: '', secondary: '', tertiary: '', quaternary: '',
  institution: '', outcome: '', project: '', type: '', region: ''
});

// ===== 静态回退数据（API 未就绪或失败时使用，来自 people.js 的演示人才） =====
/** 将 people.js 的 P 数组条目映射为搜索列表模板期望的字段格式 */
function mapStaticTalentRecord(p) {
  return {
    id: p.id,
    name: p.name || '',
    title: p.title || '',
    institution: p.institution || '',
    institutionKey: p.institution || '',
    primary: p.field || '',
    secondary: p.secondary || '',
    field: p.field || '',
    category: p.field || '',
    tertiary: p.tertiary || '',
    quaternary: p.quaternary || '',
    outcome: p.outcome || '',
    project: p.project || '',
    type: p.type || '',
    region: p.region || '',
    impact: p.impact == null ? '' : String(p.impact),
    years: '',
    projects: '',
    activity: ''
  };
}
const STATIC_LIST = staticTalentList.map(mapStaticTalentRecord);

// 人才列表数据：初始展示静态演示数据，API 成功后覆盖为服务端分页数据
export const profileListCatalog = ref(STATIC_LIST.slice(0, PAGE_SIZE));
// 分页元信息：初始为静态数据，API 成功后覆盖
export const listTotal = ref(STATIC_LIST.length);
export const listTotalPages = ref(Math.max(1, Math.ceil(STATIC_LIST.length / PAGE_SIZE)));

/**
 * 分页拉取人才列表（服务端分页 + 关键词 + 9 个筛选）
 * 每次调用都会把当前 page / size / filters / keyword 拼成 query 参数发给后端
 */
export async function fetchProfileList() {
  const params = {
    page: String(currentPage.value),
    size: String(PAGE_SIZE),
  };
  const kw = listKeyword.value.trim();
  if (kw) params.keyword = kw;
  if (listFilters.primary) params.primary = listFilters.primary;
  if (listFilters.secondary) params.secondary = listFilters.secondary;
  if (listFilters.tertiary) params.tertiary = listFilters.tertiary;
  if (listFilters.quaternary) params.quaternary = listFilters.quaternary;
  if (listFilters.institution) params.institution = listFilters.institution;
  if (listFilters.outcome) params.outcome = listFilters.outcome;
  if (listFilters.project) params.project = listFilters.project;
  if (listFilters.type) params.type = listFilters.type;
  if (listFilters.region) params.region = listFilters.region;

  try {
    const pageData = await fetchTalentPersonPage(params);
    if (!pageData) throw new Error('响应中无 data');
    // MyBatis-Plus IPage 返回结构：{ records, total, size, current, pages }
    const records = Array.isArray(pageData.records) ? pageData.records : [];
    listTotal.value = Number(pageData.total) || 0;
    // 后端表为空 + 无筛选条件 → 回退静态演示数据（保证列表永远不空白）
    const noFilters = !kw && !listFilters.primary && !listFilters.secondary
      && !listFilters.tertiary && !listFilters.quaternary
      && !listFilters.institution && !listFilters.outcome
      && !listFilters.project && !listFilters.type && !listFilters.region;
    if (listTotal.value === 0 && noFilters) {
      listTotal.value = STATIC_LIST.length;
      listTotalPages.value = Math.max(1, Math.ceil(STATIC_LIST.length / PAGE_SIZE));
      const start = (currentPage.value - 1) * PAGE_SIZE;
      profileListCatalog.value = STATIC_LIST.slice(start, start + PAGE_SIZE);
      return;
    }
    listTotalPages.value = Number(pageData.pages) || Math.max(1, Math.ceil(listTotal.value / PAGE_SIZE));
    // 如果请求的页码超出后端返回范围（筛选后条数变少），修正并重拉
    if (pageData.current > listTotalPages.value && listTotalPages.value >= 1) {
      currentPage.value = listTotalPages.value;
      return fetchProfileList();
    }
    profileListCatalog.value = records.map((p) => ({
      id: p.code || String(p.id),
      name: p.name || '',
      title: p.title || '',
      institution: p.institutionName || '',
      institutionKey: p.institutionName || '',
      primary: p.field || '',
      secondary: p.secondary || '',
      field: p.field || '',
      category: p.field || '',
      tertiary: p.tertiary || '',
      quaternary: p.quaternary || '',
      outcome: p.outcome || '',
      project: p.project || '',
      type: p.type || '',
      region: p.region || '',
      impact: p.impact == null ? '' : String(p.impact),
      years: '',
      projects: '',
      activity: ''
    }));
  } catch (e) {
    console.warn('[TalentProfile] 人才列表接口获取失败，使用静态演示数据:', e);
    // 客户端过滤 + 分页静态数据作为回退，让搜索和筛选在无后端时仍可用
    const kw = listKeyword.value.trim().toLowerCase();
    const filtered = STATIC_LIST.filter((r) => {
      if (kw) {
        const hay = (r.name + r.institution + r.field + r.tertiary + r.quaternary + r.outcome + r.project).toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      if (listFilters.primary && r.primary !== listFilters.primary) return false;
      if (listFilters.secondary && r.secondary !== listFilters.secondary) return false;
      if (listFilters.tertiary && r.tertiary !== listFilters.tertiary) return false;
      if (listFilters.quaternary && r.quaternary !== listFilters.quaternary) return false;
      if (listFilters.institution && r.institution !== listFilters.institution) return false;
      if (listFilters.outcome && r.outcome !== listFilters.outcome) return false;
      if (listFilters.project && r.project !== listFilters.project) return false;
      if (listFilters.type && r.type !== listFilters.type) return false;
      if (listFilters.region && r.region !== listFilters.region) return false;
      return true;
    });
    listTotal.value = filtered.length;
    listTotalPages.value = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const start = (currentPage.value - 1) * PAGE_SIZE;
    profileListCatalog.value = filtered.slice(start, start + PAGE_SIZE);
  }
}

// 弹窗状态：type 取值 metric | company | topicValue | project
export const dialog = reactive({ type: null, data: null });

// ===== 派生状态 =====
// expertData 需要响应式：服务端基本信息按专家 id 动态合并/新增（t1-t108 全支持）
const expertDataState = reactive(expertData);
export const activeExpert = computed(() => expertDataState[activeExpertId.value] || expertDataState[1]);

/** 从后端 /talent/person/t{id}/basic 拉取个人基本信息并合并覆盖；失败保留静态演示数据 */
export async function fetchExpertBasic(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/basic`);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    const p = ((data && data.data) ?? data) || {};
    if (!p.code) return;
    // 头部标签页签：talent 表 research_directions 按顿号/逗号分割（空则回退静态 tags / field 单值）
    const tagsFromServer = String(p.researchDirections ?? '')
      .split(/[、，,]/).map((s) => s.trim()).filter(Boolean);
    const base = expertDataState[expertId] || {
      name: p.name, title: p.title ?? '', avatar: (p.name || '?').slice(0, 1),
      tags: tagsFromServer.length ? tagsFromServer : [p.field].filter(Boolean),
      organization: p.institutionName ?? ''
    };
    expertDataState[expertId] = {
      ...base,
      name: p.name ?? base.name,
      title: p.title ?? base.title,
      profileTitle: p.title ?? base.profileTitle,
      organization: p.institutionName ?? base.organization,
      gender: p.gender ?? '男',
      birthYear: p.birthYear ?? base.birthYear,
      email: p.email ?? base.email,
      phone: p.phone ?? base.phone,
      honors: p.honors ?? base.honors,
      researchDirections: p.researchDirections ?? base.researchDirections,
      homepage: p.homepage ?? base.homepage,
      tags: tagsFromServer.length ? tagsFromServer : base.tags
    };
    // 当前选中标签不在服务端标签集合中时，切到第一个（保证页签高亮与按标签数据一致）
    if (tagsFromServer.length && !tagsFromServer.includes(activeTag.value)) {
      activeTag.value = tagsFromServer[0];
    }
  } catch (e) {
    console.warn('[expert-basic] API 不可用，使用内置演示数据:', e.message);
  }
}

export const activeProfileTagData = computed(() => {
  // 服务端合作关系网优先（talent_collab_node/edge），无数据回退领域演示数据
  const serverMap = collabNetworkState.value;
  if (serverMap && serverMap[activeTag.value]) return serverMap[activeTag.value];
  return profileTagData[activeTag.value] || profileTagData['人工智能'];
});

// ===== 教育背景与工作经历（talent_education / talent_career 两张子表，服务端优先，空/失败回退静态演示数据）=====
const educationState = ref(null);
const careerState = ref(null);

/** 从后端拉取教育背景与工作经历时间轴；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentExperience(expertId) {
  try {
    const [eduResp, carResp] = await Promise.all([
      fetch(`/api/talent/person/t${expertId}/education`),
      fetch(`/api/talent/person/t${expertId}/career`)
    ]);
    if (eduResp.ok) {
      const list = ((await eduResp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) educationState.value = list;
    }
    if (carResp.ok) {
      const list = ((await carResp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) careerState.value = list;
    }
  } catch (e) {
    console.warn('[talent-experience] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 教育背景渲染列表：服务端 {period,degreeMajor,school,description} → 时间轴结构 */
export const educationTimeline = computed(() => {
  if (!educationState.value) return null;
  return educationState.value.map((r) => ({
    period: r.period ?? '',
    degree: r.degreeMajor ?? '',
    school: r.school ?? '',
    description: r.description ?? ''
  }));
});

/** 工作经历渲染列表：服务端 {period,position,organization,description,achievements(逗号分隔)} → 时间轴结构 */
export const careerTimeline = computed(() => {
  if (!careerState.value) return null;
  return careerState.value.map((r) => ({
    period: r.period ?? '',
    position: r.position ?? '',
    organization: r.organization ?? '',
    description: r.description ?? '',
    achievements: (r.achievements ?? '').split(/[,，]/).map((s) => s.trim()).filter(Boolean)
  }));
});

// ===== 人才动态（talent_dynamic 表，服务端优先，空/失败回退静态演示数据）=====
const dynamicState = ref(null);

/** 从后端拉取该人才的人才动态时间轴；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentDynamics(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/dynamic`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) dynamicState.value = list;
    }
  } catch (e) {
    console.warn('[talent-dynamic] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 人才动态渲染列表：服务端 {period,title,organization} → 时间轴结构（sort 升序=最新在前） */
export const serverDynamics = computed(() => {
  if (!dynamicState.value) return null;
  return dynamicState.value.map((r) => ({
    period: r.period ?? '',
    title: r.title ?? '',
    organization: r.organization ?? ''
  }));
});

// ===== 合作企业（talent_company 单表，服务端优先；统计卡由企业记录 SUM/AVG 聚合，详情弹窗回退静态库）=====
const companyServerState = ref(null);

/** 从后端拉取该人才的合作企业列表；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentCompanies(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/company`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) companyServerState.value = list;
    }
  } catch (e) {
    console.warn('[talent-company] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 合作企业列表：服务端 {name,icon,iconColor,tags(顿号),projects,budgetWan,patents,papers,cooperationYears} */
export const serverCompanies = computed(() => {
  if (!companyServerState.value) return null;
  return companyServerState.value.map((r) => ({
    name: r.name ?? '',
    icon: r.icon ?? 'fa-building',
    iconColor: r.iconColor ?? '#1890ff',
    tags: (r.tags ?? '').split(/[、,，]/).map((s) => s.trim()).filter(Boolean),
    projects: r.projects ?? 0,
    budgetWan: r.budgetWan ?? 0,
    patents: r.patents ?? 0,
    papers: r.papers ?? 0,
    cooperationYears: r.cooperationYears ?? ''
  }));
});

/** 合作统计信息：由企业记录聚合（专利/项目/资金=SUM，合作指数=AVG）；metricKey 对应静态详情弹窗 key */
export const serverCompanyMetrics = computed(() => {
  if (!companyServerState.value) return null;
  const list = companyServerState.value;
  const sum = (k) => list.reduce((a, r) => a + (Number(r[k]) || 0), 0);
  const idx = Math.round(list.reduce((a, r) => a + (Number(r.cooperationIndex) || 0), 0) / list.length);
  return [
    { label: '合作指数', value: idx + '%', metricKey: '合作指数' },
    { label: '专利', value: sum('patents') + '项', metricKey: '专利' },
    { label: '项目', value: sum('projects') + '个', metricKey: '项目' },
    { label: '合作资金', value: sum('budgetWan') + '万', metricKey: '资金' }
  ];
});

// ===== 舆情指标（talent_sentiment 单行表，服务端优先，空/失败回退静态演示数据）=====
const sentimentState = ref(null);

/** 从后端拉取该人才的舆情指标（一人一行）；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentSentiment(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/sentiment`);
    if (resp.ok) {
      const data = (await resp.json()).data;
      if (data && typeof data === 'object') sentimentState.value = data;
    }
  } catch (e) {
    console.warn('[talent-sentiment] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 舆情指标渲染对象：{score,positive,neutral,negative}；评级文案由 score 派生 */
export const serverSentiment = computed(() => {
  if (!sentimentState.value) return null;
  const r = sentimentState.value;
  return {
    score: r.score ?? 0,
    positive: r.positive ?? 0,
    neutral: r.neutral ?? 0,
    negative: r.negative ?? 0
  };
});

// ===== 意识形态指标（talent_ideology 单行表，服务端优先，空/失败回退静态演示数据）=====
const ideologyState = ref(null);

/** 从后端拉取该人才的意识形态指标（一人一行）；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentIdeology(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/ideology`);
    if (resp.ok) {
      const data = (await resp.json()).data;
      if (data && typeof data === 'object') ideologyState.value = data;
    }
  } catch (e) {
    console.warn('[talent-ideology] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 意识形态指标渲染对象：{political,science,norm,responsibility,cooperation}；政治评分评级由 political 派生 */
export const serverIdeology = computed(() => {
  if (!ideologyState.value) return null;
  const r = ideologyState.value;
  return {
    political: r.political ?? 0,
    science: r.science ?? 0,
    norm: r.norm ?? 0,
    responsibility: r.responsibility ?? 0,
    cooperation: r.cooperation ?? 0
  };
});

// ===== 媒体报道（talent_media 1:N 表，服务端优先，空/失败回退静态演示数据）=====
const mediaState = ref(null);

/** 从后端拉取该人才的媒体报道列表；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentMedia(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/media`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) mediaState.value = list;
    }
  } catch (e) {
    console.warn('[talent-media] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 媒体报道渲染列表：{title,source,date,summary,url,sentiment}（sentiment 用于"正面 X 篇"统计） */
export const serverMediaReports = computed(() => {
  if (!mediaState.value) return null;
  return mediaState.value.map((r) => ({
    title: r.title ?? '',
    source: r.source ?? '',
    date: r.date ?? '',
    summary: r.summary ?? '',
    url: r.url || '#',
    sentiment: r.sentiment ?? ''
  }));
});

// ===== 行为信息：人才迁徙路径（talent_migration 主表+双JSON列，服务端优先，空/失败回退静态）=====
const migrationState = ref(null);

/** 从后端拉取该人才的迁徙路径列表；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentMigration(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/migration`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) migrationState.value = list;
    }
  } catch (e) {
    console.warn('[talent-migration] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 迁徙路径渲染列表：JSON 列容错解析；id 用索引（仅用于展开/收起切换，无业务含义） */
export const serverMigrationList = computed(() => {
  if (!migrationState.value) return null;
  const parseArr = (s) => {
    try {
      const v = JSON.parse(s ?? 'null');
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  };
  return migrationState.value.map((r, i) => ({
    id: `srv-${i}`,
    location: r.location ?? '',
    organization: r.organization ?? '',
    duration: r.duration ?? '',
    role: r.role ?? '',
    description: r.description ?? '',
    position: r.position ?? '',
    projects: parseArr(r.projectsJson),
    achievements: parseArr(r.achievementsJson),
    outputLabel: r.outputLabel ?? '',
    outputText: r.outputText ?? '',
    dotActive: Number(r.isCurrent) === 1
  }));
});

// ===== 行为信息：科技成长轨迹里程碑（talent_milestone 纯扁平，服务端优先，空/失败回退静态）=====
const milestoneState = ref(null);

/** 从后端拉取该人才的成长轨迹里程碑列表；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentMilestone(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/milestone`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) milestoneState.value = list;
    }
  } catch (e) {
    console.warn('[talent-milestone] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 里程碑渲染列表：name 对应详情弹窗键（静态库命中才显示完整详情） */
export const serverMilestoneList = computed(() => {
  if (!milestoneState.value) return null;
  return milestoneState.value.map((r) => ({
    key: r.name ?? '',
    year: r.year ?? '',
    title: r.title ?? '',
    score: r.score ?? 0,
    color: r.color ?? '#1890ff',
    active: Number(r.isCurrent) === 1
  }));
});

// ===== 关联信息：代表成果论文（talent_relation_paper 表，profile_tag+topic 两级筛选，服务端优先，空/失败回退静态）=====
const relationPaperState = ref(null);

/** 从后端拉取该人才的代表成果论文列表；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentRelationPapers(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/relation-paper`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) relationPaperState.value = list;
    }
  } catch (e) {
    console.warn('[talent-relation-paper] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 按画像主题分组：papersList 映射回模板 6 元组，topics 聚合 [名称, 归一化百分比, 固定色板按序]
 *  同标签同主题多行时累加计数（修复 Map.set 覆盖丢计数）；聚合后归一化为百分比，
 *  避免 DB 中 topic_count 总和≠100 时饼图缺角 */
export const serverRelationGroups = computed(() => {
  if (!relationPaperState.value) return null;
  const palette = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1'];
  const groups = {};
  for (const r of relationPaperState.value) {
    const tag = r.profileTag ?? '';
    if (!groups[tag]) groups[tag] = { papersList: [], topicMap: new Map() };
    const g = groups[tag];
    g.papersList.push([r.title ?? '', r.venue ?? '', r.citations ?? '', r.authorRole ?? '', r.brief ?? '', r.topic ?? '']);
    const topic = r.topic ?? '';
    g.topicMap.set(topic, (g.topicMap.get(topic) ?? 0) + (Number(r.topicCount) || 0));
  }
  const result = {};
  for (const [tag, g] of Object.entries(groups)) {
    const sum = [...g.topicMap.values()].reduce((a, b) => a + b, 0) || 1;
    result[tag] = {
      papersList: g.papersList,
      topics: Array.from(g.topicMap.entries()).map(([name, v], i) => [name, Math.round((v / sum) * 100), palette[i % palette.length]])
    };
  }
  return result;
});

// ===== 关联信息：研究主题分布（talent_topic_share 表，独立数据源不依赖代表成果论文；
// 按 profileTag 分组取当前标签，percentage 直接作为饼图/图例占比；空/失败回退静态）=====
const topicShareState = ref(null);

/** 从后端拉取该人才的研究主题分布；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentTopicShares(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/topic-share`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) topicShareState.value = list;
    }
  } catch (e) {
    console.warn('[talent-topic-share] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 按画像标签分组的研究主题占比：{ '人工智能': [['大模型与智能体',58,'#1890ff'], ...] }
 *  组内按 percentage 降序（数据侧已按 sort 排好，这里再保险一次），色板按序分配 */
export const serverTopicShares = computed(() => {
  if (!topicShareState.value) return null;
  const palette = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1'];
  const groups = {};
  for (const r of topicShareState.value) {
    const tag = r.profileTag ?? '';
    if (!groups[tag]) groups[tag] = [];
    groups[tag].push({ topic: r.topic ?? '', pct: Number(r.percentage) || 0 });
  }
  const result = {};
  for (const [tag, list] of Object.entries(groups)) {
    result[tag] = list
      .sort((a, b) => b.pct - a.pct)
      .map((it, i) => [it.topic, it.pct, palette[i % palette.length]]);
  }
  return result;
});

// ===== 关联信息：关键学术指标（talent_academic_metric 表，一人一行统计性数据，服务端优先，空/失败回退静态）=====
const academicMetricState = ref(null);

/** 从后端拉取该人才的关键学术指标（一人一行）；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentAcademicMetrics(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/academic-metric`);
    if (resp.ok) {
      const data = (await resp.json()).data;
      if (data && typeof data === 'object') academicMetricState.value = data;
    }
  } catch (e) {
    console.warn('[talent-academic-metric] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 单条关键学术指标（{ papers, citations, hIndex, patents }），无服务端数据时返回 null */
export const serverAcademicMetric = computed(() => {
  if (!academicMetricState.value) return null;
  return {
    papers: academicMetricState.value.papers ?? '',
    citations: academicMetricState.value.citations ?? '',
    hIndex: academicMetricState.value.hIndex ?? '',
    patents: academicMetricState.value.patents ?? ''
  };
});

// ===== 学术荣誉：学者头衔（talent_title 表，卡片列表+详情弹窗，服务端优先，空/失败回退静态）=====
const titleState = ref(null);

/** 从后端拉取该人才的学者头衔列表；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentTitles(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/title`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) titleState.value = list;
    }
  } catch (e) {
    console.warn('[talent-title] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 学者头衔渲染列表：{ name(点击键，服务端为完整名), title(卡片显示名), category, 详情五字段 } */
export const serverTitleList = computed(() => {
  if (!titleState.value) return null;
  const parseArr = (s) => {
    try {
      const v = JSON.parse(s ?? 'null');
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  };
  return titleState.value.map((r) => ({
    name: r.name ?? '',
    title: r.name ?? '',
    category: r.category ?? '',
    awardDate: r.awardDate ?? '',
    awardingOrg: r.awardingOrg ?? '',
    description: r.description ?? '',
    honors: parseArr(r.honorsJson),
    eligibility: r.eligibility ?? ''
  }));
});

// ===== 科研诚信奖项（talent_award 表，1:N；icon/icon_color 供卡片渲染，description/awarding_org/category 供弹窗）=====
const awardState = ref(null);

/** 从后端拉取该人才的科研诚信奖项列表；接口不可用或无数据时返回 null */
export async function fetchTalentAwards(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/award`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) awardState.value = list;
    }
  } catch (e) {
    console.warn('[talent-award] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 科研诚信奖项渲染列表：{ name, year, reason, icon, iconColor, awardingOrg, description, category } */
export const serverAwardList = computed(() => {
  if (!awardState.value) return null;
  return awardState.value.map((r) => ({
    name: r.name ?? '',
    year: r.awardYear ?? '',
    reason: r.reason ?? '',
    icon: r.icon ?? 'fa-trophy',
    iconColor: r.iconColor ?? '#faad14',
    awardingOrg: r.awardingOrg ?? '',
    description: r.description ?? '',
    category: r.category ?? ''
  }));
});

// ===== 合作学者（talent_collaborator 表，1:N；同名学者唯一，多来源合并；
// paper/patent/project 分开计数，sources_json 标记来源类型；服务端优先，空/失败回退静态 relationScholarData）=====
const collaboratorState = ref(null);

/** 从后端拉取该人才的合作学者列表；接口不可用或无数据时保留 null */
export async function fetchTalentCollaborators(expertId) {
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/collaborator`);
    if (resp.ok) {
      const list = ((await resp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) collaboratorState.value = list;
    }
  } catch (e) {
    console.warn('[talent-collaborator] API 不可用，使用内置演示数据:', e.message);
  }
}

function parseJsonArr(s) {
  try {
    const v = JSON.parse(s ?? 'null');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/** 合作学者渲染列表：按 paper_count 降序排列，格式对齐静态 relationScholarData */
export const serverCollaboratorList = computed(() => {
  if (!collaboratorState.value) return null;
  return collaboratorState.value
    .sort((a, b) => (b.paperCount ?? 0) - (a.paperCount ?? 0))
    .map((r) => ({
      name: r.name ?? '',
      affiliation: r.affiliation ?? '',
      paperCount: r.paperCount ?? 0,
      patentCount: r.patentCount ?? 0,
      projectCount: r.projectCount ?? 0,
      tags: parseJsonArr(r.tagsJson),
      sources: parseJsonArr(r.sourcesJson)
    }));
});

// ===== 论文/专利/项目（talent_paper / talent_patent / talent_project 三表，服务端优先，空/失败回退领域演示数据）=====
const paperState = ref(null);
const patentState = ref(null);
const projectState = ref(null);

/** 从后端拉取该人才的代表论文/发明专利/参与项目；接口不可用或无数据时保留领域演示数据 */
export async function fetchTalentOutputs(expertId) {
  // 切换人才时先清空旧数据，避免接口失败/无数据时残留上一位人才的内容
  paperState.value = null;
  patentState.value = null;
  projectState.value = null;
  try {
    const [papResp, patResp, prjResp] = await Promise.all([
      fetch(`/api/talent/person/t${expertId}/paper`),
      fetch(`/api/talent/person/t${expertId}/patent`),
      fetch(`/api/talent/person/t${expertId}/project`)
    ]);
    if (papResp.ok) {
      const list = ((await papResp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) paperState.value = list;
    }
    if (patResp.ok) {
      const list = ((await patResp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) patentState.value = list;
    }
    if (prjResp.ok) {
      const list = ((await prjResp.json()).data) ?? [];
      if (Array.isArray(list) && list.length) projectState.value = list;
    }
  } catch (e) {
    console.warn('[talent-outputs] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 代表论文渲染列表：{title,source,year,citations,profileTag} → 页面 [标题,来源,年份,引用] 顺序
 *  按当前 activeTag 过滤实现标签联动：profileTag 等于当前标签，或为 NULL（通用论文）才显示 */
export const serverPapers = computed(() => {
  if (!paperState.value) return null;
  const tag = activeTag.value;
  return paperState.value
    .filter((r) => !r.profileTag || r.profileTag === tag)
    .map((r) => [r.title ?? '', r.source ?? '', r.year ?? '', r.citations ?? 0]);
});

/** 发明专利渲染列表：talent_paper(type=patent) {title,source(专利号),profileTag} → [名称,专利号]
 *  同论文一样按 activeTag 过滤实现标签联动 */
export const serverPatents = computed(() => {
  if (!patentState.value) return null;
  const tag = activeTag.value;
  return patentState.value
    .filter((r) => !r.profileTag || r.profileTag === tag)
    .map((r) => [r.title ?? '', r.source ?? '']);
});

/** 参与项目渲染列表：{title,role,period,status,profileTag} → [名称,角色,周期,状态]
 *  按当前 activeTag 过滤实现标签联动：profileTag 等于当前标签，或为 NULL（通用项目）才显示 */
export const serverProjects = computed(() => {
  if (!projectState.value) return null;
  const tag = activeTag.value;
  return projectState.value
    .filter((r) => !r.profileTag || r.profileTag === tag)
    .map((r) => [r.title ?? '', r.role ?? '', r.period ?? '', r.status ?? '']);
});

// ===== 合作关系网（talent_collab_node / talent_collab_edge 两表，服务端优先，空/失败回退领域演示数据）=====
// 结构：{ '人工智能': { note, nodes:[{id,label,type,center,x,y}], edges:[[from,to,weight]], papers, patents, projects } }
export const collabNetworkState = ref(null);

/** 服务端节点只有业务数据（key/label/type/center），坐标由前端槽位布局生成（数据与展示分离） */
const NETWORK_SLOTS = [
  { x: 140, y: 80 }, { x: 560, y: 80 }, { x: 120, y: 275 }, { x: 575, y: 275 }
];
function applyNetworkLayout(nodes) {
  const peripheral = [];
  for (const n of nodes) {
    if (n.center) { n.x = 350; n.y = 175; } else { peripheral.push(n); }
  }
  peripheral.forEach((n, i) => {
    if (i < NETWORK_SLOTS.length) {
      n.x = NETWORK_SLOTS[i].x; n.y = NETWORK_SLOTS[i].y;
    } else {
      // 超出 4 个周边节点：椭圆环形均分兜底
      const angle = ((-160 + (360 / peripheral.length) * i) * Math.PI) / 180;
      n.x = Math.round(350 + 215 * Math.cos(angle));
      n.y = Math.round(177 + 97 * Math.sin(angle));
    }
  });
}

/** 从后端拉取该人才全部标签的合作关系网；接口不可用或无数据时保留内置演示数据 */
export async function fetchTalentCollaboration(expertId) {
  collabNetworkState.value = null;
  try {
    const resp = await fetch(`/api/talent/person/t${expertId}/collaboration`);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    const list = ((data && data.data) ?? data) ?? [];
    if (!Array.isArray(list) || !list.length) return;
    const map = {};
    for (const net of list) {
      if (!net || !net.tag || !Array.isArray(net.nodes)) continue;
      const nodes = net.nodes.map((n) => ({
        id: n.key, label: n.label ?? '', type: n.type ?? '机构', center: !!n.center, x: 0, y: 0
      }));
      applyNetworkLayout(nodes);
      // 合并静态数据中的论文/专利/项目（同页签其他子区块仍在使用）
      const staticTag = profileTagData[net.tag] || {};
      map[net.tag] = {
        note: net.note ?? '',
        nodes,
        edges: Array.isArray(net.edges) ? net.edges : [],
        papers: staticTag.papers, patents: staticTag.patents, projects: staticTag.projects
      };
    }
    if (Object.keys(map).length) collabNetworkState.value = map;
  } catch (e) {
    console.warn('[talent-collab] API 不可用，使用内置演示数据:', e.message);
  }
}

/** 合作证据溯源：按节点反查教育/工作/论文/项目（子表 collab_key），弹 metric 弹窗展示 */
export async function showCollabEvidence(nodeKey, label, type) {
  let evidence = null;
  try {
    const resp = await fetch(`/api/talent/person/t${activeExpertId.value}/collab-evidence?node=${encodeURIComponent(nodeKey)}`);
    if (resp.ok) evidence = ((await resp.json()).data) ?? null;
  } catch (e) {
    console.warn('[collab-evidence] API 不可用:', e.message);
  }
  openDialog('metric', {
    subtype: 'collabEvidence',
    title: (label || nodeKey) + ' · 合作证据',
    payload: { label: label || nodeKey, type: type || '', tag: activeTag.value, evidence }
  });
}

/** 网络图事件委托：点击周边节点查看合作证据（中心节点不响应） */
export function handleNetworkClick(event) {
  const g = event.target.closest('[data-node-key]');
  if (!g || g.classList.contains('center')) return;
  const nodeKey = g.getAttribute('data-node-key');
  const net = activeProfileTagData.value;
  const node = (net.nodes || []).find((n) => n.id === nodeKey);
  if (node) showCollabEvidence(nodeKey, node.label, node.type);
}



/** 关联信息页签数据：topics 服务端 talent_topic_share 表优先覆盖（独立数据源，不从代表成果论文派生）；
 *  papersList 服务端 talent_relation_paper 表优先覆盖；papers/citations/hIndex/patents 服务端
 *  talent_academic_metric 表（一人一行统计性数据）优先覆盖；network/networkNote 暂保持静态 */
export const activeRelationTagData = computed(() => {
  const base = relationTagData[activeTag.value] || relationTagData['人工智能'];
  const srv = serverRelationGroups.value && serverRelationGroups.value[activeTag.value];
  const ts = serverTopicShares.value && serverTopicShares.value[activeTag.value];
  const am = serverAcademicMetric.value;
  if (!srv && !ts && !am) return base;
  return {
    ...base,
    ...(srv ? { papersList: srv.papersList } : {}),
    ...(ts ? { topics: ts } : {}),
    ...(am ? { papers: am.papers, citations: am.citations, hIndex: am.hIndex, patents: am.patents } : {})
  };
});

// 合作学者：服务端 talent_collaborator 表优先（聚合后按 paperCount 降序），
// 无数据/接口失败回退静态 relationScholarData[activeTag]
// 统一输出格式：[name, affiliation, "N篇", [tags]]
export const activeRelationScholars = computed(() => {
  if (serverCollaboratorList.value) {
    return serverCollaboratorList.value.map((s) => [
      s.name,
      s.affiliation,
      `${s.paperCount}篇`,
      s.tags
    ]);
  }
  return relationScholarData[activeTag.value] || relationScholarData['人工智能'];
});

// 关联信息代表成果：按主题筛选
export const filteredRelationPapers = computed(() => {
  const data = activeRelationTagData.value;
  if (!activeRelationTopic.value) return data.papersList;
  return data.papersList.filter((p) => p[5] === activeRelationTopic.value);
});

// 专家列表（带搜索 + 分类筛选）
export const filteredExperts = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();
  return Object.values(expertData).filter((e) => {
    const matchKeyword = !keyword ||
      e.name.toLowerCase().includes(keyword) ||
      e.organization.toLowerCase().includes(keyword) ||
      e.tags.join('').toLowerCase().includes(keyword);
    const matchCategory = activeFilterCategory.value === 'all' ||
      (activeFilterCategory.value === 'ai' && e.tags.includes('人工智能')) ||
      (activeFilterCategory.value === 'biotech' && e.tags.includes('生物技术')) ||
      (activeFilterCategory.value === 'newenergy' && e.tags.includes('新能源')) ||
      (activeFilterCategory.value === 'quantum' && e.tags.includes('量子科技'));
    return matchKeyword && matchCategory;
  });
});

// ===== 列表检索页派生状态 =====
// 后端已返回当前页数据，直接使用
export const pagedListRecords = computed(() => profileListCatalog.value);

// 总数用后端返回的 listTotal（前端只做展示，不再自己计算）

// ===== Setter / 事件处理 =====
/* 锚点导航：点击滚动到对应模块（模块纵向铺开，与原型渲染结果一致） */
export function switchModule(id) {
  activeModule.value = id;
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* scrollspy：滚动时高亮当前所在模块 */
const PROFILE_MODULE_IDS = ['basic-info', 'relation-info', 'behavior-info', 'psychology-info'];
if (typeof window !== 'undefined' && !window.__profileScrollSpyBound) {
  window.__profileScrollSpyBound = true;
  window.addEventListener('scroll', () => {
    let current = PROFILE_MODULE_IDS[0];
    for (const id of PROFILE_MODULE_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) current = id;
    }
    if (activeModule.value !== current) activeModule.value = current;
  }, { passive: true });
}

export function selectExpert(id) {
  activeExpertId.value = id;
}

export function selectProfileTag(tag) {
  activeTag.value = tag;
  // 切换标签时重置主题筛选，避免上一标签选中的主题在新标签不存在导致代表成果被过滤为空
  activeRelationTopic.value = null;
}

export function switchDetailTab(id) {
  activeDetailTab.value = id;
}

export function switchBehaviorTab(id) {
  activeBehaviorTab.value = id;
}

// 关联信息主题筛选：toggle，再次点击同一主题则关闭
export function selectRelationTopic(topicName) {
  activeRelationTopic.value = activeRelationTopic.value === topicName ? null : topicName;
}

// 迁徙详情展开：toggle，再次点击同一项则关闭
export function toggleMigration(id) {
  expandedMigrationId.value = expandedMigrationId.value === id ? null : id;
}

export function toggleMedia() {
  expandedMedia.value = !expandedMedia.value;
}

export function openDialog(type, data = null) {
  dialog.type = type;
  dialog.data = data;
}

export function closeDialog() {
  dialog.type = null;
  dialog.data = null;
}

// ===== 各类详情查看（打开 metricModal / companyModal / topicValueModal）=====
// 机构详情 -> metricModal
export function viewOrganization(name) {
  openDialog('metric', { subtype: 'organization', title: name + ' - 机构画像', payload: orgData[name] || {
    type: '知名机构', location: '中国', founded: '1990年', ranking: '国内一流',
    students: '10,000+', teachers: '1,000+', papers: '5,000篇',
    intro: '该领域的重要研究机构，在相关学科具有显著优势。',
    strengths: ['相关学科1', '相关学科2'], achievements: ['重要成果1', '重要成果2']
  }, name });
}

// 项目详情 -> projectModal
export function viewProject(name) {
  const detail = projectDetails[name];
  if (detail) openDialog('project', { title: name, payload: detail });
}

// 论文详情：原型里是跳转，这里改为 toast 提示
export function viewPaperDetail(name) {
  // 保持占位：本原型范围内不实现论文详情页跳转
  openDialog('metric', { subtype: 'paper', title: '论文详情', payload: { name } });
}

// 学者详情 -> metricModal
export function viewScholarDetail(name) {
  const data = scholarData[name] || { institution: '知名高校', title: '教授', papers: 100, citations: 8000, hIndex: 30, fields: ['人工智能'], email: 'scholar@example.com', phone: 'xxx-xxxx', intro: '该领域知名学者。' };
  openDialog('metric', { subtype: 'scholar', title: name + ' - 学术画像', payload: data, name });
}

// 学者头衔详情 -> metricModal
export function viewTitleDetail(name) {
  // 服务端 talent_title 行优先（name 为完整头衔名），静态 titleData（短键）回退，再通用默认
  const row = (serverTitleList.value || []).find((r) => r.name === name);
  if (row) {
    openDialog('metric', { subtype: 'title', title: name + ' 详情', payload: {
      awardDate: row.awardDate, awardingOrg: row.awardingOrg, description: row.description,
      honors: row.honors, eligibility: row.eligibility
    }, name });
    return;
  }
  const data = titleData[name] || { awardDate: '2022年', awardingOrg: '相关机构', description: '该学者获得的重要学术荣誉', honors: ['荣誉证书', '科研支持', '学术资源'], eligibility: '符合相应评审条件' };
  openDialog('metric', { subtype: 'title', title: name + ' 详情', payload: data, name });
}

// 关键学术指标详情 -> metricModal
export function viewAcademicDetail(type) {
  const content = academicDetailContents[type];
  if (content) openDialog('metric', { subtype: 'academic', title: content.title, payload: content });
}

// 奖项详情 -> metricModal（接收完整 award 对象，含 name/year/reason/icon/iconColor/awardingOrg/description/category）
export function viewAwardDetail(award) {
  openDialog('metric', { subtype: 'award', title: award.name + ' - 详情', payload: award });
}

// 意识形态详情 -> metricModal
export function viewIdeologyDetail(name) {
  const detail = ideologyDetails[name];
  if (detail) openDialog('metric', { subtype: 'ideology', title: detail.name + ' - ' + detail.score, payload: detail });
}

// 企业合作详情 -> companyModal
export function viewCompanyDetail(name) {
  const company = companyData[name];
  if (company) { openDialog('company', { title: '企业合作详情', payload: company, name }); return; }
  // 静态库无该企业时：用服务端行数据构造基础详情（无合作项目明细清单）
  const row = (companyServerState.value || []).find((r) => r.name === name);
  if (row) {
    openDialog('company', { title: '企业合作详情', payload: {
      icon: row.icon ?? 'fa-building', iconColor: row.iconColor ?? '#1890ff',
      projects: row.projects ?? 0, budget: (row.budgetWan ?? 0) + '万',
      patents: row.patents ?? 0, papers: row.papers ?? 0,
      cooperationYears: row.cooperationYears ?? ''
    }, name });
  }
}

// 里程碑详情 -> metricModal
export function showMilestoneDetail(name) {
  const detail = milestoneDetails[name];
  if (detail) { openDialog('metric', { subtype: 'milestone', title: name, payload: detail }); return; }
  // 静态库无该里程碑时：用服务端行数据构造基础详情
  const row = (milestoneState.value || []).find((r) => (r.name ?? '') === name);
  if (row) {
    openDialog('metric', { subtype: 'milestone', title: name, payload: {
      event: row.title ?? name, date: row.year ?? '', icon: 'fa-flag',
      contribution: `该里程碑来自服务端数据（影响力评分 ${row.score ?? 0}），暂无详细贡献描述。`,
      honor: '', events: [], tags: []
    } });
  }
}

// 合作指标详情 -> metricModal
export function showMetricDetail(name) {
  const data = metricDetailData[name];
  if (data) openDialog('metric', { subtype: 'metric', title: name + '详情', payload: data, name });
}

// 话题详情 -> topicValueModal
export function viewTopicDetail(name) {
  const detail = topicDetails[name];
  if (detail) openDialog('topicValue', { subtype: 'topic', title: name, payload: detail });
}

// 价值观详情 -> topicValueModal
export function viewValueDetail(name) {
  const detail = valueDetails[name];
  if (detail) openDialog('topicValue', { subtype: 'value', title: name, payload: detail });
}

// 编辑/删除专家（占位）
export function editExpert(id) {
  openDialog('metric', { subtype: 'edit', title: '编辑专家信息', payload: { id, name: expertData[id]?.name } });
}
export function deleteExpert(id) {
  openDialog('metric', { subtype: 'delete', title: '删除专家', payload: { id, name: expertData[id]?.name } });
}

// 搜索框 Enter 触发
export function handleExpertSearch(e) {
  if (e && e.key === 'Enter') {
    searchKeyword.value = e.target.value;
  }
}
export function filterExperts(category) {
  activeFilterCategory.value = category;
}

// ===== Router 引用（由组件 setup 时注入）=====
let _router = null;
export function setTalentRouter(router) {
  _router = router;
}

// ===== 列表检索页 setter =====
// 点击列表行进入详情：同步 activeExpertId，然后路由跳转
export function openProfileDetail(id) {
  const record = profileListCatalog.value.find((r) => r.id === String(id));
  const targetId = record ? String(record.id) : String(id);
  activeExpertId.value = Number(targetId) || 1;
  if (_router) {
    _router.push({ name: 'talentListDetail', params: { id: targetId } });
  }
}

// 详情页返回列表
export function closeProfileDetail() {
  if (_router) {
    _router.push({ name: 'talentList' });
  }
}

// 列表搜索 / 重置 / 翻页 / 筛选变化
export function handleListSearch() {
  currentPage.value = 1;
  fetchProfileList();
}
export function resetListFilters() {
  listKeyword.value = '';
  Object.keys(listFilters).forEach((k) => { listFilters[k] = ''; });
  currentPage.value = 1;
  fetchProfileList();
}
export function setListPage(page) {
  currentPage.value = page;
  fetchProfileList();
}
// ===== 学科级联 computed 选项 =====
// 一级学科：从 API 数据取
export const primaryOptions = computed(() => Object.keys(disciplineTree.value));
// 二级学科：根据已选一级学科动态计算
export const secondaryOptions = computed(() => {
  const p = listFilters.primary;
  const tree = disciplineTree.value;
  if (!p || !tree[p]) return [];
  return Object.keys(tree[p]);
});
// 三级学科：根据已选一级+二级动态计算
export const tertiaryOptions = computed(() => {
  const p = listFilters.primary;
  const s = listFilters.secondary;
  const tree = disciplineTree.value;
  if (!p || !s || !tree[p] || !tree[p][s]) return [];
  return Object.keys(tree[p][s]);
});
// 四级学科：根据已选一级+二级+三级动态计算
export const quaternaryOptions = computed(() => {
  const p = listFilters.primary;
  const s = listFilters.secondary;
  const t = listFilters.tertiary;
  const tree = disciplineTree.value;
  if (!p || !s || !t || !tree[p] || !tree[p][s] || !tree[p][s][t]) return [];
  return tree[p][s][t];
});

// 学科级联筛选变化处理：level 表示哪一级变化，需重置其下级
export function handleListFilterChange(level) {
  // 级联重置子级选择
  if (level === 'primary') {
    listFilters.secondary = '';
    listFilters.tertiary = '';
    listFilters.quaternary = '';
  } else if (level === 'secondary') {
    listFilters.tertiary = '';
    listFilters.quaternary = '';
  } else if (level === 'tertiary') {
    listFilters.quaternary = '';
  }
  currentPage.value = 1;
  fetchProfileList();
}

// ===== 网络图 / 饼图辅助函数 =====
// 生成合作网络 SVG markup（基础信息页 + 关联信息页共用）
export function buildNetworkSvg(data, viewBoxWidth = 700, viewBoxHeight = 360) {
  if (!data) return '';
  const nodeMap = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
  const edges = data.edges.map((edge) => {
    const from = nodeMap[edge[0]];
    const to = nodeMap[edge[1]];
    if (!from || !to) return '';
    return `<line class="network-edge" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke-width="${edge[2] / 2}"></line>`;
  }).join('');
  const nodes = data.nodes.map((node) => {
    const w = node.center ? 140 : 116;
    const cls = node.center ? 'center' : '';
    return `<g class="network-node-group ${cls}" data-node-key="${escapeText(node.id)}"><rect class="network-node ${cls}" x="${node.x - w / 2}" y="${node.y - 19}" width="${w}" height="38" rx="8"></rect><text class="network-node-text ${cls}" x="${node.x}" y="${node.y}">${escapeText(node.label)}</text></g>`;
  }).join('');
  return `<g>${edges}</g><g>${nodes}</g>`;
}

// 饼图扇区 path
export function polarToCartesian(center, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return { x: center + radius * Math.cos(angleInRadians), y: center + radius * Math.sin(angleInRadians) };
}
export function describeArc(startAngle, endAngle, center = 100, radius = 92) {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}
export function buildTopicPieSvg(topics) {
  // 按实际总和归一化角度，容忍数据总和≠100（四舍五入误差/未归一化数据）导致饼图缺口
  const total = topics.reduce((a, t) => a + (Number(t[1]) || 0), 0) || 1;
  let angle = 0;
  const paths = topics.map((topic) => {
    const startAngle = angle;
    angle += ((Number(topic[1]) || 0) / total) * 360;
    const d = describeArc(startAngle, angle);
    return `<path class="relation-pie-sector" data-topic="${escapeText(topic[0])}" fill="${topic[2]}" d="${d}"></path>`;
  }).join('');
  return `<svg viewBox="0 0 200 200" width="200" height="200" aria-label="研究主题分布饼图"><g>${paths}</g><circle cx="100" cy="100" r="38" fill="#fff"></circle><text x="100" y="97" text-anchor="middle" fill="#666" font-size="12">研究主题</text><text x="100" y="114" text-anchor="middle" fill="#999" font-size="10">点击筛选</text></svg>`;
}

// HTML 转义（用于 v-html 注入时避免 XSS）
function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ===== 默认导出（便于一次性引入）=====
export function useTalentProfile() {
  return {
    activeModule, activeExpertId, activeTag, activeDetailTab, activeBehaviorTab,
    activeRelationTopic, expandedMigrationId, expandedMedia, searchKeyword, dialog,
    activeExpert, activeProfileTagData, activeRelationTagData, activeRelationScholars,
    filteredRelationPapers, filteredExperts,
    switchModule, selectExpert, selectProfileTag, switchDetailTab, switchBehaviorTab,
    selectRelationTopic, toggleMigration, toggleMedia, openDialog, closeDialog,
    viewOrganization, viewProject, viewPaperDetail, viewScholarDetail, viewTitleDetail,
    viewAcademicDetail, viewAwardDetail, viewIdeologyDetail, viewCompanyDetail,
    showMilestoneDetail, showMetricDetail, viewTopicDetail, viewValueDetail,
    editExpert, deleteExpert, handleExpertSearch, filterExperts,
    buildNetworkSvg, polarToCartesian, describeArc, buildTopicPieSvg,
    // Router 注入
    setTalentRouter,
    // 列表检索页状态与 setter
    viewMode, currentPage, listKeyword, listFilters, listTotal,
    pagedListRecords, listTotalPages,
    openProfileDetail, closeProfileDetail, handleListSearch,
    resetListFilters, setListPage, handleListFilterChange,
    fetchProfileList, fetchDisciplineTree, fetchFilterOptions,
    fetchTalentCollaboration, handleNetworkClick, showCollabEvidence,
    listFilterOptions, primaryOptions, secondaryOptions, tertiaryOptions, quaternaryOptions,
    disciplineTree, profileListCatalog,
    // 直接暴露数据，便于模板访问非派生数据
    profileTagData, relationTagData, relationScholarData, expertData,
    projectDetails, titleData, scholarData, orgData, milestoneDetails,
    companyData, ideologyDetails, mediaReportsData, academicDetailContents,
    metricDetailData, topicDetails, valueDetails
  };
}
