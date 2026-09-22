<script setup>
// 技术领域热点分布页（hotspotFieldDistributionPage）：从热点概览 KPI 下钻而来的独立分布页。
// 内容与热点分析页内嵌面板一致：领域占比环图 + 近 6 期增长趋势 + 三条结论。
import { useRouter } from 'vue-router';
import { FIELD_SHARES, FIELD_SHARE_TOTAL, FIELD_GROWTH_LINES, FIELD_GROWTH_SUMMARY, FIELD_FILTER_CHIPS } from '../../data/hotspot';

const router = useRouter();
</script>

<template>
  <section class="view active" id="hotspotFieldDistributionPage">
    <div class="hotspot-shell">
      <div class="hotspot-hero">
        <div>
          <h1>技术领域热点分布页</h1>
          <p>展示各技术领域热点的分布占比与增长趋势，区别于按地区展示的投融资热点分布图。</p>
        </div>
        <div class="hotspot-tools">
          <button class="ghost-btn" @click="router.push({ name: 'hotspotAnalysis' })">返回热点分析</button>
        </div>
      </div>

      <section class="hotspot-panel">
        <div class="hotspot-panel-head">
          <div>
            <h2>技术领域热点分布</h2>
            <p>按热点主题数统计各领域热度占比，并展示近 6 期增长趋势。</p>
          </div>
          <div class="hotspot-filter-bar">
            <button v-for="(chip, index) in FIELD_FILTER_CHIPS" :key="chip" type="button" class="hotspot-filter-chip" :class="{ active: index === 0 }">{{ chip }}</button>
          </div>
        </div>
        <div class="field-distribution-grid">
          <div class="field-share-card">
            <div class="hotspot-chart-title">
              <span>各领域热点分布占比</span>
              <span class="muted">合计 {{ FIELD_SHARE_TOTAL }} 个热点</span>
            </div>
            <div class="field-donut" aria-label="技术领域热点分布饼图"></div>
            <div class="field-share-list">
              <div v-for="share in FIELD_SHARES" :key="share.name" class="field-share-row" :style="{ '--dot': share.color, '--share': share.share }">
                <strong><i></i>{{ share.name }}</strong><span></span><b>{{ share.share }}</b><em>{{ share.growth }}</em>
              </div>
            </div>
          </div>
          <div class="field-share-card">
            <div class="hotspot-chart-title">
              <span>各领域热点增长趋势</span>
              <span class="muted">近 6 期</span>
            </div>
            <svg class="hotspot-svg" viewBox="0 0 760 260" aria-label="技术领域热点增长趋势图">
              <line x1="54" y1="210" x2="720" y2="210" stroke="#e5ebf3"/>
              <line x1="54" y1="154" x2="720" y2="154" stroke="#e5ebf3"/>
              <line x1="54" y1="98" x2="720" y2="98" stroke="#e5ebf3"/>
              <line x1="54" y1="42" x2="720" y2="42" stroke="#e5ebf3"/>
              <polyline v-for="line in FIELD_GROWTH_LINES" :key="line.color" :points="line.points" fill="none" :stroke="line.color" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <g fill="#667085" font-size="13">
                <text v-for="(month, index) in ['1月', '2月', '3月', '4月', '5月', '本期']" :key="month" :x="[60, 168, 276, 384, 492, 682][index]" y="238">{{ month }}</text>
              </g>
            </svg>
            <div class="field-growth-summary">
              <div v-for="item in FIELD_GROWTH_SUMMARY" :key="item.title"><b>{{ item.title }}</b><br>{{ item.text }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
