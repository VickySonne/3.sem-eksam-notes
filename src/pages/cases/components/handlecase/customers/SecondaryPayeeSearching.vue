<script setup>
import ChosenCustomer from "@/pages/cases/components/handlecase/customers/ChosenCustomer.vue";
import NoCustomer from "@/pages/cases/components/handlecase/customers/NoCustomer.vue";
import TertiaryButton from "@/components/buttons/TertiaryButton.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import ActionToolbar from "@/pages/cases/components/shared/ActionToolbar.vue";
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const hasSecondaryPayee = handleCaseReducer.hasSecondaryPayee
const secondaryPayee = handleCaseReducer.secondaryPayee
const secondaryPayeeSearch = handleCaseReducer.secondaryPayeeSearch

const updateSecondaryPayeeSearch = (value) => {
    secondaryPayeeSearch.value = value
}
</script>

<template>
    <div v-if="hasSecondaryPayee">
        <SectionHeader title="Anden betaler" />

        <!-- action toolbar skjules når anden betaler er indtastet -->
        <ActionToolbar v-if="!secondaryPayee">
            <template #contentleft>
                <SearchInput placeholder="Find kunde..." :search-callback="updateSecondaryPayeeSearch"></SearchInput>
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