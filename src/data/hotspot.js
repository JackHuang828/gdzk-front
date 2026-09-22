/**
 * 热点分析模块 mock 数据。
 * 来源：原型 _views.html 第 178-690 行（热点 4 视图）与 engine.js
 * hotspotInvestmentEvents / renderHotspotTopicDetail / renderInvestmentEventDetail /
 * updateHotspotKpiTrend / hotspotCompareTopics 等函数。
 */

// ===== 热点概览仪表盘：4 个 KPI =====
export const HOTSPOT_KPIS = [
  { key: '技术领域热点数', label: '技术领域热点数', value: '42', note: '较上期 +15%', jump: 'fieldDistribution', trend: '70,154 190,136 310,106 430,96 550,72 690,46', trendTitle: '技术领域热点数趋势' },
  { key: '新增投融资事件', label: '新增投融资事件', value: '18', note: '新增金额 23.6 亿', trend: '70,166 190,142 310,154 430,112 550,88 690,74', trendTitle: '新增投融资事件趋势' },
  { key: '高频关键词', label: '高频关键词', value: 'AI算力', note: '词频 286 次', trend: '70,150 190,122 310,118 430,84 550,96 690,62', trendTitle: '高频关键词热度趋势' },
  { key: '热点强度指数', label: '热点强度指数', value: '86.5', note: '处于高热区间', trend: '70,170 190,138 310,124 430,92 550,78 690,58', trendTitle: '热点强度指数趋势' }
];

export const HOTSPOT_TREND_MONTHS = ['1月', '2月', '3月', '4月', '5月', '本期'];

// ===== 技术领域热点分布 =====
export const FIELD_SHARE_TOTAL = 42;
export const FIELD_SHARES = [
  { name: 'AI算力', color: '#3158ff', share: '31%', growth: '+15%' },
  { name: '新能源', color: '#08b6ce', share: '21%', growth: '+9%' },
  { name: '量子计算', color: '#eead2b', share: '17%', growth: '+18%' },
  { name: '低空经济', color: '#8b5cf6', share: '14%', growth: '+12%' },
  { name: '机器人', color: '#16a34a', share: '17%', growth: '+6%' }
];
// 各领域增长趋势 4 条折线（viewBox 0 0 760 260）
export const FIELD_GROWTH_LINES = [
  { color: '#3158ff', points: '72,172 180,152 288,126 396,104 504,76 700,56' },
  { color: '#08b6ce', points: '72,188 180,176 288,142 396,136 504,118 700,92' },
  { color: '#eead2b', points: '72,198 180,170 288,162 396,116 504,102 700,66' },
  { color: '#8b5cf6', points: '72,206 180,190 288,172 396,146 504,124 700,108' }
];
export const FIELD_GROWTH_SUMMARY = [
  { title: '增长最快', text: '量子计算环比 +18%，新增主题集中在测控系统与纠错路线。' },
  { title: '占比最高', text: 'AI算力占比 31%，仍是当前产业热点主线。' },
  { title: '持续升温', text: '低空经济连续 4 期上升，城市试点带动明显。' }
];
export const FIELD_FILTER_CHIPS = ['统计口径：热点主题数', '时间范围：近30天', '增长趋势：环比'];

// ===== 热点趋势分析区 =====
export const TREND_DIMENSION_OPTIONS = ['行业类别：全部', '行业类别：人工智能', '行业类别：新能源', '行业类别：低空经济'];
export const TREND_TECH_OPTIONS = ['技术方向：全部', '技术方向：量子计算', '技术方向：AI算力', '技术方向：低空物流'];

