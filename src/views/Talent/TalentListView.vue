<template>
  <!-- 科技人才画像列表页（原型 2.1.1talentlist.html）：
       仅保留检索列表页（搜索条件 + 结果列表）；画像详情已迁移到 TalentListProfile.vue。 -->
  <div class="talent-profile-page view-mode-list">

    <!-- ===================== 列表检索页 ===================== -->
    <section class="profile-list-page active">
      <!-- 搜索条件 -->
      <section class="profile-list-filter">
        <div class="profile-list-filter-head">
          <div><h2>搜索条件</h2></div>
        </div>
        <div class="profile-filter-search">
          <input v-model="listKeyword" type="search" placeholder="搜索姓名、机构、研究方向、项目或成果关键词"
                 @input="handleListSearch()" @keydown.enter.prevent="handleListSearch()" />
          <button class="profile-filter-primary" type="button" @click="handleListSearch()"><i class="fas fa-search"></i> 检索</button>
          <button class="profile-filter-secondary" type="button" @click="resetListFilters()"><i class="fas fa-undo"></i> 重置条件</button>
        </div>
        <div class="profile-filter-grid">
          <select v-model="listFilters.primary" @change="handleListFilterChange('primary')">
            <option value="">一级学科（全部）</option>
            <option v-for="o in primaryOptions" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.secondary" @change="handleListFilterChange('secondary')">
            <option value="">二级学科（全部）</option>
            <option v-for="o in secondaryOptions" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.tertiary" @change="handleListFilterChange('tertiary')">
            <option value="">三级学科（全部）</option>
            <option v-for="o in tertiaryOptions" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.quaternary" @change="handleListFilterChange('quaternary')">
            <option value="">四级学科（全部）</option>
            <option v-for="o in quaternaryOptions" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.institution" @change="handleListFilterChange()">
            <option value="">机构/单位（全部）</option>
            <option v-for="o in listFilterOptions.institution" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.outcome" @change="handleListFilterChange()">
            <option value="">学术成果（全部）</option>
            <option v-for="o in listFilterOptions.outcome" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.project" @change="handleListFilterChange()">
            <option value="">项目（全部）</option>
            <option v-for="o in listFilterOptions.project" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.type" @change="handleListFilterChange()">
            <option value="">人才类别（全部）</option>
            <option v-for="o in listFilterOptions.type" :key="o" :value="o">{{ o }}</option>
          </select>
          <select v-model="listFilters.region" @change="handleListFilterChange()">
            <option value="">地域分布（全部）</option>
            <option v-for="o in listFilterOptions.region" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
      </section>

      <!-- 搜索结果列表区 -->
      <section class="profile-result-card">
        <div class="profile-result-heading">
          <div>
            <h2>搜索结果列表区</h2>
            <span>共找到 {{ listTotal }} 位人才</span>
          </div>
          <span class="profile-result-hint">点击人才条目查看画像详情</span>
        </div>
        <div class="profile-result-table-wrap">
          <div class="profile-result-table">
            <div class="profile-result-header">
              <span>姓名</span><span>机构</span><span>学科领域</span><span>代表性成果</span>
              <span>项目经历</span><span>学术影响力</span><span>活跃度</span><span>操作</span>
            </div>
            <article v-for="r in pagedListRecords" :key="r.id"
                     class="profile-result-row" tabindex="0" role="link"
                     :aria-label="`查看${r.name}的人才画像`"
                     @click="openProfileDetail(r.id)"
                     @keydown.enter.prevent="openProfileDetail(r.id)"
                     @keydown.space.prevent="openProfileDetail(r.id)">
              <div class="profile-result-person">
                <span class="profile-result-avatar">{{ r.name.charAt(0) }}</span>
                <span class="profile-result-person-copy">
                  <button class="profile-result-name" type="button" @click.stop="openProfileDetail(r.id)">{{ r.name }}</button>
                  <small>{{ r.type }} · {{ r.region }}</small>
                </span>
              </div>
              <div class="profile-result-institution">{{ r.institution }}</div>
              <div class="profile-result-field">
                <b>{{ r.field }}</b>
                <span><em>{{ r.tertiary }}</em><em>{{ r.quaternary }}</em></span>
              </div>
              <div class="profile-result-outcome">{{ r.outcome }}</div>
              <div class="profile-result-project">
                <b>{{ r.years }}</b>
                <small>{{ r.projects }}</small>
              </div>
              <div class="profile-result-impact">
                <b>{{ r.impact }}</b>
                <small>综合影响指数</small>
              </div>
              <div class="profile-result-activity">
                <b>{{ r.activity }}</b>
                <small>最近更新</small>
              </div>
              <div class="profile-result-operation">
                <button class="profile-result-view" type="button" @click.stop="openProfileDetail(r.id)">查看画像</button>
              </div>
            </article>
            <div v-if="pagedListRecords.length === 0" class="profile-result-empty">
              没有匹配人才，请减少筛选条件后重试。
            </div>
          </div>
        </div>
        <div class="profile-result-pagination" aria-label="人才画像列表分页">
          <span>共 {{ listTotal }} 位人才</span>
          <div class="profile-pagination-pages">
            <button type="button" :disabled="currentPage === 1" @click="setListPage(currentPage - 1)">上一页</button>
            <template v-for="(p, idx) in listPageItems" :key="idx + '-' + p">
              <span v-if="p === '…'" class="profile-pagination-ellipsis">…</span>
              <button v-else type="button"
                      :class="{ active: p === currentPage }"
                      @click="setListPage(p)">{{ p }}</button>
            </template>
            <button type="button" :disabled="currentPage === listTotalPages" @click="setListPage(currentPage + 1)">下一页</button>
          </div>
          <span>第 {{ currentPage }} / {{ listTotalPages }} 页</span>
        </div>
      </section>
    </section>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '../../assets/styles/talent-profile.css';
import { useTalentProfile } from '../../hooks/talent-profile';
import { windowedPageItems } from '../../utils/pagination';

const router = useRouter();

const {
  setTalentRouter,
  // 列表检索页状态与 setter
  currentPage, listKeyword, listFilters, listTotal,
  pagedListRecords, listTotalPages,
  openProfileDetail, handleListSearch,
  resetListFilters, setListPage, handleListFilterChange,
  fetchProfileList, fetchDisciplineTree, fetchFilterOptions,
  primaryOptions, secondaryOptions, tertiaryOptions, quaternaryOptions,
  listFilterOptions
} = useTalentProfile();

// 注入 router 到 composable
setTalentRouter(router);

// 页面加载时：从后端拉取学科树 + 筛选选项 + 人才列表
onMounted(async () => {
  fetchDisciplineTree();
  fetchFilterOptions();
  fetchProfileList();
});

// 分页条窗口化：页数多时只显示首尾页 + 当前页±1，中间用省略号折叠，避免页码行过长
const listPageItems = computed(() => windowedPageItems(listTotalPages.value, currentPage.value));
</script>
