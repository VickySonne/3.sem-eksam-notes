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

// referencer til reactive refs i reduceren
const selectedCustomer = handleCaseReducer.selectedCustomer
const customerSearch = handleCaseReducer.customerSearch
const customerOptions = handleCaseReducer.customerOptions
const hasSecondaryPayee = handleCaseReducer.hasSecondaryPayee

// opdatere værdien af customerSearch når der bliver søgt på kunder
const updateCustomerSearch = (value) => {
    customerSearch.value = value
}

// opdatere værdien af SelectedCustomer når en kunde bliver valgt
const selectCustomer = (customer) => {
    selectedCustomer.value = customer
}

// sætter værdien til null når kunden bliver fjernet
const removeCustomer = () => {
    selectedCustomer.value = null
}

// sætter assSecondaryPayee til true, så det bliver rendered/vist når der trykkes på knappen: anden betaler
const addSecondaryPayee = () => {
    handleCaseReducer.hasSecondaryPayee.value = true
}
</script>

<template>
    <div>
        <SectionHeader title="Kunder">

            <!-- bliver kun rendered hvis der er valgt en kunde og der ikke er valgt at kunne tilføje en anden betaler -->
            <TertiaryButton v-if="selectedCustomer && !hasSecondaryPayee" text="Anden betaler" :callback="addSecondaryPayee"></TertiaryButton>
        </SectionHeader>

        <!-- Hvis der ikke er valgt nogen kunde renderes dette så der kan søges på kunder -->
        <ActionToolbar v-if="!selectedCustomer">
            <template #contentleft>

                <!-- Når der skrives i inputtet opdates customerSearch ref ved at funktionen bliver kaldt -->
                <SearchInput placeholder="Find kunde..." :value="customerSearch" :search-callback="updateCustomerSearch"></SearchInput>
                <TertiaryButton text="Opret ny kunde" :emphasised="true" :callback="() => {}"></TertiaryButton>
            </template>
        </ActionToolbar>

        <!-- når der søges på kunder, for customerSearch en længe og dermed værdi true eller når der er valgt en kunde vises denne sektion -->
        <SectionContainer v-if="customerSearch.length || selectedCustomer">

            <!-- Hvis der ikke er valgt en kunde vises denne div med et grid, samt for hvert  -->
            <div v-if="!selectedCustomer" class="customer-grid">

                <!-- for hver kunde i arrayet af mulige kunder, sammenlignes der med .filter om det matcher søge inputted og assigner kunden, hvis det matcher til variablen customer -->
                <!-- customerOption.filter lavet et nyt array med de matchende resultater -->
                <!-- For hver kunde i arrayet bliver der rendered et ChosenCustomer component -->
                <!-- Når der trykkes på en kunde, kaldes selectCustomer funktionen -->
                <!-- key er required ved en v-for for at vue kan holde styr på og opdatere componentet når arrayet opdateres-->
                <ChosenCustomer v-for="customer in customerOptions.filter(c => recursiveObjectSearch(c, customerSearch))" :customer="customer" :callback="selectCustomer" :key="customer.id" />
            </div>

            <!-- når der er valgt en kunde, renderes følgende, og hvis der trykkes på kunden kaldes removeCustomer funktionen -->
            <ChosenCustomer v-if="selectedCustomer" :customer="selectedCustomer" :callback="removeCustomer" :destructive-callback="true">
                <font-awesome-icon icon="times"></font-awesome-icon>
            </ChosenCustomer>

            <!-- Hvis der ikke findes nogle matchende kunder når der søges vises følgende -->
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