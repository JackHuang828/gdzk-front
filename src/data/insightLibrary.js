/**
 * 洞察报告库（insightLibrary）mock 数据。
 * 转录自原型 _views.html 1069-1135 行：4 项指标、2 张图表、6 张洞察卡。
 */

export const INSIGHT_LIBRARY_METRICS = [
  { tone: 'blue', label: '技术总数', value: '126' },
  { tone: 'green', label: '投资增长', value: '+18%' },
  { tone: 'amber', label: '新增专利', value: '342' },
  { tone: 'violet', label: '推送覆盖', value: '8.6k' }
];

// 热门行业筛选（原型 data-filter 按钮无实际过滤逻辑，仅静态展示）
export const INSIGHT_LIBRARY_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'monthly', label: '月刊' },
  { key: 'special', label: '专题洞察' },
  { key: 'tech', label: '技术趋势' },
  { key: 'index', label: '指标对比' },
  { key: 'push', label: '订阅推送' }
];

export const INSIGHT_LIBRARY_CARDS = [
  {
    id: 'insight-lib-1', kind: 'monthly', title: '低空经济洞察月刊', status: '已发布', updateTime: '2026-05-18',
    summary: '低空经济正由政策试点转向城市级场景验证，基础设施与运营规范成为落地关键。',
    tags: ['低空经济', '趋势图表']
  },
  {
    id: 'insight-lib-2', kind: 'special', title: '深圳20+8产业月度洞察', status: '已发布', updateTime: '2026-05-16',
    summary: '深圳重点产业集群延续分化增长，半导体与智能网联汽车的项目活跃度领先。',
    tags: ['深圳20+8', '月度洞察']
  },
  {
    id: 'insight-lib-3', kind: 'tech', title: 'V2G试点城市趋势跟踪', status: '已发布', updateTime: '2026-05-14',
    summary: 'V2G试点进入规模验证阶段，电价机制和车网协同能力决定城市推广速度。',
    tags: ['V2G', '指标对比']
  },
  {
    id: 'insight-lib-4', kind: 'monthly', title: '人工智能硬件洞察月刊', status: '已发布', updateTime: '2026-05-12',
    summary: 'AI硬件创新重心向端侧算力迁移，专利和资本正在向核心器件加速集中。',
    tags: ['AI硬件', '企业图谱']
  },
  {
    id: 'insight-lib-5', kind: 'index', title: '新材料产业链月度洞察', status: '已发布', updateTime: '2026-05-09',
    summary: '新材料产业的高端供给缺口仍然突出，政策与专利热点正共同推动国产替代。',
    tags: ['新材料', '专利热点']
  },
  {
    id: 'insight-lib-6', kind: 'push', title: '生物医药创新趋势月刊', status: '已发布', updateTime: '2026-05-06',
    summary: '创新药研发资源进一步向优势区域集中，资本更关注临床价值明确的成熟管线。',
    tags: ['生物医药', '创新趋势']
  }
];
