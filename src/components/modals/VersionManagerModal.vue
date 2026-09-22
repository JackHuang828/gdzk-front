<script setup>
// 版本管理 Modal（versionManager，宽幅）
import { useReportStore } from '../../stores/report';
import { useUiStore } from '../../stores/ui';

const report = useReportStore();
const ui = useUiStore();

function onAction(action) {
  ui.showToast(action === '恢复' ? '已恢复到该版本，可继续编辑' : '已打开该版本预览');
}
</script>

<template>
  <div class="content-card card" style="padding:18px;">
    <h3 style="margin-bottom:8px;">版本记录</h3>
    <p class="muted">每次点击“保存”都会自动生成一个新版本。用户可预览任意版本，也可恢复到该版本继续编辑。</p>
    <div class="version-list">
      <div class="version-record" v-for="(item, index) in report.versions" :key="index">
        <span class="version-icon">{{ item.icon }}</span>
        <div>
          <h3>{{ item.time }} 更新</h3>
          <p class="muted">{{ item.author }}</p>
        </div>
        <div class="version-actions">
          <button class="ghost-btn" type="button" @click="onAction('预览')">预览</button>
          <button class="secondary-btn" type="button" @click="onAction('恢复')">恢复</button>
        </div>
      </div>
    </div>
  </div>
</template>
