<script setup>
// 评分及反馈 Modal（reportRating）。
// 对应原型：5 个分值按钮（data-score，默认 5 分 active）+ 评价维度 chips + 补充反馈 + 提交评分。
import { ref } from 'vue';
import { useUiStore } from '../../stores/ui';

const ui = useUiStore();

const SCORES = [1, 2, 3, 4, 5];
const DIMENSIONS = ['结构完整', '数据可信', '结论可用', '表达清晰'];
const score = ref(5);
const activeDimensions = ref(['结构完整', '数据可信']);

function pickScore(value) {
  score.value = value;
}

function toggleDimension(dimension) {
  activeDimensions.value = activeDimensions.value.includes(dimension)
    ? activeDimensions.value.filter(item => item !== dimension)
    : [...activeDimensions.value, dimension];
}

function submitRating() {
  ui.closeModal();
  ui.showToast('评分已提交');
}
</script>

<template>
  <div class="form-section">
    <label>评分及反馈</label>
    <div class="choice-row rating-row" style="margin-top:10px;">
      <button
        v-for="value in SCORES"
        :key="value"
        type="button"
        :class="{ active: score === value }"
        @click="pickScore(value)"
      >{{ value }} 分</button>
    </div>
  </div>
  <div class="form-section">
    <label>评价维度</label>
    <div class="choice-row">
      <button
        v-for="dimension in DIMENSIONS"
        :key="dimension"
        type="button"
        :class="{ active: activeDimensions.includes(dimension) }"
        @click="toggleDimension(dimension)"
      >{{ dimension }}</button>
    </div>
  </div>
  <div class="form-section">
    <label>补充反馈</label>
    <textarea class="field-input" rows="3" placeholder="可填写对报告内容、引用来源、图表或结论建议的反馈。"></textarea>
  </div>
  <button class="primary-btn" style="width:100%;margin-top:10px;" @click="submitRating">提交评分</button>
</template>
