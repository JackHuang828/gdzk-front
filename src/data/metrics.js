/**
 * 案例广场/洞察库关键指标 mock 数据与构建函数。
 * 迁移自原型引擎 insightMetricSeed / strategyMetricIndustrySeed /
 * getInsightMetricData / getStrategyMetricData / renderInsightTrend。
 */

// 洞察指标行业种子（行业 -> 基础数值与关注方向）
export const insightMetricSeed = {
  '全部': { tech: 126, investment: 18, patent: 342, update: 64, focus: ['AI硬件', '新能源', '低空经济'] },
  '新能源': { tech: 32, investment: 21, patent: 96, update: 12, focus: ['电池材料', '补能网络', 'V2G'] },
  '低空经济': { tech: 18, investment: 16, patent: 54, update: 9, focus: ['城市试点', '航线运营', '监管平台'] },
  '人工智能': { tech: 36, investment: 24, patent: 128, update: 15, focus: ['端侧算力', '大模型', '智能硬件'] },
  '量子计算': { tech: 12, investment: 28, patent: 41, update: 6, focus: ['量子芯片', '算法软件', '科研平台'] },
  '产业政策': { tech: 24, investment: 12, patent: 38, update: 11, focus: ['政策工具', '区域布局', '招商方向'] },
  '通信及通信设备': { tech: 20, investment: 14, patent: 72, update: 8, focus: ['通信导航', '算网设施', '低空通信'] },
  '交通运输': { tech: 16, investment: 10, patent: 46, update: 7, focus: ['智慧交通', '低空物流', '车路协同'] },
  '房地产': { tech: 9, investment: 6, patent: 18, update: 4, focus: ['城市更新', '园区运营', '低碳改造'] },
  '电力设备': { tech: 22, investment: 19, patent: 83, update: 10, focus: ['V2G', '储能设备', '智能电网'] },
  '国防军工': { tech: 14, investment: 11, patent: 62, update: 5, focus: ['无人系统', '材料工艺', '安全通信'] },
  '机械设备': { tech: 19, investment: 13, patent: 67, update: 8, focus: ['机器人', '高端装备', '工业控制'] },
  '食品饮料': { tech: 11, investment: 9, patent: 29, update: 5, focus: ['健康消费', '渠道变化', '新品研发'] },
  '非银金融': { tech: 13, investment: 17, patent: 22, update: 6, focus: ['金融科技', '投融资', '风险管理'] },
  '计算机': { tech: 27, investment: 15, patent: 88, update: 10, focus: ['安全软件', 'SaaS', '算力平台'] },
  '其他': { tech: 15, investment: 8, patent: 31, update: 6, focus: ['综合产业', '交叉技术', '区域专题'] }
};

