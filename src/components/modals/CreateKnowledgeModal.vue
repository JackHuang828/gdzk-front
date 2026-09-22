<script setup>
// 创建知识库合集 Modal（createKnowledge）：名称 + 简述 + 批量上传占位。
// 提交后向知识库 tab 插入合集卡（confirmCreateKnowledge → toast「知识库合集已创建」）。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';

const ui = useUiStore();
const materials = useMaterialsStore();

const name = ref('低空经济政策与试点合集');
const desc = ref('归集低空经济相关政策文件、城市试点、监管平台资料和应用场景案例，用于研究报告与战略咨询报告生成。');

function confirmCreate() {
  materials.addPack(name.value.trim(), desc.value.trim());
  ui.closeModal();
  ui.showToast('知识库合集已创建');
}
</script>

<template>
  <div class="form-section">
    <label>知识库名称</label>
    <input v-model="name" class="field-input" placeholder="如：低空经济政策与试点合集" />
  </div>
  <div class="form-section">
    <label>内容简述</label>
    <textarea v-model="desc" class="field-input" rows="4" placeholder="简要说明这个知识库合集收录的资料类型、使用场景和适用报告。"></textarea>
  </div>
  <div class="form-section">
    <label>上传文档（支持批量）</label>
    <button type="button" class="upload-dropzone" style="width:100%;">
      <strong>本地上传</strong>
      <span class="muted">点击选择或拖拽文件到此处</span>
      <span class="upload-rules">
        <span>支持 PDF / Word / Excel</span>
        <span>限制10个文档，每个大小不超过50MB</span>
      </span>
    </button>
  </div>
  <button class="primary-btn" style="width:100%;margin-top:12px;" @click="confirmCreate">创建知识库合集</button>
</template>
