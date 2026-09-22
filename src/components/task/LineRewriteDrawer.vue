<script setup>
// 行改写抽屉：输入修改需求 → 生成局部替换预览 → 应用/放弃。
import { ref, watch } from 'vue';
import { useUiStore } from '../../stores/ui';
import { generateRewritePreviewText } from '../../utils/taskReport.js';

const props = defineProps({
  originalText: { type: String, default: '' }
});
const emit = defineEmits(['close', 'apply']);

const ui = useUiStore();
const DEFAULT_INSTRUCTION = '请优化表达，使结论更清晰，并补充一条可执行建议。';

const instruction = ref(DEFAULT_INSTRUCTION);
const previewText = ref('');
const previewVisible = ref(false);

// 每次打开（originalText 变化即新选中行）重置状态
watch(() => props.originalText, () => {
  instruction.value = DEFAULT_INSTRUCTION;
  previewText.value = '';
  previewVisible.value = false;
});

function generatePreview() {
  if (!props.originalText) {
    ui.showToast('请先选择需要修改的行');
    return;
  }
  previewText.value = generateRewritePreviewText(props.originalText, instruction.value);
  previewVisible.value = true;
  ui.showToast('已生成修改预览');
}

function applyPreview() {
  if (!previewText.value) {
    ui.showToast('暂无可应用的修改预览');
    return;
  }
  emit('apply', previewText.value);
}

function discardPreview() {
  previewVisible.value = false;
  previewText.value = '';
  ui.showToast('已放弃本次修改预览');
}
</script>

<template>
  <section class="line-rewrite-drawer" aria-live="polite">
    <div class="line-rewrite-head">
      <div>
        <strong>修改当前行</strong>
        <span class="muted">选中行后输入修改需求，系统将生成局部替换预览。</span>
      </div>
      <button class="icon-btn" type="button" aria-label="关闭" @click="emit('close')">
        <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="line-rewrite-current">{{ originalText }}</div>
    <div class="line-rewrite-form">
      <textarea v-model="instruction" class="field-input" rows="4" placeholder="请输入修改需求，例如：把这一段改得更精炼，并补充一条可执行建议。"></textarea>
      <div class="line-rewrite-actions">
        <button class="ghost-btn" type="button" @click="emit('close')">放弃修改</button>
        <button class="primary-btn" type="button" @click="generatePreview">修改</button>
      </div>
    </div>
    <section class="line-rewrite-preview" v-show="previewVisible">
      <div class="line-rewrite-preview-head">
        <strong>修改预览</strong>
        <span class="muted">修改需求：{{ instruction.trim() || '优化表达' }}</span>
      </div>
      <div class="line-rewrite-preview-grid">
        <div>
          <h4>原文选中内容</h4>
          <div class="line-rewrite-preview-box">{{ originalText }}</div>
        </div>
        <div>
          <h4>修改后内容</h4>
          <div class="line-rewrite-preview-box" style="white-space:pre-line;">{{ previewText }}</div>
        </div>
      </div>
      <div class="line-rewrite-preview-actions">
        <button class="ghost-btn" type="button" @click="discardPreview">放弃预览</button>
        <button class="primary-btn" type="button" @click="applyPreview">应用修改</button>
      </div>
    </section>
  </section>
</template>
