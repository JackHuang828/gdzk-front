<script setup>
// 选择知识库素材 Modal（materialSelect）。
// 上下文 ui.modalContext：{ files: string[] }——选中的素材名追加进该数组（去重）。
import { computed, ref } from 'vue';
import { useUiStore } from '../../stores/ui';

const ui = useUiStore();
const keyword = ref('');

const MATERIALS = [
  { name: '低空经济政策包', meta: '政策文件 42 份 · 城市试点 18 条 · 已授权' },
  { name: 'AI硬件产业资料', meta: '研究报告 12 篇 · 企业图谱 · 投融资数据' },
  { name: '新能源材料数据包', meta: '指标表格 · 专家观点 · 区域案例' },
  { name: '城市治理政策资料', meta: '政策文件 28 份 · 城市案例 16 条' },
  { name: '消费市场趋势数据库', meta: '消费指标 · 人群洞察 · 市场月报' },
  { name: '产业专家访谈纪要', meta: '专家观点 36 条 · 访谈纪要 14 份' }
];

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  return MATERIALS.filter(item => !kw || item.name.toLowerCase().includes(kw) || item.meta.toLowerCase().includes(kw));
});

function pick(material) {
  const files = ui.modalContext?.files;
  if (Array.isArray(files) && !files.includes(material.name)) {
    files.push(material.name);
  }
  ui.closeModal();
  ui.showToast(`已选择素材：${material.name}`);
}
</script>

<template>
  <div class="material-picker">
    <label class="search">
      <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
      <input v-model="keyword" placeholder="搜索素材名称、行业、标签" />
    </label>
    <div class="material-picker-list">
      <button
        v-for="material in filtered"
        :key="material.name"
        type="button"
        class="material-option"
        @click="pick(material)"
      >
        <span><strong>{{ material.name }}</strong><span class="muted">{{ material.meta }}</span></span>
        <span class="action-chip">选择</span>
      </button>
    </div>
  </div>
</template>
