<template>
  <div class="sidebar">
    <div class="logo">新型高端智库系统</div>

    <!-- 首页 -->
    <a href="#" class="menu-item-direct" :class="{ active: sidebarKey === 'create' && route.name === 'home' }" @click.prevent="go('home')">
      <span><svg class="home-grid-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M448 96V224H288V96H448zm0 192V416H288V288H448zM224 224H64V96H224V224zM64 288H224V416H64V288zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>首页</span>
    </a>

    <!-- 技术研判服务 -->
    <div class="menu-item" :class="{ active: sidebarKey === 'techService' }" @click.stop="toggle('strategy')">
      <span><i class="fas fa-chart-line" style="margin-right:8px;"></i>技术研判服务</span>
      <i class="fas menu-arrow" :class="open.strategy ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
    </div>
    <div class="submenu" v-show="open.strategy">
      <template v-for="group in strategyGroups" :key="group.id">
        <div class="submenu-item" @click.stop="toggleLevel3(group.id)">
          <span>{{ group.label }}</span>
          <i class="fas submenu-arrow" :class="openLevel[group.id] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
        </div>
        <div class="level3-menu" v-show="openLevel[group.id]">
          <a
            v-for="item in group.items"
            :key="item.label"
            href="#"
            class="level3-item"
            :class="{ active: item.route && route.name === item.route }"
            @click.prevent.stop="onLevel3Item(item)"
          >{{ item.label }}</a>
        </div>
      </template>
    </div>

    <!-- 科技人才智慧服务 -->
    <div class="menu-item" @click.stop="toggle('talent')">
      <span><i class="fas fa-users" style="margin-right:8px;"></i>科技人才智慧服务</span>
      <i class="fas menu-arrow" :class="open.talent ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
    </div>
    <div class="submenu" v-show="open.talent">

      <!--div class="submenu-item" @click.stop="toggleLevel3('talent-library')">
        <span>科技人才库</span>
        <i class="fas submenu-arrow" :class="openLevel['talent-library'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </div-->

      <!--div class="level3-menu" v-show="openLevel['talent-library']">
        <a href="#" class="level3-item" :class="{ active: route.name === 'talentLibrary' }" @click.prevent.stop="onLevel3Item({ label: '领域人才分类', route: 'talentLibrary' })">领域人才分类</a>
        <a href="#" class="level3-item" @click.prevent.stop="external()">人才TOP100</a>
        <a href="#" class="level3-item" @click.prevent.stop="external()">列表筛选</a>
      </div-->

      <a href="#" class="submenu-link" :class="{ active: route.name === 'talentLibrary' }" @click.prevent.stop="go('talentLibrary')">科技人才库</a>
      <a href="#" class="submenu-link" :class="{ active: route.name === 'talentList' }" @click.prevent.stop="go('talentList')">科技人才画像</a>

      <a href="#" class="submenu-link" :class="{ active: route.name === 'talentMap' }" @click.prevent.stop="go('talentMap')">科技人才地图</a>
      <a href="#" class="submenu-link" @click.prevent.stop="external()">科技人才动态</a>
    </div>

    <!-- 基础研究智能决策 -->
    <div class="menu-item" @click.stop="toggle('basic-research')">
      <span><i class="fas fa-microscope" style="margin-right:8px;"></i>基础研究智能决策</span>
      <i class="fas menu-arrow" :class="open['basic-research'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
    </div>
    <div class="submenu" v-show="open['basic-research']">
      <a href="#" class="submenu-link" @click.prevent.stop="external()">基础研究问题清单</a>
      <a href="#" class="submenu-link" @click.prevent.stop="external()">基础研究部署清单</a>
      <a href="#" class="submenu-link" @click.prevent.stop="external()">基础研究组织实施分析</a>
      <a href="#" class="submenu-link" @click.prevent.stop="external()">基础研究成果评估</a>
    </div>

    <!-- 智能问数 -->
    <div class="menu-item" @click.stop="toggle('smart-query')">
      <span><i class="fas fa-comments" style="margin-right:8px;"></i>智能问数</span>
      <i class="fas menu-arrow" :class="open['smart-query'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
    </div>
    <div class="submenu" v-show="open['smart-query']">
      <a href="#" class="submenu-link" @click.prevent.stop="external()">智能问数</a>
      <div class="submenu-item" @click.stop="toggleLevel3('smart-query-admin')">
        <span>智能问数（管理端）</span>
        <i class="fas submenu-arrow" :class="openLevel['smart-query-admin'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </div>
      <div class="level3-menu" v-show="openLevel['smart-query-admin']">
        <a href="#" class="level3-item" @click.prevent.stop="external()">数据管理</a>
        <a href="#" class="level3-item" @click.prevent.stop="external()">问数看板</a>
        <a href="#" class="level3-item" @click.prevent.stop="external()">模板管理</a>
      </div>
    </div>

    <!-- 战略咨询报告（本期原型范围） -->
    <div class="menu-item" :class="{ active: sidebarKey === 'create' && route.name !== 'home' }" @click.stop="toggle('report')">
      <span><i class="fas fa-file-alt" style="margin-right:8px;"></i>战略咨询报告</span>
      <i class="fas menu-arrow" :class="open.report ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
    </div>
    <div class="submenu" v-show="open.report">
      <a href="#" class="submenu-link" :class="{ active: isActive('create') && route.name === 'home' }" @click.prevent.stop="go('home')">报告创作</a>
      <a href="#" class="submenu-link" :class="{ active: isActive('cases') }" @click.prevent.stop="goCases()">案例广场</a>
      <a href="#" class="submenu-link" :class="{ active: isActive('hotspot') }" @click.prevent.stop="go('hotspotAnalysis')">热点分析</a>
      <a href="#" class="submenu-link" :class="{ active: isActive('materials') }" @click.prevent.stop="go('uploadKnowledge')">我的素材库</a>
      <a href="#" class="submenu-link" :class="{ active: isActive('tasks') }" @click.prevent.stop="go('documents')">我的报告任务</a>
      <a href="#" class="submenu-link" @click.prevent.stop="external()">战略咨询成果</a>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '../stores/ui';

