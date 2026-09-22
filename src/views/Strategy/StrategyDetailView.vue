<script setup>
// 战略咨询报告详情（strategyDetail）：报告头部 + 阅读器（核心建议手风琴）+ 成果评估/客户反馈/引用溯源
// 三个交付评估面板 + 相关报告推荐。核心建议对应引擎 data-advice-toggle / data-advice-more。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';
import { STRATEGY_DETAIL } from '../../data/detailReports';

const ui = useUiStore();
const detail = STRATEGY_DETAIL;

// 核心建议展开状态：默认第一项展开（advice-1 active）
const openAdvice = ref('advice-1');
const moreOpen = ref(false);

function toggleAdvice(key) {
  const willOpen = openAdvice.value !== key;
  openAdvice.value = willOpen ? key : '';
  ui.showToast(willOpen ? '已展开核心建议' : '已收起核心建议');
}

function toggleMoreAdvice() {
  moreOpen.value = !moreOpen.value;
  ui.showToast(moreOpen.value ? '已展开补充建议' : '已收起补充建议');
}

function downloadReport() {
  ui.openModal('downloadFormat', { title: detail.title, isInsight: false });
}
</script>

<template>
  <section class="view active" id="strategyDetail">
    <article class="report-preview card">
      <div>
        <h2>{{ detail.title }}</h2>
        <p class="muted">{{ detail.meta }}</p>
        <p class="muted">{{ detail.extraMeta }}</p>
        <p><span v-for="tag in detail.tags" :key="tag" class="tag">{{ tag }}</span></p>
        <p class="muted">{{ detail.abstract }}</p>
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
        </template>
        <div class="strategy-advice-list">
          <template v-for="advice in detail.advices" :key="advice.key">
            <button
              type="button"
              class="strategy-advice-item"
              :class="{ active: openAdvice === advice.key }"
              @click="toggleAdvice(advice.key)"
            >
              <span class="num">{{ advice.num }}</span>
              <strong>{{ advice.title }}</strong>
              <span class="muted">{{ openAdvice === advice.key ? '已展开' : '展开' }}</span>
            </button>
            <div v-show="openAdvice === advice.key" class="evidence-box">
              <strong>数据支撑</strong>
              <span>{{ advice.support }}</span>
              <strong>实施路径</strong>
              <span>{{ advice.path }}</span>
              <strong>预期效果</strong>
              <span>{{ advice.effect }}</span>
            </div>
          </template>
          <button class="collapsed-more" @click="toggleMoreAdvice">{{ moreOpen ? '收起补充建议' : '+ 2 项建议' }}</button>
          <div v-show="moreOpen" class="evidence-box">
            <template v-for="item in detail.moreAdvice" :key="item.heading">
              <strong>{{ item.heading }}</strong>
              <span>{{ item.text }}</span>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section class="strategy-detail-modules" aria-label="战略咨询报告交付评估">
      <section class="strategy-detail-panel" aria-labelledby="strategyOutcomeTitle">
        <h2 id="strategyOutcomeTitle">最终成果评估</h2>
        <p class="muted">系统基于咨询目标、引用资料、执行建议和交付反馈，对本份战略咨询报告的成果质量进行量化评估。</p>
        <div class="strategy-result-grid">
          <div v-for="metric in detail.outcomeMetrics" :key="metric.label" class="strategy-result-metric">
            <small>{{ metric.label }}</small><strong>{{ metric.value }}</strong>
          </div>
        </div>
      </section>

      <section class="strategy-detail-panel" aria-labelledby="strategyFeedbackTitle">
        <h2 id="strategyFeedbackTitle">客户反馈</h2>
        <p class="muted">汇总委托方、业务部门和专家评审对报告内容的反馈，用于后续版本迭代和成果复用。</p>
        <div class="strategy-feedback-list">
          <div v-for="feedback in detail.feedbacks" :key="feedback.title" class="strategy-feedback-item">
            <strong>{{ feedback.title }}</strong>
            <span class="muted">{{ feedback.text }}</span>
            <span class="strategy-feedback-score">{{ feedback.score }}</span>
          </div>
        </div>
      </section>

      <section class="strategy-detail-panel" aria-labelledby="strategySourceTitle">
        <h2 id="strategySourceTitle">报告引用溯源</h2>
        <p class="muted">展示报告生成过程中引用的关键资料来源、引用位置和校验状态，便于审查、复核和二次编辑。</p>
        <div class="strategy-source-list">
          <div v-for="source in detail.sources" :key="source.title" class="strategy-source-item">
            <strong>{{ source.title }}</strong>
            <span class="muted">{{ source.text }}</span>
            <span class="strategy-source-status">{{ source.status }}</span>
          </div>
        </div>
      </section>
    </section>

    <section class="strategy-related-reports" aria-labelledby="strategyRelatedTitle">
      <div class="strategy-related-head">
        <div>
          <h2 id="strategyRelatedTitle">相关报告推荐<span class="help-tip strategy-related-path-info" tabindex="0" aria-label="主题聚类与跨资源导航路径建议">ⓘ<span>{{ detail.relatedTip }}</span></span></h2>
          <p class="muted">根据当前报告的行业、标签、数据来源和咨询目标，推荐可继续查看或引用的报告。</p>
        </div>
        <span class="strategy-related-reason">{{ detail.relatedReason }}</span>
      </div>
      <div class="strategy-related-list">
        <article v-for="report in detail.relatedReports" :key="report.title" class="strategy-related-row">
          <div class="strategy-related-main">
            <span class="report-type strategy">战略咨询报告</span>
            <h3>{{ report.title }}</h3>
            <div class="tag-list"><span v-for="tag in report.tags" :key="tag" class="tag">{{ tag }}</span></div>
          </div>
          <div class="strategy-related-meta">
            <span><b>推荐依据</b>{{ report.reason }}</span>
            <span><b>版本数据</b>{{ report.version }}</span>
            <span><b>关键内容</b>{{ report.content }}</span>
          </div>
          <div class="strategy-related-actions">
            <button class="ghost-btn" @click="ui.showToast('已刷新当前报告详情')">查看详情</button>
            <button class="ghost-btn" @click="downloadReport">下载</button>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>
