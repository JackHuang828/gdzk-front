/* 科技人才库主状态（Vue 3 组合式 API）。
 * 迁移自原型脚本 talent-library-page.js 与 talent-classification-enhancements.js：
 * 分类树、列表筛选（级联下拉）、结果分页、人才池方案、批量入池、导出/分享、分类数量接口。
 * localStorage 键保持不变（gkxTalentFilterSchemes），兼容既有演示数据。 */
import { reactive, ref, computed, nextTick } from 'vue';
import { N } from '../data/talent/nodes';
import { people } from './talent-people';
import {
  primaryNames, secondaryNames, tertiaryNames, quaternaryNames, fieldOfSecondary,
} from './discipline-tree';
import { addToCurrentPool, setSelectedTalent } from './talent-pools';
import { useUiStore } from '../stores/ui';
import { fetchTalentTypeTree } from '../api/talent';

/* ===== 分类树与人-data ===== */
export const nodes = reactive(N);
export { people };

/* ===== 页面状态 ===== */
export const state = reactive({
  activeTab: 'library-main',
  step: 'class',
  nodeIndex: 0, // null 表示未选择分类节点
  expanded: true,
  sub: '',
  filters: {
    kw: '', primaryDiscipline: '', field: '', tertiary: '', quaternary: '',
    inst: '', out: '', project: '', type: '', region: '',
  },
  resultPage: 1,
  resultView: 'list', // list | card
  forcedResults: null, // 统计图表下钻时固定的人才集合，重新筛选后清空
});

/* 已勾选人才（跨主列表 / TOP100 共用） */
export const picked = reactive(new Set());

export const RESULT_PAGE_SIZE = 5;

/* ===== 页内 toast（2600ms，与原型一致） ===== */
export const toastState = reactive({ message: '', visible: false });
let toastTimer = null;
export function toast(message) {
  toastState.message = message;
  toastState.visible = true;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastState.visible = false; }, 2600);
}

/* ===== 弹窗宿主状态 ===== */
export const dialog = reactive({ type: null, data: {} });
export function openDialog(type, data = {}) {
  dialog.type = type;
  dialog.data = data;
}
export function closeDialog() {
  dialog.type = null;
  dialog.data = {};
}

/* ===== 分类树 ===== */
export const activeNode = computed(() => (state.nodeIndex == null ? null : nodes[state.nodeIndex]));

export function chooseNode(index) {
  if (state.nodeIndex === index) {
    state.expanded = !state.expanded;
    toast(state.expanded ? '已展开“' + nodes[index][0] + '”的子节点。' : '已收起“' + nodes[index][0] + '”的子节点。');
    return;
  }
  state.nodeIndex = index;
  state.sub = '';
  state.expanded = true;
  applyFilters();
  toast('已聚焦“' + nodes[index][0] + '”，可继续选择子节点。');
}

export function clearNodeSelection() {
  if (state.nodeIndex == null) return;
  state.nodeIndex = null;
  state.sub = '';
  state.expanded = false;
  applyFilters();
  toast('已清除节点选择。');
}

export function pickSub(index) {
  const node = activeNode.value;
  if (!node) return;
  const name = node[3][index];
  state.sub = name;
  // 子节点语义带入筛选（与原型 picksub 副作用一致）
  if (/青年/.test(name)) state.filters.type = '青年人才';
  else if (/领军|带头|首席/.test(name)) state.filters.type = '领军人才';
  else if (/重点研发/.test(name)) state.filters.project = '国家重点研发计划';
  else if (/自然科学基金/.test(name)) state.filters.project = '国家自然科学基金';
  else if (/重大工程/.test(name)) state.filters.project = '重大工程项目';
  applyFilters();
  go('filter');
  toast('已将“' + name + '”带入列表筛选。');
}

/* ===== 级联筛选下拉（原 setupLinkedDropdowns 的动态选项） ===== */
export const filterOptions = computed(() => {
  const f = state.filters;
  const secondary = secondaryNames(f.primaryDiscipline || null);
  const tertiary = f.field ? tertiaryNames(f.field) : [];
  const quaternary = f.tertiary ? quaternaryNames(f.tertiary) : [];
  const mapped = fieldOfSecondary(f.field) || f.field;
  const fieldPeople = mapped ? people.value.filter((p) => p.field === mapped) : people.value;
  const inst = fieldPeople.map((p) => p.institution).filter((v, i, list) => list.indexOf(v) === i);
  const instPeople = f.inst ? people.value.filter((p) => p.institution === f.inst) : people.value;
  const project = instPeople.map((p) => p.project).filter((v, i, list) => list.indexOf(v) === i);
  const out = instPeople.map((p) => p.outcome).filter((v, i, list) => list.indexOf(v) === i);
  return {
    primary: primaryNames(),
    secondary, tertiary, quaternary, inst, project, out,
  };
});