// 战略指标行业种子
export const strategyMetricIndustrySeed = {
  '全部': { total: 128, investment: 86.4, roi: 18.6, satisfaction: 96, focus: ['招商策略', '战略规划', '运营提升'], hot: ['量子计算', '低空经济', '新能源'] },
  '新能源': { total: 32, investment: 28.6, roi: 21.4, satisfaction: 97, focus: ['渠道策略', '补能网络', '材料招商'], hot: ['储能', 'V2G', '电池材料'] },
  '低空经济': { total: 18, investment: 12.8, roi: 17.2, satisfaction: 94, focus: ['场站协同', '监管平台', '低空物流'], hot: ['城市试点', '无人机', '航线运营'] },
  '人工智能': { total: 36, investment: 24.5, roi: 22.1, satisfaction: 98, focus: ['算力基础设施', '大模型应用', '智能硬件'], hot: ['端侧算力', '智能体', '企业引育'] },
  '量子计算': { total: 12, investment: 9.6, roi: 15.8, satisfaction: 95, focus: ['产业链招商', '应用场景', '产业基金'], hot: ['量子芯片', '低温控制', '算法软件'] },
  '产业政策': { total: 24, investment: 10.2, roi: 14.6, satisfaction: 93, focus: ['政策工具', '区域布局', '招商方向'], hot: ['政策建议', '试点机制', '园区承载'] },
  '通信及通信设备': { total: 20, investment: 14.4, roi: 16.9, satisfaction: 94, focus: ['通信导航', '算网设施', '低空通信'], hot: ['基础设施', '通信导航', '网络协同'] },
  '交通运输': { total: 16, investment: 11.3, roi: 16.1, satisfaction: 92, focus: ['智慧交通', '低空物流', '车路协同'], hot: ['物流网络', '交通集团', '商业化'] },
  '房地产': { total: 9, investment: 7.2, roi: 12.8, satisfaction: 91, focus: ['城市更新', '园区运营', '低碳改造'], hot: ['园区招商', '存量更新', '运营提升'] },
  '电力设备': { total: 22, investment: 18.7, roi: 19.4, satisfaction: 95, focus: ['V2G', '储能设备', '智能电网'], hot: ['车网互动', '储能设备', '智能电网'] },
  '国防军工': { total: 14, investment: 8.9, roi: 13.7, satisfaction: 92, focus: ['无人系统', '材料工艺', '安全通信'], hot: ['无人系统', '安全通信', '材料工艺'] },
  '机械设备': { total: 19, investment: 13.5, roi: 17.8, satisfaction: 94, focus: ['机器人', '高端装备', '工业控制'], hot: ['机器人', '高端装备', '工业控制'] },
  '食品饮料': { total: 11, investment: 5.4, roi: 15.2, satisfaction: 90, focus: ['健康消费', '渠道变化', '新品研发'], hot: ['健康消费', '渠道下沉', '新品研发'] },
  '非银金融': { total: 13, investment: 16.1, roi: 18.9, satisfaction: 93, focus: ['金融科技', '投融资', '风险管理'], hot: ['产业基金', '投融资', '风险管理'] },
  '计算机': { total: 27, investment: 15.8, roi: 20.3, satisfaction: 96, focus: ['安全软件', 'SaaS', '算力平台'], hot: ['SaaS', '安全软件', '算力平台'] },
  '其他': { total: 15, investment: 6.8, roi: 13.9, satisfaction: 89, focus: ['综合产业', '交叉技术', '区域专题'], hot: ['综合产业', '交叉技术', '区域专题'] }
};

const METRIC_TONES = ['blue', 'green', 'amber', 'violet'];
export const metricTone = index => METRIC_TONES[index % METRIC_TONES.length];

function climb(value, steps, min = 0) {
  return steps.map(step => Number(Math.max(min, value - step).toFixed(1)));
}

/** 洞察指标（4 项）：tech / investment / patent / update */
export function getInsightMetricData(industry = '全部') {
  const activeIndustry = insightMetricSeed[industry] ? industry : '全部';
  const data = insightMetricSeed[activeIndustry];
  const focus = data.focus;
  const scopeLabel = activeIndustry === '全部' ? '全部领域' : activeIndustry;
  const metrics = [
    {
      key: 'tech',
      label: '技术总数',
      value: String(data.tech),
      note: `覆盖${focus[0]}等方向`,
      desc: `${scopeLabel}已纳入平台持续跟踪的核心技术主题数量。`,
      history: [data.tech - 18, data.tech - 14, data.tech - 10, data.tech - 7, data.tech - 3, data.tech],
      parts: [[focus[0], 42], [focus[1], 34], [focus[2], 24]]
    },
    {
      key: 'investment',
      label: '投资增长',
      value: `+${data.investment}%`,
      note: '较上期变化',
      desc: `${scopeLabel}投融资事件、金额和机构关注度的综合环比变化。`,
      history: [data.investment - 9, data.investment - 4, data.investment - 6, data.investment - 1, data.investment - 3, data.investment],
      parts: [['早期融资', 38], ['产业基金', 35], ['并购扩产', 27]]
    },
    {
      key: 'patent',
      label: '专利增长',
      value: `+${data.patent}`,
      note: '近30天新增',
      desc: `${scopeLabel}近30天新增专利公开量，用于识别技术活跃度。`,
      history: [data.patent - 70, data.patent - 48, data.patent - 56, data.patent - 31, data.patent - 18, data.patent],
      parts: [[focus[0], 45], [focus[1], 30], [focus[2], 25]]
    },
    {
      key: 'update',
      label: '报告更新',
      value: `${data.update}篇`,
      note: '本期可阅读',
      desc: `${scopeLabel}本期新增或更新的洞察报告数量。`,
      history: [data.update - 5, data.update - 3, data.update - 4, data.update - 2, data.update - 1, data.update],
      parts: [['月刊', 40], ['专题洞察', 32], ['指标跟踪', 28]]
    }
  ];
  return { industry: activeIndustry, metrics };
}

