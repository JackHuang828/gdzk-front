<script setup>
// 科技实体详情 Modal（entityDetail）：展示实体基础信息、研究方向与代表性成果。
// 数据来自清单行点击时传入的 ui.modalContext.entity（与清单列表共用同一数据 schema）。
import { computed } from 'vue';
import { useUiStore } from '../../stores/ui';

const ui = useUiStore();

const entity = computed(() => ui.modalContext?.entity || {});

const metaItems = computed(() => [
  { label: '实体类型', value: entity.value.type },
  { label: '所属地区', value: entity.value.region },
  { label: '技术领域', value: entity.value.industry },
  { label: '成立时间', value: entity.value.founded ? `${entity.value.founded} 年` : '—' },
  { label: '主体规模', value: entity.value.scale || '—' },
  { label: '信息更新', value: entity.value.updatedAt || '—' }
]);
</script>

<template>
  <div class="entity-detail">
    <p class="muted entity-desc">{{ entity.desc }}</p>

    <div class="entity-detail-grid">
      <div v-for="item in metaItems" :key="item.label" class="entity-detail-meta">
        <span class="muted">{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </div>

    <div class="entity-detail-section">
      <h3>主要研究方向</h3>
      <ul class="entity-detail-list">
        <li v-for="item in entity.directions || []" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="entity-detail-section">
      <h3>代表性成果与资质</h3>
      <ul class="entity-detail-list">
        <li v-for="item in entity.achievements || []" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="entity-detail-section">
      <h3>关键词标签</h3>
      <div class="tag-list">
        <span v-for="tag in entity.tags || []" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.entity-desc {
  margin: 4px 0 16px;
}
.entity-detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}
.entity-detail-meta {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.entity-detail-meta strong {
  font-size: 15px;
}
.entity-detail-section {
  margin-bottom: 16px;
}
.entity-detail-section h3 {
  font-size: 15px;
  margin-bottom: 8px;
}
.entity-detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.entity-detail-list li {
  position: relative;
  padding: 6px 0 6px 18px;
  font-size: 14px;
  color: var(--text);
}
.entity-detail-list li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 14px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue, #4f6df5);
}
@media (max-width: 900px) {
  .entity-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
