<script setup>
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import NoCustomer from "@/pages/cases/components/handlecase/customers/NoCustomer.vue";
import TertiaryButton from "@/components/buttons/TertiaryButton.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import ActionToolbar from "@/pages/cases/components/shared/ActionToolbar.vue";
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const customer = handleCaseReducer.selectedCustomer
const customerSearch = handleCaseReducer.customerSearch
const customerOptions = handleCaseReducer.customerOptions

const filteredCustomers = () => {
    console.log(recursiveObjectSearch(customerOptions.value, customerSearch.value))
    return recursiveObjectSearch(customerOptions.value, customerSearch.value)
}

const updateCustomerSearch = (value) => {
    customerSearch.value = value
}
</script>

<template>
    <div>
        <SectionHeader title="Kunder">
            <TertiaryButton v-if="customer" text="Anden betaler"></TertiaryButton>
        </SectionHeader>

        <ActionToolbar v-if="!customer">
            <template #contentleft>
                <SearchInput placeholder="Find kunde..." :search-callback="updateCustomerSearch"></SearchInput>
                <TertiaryButton text="Opret ny kunde" :emphasised="true" :callback="filteredCustomers"></TertiaryButton>
            </template>
        </ActionToolbar>

        <SectionContainer v-if="customerSearch.length">
            <!--            <ChosenCustomer />-->
            <NoCustomer v-if="!customerOptions.filter(c => recursiveObjectSearch(c, customerSearch)).length" text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>
</template>