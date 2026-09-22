<script setup>
// 洞察报告库（insightLibrary）：指标卡 + 两张图表 + 热门行业筛选 + 洞察卡网格。
// 交互对应原型：insightSearch 关键词过滤、category-tabs 按 data-kind 过滤、
// 卡片点击进入洞察详情页、新建洞察打开 newInsight Modal。
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { INSIGHT_LIBRARY_METRICS, INSIGHT_LIBRARY_FILTERS, INSIGHT_LIBRARY_CARDS } from '../../data/insightLibrary';

const router = useRouter();
const ui = useUiStore();

const keyword = ref('');
const activeFilter = ref('all');

const visibleCards = computed(() => INSIGHT_LIBRARY_CARDS.filter(card => {
  const matchKind = activeFilter.value === 'all' || card.kind === activeFilter.value;
  const matchKeyword = !keyword.value.trim() ||
    `${card.title}${card.summary}${card.tags.join('')}${card.status}`.toLowerCase().includes(keyword.value.trim().toLowerCase());
  return matchKind && matchKeyword;
}));

function openNewInsight() {
  ui.openModal('newInsight');
}

function openDetail() {
  router.push({ name: 'insightDetail' });
}
</script>

<template>
  <section class="view active" id="insightLibrary">
    <div class="page-title centered">
      <h1>洞察报告库</h1>
    </div>
    <div class="search-row">
      <span style="flex:1"></span>
      <label class="search">
        <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
        <input v-model="keyword" placeholder="搜索报告标题、全文关键词" />
      </label>
      <button class="primary-btn" @click="openNewInsight">新建洞察</button>
    </div>

    <div class="metric-grid">
      <div v-for="metric in INSIGHT_LIBRARY_METRICS" :key="metric.label" class="metric" :class="metric.tone">
        <small>{{ metric.label }}</small><strong>{{ metric.value }}</strong>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-card card">
        <h3>技术发展时间序列</h3>
        <svg viewBox="0 0 460 92" aria-label="技术发展时间序列折线图">
          <path d="M16 72 H438" stroke="#e7ebf2"/>
          <path d="M16 50 H438" stroke="#e7ebf2"/>
          <path d="M16 28 H438" stroke="#e7ebf2"/>
          <polyline points="24,72 92,60 156,65 226,32 296,40 366,12 436,24" fill="none" stroke="#3158ff" stroke-width="3"/>
        </svg>
        <p class="muted">点击数据点筛选下方报告或查看指标构成</p>
      </div>
      <div class="chart-card card">
        <h3>投资领域分布</h3>
        <div style="display:flex;align-items:center;gap:28px;">
          <svg width="112" height="90" viewBox="0 0 112 90" aria-label="投资领域分布饼图">
            <circle cx="56" cy="45" r="34" fill="#3158ff"/>
            <path d="M56 45 L56 11 A34 34 0 0 1 88 56 Z" fill="#7c3aed"/>
            <path d="M56 45 L88 56 A34 34 0 0 1 42 76 Z" fill="#08b6ce"/>
          </svg>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 36px;">
            <span>AI 45%</span><span>低空经济 17%</span><span>新能源 28%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="category-tabs">
      <span class="muted">热门行业</span>
      <button
        v-for="filter in INSIGHT_LIBRARY_FILTERS"
        :key="filter.key"
        type="button"
        :class="{ active: activeFilter === filter.key }"
        @click="activeFilter = filter.key"
      >{{ filter.label }}</button>
    </div>

    <div class="grid-3">
      <button v-for="card in visibleCards" :key="card.id" type="button" class="report-card" @click="openDetail">
        <span class="report-type insight">洞察报告</span>
        <h3>{{ card.title }}</h3>
        <div class="card-field"><b>状态</b><span>{{ card.status }}</span></div>
        <div class="card-field"><b>更新时间</b><span>{{ card.updateTime }}</span></div>
        <div class="card-field"><b>内容简介</b><span>{{ card.summary }}</span></div>
        <div class="card-actions">
          <span class="tag-list"><span v-for="tag in card.tags" :key="tag" class="tag">{{ tag }}</span></span>
          <span class="text-action">查看详情 / 下载</span>
        </div>
      </button>
    </div>
  </section>
</template>
