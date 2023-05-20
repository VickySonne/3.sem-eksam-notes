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
    import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
    import {onUnmounted, ref} from "vue";

    const isLoading = ref(true)

    handleCaseReducer.initialize().then(() => {
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
        <PageTitle title="Opret ny sag" />

        <BackButton>Tilbage til oversigt</BackButton>

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
                    <TertiaryButton text="Annuler" />
                    <PrimaryButton title="Opret Sag" />
                </HandleCaseActions>
            </template>
        </BaseGrid>
    </template>
</template>

<style lang="scss" scoped>
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>