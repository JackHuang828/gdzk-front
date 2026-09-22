import { defineStore } from 'pinia';
import { ref } from 'vue';
import { KNOWLEDGE_PACKS, TEMPLATE_CARDS, FOLDER_FILES, TEMPLATE_OUTLINES, PERSONAL_TEMPLATE_SEED } from '../data/knowledge';

/**
 * 我的素材库 store：知识库合集 / 模板库 / 合集文件。
 * 对应原型 engine.js confirmCreateKnowledge（插入合集卡）、appendPersonalTemplate（插入个人模板）、
 * confirmDeleteKnowledge / confirmDeleteTemplate（移除卡片）。
 */
export const useMaterialsStore = defineStore('materials', () => {
  const packs = ref(KNOWLEDGE_PACKS.map(pack => ({ ...pack, meta: { ...pack.meta } })));
  const templates = ref(TEMPLATE_CARDS.map(card => ({ ...card, tags: [...card.tags], personal: false })));
  const folderFiles = ref(FOLDER_FILES.map(file => ({ ...file, meta: { ...file.meta } })));
  // 素材库 tab 状态：原型中 tab 选中态跨视图切换持久保存（保存自定义模板后自动切到模板库）
  const assetTab = ref('knowledge');

  function setAssetTab(tab) {
    assetTab.value = tab === 'templates' ? 'templates' : 'knowledge';
  }

  /** 创建知识库合集：插入到合集列表头部（confirmCreateKnowledge） */
  function addPack(name, desc) {
    const createdAt = new Date().toLocaleDateString('sv-SE');
    packs.value.unshift({
      id: `pack-${Date.now()}`,
      name: name || '未命名知识库合集',
      desc: desc || '用于报告生成的知识库资料合集。',
      meta: { createdAt, dateLabel: `创建于 ${createdAt}` },
      tags: [],
      isPack: true
    });
  }

  function removePack(packId) {
    packs.value = packs.value.filter(pack => pack.id !== packId);
  }

  /** 保存自定义模板：插入到模板库网格顶部（appendPersonalTemplate） */
  function addPersonalTemplate({ title, form, desc }) {
    const templateForm = form || 'customForm';
    const typeMap = { researchForm: '研究报告', insightTask: '洞察报告', strategyForm: '战略咨询报告', customForm: '其它' };
    templates.value.unshift({
      id: `tpl-personal-${Date.now()}`,
      templateType: typeMap[templateForm] || '其它',
      templateForm,
      title: title || PERSONAL_TEMPLATE_SEED.title,
      desc: desc || PERSONAL_TEMPLATE_SEED.desc,
      tags: [],
      personal: true
    });
  }

  function removeTemplate(templateId) {
    templates.value = templates.value.filter(card => card.id !== templateId);
  }

  function removeFile(fileId) {
    folderFiles.value = folderFiles.value.filter(file => file.id !== fileId);
  }

  /** 模板详情大纲：按模板类型取对应大纲（getTemplateCardData） */
  function templateOutline(templateType) {
    return TEMPLATE_OUTLINES[templateType] || TEMPLATE_OUTLINES['其它'];
  }

  return {
    packs,
    templates,
    folderFiles,
    assetTab,
    setAssetTab,
    addPack,
    removePack,
    addPersonalTemplate,
    removeTemplate,
    removeFile,
    templateOutline
  };
});