const route = useRoute();
const router = useRouter();
const ui = useUiStore();

const strategyGroups = [
  { id: 'research-demand', label: '研究需求分析', items: [
    { label: '科技实体清单', route: 'entityList' },
    { label: '颠覆性与前沿技术分析', route: 'disruptiveTech' },
    { label: '媒体聚焦', route: 'mediaFocus' }
  ] },
  { id: 'system', label: '技术体系分析', items: [
    { label: '技术体系', route: 'techSystem' },
    { label: '论文分析', route: 'paperAnalysis' },
    { label: '专利分析', route: 'patentAnalysis' },
    { label: '科研项目分析', route: 'researchProject' },
    { label: '社会网络分析', route: 'socialNetwork' },
    { label: '分析任务（合理新加）' }
  ] },
  { id: 'trend', label: '技术趋势分析', items: ['技术趋势分析', '聚类分析', '共性网络分析', '技术动态预警'].map(label => ({ label })) },
  { id: 'roadmap', label: '领域技术路线', items: ['德尔菲问卷调查', '技术发展路线'].map(label => ({ label })) }
];

// 默认全部展开（与原型 expandAllMenus 行为一致）
const open = reactive({ strategy: true, talent: true, 'basic-research': true, 'smart-query': true, report: true });
const openLevel = reactive({
  'research-demand': true,
  system: true,
  trend: true,
  roadmap: true,
  'talent-library': true,
  'smart-query-admin': true
});

function toggle(id) {
  open[id] = !open[id];
}
function toggleLevel3(id) {
  openLevel[id] = !openLevel[id];
}

// 路由名 → 侧边栏二级菜单高亮 key（由路由 meta.sidebar 派生）
const sidebarKey = computed(() => route.meta.sidebar || null);
function isActive(key) {
  return sidebarKey.value === key;
}

function go(name) {
  router.push({ name });
}
// 三级菜单：已实现页面走路由，未实现的保持原型范围外 toast
function onLevel3Item(item) {
  if (item.route) {
    router.push({ name: item.route });
  } else {
    external();
  }
}
function goCases() {
  router.push({ name: 'caseLibrary', query: { type: 'research' } });
}
function external() {
  ui.showToast('该模块为智库系统其他页面，暂未包含在本期原型范围内');
}
</script>

<style scoped>
/* 首页图标：复刻原型 FA6 镂空网格（圆角外框 + 十字分隔），与其他菜单 13px 图标对齐 */
.home-grid-icon {
  width: 13px;
  height: 13px;
  margin-right: 8px;
  vertical-align: -2px;
  flex-shrink: 0;
  fill: var(--sci-text-2);
}
.menu-item-direct.active .home-grid-icon {
  fill: var(--sci-primary);
}
</style>
