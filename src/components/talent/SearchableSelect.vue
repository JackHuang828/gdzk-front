<template>
  <div ref="root" :class="wrapperClass">
    <!-- 原生 select 保留（隐藏），保持与原型一致的表单结构 -->
    <select :class="isTop ? 'top-custom-native-select' : 'searchable-native-select'" :value="modelValue" aria-hidden="true" tabindex="-1">
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
    <button v-if="isTop" type="button" class="top-custom-search-trigger" @click="toggle">
      <span>{{ selectedLabel }}</span><i class="fas fa-chevron-down"></i>
    </button>
    <button v-else type="button" class="searchable-select-trigger" @click="toggle">{{ selectedLabel }}</button>
    <div v-if="isTop" v-show="open" class="top-custom-search-menu" @click.stop>
      <input v-model="keyword" type="search" placeholder="搜索参数" />
      <div class="top-custom-search-options">
        <template v-if="entries.length">
          <button v-for="entry in entries" :key="entry.value" type="button" :class="{ active: entry.value === modelValue }" @click="choose(entry.value)">{{ entry.label }}</button>
        </template>
        <p v-else>暂无匹配参数</p>
      </div>
    </div>
    <div v-else v-show="open" class="searchable-select-menu" role="listbox" @click.stop>
      <input v-model="keyword" type="search" class="searchable-select-search" placeholder="搜索参数" aria-label="搜索筛选参数" />
      <div class="searchable-select-options">
        <template v-if="entries.length">
          <button v-for="entry in entries" :key="entry.value" type="button" class="searchable-select-option" :class="{ active: entry.value === modelValue }" role="option" :aria-selected="entry.value === modelValue" @click="choose(entry.value)">{{ entry.label }}</button>
        </template>
        <div v-else class="searchable-select-empty">暂无匹配参数</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* 可搜索下拉：包装原生 select，提供触发按钮 + 搜索 + 选项列表。
 * variant="main" 对应主筛选区（searchable-select-*），
 * variant="top" 对应人才TOP100侧栏（top-custom-search-*）。 */
import { ref, computed, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  variant: { type: String, default: 'main' },
});
const emit = defineEmits(['update:modelValue']);

const root = ref(null);
const open = ref(false);
const keyword = ref('');

const isTop = computed(() => props.variant === 'top');
const wrapperClass = computed(() => ({
  [isTop.value ? 'top-custom-searchable' : 'searchable-select']: true,
  open: open.value,
}));

const selectedLabel = computed(() => props.modelValue || props.placeholder);

/* 选项含“（全部）”空值项，与原型下拉的第一项一致 */
const entries = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  const all = [{ value: '', label: props.placeholder }, ...props.options.map((option) => ({ value: option, label: option }))];
  return query ? all.filter((entry) => entry.label.toLowerCase().includes(query)) : all;
});

function onDocClick(event) {
  if (root.value && !root.value.contains(event.target)) close();
}

function toggle() {
  open.value = !open.value;
  keyword.value = '';
  if (open.value) document.addEventListener('click', onDocClick, true);
  else document.removeEventListener('click', onDocClick, true);
}

function choose(value) {
  emit('update:modelValue', value);
  close();
}

function close() {
  open.value = false;
  document.removeEventListener('click', onDocClick, true);
}

onBeforeUnmount(close);
</script>
