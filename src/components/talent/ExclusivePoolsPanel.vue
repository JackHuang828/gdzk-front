<template>
  <div class="exclusive-pool-workspace">
    <aside class="card exclusive-pool-list-panel">
      <div class="exclusive-pool-list-head">
        <h2>人才池列表</h2>
        <button class="btn primary" type="button" @click="openDialog('createPool')"><i class="fas fa-plus"></i> 新建人才池</button>
      </div>
      <label class="exclusive-pool-search"><i class="fas fa-search"></i><input v-model="poolKeyword" type="search" placeholder="搜索人才池名称或说明" /></label>
      <div class="exclusive-pool-list">
        <template v-if="visibleExclusivePools.length">
          <div v-for="pool in visibleExclusivePools" :key="pool.id" class="exclusive-pool-list-row">
            <button class="exclusive-pool-list-item" :class="{ active: pool.id === activeExclusivePool.id }" type="button" @click="activeExclusivePoolId = pool.id">
              <span class="exclusive-pool-list-icon"><i class="fas fa-users"></i></span>
              <span><b>{{ pool.name }}</b><small class="exclusive-pool-desc">{{ pool.desc || '未填写说明' }}</small><em>{{ (pool.members || []).length }} 位人才</em></span>
              <i class="fas fa-chevron-right"></i>
            </button>
            <button v-if="pool.id !== 'current'" class="exclusive-pool-remove" type="button" title="移除人才池" aria-label="移除人才池" @click="openDialog('removePool', { id: pool.id, name: pool.name })"><i class="fas fa-trash-alt"></i></button>
          </div>
        </template>
        <p v-else class="exclusive-pool-empty">未找到匹配的人才池</p>
      </div>
    </aside>
    <section class="card exclusive-pool-members-panel">
      <header class="exclusive-members-head">
        <div>
          <h2>{{ activeExclusivePool.name }}</h2>
          <p>{{ activeExclusivePool.desc || '已沉淀重点科技人才，可持续更新与管理。' }}</p>
        </div>
        <div class="exclusive-members-actions">
          <label class="exclusive-auto-update">
            <span>自动更新</span>
            <input type="checkbox" :checked="isAutoUpdate(activeExclusivePool.id)" @change="onToggleAutoUpdate" /><i></i>
          </label>
          <button class="btn" type="button" @click="openDialog('export')"><i class="fas fa-download"></i> 导出</button>
          <button class="btn" type="button" @click="openDialog('share', { link: buildShareLink() })"><i class="fas fa-share-alt"></i> 分享</button>
          <button class="btn potential-recommend-button" type="button" @click="openDialog('potential')">
            <i class="fas fa-lightbulb"></i> 潜力人才推荐 <b :class="{ show: potentialCount > 0 }">{{ potentialCount }}</b>
          </button>
        </div>
      </header>
      <div class="exclusive-pool-stats">
        <article><span class="exclusive-stat-icon people"><i class="fas fa-user-friends"></i></span><div><b>{{ members.length }}</b><small>人才数量</small></div></article>
        <article><span class="exclusive-stat-icon institution"><i class="fas fa-building"></i></span><div><b>{{ institutionCount }}</b><small>覆盖机构</small></div></article>
        <article><span class="exclusive-stat-icon recommend"><i class="fas fa-lightbulb"></i></span><div><b>{{ potentialCount }}</b><small>新增潜力推荐</small></div></article>
      </div>
      <div class="exclusive-member-table-wrap">
        <div class="exclusive-member-table">
          <template v-if="members.length">
            <div class="exclusive-member-header"><span>姓名</span><span>机构</span><span>学科领域</span><span>代表性成果</span><span>项目经历</span><span>学术影响力</span><span>活跃度</span><span>操作</span></div>
            <div v-for="person in members" :key="person.id" class="exclusive-member-row">
              <div class="exclusive-member-person">
                <span class="avatar">{{ person.name[0] }}</span>
                <span class="exclusive-member-person-copy">
                  <button type="button" @click="openTalentPortrait(person.id)">{{ person.name }}</button>
                  <small>{{ person.type || '科技人才' }} · {{ person.region || '地域未标注' }}</small>
                </span>
              </div>
              <div class="result-institution">{{ person.institution }}</div>
              <div class="result-field">
                <button class="discipline-link" type="button" @click="openDisciplineBlankTab">{{ person.field }}</button>
                <span class="result-field-tags"><em>{{ person.tertiary }}</em><em>{{ person.quaternary }}</em></span>
              </div>
              <div class="result-outcome">{{ talentOutcomeSummary(person) }}</div>
              <div class="result-project"><b>{{ metric(person).years }}</b><small>{{ metric(person).projects }}</small></div>
              <div class="result-impact"><b>{{ person.impact }}</b><small>综合影响指数</small></div>
              <div class="result-activity"><b>{{ metric(person).activity }}</b><small>最近更新</small></div>
              <div class="exclusive-member-actions">
                <button type="button" @click="openDialog('removeMember', { personId: person.id, personName: person.name, poolName: activeExclusivePool.name })">移除</button>
              </div>
            </div>
          </template>
          <p v-else class="exclusive-member-empty">当前人才池暂无人才，可从科技人才库或潜力人才推荐中加入。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/* 专属人才池管理：池列表搜索/切换/删除入口、成员表格、统计与自动更新 */
import { computed } from 'vue';
import { talentOutcomeSummary, talentListMetric } from '../../data/talent/talent-metrics';
import { openTalentPortrait, openDisciplineBlankTab, openDialog, buildShareLink, toast } from '../../hooks/talent-library';
import {
  activeExclusivePool, activeExclusivePoolId, poolKeyword, visibleExclusivePools,
  potentialCount, isAutoUpdate, setAutoUpdate,
} from '../../hooks/talent-pools';

const metric = talentListMetric;

const members = computed(() => (activeExclusivePool.value.members || []));
const institutionCount = computed(() => new Set(members.value.map((person) => person.institution)).size);

function onToggleAutoUpdate(event) {
  const checked = event.target.checked;
  setAutoUpdate(activeExclusivePool.value.id, checked);
  toast(checked ? '已开启自动更新。' : '已关闭自动更新。');
}
</script>
