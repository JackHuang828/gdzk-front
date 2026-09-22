<template>
  <svg
    :width="size === 'main' ? 180 : 300"
    :height="size === 'main' ? 180 : 300"
    viewBox="0 0 300 300"
    aria-label="机构类型分布图"
  >
    <path
      v-for="sector in sectors"
      :key="sector.name"
      class="pie-sector"
      :class="{ selected: selectedName === sector.name }"
      :d="sector.d"
      :fill="sector.color"
      stroke="#fff"
      stroke-width="2"
      @click="selectable && $emit('select', sector.name)"
    ><title>{{ sector.name }}: {{ sector.value }}</title></path>
  </svg>
</template>

<script setup>
/* 饼图（原 analyticsRenderPieChart 的声明式实现）：center 150 / radius 120 / 起角 -90° */
import { computed } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  size: { type: String, default: 'main' }, // main | detail
  selectedName: { type: String, default: '' },
  selectable: { type: Boolean, default: false },
});

defineEmits(['select']);

const CENTER = 150;
const RADIUS = 120;

const total = computed(() => props.data.reduce((sum, item) => sum + item.value, 0));

const sectors = computed(() => {
  let angle = -Math.PI / 2;
  return props.data.map((item) => {
    const slice = (item.value / total.value) * Math.PI * 2;
    const x1 = CENTER + RADIUS * Math.cos(angle);
    const y1 = CENTER + RADIUS * Math.sin(angle);
    const x2 = CENTER + RADIUS * Math.cos(angle + slice);
    const y2 = CENTER + RADIUS * Math.sin(angle + slice);
    const d =
      'M ' + CENTER + ' ' + CENTER +
      ' L ' + x1 + ' ' + y1 +
      ' A ' + RADIUS + ' ' + RADIUS + ' 0 ' + (slice > Math.PI ? 1 : 0) + ' 1 ' + x2 + ' ' + y2 + ' Z';
    angle += slice;
    return { name: item.name, value: item.value, color: item.color, d };
  });
});

defineExpose({ total });
</script>
