<template>
  <!-- 页签一：科技人才库（领域人才分类 → 列表筛选 → 人才清单） -->
  <section class="steps">
    <div class="step" :class="{ active: state.step === 'class' }" @click="go('class')"><b>1　领域人才分类</b><small>选择节点、子节点与叶子节点</small></div>
    <div class="step" :class="{ active: state.step === 'filter' }" @click="go('filter')"><b>2　列表筛选</b><small>叠加学科、机构、项目与成果条件</small></div>
    <div class="step" :class="{ active: state.step === 'result' }" @click="go('result')"><b>3　人才清单与后续动作</b><small>画像、入池、导出和持续跟踪</small></div>
  </section>
  <div class="talent-library-layout">
    <aside class="card">
      <div class="node-panel-header">
        <div class="title">领域人才分类</div>
        <button class="node-clear" type="button" :disabled="state.nodeIndex == null" @click="clearNodeSelection">清除选择</button>
      </div>
      <div class="nodes">
        <ClassificationTree />
      </div>
    </aside>
    <div class="talent-library-main">
      <section class="search-zone search-conditions-zone">
        <div class="search-zone-heading">
          <div>
            <h2>搜索条件区</h2>
            <p>通过分类节点、层级学科和补充条件逐步定位目标科技人才。</p>
          </div>
        </div>
        <section class="grid" id="class">
          <section class="card scope">
            <div style="display: flex; justify-content: space-between">
              <div>
                <small style="color: #165dff">领域人才分类 · 当前范围</small>
                <h2>{{ activeNode ? activeNode[0] : '未选择分类节点' }}</h2>
                <p>{{ activeNode ? activeNode[1] : '尚未选择分类节点' }}</p>
              </div>
              <button class="btn" type="button" @click="openDialog('graph')">关联图谱</button>
            </div>
            <div class="path">
              <template v-if="activeNode">
                <span class="tag">{{ activeNode[0] }}</span>
                <span v-if="state.sub" class="tag">{{ state.sub }}</span>
              </template>
              <span v-else class="tag">未选择节点</span>
              <span class="tag">人才集合</span>
            </div>
            <div class="subnodes">
              <button
                v-for="(subName, subIndex) in (activeNode ? activeNode[3] : [])"
                :key="subName"
                class="sub"
                :class="{ active: state.sub === subName }"
                type="button"
                @click="pickSub(subIndex)"
              >
                <b>{{ subName }}</b>
                <small><i class="fas fa-user-friends"></i> {{ subCount(subIndex) }} 人才　<i class="fas fa-building"></i> {{ 42 + subIndex * 15 }} 机构</small>
              </button>
            </div>
          </section>
        </section>
        <FilterCard />
      </section>
      <ResultZone />
    </div>
  </div>
</template>

<script setup>
import ClassificationTree from './ClassificationTree.vue';
import FilterCard from './FilterCard.vue';
import ResultZone from './ResultZone.vue';
import {
  state, activeNode,
  go, pickSub, clearNodeSelection, openDialog,
} from '../../hooks/talent-library';

function subCount(subIndex) {
  const node = activeNode.value;
  if (!node) return '0';
  return Math.round(node[2] / (node[3].length || 1)).toLocaleString();
}
</script>
