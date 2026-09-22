<script setup>
// 自定义模板页（customTemplatePage）：自然语言描述 → 生成模板大纲 → 保存至模板库。
// 交互对应原型引擎：
// - data-custom-template-type：切换模板类型（研究报告/洞察/战略/其它）；
// - #generateTemplateOutline：按类型生成场景简述 + 大纲（generateTemplateOutline，sceneByType 文案）；
// - data-add-template-section / data-remove-template-section：增删正文章节；
// - 参考文档上传：仅 Word/TXT、≤50MB（handleTemplateReferenceFile）；
// - #saveCustomTemplateFromPage：插入个人模板卡并回到素材库模板库 tab（appendPersonalTemplate）。
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';
import { CUSTOM_TEMPLATE_DRAFT, TEMPLATE_OUTLINES } from '../../data/knowledge';

const router = useRouter();
const ui = useUiStore();
const materials = useMaterialsStore();

const TYPE_OPTIONS = [
  { label: '研究报告', form: 'researchForm' },
  { label: '洞察报告', form: 'insightTask' },
  { label: '战略咨询报告', form: 'strategyForm' },
  { label: '其它', form: 'customForm' }
];
const FORM_TO_TYPE = {
  researchForm: '研究报告',
  insightTask: '洞察报告',
  strategyForm: '战略咨询报告',
  customForm: '其它'
};
// 按类型的场景简述（engine 2518-2523）
const SCENE_BY_TYPE = {
  '研究报告': '适用于行业研究、技术路线、市场空间、竞争格局和趋势判断，可沉淀为结构化研究报告模板。',
  '洞察报告': '适用于周期性观察市场现象、人群变化、指标波动和图表趋势，可沉淀为可订阅的洞察报告模板。',
  '战略咨询报告': '适用于企业战略、招商策略、转型路径、项目评估和落地行动方案，可沉淀为咨询项目模板。',
  '其它': '适用于开放主题写作、材料汇编、会议纪要和专项说明，可根据写作要求生成自由大纲模板。'
};

const briefTitle = ref(CUSTOM_TEMPLATE_DRAFT.title);
const templateForm = ref(CUSTOM_TEMPLATE_DRAFT.templateForm);
const requirement = ref(CUSTOM_TEMPLATE_DRAFT.writingRequirement);
const referenceFileName = ref('');

// 大纲面板：原型默认隐藏，点击「生成模板」后展示
const outlineVisible = ref(false);
const outlineTitle = ref(CUSTOM_TEMPLATE_DRAFT.outline[0].title);
const sceneText = ref(CUSTOM_TEMPLATE_DRAFT.sceneDesc);
const outlineBlocks = ref(CUSTOM_TEMPLATE_DRAFT.outline.map(item => JSON.parse(JSON.stringify(item))));

function pickType(option) {
  templateForm.value = option.form;
}

// 参考文档校验（handleTemplateReferenceFile：Word/TXT、≤50MB）
function onReferenceChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const validType = /\.(doc|docx|txt)$/i.test(file.name);
  const validSize = file.size <= 50 * 1024 * 1024;
  if (!validType) {
    referenceFileName.value = '';
    ui.showToast('仅支持上传 Word 或 TXT 格式文件');
    return;
  }
  if (!validSize) {
    referenceFileName.value = '';
    ui.showToast('单文件大小需在 50MB 以内');
    return;
  }
  referenceFileName.value = `已选择：${file.name}`;
  ui.showToast('参考文档已添加');
  event.target.value = '';
}

// 生成模板（engine 2510-2541）：填充场景简述、标题与正文小节大纲
function generateTemplate() {
  const title = briefTitle.value.trim() || '自定义写作模板';
  const type = FORM_TO_TYPE[templateForm.value] || '其它';
  const requirementText = requirement.value.trim();
  const scene = SCENE_BY_TYPE[type] || SCENE_BY_TYPE['其它'];
  sceneText.value = requirementText ? `${scene} 重点要求：${requirementText}` : scene;
  outlineTitle.value = title;
  const outlines = TEMPLATE_OUTLINES[type] || TEMPLATE_OUTLINES['其它'];
  outlineBlocks.value
    .filter(block => block.kind === 'section')
    .forEach((block, index) => {
      const [heading, desc] = outlines[index] || outlines[0];
      block.title = heading;
      block.desc = desc;
    });
  outlineVisible.value = true;
  ui.showToast('已根据写作要求生成模板');
}

// 添加一级标题：在结论块前插入正文块，序号递增（engine 2459-2480）
function addSection() {
  const sectionCount = outlineBlocks.value.filter(block => block.kind === 'section').length + 1;
  const conclusionIndex = outlineBlocks.value.findIndex(block => block.kind === 'conclusion');
  const block = {
    kind: 'section',
    badge: '正文',
    title: `${sectionCount}、新章节标题`,
    desc: '点击编辑本章节的分析目标、内容边界和需要输出的核心结论。',
    subItems: [{ title: '子主题', desc: '补充本节需要展开的分析内容。' }]
  };
  if (conclusionIndex === -1) outlineBlocks.value.push(block);
  else outlineBlocks.value.splice(conclusionIndex, 0, block);
  ui.showToast('已添加新章节');
}

