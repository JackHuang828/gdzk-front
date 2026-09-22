<template>
  <div v-if="crumbs.length" class="breadcrumb-bar">
    <div class="breadcrumb">
      <template v-if="showHome">
        <i class="fas fa-home"></i>
        <span>首页</span>
      </template>
      <template v-for="(item, i) in crumbs" :key="i">
        <i v-show="i !== 0" class="fas fa-chevron-right"></i>
        <span @click="go(item)">{{ item.text || item }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// meta.crumbs：字符串数组（静态链），或 (route) => 数组（详情页动态末级）。
// 数组项支持字符串或 { text, to }（可点击跳转）。
// meta.crumbsHome：true 时在链首渲染 🏠 首页（技术体系分析系列页面）。
// 未配置 crumbs 的路由不渲染。
const crumbs = computed(() => {
  const c = route.meta.crumbs;
  if (!c) return [];
  return typeof c === 'function' ? c(route) : c;
});
const showHome = computed(() => !!route.meta.crumbsHome);

function go(item) {
  if (item && item.to) router.push(item.to);
}
</script>

<style scoped>
/* 覆盖 prototype.css 全局 .breadcrumb span 的手型光标与悬停变色，面包屑文字按普通文本呈现 */
.breadcrumb span {
  cursor: default;
}
.breadcrumb span:hover {
  color: #666;
}
.breadcrumb span:last-child:hover {
  color: #333;
}
</style>
