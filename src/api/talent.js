/* ===== 人才模块 API =====
 * 所有与 /api/talent/** 相关的后端接口调用都集中在这里。
 * hooks 层只负责状态管理 + 静态回退逻辑，真正的网络请求下沉到 api 层。
 */
import { get, post } from './http';

/** 人才主数据（全量列表） */
export function fetchTalentPeopleList() {
  return get('/api/talent/person/list');
}

/** 人才列表（服务端分页 + 关键词 + 9 个筛选） */
export function fetchTalentPersonPage(params) {
  return get('/api/talent/person/page', params);
}

/** 人才基本信息（含研究方向标签） */
export function fetchTalentPersonBasic(code) {
  return get(`/api/talent/person/${code}/basic`);
}

/** 人才合作网络（按标签） */
export function fetchTalentCollaboration(code) {
  return get(`/api/talent/person/${code}/collaboration`);
}

/** 学科分类树 */
export function fetchDisciplineTree() {
  return get('/api/talent/discipline/tree');
}

/** 人才分类树 */
export function fetchTalentTypeTree() {
  return get('/api/talent/type/tree');
}

/** 列表筛选下拉选项（机构/成果/项目/人才类别/地域） */
export function fetchFilterOptions() {
  return get('/api/talent/filter-options');
}

/** 人才专属池列表 */
export function fetchTalentPools() {
  return get('/api/talent/pool/list');
}

/** 人才专属池成员 */
export function fetchPoolMembers(poolId) {
  return get(`/api/talent/pool/${poolId}/members`);
}

/** 潜力人才推荐 */
export function fetchPotentialRecommendations() {
  return get('/api/talent/potential/recommend');
}
