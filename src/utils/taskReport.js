/**
 * 任务详情视图模型构建（对应引擎 prepareTaskReportDetail / buildInsightArticleHTML）。
 * 纯数据：正文行以「分段」结构返回（text/cite/anomaly），由组件渲染，避免 v-html。
 */
import { SOURCE_TRACE_ROWS, getActiveInsightTemplate } from '../data/report.js';

// 通用报告（研究/战略/其它）大纲与正文文案
export const GENERIC_REPORT_COPY = {
  研究报告: {
    summary: '围绕研究主题梳理产业结构、关键数据、技术路线和专家观点，形成可引用的研究判断。',
    body: '<h3>一、研究对象与核心问题</h3><p>明确研究边界、空间范围、时间跨度和核心判断口径。</p><h3>二、产业结构与数据分析</h3><p>梳理产业链、关键技术、重点企业、市场空间和趋势数据。</p><h3>三、专家意见与结论</h3><p>沉淀专家判断、风险提示和后续观察指标。</p>',
    conclusion: '形成关于研究对象发展现状、关键机会和后续趋势的结构化结论。'
  },
  战略咨询报告: {
    summary: '围绕行动主体和战略目标形成问题诊断、关键指标、核心建议和可落地行动路径。',
    body: '<h3>一、战略问题定义</h3><p>明确行动主体、业务痛点、目标边界和约束条件。</p><h3>二、核心建议展开</h3><p>形成关键量化指标、实施路径、资源配置和阶段性动作。</p><h3>三、风险与落地保障</h3><p>识别执行风险、组织协同要求和成果评估方式。</p>',
    conclusion: '输出可执行的战略建议和分阶段推进清单。'
  },
  其它报告: {
    summary: '根据用户输入的大纲生成结构化正文，并保留后续编辑、版本管理和模板保存能力。',
    body: '<h3>一、主题背景</h3><p>梳理主题背景、分析范围和关键问题。</p><h3>二、主体分析</h3><p>按用户确认的大纲展开事实、观点和证据。</p><h3>三、总结建议</h3><p>形成结论、建议和后续补充方向。</p>',
    conclusion: '总结报告核心观点并形成可继续扩写的文档版本。'
  }
};

const textSeg = value => ({ type: 'text', value });
const citeSeg = n => ({ type: 'cite', n, id: SOURCE_TRACE_ROWS[(n - 1) % SOURCE_TRACE_ROWS.length].id });
const anomalySeg = value => ({ type: 'anomaly', value });

const CN_PREFIX = '一二三四五六七八九十';
function prefixOf(index) {
  return CN_PREFIX.charAt(index) || String(index + 1);
}

// 解析 <h3>x</h3><p>y</p> 形式的静态正文为分段行
export function parseGenericBodyBlocks(bodyHtml = '') {
  const blocks = [];
  const re = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
  let match;
  while ((match = re.exec(bodyHtml)) !== null) {
    blocks.push({ tag: 'h3', parts: [textSeg(match[1])] });
    blocks.push({ tag: 'p', parts: [textSeg(match[2])] });
  }
  return blocks;
}

// 洞察模块正文段（含引用角标）
function buildInsightSectionParts(moduleName, index) {
  const sourceIndex = (index % SOURCE_TRACE_ROWS.length) + 1;
  const metricSentences = [
    [textSeg('系统识别近三年相关论文 12,486 篇'), citeSeg(3), textSeg('，研究热度较上一周期提升 18.6%'), citeSeg(sourceIndex), textSeg('。')],
    [textSeg('样本数据覆盖 32 个重点城市'), citeSeg(1), textSeg('，其中头部区域贡献了 41% 的关键项目线索'), citeSeg(2), textSeg('。')],
    [textSeg('相关政策文件新增 48 份'), citeSeg(1), textSeg('，公开融资事件达到 19 起'), citeSeg(2), textSeg('。')]
  ];
  return [
    textSeg(`${moduleName}模块基于政策、项目、论文与专利数据进行交叉分析。`),
    ...metricSentences[index % metricSentences.length],
    textSeg('系统同时保留字段口径、查询条件和来源维度，便于后续复核。')
  ];
}

