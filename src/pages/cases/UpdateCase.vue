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
</script>

<template>
    <PageTitle :title="'Opdater Sag #' + caseNumber" />
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
                <PrimaryButton title="Gem Sag"></PrimaryButton>
            </HandleCaseActions>
        </template>
    </BaseGrid>
</template>

<style lang="scss" scoped>

</style>