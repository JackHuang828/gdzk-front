<script setup>
// 知识库合集详情（knowledgeFolderDetail）：面包屑 + 头部「上传文件」+ 文件卡网格。
// 交互对应原型：data-knowledge-search 关键词过滤文件卡（applyKnowledgeFilters），
// 「上传文件」打开 upload Modal（knowledgeFile 上下文），「删除」打开 deleteKnowledge Modal。
// 原型中「查看详情 / 下载」为静态占位（引擎无对应处理），保持一致不绑定行为。
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';
import { FOLDER_INFO, KNOWLEDGE_FILTERS } from '../../data/knowledge';

const router = useRouter();
const ui = useUiStore();
const materials = useMaterialsStore();

const keyword = ref('');

// 关键词过滤（引擎按卡片全部文本匹配，这里等价匹配文件名 + 解析状态）
const visibleFiles = computed(() => materials.folderFiles.filter(file => {
  const text = `${file.name}${file.meta.status}`.toLowerCase();
  return !keyword.value.trim() || text.includes(keyword.value.trim().toLowerCase());
}));

function openUpload() {
  ui.openModal('upload', { kind: 'knowledgeFile', title: FOLDER_INFO.uploadButtonLabel });
}

function openDelete(file) {
  ui.openModal('deleteKnowledge', { kind: 'file', id: file.id });
}
</script>

<template>
  <section class="view active" id="knowledgeFolderDetail">
    <div class="breadcrumb">
      <button type="button" @click="router.push({ name: 'uploadKnowledge' })">{{ FOLDER_INFO.breadcrumb[0] }}</button>
      <span>›</span>
      <button type="button" @click="router.push({ name: 'uploadKnowledge' })">{{ FOLDER_INFO.breadcrumb[1] }}</button>
      <span>›</span>
      <strong>{{ FOLDER_INFO.name }}</strong>
    </div>

    <div class="asset-toolbar">
      <div>
        <h1>{{ FOLDER_INFO.name }}</h1>
      </div>
      <button class="primary-btn" @click="openUpload">{{ FOLDER_INFO.uploadButtonLabel }}</button>
    </div>

    <div class="knowledge-detail-layout knowledge-detail-single">
      <div class="knowledge-detail-main">
        <div class="knowledge-search-row">
          <label class="search" style="max-width:420px;">
            <svg class="icon" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
            <input v-model="keyword" :placeholder="KNOWLEDGE_FILTERS.folderSearchPlaceholder" />
          </label>
        </div>

        <div class="knowledge-file-grid">
          <article
            v-for="file in visibleFiles"
            :key="file.id"
            class="doc-card knowledge-file-card"
          >
            <div class="knowledge-card-head">
              <h3>{{ file.name }}</h3>
              <span class="knowledge-status" :class="file.meta.statusTone === 'done' ? '' : file.meta.statusTone">{{ file.meta.status }}</span>
            </div>
            <div class="knowledge-file-meta">
              <span><strong>{{ file.meta.updatedAt }}</strong></span>
            </div>
            <div class="actions">
              <span class="action-chip">查看详情</span>
              <span class="action-chip secondary">下载</span>
              <span class="action-chip secondary" @click="openDelete(file)">删除</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
