/* 科技人才智慧服务 · 跨页演示状态 + 专属人才池。
 * 迁移自原 talent-service-flow.js（gkxTalentServiceDemoState）
 * 与 talent-library-pool.js（gkxMyTalentLibraries 演示数据初始化），
 * 跨页演示状态存储键保持不变以兼容既有演示数据。
 * 人才池列表改为请求 blade-zwrite 后端接口（/api/talent/pool/**，dev 由 vite 代理），
 * 池内人才以 ID 列表存储于服务端，成员明细由 people 主数据按 pid 解析。 */
import { reactive, ref, computed } from 'vue';
import { people } from './talent-people';

const SERVICE_KEY = 'gkxTalentServiceDemoState';

const POOL_API = '/api/talent/pool';
const POTENTIAL_API = '/api/talent/potential';

/* 当前用户标识（预留字段：接入登录体系后替换为真实用户，人才池与潜力推荐均按用户隔离） */
const CURRENT_USER_ID = 'demo';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/* ===== 当前人才池（跨页演示状态，本地存储） ===== */
const SERVICE_DEFAULTS = {
  currentPool: { id: 1, name: '人工智能前沿研究团队', members: [] },
  selectedTalent: null,
  scope: null,
  subscriptions: [],
};

function readServiceState() {
  try {
    const stored = JSON.parse(localStorage.getItem(SERVICE_KEY) || 'null');
    if (!stored) return clone(SERVICE_DEFAULTS);
    stored.currentPool = stored.currentPool || clone(SERVICE_DEFAULTS.currentPool);
    stored.currentPool.members = Array.isArray(stored.currentPool.members) ? stored.currentPool.members : [];
    stored.subscriptions = Array.isArray(stored.subscriptions) ? stored.subscriptions : [];
    return stored;
  } catch (error) {
    return clone(SERVICE_DEFAULTS);
  }
}

export const serviceState = reactive(readServiceState());

function persistService() {
  localStorage.setItem(SERVICE_KEY, JSON.stringify(serviceState));
}

function normaliseTalent(talent) {
  return {
    id: String(talent.id || talent.name),
    name: talent.name || '当前人才',
    institution: talent.institution || '所属机构待补充',
    title: talent.title || '研究员',
    field: talent.field || talent.researchArea || (talent.tags && talent.tags[0]) || '人工智能',
    addedAt: new Date().toLocaleDateString('zh-CN'),
  };
}

export function addToCurrentPool(talent) {
  const person = normaliseTalent(talent || {});
  const exists = serviceState.currentPool.members.some((member) => member.id === person.id || member.name === person.name);
  if (!exists) serviceState.currentPool.members.unshift(person);
  serviceState.selectedTalent = person;
  persistService();
  return { talent: person, added: !exists, count: serviceState.currentPool.members.length };
}

export function removeFromCurrentPool(id) {
  const before = serviceState.currentPool.members.length;
  serviceState.currentPool.members = serviceState.currentPool.members.filter((member) => member.id !== String(id) && member.name !== id);
  persistService();
  return { removed: serviceState.currentPool.members.length < before, count: serviceState.currentPool.members.length };
}

export function setSelectedTalent(talent) {
  serviceState.selectedTalent = normaliseTalent(talent || {});
  persistService();
  return serviceState.selectedTalent;
}

/* ===== 专属人才池列表（服务端数据） =====
 * storedPools 结构：[{ id: '3', name, desc, talentIds: [1,3,5] }]，id 为后端主键字符串 */
export const storedPools = ref([]);

