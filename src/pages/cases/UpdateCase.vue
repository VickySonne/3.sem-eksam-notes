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
    import TertiaryButton from '../../components/buttons/TertiaryButton.vue';
    import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
    import router from "@/router";
    import {onUnmounted, ref} from "vue";
    import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

    const isLoading = ref(true)

    defineProps({
        id: {
            type: String,
            required: true
        }
    })

    handleCaseReducer.initialize(router.currentRoute.value.params.id).then(() => {
        isLoading.value = false
    })

    onUnmounted(() => {
        handleCaseReducer.flush()
    })
</script>

<template>
    <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
    </div>

    <template v-if="!isLoading">
        <PageTitle :title="'Opdater Sag #' + id" />
        <BackButton>Tilbage til sag</BackButton>
        <BaseGrid>
            <template #left-column>
                <HandleCaseCustomer></HandleCaseCustomer>
                <HandleCaseTasks></HandleCaseTasks>
                <HandleCaseProducts></HandleCaseProducts>
                <HandleCaseDetails></HandleCaseDetails>
            </template>
            <template #right-column>
                <HandleCaseSummary></HandleCaseSummary>
                <HandleCaseActions>
                    <TertiaryButton text="Annuler"/>
                    <PrimaryButton title="Gem Sag" @click="() => handleCaseReducer.updateCase()"></PrimaryButton>
                </HandleCaseActions>
            </template>
        </BaseGrid>
    </template>
</template>

<style lang="scss" scoped>

</style>