<script setup>
// 首页「我的报告」迷你卡（.mini-report）
defineProps({
  report: { type: Object, required: true }
});
</script>

<template>
  <button class="mini-report">
    <span class="report-type" :class="report.reportMod">{{ report.reportType }}</span>
    <span class="status" :class="report.statusClass">
      {{ report.statusClass === 'done' ? '● 已完成' : '⌁ 生成中' }}
    </span>
    <h3>{{ report.title }}</h3>
    <p class="muted" v-for="([label, value], i) in report.fields" :key="i">{{ label }}：{{ value }}</p>
  </button>
</template>