function buildInsightLines(template, hasAnomaly) {
  const lines = [
    { tag: 'h2', id: 'taskPreviewSummary', className: 'line-heading', parts: [textSeg('摘要')] },
    {
      tag: 'p',
      parts: [
        textSeg(`本报告采用「${template.title}」生成，围绕 ${template.modules.length} 个一级模块展开。当前样本覆盖 32 个城市`),
        citeSeg(1),
        textSeg('、148 条示范航线'),
        citeSeg(2),
        textSeg('和 8,742 件专利申请'),
        citeSeg(3),
        textSeg('，并完成数据口径统一。')
      ]
    }
  ];
  if (hasAnomaly) {
    lines.push({
      tag: 'p',
      parts: [
        textSeg('系统初步判断年内新增试点城市可能达到 '),
        anomalySeg('37'),
        textSeg(' 个，但该数字未在引用来源表中找到对应参照数值，已进入人工复核队列。')
      ]
    });
  }
  lines.push({
    tag: 'p',
    parts: [textSeg('系统对引用数字执行数值一致性、空值检查和外键完整性校验，校验结果将随报告版本一并固化。')]
  });
  template.modules.forEach((moduleName, index) => {
    lines.push({
      tag: 'h2',
      id: `taskPreviewPart${index + 1}`,
      className: 'line-heading',
      parts: [textSeg(`${prefixOf(index)}、${moduleName}`)]
    });
    lines.push({ tag: 'p', parts: buildInsightSectionParts(moduleName, index) });
  });
  lines.push({ tag: 'h2', id: 'taskPreviewRefs', className: 'line-heading', parts: [textSeg('参考来源')] });
  lines.push({ tag: 'p', parts: [textSeg('以下来源来自写作相关数据集，点击下方来源行可查看查询到的指标与维度表格。')] });
  return lines;
}

function buildGenericLines(copy) {
  return [
    { tag: 'h2', id: 'taskPreviewSummary', className: 'line-heading', parts: [textSeg('摘要')] },
    { tag: 'p', parts: [textSeg(copy.summary || '')] },
    ...parseGenericBodyBlocks(copy.body || ''),
    { tag: 'h2', id: 'taskPreviewRefs', className: 'line-heading', parts: [textSeg('参考来源')] },
    { tag: 'p', parts: [textSeg('来源包括用户知识库素材、公开政策文件、行业报告和系统生成过程中的引用记录。')] }
  ];
}

/**
 * 构建任务详情视图模型
 * @param {string} type 研究报告 | 战略咨询报告 | 洞察报告 | 其它报告
 * @param {string} title 报告标题
 * @param {object} options { validationAnomaly?: boolean }
 */
