<script setup>
import casesReducer from "@/pages/cases/components/index/casesReducer";
import CaseTableRow from "@/pages/cases/components/index/CasesTableRow.vue";
import CasesTableHeader from "@/pages/cases/components/index/CasesTableHeader.vue";
import caseIndexDataColumns from "@/data/cases/index/indexDataColumns";


const workCases = casesReducer.cases
casesReducer.fetchCases()
</script>

<template>
  <table>
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