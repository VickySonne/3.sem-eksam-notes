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

// Det kommer fra vue - importere det fra vue selv
// Ref: er en reference til en værdi (man kan derved holde øje med værdi eller ændre den og opdatere den)
import {ref} from "vue";

// Laver en boolean der hedder isLoading, den starter med at load
const isLoading = ref(true)

// asynkront: vi afventer at fetchCases er færdig inden vi affyre funktionen
// Denne funktion ændre værdien af isLoading
casesReducer.fetchCases().then(() => {
    isLoading.value = false
})

// wrappet funktionen fra reducer i en identisk funktion - for at sikre adgang til den
const updateSearch = (search) => {
    casesReducer.updateSearch(search)
}
</script>

<template>
  <div class="wrapper">
    <PageTitle title="Sagstyrring" />

    <div>
      <ActionToolbar>

        <!-- Vi bruger 2 forskellige slots i actiontoolbar, 
          derfor bruger vi template til at gruppere indholdet og 
          navngive for at sikre at det kommer ind i de rigtige slots  
        -->

        <template #contentleft>
          <!-- Placeholder og callback -->
          <!-- Der bliver sendt properties in -->
          <!-- Det er searchInput properties -->
          <SearchInput placeholder="Søg..." value="" :search-callback="updateSearch"/>

          <!-- Hvad er det? - lave custom dropdowns -->
          <CustomSelect>
            <CustomSelectItem>Sorter efter status</CustomSelectItem>
            <CustomSelectItem>Igangværende</CustomSelectItem>
            <CustomSelectItem>Klar til kunden</CustomSelectItem>
            <CustomSelectItem>Afventer</CustomSelectItem>
            <CustomSelectItem>Færdig</CustomSelectItem>
          </CustomSelect>

          <!-- hvorfor tom callback? - fordi det er en placeholder? as it is required-->
          <!-- : betyder at det er JS -->
          <TertiaryButton text="Advanceret søgning" :callback="() => {}" :emphasised="true"/>
        </template>

        <template #contentright>

          <!-- router.push sender brugeren til den path når de trygger på knappen -->
          <PrimaryButton title="Opret Ny Sag" :callback="() => router.push({ path: '/case/' })">
              <font-awesome-icon icon="plus" />
          </PrimaryButton>
        </template>
      </ActionToolbar>
    </div>

    <!-- V-if er en if statement, hvis dette er sandt, så render elementet, hvis det er falsk, så fjern den -->
    <div v-if="isLoading" class="loader"></div>

    <!-- when loading is set to false, after fetching is finished, renders CasesTable og CasesPagination -->
    <!-- ! = ikke (når en boolean, gør den det modsatte) -->
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