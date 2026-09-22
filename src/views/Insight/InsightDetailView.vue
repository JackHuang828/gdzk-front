<script setup>
// 洞察报告详情（insightDetail）：月刊正文（技术概念/数据概览/研究趋势/投资分布/研究热点/排行/地区）
// + 右侧目录滚动联动。交互对应原型：data-chart-legend（系列显隐）、data-chart-info（浮动数据详情框）、
// data-scroll（目录滚动）、下载报告（洞察类型含图片格式）与订阅 Modal。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';
import { INSIGHT_DETAIL } from '../../data/detailReports';

const ui = useUiStore();
const detail = INSIGHT_DETAIL;

// 图例显隐状态（trend 折线 3 组 / 投资分布饼图 4 组）
const muted = ref(new Set());
function toggleLegend(key, label) {
  const next = new Set(muted.value);
  if (next.has(key)) {
    next.delete(key);
    ui.showToast(`${label}数据系列已显示`);
  } else {
    next.add(key);
    ui.showToast(`${label}数据系列已隐藏`);
  }
  muted.value = next;
}

// 浮动数据详情框（chart-info-box is-floating），坐标按引擎算法相对所在 content-card 计算
const trendCard = ref(null);
const pieCard = ref(null);
const infoBox = ref(null); // { text, left, top }
function openChartInfo(event, text, hostRef) {
  const host = hostRef === 'pie' ? pieCard.value : trendCard.value;
  if (!host) return;
  const cardRect = host.getBoundingClientRect();
  const rawLeft = event.clientX - cardRect.left + 12;
  const rawTop = event.clientY - cardRect.top - 18;
  infoBox.value = {
    text,
    left: Math.min(Math.max(16, rawLeft), Math.max(16, host.clientWidth - 280)),
    top: Math.min(Math.max(16, rawTop), Math.max(16, host.clientHeight - 90))
  };
  ui.showToast('已打开图表数据详情');
}

