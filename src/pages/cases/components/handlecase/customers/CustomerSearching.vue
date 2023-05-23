<script setup>
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import NoCustomer from "@/pages/cases/components/handlecase/customers/NoCustomer.vue";
import TertiaryButton from "@/components/buttons/TertiaryButton.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import ActionToolbar from "@/pages/cases/components/shared/ActionToolbar.vue";
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import ChosenCustomer from "@/pages/cases/components/handlecase/customers/ChosenCustomer.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const selectedCustomer = handleCaseReducer.selectedCustomer
const customerSearch = handleCaseReducer.customerSearch
const customerOptions = handleCaseReducer.customerOptions
const hasSecondaryPayee = handleCaseReducer.hasSecondaryPayee

const updateCustomerSearch = (value) => {
    customerSearch.value = value
}

const selectCustomer = (customer) => {
    selectedCustomer.value = customer
}

const removeCustomer = () => {
    selectedCustomer.value = null
}

const addSecondaryPayee = () => {
    handleCaseReducer.hasSecondaryPayee.value = true
}
</script>

<template>
    <div>
        <SectionHeader title="Kunder">
            <TertiaryButton v-if="selectedCustomer && !hasSecondaryPayee" text="Anden betaler" :callback="addSecondaryPayee"></TertiaryButton>
        </SectionHeader>

        <ActionToolbar v-if="!selectedCustomer">
            <template #contentleft>
                <SearchInput placeholder="Find kunde..." :value="customerSearch" :search-callback="updateCustomerSearch"></SearchInput>
                <TertiaryButton text="Opret ny kunde" :emphasised="true" :callback="() => {}"></TertiaryButton>
            </template>
        </ActionToolbar>

        <SectionContainer v-if="customerSearch.length">
            <div v-if="!selectedCustomer" class="customer-grid">
                <ChosenCustomer v-for="customer in customerOptions.filter(c => recursiveObjectSearch(c, customerSearch))" :customer="customer" :callback="selectCustomer" :key="customer.id" />
            </div>

            <ChosenCustomer v-if="selectedCustomer" :customer="selectedCustomer" :callback="removeCustomer" :destructive-callback="true">
                <font-awesome-icon icon="times"></font-awesome-icon>
            </ChosenCustomer>

            <NoCustomer v-if="!customerOptions.filter(c => recursiveObjectSearch(c, customerSearch)).length" text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>
</template>

<style lang="scss" scoped>
.customer-grid {
    display: grid;
    gap: var(--half-padding);
}
</style>