export const TREND_SERIES = [
  {
    key: 'ai', label: 'AI算力', color: '#3158ff',
    points: '72,176 180,150 288,92 396,112 504,72 612,60 700,86',
    curve: 'AI算力热点曲线|峰值时段：5月上旬至6月中旬|热点名称：AI算力基础设施|涉及机构：数据集团、云平台企业、产业园区|代表技术：国产GPU集群、异构算力调度|相关投融资事件：5起，累计10.9亿|主要媒体报道：算力中心扩容、训练成本下降专题',
    pointsDetail: [
      { x: 504, y: 72, text: 'AI算力|5月热度 91|机构：数据集团、前沿技术局|代表技术：国产GPU集群|投融资：3起，金额6.8亿|媒体：算力中心扩容报道' },
      { x: 700, y: 86, text: 'AI算力|本期热度 84|机构：云平台企业、产业园区|代表技术：异构算力调度|投融资：2起，金额4.1亿|媒体：训练成本下降专题' }
    ]
  },
  {
    key: 'quantum', label: '量子计算', color: '#eead2b',
    points: '72,194 180,172 288,158 396,126 504,106 612,76 700,54',
    curve: '量子计算热点曲线|峰值时段：本期持续走高|热点名称：量子计算工程化|涉及机构：高校实验室、科创集团、设备厂商|代表技术：量子芯片、测控系统、纠错路线|相关投融资事件：4起，累计8.2亿|主要媒体报道：样机突破、测控国产化进展',
    pointsDetail: [
      { x: 700, y: 54, text: '量子计算|本期热度 96|机构：量子实验室、科创集团|代表技术：量子芯片与测控|投融资：4起，金额8.2亿|媒体：样机突破报道' }
    ]
  },
  {
    key: 'lowalt', label: '低空经济', color: '#8b5cf6',
    points: '72,202 180,180 288,136 396,98 504,122 612,144 700,118',
    curve: '低空经济热点曲线|峰值时段：4月政策试点窗口|热点名称：低空经济城市试点|涉及机构：交通集团、无人机企业、城市运营方|代表技术：低空航线调度、空域管理、监管平台|相关投融资事件：2起，累计3.4亿|主要媒体报道：试点航线开通、城市低空运营专题',
    pointsDetail: [
      { x: 396, y: 98, text: '低空经济|4月热度 82|机构：交通集团、无人机企业|代表技术：低空航线调度|投融资：2起，金额3.4亿|媒体：试点航线开通' }
    ]
  }
];
export const TREND_MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '本期'];

// 时间轴滑块联动（data-hotspot-range，1-6）
export function getHotspotPeak(months) {
  if (months <= 2) {
    return { window: '2月下旬', topic: 'AI算力、低空经济', reason: '地方试点政策与算力调度平台发布。', peakLabel: '2 月' };
  }
  if (months <= 4) {
    return { window: '4月上旬至4月下旬', topic: '低空经济、AI算力', reason: '试点航线开通与国产加速卡测试带动关注。', peakLabel: '4 月' };
  }
  return { window: '5月上旬至6月中旬', topic: 'AI算力、量子计算', reason: '投融资密集披露与产业政策窗口叠加。', peakLabel: '5 月' };
}

// 热力图 21 格热度值
export const HEATMAP_CELLS = [
  0.18, 0.32, 0.55, 0.72, 0.38, 0.64, 0.88,
  0.25, 0.48, 0.76, 0.42, 0.90, 0.68, 0.35,
  0.45, 0.78, 0.52, 0.86, 0.58, 0.38, 0.66
];

// 气泡图 3 个气泡（viewBox 0 0 420 210）
export const HOTSPOT_BUBBLES = [
  { x: 104, y: 78, r: 25, fill: 'rgba(49,88,255,.72)', text: 'AI硬件|热度 88|机构：芯片企业、数据中心|代表技术：AI加速卡|投融资：5起|媒体：国产替代专题' },
  { x: 218, y: 112, r: 20, fill: 'rgba(8,182,206,.72)', text: '低空物流|热度 74|机构：交通集团、无人机企业|代表技术：航线调度|投融资：2起|媒体：城市试点报道' },
  { x: 312, y: 64, r: 23, fill: 'rgba(238,173,43,.76)', text: '固态电池|热度 82|机构：新能源车企、材料企业|代表技术：硫化物电解质|投融资：3起|媒体：量产窗口分析' }
];

