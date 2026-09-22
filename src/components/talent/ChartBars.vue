<template>
  <div class="bars-wrapper">
    <div
      v-for="item in data"
      :key="item.name"
      class="bar-item"
      :class="{ selected: selectedName === item.name }"
      style="width: 60px"
      @click="selectable && $emit('select', item.name)"
    >
      <div class="bar" :style="{ height: barHeight(item) + 'px', background: item.color }">
        <div class="bar-value">{{ item.value }}</div>
      </div>
      <div class="bar-label">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup>
/* 柱状图（原 analyticsRenderBarChart 的声明式实现） */
import { computed } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  selectedName: { type: String, default: '' },
  selectable: { type: Boolean, default: false },
});

defineEmits(['select']);

const maxValue = computed(() => Math.max(...props.data.map((item) => item.value), 1));

function barHeight(item) {
  return (item.value / maxValue.value) * 220;
}
</script>
