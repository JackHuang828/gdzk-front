<script setup>
// 投融资事件详情页（hotspotInvestmentEventDetailPage）：事件概览 / 进展时间线 / 关联分析。
// 数据按路由参数事件 id 取 getHotspotInvestmentEvent（未知 id 回退深圳首条）。
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getHotspotInvestmentEvent, buildEventAnalysis } from '../../data/hotspot';

const route = useRoute();
const router = useRouter();
const event = computed(() => getHotspotInvestmentEvent(String(route.params.id || '')));
const fields = computed(() => [
  { label: '发生地区', text: event.value.region },
  { label: '投资机构', text: event.value.agency },
  { label: '金额区间', text: event.value.amount },
  { label: '相关技术方向', text: event.value.tech }
]);
const analysis = computed(() => buildEventAnalysis(event.value));
</script>

<template>
  <section class="view active" id="hotspotInvestmentEventDetailPage">
    <div class="hotspot-shell">
      <div class="hotspot-hero">
        <div>
          <h1>{{ event.title }}</h1>
          <p>{{ event.region }} · {{ event.stage }} · {{ event.date }}</p>
        </div>
        <div class="hotspot-tools">
          <button class="ghost-btn" @click="router.push({ name: 'hotspotAnalysis' })">返回热点分析</button>
        </div>
      </div>

      <div class="event-detail-grid">
        <section class="event-detail-panel">
          <h2>事件概览</h2>
          <div class="event-field-list">
            <div v-for="field in fields" :key="field.label"><b>{{ field.label }}</b>{{ field.text }}</div>
          </div>
        </section>
        <section class="event-detail-panel">
          <h2>事件进展</h2>
          <div class="event-timeline">
            <div v-for="(text, index) in event.progress" :key="text"><b>进展 {{ index + 1 }}</b>{{ text }}</div>
          </div>
        </section>
        <section class="event-detail-panel" style="grid-column:1 / -1;">
          <h2>关联分析</h2>
          <div class="event-field-list">
            <div v-for="item in analysis" :key="item.label"><b>{{ item.label }}</b>{{ item.text }}</div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