// ===== 热点主题聚合区 =====
export const HOTSPOT_TOPICS = [
  {
    name: 'AI算力基础设施',
    score: '热度指数 91',
    keywords: ['GPU集群', '训练成本', '算力调度', '数据中心'],
    techDirection: '异构算力、国产加速卡',
    agencies: '数据集团、云平台企业、产业园区',
    detail: {
      desc: '算力建设、国产硬件适配和异构调度共同推动热度上升。',
      history: 'AI算力基础设施从单点数据中心建设，进入区域算力池化、异构调度和国产硬件适配阶段，热点热度由政策牵引转向资本与应用需求共同驱动。',
      timeline: [
        ['2026-02', '首批区域算力调度平台上线，推动算力资源池化。'],
        ['2026-04', '国产 AI 加速卡进入规模化测试，相关专利公开量提升 18%。'],
        ['2026-05', '产业基金加码数据中心改造，资本投入走势进入高位。']
      ],
      experts: [
        '建议重点关注国产加速卡与调度平台的适配节奏，短期热度仍将由供给能力和成本曲线驱动。',
        '算力基础设施投资应优先绑定高确定性应用场景，避免单纯堆叠硬件形成闲置风险。',
        '后续观察指标包括单位训练成本、集群利用率、国产化比例和园区能源约束。'
      ]
    }
  },
  {
    name: '量子计算工程化',
    score: '热度指数 88',
    keywords: ['量子芯片', '测控系统', '纠错', '样机'],
    techDirection: '超导量子、离子阱',
    agencies: '高校实验室、科创集团、设备厂商',
    detail: {
      desc: '量子芯片、测控系统和纠错路线进入工程验证窗口。',
      history: '量子计算主题从基础研究热度延伸到工程平台建设，近期关注点集中在芯片样机、测控设备国产化和示范应用场景。',
      timeline: [
        ['2026-01', '多家实验室发布量子芯片样机进展，带动论文与专利升温。'],
        ['2026-03', '测控设备厂商进入联合测试，产业链协同增强。'],
        ['2026-05', '科创基金投入工程化平台，资本关注度明显提升。']
      ],
      experts: [
        '量子计算短期仍以工程验证和平台能力建设为主，商业化落地需关注误差控制与生态适配。',
        '测控系统、低温设备和关键材料是后续产业链补强重点。',
        '建议持续跟踪专利公开质量、样机稳定性和示范应用牵引强度。'
      ]
    }
  },
  {
    name: '低空经济城市试点',
    score: '热度指数 84',
    keywords: ['航线试点', '低空物流', '监管平台', '场站'],
    techDirection: '空域管理、无人机调度',
    agencies: '交通集团、无人机企业、城市运营方',
    detail: {
      desc: '城市试点、监管平台和低空物流共同驱动热点形成。',
      history: '低空经济由政策发布进入城市运营能力验证阶段，航线试点、场站建设和监管平台成为落地关键。',
      timeline: [
        ['2026-02', '多地发布低空经济行动方案，试点范围扩大。'],
        ['2026-04', '重点城市开通低空物流示范航线，媒体关注度达到峰值。'],
        ['2026-05', '交通集团与无人机企业推进联合运营，投融资事件增加。']
      ],
      experts: [
        '低空经济的热度取决于城市级运营闭环，不只是飞行器技术本身。',
        '监管平台、航线调度和场站网络是可规模化复制的关键基础设施。',
        '建议优先观察订单密度、空域审批效率和安全运行数据。'
      ]
    }
  }
];

export function getHotspotTopic(name) {
  return HOTSPOT_TOPICS.find(topic => topic.name === name) || HOTSPOT_TOPICS[0];
}

// 主题详情页静态图表（原型中不随主题切换）
export const TOPIC_PATENT_BARS = [
  { label: '专利公开', bar: '86%', delta: '+18%' },
  { label: '论文发表', bar: '72%', delta: '+12%' },
  { label: '高被引成果', bar: '64%', delta: '+9%' }
];
export const TOPIC_CAPITAL_LINE = '68,158 170,142 272,118 374,88 476,66 570,74';

