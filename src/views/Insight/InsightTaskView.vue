<script setup>
// 洞察报告任务配置（insightTask）
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useReportStore } from '../../stores/report';

const router = useRouter();
const ui = useUiStore();
const report = useReportStore();

const topic = ref('低空经济城市试点与政策信号');
const period = ref('2026年5月');
const brief = ref('政策信号、城市试点、趋势图表');
const progressText = ref('洞察任务澄清中...');

// 4. 洞察视角：10 个模块，默认全选，可切换
const modules = ref([
  { name: '技术概念', active: true },
  { name: '数据概览', active: true },
  { name: '研究趋势', active: true },
  { name: '研究热点', active: true },
  { name: '发文排行', active: true },
  { name: '合作排行', active: true },
  { name: '合作网络', active: true },
  { name: '地区分布', active: true },
  { name: '融合度分析', active: true },
  { name: '相关文献', active: true }
]);

function toggleModule(item) {
  item.active = !item.active;
}

function cancelTask() {
  router.push({ name: 'home' });
}

function generate() {
  progressText.value = '洞察报告写作任务进行中...';
  ui.showToast('洞察报告任务已进入生成队列');
  window.setTimeout(() => {
    progressText.value = '洞察报告已生成';
    report.setTaskReport({
      type: '洞察报告',
      title: '低空经济城市试点与政策信号洞察报告',
      returnView: 'home'
    });
    router.push({ name: 'taskReportDetail' });
  }, 700);
}
</script>

<template>
  <section class="view active" id="insightTask">
    <div class="hero">
      <h1>洞察报告任务配置</h1>
    </div>
    <div class="form-shell">
      <div class="task-card card">
        <header>
          <span>任务澄清</span>
          <span class="faint">⌄</span>
        </header>
        <div class="form-section">
          <label>1. 洞察主题 <span class="required-star">*</span></label>
          <input v-model="topic" class="field-input" placeholder="尝试输入：为什么[某行业/城市/人群]出现[某趋势/现象]" />
        </div>
        <div class="form-section">
          <label>2. 洞察时间范围</label>
          <input v-model="period" class="field-input" placeholder="如：2026年5月、近30天、2026年Q2、2025-2026年" />
        </div>
        <div class="form-section">
          <label>3. 内容简介</label>
          <input v-model="brief" class="field-input" placeholder="系统根据洞察主题自动识别，用户可编辑，如：政策信号、城市试点、趋势图表" />
        </div>
        <div class="form-section">
          <label>4. 洞察视角 <span class="muted">10项，默认全选，可取消不需要的模块</span></label>
          <div class="module-grid">
            <button
              v-for="item in modules"
              :key="item.name"
              type="button"
              class="module-option"
              :class="{ active: item.active }"
              @click="toggleModule(item)"
            >{{ item.name }}</button>
          </div>
        </div>
        <div class="form-actions">
          <button class="ghost-btn" type="button" @click="cancelTask">取消任务</button>
          <button class="primary-btn" type="button" @click="generate">开始写作任务</button>
        </div>
      </div>
      <div class="bottom-input">
        <span>{{ progressText }}</span>
        <span class="tiny-stop">■</span>
      </div>
    </div>
  </section>
</template>