export function buildTaskReportModel(type = '其它报告', title = '深圳具身智能行业发展趋势深度分析', options = {}) {
  const hasAnomaly = !!options.validationAnomaly;
  const isInsight = type === '洞察报告';
  const template = getActiveInsightTemplate();

  if (isInsight) {
    const toc = [
      { id: 'taskPreviewSummary', label: '摘要' },
      ...template.modules.map((moduleName, index) => ({ id: `taskPreviewPart${index + 1}`, label: `${prefixOf(index)}、${moduleName}` })),
      { id: 'taskPreviewRefs', label: '参考来源' }
    ];
    const progress = [
      { text: '资料检索完成，引用来源已记录' },
      { text: `模板结构已确认：${template.modules.join('、')}` },
      { text: '正文预览已生成，可继续编辑和保存版本' },
      hasAnomaly
        ? { text: '校验出现异常：异常已输出日志，待人工复核审核', warning: true }
        : { text: '数据校验完成：内置规则已覆盖数值一致性、空值检查、外键完整性' }
    ];
    return {
      type,
      title,
      isInsight,
      hasAnomaly,
      meta: hasAnomaly
        ? '2026-06-09 16:20 更新 · 当前版本 V1 · 自动保存 · 校验异常待复核'
        : '2026-06-09 16:20 更新 · 当前版本 V1 · 自动保存 · 已完成数据校验',
      banner: hasAnomaly ? '校验异常提示：报告中被标红且带虚线下划线的数字代表存在校验异常，需结合校验日志进行人工复核。' : '',
      outline: {
        title,
        summary: `按「${template.title}」生成摘要，覆盖${template.modules.length}个一级模块，并保留引用数据的溯源与校验结果。`,
        bodyBlocks: template.modules.map((moduleName, index) => ({
          h: `${prefixOf(index)}、${moduleName}`,
          p: `围绕“${moduleName}”生成指标口径、图表分析、关键判断和可追溯的数据引用。`
        })),
        conclusion: '总结本期洞察主题的趋势信号、结构变化、关键机会和下一周期持续跟踪事项。'
      },
      toc,
      lines: buildInsightLines(template, hasAnomaly),
      sources: SOURCE_TRACE_ROWS,
      progress,
      outputs: hasAnomaly
        ? [
            { title: '已生成的报告', desc: `${title} · 含异常标记`, chip: '查看', action: 'report' },
            { title: '校验日志文档', desc: '记录校验过程、结果与异常信息', chip: '查看日志', action: 'validationLog', secondary: true }
          ]
        : []
    };
  }

  const copy = GENERIC_REPORT_COPY[type] || GENERIC_REPORT_COPY['其它报告'];
  return {
    type,
    title,
    isInsight: false,
    hasAnomaly: false,
    meta: '2026-06-09 16:20 更新 · 当前版本 V1 · 自动保存',
    banner: '',
    outline: {
      title,
      summary: copy.summary,
      bodyBlocks: parseGenericBodyBlocks(copy.body).reduce((acc, block) => {
        if (block.tag === 'h3') acc.push({ h: block.parts[0].value, p: '' });
        else acc[acc.length - 1].p = block.parts[0].value;
        return acc;
      }, []),
      conclusion: copy.conclusion
    },
    toc: [
      { id: 'taskPreviewSummary', label: '摘要' },
      { id: 'taskPreviewRefs', label: '参考来源' }
    ],
    lines: buildGenericLines(copy),
    sources: [],
    progress: [
      { text: '资料检索完成，引用来源已记录' },
      { text: '章节结构已确认' },
      { text: '正文预览已生成，可继续编辑和保存版本' }
    ],
    outputs: []
  };
}

// 行改写预览文案（对应引擎 generateRewritePreviewText）
export function generateRewritePreviewText(original, instruction) {
  const cleanOriginal = original.trim();
  const cleanInstruction = instruction.trim() || '优化表达，使结论更清晰。';
  const compact = cleanInstruction.includes('精简') || cleanInstruction.includes('简洁');
  if (compact) {
    return cleanOriginal
      .replace(/。/g, '。 ')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .join('')
      .replace(/。?$/, '。');
  }
  if (cleanInstruction.includes('数据') || cleanInstruction.includes('指标')) {
    return `${cleanOriginal}\n\n补充指标口径：建议在本段增加数据来源、统计周期和样本范围说明，确保结论可被复核。`;
  }
  if (cleanInstruction.includes('建议') || cleanInstruction.includes('行动')) {
    return `${cleanOriginal}\n\n行动建议：优先明确责任主体、阶段目标和后续跟踪指标，并在下一版报告中补充执行风险。`;
  }
  return `${cleanOriginal}\n\n修改说明：已按“${cleanInstruction}”优化段落表达，强化因果关系和结论指向。`;
}

// 时间戳格式化：YYYY-MM-DD HH:mm
export function formatTimestamp(date = new Date()) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// 提取行纯文本（用于改写抽屉原文展示）
export function linePlainText(line) {
  return (line.parts || []).map(seg => {
    if (seg.type === 'cite') return `[${seg.n}]`;
    return seg.value || '';
  }).join('').trim();
}