// 删除章节：正文块可删除，标题/摘要/结论为基础结构（engine 2444-2456）
function removeSection(block) {
  if (block.kind !== 'section') {
    ui.showToast('标题、摘要和结论为基础结构');
    return;
  }
  outlineBlocks.value = outlineBlocks.value.filter(item => item !== block);
  ui.showToast('章节已删除');
}

// 保存至模板库（engine 2482-2497 + appendPersonalTemplate 1810-1836）
function saveTemplate() {
  const title = briefTitle.value.trim() || outlineTitle.value.trim() || '我的自定义模板';
  const desc = sceneText.value.trim() || '由用户自定义创建，可继续编辑大纲、章节结构和适用行业场景。';
  materials.addPersonalTemplate({ title, form: templateForm.value, desc });
  materials.setAssetTab('templates');
  router.push({ name: 'uploadKnowledge' });
  ui.showToast('自定义模板已保存到模板库');
}
</script>

<template>
  <section class="view active" id="customTemplatePage">
    <div class="template-outline-page">
      <div class="breadcrumb">
        <button type="button" @click="router.push({ name: 'uploadKnowledge' })">我的素材库</button>
        <span>›</span>
        <button type="button" @click="materials.setAssetTab('templates'); router.push({ name: 'uploadKnowledge' })">模板库</button>
        <span>›</span>
        <strong>自定义模板</strong>
      </div>
      <div class="page-title">
        <div>
          <h1>自定义写作模板</h1>
          <p class="muted">先用自然语言描述模板用途，系统生成模板后可继续编辑章节、适用行业场景和模板简述。</p>
        </div>
      </div>

      <div class="content-card card custom-template-brief" style="padding:22px 26px;margin-bottom:18px;">
        <div class="grid-2">
          <div class="form-section">
            <label>模板标题</label>
            <input v-model="briefTitle" class="field-input template-brief-title" placeholder="输入模板标题，如：产业链深度研究模板" />
          </div>
          <div class="form-section">
            <label>模板类型</label>
            <div class="choice-row">
              <button
                v-for="option in TYPE_OPTIONS"
                :key="option.form"
                type="button"
                :class="{ active: templateForm === option.form }"
                @click="pickType(option)"
              >{{ option.label }}</button>
            </div>
          </div>
        </div>
        <div class="form-section">
          <label>写作要求</label>
          <textarea v-model="requirement" class="field-input" rows="4" placeholder="描述这个模板适用于什么行业、场景、分析框架和输出要求。"></textarea>
          <span class="template-reference-title">上传参考文档（选填）</span>
          <div class="template-reference-upload">
            <label class="upload-dropzone">
              <input type="file" accept=".doc,.docx,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" @change="onReferenceChange" />
              <strong>拖拽或点击上传参考文档</strong>
              <span class="upload-rules">
                <span>格式限制：Word（.doc / .docx）或 TXT（.txt）</span>
                <span>大小限制：单文件不超过 50MB</span>
              </span>
              <span class="template-reference-file-name">{{ referenceFileName }}</span>
            </label>
          </div>
        </div>
        <div class="form-actions" style="padding:0;">
          <button class="secondary-btn" type="button" @click="generateTemplate">生成模板</button>
        </div>
      </div>

      <div v-show="outlineVisible" class="outline-panel card" id="customTemplateOutlinePanel">
        <div class="form-section template-scene-section">
          <label>适用行业场景与模板简述</label>
          <textarea v-model="sceneText" class="field-input template-scene-input" rows="3"></textarea>
        </div>
        <header>
          <span>文章大纲</span>
          <span class="faint">⌄</span>
        </header>
        <div class="outline-timeline" id="customTemplateOutline">
          <div v-for="block in outlineBlocks" :key="block.kind === 'section' ? block.title : block.kind" class="outline-block" :data-template-section="block.kind === 'section' ? '' : undefined">
            <span class="outline-badge">{{ block.badge }}{{ block.collapsible ? '⌄' : '' }}</span>
            <span class="outline-dot"></span>
            <div class="outline-content">
              <span v-if="block.kind === 'section'" class="outline-tools">⚙　＋　<button type="button" @click="removeSection(block)">⌫</button></span>
              <span v-else-if="block.kind === 'summary' || block.kind === 'conclusion'" class="outline-tools"><button type="button" @click="removeSection(block)">⌫</button></span>
              <template v-if="block.kind === 'title'">
                <input v-model="outlineTitle" class="field-input template-title-input" />
              </template>
              <template v-else>
                <h3 contenteditable="true" @blur="block.title = $event.target.textContent.trim()">{{ block.title }}</h3>
                <p contenteditable="true" @blur="block.desc = $event.target.textContent.trim()">{{ block.desc }}</p>
                <div v-for="(sub, subIndex) in block.subItems || []" :key="subIndex" class="outline-subitem">
                  <span>⠿</span>
                  <div>
                    <b contenteditable="true" @blur="sub.title = $event.target.textContent.trim()">{{ sub.title }}</b>
                    <p contenteditable="true" @blur="sub.desc = $event.target.textContent.trim()">{{ sub.desc }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <button class="link-btn" type="button" style="justify-self:start;" @click="addSection">＋ 添加一级标题</button>
        </div>
        <div class="form-actions" style="padding:0 30px 26px;">
          <button class="ghost-btn" @click="router.push({ name: 'uploadKnowledge' })">取消</button>
          <button class="primary-btn" @click="saveTemplate">保存至模板库</button>
        </div>
      </div>
    </div>
  </section>
</template>
