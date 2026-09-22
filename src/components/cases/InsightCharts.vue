<script setup>
// 洞察面板图表区：技术发展时间序列（SVG 折线静态转录）+ 洞察分析投资分布（纯 CSS 饼图）。
// 交互复刻引擎：图例点击 is-muted 显隐系列 + toast；数据点/饼图项点击 → 按关键词筛选洞察列表。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';

const emit = defineEmits(['search']);

const ui = useUiStore();

// 折线图三条系列（points 与原型 HTML 第 1509-1511 行逐字一致）
const series = [
  { key: 'quantum', label: '量子计算', color: '#3158ff', points: '44,118 128,104 212,76 296,68 380,42 464,50 526,34' },
  { key: 'ai', label: 'AI硬件', color: '#f2ad2e', points: '44,92 128,70 212,54 296,48 380,44 464,38 526,36' },
  { key: 'newenergy', label: '新能源', color: '#8b5cf6', points: '44,112 128,90 212,86 296,72 380,64 464,60 526,56' }
];

// 每条系列的标记点（cx/cy 与原型一致）
const chartPoints = [
  { series: 'quantum', color: '#3158ff', label: '量子计算', dots: [[380, 42], [526, 34]] },
  { series: 'ai', color: '#f2ad2e', label: 'AI硬件', dots: [[464, 38], [526, 36]] },
  { series: 'newenergy', color: '#8b5cf6', label: '新能源', dots: [[380, 64], [526, 56]] }
];

// 饼图图例项
const pieItems = [
  { label: 'AI', color: '#3158ff', percent: '45%' },
  { label: '新能源', color: '#17b7c8', percent: '28%' },
  { label: '低空经济', color: '#8b5cf6', percent: '17%' }
];

// 被隐藏的系列（图例点击切换）
const mutedSeries = ref(new Set());

function toggleLegend(item) {
  // 图例按钮初始为 active（系列显示）；点击后引擎以新状态播报：隐藏 → 已隐藏，再点 → 已显示
  const next = new Set(mutedSeries.value);
  const willShow = next.has(item.key);
  if (willShow) {
    next.delete(item.key);
  } else {
    next.add(item.key);
  }
  mutedSeries.value = next;
  ui.showToast(`${item.label}数据系列${willShow ? '已显示' : '已隐藏'}`);
}

function onPointClick(keyword) {
  emit('search', keyword);
}
</script>

<template>
  <div class="insight-board">
    <section class="insight-chart-card card">
      <div class="chart-head">
        <div>
          <h3>技术发展时间序列</h3>
          <p class="muted">量子计算热度近月上升 15%，AI硬件与新能源材料保持高位。</p>
        </div>
        <div class="chart-legend">
          <button
            v-for="item in series"
            :key="item.key"
            type="button"
            :class="{ active: !mutedSeries.has(item.key) }"
            :style="{ '--legend-color': item.color }"
            @click="toggleLegend(item)"
          >{{ item.label }}</button>
        </div>
      </div>
      <svg viewBox="0 0 560 150" width="100%" height="150" role="img" aria-label="技术发展时间序列折线图">
        <g stroke="#e8edf5" stroke-width="1">
          <line x1="32" y1="126" x2="538" y2="126" /><line x1="32" y1="92" x2="538" y2="92" /><line x1="32" y1="58" x2="538" y2="58" /><line x1="32" y1="24" x2="538" y2="24" />
        </g>
        <polyline
          v-for="item in series"
          :key="item.key"
          class="chart-series"
          :class="{ 'is-muted': mutedSeries.has(item.key) }"
          :points="item.points"
          fill="none"
          :stroke="item.color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g
          v-for="group in chartPoints"
          :key="group.series"
          :fill="group.color"
          :class="{ 'is-muted': mutedSeries.has(group.series) }"
        >
          <circle
            v-for="[cx, cy] in group.dots"
            :key="`${group.series}-${cx}`"
            class="chart-point"
            :cx="cx"
            :cy="cy"
            r="5"
            @click="onPointClick(group.label)"
          />
        </g>
      </svg>
    </section>
    <section class="insight-chart-card card">
      <div class="chart-head">
        <div>
          <h3>洞察分析投资分布</h3>
          <p class="muted">点击领域可筛选下方洞察报告。</p>
        </div>
      </div>
      <div class="pie-board">
        <div class="pie-visual"></div>
        <div class="pie-list">
          <button v-for="item in pieItems" :key="item.label" type="button" @click="onPointClick(item.label)">
            <span class="dot" :style="{ '--dot': item.color }"></span>{{ item.label }} {{ item.percent }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
