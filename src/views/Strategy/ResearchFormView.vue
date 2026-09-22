<script setup>
// 研究报告任务配置（researchForm）
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useReportStore } from '../../stores/report';
import MaterialPicker from '../../components/forms/MaterialPicker.vue';

const router = useRouter();
const ui = useUiStore();
const report = useReportStore();

const topic = ref('2026年中国微型储能行业');
const scope = ref('中国市场');
const period = ref('近3年，含2026-2030预测');
const topics = ref([
  'V2G技术的基本概念、核心原理及系统架构',
  'V2G技术涉及的关键硬件及具体参数',
  'V2G模式下的电池损耗机制、电网兼容性及商业化运营数据',
  '国内外新能源汽车V2G试点项目的实施案例与运营经验',
  '行业专家及机构对V2G技术落地难点和前景的评价'
]);
const progressText = ref('需求澄清中...');

function addTopic() {
  topics.value.push('');
}

function saveTemplate() {
  ui.showToast('当前任务配置已保存为模板');
}

function cancelTask() {
  router.push({ name: 'home' });
}

function generate() {
  progressText.value = '研究报告写作任务进行中...';
  ui.showToast('研究报告任务已进入生成队列');
  window.setTimeout(() => {
    progressText.value = '研究报告已生成';
    report.setTaskReport({
      type: '研究报告',
      title: '2026年中国微型储能行业深度研究报告',
      returnView: 'home'
    });
    router.push({ name: 'taskReportDetail' });
  }, 700);
}
</script>

<template>
  <section class="view active" id="researchForm">
    <div class="hero">
      <h1>研究报告任务配置</h1>
    </div>
    <div class="form-shell">
      <div class="task-card card">
        <header>
          <span>任务澄清</span>
          <span class="faint">⌄</span>
        </header>
        <div class="form-section">
          <label>1. 研究主题 <span class="required-star">*</span></label>
          <input v-model="topic" class="field-input" placeholder="如：2026年中国微型储能行业" />
        </div>
        <div class="form-section">
          <label>2. 空间范围</label>
          <input v-model="scope" class="field-input" placeholder="系统根据需求自动识别，如：中国市场、全球、华南重点城市群" />
        </div>
        <div class="form-section">
          <label>3. 时间跨度</label>
          <input v-model="period" class="field-input" placeholder="系统根据需求自动识别，如：近3年、2024-2026、含未来预测" />
        </div>
        <div class="form-section">
          <label>4. 研究内容 <span class="help-tip" tabindex="0">?<span>讨论或分析的具体内容，是内容的 Topic 锚点。决定生成内容聚焦的核心领域与视角，从而精准搜集与总结信息。</span></span></label>
          <p class="muted" style="margin:0 0 10px;">系统根据用户输入自动生成可写作视角，用户可直接编辑、删除或继续添加。</p>
          <div class="topic-list">
            <input
              v-for="(item, index) in topics"
              :key="index"
              v-model="topics[index]"
              class="field-input"
              :placeholder="index >= 5 ? '输入新的研究内容' : ''"
            />
          </div>
          <button class="link-btn add-topic" type="button" @click="addTopic">＋ 添加研究内容</button>
        </div>
        <div class="form-section">
          <label>5. 从我的知识库选择素材</label>
          <MaterialPicker :default-files="['低空经济政策包']" />
        </div>
        <div class="form-actions">
          <button class="ghost-btn" type="button" @click="saveTemplate">保存为模板</button>
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