/* 上游字段变更时清空下游选项值（与原型重建下拉选项的行为一致） */
const FILTER_CASCADE = {
  primaryDiscipline: ['field', 'tertiary', 'quaternary', 'inst', 'out', 'project'],
  field: ['tertiary', 'quaternary', 'inst', 'out', 'project'],
  tertiary: ['quaternary'],
  inst: ['out', 'project'],
};

export function setFilter(key, value) {
  state.filters[key] = value;
  (FILTER_CASCADE[key] || []).forEach((downstream) => { state.filters[downstream] = ''; });
  applyFilters();
}

/* 重新执行筛选：清空图表下钻固定集合并回到第一页 */
export function applyFilters() {
  state.forcedResults = null;
  state.resultPage = 1;
}

export function resetFilters() {
  Object.keys(state.filters).forEach((key) => { state.filters[key] = ''; });
  state.sub = '';
  applyFilters();
  toast('已重置筛选条件，保留当前人才分类范围。');
}

/* ===== 检索结果与分页 ===== */
export const results = computed(() => {
  if (state.forcedResults) return state.forcedResults;
  const k = state.filters.kw.toLowerCase();
  const f = state.filters;
  return people.value.filter((p) =>
    (!k || Object.values(p).join(' ').toLowerCase().includes(k)) &&
    (!f.field || p.secondary === f.field) &&
    (!f.tertiary || p.tertiary === f.tertiary) &&
    (!f.quaternary || p.quaternary === f.quaternary) &&
    (!f.inst || p.institution === f.inst) &&
    (!f.out || p.outcome === f.out) &&
    (!f.type || p.type === f.type) &&
    (!f.region || p.region === f.region) &&
    (!f.project || p.project === f.project));
});

export const resultTotalPages = computed(() => Math.max(1, Math.ceil(results.value.length / RESULT_PAGE_SIZE)));

export const pagedResults = computed(() => {
  const page = Math.max(1, Math.min(resultTotalPages.value, state.resultPage));
  return results.value.slice((page - 1) * RESULT_PAGE_SIZE, page * RESULT_PAGE_SIZE);
});

export function changeResultPage(page) {
  state.resultPage = Math.max(1, Math.min(resultTotalPages.value, Number(page) || 1));
}

/* 统计图表“筛选”下钻：固定结果集合并跳回人才清单 */
export function overrideResults(list) {
  state.forcedResults = list;
  state.resultPage = 1;
}

/* ===== 人才池方案（主筛选） ===== */
const SCHEME_KEY = 'gkxTalentFilterSchemes';

