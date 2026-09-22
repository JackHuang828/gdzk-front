<script setup>
// 下载报告格式选择 Modal（downloadFormat）。
// 上下文：ui.modalContext = { title, isInsight }；洞察报告显示「图片格式」项。
import { useUiStore } from '../../stores/ui';

const ui = useUiStore();

function pickFormat(format) {
  const title = ui.modalContext?.title || '当前报告';
  ui.closeModal();
  ui.showToast(`已创建${format}格式下载任务：${title}`);
}
</script>

<template>
  <div class="download-format-grid" :class="{ 'is-insight': ui.modalContext?.isInsight }">
    <button type="button" class="download-format-card" @click="pickFormat('PDF')">
      <strong>PDF 格式</strong>
    </button>
    <button type="button" class="download-format-card" @click="pickFormat('Word')">
      <strong>Word 格式</strong>
    </button>
    <button
      v-if="ui.modalContext?.isInsight"
      type="button"
      class="download-format-card"
      @click="pickFormat('图片')"
    >
      <strong>图片格式</strong>
    </button>
  </div>
  <div class="download-report-name">报告名称：<span>{{ ui.modalContext?.title || '当前报告' }}</span></div>
</template>
