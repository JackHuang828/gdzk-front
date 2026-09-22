<script setup>
// 案例分页条（pagination）：功能版，复刻引擎 data-pagination 行为
// （页码高亮 / 上一页下一页禁用 / 当前页文本 / toast「已切换到第 N 页」）。
import { computed, ref } from 'vue';
import { useUiStore } from '../../stores/ui';

const props = defineProps({
  total: { type: Number, required: true },
  pages: { type: Number, required: true }
});

const ui = useUiStore();
const current = ref(1);

const pageList = computed(() => Array.from({ length: props.pages }, (_, i) => i + 1));

function setPage(page) {
  const next = Math.min(Math.max(page, 1), props.pages);
  current.value = next;
  ui.showToast(`已切换到第 ${next} 页`);
}
</script>

<template>
  <div class="pagination">
    <span>共 {{ total }} 项</span>
    <button type="button" :class="{ 'is-disabled': current === 1 }" @click="current > 1 && setPage(current - 1)">上一页</button>
    <button
      v-for="page in pageList"
      :key="page"
      type="button"
      :class="{ active: page === current }"
      @click="setPage(page)"
    >{{ page }}</button>
    <button type="button" :class="{ 'is-disabled': current === pages }" @click="current < pages && setPage(current + 1)">下一页</button>
    <span>第 <b>{{ current }}</b> / {{ pages }} 页</span>
  </div>
</template>
