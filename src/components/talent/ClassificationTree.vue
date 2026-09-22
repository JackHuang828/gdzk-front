<template>
  <div class="taxonomy-graph">
    <div class="taxonomy-node-row">
      <div
        v-for="(node, index) in nodes"
        :key="node[0]"
        class="classification-tree-node"
        :class="{ active: index === state.nodeIndex, expanded: index === state.nodeIndex && state.expanded }"
      >
        <button type="button" class="taxonomy-node" :class="{ active: index === state.nodeIndex }" @click="chooseNode(index)">
          <i class="fas" :class="index === state.nodeIndex && state.expanded ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
          <span><b>{{ node[0] }}</b><small>{{ node[2].toLocaleString() }} 位人才</small></span>
        </button>
        <div v-if="index === state.nodeIndex && state.expanded" class="taxonomy-leaf-panel">
          <div class="taxonomy-leaf-branches">
            <button
              v-for="(leaf, leafIndex) in node[3]"
              :key="leaf"
              type="button"
              :class="{ active: state.sub === leaf }"
              @click="pickSub(leafIndex)"
            >
              <b>{{ leaf }}</b><small>{{ childCount(node) }} 位人才</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* 领域人才分类树（原 renderClassificationTree 的 taxonomy 结构） */
import { nodes, state, chooseNode, pickSub } from '../../hooks/talent-library';

function childCount(node) {
  return Math.round(node[2] / (node[3].length || 1)).toLocaleString();
}
</script>
