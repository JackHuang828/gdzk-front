<template>
  <!-- 科技人才库（原型 2.2.1领域人才分类.html）：四页签 + 全组合式 API 组件化实现 -->
  <div class="talent-library-page">
    <header class="top">
      <nav class="tabs library-module-tabs">
        <button :class="{ active: state.activeTab === 'library-main' }" type="button" @click="switchTalentLibraryTab('library-main')"><i class="fas fa-database"></i> 科技人才库</button>
        <button :class="{ active: state.activeTab === 'custom-filter' }" type="button" @click="switchTalentLibraryTab('custom-filter')"><i class="fas fa-star"></i> 人才TOP100</button>
        <button :class="{ active: state.activeTab === 'exclusive-pools' }" type="button" @click="switchTalentLibraryTab('exclusive-pools')"><i class="fas fa-user-lock"></i> 专属人才池管理（个性化清单）</button>
        <button :class="{ active: state.activeTab === 'analytics' }" type="button" @click="switchTalentLibraryTab('analytics')"><i class="fas fa-chart-line"></i> 核心统计与可视化分析</button>
      </nav>
    </header>
    <main class="main-content">
      <div class="shell">
        <!-- 页签一：科技人才库 -->
        <section class="library-module-panel" id="library-module-custom-filter" :class="{ active: state.activeTab === 'library-main' }">
          <TalentMainPanel />
        </section>
        <!-- 页签二：人才TOP100 -->
        <section class="library-module-panel" id="library-module-custom-filter" :class="{ active: state.activeTab === 'custom-filter' }">
          <Top100Panel />
        </section>
        <!-- 页签三：专属人才池管理 -->
        <section class="library-module-panel" id="library-module-exclusive-pools" :class="{ active: state.activeTab === 'exclusive-pools' }">
          <ExclusivePoolsPanel />
        </section>
        <!-- 页签四：核心统计与可视化分析 -->
        <section class="library-module-panel" id="library-module-analytics" :class="{ active: state.activeTab === 'analytics' }">
          <AnalyticsPanel />
        </section>
      </div>
    </main>
    <div class="toast" :class="{ show: toastState.visible }">{{ toastState.message }}</div>
    <TalentDialogs />
  </div>
</template>

<script setup>
// 科技人才库：Vue 3 组合式 API 组件化实现（数据模块见 src/data/talent/，状态见 src/composables/talent-*.js）
import { fetchPools, fetchPotentialRecommendations } from '../../hooks/talent-pools';
import { onMounted, watch } from 'vue';
import '../../assets/styles/talent-library.css';
import TalentMainPanel from '../../components/talent/TalentMainPanel.vue';
import Top100Panel from '../../components/talent/Top100Panel.vue';
import ExclusivePoolsPanel from '../../components/talent/ExclusivePoolsPanel.vue';
import AnalyticsPanel from '../../components/talent/AnalyticsPanel.vue';
import TalentDialogs from '../../components/talent/TalentDialogs.vue';
import {
  state, toastState,
  switchTalentLibraryTab, fetchCategoryCounts, fetchTalentTypes,
} from '../../hooks/talent-library';
import { fetchDisciplineTree } from '../../hooks/discipline-tree';
import { fetchTalentPeople } from '../../hooks/talent-people';

onMounted(() => {
  fetchCategoryCounts();
  fetchTalentTypes();
  fetchDisciplineTree();
  fetchTalentPeople();
  fetchPools();
  fetchPotentialRecommendations();
  // 分享链接参数：libraryTab 指定页签；module=filter 时滚动到列表筛选区
  const params = new URLSearchParams(window.location.search);
  const libraryTab = params.get('libraryTab');
  if (['library-main', 'custom-filter', 'exclusive-pools', 'analytics'].includes(libraryTab)) switchTalentLibraryTab(libraryTab);
  if (params.get('module') === 'filter') setTimeout(() => document.getElementById('filter')?.scrollIntoView({ behavior: 'smooth' }), 80);
});

// 每次切到专属人才池页签都重新拉取服务端列表，保证与数据库一致
watch(
  () => state.activeTab,
  (tab) => {
    if (tab === 'exclusive-pools') fetchPools();
  }
);
</script>