// 目录滚动 + 高亮（data-scroll）
const activeToc = ref(0);
function scrollTo(item, index) {
  if (!item.target) return;
  document.getElementById(item.target.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  activeToc.value = index;
}

function downloadReport() {
  ui.openModal('downloadFormat', { title: detail.title, isInsight: true });
}
</script>

<template>
  <section class="view active" id="insightDetail">
    <div class="page-title">
      <div>
        <h2>{{ detail.title }}</h2>
        <p class="muted">{{ detail.meta }}</p>
      </div>
      <div class="preview-actions" style="grid-template-columns:repeat(4, minmax(96px, auto));display:grid;">
        <button class="ghost-btn" @click="downloadReport">下载报告</button>
        <button class="ghost-btn">加入模板库</button>
        <button class="ghost-btn">加入知识库</button>
        <button class="ghost-btn" @click="ui.openModal('subscribeSettings', { title: detail.title })">订阅</button>
      </div>
    </div>

    <div class="detail-layout">
      <div class="detail-main">
        <section class="content-card card" id="techOverview">
          <h2>技术概念</h2>
          <div class="tab-strip">
            <button v-for="(tab, index) in detail.techTabs" :key="tab" type="button" :class="{ active: index === 0 }">{{ tab }}</button>
          </div>
          <p v-for="para in detail.techParas" :key="para" class="muted">{{ para }}</p>
        </section>

        <section class="content-card card" id="dataOverview">
          <h2>数据概览</h2>
          <div class="kpi-list">
            <div v-for="kpi in detail.kpis" :key="kpi.label" class="kpi-card"><span>{{ kpi.label }}</span><strong>{{ kpi.value }}</strong></div>
          </div>
        </section>

        <section ref="trendCard" class="content-card card" id="trend">
          <h2>研究趋势</h2>
          <div class="subtabs">
            <button v-for="tab in detail.trendTabs" :key="tab" type="button">{{ tab }}</button>
            <span class="chart-legend" style="margin-left:auto;">
              <button
                v-for="legend in detail.trendLegends"
                :key="legend.key"
                type="button"
                class="active"
                :style="{ '--legend-color': legend.color }"
                :class="{ 'is-muted-legend': muted.has(legend.key) }"
                @click="toggleLegend(legend.key, legend.label)"
              >{{ legend.label }}</button>
            </span>
          </div>
          <svg viewBox="0 0 740 260" aria-label="研究趋势折线图">
            <path d="M36 210 H710M36 158 H710M36 106 H710M36 54 H710" stroke="#e7ebf2"/>
            <text x="0" y="214" fill="#667085">6,000</text>
            <text x="0" y="162" fill="#667085">12,000</text>
            <text x="0" y="110" fill="#667085">18,000</text>
            <polyline
              v-for="series in detail.trendSeries"
              :key="series.key"
              class="chart-series"
              :class="{ 'is-muted': muted.has(series.key) }"
              :points="series.points" fill="none" :stroke="series.color" stroke-width="3"
            />
            <g v-for="series in detail.trendSeries" :key="series.key + '-points'" :fill="series.color" :class="{ 'is-muted': muted.has(series.key) }">
              <circle
                v-for="point in detail.trendPoints.filter(item => item.series === series.key)"
                :key="point.info"
                class="chart-point"
                :cx="point.cx" :cy="point.cy" r="5"
                @click="openChartInfo($event, point.info, 'trend')"
              />
            </g>
          </svg>
          <p><button class="link-btn" type="button">图表解读</button> <span class="muted" style="margin-left:34px;">{{ detail.trendNote }}</span></p>
          <div
            v-if="infoBox"
            class="chart-info-box is-floating"
            :style="{ left: infoBox.left + 'px', top: infoBox.top + 'px' }"
          ><strong>数据详情</strong><span>{{ infoBox.text }}</span><button type="button" aria-label="关闭" @click="infoBox = null">×</button></div>
        </section>

        <section ref="pieCard" class="content-card card" id="investmentDistribution">
          <h2>投资分布</h2>
          <div class="subtabs">
            <button class="secondary-btn" style="min-height:34px;" type="button">领域占比</button>
            <span class="chart-legend" style="margin-left:auto;">
              <button
                v-for="legend in detail.pieLegends"
                :key="legend.key"
                type="button"
                class="active"
                :style="{ '--legend-color': legend.color }"
                :class="{ 'is-muted-legend': muted.has(legend.key) }"
                @click="toggleLegend(legend.key, legend.label)"
              >{{ legend.label }}</button>
            </span>
          </div>
          <div class="detail-pie-panel">
            <svg viewBox="0 0 220 180" role="img" aria-label="投资分布饼图">
              <circle cx="90" cy="90" r="52" fill="#f8fafc"/>
              <g transform="rotate(-90 90 90)" fill="none" stroke-linecap="butt">
                <circle
                  v-for="slice in detail.pieSlices"
                  :key="slice.key"
                  class="chart-slice"
                  :class="{ 'is-muted': muted.has(slice.key) }"
                  :cx="90" :cy="90" :r="52" pathLength="100" :stroke="slice.color" stroke-width="22"
                  :stroke-dasharray="slice.dasharray" :stroke-dashoffset="slice.dashoffset"
                  @click="openChartInfo($event, slice.info, 'pie')"
                />
              </g>
              <circle cx="90" cy="90" r="34" fill="#fff"/>
              <text x="90" y="84" text-anchor="middle" fill="#101828" font-size="16" font-weight="800">投资</text>
              <text x="90" y="104" text-anchor="middle" fill="#667085" font-size="12">分布</text>
            </svg>
            <div>
              <p class="muted">点击图例可隐藏或显示对应扇区；点击饼图扇区可查看该部分的样例明细。</p>
              <div
                v-if="infoBox"
                class="chart-info-box is-floating"
                :style="{ left: infoBox.left + 'px', top: infoBox.top + 'px' }"
              ><strong>数据详情</strong><span>{{ infoBox.text }}</span><button type="button" aria-label="关闭" @click="infoBox = null">×</button></div>
            </div>
          </div>
        </section>

        <section class="content-card card" id="hotspot">
          <h2>研究热点</h2>
          <div class="subtabs">
            <button class="secondary-btn" style="min-height:34px;" type="button">技术领域热点</button>
            <button v-for="tab in detail.hotspotTabs.slice(1)" :key="tab" type="button">{{ tab }}</button>
          </div>
          <div class="word-cloud">
            <span v-for="word in detail.wordCloud" :key="word.text" :style="[word.style, { fontSize: word.size + 'px', color: word.color }]">{{ word.text }}</span>
          </div>
          <p><button class="link-btn" type="button">图表解读</button> <span class="muted" style="margin-left:34px;">{{ detail.hotspotNote }}</span></p>
        </section>

        <div class="grid-2">
          <section class="content-card card">
            <h2>发文排行</h2>
            <div class="bars">
              <div v-for="bar in detail.rankBars" :key="bar.label" class="bar-line"><i :style="{ width: bar.width }"></i><span>{{ bar.label }}</span></div>
            </div>
          </section>
          <section class="content-card card">
            <h2>地区分布</h2>
            <div class="bubble-map">
              <div v-for="bubble in detail.bubbles" :key="bubble.label" class="bubble" :class="bubble.size">{{ bubble.label }}</div>
            </div>
            <p class="muted">{{ detail.bubbleNote }}</p>
          </section>
        </div>
      </div>

      <aside class="detail-aside">
        <div class="aside-card card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h2 style="margin-bottom:0;">目录</h2>
            <button class="link-btn" type="button">收起⌃</button>
          </div>
          <div class="toc">
            <button
              v-for="(item, index) in detail.toc"
              :key="item.label"
              type="button"
              :class="{ active: activeToc === index }"
              @click="scrollTo(item, index)"
            >{{ item.label }}</button>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
