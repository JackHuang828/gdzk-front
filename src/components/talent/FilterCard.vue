<template>
  <section class="card filter" id="filter">
    <div class="filterhead">
      <div>
        <h2>列表筛选</h2>
      </div>
    </div>
    <div class="filterbox">
      <div class="search">
        <input
          id="kw"
          placeholder="搜索姓名、机构、研究方向、项目或成果关键词"
          :value="state.filters.kw"
          @input="setFilter('kw', $event.target.value)"
        /><button class="btn primary" type="button" @click="applyFilters()">检索</button
        ><button class="btn" type="button" @click="resetFilters">重置条件</button
        ><button class="btn primary" type="button" :disabled="!hasSchemeCondition" @click="openDialog('saveScheme')">保存方案</button>
      </div>
      <div class="filters">
        <SearchableSelect
          :model-value="state.filters.primaryDiscipline"
          :options="filterOptions.primary"
          placeholder="一级学科（全部）"
          @update:model-value="setFilter('primaryDiscipline', $event)"
        /><SearchableSelect
          :model-value="state.filters.field"
          :options="filterOptions.secondary"
          placeholder="二级学科（全部）"
          @update:model-value="setFilter('field', $event)"
        /><SearchableSelect
          :model-value="state.filters.tertiary"
          :options="filterOptions.tertiary"
          placeholder="三级学科（全部）"
          @update:model-value="setFilter('tertiary', $event)"
        /><SearchableSelect
          :model-value="state.filters.quaternary"
          :options="filterOptions.quaternary"
          placeholder="四级学科（全部）"
          @update:model-value="setFilter('quaternary', $event)"
        /><SearchableSelect
          :model-value="state.filters.inst"
          :options="filterOptions.inst"
          placeholder="机构/单位（全部）"
          @update:model-value="setFilter('inst', $event)"
        /><SearchableSelect
          :model-value="state.filters.out"
          :options="filterOptions.out"
          placeholder="学术成果（全部）"
          @update:model-value="setFilter('out', $event)"
        /><SearchableSelect
          :model-value="state.filters.project"
          :options="filterOptions.project"
          placeholder="项目（全部）"
          @update:model-value="setFilter('project', $event)"
        /><SearchableSelect
          :model-value="state.filters.type"
          :options="TYPE_OPTIONS"
          placeholder="人才类别（全部）"
          @update:model-value="setFilter('type', $event)"
        /><SearchableSelect
          :model-value="state.filters.region"
          :options="REGION_OPTIONS"
          placeholder="地域分布（全部）"
          @update:model-value="setFilter('region', $event)"
        />
      </div>
    </div>
    <div class="saved-schemes" id="savedSchemes">
      <div class="saved-schemes-heading">
        <h3>人才池方案</h3>
      </div>
      <div class="scheme-list" id="schemeList">
        <span v-if="!schemes.length" class="scheme-empty">暂无已保存方案</span>
        <div v-for="scheme in schemes" :key="scheme.id" class="scheme-item">
          <button type="button" class="scheme-open" title="点击恢复该方案的筛选条件" @click="applyScheme(scheme.id)">{{ scheme.name }}</button>
          <button type="button" class="scheme-delete" @click.stop="openDialog('deleteScheme', { id: scheme.id, name: scheme.name })">删除</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/* 列表筛选卡：关键词 + 级联学科下拉（可搜索）+ 人才池方案 */
import SearchableSelect from './SearchableSelect.vue';
import {
  state, filterOptions, schemes, hasSchemeCondition,
  setFilter, applyFilters, resetFilters, applyScheme, openDialog,
} from '../../hooks/talent-library';

const TYPE_OPTIONS = ['领军人才', '青年人才', '项目人才'];
const REGION_OPTIONS = ['北京', '广东', '海外'];
</script>
