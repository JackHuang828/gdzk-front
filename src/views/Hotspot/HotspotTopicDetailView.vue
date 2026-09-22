<script setup>
// 热点主题详情页（hotspotTopicDetailPage）：发展历程 / 核心事件时间线 / 专利论文 /
// 资本走势 / 专家观点。数据按路由参数主题名取 getHotspotTopic（未知主题回退首项）。
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getHotspotTopic, TOPIC_PATENT_BARS, TOPIC_CAPITAL_LINE } from '../../data/hotspot';

const route = useRoute();
const router = useRouter();
const topic = computed(() => getHotspotTopic(String(route.params.id || '')));
const detail = computed(() => topic.value.detail);
</script>

<template>
  <section class="view active" id="hotspotTopicDetailPage">
    <div class="hotspot-shell">
      <div class="hotspot-hero">
        <div>
          <h1>{{ topic.name }}</h1>
          <p>{{ detail.desc }}</p>
        </div>
        <div class="hotspot-tools">
          <button class="ghost-btn" @click="router.push({ name: 'hotspotAnalysis' })">返回热点分析</button>
        </div>
      </div>

      <div class="topic-detail-grid">
        <section class="topic-detail-panel">
          <h2>发展历程</h2>
          <p>{{ detail.history }}</p>
        </section>
        <section class="topic-detail-panel">
          <h2>核心事件时间线</h2>
          <div class="topic-detail-timeline">
            <div v-for="([date, text]) in detail.timeline" :key="date"><b>{{ date }}</b><span>{{ text }}</span></div>
          </div>
        </section>
        <section class="topic-detail-panel">
          <h2>专利与论文分析</h2>
          <div class="mini-bars">
            <span v-for="bar in TOPIC_PATENT_BARS" :key="bar.label"><b>{{ bar.label }}</b><i :style="{ '--bar': bar.bar }"></i><em>{{ bar.delta }}</em></span>
          </div>
        </section>
        <section class="topic-detail-panel">
          <h2>资本投入走势</h2>
          <svg class="hotspot-svg" viewBox="0 0 620 220" aria-label="资本投入走势">
            <line x1="48" y1="176" x2="590" y2="176" stroke="#e5ebf3"/>
            <line x1="48" y1="122" x2="590" y2="122" stroke="#e5ebf3"/>
            <line x1="48" y1="68" x2="590" y2="68" stroke="#e5ebf3"/>
            <polyline :points="TOPIC_CAPITAL_LINE" fill="none" stroke="#3158ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <g fill="#667085" font-size="12">
              <text v-for="(month, index) in ['1月', '2月', '3月', '4月', '5月', '本期']" :key="month" :x="[58, 160, 262, 364, 466, 552][index]" y="204">{{ month }}</text>
            </g>
          </svg>
        </section>
        <section class="topic-detail-panel" style="grid-column:1 / -1;">
          <h2>专家观点摘要</h2>
          <ul>
            <li v-for="text in detail.experts" :key="text">{{ text }}</li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>
