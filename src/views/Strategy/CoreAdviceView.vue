<script setup>
// 核心建议展开（coreAdvice）：手风琴展开/收起，生成战略报告回战略详情
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const openPanels = ref([true, true]);

function toggle(index) {
  openPanels.value[index] = !openPanels.value[index];
}

function generateStrategyReport() {
  router.push({ name: 'strategyDetail' });
}
</script>

<template>
  <section class="view active" id="coreAdvice">
    <div class="page-title">
      <h1>核心建议展开</h1>
    </div>
    <section class="section card">
      <h2>量子计算产业链招商策略</h2>
      <p class="muted">点击“加大基础研究投入”后展开的深度分析区域</p>
      <div class="advice-layout" style="margin-top:32px;">
        <div class="advice-list">
          <div class="accordion" :class="{ open: openPanels[0] }">
            <button class="accordion-head" type="button" @click="toggle(0)">
              <span><strong>01 加大基础研究投入</strong><br><span class="muted">核心目标：提升基础研究供给能力，形成关键技术自主突破路径。</span></span>
              <span class="link-btn">收起</span>
            </button>
            <div class="accordion-body">
              <h3>数据支撑</h3>
              <p>研究报告显示，国内量子计算相关专利近三年增速约 31%，但核心器件和工程化平台仍存在短板。</p>
              <p>洞察报告提示，2026 年上半年产业资本更关注可验证场景与标准化接口。</p>
              <p>专家意见指出，基础研究投入需要与应用场景牵引同步设计。</p>
            </div>
          </div>
          <div class="accordion" :class="{ open: openPanels[1] }">
            <button class="accordion-head" type="button" style="background:#fff;border:1px solid var(--line);" @click="toggle(1)">
              <span><strong>实施路径与预期效果</strong></span>
            </button>
            <div class="accordion-body" style="display:block;">
              <p>1. 建立专项基金，支持量子芯片、低温电子学、纠错算法三个方向。</p>
              <p>2. 联合高校和龙头企业建设公共验证平台，降低中小企业验证成本。</p>
              <p>3. 预计形成 3 个示范场景、10 个可转化专利包和一批招商目标企业。</p>
            </div>
          </div>
        </div>
        <aside class="side-suggestions">
          <h3>全部建议</h3>
          <ol>
            <li>01 加大基础研究投入</li>
            <li>02 完善产业生态建设</li>
            <li>03 建设示范应用场景</li>
            <li>04 建立产业基金组合</li>
            <li>05 强化标准与安全治理</li>
          </ol>
          <button class="primary-btn" type="button" @click="generateStrategyReport">生成战略报告</button>
        </aside>
      </div>
    </section>
  </section>
</template>
