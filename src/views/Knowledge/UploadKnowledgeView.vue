<script setup>
// 我的素材库（uploadKnowledge）：知识库 / 模板库双 tab。
// 交互对应原型：data-asset-tab 切换面板、「创建知识库」打开 createKnowledge Modal、
// 合集卡整体点击进入合集详情、「自定义模板」进入自定义模板页、
// 行业 chips 按模板类型过滤（bindTemplateFilters）、模板卡点击打开 templateDetail Modal、
// 「使用模板」回流首页并预选表单与模板（useTemplate）、「删除」打开 deleteTemplate Modal。
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';
import { KNOWLEDGE_CAPACITY, KNOWLEDGE_PAGE_COPY, KNOWLEDGE_FILTERS } from '../../data/knowledge';

const router = useRouter();
const ui = useUiStore();
const materials = useMaterialsStore();

// 模板库搜索与行业筛选（原型行业 chips 按 templateType 过滤；搜索框为静态占位）
const templateKeyword = ref('');
const activeType = ref('全部');

const visibleTemplates = computed(() => materials.templates.filter(card =>
  (activeType.value === '全部' || card.templateType === activeType.value)
  && (!templateKeyword.value.trim() || `${card.title}${card.desc}${card.templateType}`.toLowerCase().includes(templateKeyword.value.trim().toLowerCase()))
));

function openPack() {
  router.push({ name: 'knowledgeFolderDetail' });
}

function openTemplateDetail(card) {
  ui.openModal('templateDetail', { card });
}

// useTemplate：关闭 Modal → 回首页并带 form/template query（engine 1709-1721）
function useTemplate(card) {
  router.push({
    name: 'home',
    query: { form: card.templateForm || 'customForm', template: card.title }
  });
  ui.showToast(`已关联${card.title}`);
}
</script>

<template>
  <section class="view active" id="uploadKnowledge">
    <div class="asset-tabs">
      <button :class="{ active: materials.assetTab === 'knowledge' }" @click="materials.setAssetTab('knowledge')">知识库</button>
      <button :class="{ active: materials.assetTab === 'templates' }" @click="materials.setAssetTab('templates')">模板库</button>
    </div>

    <section v-show="materials.assetTab === 'knowledge'" class="asset-panel" data-asset-panel="knowledge">
      <div class="asset-toolbar">
        <div>
          <h2>{{ KNOWLEDGE_PAGE_COPY.knowledgeTab.title }}</h2>
          <p class="muted">{{ KNOWLEDGE_PAGE_COPY.knowledgeTab.desc }}</p>
        </div>
        <div class="knowledge-capacity" aria-label="知识库容量">
          <span>{{ KNOWLEDGE_CAPACITY.label }} <strong>{{ KNOWLEDGE_CAPACITY.total }}</strong></span>
          <span>{{ KNOWLEDGE_CAPACITY.usedLabel }} <strong>{{ KNOWLEDGE_CAPACITY.used }}</strong></span>
          <span class="capacity-track" aria-hidden="true"><span></span></span>
          <button class="capacity-upgrade" type="button">{{ KNOWLEDGE_CAPACITY.upgradeText }}</button>
        </div>
        <button class="primary-btn" @click="ui.openModal('createKnowledge')">{{ KNOWLEDGE_PAGE_COPY.knowledgeTab.createButtonText }}</button>
      </div>
      <div class="grid-3">
        <button
          v-for="pack in materials.packs"
          :key="pack.id"
          type="button"
          class="doc-card knowledge-pack-card"
          @click="openPack"
        >
          <span class="knowledge-folder-icon" aria-hidden="true"></span>
          <span class="knowledge-folder-body">
            <span class="knowledge-folder-title">{{ pack.name }}</span>
            <span class="knowledge-folder-desc">简介：{{ pack.desc }}</span>
            <span class="knowledge-folder-date">{{ pack.meta.dateLabel }}</span>
          </span>
        </button>
      </div>
    </section>

    <section v-show="materials.assetTab === 'templates'" class="asset-panel" data-asset-panel="templates">
      <div class="template-toolbar">
        <div>
          <h2>{{ KNOWLEDGE_PAGE_COPY.templatesTab.title }}</h2>
          <p class="muted">{{ KNOWLEDGE_PAGE_COPY.templatesTab.desc }}</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <label class="search">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
            <input v-model="templateKeyword" placeholder="搜索模板名称、行业、场景" />
          </label>
          <button class="primary-btn" @click="router.push({ name: 'customTemplatePage' })">{{ KNOWLEDGE_PAGE_COPY.templatesTab.customButtonText }}</button>
        </div>
      </div>

      <div class="industry-tabs">
        <button
          v-for="type in KNOWLEDGE_FILTERS.templateTypes"
          :key="type"
          type="button"
          class="filter-chip"
          :class="{ active: activeType === type }"
          @click="activeType = type"
        >{{ type }}</button>
      </div>

      <div class="template-grid">
        <button
          v-for="card in visibleTemplates"
          :key="card.id"
          type="button"
          class="template-card"
          @click="openTemplateDetail(card)"
        >
          <div class="template-preview">
            <strong>{{ card.templateType }}</strong>
            <span class="template-line"></span>
            <span class="template-line mid"></span>
            <span class="template-line short"></span>
          </div>
          <div>
            <h3>{{ card.title }}</h3>
            <p class="muted">{{ card.desc }}</p>
          </div>
          <div class="actions">
            <span class="action-chip" @click.stop="openTemplateDetail(card)">预览</span>
            <span class="action-chip secondary" @click.stop="useTemplate(card)">使用模板</span>
            <span class="action-chip secondary" @click.stop="ui.openModal('deleteTemplate', { id: card.id })">删除</span>
          </div>
        </button>
      </div>
    </section>
  </section>
</template>
