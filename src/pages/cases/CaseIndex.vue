<script setup>
import CasesTable from "@/pages/cases/components/index/CasesTable.vue";
import CasesPagination from "@/pages/cases/components/index/CasesPagination.vue";
import ActionToolbar from "./components/shared/ActionToolbar.vue";
import SearchInput from "../../components/inputs/SearchInput.vue";
import CustomSelect from "../../components/dropdowns/CustomSelect.vue";
import CustomSelectItem from "../../components/dropdowns/CustomSelectItem.vue";
import PrimaryButton from "../../components/layout/buttons/PrimaryButton.vue";
import PageTitle from "@/components/layout/PageTitle.vue";
import NoResult from "./components/index/NoResult.vue";
</script>

<template>
  <div class="wrapper">
    <PageTitle title="Sagstyrring" />
    <div>
      <ActionToolbar>
        <template #contentleft>
          <SearchInput placeholder="Søg..." />
          <CustomSelect>
            <CustomSelectItem></CustomSelectItem>
          </CustomSelect>
          <p>Tertiary button here</p>
        </template>
        <template #contentright>
          <PrimaryButton icon="plus">Opret Ny Sag</PrimaryButton>
        </template>
      </ActionToolbar>
    </div>
    <div>
      <!-- <NoResult /> -->
      <CasesTable />
      <CasesPagination />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    gap: var(--large-gap);
  }
</style>