function readSchemes() {
  try {
    const stored = JSON.parse(localStorage.getItem(SCHEME_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter((item) => item && item.id && item.name && item.filters) : [];
  } catch (error) {
    return [];
  }
}

export const schemes = ref(readSchemes());

function persistSchemes() {
  localStorage.setItem(SCHEME_KEY, JSON.stringify(schemes.value));
}

export const hasSchemeCondition = computed(() =>
  Object.values(state.filters).some((value) => String(value || '').trim()));

export function saveScheme(name) {
  schemes.value.unshift({
    id: 'scheme-' + Date.now(),
    name,
    createdAt: new Date().toLocaleString('zh-CN'),
    filters: { ...state.filters },
  });
  persistSchemes();
  toast('人才池方案已保存。');
}

export function deleteScheme(id) {
  schemes.value = schemes.value.filter((item) => item.id !== id);
  persistSchemes();
  toast('人才池方案已删除。');
}

export function applyScheme(id) {
  const scheme = schemes.value.find((item) => item.id === id);
  if (!scheme) return;
  Object.keys(state.filters).forEach((key) => {
    state.filters[key] = scheme.filters[key] || '';
  });
  applyFilters();
  go('filter');
  toast('已恢复人才池方案“' + scheme.name + '”。');
}

/* ===== 结果行动作 ===== */
export function selectTalent(id, on) {
  if (on) picked.add(id);
  else picked.delete(id);
}

export function addTalentToCurrentPool(id) {
  const person = people.value.find((x) => x.id === id);
  if (!person) return;
  const result = addToCurrentPool(person);
  toast(result.added ? '已将 ' + person.name + ' 加入当前人才池。' : person.name + ' 已在当前人才池中。');
}

export function openTalentPortrait(id) {
  const person = people.value.find((x) => x.id === id);
  if (!person) return;
  setSelectedTalent(person);
  useUiStore().showToast('科技人才画像页面暂未包含在本期原型范围内');
}

export function openDisciplineBlankTab() {
  useUiStore().showToast('学科专题页面暂未包含在本期原型范围内');
}

export function openBatchLibraryChooser() {
  if (!picked.size) {
    toast('请先勾选需要加入的人才。');
    return;
  }
  openDialog('batchLibraryChooser', { ids: [...picked] });
}

/* 步骤导航（滚动到筛选区 / 结果区） */
export function go(x) {
  state.step = x;
  nextTick(() => {
    const target = document.getElementById(x);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function switchTalentLibraryTab(tab) {
  state.activeTab = tab;
}

/* ===== 导出与分享 ===== */
export function downloadResultsCsv() {
  const rows = results.value;
  const content =
    '\ufeff姓名,机构,学科领域,人才类别,项目经历,代表性成果\n' +
    rows
      .map((p) =>
        [p.name, p.institution, p.field, p.type, p.projectDetail || p.project, p.outcomeDetail || p.outcome]
          .map((x) => '"' + x + '"')
          .join(','))
      .join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: 'text/csv' }));
  a.download = '人才分类与检索结果.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 500);
  toast('已下载 ' + rows.length + ' 位人才的检索结果。');
}

export function buildShareLink() {
  let url;
  try {
    url = new URL(window.location.href);
  } catch (error) {
    return window.location.href;
  }
  const params = new URLSearchParams();
  if (activeNode.value) params.set('node', activeNode.value[0]);
  if (state.sub) params.set('sub', state.sub);
  ['kw', 'field', 'tertiary', 'quaternary', 'inst', 'out', 'type', 'region', 'project'].forEach((key) => {
    if (state.filters[key]) params.set(key, state.filters[key]);
  });
  params.set('module', 'filter');
  url.search = params.toString();
  url.hash = '';
  return url.toString();
}

export function copyShareLink(input) {
  if (!input) return;
  const fallback = () => {
    input.focus();
    input.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) { /* 忽略 */ }
    toast(copied ? '链接已复制。' : '请手动复制链接。');
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(input.value).then(() => toast('链接已复制。')).catch(fallback);
  } else {
    fallback();
  }
}

/* ===== 分类数量接口 =====
 * 默认请求 blade-zwrite 后端接口（dev 由 vite 代理 /api -> 127.0.0.1:8107）；
 * 失败时回退打包内置的 mock 数据；也可覆盖 window.__TALENT_API_COUNTS__ 指定接口地址。 */
const API_COUNTS_URL = '/api/talent/category-counts';

function applyCounts(list) {
  if (!Array.isArray(list) || !list.length) return false;
  const map = {};
  list.forEach((item) => {
    if (item && item.category) map[item.category] = Number(item.count) || 0;
  });
  let changed = false;
  nodes.forEach((n) => {
    if (map[n[0]] != null) { n[2] = map[n[0]]; changed = true; }
  });
  return changed;
}

export async function fetchCategoryCounts() {
  const endpoint = window.__TALENT_API_COUNTS__ || API_COUNTS_URL;
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (!applyCounts((json && json.data) || json)) throw new Error('数据为空');
  } catch (e) {
    // 后端不可用时：nodes.js 静态数据自带默认数量，无需额外请求
    console.warn('[TalentLibrary] 后端分类数量获取失败，使用静态默认值:', e);
  }
}

/* ===== 领域人才分类树（talent_type 表）=====
 * 默认请求 blade-zwrite 后端 GET /api/talent/type/tree（dev 由 vite 代理 /api -> 127.0.0.1:8107）；
 * 失败时保留打包内置的静态分类树（data/talent/nodes.js）。 */
export async function fetchTalentTypes() {
  try {
    const tree = await fetchTalentTypeTree();
    if (!Array.isArray(tree) || !tree.length) throw new Error('数据为空');
    const mapped = tree.map((item) => [
      item.name || '未命名分类',
      item.description || '',
      Number(item.talentCount) || 0,
      (item.children || []).map((child) => child.name),
    ]);
    nodes.splice(0, nodes.length, ...mapped);
    // 分类树整体替换后重置选中状态，避免索引/叶子越界
    state.nodeIndex = 0;
    state.sub = '';
  } catch (e) {
    console.warn('[TalentLibrary] 领域人才分类获取失败，使用静态数据:', e);
  }
}
