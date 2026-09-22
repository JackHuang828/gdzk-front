<script setup>
// 战略咨询报告任务配置（strategyForm）
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useReportStore } from '../../stores/report';
import MaterialPicker from '../../components/forms/MaterialPicker.vue';

const router = useRouter();
const ui = useUiStore();
const report = useReportStore();

const subject = ref('一家拥有50家店的传统烘焙连锁');
const painPoint = ref('面临线上平替冲击，希望在3个月内完成数字化转型，并形成门店、会员、供应链一体化升级方案。');
const expertOpinion = ref('建议重点关注门店数字化、会员运营、供应链协同和线上线下一体化增长路径。');
const progressText = ref('需求澄清中...');

function saveTemplate() {
  ui.showToast('当前任务配置已保存为模板');
}

function cancelTask() {
  router.push({ name: 'home' });
}

function generate() {
  progressText.value = '战略咨询报告写作任务进行中...';
  ui.showToast('智能体正在生成核心建议');
  window.setTimeout(() => {
    progressText.value = '核心建议已生成';
    report.setTaskReport({
      type: '战略咨询报告',
      title: '传统烘焙连锁数字化转型战略咨询报告',
      returnView: 'home'
    });
    router.push({ name: 'taskReportDetail' });
  }, 700);
}
</script>

<template>
  <section class="view active" id="strategyForm">
    <div class="hero">
      <h1>一键输入需求，开启深度创作</h1>
    </div>
    <div class="form-shell">
      <div class="task-card card">
        <header>
          <span>任务澄清</span>
          <span class="faint">⌄</span>
        </header>
        <div class="form-section">
          <label>1. 行动主体 <span class="required-star">*</span></label>
          <input v-model="subject" id="topicInput" class="field-input" placeholder="输入你的公司/品牌名称，如：一家拥有50家店的传统烘焙连锁" />
        </div>
        <div class="form-section">
          <label>2. 核心痛点 / 战略目标 <span class="required-star">*</span></label>
          <textarea v-model="painPoint" class="field-input" rows="4" placeholder="如：面临线上平替冲击，希望在3个月内完成数字化转型"></textarea>
        </div>
        <div class="form-section">
          <label>3. 专家意见</label>
          <textarea v-model="expertOpinion" class="field-input" rows="4" placeholder="请输入关于该主题的战略判断、发展建议、实施路径或风险提示，系统会结合主题自动整理为可写作视角。"></textarea>
        </div>
        <div class="form-section">
          <label>4. 从我的知识库选择素材</label>
          <MaterialPicker :default-files="['企业转型素材包']" />
        </div>
        <div class="form-actions">
          <button class="ghost-btn" type="button" @click="saveTemplate">保存为模板</button>
          <button class="ghost-btn" type="button" @click="cancelTask">取消任务</button>
          <button class="primary-btn" type="button" @click="generate">开始写作任务</button>
        </div>
      </div>
      <div class="bottom-input">
        <span>{{ progressText }}</span>
        <span class="tiny-stop">■</span>
      </div>
    </div>
  </section>
</template>
