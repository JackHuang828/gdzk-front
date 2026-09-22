<script setup>
// 其它报告 - 大纲确认（customForm）
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useReportStore } from '../../stores/report';

const router = useRouter();
const ui = useUiStore();
const report = useReportStore();

const progressText = ref('需求澄清中.');

// 三个正文大纲块（标题/导语 + 两个子条目）
const bodyBlocks = [
  {
    title: '一、产业积淀与基础构建（过去）',
    intro: '回顾深圳具身智能产业的起步与发展背景，分析机电一体化与电子信息制造业优势如何转化为先发条件。',
    items: [
      { name: '机电一体化与电子信息底座', desc: '阐述深圳如何依托庞大的集成电路、智能制造及机电一体化基础，为具身智能机器人硬件的诞生提供低试错成本与完善的供应链支撑。' },
      { name: '政策与产业链早期布局', desc: '梳理早期政策与产业链上下游整合对机器人产业培育、算法积累和关键零部件发展的引导作用。' }
    ]
  },
  {
    title: '二、生态集群与核心承载（现在）',
    intro: '深入分析当前深圳具身智能产业的规模特征、区域集聚及生态系统的具体表现。',
    items: [
      { name: '全产业链与关键产品突破', desc: '结合优必选、越疆、众擎等领军企业案例，分析从关键零部件到整机集成的完整链条。' },
      { name: '多维要素与场景落地支撑', desc: '探讨产业基金、公共数据语料集、算力基础设施及工业制造、商用服务、家庭陪伴等应用场景。' }
    ]
  },
  {
    title: '三、技术融合与未来展望（未来）',
    intro: '展望深圳具身智能行业的未来趋势，聚焦技术创新突破、基础设施建设及规模化应用。',
    items: [
      { name: '前沿技术跨界融合与规模化', desc: '预测具身智能与通用大模型、脑机接口等领域的深度融合趋势，分析规模化应用落地路径。' },
      { name: '基建强化与资本加码', desc: '分析算力、数据要素供给和耐心资本对产业链关键环节的持续注入。' }
    ]
  }
];

function addOutlineTitle() {
  // 原型此按钮无交互逻辑
}

function saveTemplate() {
  ui.showToast('当前任务配置已保存为模板');
}

function cancelTask() {
  router.push({ name: 'home' });
}

function generate() {
  progressText.value = '其它报告写作任务进行中...';
  ui.showToast('其它报告任务已进入生成队列');
  window.setTimeout(() => {
    progressText.value = '其它报告已生成';
    report.setTaskReport({
      type: '其它报告',
      title: '深圳具身智能行业发展趋势深度分析',
      returnView: 'home'
    });
    router.push({ name: 'taskReportDetail' });
  }, 700);
}
</script>

<template>
  <section class="view active" id="customForm">
    <div class="outline-stage">
      <div class="outline-task-intro">
        <div class="question">深圳具身智能行业发展趋势</div>
        <p>您的问题已成功接收，为了更全面精准地呈现深度创作的结果，请先确认文章大纲。</p>
      </div>
      <div class="outline-panel card">
        <header>
          <span>文章大纲</span>
          <span class="faint">⌄</span>
        </header>
        <div class="outline-timeline">
          <div class="outline-block">
            <span class="outline-badge">标题</span>
            <span class="outline-dot"></span>
            <div class="outline-content">
              <h3>深圳具身智能行业发展趋势深度分析</h3>
            </div>
          </div>
          <div class="outline-block">
            <span class="outline-badge">摘要⌄</span>
            <span class="outline-dot"></span>
            <div class="outline-content">
              <span class="outline-tools">⌫</span>
              <h3>摘要</h3>
              <p>概述深圳作为全球人工智能先锋城市的具身智能行业发展概况，简述从机器人产业基础构建到当前具身智能生态集群形成的过程，并前瞻性指出未来在灵巧操作、AI大脑与本体融合及应用场景落地的发展方向，强调其在全球人工智能竞争中的战略地位。</p>
            </div>
          </div>
          <div class="outline-block" v-for="(block, index) in bodyBlocks" :key="index">
            <span class="outline-badge">正文</span>
            <span class="outline-dot"></span>
            <div class="outline-content">
              <span class="outline-tools">⚙ ⚚ ＋ ⌫</span>
              <h3>{{ block.title }}</h3>
              <p>{{ block.intro }}</p>
              <div class="outline-subitem" v-for="item in block.items" :key="item.name">
                <span>⠿</span>
                <div><b>{{ item.name }}</b><p>{{ item.desc }}</p></div>
              </div>
            </div>
          </div>
          <div class="outline-block">
            <span class="outline-badge">结论⌄</span>
            <span class="outline-dot"></span>
            <div class="outline-content">
              <span class="outline-tools">⌫</span>
              <h3>总结</h3>
              <p>总结深圳具身智能行业从机电基础到智能跃升的发展路径，确认其产业链完整、创新生态活跃及机器人军团集聚的核心优势。</p>
            </div>
          </div>
          <button class="link-btn" type="button" style="justify-self:start;" @click="addOutlineTitle">＋ 添加一级标题</button>
        </div>
        <div class="form-actions" style="padding:0 30px 26px;">
          <button class="ghost-btn" type="button" @click="cancelTask">取消任务</button>
          <button class="secondary-btn" type="button" @click="saveTemplate">保存至写作模板</button>
        </div>
      </div>
      <div class="form-actions" style="justify-content:center;margin-top:28px;">
        <button class="primary-btn" type="button" @click="generate">基于大纲生成文档</button>
      </div>
      <div class="bottom-input">
        <span>{{ progressText }}</span>
        <span class="tiny-stop">■</span>
      </div>
    </div>
  </section>
</template>
