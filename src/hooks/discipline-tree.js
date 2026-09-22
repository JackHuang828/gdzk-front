/* ===== 学科分类树 =====
 * 优先请求 blade-zwrite 后端接口（/api/talent/discipline/tree，dev 由 vite 代理）；
 * 失败时回退 taxonomy.js 静态数据。树结构统一为：
 * [{ id, parentId, level, name, field, sort, children: [...] }]，level 1~4。 */
import { ref } from 'vue';
import {
  disciplineTree as staticDisciplineTree,
  tertiaryTree as staticTertiaryTree,
  quaternaryTree as staticQuaternaryTree,
  secondaryToField as staticSecondaryToField,
} from '../data/talent/taxonomy';
import { fetchDisciplineTree as fetchDisciplineTreeApi } from '../api/talent';

export const disciplineTree = ref(buildFromStatic());

export async function fetchDisciplineTree() {
  try {
    const list = await fetchDisciplineTreeApi();
    if (!Array.isArray(list) || !list.length) throw new Error('数据为空');
    disciplineTree.value = list;
  } catch (e) {
    console.warn('[TalentLibrary] 学科树接口获取失败，回退静态数据:', e);
  }
}

/* 从 taxonomy.js 静态映射构建同构树（接口不可用时的兜底） */
function buildFromStatic() {
  let autoId = 1;
  const makeNode = (name, level, parentId, field) => ({ id: autoId++, parentId, level, name, field: field || '', sort: 0, children: [] });
  return Object.keys(staticDisciplineTree).map((pName, pi) => {
    const pNode = makeNode(pName, 1, 0, '');
    pNode.sort = pi + 1;
    staticDisciplineTree[pName].forEach((sName) => {
      const sNode = makeNode(sName, 2, pNode.id, staticSecondaryToField[sName] || '');
      pNode.children.push(sNode);
      (staticTertiaryTree[sName] || []).forEach((tName) => {
        const tNode = makeNode(tName, 3, sNode.id, '');
        sNode.children.push(tNode);
        (staticQuaternaryTree[tName] || []).forEach((qName) => {
          tNode.children.push(makeNode(qName, 4, tNode.id, ''));
        });
      });
    });
    return pNode;
  });
}

function secondaryOf(primaryName) {
  const list = disciplineTree.value;
  if (!primaryName) return list.reduce((all, p) => all.concat(p.children || []), []);
  const p = list.find((node) => node.name === primaryName);
  return (p && p.children) || [];
}

/* 一级学科列表 */
export function primaryNames() {
  return disciplineTree.value.map((node) => node.name);
}

/* 二级学科列表：传一级名称返回其子级，不传返回全部二级 */
export function secondaryNames(primaryName) {
  return secondaryOf(primaryName).map((node) => node.name);
}

/* 三级学科列表（按二级名称） */
export function tertiaryNames(secondaryName) {
  const s = secondaryOf('').find((node) => node.name === secondaryName);
  return (s && s.children) ? s.children.map((node) => node.name) : [];
}

/* 四级学科列表（按三级名称） */
export function quaternaryNames(tertiaryName) {
  for (const p of disciplineTree.value) {
    for (const s of p.children || []) {
      const t = (s.children || []).find((node) => node.name === tertiaryName);
      if (t) return (t.children || []).map((node) => node.name);
    }
  }
  return [];
}

/* 二级学科所属领域（field），无则返回空串 */
export function fieldOfSecondary(secondaryName) {
  const s = secondaryOf('').find((node) => node.name === secondaryName);
  return (s && s.field) || '';
}
