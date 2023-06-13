<script setup>
    import PageTitle from '../../components/layout/PageTitle.vue';
    import BaseGrid from '../../components/layout/BaseGrid.vue';
    import BackButton from '../../components/layout/navigation/BackButton.vue';
    import HandleCaseCustomer from '../cases/components/handlecase/HandleCaseCustomers.vue';
    import HandleCaseTasks from './components/handlecase/tasks/HandleCaseTasks.vue';
    import HandleCaseProducts from '../cases/components/handlecase/HandleCaseProducts.vue';
    import HandleCaseDetails from './components/handlecase/HandleCaseDetails.vue';
    import HandleCaseSummary from './components/handlecase/HandleCaseSummary.vue';
    import HandleCaseActions from './components/handlecase/HandleCaseActions.vue';
    import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
    import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
    import {onUnmounted, ref} from "vue";
    import TertiaryButton from "@/components/buttons/TertiaryButton.vue";
    import router from "@/router";

    const isLoading = ref(true)

    // initialise er en funktion/metode i reduceren
    handleCaseReducer.initialize().then(() => {
        isLoading.value = false
    })

    // Når componentent bliver fjernet fra skærmen, når det ikke er rendere mere, så skal denne funktion kaldes
    onUnmounted(() => {

        // flush er også en metode i reducern
        handleCaseReducer.flush()
    })

    // en arrow funktion uden et parameter
    const cancelCreate = () => {

        // confirm er en method med et argument
        // Det er en metode på vinduet der laver en pop up i browser vinduet
        if (window.confirm('Er du sikker på du vil annullere?')) {

            // .push er en vue-router funktion der sender en til den givende path
            router.push('/')
        }
    }
</script>

<template>
    <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
    </div>

    <template v-if="!isLoading">
        <PageTitle title="Opret ny sag" />

        <BackButton :require-confirmation="true">Tilbage til oversigt</BackButton>

        <BaseGrid>
            <template #left-column>
                <HandleCaseCustomer />
                <HandleCaseTasks />
                <HandleCaseProducts />
                <HandleCaseDetails />
            </template>

            <template #right-column>
                <HandleCaseSummary />

                <HandleCaseActions>
                    <TertiaryButton text="Annuler" @click="cancelCreate" :danger="true"/>
                    <PrimaryButton title="Opret Sag" @click="() => handleCaseReducer.createCase()"/>
                </HandleCaseActions>
            </template>
        </BaseGrid>
    </template>
</template>