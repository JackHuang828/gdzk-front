<script setup>
// 删除确认 Modal（deleteKnowledge）：知识库合集 / 素材文件共用，提示文案随上下文变化。
// 确认后移除目标卡片（confirmDeleteKnowledge → toast「已删除知识库素材」）。
import { computed } from 'vue';
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';

const ui = useUiStore();
const materials = useMaterialsStore();

const PACK_HINT =
  '删除后将移除该知识库文件夹及其关联文档、切片索引和标签配置；已发布内容中的引用链接也将无法打开。此操作不可直接恢复。';
const FILE_HINT = '删除后将移除该素材文件及其切片索引。此操作不可直接恢复。';

const hint = computed(() => {
  const ctx = ui.modalContext || {};
  if (ctx.kind === 'file') return FILE_HINT;
  if (ctx.kind === 'pack') return PACK_HINT;
  return PACK_HINT;
});

function confirmDelete() {
  const ctx = ui.modalContext || {};
  if (ctx.kind === 'file' && ctx.id) materials.removeFile(ctx.id);
  if (ctx.kind === 'pack' && ctx.id) materials.removePack(ctx.id);
  ui.closeModal();
  ui.showToast('已删除知识库素材');
}
</script>

<template>
  <div class="content-card card" style="padding:18px;">
    <h3 style="margin-bottom:10px;">确认删除知识库？</h3>
    <p class="muted">{{ hint }}</p>
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">
      <button class="ghost-btn" @click="ui.closeModal()">取消</button>
      <button class="primary-btn" @click="confirmDelete">确认删除</button>
    </div>
  </div>
</template>