export async function fetchPools() {
  try {
    const res = await fetch(`${POOL_API}/list?userId=${encodeURIComponent(CURRENT_USER_ID)}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const list = (json && json.data) || [];
    if (!Array.isArray(list)) throw new Error('数据为空');
    storedPools.value = list.map((pool) => ({
      id: String(pool.id),
      name: pool.name || '未命名人才池',
      desc: pool.description || '',
      talentIds: Array.isArray(pool.talentIdList) ? pool.talentIdList : [],
    }));
  } catch (error) {
    console.warn('[TalentLibrary] 人才池列表接口获取失败:', error);
  }
}

/* 雪花 ID 超出 JS 安全整数范围，所有 ID 全程保持原始值（字符串）传递与比较，严禁 Number() 转换 */
function sameId(a, b) {
  return String(a) === String(b);
}

/* 人才 pid：优取 pid（后端主键），静态兜底数据从 t 编号解析，最后按 id 反查 people */
function toTalentPid(person) {
  if (!person) return null;
  if (person.pid != null) return person.pid;
  const fromCode = /^t(\d+)$/.exec(String(person.id || ''));
  if (fromCode) return Number(fromCode[1]);
  const found = people.value.find((item) => item.id === person.id);
  return found && found.pid != null ? found.pid : null;
}

function findPersonByPid(pid) {
  return people.value.find((person) => sameId(person.pid, pid)) || null;
}

/* talentIds → people 成员对象（响应式：people 异步加载完成后自动出现） */
function resolveMembers(talentIds) {
  return (talentIds || []).map((pid) => findPersonByPid(pid)).filter(Boolean);
}

/* 「当前人才池」+ 服务端已保存人才池 */
export const exclusivePools = computed(() => {
  const current = serviceState.currentPool;
  return [
    { id: 'current', name: current.name || '当前专属人才池', desc: '当前使用的人才池', members: current.members || [] },
    ...storedPools.value.map((pool) => ({ ...pool, members: resolveMembers(pool.talentIds) })),
  ];
});

export const activeExclusivePoolId = ref('');

export const activeExclusivePool = computed(() => {
  const pools = exclusivePools.value;
  return pools.find((pool) => pool.id === activeExclusivePoolId.value) || pools.find((pool) => (pool.members || []).length) || pools[0];
});

export const poolKeyword = ref('');

export const visibleExclusivePools = computed(() => {
  const keyword = poolKeyword.value.trim().toLowerCase();
  return exclusivePools.value.filter((item) => !keyword || (item.name + ' ' + (item.desc || '')).toLowerCase().includes(keyword));
});

/* ===== 潜力人才推荐（服务端数据，失败回退静态演示数据） =====
 * 服务端行结构：{ id: 雪花主键, talentCode, talentName, reason, recStatus }
 * 前端行结构：{ id: talentCode（与 people.id 匹配）, rowId: 服务端主键字符串, reason, status }
 * rowId 为雪花 ID，全程字符串传递，严禁 Number() 转换 */
const POTENTIAL_FALLBACK = [
  { id: 't2', reason: '自然语言处理方向近期高质量论文产出稳定，适合纳入前沿研究人才池。', status: 'new' },
  { id: 't6', reason: 'AI for Science 方向承担重点项目，研究活跃度较高。', status: 'new' },
  { id: 't7', reason: '固态电池材料方向具备专利积累与工程化潜力。', status: 'new' },
];

export const potentialRecommendations = ref(clone(POTENTIAL_FALLBACK));

export async function fetchPotentialRecommendations() {
  try {
    const res = await fetch(`${POTENTIAL_API}/list?userId=${encodeURIComponent(CURRENT_USER_ID)}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const list = (json && json.data) || [];
    if (!Array.isArray(list)) throw new Error('数据为空');
    potentialRecommendations.value = list.map((row) => ({
      id: row.talentCode || String(row.talentId),
      rowId: String(row.id),
      reason: row.reason || '',
      status: row.recStatus || 'new',
    }));
  } catch (error) {
    console.warn('[TalentLibrary] 潜力人才推荐接口获取失败，使用静态演示数据:', error);
    if (!potentialRecommendations.value.length) potentialRecommendations.value = clone(POTENTIAL_FALLBACK);
  }
}

export const potentialCount = computed(() => potentialRecommendations.value.filter((item) => item.status === 'new').length);

/* 自动更新开关按人才池记忆（会话内） */
const autoUpdates = reactive({});

export function isAutoUpdate(poolId) {
  return autoUpdates[poolId] !== false;
}

export function setAutoUpdate(poolId, checked) {
  autoUpdates[poolId] = checked;
}

/* ===== 人才池操作（全部落库到服务端） ===== */
export async function createExclusivePool(name, desc) {
  const created = await apiCreatePool(name, desc);
  storedPools.value.unshift(created);
  activeExclusivePoolId.value = created.id;
  return created;
}

export async function createPoolWithMembers(name, desc, members) {
  const created = await apiCreatePool(name, desc);
  storedPools.value.unshift(created);
  await addMembersToPool(created.id, members || []);
  return created;
}

export async function removeExclusivePool(id) {
  try {
    await postJson(POOL_API + '/remove', { id });
  } catch (error) {
    console.warn('[TalentLibrary] 删除人才池失败:', error);
    return;
  }
  storedPools.value = storedPools.value.filter((pool) => !sameId(pool.id, id));
  if (sameId(activeExclusivePoolId.value, id)) activeExclusivePoolId.value = '';
}

export async function removeExclusiveMember(personId) {
  const pool = activeExclusivePool.value;
  if (!pool) return { removed: false };
  if (pool.id === 'current') return removeFromCurrentPool(personId);
  const member = (pool.members || []).find((person) => person.id === personId);
  const talentId = toTalentPid(member) ?? toTalentPid({ id: personId });
  if (talentId == null) return { removed: false };
  try {
    await postJson(POOL_API + '/member/remove', { poolId: pool.id, talentId });
  } catch (error) {
    console.warn('[TalentLibrary] 移除池内人才失败:', error);
    return { removed: false };
  }
  const target = storedPools.value.find((item) => sameId(item.id, pool.id));
  if (target) target.talentIds = (target.talentIds || []).filter((pid) => !sameId(pid, talentId));
  return { removed: true };
}

export async function addMembersToPool(poolId, members) {
  if (poolId === 'current') {
    members.forEach((person) => addToCurrentPool(person));
    return;
  }
  const talentIds = (members || []).map(toTalentPid).filter((pid) => pid != null);
  const uniqueTalentIds = talentIds.filter((pid, index) => !talentIds.slice(0, index).some((exist) => sameId(exist, pid)));
  if (!uniqueTalentIds.length) return;
  try {
    await postJson(POOL_API + '/member/add', { poolId, talentIds: uniqueTalentIds });
  } catch (error) {
    console.warn('[TalentLibrary] 添加池内人才失败:', error);
    return;
  }
  const target = storedPools.value.find((item) => sameId(item.id, poolId));
  if (target) {
    const merged = [...(target.talentIds || [])];
    uniqueTalentIds.forEach((pid) => {
      if (!merged.some((exist) => sameId(exist, pid))) merged.push(pid);
    });
    target.talentIds = merged;
  }
}

export async function addPotentialTalentToActivePool(id) {
  const recommendation = potentialRecommendations.value.find((item) => item.id === id);
  const person = people.value.find((item) => item.id === id);
  if (!recommendation || !person || recommendation.status !== 'new') return;
  const pool = activeExclusivePool.value;
  if (pool.id === 'current') {
    addToCurrentPool(person);
  } else {
    await addMembersToPool(pool.id, [person]);
  }
  recommendation.status = 'joined';
  if (recommendation.rowId) {
    try {
      await postJson(POTENTIAL_API + '/join', { id: recommendation.rowId });
    } catch (error) {
      console.warn('[TalentLibrary] 潜力推荐标记已加入失败:', error);
    }
  }
}

export async function ignorePotentialTalent(id) {
  const recommendation = potentialRecommendations.value.find((item) => item.id === id);
  if (!recommendation) return;
  if (recommendation.rowId) {
    try {
      await postJson(POTENTIAL_API + '/ignore', { id: recommendation.rowId });
    } catch (error) {
      console.warn('[TalentLibrary] 潜力推荐标记已忽略失败:', error);
      return;
    }
  }
  const index = potentialRecommendations.value.findIndex((item) => item.id === id);
  if (index >= 0) potentialRecommendations.value.splice(index, 1);
}

/* ===== 接口工具 ===== */
async function apiCreatePool(name, desc) {
  const json = await postJson(POOL_API + '/create', { userId: CURRENT_USER_ID, name, description: desc });
  const pool = (json && json.data) || {};
  return { id: String(pool.id), name: pool.name || name, desc: pool.description || desc, talentIds: [] };
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}
