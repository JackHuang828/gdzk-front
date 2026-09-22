import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 全局 UI 状态：Toast 通知 + Modal 开关。
 * 对应原型引擎中的 showToast() / openModal() / closeModal()。
 */
export const useUiStore = defineStore('ui', () => {
  // ---- Toast ----
  const toastMessage = ref('已完成');
  const toastVisible = ref(false);
  let toastTimer = null;

  function showToast(message) {
    toastMessage.value = message;
    toastVisible.value = true;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastVisible.value = false;
    }, 1800);
  }

  // ---- Modal ----
  const modalOpen = ref(false);
  const modalType = ref('');
  const modalContext = ref({});

  function openModal(type, context = {}) {
    modalType.value = type;
    modalContext.value = context;
    modalOpen.value = true;
  }

  function closeModal() {
    modalOpen.value = false;
    modalContext.value = {};
  }

  return {
    toastMessage,
    toastVisible,
    showToast,
    modalOpen,
    modalType,
    modalContext,
    openModal,
    closeModal
  };
});
