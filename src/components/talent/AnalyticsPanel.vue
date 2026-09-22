<template>
  <div class="stats-container">
    <section class="stats-cards-section">
      <h2 class="stats-section-title"><i class="fas fa-chart-bar"></i> 核心统计指标</h2>
      <div class="stats-cards-grid">
        <div v-for="card in STAT_CARDS" :key="card.type" class="stat-card" @click="openDialog('analyticsDetail', { type: card.type })">
          <div class="stat-card-header">
            <div class="stat-card-icon"><i class="fas" :class="card.icon"></i></div>
            <div class="stat-card-trend"><i class="fas fa-arrow-up"></i> {{ card.trend }}</div>
          </div>
          <div class="stat-card-value">{{ card.value }}</div>
          <div class="stat-card-label">{{ card.label }}</div>
        </div>
      </div>
    </section>

    <section class="keywords-section">
      <div class="keywords-header">
        <h3><i class="fas fa-fire"></i> 领域热点关键词</h3>
        <div class="keywords-filter">
          <button v-for="item in KEYWORD_FILTERS" :key="item.value" type="button" :class="{ active: keywordFilter === item.value }" @click="keywordFilter = item.value">{{ item.label }}</button>
        </div>
      </div>
      <div class="keywords-cloud">
        <div
          v-for="item in filteredKeywords"
          :key="item.name"
          class="keyword-tag"
          :class="'size-' + item.size"
          :style="{ background: item.color, borderColor: item.color }"
          @click="openDialog('talentList', { sourceLabel: '热点关键词', selectedName: item.name, talents: analyticsKeywordTalentList(item.name) })"
        >{{ item.name }}<span class="keyword-count">{{ item.count }}</span></div>
      </div>
    </section>

    <section class="charts-section">
      <h2 class="stats-section-title"><i class="fas fa-chart-pie"></i> 可视化分析</h2>
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-header"><h4><i class="fas fa-map-marker-alt"></i> 地域分布</h4><div class="chart-actions"><button class="chart-action-btn" type="button" @click="openDialog('analyticsDetail', { type: 'region' })"><i class="fas fa-expand"></i></button></div></div>
          <div class="chart-body"><ChartBars :data="analyticsRegionData" :selected-name="chartName('region')" selectable @select="onChartSelect('region', $event)" /></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><h4><i class="fas fa-building"></i> 机构类型分布</h4><div class="chart-actions"><button class="chart-action-btn" type="button" @click="openDialog('analyticsDetail', { type: 'institution' })"><i class="fas fa-expand"></i></button></div></div>
          <div class="chart-body">
            <div class="pie-chart-container">
              <div class="pie-chart pie-chart-interactive">
                <ChartPie :data="analyticsInstitutionData" size="main" :selected-name="chartName('institution')" selectable @select="onChartSelect('institution', $event)" />
                <div class="pie-chart-center"><div class="pie-chart-center-value">{{ institutionTotal }}</div><div class="pie-chart-center-label">机构数</div></div>
              </div>
              <div class="pie-legend">
                <div
                  v-for="item in analyticsInstitutionData"
                  :key="item.name"
                  class="legend-item"
                  :class="{ selected: chartName('institution') === item.name }"
                  @click="onChartSelect('institution', item.name)"
                >
                  <div class="legend-color" :style="{ background: item.color }"></div>
                  <span class="legend-label">{{ item.name }}</span>
                  <span class="legend-value">{{ item.value }} ({{ item.percentage }}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><h4><i class="fas fa-atom"></i> 研究领域分布</h4><div class="chart-actions"><button class="chart-action-btn" type="button" @click="openDialog('analyticsDetail', { type: 'field' })"><i class="fas fa-expand"></i></button></div></div>
          <div class="chart-body"><ChartBars :data="analyticsFieldData" :selected-name="chartName('field')" selectable @select="onChartSelect('field', $event)" /></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><h4><i class="fas fa-trophy"></i> 学术影响力分布</h4><div class="chart-actions"><button class="chart-action-btn" type="button" @click="openDialog('analyticsDetail', { type: 'impact' })"><i class="fas fa-expand"></i></button></div></div>
          <div class="chart-body"><ChartBars :data="analyticsImpactData" :selected-name="chartName('impact')" selectable @select="onChartSelect('impact', $event)" /></div>
        </div>
      </div>
    </section>

    <section class="summary-section">
      <h2 class="stats-section-title"><i class="fas fa-file-alt"></i> 数据摘要</h2>
      <div class="summary-content">
        <div class="summary-item"><div class="summary-title"><i class="fas fa-users"></i> 人才规模</div><div class="summary-text">当前系统共收录 <span class="summary-highlight">1,245位</span> 科技人才，较上季度增长 <span class="summary-highlight">12%</span>，其中高层次人才占比 <span class="summary-highlight">35%</span>。</div></div>
        <div class="summary-item"><div class="summary-title"><i class="fas fa-graduation-cap"></i> 学术成果</div><div class="summary-text">累计发表论文 <span class="summary-highlight">45,892篇</span>，申请专利 <span class="summary-highlight">12,456项</span>，承担国家级项目 <span class="summary-highlight">2,356项</span>。</div></div>
        <div class="summary-item"><div class="summary-title"><i class="fas fa-globe"></i> 覆盖范围</div><div class="summary-text">覆盖全国 <span class="summary-highlight">31个</span> 省市自治区，涉及 <span class="summary-highlight">87家</span> 科研机构、高等院校和龙头企业。</div></div>
        <div class="summary-item"><div class="summary-title"><i class="fas fa-chart-line"></i> 发展趋势</div><div class="summary-text">人工智能、量子信息、生物信息等新兴领域人才增长迅速，平均影响力指数保持在 <span class="summary-highlight">92.5</span> 的高水平。</div></div>
      </div>
    </section>
  </div>
</template>

<script setup>
/* 核心统计与可视化分析：指标卡、热点关键词云、柱状/饼图与下钻 */
import { ref, computed, reactive } from 'vue';
import ChartBars from './ChartBars.vue';
import ChartPie from './ChartPie.vue';
import { openDialog } from '../../hooks/talent-library';
import {
  analyticsKeywordsData, analyticsRegionData, analyticsInstitutionData,
  analyticsFieldData, analyticsImpactData, CHART_LABELS,
  analyticsKeywordTalentList, analyticsChartTalentList,
} from '../../data/talent/analytics-data';

const STAT_CARDS = [
  { type: 'region', icon: 'fa-map-marker-alt', trend: '12%', value: '1,245', label: '人才总数' },
  { type: 'institution', icon: 'fa-university', trend: '8%', value: '87', label: '覆盖机构' },
  { type: 'impact', icon: 'fa-chart-line', trend: '5%', value: '92.5', label: '平均影响力' },
  { type: 'paper', icon: 'fa-file-alt', trend: '15%', value: '45,892', label: '论文总数' },
  { type: 'patent', icon: 'fa-lightbulb', trend: '18%', value: '12,456', label: '专利数量' },
  { type: 'project', icon: 'fa-flask', trend: '10%', value: '3,456', label: '科研项目' },
];

const KEYWORD_FILTERS = [
  { value: 'all', label: '全部' },
  { value: 'ai', label: '人工智能' },
  { value: 'quantum', label: '量子信息' },
  { value: 'bio', label: '生物信息' },
];

const keywordFilter = ref('all');
const filteredKeywords = computed(() =>
  keywordFilter.value === 'all' ? analyticsKeywordsData : analyticsKeywordsData.filter((item) => item.category === keywordFilter.value));

const institutionTotal = computed(() => analyticsInstitutionData.reduce((sum, item) => sum + item.value, 0));

/* 图表元素点击高亮（柱状图按组、饼图/图例按名称） */
const chartSelection = reactive({ type: '', name: '' });

function chartName(type) {
  return chartSelection.type === type ? chartSelection.name : '';
}

function onChartSelect(type, name) {
  chartSelection.type = type;
  chartSelection.name = name;
  openDialog('talentList', {
    sourceLabel: CHART_LABELS[type] || '可视化分析',
    selectedName: name,
    talents: analyticsChartTalentList(type, name),
  });
}
</script>
