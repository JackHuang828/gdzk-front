<script setup>
// 任务详情正文行：可点击铅笔按钮打开行改写抽屉；行内引用角标点击打开溯源 Modal。
// line: { tag, id?, className?, parts: [{type:'text'|'cite'|'anomaly', ...}] }
defineProps({
  line: { type: Object, required: true },
  selected: { type: Boolean, default: false }
});
const emit = defineEmits(['open-rewrite', 'open-source']);
</script>

<template>
  <div
    class="task-article-line"
    :class="[line.className, { selected }]"
    data-article-line
    :data-line-tag="line.tag"
  >
    <button class="line-rewrite-trigger" type="button" title="修改当前行" aria-label="修改当前行" @click="emit('open-rewrite')">
      <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
    </button>
    <div class="line-rewrite-body">
      <component :is="line.tag" :id="line.id || null">
        <template v-for="(seg, index) in line.parts" :key="index">
          <button
            v-if="seg.type === 'cite'"
            class="cite-mark"
            type="button"
            :title="'查看数据溯源'"
            @click.stop="emit('open-source', seg.id)"
          >[{{ seg.n }}]</button>
          <template v-else-if="seg.type === 'anomaly'">
            <span class="validation-anomaly-number" title="校验异常：引用来源中未找到对应参照数值">{{ seg.value }}</span><span class="validation-anomaly-mark" title="校验异常">!</span>
          </template>
          <template v-else>
            <template v-for="(chunk, chunkIndex) in String(seg.value || '').split('\n')" :key="chunkIndex">
              <br v-if="chunkIndex > 0" />{{ chunk }}
            </template>
          </template>
        </template>
      </component>
    </div>
  </div>
</template>
