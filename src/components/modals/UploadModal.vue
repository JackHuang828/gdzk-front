<script setup>
// 上传资料 Modal（upload）。
// 上下文 ui.modalContext：{ kind: 'attachment' | 'knowledgeFile', title? }
// - attachment（表单附件）：调起本地文件选择，超 5 个提示；
// - knowledgeFile（知识库文档）：模拟选择本地文件。
import { computed } from 'vue';
import { useUiStore } from '../../stores/ui';
import { ATTACHMENT_UPLOAD_LIMIT, ATTACHMENT_OVER_LIMIT_MESSAGE } from '../../data/report.js';

const ui = useUiStore();
const isKnowledgeFile = computed(() => ui.modalContext?.kind === 'knowledgeFile');
const formatRule = computed(() => isKnowledgeFile.value ? '支持 PDF / Word / Excel' : '支持 PDF / Word / Excel / PPT / 图片');
const limitRule = computed(() => isKnowledgeFile.value ? '限制10个文档，每个大小不超过50MB' : '最多 5 个文件，单文件不超过 50MB');

const ACCEPT = [
  '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg',
  'application/pdf,application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/*'
].join(',');

function pickLocalFile() {
  if (!isKnowledgeFile.value) {
    // 表单附件：真实文件选择 + 数量校验（同引擎 data-upload=local 分支）
    const picker = document.createElement('input');
    picker.type = 'file';
    picker.multiple = true;
    picker.accept = ACCEPT;
    picker.addEventListener('change', () => {
      const files = [...(picker.files || [])];
      if (files.length > ATTACHMENT_UPLOAD_LIMIT) {
        ui.showToast(ATTACHMENT_OVER_LIMIT_MESSAGE);
        return;
      }
      if (files.length) {
        ui.showToast(`已选择 ${files.length} 个附件`);
        ui.closeModal();
      }
    }, { once: true });
    picker.click();
    return;
  }
  ui.showToast('已模拟选择本地文件');
  ui.closeModal();
}
</script>

<template>
  <div class="upload-options">
    <button class="upload-card" type="button" @click="pickLocalFile">
      <svg class="icon" viewBox="0 0 24 24"><path d="M12 16V4M7 9l5-5 5 5M20 16v4H4v-4"/></svg>
      <span class="upload-copy">
        <strong>本地上传</strong>
        <span class="muted">点击选择或拖拽文件到此处</span>
        <span class="upload-rules">
          <span>{{ formatRule }}</span>
          <span>{{ limitRule }}</span>
        </span>
      </span>
    </button>
  </div>
</template>
