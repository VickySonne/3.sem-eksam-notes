<script setup>
// Bevæger os rundt i mappe strukturen
import CasesTable from "@/pages/cases/components/index/CasesTable.vue";
import CasesPagination from "@/pages/cases/components/index/CasesPagination.vue";
import ActionToolbar from "./components/shared/ActionToolbar.vue";
import SearchInput from "../../components/inputs/SearchInput.vue";
import CustomSelect from "../../components/inputs/dropdowns/CustomSelect.vue";
import CustomSelectItem from "../../components/inputs/dropdowns/CustomSelectItem.vue";
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";
import PageTitle from "@/components/layout/PageTitle.vue";
import TertiaryButton from "@/components/buttons/TertiaryButton.vue";

// @=src
import router from "@/router";
import casesReducer from "@/pages/cases/components/index/casesReducer";

// Det kommer fra en vue - importere det fra vue selv
import {ref} from "vue";


const isLoading = ref(true)

// asynkront: vi afventer at fetchCases er færdig inden vi affyre funktionen 
casesReducer.fetchCases().then(() => {
    isLoading.value = false
})

// overordnet
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
          <!-- Placeholder og callback -->
          <SearchInput placeholder="Søg..." value="" :search-callback="updateSearch"/>

          <!-- Hvad er det? -->
          <CustomSelect>
            <CustomSelectItem>Sorter efter status</CustomSelectItem>
            <CustomSelectItem>Igangværende</CustomSelectItem>
            <CustomSelectItem>Klar til kunden</CustomSelectItem>
            <CustomSelectItem>Afventer</CustomSelectItem>
            <CustomSelectItem>Færdig</CustomSelectItem>
          </CustomSelect>

          <!-- hvorfor tom callback? -->
          <TertiaryButton text="Advanceret søgning" :callback="() => {}" :emphasised="true"/>
        </template>

        <template #contentright>
          <PrimaryButton title="Opret Ny Sag" :callback="() => router.push({ path: '/case/' })">
              <font-awesome-icon icon="plus" />
          </PrimaryButton>
        </template>
      </ActionToolbar>
    </div>

    
    <div v-if="isLoading" class="loader"></div>

    <!-- when loading is set to false, after fetching is finished, renders CasesTable og CasesPagination -->
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