// ===== 投融资热点分布图 =====
export const HOTSPOT_REGIONS = [
  { name: '北京', label: '京', x: '18%', y: '42%', size: '64px', lines: ['事件 5 起', '机构：前沿基金、国资平台', '金额区间：1亿-5亿', '技术方向：AI算力、量子计算'] },
  { name: '上海', label: '沪', x: '42%', y: '58%', size: '76px', lines: ['事件 7 起', '机构：产业资本、科创基金', '金额区间：3亿-8亿', '技术方向：半导体、新能源'] },
  { name: '深圳', label: '深', x: '64%', y: '36%', size: '58px', lines: ['事件 6 起', '机构：硬科技基金、上市公司', '金额区间：2亿-6亿', '技术方向：AI硬件、低空经济'] },
  { name: '成都', label: '蓉', x: '54%', y: '72%', size: '50px', lines: ['事件 3 起', '机构：地方基金、产业园区', '金额区间：5000万-2亿', '技术方向：机器人、低空物流'] }
];
export const REGION_STATS = [
  { title: '活跃地区', text: '上海 7 起、深圳 6 起、北京 5 起，形成东部沿海与核心城市双高峰。' },
  { title: '投资机构', text: '产业资本占 45%，政府引导基金占 31%，市场化基金占 24%。' },
  { title: '金额区间', text: '1 亿-5 亿区间最集中，主要流向 AI 硬件、半导体与新能源材料。' }
];
export const REGION_FILTER_OPTIONS = {
  stage: ['投资阶段：全部', '投资阶段：天使轮', '投资阶段：A轮', '投资阶段：B轮及以后'],
  field: ['投资领域：全部', '投资领域：AI算力', '投资领域：新能源', '投资领域：低空经济'],
  time: ['时间范围：近30天', '时间范围：近90天', '时间范围：本年度']
};

// ===== 投融资事件明细 =====
export const HOTSPOT_INVESTMENT_EVENTS = {
  '北京': [
    {
      id: 'bj-quantum-a', title: '量子测控设备 A 轮融资', region: '北京',
      agency: '前沿基金、国资平台', amount: '1亿-3亿', tech: '量子计算、测控系统',
      stage: 'A轮', date: '2026-05-22',
      progress: ['完成 A 轮融资披露，资金用于测控设备小批量试制。', '与高校实验室启动联合验证。', '进入产业化样机可靠性测试阶段。']
    },
    {
      id: 'bj-ai-cloud', title: 'AI算力调度平台战略融资', region: '北京',
      agency: '产业资本、云平台企业', amount: '3亿-5亿', tech: 'AI算力、调度平台',
      stage: '战略融资', date: '2026-05-12',
      progress: ['完成战略融资签约。', '上线跨园区算力调度试点。', '媒体集中报道训练成本下降。']
    }
  ],
  '上海': [
    {
      id: 'sh-semi-b', title: '半导体材料 B 轮融资', region: '上海',
      agency: '产业资本、科创基金', amount: '3亿-8亿', tech: '半导体、新能源材料',
      stage: 'B轮', date: '2026-05-18',
      progress: ['完成 B 轮融资披露。', '扩建中试线并进入重点客户验证。', '计划引入下游制造企业联合研发。']
    },
    {
      id: 'sh-battery-a', title: '固态电池材料 A 轮融资', region: '上海',
      agency: '新能源产业基金、上市公司', amount: '2亿-5亿', tech: '固态电池、新能源',
      stage: 'A轮', date: '2026-05-09',
      progress: ['融资资金用于硫化物电解质产线建设。', '进入车企联合测试阶段。', '专利公开量持续提升。']
    }
  ],
  '深圳': [
    {
      id: 'sz-ai-hardware-a', title: '深圳 AI 硬件 A 轮融资事件', region: '深圳',
      agency: '硬科技基金、上市公司产业资本', amount: '2亿-6亿', tech: 'AI硬件、国产加速卡',
      stage: 'A轮', date: '2026-05-08',
      progress: ['完成 A 轮融资披露，资金用于 AI 加速卡产线扩充。', '与产业园区签署算力设备测试合作协议。', '进入重点客户联合验证阶段。']
    },
    {
      id: 'sz-lowalt', title: '低空调度平台 Pre-B 轮融资', region: '深圳',
      agency: '硬科技基金、交通集团', amount: '1亿-3亿', tech: '低空经济、航线调度',
      stage: 'Pre-B轮', date: '2026-05-14',
      progress: ['融资用于城市级低空调度平台研发。', '与交通集团推进示范航线运营。', '安全运行指标进入月度披露。']
    }
  ],
  '成都': [
    {
      id: 'cd-robot-seed', title: '机器人感知模组天使轮融资', region: '成都',
      agency: '地方基金、产业园区', amount: '5000万-1亿', tech: '机器人、感知模组',
      stage: '天使轮', date: '2026-05-03',
      progress: ['完成天使轮融资。', '落地产业园区联合实验室。', '进入小批量客户试用阶段。']
    },
    {
      id: 'cd-lowalt-logistics', title: '低空物流运营项目融资', region: '成都',
      agency: '地方基金、交通平台', amount: '1亿-2亿', tech: '低空物流、城市配送',
      stage: '项目融资', date: '2026-04-28',
      progress: ['完成项目融资立项。', '启动城市配送航线验证。', '形成区域运营数据看板。']
    }
  ]
};

