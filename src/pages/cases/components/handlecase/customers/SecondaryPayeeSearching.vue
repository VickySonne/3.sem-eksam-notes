<script setup>
import ChosenCustomer from "@/pages/cases/components/handlecase/customers/ChosenCustomer.vue";
import NoCustomer from "@/pages/cases/components/handlecase/customers/NoCustomer.vue";
import TertiaryButton from "@/components/buttons/TertiaryButton.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import ActionToolbar from "@/pages/cases/components/shared/ActionToolbar.vue";
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";

const hasSecondaryPayee = handleCaseReducer.hasSecondaryPayee
const secondaryPayee = handleCaseReducer.secondaryPayee
const secondaryPayeeSearch = handleCaseReducer.secondaryPayeeSearch
const customerOptions = handleCaseReducer.customerOptions

const updateSecondaryPayeeSearch = (value) => {
    secondaryPayeeSearch.value = value
}

const selectSecondaryPayee = (customer) => {
    secondaryPayee.value = customer
}

const removeSecondaryPayee = () => {
    secondaryPayee.value = null
}

const cancelSecondaryPayee = () => {
    removeSecondaryPayee()
    hasSecondaryPayee.value = false
}
</script>

<!-- Same as CustomerSearching, mere eller mindre -->

<template>
    <div v-if="hasSecondaryPayee">
        <SectionHeader title="Anden betaler">
            <TertiaryButton text="Fjern anden betaler" :callback="cancelSecondaryPayee"></TertiaryButton>
        </SectionHeader>

        <ActionToolbar v-if="!secondaryPayee">
            <template #contentleft>
                <SearchInput placeholder="Find kunde..." :value="secondaryPayeeSearch" :search-callback="updateSecondaryPayeeSearch"></SearchInput>
                <TertiaryButton text="Opret ny kunde" :emphasised="true" :callback="() => {}"></TertiaryButton>
            </template>
        </ActionToolbar>

        <SectionContainer v-if="secondaryPayeeSearch.length || secondaryPayee">
            <div v-if="!secondaryPayee" class="customer-grid">
                <ChosenCustomer v-for="customer in customerOptions.filter(c => recursiveObjectSearch(c, secondaryPayeeSearch))" :customer="customer" :callback="selectSecondaryPayee" :key="customer.id" />
            </div>

            <ChosenCustomer v-if="secondaryPayee" :customer="secondaryPayee" :callback="removeSecondaryPayee" :destructive-callback="true">
                <font-awesome-icon icon="times"></font-awesome-icon>
            </ChosenCustomer>

            <NoCustomer v-if="!customerOptions.filter(c => recursiveObjectSearch(c, secondaryPayeeSearch)).length" text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>
</template>

<style lang="scss" scoped>
.customer-grid {
    display: grid;
    gap: var(--half-padding);
}
</style>