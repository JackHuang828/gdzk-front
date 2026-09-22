<script setup>
// 报告编辑器（reportEditor）：contenteditable 正文、目录滚动、保存版本/版本管理
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useReportStore } from '../../stores/report';

const router = useRouter();
const ui = useUiStore();
const report = useReportStore();

const EDITOR_TITLE = '深圳具身智能行业发展趋势深度分析';

const metaText = ref('2026-06-05 16:20 更新 · 已自动保存');
const versionSummary = ref(`当前共 ${report.versions.length} 个历史版本。每次点击保存都会生成一条版本记录。`);
const activeToc = ref('#editSummary');

const tocItems = [
  { target: '#editSummary', label: '摘要' },
  { target: '#editIndustry', label: '一、产业现状' },
  { target: '#editData', label: '二、关键数据' },
  { target: '#editAdvice', label: '三、建议与路径' },
  { target: '#editAppendix', label: '附录：引用来源' }
];

function scrollTo(target) {
  activeToc.value = target;
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveVersion() {
  const ts = report.addVersion(`Lianzhihui · ${EDITOR_TITLE}`);
  versionSummary.value = `当前共 ${report.versions.length} 个历史版本。每次点击保存都会生成一条版本记录。`;
  metaText.value = `${ts} 更新 · 已保存`;
  ui.showToast(`已保存版本：${ts}`);
}

function openVersionManager() {
  ui.openModal('versionManager');
}

function backToTasks() {
  router.push({ name: 'documents' });
}
</script>

<template>
  <section class="view active" id="reportEditor">
    <div class="report-editor-shell">
      <nav class="editor-nav card toc">
        <h3>目录</h3>
        <button
          v-for="item in tocItems"
          :key="item.target"
          :class="{ active: activeToc === item.target }"
          type="button"
          @click="scrollTo(item.target)"
        >{{ item.label }}</button>
      </nav>
      <article class="editor-doc card">
        <div class="editor-doc-header">
          <div>
            <span class="report-type custom">其它报告</span>
            <h1>{{ EDITOR_TITLE }}</h1>
            <p class="muted">{{ metaText }}</p>
          </div>
          <div class="editor-actions">
            <button class="ghost-btn" type="button" @click="openVersionManager">版本管理</button>
            <button class="secondary-btn" type="button" @click="saveVersion">保存</button>
            <button class="primary-btn" type="button" @click="backToTasks">回到任务</button>
          </div>
        </div>
        <section class="editor-section" id="editSummary">
          <h2>摘要</h2>
          <div class="editable-block" contenteditable="true">
            <p>本报告围绕目标主题完成资料归纳、关键事实核验与结构化分析，形成可继续编辑、可追溯引用、可导出复用的报告正文。系统已自动补齐章节摘要、目录和引用来源。</p>
          </div>
        </section>
        <section class="editor-section" id="editIndustry">
          <h2>一、产业现状</h2>
          <div class="editable-block" contenteditable="true">
            <p>从产业链基础、政策环境、市场主体和应用场景四个维度梳理当前发展现状，识别行业增长动力、关键瓶颈和下一阶段演进方向。</p>
            <p>在区域竞争中，技术成熟度、公共数据供给、场景开放程度和资本耐心共同决定产业落地速度。</p>
          </div>
        </section>
        <section class="editor-section" id="editData">
          <h2>二、关键数据</h2>
          <div class="editable-block" contenteditable="true">
            <p>系统已引用 18 篇研究报告、6 期洞察报告、9 条专家意见，并完成图表口径统一。数据可在保存版本时一并固化，后续恢复版本时同步回滚。</p>
          </div>
        </section>
        <section class="editor-section" id="editAdvice">
          <h2>三、建议与路径</h2>
          <div class="editable-block" contenteditable="true">
            <p>建议以重点场景牵引技术验证，建立数据采集、指标评估和成果复用机制，并按季度滚动更新行业监测与战略建议。</p>
          </div>
        </section>
        <section class="editor-section" id="editAppendix">
          <h2>附录：引用来源</h2>
          <div class="editable-block" contenteditable="true">
            <p>引用来源包括用户授权知识库、官方报告、专家观点和系统生成的洞察图表。导出时可自动生成脚注与来源清单。</p>
          </div>
        </section>
      </article>
      <aside class="editor-side card">
        <h3>生成计划</h3>
        <div class="progress-list">
          <span>资料检索与引用溯源已完成</span>
          <span>章节结构已生成</span>
          <span>正文初稿已生成，可继续编辑</span>
        </div>
        <h3>版本状态</h3>
        <p class="muted">{{ versionSummary }}</p>
        <button class="ghost-btn" type="button" style="width:100%;" @click="openVersionManager">查看历史版本</button>
      </aside>
    </div>
  </section>
</template>
