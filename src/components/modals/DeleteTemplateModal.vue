<script setup>
// 删除模板确认 Modal（deleteTemplate）。
// 确认后从模板库移除该模板（confirmDeleteTemplate → toast「模板已删除」）。
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';

const ui = useUiStore();
const materials = useMaterialsStore();

function confirmDelete() {
  const id = ui.modalContext?.id;
  if (id) materials.removeTemplate(id);
  ui.closeModal();
  ui.showToast('模板已删除');
}
</script>

<template>
  <div class="content-card card" style="padding:18px;">
    <h3 style="margin-bottom:10px;">确认删除模板？</h3>
    <p class="muted">删除后该模板将从模板库移除，后续不能再被新任务引用；已生成的报告内容不会受到影响。</p>
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">
      <button class="ghost-btn" @click="ui.closeModal()">取消</button>
      <button class="primary-btn" @click="confirmDelete">确认删除</button>
    </div>
  </div>
</template>