export function getHotspotInvestmentEvent(id) {
  const all = Object.values(HOTSPOT_INVESTMENT_EVENTS).flat();
  return all.find(event => event.id === id) || HOTSPOT_INVESTMENT_EVENTS['深圳'][0];
}

// 事件详情「关联分析」文案（renderInvestmentEventDetail 模板）
export function buildEventAnalysis(event) {
  return [
    { label: '热点关联', text: `该事件与${event.tech}等热点主题强相关，可联动查看主题趋势与地区投融资活跃度。` },
    { label: '风险提示', text: '需持续观察融资资金使用节奏、客户验证进度和供应链稳定性。' },
    { label: '可跳转资源', text: '关联主题详情、同地区投融资事件列表、相关研究报告。' }
  ];
}

// 区域气泡弹层汇总（机构/金额/技术去重拼接）
export function buildRegionOverview(regionName) {
  const events = HOTSPOT_INVESTMENT_EVENTS[regionName] || [];
  const uniq = list => [...new Set(list)].join('、');
  return {
    count: events.length,
    agencies: uniq(events.flatMap(event => event.agency.split('、'))) || '暂无',
    amounts: uniq(events.map(event => event.amount)) || '暂无',
    techs: uniq(events.flatMap(event => event.tech.split('、'))) || '暂无'
  };
}

// ===== 行业维度筛选与对比区 =====
export const COMPARE_FILTER_OPTIONS = {
  industry: ['行业类别：全部', '行业类别：人工智能', '行业类别：新能源', '行业类别：低空经济', '行业类别：量子计算'],
  tech: ['技术方向：全部', '技术方向：算力基础设施', '技术方向：工程化平台', '技术方向：城市试点', '技术方向：材料体系'],
  period: ['时间周期：近30天', '时间周期：近90天', '时间周期：本年度'],
  level: ['热度等级：高', '热度等级：中高', '热度等级：中']
};
export const HOTSPOT_COMPARE_TOPICS = [
  { name: 'AI算力基础设施', industry: '人工智能', tech: '算力基础设施', period: ['近30天', '近90天', '本年度'], level: '中高', summary: '热度 91 · 投融资 5 起 · 媒体报道 128 篇', score: '91%' },
  { name: '大模型应用生态', industry: '人工智能', tech: '算力基础设施', period: ['近30天', '近90天'], level: '高', summary: '热度 89 · 应用事件 9 起 · 企业动态 42 条', score: '89%' },
  { name: '量子计算工程化', industry: '量子计算', tech: '工程化平台', period: ['近90天', '本年度'], level: '中高', summary: '热度 88 · 投融资 4 起 · 专利增长 22%', score: '88%' },
  { name: '低空经济城市试点', industry: '低空经济', tech: '城市试点', period: ['近30天', '近90天', '本年度'], level: '中高', summary: '热度 84 · 试点城市 12 个 · 政策事件 9 起', score: '84%' },
  { name: '低空物流航线调度', industry: '低空经济', tech: '城市试点', period: ['近30天', '近90天'], level: '中', summary: '热度 76 · 投融资 2 起 · 航线事件 6 起', score: '76%' },
  { name: '固态电池材料', industry: '新能源', tech: '材料体系', period: ['近90天', '本年度'], level: '中高', summary: '热度 79 · 投融资 3 起 · 产业化节点 4 个', score: '79%' },
  { name: '新能源补能网络', industry: '新能源', tech: '材料体系', period: ['近30天', '本年度'], level: '中', summary: '热度 73 · 建设事件 8 起 · 区域政策 5 条', score: '73%' }
];
