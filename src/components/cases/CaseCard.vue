<script setup>
// 案例广场卡片（case-card）：按 panel 渲染四种形态。
// research 面板渲染 engine.enhanceCaseResearchCards 改写后的 case-research-card 结构；
// 其余面板渲染 report-type + card-field 结构；列表模式追加 case-list-cell 单元格。
import { computed } from 'vue';
import { buildResearchCardModel, buildCaseListRow } from '../../data/cases';

const props = defineProps({
  card: { type: Object, required: true },
  panel: { type: String, required: true }, // research | strategy | insight | custom
  index: { type: Number, default: 0 },
  listMode: { type: Boolean, default: false }
});

const emit = defineEmits(['open', 'tag', 'download']);

// 研究卡展示模型（复刻引擎运行时改写）
const researchModel = computed(() =>
  props.panel === 'research' ? buildResearchCardModel(props.card, props.index) : null
);

// 网格形态的字段行（研究卡被改写后不使用 card-field）
const fields = computed(() => {
  const card = props.card;
  if (props.panel === 'strategy') {
    return [
      ['委托机构', card.agency],
      ['关键指标', card.keywords],
      ['项目日期', card.publishData]
    ];
  }
  if (props.panel === 'insight') {
    return [
      ['状态', card.status],
      ['更新时间', card.updateTime],
      ['内容简介', card.summary]
    ];
  }
  return [
    ['发布机构', card.publisher],
    ['更新时间', card.updateTime],
    ['内容范围', card.scope]
  ];
});

// report-type 修饰类（研究报告无修饰类）
const typeClass = computed(() =>
  props.panel === 'research' ? '' : props.panel
);

// 列表视图单元格模型
const listRow = computed(() =>
  props.listMode ? buildCaseListRow(props.card, props.panel, researchModel.value) : null
);

// 列表视图跳转目标（引擎 viewByPanel）
const listView = computed(() => {
  const map = { research: 'researchDetail', strategy: 'strategyDetail', insight: 'insightDetail', custom: 'researchDetail' };
  return map[props.panel] || 'strategyDetail';
});

function onTagClick(event, tag) {
  // 引擎仅拦截 strategy 面板 tag 与研究卡 case-research-tag；其余冒泡触发卡片跳转
  if (props.panel === 'strategy' || props.panel === 'research') {
    event.stopPropagation();
    emit('tag', tag);
  }
}

function onDownloadClick(event) {
  event.stopPropagation();
  emit('download');
}
</script>

<template>
  <button type="button" class="case-card" @click="emit('open')">
    <!-- 研究面板：engine.enhanceCaseResearchCards 改写后的结构 -->
    <template v-if="panel === 'research' && researchModel">
      <span class="report-type">研究报告</span>
      <span class="case-recommend">★ 专家推荐</span>
      <h3>{{ researchModel.title }}</h3>
      <div class="case-research-meta">
        <span class="case-research-author">{{ researchModel.author }}</span>
        <span class="case-version">{{ researchModel.version }}</span>
        <span v-if="researchModel.cert" class="case-cert user">{{ researchModel.cert }}</span>
      </div>
      <div class="case-research-tags">
        <span class="case-research-tag" @click="onTagClick($event, researchModel.firstTag)">{{ researchModel.firstTag }}</span>
        <span class="case-research-tag muted" @click="onTagClick($event, researchModel.secondTag)">{{ researchModel.secondTag }}</span>
      </div>
      <div class="case-research-foot">
        <span>□ {{ researchModel.date }}</span>
        <span>⊙ {{ researchModel.views }}</span>
        <span>⇩ {{ researchModel.downloads }}</span>
        <span class="score">★ {{ researchModel.score }}</span>
        <span class="case-research-actions">
          <span class="case-research-detail">查看详情</span>
          <span class="case-research-download" @click.stop="onDownloadClick($event)">下载</span>
        </span>
      </div>
    </template>

    <!-- 其余面板：report-type + card-field 结构 -->
    <template v-else>
      <span class="report-type" :class="typeClass">{{ card.reportType }}</span>
      <h3>{{ card.title }}</h3>
      <div v-for="[label, value] in fields" :key="label" class="card-field">
        <b>{{ label }}</b>
        <span>{{ value }}</span>
      </div>
      <div class="card-actions">
        <span class="tag-list">
          <span
            v-for="tag in card.tags"
            :key="tag"
            class="tag"
            @click="onTagClick($event, tag)"
          >{{ tag }}</span>
        </span>
        <span class="text-action">查看详情 / 下载</span>
      </div>
    </template>

    <!-- 列表视图单元格（CSS 在 list 模式下仅显示 cell） -->
    <template v-if="listMode && listRow">
      <span class="case-list-cell case-list-title">
        <strong>{{ listRow.title }}</strong>
        <span class="case-list-tags">
          <span v-for="tag in listRow.tags" :key="tag" class="case-list-tag">{{ tag }}</span>
        </span>
      </span>
      <span class="case-list-cell case-list-text">{{ listRow.type }}</span>
      <span class="case-list-cell case-list-text">{{ listRow.keyData }}</span>
      <span class="case-list-cell case-list-desc">{{ listRow.coreContent }}</span>
      <span class="case-list-cell case-list-actions">
        <span class="btn-mini" @click.stop="emit('open')">查看详情</span>
        <span class="btn-mini" @click.stop="onDownloadClick($event)">下载</span>
      </span>
    </template>
  </button>
</template>
