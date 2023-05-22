<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import SearchInput from "../../../../components/inputs/SearchInput.vue";
import TertiaryButton from "../../../../components/buttons/TertiaryButton.vue";
import ActionToolbar from "../shared/ActionToolbar.vue";
import NoCustomer from "../handlecase/customers/NoCustomer.vue";
import ChosenCustomer from "./customers/ChosenCustomer.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";

const customer = handleCaseReducer.selectedCustomer
const customerSearch = handleCaseReducer.customerSearch
const customerOptions = handleCaseReducer.customerOptions

const hasSecondaryPayee = handleCaseReducer.hasSecondaryPayee
const secondaryPayee = handleCaseReducer.secondaryPayee
const secondaryPayeeSearch = handleCaseReducer.secondaryPayeeSearch

const filteredCustomers = () => {
    console.log(recursiveObjectSearch(customerOptions.value, customerSearch.value))
    return recursiveObjectSearch(customerOptions.value, customerSearch.value)
}

</script>

<template>
    <div>
        <SectionHeader title="Kunder"> 
            <TertiaryButton v-if="customer" text="Anden betaler"></TertiaryButton>
        </SectionHeader>

        <ActionToolbar v-if="!customer">
            <template #contentleft>
                <SearchInput placeholder="Find kunde..."></SearchInput>
                <TertiaryButton text="Opret ny kunde" :emphasised="true" :callback="filteredCustomers"></TertiaryButton>
            </template>
        </ActionToolbar>

        <SectionContainer v-if="customerSearch.length">
            <ChosenCustomer />
            <NoCustomer v-if="!customerOptions.filter(c => recursiveObjectSearch(c, customerSearch)).length" text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>

    <!-- denne div vises kun når anden betaler er valgt -->
    <div v-if="hasSecondaryPayee">
        <SectionHeader title="Anden betaler" />
        
        <!-- action toolbar skjules når anden betaler er indtastet -->
        <ActionToolbar v-if="!secondaryPayee">
            <template #contentleft>
                <SearchInput placeholder="Find kunde..."></SearchInput>
                <TertiaryButton text="Opret ny kunde" :emphasised="true"></TertiaryButton>
            </template>
            <template #contentright>
                <TertiaryButton text="Luk" :callback="() => secondaryPayee = !secondaryPayee"></TertiaryButton>
            </template>
        </ActionToolbar>

        <SectionContainer v-if="secondaryPayeeSearch">
            <ChosenCustomer />
            <NoCustomer text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>
</template>

<style>

</style>
