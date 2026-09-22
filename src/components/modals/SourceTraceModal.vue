<script setup>
// 数据溯源 Modal（sourceTrace，宽幅）。上下文：ui.modalContext.source
import { computed } from 'vue';
import { useUiStore } from '../../stores/ui';
import { SOURCE_TRACE_ROWS } from '../../data/report.js';

const ui = useUiStore();
const source = computed(() => ui.modalContext?.source || SOURCE_TRACE_ROWS[0]);
</script>

<template>
  <div class="content-card card" style="padding:18px;">
    <h3 style="margin-bottom:8px;">{{ source.name }}</h3>
    <p class="muted">{{ source.scope }}</p>
    <div>
      <table class="trace-table">
        <thead><tr><th>指标</th><th>数值</th><th>单位</th><th>维度</th></tr></thead>
        <tbody>
          <tr v-for="(row, rIndex) in source.metrics" :key="rIndex">
            <td v-for="(cell, cIndex) in row" :key="cIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
