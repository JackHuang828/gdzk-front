<template>
  <div class="topbar" :class="{ 'hidden-on-view': hidden }">
    <button class="icon-btn mobile-menu" aria-label="打开导航" @click="toggleMobile">
      <svg class="icon" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    </button>
    <button
      v-for="tab in tabs"
      :key="tab.type"
      class="top-tab"
      :class="{ active: activeType === tab.type }"
      @click="goCases(tab.type)"
    >{{ tab.label }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tabs = [
  { type: 'research', label: '研究报告' },
  { type: 'insight', label: '洞察报告' },
  { type: 'strategy', label: '战略咨询报告' },
  { type: 'custom', label: '研报库' }
];

const hidden = computed(() => !!route.meta.topbarHidden);

// 案例广场：高亮 query.type；洞察库：高亮洞察报告（与原型 activateView 逻辑一致）
const activeType = computed(() => {
  if (route.name === 'caseLibrary') return route.query.type || 'research';
  if (route.name === 'insightLibrary') return 'insight';
  return null;
});

function goCases(type) {
  router.push({ name: 'caseLibrary', query: { type } });
}

function toggleMobile() {
  document.body.classList.toggle('sidebar-open');
}
</script>
