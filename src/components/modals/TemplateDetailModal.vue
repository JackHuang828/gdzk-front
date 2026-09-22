<script setup>
// 模板详情 Modal（templateDetail）：左侧大纲（模板标题/适用场景/类型大纲）+ 右侧类型说明与「使用该模板」。
// 使用模板后跳转首页并预选对应表单与模板标签（useTemplate → toast「已关联{title}」）。
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { useMaterialsStore } from '../../stores/materials';

const ui = useUiStore();
const router = useRouter();
const materials = useMaterialsStore();

const card = computed(() => ui.modalContext?.card || {});
const outlines = computed(() => materials.templateOutline(card.value.templateType));

// 大纲面板列表：模板标题 + 适用行业场景 + 类型预填大纲（renderTemplateDetail）
const outlineItems = computed(() => [
  { heading: '模板标题', text: card.value.title || '自定义写作模板' },
  { heading: '适用行业场景', text: card.value.desc || '适用于结构化报告创作，可编辑章节、分析框架和输出要求。' },
  ...outlines.value.map(([heading, text]) => ({ heading, text }))
]);

function useTemplate() {
  ui.closeModal();
  router.push({
    name: 'home',
    query: { form: card.value.templateForm || 'customForm', template: card.value.title || '' }
  });
  ui.showToast(`已关联${card.value.title || '自定义模板'}`);
}
</script>

<template>
  <div class="template-detail">
    <div class="outline-panel">
      <h2>文章大纲</h2>
      <div class="outline-list">
        <div v-for="item in outlineItems" :key="item.heading" class="outline-item">
          <h3>{{ item.heading }}</h3>
          <p class="muted">{{ item.text }}</p>
        </div>
      </div>
    </div>
    <div class="template-side">
      <div>
        <h2>{{ card.templateType || '其它' }}</h2>
        <p class="muted">{{ card.desc || '适用于结构化报告创作，可编辑章节、分析框架和输出要求。' }}</p>
      </div>
      <button class="primary-btn" style="width:100%;" @click="useTemplate">使用该模板</button>
    </div>
  </div>
</template>
