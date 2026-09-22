/* 人才TOP100 自定义筛选建池（Vue 3 组合式 API）。
 * 迁移自原型脚本 talent-library-page.js 的 topCustom 系列逻辑：
 * 手风琴筛选组、区间条件、筛选标签、方案保存（gkxTop100TalentPoolSchemes）与结果匹配。 */
import { reactive, ref, computed } from 'vue';
import { people } from './talent-people';
import { TOP_FILTER_GROUPS, TOP_RECOMMENDED_SCHEMES, top100MatchingAttrs, top100NumericMetric } from '../data/talent/top100-filters';
import { toast } from './talent-library';

export { TOP_FILTER_GROUPS, TOP_RECOMMENDED_SCHEMES };

const RANGE_KEYS = ['academicImpact', 'patentCount', 'paperCount'];
const STORAGE_KEY = 'gkxTop100TalentPoolSchemes';

/* 筛选条件值与元信息（label / 类型） */
export const topConditions = reactive({});
const conditions = topConditions;
const conditionMeta = {};
TOP_FILTER_GROUPS.forEach((group) => {
  group.fields.forEach(([key, label, options, type]) => {
    conditions[key] = type === 'range' ? { min: '', max: '' } : '';
    conditionMeta[key] = { label, type: type || 'select', options: options || [] };
  });
});

/* 手风琴展开状态（默认仅第一组展开） */
export const topOpenGroups = reactive(TOP_FILTER_GROUPS.map((group) => !!group.open));
export function toggleTopGroup(index) {
  topOpenGroups[index] = !topOpenGroups[index];
}

/* 结果视图：card | list */
export const topView = ref('card');
export function switchTopView(view) {
  topView.value = view === 'list' ? 'list' : 'card';
}

/* ===== 方案存取 ===== */
function readSchemes() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter((item) => item && item.id && item.name && item.filters) : [];
  } catch (error) {
    return [];
  }
}

export const topSchemes = ref(readSchemes());

function persistSchemes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topSchemes.value));
}

export function currentTopFilters() {
  const filters = {};
  Object.entries(conditions).forEach(([key, value]) => {
    if (conditionMeta[key].type === 'range') {
      if (value && (value.min || value.max)) filters[key] = { min: value.min || '', max: value.max || '' };
    } else if (value) {
      filters[key] = value;
    }
  });
  return filters;
}

export function saveTopScheme(name) {
  topSchemes.value.unshift({ id: 'top100-scheme-' + Date.now(), name, filters: currentTopFilters() });
  persistSchemes();
  toast('人才池方案已保存。');
}

export function deleteTopScheme(id) {
  topSchemes.value = topSchemes.value.filter((item) => item.id !== id);
  persistSchemes();
  toast('人才池方案已删除。');
}

export function clearTopFilters() {
  Object.keys(conditions).forEach((key) => {
    conditions[key] = conditionMeta[key].type === 'range' ? { min: '', max: '' } : '';
  });
}

export function applyTopScheme(scheme, message) {
  if (!scheme || !scheme.filters) return;
  clearTopFilters();
  Object.entries(scheme.filters).forEach(([key, value]) => {
    if (!conditionMeta[key]) return;
    if (conditionMeta[key].type === 'range') {
      conditions[key] = { min: value.min || '', max: value.max || '' };
    } else {
      conditions[key] = value;
    }
  });
  toast(message || '已应用人才池方案。');
}

/* ===== 已选条件标签 ===== */
export const topFilterTags = computed(() =>
  Object.entries(conditions)
    .filter(([, value]) => (typeof value === 'object' ? value.min || value.max : value))
    .map(([key, value]) =>
      typeof value === 'object'
        ? conditionMeta[key].label + '：' + (value.min || '不限') + '—' + (value.max || '不限')
        : conditionMeta[key].label + '：' + value));

/* ===== 结果匹配 ===== */
function matchesTop100(person) {
  const matching = top100MatchingAttrs(person);
  const directlyMatched = Object.entries(conditions).every(([key, condition]) => {
    if (!condition || typeof condition === 'object') return true;
    return !Object.prototype.hasOwnProperty.call(matching, key) || matching[key] === condition;
  });
  const rangesMatched = RANGE_KEYS.every((key) => {
    const range = conditions[key];
    if (!range || (!range.min && !range.max)) return true;
    const value = top100NumericMetric(person, key);
    return (!range.min || value >= Number(range.min)) && (!range.max || value <= Number(range.max));
  });
  return directlyMatched && rangesMatched;
}

export const topResultPeople = computed(() => people.value.filter(matchesTop100));

export const topFilterCount = computed(() => topFilterTags.value.length);
