<script setup>
// 表单素材区（.source-inline）：知识库选择 + 已选文件 + 上传附件。
// 研究/战略表单共用；defaultFiles 为预置已选素材名。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';

const props = defineProps({
  defaultFiles: { type: Array, default: () => [] }
});

const ui = useUiStore();
const files = ref([...props.defaultFiles]);

function openMaterialSelect() {
  // 把响应式数组交给 Modal，选中后直接追加
  ui.openModal('materialSelect', { files: files.value });
}

function openUpload() {
  ui.openModal('upload', { kind: 'attachment' });
}

function removeFile(index) {
  files.value.splice(index, 1);
}
</script>

<template>
  <div class="source-inline">
    <div class="source-actions">
      <button class="source-action-btn primary" type="button" @click="openMaterialSelect">从我的知识库选择</button>
    </div>
    <div class="selected-file-list">
      <span class="selected-file" v-for="(name, index) in files" :key="name">
        <span class="file-icon">文</span><span>{{ name }}</span>
        <button type="button" aria-label="移除素材" @click="removeFile(index)">&times;</button>
      </span>
    </div>
    <button class="upload-dropzone" type="button" @click="openUpload">
      <strong>上传附件</strong>
      <span>拖拽 PDF、Word、Excel、PPT 或图片到这里，或点击选择本地文件。</span>
      <span class="upload-rules">
        <span>最多 5 个文件，单文件不超过 50MB</span>
      </span>
    </button>
  </div>
</template>
