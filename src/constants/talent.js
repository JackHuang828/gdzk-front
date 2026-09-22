/* ===== 人才模块常量配置 =====
 * 从 hooks/talent-profile.js 抽离的硬编码默认值，集中管理便于后端覆盖。
 */

/** 列表筛选下拉默认选项（API 失败时的静态回退） */
export const DEFAULT_LIST_FILTER_OPTIONS = {
  institution: ['中国科学院', '清华大学', '北京大学', '华为技术'],
  outcome: ['高被引论文', '发明专利', '国家级奖项'],
  project: ['国家重点研发计划', '国家自然科学基金', '重大工程项目'],
  type: ['领军人才', '青年人才', '项目人才'],
  region: ['北京', '广东', '海外'],
};

/** 分页大小（每页条数） */
export const PAGE_SIZE = 5;
