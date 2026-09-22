import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DOCUMENT_TASKS, APPROVAL_SEED, getApprovalStateSeed } from '../data/documents';

/**
 * 「我的报告任务」store：任务卡状态 + 发布审批状态机。
 * 对应原型 engine.js getApprovalState / preparePublishRequest / updateApprovalFlow /
 * submitPublishRequest / revokePublishRequest / reapplyPublishRequest。
 */
export const useDocumentsStore = defineStore('documents', () => {
  // 任务卡列表（含发布审批状态，可变）
  const tasks = ref(DOCUMENT_TASKS.map(task => ({ ...task, fields: { ...task.fields } })));
  // 当前发布审批操作的任务 id（publishRequest / approvalProgress Modal 上下文）
  const currentPublishTaskId = ref('');

  const currentTask = () => tasks.value.find(task => task.id === currentPublishTaskId.value) || null;

  function openPublishRequest(taskId) {
    currentPublishTaskId.value = taskId;
    return currentTask();
  }

  /** 提交发布申请：none/revoked → reviewing */
  function submitPublishRequest() {
    const task = currentTask();
    if (!task) return;
    task.fields.publishState = 'reviewing';
    task.fields.publishStatusText = '审核中';
    task.actionLabel = '查看申请';
  }

  /** 取消申请：reviewing → revoked（审批弹窗内操作） */
  function revokePublishRequest() {
    const task = currentTask();
    if (!task || task.fields.publishState !== 'reviewing') return false;
    task.fields.publishState = 'revoked';
    task.fields.publishStatusText = '已取消';
    task.actionLabel = '申请发布';
    return true;
  }

  /** 当前任务的审批状态种子（供 approvalProgress Modal 渲染） */
  function approvalState() {
    const task = currentTask();
    return getApprovalStateSeed(task ? task.fields.publishState : 'none');
  }

  /** 重新申请入口：rejected → 打开发布申请表单 */
  function canReapply() {
    const task = currentTask();
    return !!task && task.fields.publishState === 'rejected';
  }

  /** 任务卡「申请发布/查看申请」按钮的默认文案（requestForm 内兜底文案） */
  function publishContext() {
    const task = currentTask();
    return {
      title: task ? task.title : APPROVAL_SEED.requestForm.defaultReportTitle,
      reportType: task ? task.reportType : APPROVAL_SEED.requestForm.defaultReportType
    };
  }

  return {
    tasks,
    currentPublishTaskId,
    openPublishRequest,
    submitPublishRequest,
    revokePublishRequest,
    approvalState,
    canReapply,
    publishContext
  };
});
