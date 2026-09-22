<script setup>
// 我的报告任务（documents）：任务表 + 状态筛选 + 分页。
// 交互对应原型：data-task-filter（状态过滤 + 汇总文案）、行点击进入任务详情、
// 「下载」打开下载格式 Modal、「申请发布/查看申请」按审批状态打开发布申请或审批流程 Modal。
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useDocumentsStore } from '../../stores/documents';
import { TASK_STATUS_FILTERS } from '../../data/documents';

const router = useRouter();
const ui = useUiStore();
const documents = useDocumentsStore();

const industry = ref('全部');
const industries = ['全部', '人工智能', '新能源', '低空经济', '半导体', '生物医药', '量子计算', '具身智能', 'SaaS'];
const statusFilter = ref('all');
const page = ref(1);

const statusLabels = { done: '已完成', running: '生成中', draft: '未生成' };
const statusClass = { done: 'done', running: 'running', draft: 'draft' };

const visibleTasks = computed(() => documents.tasks.filter(task =>
  statusFilter.value === 'all' || task.status === statusFilter.value
));

function pickStatus(key) {
  statusFilter.value = key;
  ui.showToast(`已筛选${TASK_STATUS_FILTERS.find(item => item.key === key)?.label || '全部'}任务`);
}

function openTask() {
  router.push({ name: 'taskReportDetail' });
}

function onAction(task, action) {
  if (action === '下载') {
    ui.openModal('downloadFormat', { title: task.title, isInsight: task.reportType === '洞察报告' });
    return;
  }
  openTask();
}

// 发布审批入口：非 none/revoked 状态打开审批流程，否则打开发布申请表单（engine 2787-2800）
function openPublish(task) {
  documents.openPublishRequest(task.id);
  const state = task.fields.publishState;
  if (state !== 'none' && state !== 'revoked') {
    ui.openModal('approvalProgress');
  } else {
    ui.openModal('publishRequest');
  }
}

function pickPage(target) {
  if (target === 'prev') page.value = Math.max(1, page.value - 1);
  else if (target === 'next') page.value = Math.min(4, page.value + 1);
  else page.value = target;
  ui.showToast(`已切换到第 ${page.value} 页`);
}
</script>

<template>
  <section class="view active" id="documents">
    <div class="page-title">
      <div>
        <h1>我的报告任务</h1>
        <p class="muted">报告生成会在后台继续执行，退出页面后也可回到这里查看进度、状态和结果。</p>
      </div>
      <button class="primary-btn" @click="router.push({ name: 'home', query: { form: 'customForm' } })">新建报告任务</button>
    </div>

    <div class="library-filters card">
      <div class="filter-line">
        <strong>热门行业</strong>
        <button
          v-for="item in industries"
          :key="item"
          type="button"
          class="filter-chip"
          :class="{ active: industry === item }"
          @click="industry = item"
        >{{ item }}</button>
      </div>
      <div class="filter-line">
        <label class="search" style="max-width:360px;">
          <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
          <input placeholder="搜索报告标题、全文关键词" />
        </label>
        <details class="filter-select">
          <summary>更新时间：近一年</summary>
          <div class="select-menu">
            <button class="active" type="button">近一年</button>
            <button type="button">近半年</button>
            <button type="button">近三个月</button>
            <button type="button">2026年</button>
            <button type="button">2025年</button>
          </div>
        </details>
        <details class="filter-select task-status-select">
          <summary>任务状态：{{ TASK_STATUS_FILTERS.find(item => item.key === statusFilter)?.label }}</summary>
          <div class="select-menu">
            <button
              v-for="item in TASK_STATUS_FILTERS"
              :key="item.key"
              type="button"
              :class="{ active: statusFilter === item.key }"
              @click="pickStatus(item.key)"
            >{{ item.label }}</button>
          </div>
        </details>
      </div>
    </div>

    <div class="task-list task-table">
      <div class="task-table-head" aria-hidden="true">
        <span>报告名称</span>
        <span>报告类型</span>
        <span>任务状态</span>
        <span>更新时间</span>
        <span>发布审核</span>
        <span>操作</span>
      </div>
      <button
        v-for="task in visibleTasks"
        :key="task.id"
        type="button"
        class="report-task-card task-table-row"
        :data-task-status="task.status"
        @click="openTask"
      >
        <span class="task-report-cell">
          <strong>{{ task.title }}</strong>
          <span class="tag-list"><span v-for="tag in task.fields.tags" :key="tag" class="tag">{{ tag }}</span></span>
        </span>
        <span class="report-type" :class="{ strategy: task.reportType === '战略咨询报告', insight: task.reportType === '洞察报告' }">{{ task.reportType }}</span>
        <span class="status-pill" :class="statusClass[task.status]">{{ statusLabels[task.status] }}</span>
        <time class="task-time">{{ task.date }}</time>
        <span class="publish-status" :class="task.fields.publishState === 'none' || task.fields.publishState === 'revoked' ? 'empty' : task.fields.publishState">{{ task.fields.publishStatusText }}</span>
        <span class="footer-actions task-row-actions">
          <template v-for="action in task.fields.actions" :key="action">
            <span
              v-if="action === '申请发布' || action === '查看申请'"
              class="action-chip secondary"
              @click.stop="openPublish(task)"
            >{{ action }}</span>
            <span v-else class="action-chip" :class="{ secondary: task.fields.actions.indexOf(action) > 0 }" @click.stop="onAction(task, action)">{{ action }}</span>
          </template>
        </span>
      </button>
    </div>

    <div class="pagination">
      <span>共 28 项</span>
      <button type="button" :class="{ 'is-disabled': page === 1 }" @click="pickPage('prev')">上一页</button>
      <button
        v-for="num in 4"
        :key="num"
        type="button"
        :class="{ active: page === num }"
        @click="pickPage(num)"
      >{{ num }}</button>
      <button type="button" :class="{ 'is-disabled': page === 4 }" @click="pickPage('next')">下一页</button>
      <span>第 <b>{{ page }}</b> / 4 页</span>
    </div>
  </section>
</template>
