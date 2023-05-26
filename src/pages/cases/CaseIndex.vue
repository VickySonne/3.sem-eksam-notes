<script setup>
import CasesTable from "@/pages/cases/components/index/CasesTable.vue";
import CasesPagination from "@/pages/cases/components/index/CasesPagination.vue";
import ActionToolbar from "./components/shared/ActionToolbar.vue";
import SearchInput from "../../components/inputs/SearchInput.vue";
import CustomSelect from "../../components/inputs/dropdowns/CustomSelect.vue";
import CustomSelectItem from "../../components/inputs/dropdowns/CustomSelectItem.vue";
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";
import PageTitle from "@/components/layout/PageTitle.vue";
import TertiaryButton from "@/components/buttons/TertiaryButton.vue";
import router from "@/router";
import casesReducer from "@/pages/cases/components/index/casesReducer";
import {ref} from "vue";

const isLoading = ref(true)

casesReducer.fetchCases().then(() => {
    isLoading.value = false
})

const updateSearch = (search) => {
    casesReducer.updateSearch(search)
}
</script>

<template>
  <div class="wrapper">
    <PageTitle title="Sagstyrring" />

    <div>
      <ActionToolbar>
        <template #contentleft>
          <SearchInput placeholder="Søg..." value="" :search-callback="updateSearch"/>

          <CustomSelect>
            <CustomSelectItem>Cookie Dough</CustomSelectItem>
          </CustomSelect>

          <TertiaryButton text="Advanceret søgning" :callback="() => {}" :emphasised="true"/>
        </template>

        <template #contentright>
          <PrimaryButton title="Opret Ny Sag" :callback="() => router.push({ path: '/case/' })">
              <font-awesome-icon icon="plus" />
          </PrimaryButton>
        </template>
      </ActionToolbar>
    </div>

    <div v-if="isLoading" class="loader" />

    <div v-if="!isLoading">
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