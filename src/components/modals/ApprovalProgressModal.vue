<script setup>
// 审批流程 Modal（approvalProgress）：提交申请 → 审批中 → 结果 三节点状态机。
// 节点/结果文案按当前任务审批状态渲染（updateApprovalFlow），支持取消申请与重新申请。
import { computed } from 'vue';
import { useUiStore } from '../../stores/ui';
import { useDocumentsStore } from '../../stores/documents';
import { APPROVAL_SEED } from '../../data/documents';

const ui = useUiStore();
const documents = useDocumentsStore();

// 渲染序列：节点与箭头交替（submit → → review → → outcome）
const items = computed(() => {
  const state = documents.approvalState();
  const nodes = APPROVAL_SEED.nodes.map(node => ({
    ...node,
    time: node.key === 'outcome' ? state.outcomeTime : node.time,
    label: node.key === 'outcome' ? state.outcomeTitle : node.label,
    active: state.activeNode === node.key,
    reject: node.key === 'outcome' && state.flowTitle === '审批失败'
  }));
  return nodes.flatMap((node, index) => (
    index < nodes.length - 1 ? [{ type: 'node', node }, { type: 'arrow' }] : [{ type: 'node', node }]
  ));
});

const isReviewing = computed(() => documents.approvalState().canRevoke);
const canReapply = computed(() => documents.approvalState().canReapply);

function revoke() {
  if (documents.revokePublishRequest()) {
    ui.showToast(APPROVAL_SEED.requestForm.revokeToast);
  }
}

function reapply() {
  if (documents.canReapply()) {
    // 驳回后重新申请：回到发布申请表单（reapplyPublishRequest → openModal('publishRequest')）
    ui.openModal('publishRequest');
  }
}
</script>

<template>
  <div class="approval-flow">
    <div class="approval-map">
      <template v-for="(item, index) in items" :key="index">
        <div v-if="item.type === 'arrow'" class="approval-arrow">→</div>
        <div v-else class="approval-node" :class="[item.node.key, { active: item.node.active, reject: item.node.reject }]">
          <h3>{{ item.node.label }}</h3>
          <time>{{ item.node.time }}</time>
          <small v-if="item.node.key === 'outcome' && documents.approvalState().outcomeReasonLead">
            {{ documents.approvalState().outcomeReasonLead }}<template v-if="documents.approvalState().outcomeReasonDetail"><br />{{ documents.approvalState().outcomeReasonDetail }}</template>
          </small>
        </div>
      </template>
    </div>
    <div class="approval-branches">
      <button v-if="isReviewing" class="ghost-btn" @click="revoke">取消申请</button>
      <button v-if="canReapply" class="primary-btn" @click="reapply">重新申请</button>
    </div>
  </div>
</template>