/** 战略指标（4 项）：total / investment / roi / satisfaction */
export function getStrategyMetricData(industry = '全部') {
  const activeIndustry = strategyMetricIndustrySeed[industry] ? industry : '全部';
  const data = strategyMetricIndustrySeed[activeIndustry];
  const scope = activeIndustry === '全部' ? '案例广场战略咨询成果' : `${activeIndustry}战略咨询成果`;
  const industryLabel = activeIndustry === '全部' ? '全行业' : activeIndustry;
  const metrics = {
    total: {
      key: 'total',
      label: '总成果数',
      value: String(data.total),
      note: '点击查看构成与趋势',
      desc: `${scope}已沉淀的成果总量，覆盖${data.focus.join('、')}等类型。`,
      history: climb(data.total, [28, 22, 15, 10, 5, 0], 1),
      parts: [[data.focus[0], 42], [data.focus[1], 31], [data.focus[2], 27]],
      analysis: `${scope}近6期持续增长，新增内容主要集中在${data.hot.join('、')}方向。建议结合下方列表查看高匹配成果，便于复用成熟方案。`
    },
    investment: {
      key: 'investment',
      label: '总投资额',
      value: `${data.investment}亿`,
      note: '点击查看资金构成',
      desc: `${scope}涉及的目标项目投资额、基金配置额和落地建设预算总和。`,
      history: climb(data.investment, [9.4, 7.2, 5.8, 3.6, 1.8, 0], 0.6),
      parts: [['产业基金', 45], ['基础设施', 34], ['企业引育', 21]],
      analysis: `${industryLabel}口径下投资主要集中在${data.focus[0]}和${data.focus[1]}，说明战略咨询成果正在从方向判断进入资源配置与落地测算阶段。`
    },
    roi: {
      key: 'roi',
      label: '平均投资回报率',
      value: `${data.roi}%`,
      note: '点击查看回报分析',
      desc: `基于${scope}中的预估收益、成本投入和阶段性绩效测算得出的平均回报水平。`,
      history: climb(data.roi, [5.6, 4.8, 3.5, 2.3, 1.1, 0], 1),
      parts: [['高回报项目', 36], ['稳健回报项目', 44], ['培育型项目', 20]],
      analysis: `${industryLabel}口径下ROI呈上行趋势，高回报项目通常具备明确场景、资金配套和可量化落地目标。`
    },
    satisfaction: {
      key: 'satisfaction',
      label: '客户满意度',
      value: `${data.satisfaction}分`,
      note: '点击查看评价分布',
      desc: `汇总${scope}使用方对可执行性、数据可信度、建议完整度和交付效率的评价。`,
      history: climb(data.satisfaction, [8, 6, 4, 3, 1, 0], 1),
      parts: [['可执行性', 39], ['数据可信度', 33], ['交付效率', 28]],
      analysis: `${industryLabel}口径下满意度主要由建议可执行性和数据可信度拉动，带有实施路径、资金测算和目标清单的成果更容易被采纳。`
    }
  };
  return { industry: activeIndustry, metrics: Object.values(metrics) };
}

/**
 * 生成近 6 期趋势折线图的 polyline points（与原型 renderInsightTrend 同算法）。
 * viewBox 0 0 300 128。
 */
export function buildTrendPoints(history = []) {
  const values = history.map(value => Number(value) || 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  return values.map((value, index) => {
    const x = 24 + index * (252 / Math.max(values.length - 1, 1));
    const y = 104 - ((value - min) / range) * 76;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });
}

export const TREND_MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '本期'];
export const METRIC_PIE_COLORS = ['#3158ff', '#18b7c8', '#8b5cf6'];
