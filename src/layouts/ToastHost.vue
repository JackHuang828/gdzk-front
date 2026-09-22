<template>
  <div class="toast" :class="{ show: ui.toastVisible }" role="status">{{ ui.toastMessage }}</div>
</template>

<script setup>
import { useUiStore } from '../stores/ui';
const ui = useUiStore();
</script>
