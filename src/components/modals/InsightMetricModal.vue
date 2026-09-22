<script setup>
// 指标详情 Modal（insightMetricDetail）：案例广场洞察/战略指标点击后的详情弹窗。
// 复刻 engine.renderMetricDetailContent（1208-1245 行）：
//   hero（当前值 + 近6期历史趋势 SVG）+ 构成分析（CSS 饼图 + 明细）+ 详细分析。
// 上下文：ui.modalContext = { metric, contextLabel, desc }；
//   metric = { label, value, desc, history, parts, analysis? }。
import { computed } from 'vue';
import { useUiStore } from '../../stores/ui';
import { buildTrendPoints, TREND_MONTH_LABELS, METRIC_PIE_COLORS } from '../../data/metrics';

const ui = useUiStore();

const metric = computed(() => ui.modalContext?.metric || {});
const contextLabel = computed(() => ui.modalContext?.contextLabel || '');
const trendPoints = computed(() => buildTrendPoints(metric.value.history || []));
const polylinePoints = computed(() => trendPoints.value.map(point => `${point.x},${point.y}`).join(' '));
const defaultAnalysis =
  '该指标用于辅助判断下方成果列表的内容质量、主题分布和近期变化，可结合行业筛选与排序条件进一步查看相关报告。';

// 构成分析饼图的两个扇区边界（CSS conic-gradient 变量）
const sliceStyle = computed(() => {
  const parts = metric.value.parts || [];
  const one = parts[0]?.[1] || 0;
  const two = one + (parts[1]?.[1] || 0);
  return { '--slice-one': `${one}%`, '--slice-two': `${two}%` };
});
</script>

<template>
  <div class="metric-detail">
    <div class="metric-detail-hero">
      <div class="metric-current">
        <small>{{ contextLabel }}</small>
        <strong>{{ metric.value }}</strong>
        <span class="muted">{{ metric.desc }}</span>
      </div>
      <div class="metric-trend-card">
        <small>近6期历史趋势</small>
        <svg viewBox="0 0 300 128" role="img" aria-label="指标历史趋势">
          <g stroke="#e8edf5" stroke-width="1">
            <line x1="20" y1="106" x2="280" y2="106" /><line x1="20" y1="74" x2="280" y2="74" /><line x1="20" y1="42" x2="280" y2="42" />
          </g>
          <polyline :points="polylinePoints" fill="none" stroke="#3158ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <circle v-for="(point, index) in trendPoints" :key="index" :cx="point.x" :cy="point.y" r="4" fill="#3158ff" />
          <g fill="#8a94a6" font-size="10">
            <text v-for="(label, index) in TREND_MONTH_LABELS" :key="label" :x="[20, 72, 124, 176, 228, 268][index]" y="124">{{ label }}</text>
          </g>
        </svg>
      </div>
    </div>
    <div class="metric-detail-grid">
      <section class="metric-detail-section">
        <h3>构成分析</h3>
        <div class="metric-breakdown" :style="sliceStyle">
          <div class="metric-pie" aria-label="构成分析饼图"></div>
          <div class="metric-breakdown-list">
            <div v-for="([label, value], index) in metric.parts || []" :key="label" class="metric-breakdown-row">
              <span class="metric-breakdown-dot" :style="{ '--dot': METRIC_PIE_COLORS[index] || '#3158ff' }"></span>
              <span>{{ label }}</span>
              <strong>{{ value }}%</strong>
            </div>
          </div>
        </div>
      </section>
      <section class="metric-detail-section">
        <h3>详细分析</h3>
        <p class="muted">{{ metric.analysis || defaultAnalysis }}</p>
      </section>
    </div>
  </div>
</template>
