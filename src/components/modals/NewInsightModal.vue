<script setup>
// 新建洞察 Modal（newInsight）：洞察主题 + 指标范围多选 + 创建洞察。
// 对应原型 #newInsightForm / #createInsight（提交 → toast「洞察任务已创建」并关闭）。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';

const ui = useUiStore();

const TOPIC_OPTIONS = ['政策变化', '投资事件', '城市排行', '技术路线'];
const topic = ref('V2G试点城市趋势跟踪');
const activeOptions = ref(['政策变化', '投资事件']);

function toggleOption(option) {
  activeOptions.value = activeOptions.value.includes(option)
    ? activeOptions.value.filter(item => item !== option)
    : [...activeOptions.value, option];
}

function createInsight() {
  ui.closeModal();
  ui.showToast('洞察任务已创建');
}
</script>

<template>
  <div class="form-section">
    <label>洞察主题</label>
    <input v-model="topic" class="field-input" />
  </div>
  <div class="form-section">
    <label>指标范围</label>
    <div class="choice-row">
      <button
        v-for="option in TOPIC_OPTIONS"
        :key="option"
        type="button"
        :class="{ active: activeOptions.includes(option) }"
        @click="toggleOption(option)"
      >{{ option }}</button>
    </div>
  </div>
  <button class="primary-btn" style="width:100%;margin-top:12px;" @click="createInsight">创建洞察</button>
</template>
