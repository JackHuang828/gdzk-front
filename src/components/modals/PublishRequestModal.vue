<script setup>
// 申请发布为官方报告 Modal（publishRequest）。
// 报告名称/发布类型由当前任务卡带入（preparePublishRequest），
// 提交后任务进入「审核中」（submitPublishRequest → toast）。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';
import { useDocumentsStore } from '../../stores/documents';
import { APPROVAL_SEED } from '../../data/documents';

const ui = useUiStore();
const documents = useDocumentsStore();

const form = APPROVAL_SEED.requestForm;
const context = documents.publishContext();
const summary = ref(form.defaultSummary);
const desensitize = ref([]);
const authScope = ref(form.defaultAuthScope);

function submitRequest() {
  documents.submitPublishRequest();
  ui.closeModal();
  ui.showToast(form.submitToast);
}
</script>

<template>
  <div class="grid-2">
    <div class="form-section">
      <label>报告名称</label>
      <div class="readonly-field">{{ context.title }}</div>
    </div>
    <div class="form-section">
      <label>发布类型</label>
      <div class="readonly-field">{{ context.reportType }}</div>
    </div>
  </div>
  <div class="form-section">
    <label>系统识别标签</label>
    <div class="readonly-field">{{ form.systemTags }}</div>
  </div>
  <div class="form-section">
    <label>发布摘要</label>
    <textarea v-model="summary" class="field-input" rows="3"></textarea>
  </div>
  <div class="grid-2">
    <div class="form-section">
      <label>脱敏要求</label>
      <div class="desensitize-options">
        <label v-for="option in form.desensitizeOptions" :key="option" class="checkbox-line">
          <input v-model="desensitize" type="checkbox" :value="option" /> {{ option }}
        </label>
      </div>
      <textarea class="field-input" rows="2" :placeholder="form.desensitizePlaceholder"></textarea>
    </div>
    <div class="form-section">
      <label>授权范围</label>
      <div class="choice-row">
        <button
          v-for="scope in form.authScopes"
          :key="scope"
          type="button"
          :class="{ active: authScope === scope }"
          @click="authScope = scope"
        >{{ scope }}</button>
      </div>
    </div>
  </div>
  <p class="muted" style="margin:16px 0 10px;">{{ form.hint }}</p>
  <button class="primary-btn" style="width:100%;" @click="submitRequest">{{ form.submitText }}</button>
</template>
