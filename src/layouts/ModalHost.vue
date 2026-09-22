<template>
  <div
    class="modal-backdrop"
    :class="{ open: ui.modalOpen }"
    role="dialog"
    aria-modal="true"
    @click.self="ui.closeModal()"
  >
    <div class="modal" :class="{ 'modal-wide': entry.wide }">
      <div class="modal-head">
        <h2>{{ title }}</h2>
        <button class="icon-btn" aria-label="关闭" @click="ui.closeModal()">
          <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <p v-if="desc" class="muted">{{ desc }}</p>
      <component :is="entry.component" v-if="entry.component" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useUiStore } from '../stores/ui';
import { modalRegistry } from '../components/modals/registry';

const ui = useUiStore();

const entry = computed(() => modalRegistry[ui.modalType] || {});

const title = computed(() => {
  const t = entry.value.title;
  return typeof t === 'function' ? t(ui.modalContext) : (t || '');
});

const desc = computed(() => {
  const d = entry.value.desc;
  return typeof d === 'function' ? d(ui.modalContext) : (d || '');
});

function onKeydown(event) {
  if (event.key === 'Escape' && ui.modalOpen) ui.closeModal();
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>
