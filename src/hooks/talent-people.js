/* ===== 科技人才主数据 =====
 * 优先请求 blade-zwrite 后端接口（/api/talent/person/list）；
 * 失败时回退 people.js 静态数据。返回数组结构与 people.js 完全一致：
 * [{ id, name, institution, title, field, type, region, project, outcome, impact, tertiary, secondary, projectDetail, outcomeDetail, quaternary }] */
import { ref } from 'vue';
import { P as staticPeople } from '../data/talent/people.js';
import { fetchTalentPeopleList } from '../api/talent';

export const people = ref([...staticPeople]);

export async function fetchTalentPeople() {
  try {
    const list = await fetchTalentPeopleList();
    if (!Array.isArray(list) || !list.length) throw new Error('数据为空');
    // 后端 id 为 bigint 主键，code 存放前端原始编号（t1-t7）；映射回 id 保持兼容
    // pid 保留后端数字主键，供人才池成员增删等接口使用
    // 后端 institution 为 BIGINT 外键 ID，institutionName 是关联的机构名称；
    // 前端所有组件都把 institution 当作机构名称字符串使用，这里合并覆盖
    people.value = list.map((p) => ({
      ...p,
      id: p.code || String(p.id),
      pid: p.id,
      institution: p.institutionName || p.institution || '',
      impact: typeof p.impact === 'object' && p.impact !== null
        ? String(p.impact)
        : p.impact == null ? '' : String(p.impact),
    }));
  } catch (e) {
    console.warn('[TalentLibrary] 人才主数据接口获取失败，回退静态数据:', e);
  }
}
