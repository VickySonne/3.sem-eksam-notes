<script setup>
import casesReducer from "@/pages/cases/components/index/casesReducer";
import CaseTableRow from "@/pages/cases/components/index/CasesTableRow.vue";
import CasesTableHeader from "@/pages/cases/components/index/CasesTableHeader.vue";
import caseIndexDataColumns from "@/data/cases/index/caseIndexDataColumns";
import NoResult from "@/pages/cases/components/index/NoResult.vue";
import {ref, watch} from "vue";

const workCases = ref(casesReducer.pagination.value.getPaginatedResults())

watch(casesReducer.pagination, () => {
    workCases.value = casesReducer.pagination.value.getPaginatedResults()
}, {deep: true})
</script>

<template>
  <NoResult v-if="!workCases.length" />

  <table v-if="workCases.length">
    <CasesTableHeader :columns="caseIndexDataColumns" />

      <tbody>
          <CaseTableRow v-for="workCase in workCases" :workCase=workCase :key="workCase.id" />
      </tbody>
  </table>
</template>

<style lang="scss" scoped>
  table {
    width: 100%;
  }
</style>