<script setup>
// 订阅洞察报告 Modal（subscribeSettings）：订阅周期 + 发送方式（勾选「邮箱」联动显示邮箱输入）
// + 订阅内容只读说明。对应原型 #subscribeSettings / #confirmSubscribe / updateSubscribeEmailField。
import { computed, ref, watch } from 'vue';
import { useUiStore } from '../../stores/ui';

const ui = useUiStore();

const PERIODS = ['每周', '每月', '每季度', '有更新时'];
const CHANNELS = ['邮箱', '个人中心消息'];
const period = ref('每周');
const channels = ref(['个人中心消息']);
const email = ref('');
const emailActive = computed(() => channels.value.includes('邮箱'));

// 勾选变化时联动邮箱字段（updateSubscribeEmailField）
watch(emailActive, active => {
  if (!active) email.value = '';
});

function confirmSubscribe() {
  if (emailActive.value && !email.value.trim()) {
    ui.showToast('请填写接收邮箱');
    return;
  }
  if (!channels.value.length) {
    ui.showToast('请选择至少一种发送方式');
    return;
  }
  const channelText = channels.value.join('、') || '个人中心消息';
  ui.closeModal();
  ui.showToast(`已订阅：${period.value}通过${channelText}推送`);
}
</script>

<template>
  <div class="form-section">
    <label>订阅周期</label>
    <div class="choice-row">
      <button
        v-for="item in PERIODS"
        :key="item"
        type="button"
        :class="{ active: period === item }"
        @click="period = item"
      >{{ item }}</button>
    </div>
  </div>
  <div class="form-section">
    <label>发送方式</label>
    <div class="checkbox-stack">
      <label v-for="channel in CHANNELS" :key="channel" class="checkbox-line">
        <input v-model="channels" type="checkbox" :value="channel" /> {{ channel }}
      </label>
    </div>
  </div>
  <div v-show="emailActive" class="form-section">
    <label>接收邮箱</label>
    <input v-model="email" class="field-input" placeholder="请输入接收邮箱，如：name@company.com" />
  </div>
  <div class="form-section">
    <label>订阅内容</label>
    <div class="readonly-field">订阅后，系统会按照所选周期基于该洞察报告模板定期生成并推送至所选渠道。</div>
  </div>
  <button class="primary-btn" style="width:100%;margin-top:12px;" @click="confirmSubscribe">确认订阅</button>
</template>
