<template>
  <div class="top-filter-layout">
    <aside class="card top-filter-sidebar">
      <div class="top-filter-title">
        <h3><i class="fas fa-sliders-h"></i> 筛选条件</h3>
        <button type="button" @click="clearTopFilters">清空全部</button>
      </div>
      <section class="top-custom-scheme-section">
        <h4>人才池方案</h4>
        <div class="top-custom-scheme-list">
          <template v-if="topSchemes.length">
            <div v-for="scheme in topSchemes" :key="scheme.id" class="top-custom-scheme-item">
              <button type="button" @click="applyTopScheme(scheme, '已应用人才池方案“' + scheme.name + '”。')"><b>{{ scheme.name }}</b><small>点击应用方案</small></button>
              <button class="top-custom-scheme-delete" type="button" :aria-label="'删除' + scheme.name" @click="openDialog('topDeleteScheme', { id: scheme.id, name: scheme.name })"><i class="fas fa-trash-alt"></i></button>
            </div>
          </template>
          <p v-else class="top-custom-scheme-empty">暂无已保存方案</p>
        </div>
      </section>
      <section class="top-custom-scheme-section top-custom-recommend-section">
        <h4><i class="fas fa-magic"></i> 智能推荐方案</h4>
        <div class="top-custom-scheme-list">
          <button v-for="scheme in TOP_RECOMMENDED_SCHEMES" :key="scheme.id" class="top-custom-recommended-item" type="button" @click="applyTopScheme(scheme, '已应用智能推荐方案“' + scheme.name + '”。')">
            <b>{{ scheme.name }}</b><small>{{ scheme.desc }}</small>
          </button>
        </div>
      </section>
      <div class="top-custom-filter-controls">
        <section v-for="(group, gi) in TOP_FILTER_GROUPS" :key="group.title" class="top-filter-accordion" :class="{ open: topOpenGroups[gi] }">
          <button type="button" class="top-filter-accordion-trigger" @click="toggleTopGroup(gi)">
            <span><b>{{ group.title }}</b></span><i class="fas fa-chevron-down"></i>
          </button>
          <div class="top-filter-accordion-body">
            <template v-for="[key, label, options, type] in group.fields" :key="key">
              <div v-if="type === 'range'" class="top-custom-filter-row top-custom-range-row">
                <span>{{ label }}</span>
                <div class="top-custom-range-input">
                  <input type="number" min="0" inputmode="decimal" placeholder="最小值" :value="topConditions[key].min" @input="topConditions[key].min = $event.target.value" /><i>—</i>
                  <input type="number" min="0" inputmode="decimal" placeholder="最大值" :value="topConditions[key].max" @input="topConditions[key].max = $event.target.value" />
                </div>
              </div>
              <div v-else class="top-custom-filter-row">
                <span>{{ label }}</span>
                <SearchableSelect variant="top" :model-value="topConditions[key]" :options="options || []" :placeholder="label + '（全部）'" @update:model-value="topConditions[key] = $event" />
              </div>
            </template>
          </div>
        </section>
      </div>
      <div class="top-custom-save-bar">
        <button class="btn primary" type="button" @click="openDialog('topSaveScheme')"><i class="fas fa-bookmark"></i> 保存方案</button>
      </div>
    </aside>
    <section class="top-filter-results">
      <div class="card selected-custom-filters">
        <div><h3>已选条件</h3><span>共 {{ topFilterCount }} 个条件</span></div>
        <div class="top-custom-filter-tags">
          <span v-if="!topFilterTags.length">暂无筛选条件，请在左侧选择</span>
          <span v-for="tag in topFilterTags" v-else :key="tag" class="top-custom-filter-tag">{{ tag }}</span>
        </div>
      </div>
      <div class="card top-custom-result-list">
        <div class="top-result-list-heading">
          <h3>人才列表</h3>
          <div class="top-custom-list-heading-actions">
            <span>已选 {{ picked.size }} 人</span>
            <div class="top-custom-view-toggle" role="group" aria-label="人才列表展示方式">
              <button type="button" :class="{ active: topView === 'list' }" title="列表视图" aria-label="列表视图" @click="switchTopView('list')"><i class="fas fa-list"></i></button>
              <button type="button" :class="{ active: topView === 'card' }" title="卡片视图" aria-label="卡片视图" @click="switchTopView('card')"><i class="fas fa-th-large"></i></button>
            </div>
            <button class="btn" type="button" @click="openBatchLibraryChooser"><i class="fas fa-user-plus"></i> 批量添加至专属人才池</button>
            <button class="btn" type="button" @click="openDialog('export')"><i class="fas fa-file-export"></i> 导出报告</button>
          </div>
        </div>
        <div class="top-custom-talent-cards" :class="topView + '-view'">
          <template v-if="topResultPeople.length">
            <!-- 卡片视图 -->
            <template v-if="topView === 'card'">
              <article
                v-for="person in topResultPeople"
                :key="person.id"
                class="top-custom-talent-card top-custom-talent-card--card"
                tabindex="0"
                role="link"
                @click="onCardClick($event, person.id)"
                @keydown.enter="onCardKeydown($event, person.id)"
                @keydown.space="onCardKeydown($event, person.id)"
              >
                <label class="top-custom-card-check" :aria-label="'选择' + person.name"><input type="checkbox" :checked="picked.has(person.id)" @change="selectTalent(person.id, $event.target.checked)" /></label>
                <div class="top-custom-card-top">
                  <div class="top-custom-person">
                    <span class="avatar">{{ person.name[0] }}</span>
                    <div>
                      <button type="button" @click.stop="openTalentPortrait(person.id)">{{ person.name }}</button>
                      <small>{{ person.title }} · {{ person.type }} · {{ person.region }}</small>
                    </div>
                  </div>
                  <span class="top-custom-card-institution">{{ person.institution }}</span>
                </div>
                <div class="top-custom-card-field">
                  <span>学科领域</span>
                  <button class="discipline-link" type="button" @click.stop="openDisciplineBlankTab">{{ person.field }}</button>
                  <span class="result-field-tags"><em>{{ person.tertiary }}</em><em>{{ person.quaternary }}</em></span>
                </div>
                <div class="top-custom-card-grid">
                  <div><small>代表性成果</small><b>{{ talentOutcomeSummary(person) }}</b></div>
                  <div><small>项目经历</small><b>{{ metric(person).years }} · {{ metric(person).projects }}</b></div>
                  <div><small>学术影响力</small><b class="top-custom-card-impact">{{ person.impact }}</b></div>
                  <div><small>活跃度</small><b class="top-custom-card-activity">{{ metric(person).activity }}</b></div>
                </div>
                <div class="top-custom-card-footer">
                  <div class="top-custom-actions">
                    <button type="button" @click.stop="openTalentPortrait(person.id)">查看画像</button>
                    <button type="button" @click.stop="addTalentToCurrentPool(person.id)">加入人才池</button>
                  </div>
                </div>
              </article>
            </template>
            <!-- 列表视图 -->
            <template v-else>
              <div class="top-custom-list-header"><span></span><span>姓名</span><span>机构</span><span>学科领域</span><span>代表性成果 <i class="fas fa-sort"></i></span><span>项目经历 <i class="fas fa-sort"></i></span><span class="sort-active">学术影响力 <i class="fas fa-sort-down"></i></span><span>活跃度 <i class="fas fa-sort"></i></span><span>操作</span></div>
              <article
                v-for="person in topResultPeople"
                :key="person.id"
                class="top-custom-talent-card"
                tabindex="0"
                role="link"
                @click="onCardClick($event, person.id)"
                @keydown.enter="onCardKeydown($event, person.id)"
                @keydown.space="onCardKeydown($event, person.id)"
              >
                <input type="checkbox" :checked="picked.has(person.id)" @change="selectTalent(person.id, $event.target.checked)" />
                <div class="top-custom-person">
                  <span class="avatar">{{ person.name[0] }}</span>
                  <span class="top-custom-person-copy">
                    <button type="button" @click.stop="openTalentPortrait(person.id)">{{ person.name }}</button>
                    <small>{{ person.type }} · {{ person.region }}</small>
                  </span>
                </div>
                <div class="result-institution">{{ person.institution }}</div>
                <div class="result-field">
                  <button class="discipline-link" type="button" @click.stop="openDisciplineBlankTab">{{ person.field }}</button>
                  <span class="result-field-tags"><em>{{ person.tertiary }}</em><em>{{ person.quaternary }}</em></span>
                </div>
                <div class="result-outcome">{{ talentOutcomeSummary(person) }}</div>
                <div class="result-project"><b>{{ metric(person).years }}</b><small>{{ metric(person).projects }}</small></div>
                <div class="result-impact"><b>{{ person.impact }}</b><small>综合影响指数</small></div>
                <div class="result-activity"><b>{{ metric(person).activity }}</b><small>最近更新</small></div>
                <div class="top-custom-actions">
                  <button type="button" @click.stop="openTalentPortrait(person.id)">查看画像</button>
                  <button type="button" @click.stop="addTalentToCurrentPool(person.id)">加入人才池</button>
                </div>
              </article>
            </template>
          </template>
          <p v-else class="top-empty-state">没有匹配人才，请减少筛选条件后重试。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/* 人才TOP100：手风琴筛选、方案保存/推荐、结果卡片与列表 */
import SearchableSelect from './SearchableSelect.vue';
import { talentOutcomeSummary, talentListMetric } from '../../data/talent/talent-metrics';
import { picked, selectTalent, addTalentToCurrentPool, openTalentPortrait, openDisciplineBlankTab, openBatchLibraryChooser, openDialog } from '../../hooks/talent-library';
import {
  TOP_FILTER_GROUPS, TOP_RECOMMENDED_SCHEMES, topConditions, topOpenGroups, toggleTopGroup,
  topView, switchTopView, topSchemes, applyTopScheme, clearTopFilters,
  topFilterTags, topFilterCount, topResultPeople,
} from '../../hooks/talent-top100';

const metric = talentListMetric;

/* 卡片空白处点击/回车进入人才画像（与原型卡片导航一致） */
function onCardClick(event, id) {
  if (event.target.closest('button, input, label')) return;
  openTalentPortrait(id);
}

function onCardKeydown(event, id) {
  if (event.target.closest('button, input, label')) return;
  event.preventDefault();
  openTalentPortrait(id);
}
</script>
