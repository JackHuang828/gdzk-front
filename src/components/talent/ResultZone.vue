<template>
  <section class="card search-zone search-results-zone">
    <div class="search-zone-heading">
      <div><h2>搜索结果列表区</h2></div>
      <div class="result-zone-actions">
        <div class="result-view-toggle" role="group" aria-label="结果展示方式">
          <button class="btn" type="button" :class="{ active: state.resultView === 'list' }" title="列表视图" aria-label="列表视图" @click="state.resultView = 'list'"><i class="fas fa-list"></i></button>
          <button class="btn" type="button" :class="{ active: state.resultView === 'card' }" title="卡片视图" aria-label="卡片视图" @click="state.resultView = 'card'"><i class="fas fa-th-large"></i></button>
        </div>
        <button class="btn potential-recommend-button" type="button" @click="openDialog('potential')"><i class="fas fa-lightbulb"></i> 潜力人才推荐<b :class="{ show: potentialCount > 0 }">{{ potentialCount }}</b></button>
        <button class="btn" type="button" @click="openDialog('export')"><i class="fas fa-download"></i> 导出</button>
        <button class="btn" type="button" @click="openDialog('share', { link: buildShareLink() })"><i class="fas fa-share-alt"></i> 分享</button>
        <button class="btn primary" type="button" @click="openBatchLibraryChooser">批量加入人才池</button>
      </div>
    </div>
    <div class="result" id="result">
      <div>
        <div class="batch" :class="{ show: picked.size > 0 }">
          <span>已选 {{ picked.size }} 位人才</span>
          <button class="btn primary" type="button" @click="openBatchLibraryChooser">批量加入人才池</button>
        </div>
        <div class="rows" id="rows" :class="{ 'card-view': state.resultView === 'card' }">
          <template v-if="results.length">
            <div class="result-table-header"><span></span><span>姓名</span><span>机构</span><span>学科领域</span><span>代表性成果 <i class="fas fa-sort"></i></span><span>项目经历 <i class="fas fa-sort"></i></span><span class="sort-active">学术影响力 <i class="fas fa-sort-down"></i></span><span>活跃度 <i class="fas fa-sort"></i></span><span>操作</span></div>
            <div v-for="p in pagedResults" :key="p.id" class="row result-table-row">
              <input type="checkbox" :checked="picked.has(p.id)" @change="selectTalent(p.id, $event.target.checked)" />
              <div class="person">
                <span class="avatar">{{ p.name[0] }}</span>
                <span class="result-person-copy">
                  <button class="result-person-name" type="button" @click="openTalentPortrait(p.id)">{{ p.name }}</button>
                  <small>{{ p.type }} · {{ p.region }}</small>
                </span>
              </div>
              <span class="result-institution">{{ p.institution }}</span>
              <span class="result-field">
                <button class="discipline-link" type="button" @click="openDisciplineBlankTab">{{ p.field }}</button>
                <span class="result-field-tags"><em>{{ p.tertiary }}</em><em>{{ p.quaternary }}</em></span>
              </span>
              <span class="result-outcome">{{ talentOutcomeSummary(p) }}</span>
              <span class="result-project"><b>{{ metric(p).years }}</b><small>{{ metric(p).projects }}</small></span>
              <span class="result-impact"><b>{{ p.impact }}</b><small>综合影响指数</small></span>
              <span class="result-activity"><b>{{ metric(p).activity }}</b><small>最近更新</small></span>
              <span class="result-actions-cell">
                <button class="act" type="button" @click="openTalentPortrait(p.id)">查看画像</button>
                <button class="act" type="button" @click="openDialog('libraryChooser', { person: p })">加入人才池</button>
              </span>
            </div>
          </template>
          <p v-else style="padding: 28px; text-align: center; color: #86909c">没有匹配人才，请减少筛选条件后重试。</p>
        </div>
        <div v-if="results.length" class="result-pagination" aria-label="搜索结果分页">
          <span class="result-pagination-summary">共 {{ results.length }} 位人才</span>
          <div class="result-pagination-pages">
            <button type="button" class="result-page-button" :disabled="page === 1" @click="changeResultPage(page - 1)">上一页</button>
            <template v-for="(pg, idx) in resultPageItems" :key="idx + '-' + pg">
              <span v-if="pg === '…'" class="result-pagination-ellipsis">…</span>
              <button v-else type="button" class="result-page-button" :class="{ active: pg === page }" @click="changeResultPage(pg)">{{ pg }}</button>
            </template>
            <button type="button" class="result-page-button" :disabled="page === resultTotalPages" @click="changeResultPage(page + 1)">下一页</button>
          </div>
          <span class="result-pagination-current">第 {{ page }} / {{ resultTotalPages }} 页</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/* 搜索结果列表区：视图切换、批量操作、结果表格/卡片与分页 */
import { computed } from 'vue';
import { talentOutcomeSummary, talentListMetric } from '../../data/talent/talent-metrics';
import {
  state, picked, results, pagedResults, resultTotalPages,
  changeResultPage, selectTalent, openTalentPortrait, openDisciplineBlankTab,
  openBatchLibraryChooser, openDialog, buildShareLink,
} from '../../hooks/talent-library';
import { potentialCount } from '../../hooks/talent-pools';
import { windowedPageItems } from '../../utils/pagination';

const metric = talentListMetric;
const page = computed(() => Math.max(1, Math.min(resultTotalPages.value, state.resultPage)));
// 分页条窗口化：与科技人才画像列表一致，避免数据增长后页码行过长
const resultPageItems = computed(() => windowedPageItems(resultTotalPages.value, page.value));
</script>
