<template>
  <div class="app">
    <Sidebar />
    <main class="main">
      <Topbar />
      <BreadcrumbNav />
      <div class="content" :class="{ 'home-wide': wide }">
        <router-view />
      </div>
    </main>
    <ModalHost />
    <ToastHost />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './layouts/Sidebar.vue';
import Topbar from './layouts/Topbar.vue';
import BreadcrumbNav from './layouts/BreadcrumbNav.vue';
import ModalHost from './layouts/ModalHost.vue';
import ToastHost from './layouts/ToastHost.vue';

const route = useRoute();
const wide = computed(() => !!route.meta.wide);

// 路由切换后收起移动端侧边栏（对应原型 activateView 中移除 body.sidebar-open）
watch(() => route.fullPath, () => {
  document.body.classList.remove('sidebar-open');
});

onMounted(() => {
  // 跨页面「研究工作区」浮层（与原型一致动态加载，脚本自包含、不纳入组件化范围）
  const script = document.createElement('script');
  script.src = '/gkx-priority-flow.js';
  document.head.appendChild(script);
});
</script>
