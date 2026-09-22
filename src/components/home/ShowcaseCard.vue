<script setup>
// 首页创作案例/研报库展示卡（.creative-card）
// 结构对齐引擎 enhanceHomeShowcaseCards 运行时重构后的 DOM：
// card-actions 内为 creative-meta（徽章 + 2 个 meta-tag），
// text-action 移入 creative-hover-panel，面板内含「摘要：desc」。
defineProps({
  card: { type: Object, required: true }
});
</script>

<template>
  <button class="creative-card" :data-home-industry-card="card.industry">
    <div class="creative-thumb" :class="card.thumb">
      <span class="report-type" :class="card.reportMod">{{ card.reportType }}</span>
    </div>
    <div class="creative-body">
      <h3>{{ card.title }}</h3>
      <div class="card-field" v-for="([label, value], i) in card.fields" :key="i">
        <b>{{ label }}</b><span>{{ value }}</span>
      </div>
      <div class="card-actions home-card-actions">
        <div class="creative-meta">
          <span class="home-hot-badge" :class="card.badge">{{ card.badge === 'views' ? '浏览最多' : '评分最高' }}</span>
          <span class="meta-tag" v-for="(tag, i) in card.tags.slice(0, 2)" :key="i">{{ tag }}</span>
        </div>
      </div>
      <div class="creative-hover-panel">
        <p class="creative-desc">摘要：{{ card.desc }}</p>
        <span class="text-action">{{ card.action }}</span>
      </div>
    </div>
  </button>
</template>
