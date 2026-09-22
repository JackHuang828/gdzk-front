<script setup>
// 研究报告详情（researchDetail）：报告头部信息 + 操作区（下载/评分等）+ 阅读器（目录 + 全文预览）。
// 下载报告 → 下载格式 Modal；评分及反馈 → 评分 Modal；加入模板库/知识库在原型中为无反馈占位按钮。
import { useUiStore } from '../../stores/ui';
import { RESEARCH_DETAIL } from '../../data/detailReports';

const ui = useUiStore();
const detail = RESEARCH_DETAIL;

function downloadReport(event) {
  ui.openModal('downloadFormat', { title: detail.title, isInsight: false });
}
</script>

<template>
  <section class="view active" id="researchDetail">
    <article class="report-preview card">
      <div>
        <h2>{{ detail.title }}</h2>
        <p class="muted">{{ detail.meta }}</p>
        <p>
          <template v-for="(tag, index) in detail.tags" :key="tag">
            <span :class="detail.tagTypes[index]">{{ tag }}</span>
            <template v-if="index < detail.tags.length - 1"> </template>
          </template>
        </p>
        <h3 style="margin-top:16px;">{{ detail.summaryTitle }}</h3>
        <p class="muted">{{ detail.summary }}</p>
        <div class="filter-line" style="margin-top:10px;">
          <strong>核心观点</strong>
          <span v-for="point in detail.corePoints" :key="point" class="filter-chip">{{ point }}</span>
        </div>
      </div>
      <div class="preview-actions">
        <button class="ghost-btn" @click="downloadReport">下载报告</button>
        <button class="ghost-btn">加入模板库</button>
        <button class="ghost-btn">加入知识库</button>
        <button class="ghost-btn" @click="ui.openModal('reportRating')">评分及反馈</button>
      </div>
    </article>

    <section class="reader card">
      <nav class="reader-nav">
        <h2>目录</h2>
        <button
          v-for="(chapter, index) in detail.chapters"
          :key="chapter"
          :class="{ active: index === 0 }"
        >{{ chapter }}</button>
      </nav>
      <div class="reader-body">
        <h2>报告全文预览</h2>
        <p class="muted">{{ detail.readerIntro }}</p>
        <hr style="border:0;border-top:1px solid var(--line);margin:18px 0 24px;" />
        <template v-for="section in detail.sections" :key="section.heading">
          <h3>{{ section.heading }}</h3>
          <p class="muted">{{ section.text }}</p>
          <div v-if="section.recommendation" class="recommendation">
            <span>{{ section.recommendation.label }}</span>
            <span class="muted">{{ section.recommendation.text }}</span>
          </div>
          <div v-if="section.chart" class="report-inline-chart">
            <h3>{{ section.chart.title }}</h3>
            <svg viewBox="0 0 520 110" width="100%" height="110" aria-label="政策发布趋势折线图">
              <path d="M24 88 H496M24 58 H496M24 28 H496" stroke="#e7ebf2"/>
              <polyline :points="section.chart.points" fill="none" stroke="#3158ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </template>
      </div>
    </section>
  </section>
</template>
