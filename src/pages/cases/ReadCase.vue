<script setup>
import CaseDetails from "@/pages/cases/components/read/CaseDetails.vue";
import BaseGrid from "@/components/layout/BaseGrid.vue";
import CaseCustomer from "@/pages/cases/components/read/CaseCustomer.vue";
import CaseMessaging from "@/pages/cases/components/read/CaseMessaging.vue";
import CaseProducts from "@/pages/cases/components/read/CaseProducts.vue";
import CaseTasks from "@/pages/cases/components/read/CaseTasks.vue";
import BackButton from "@/components/layout/navigation/BackButton.vue";
import HandleCaseDetails from "./components/handlecase/HandleCaseDetails.vue";
import PageTitle from "@/components/layout/PageTitle.vue";
import router from "@/router";
import ReadCaseMenu from "./components/read/ReadCaseMenu.vue";
import CaseFilesNotes from "./components/read/CaseFilesNotes.vue";

const caseNumber = router.currentRoute.value.params.id
</script>

<template>
    <PageTitle :title="'Sag #' + caseNumber" />
    <header>
        <BackButton>Tilbage til oversigt</BackButton>
        <ReadCaseMenu />
    </header>

    <BaseGrid>
        <template #left-column>
            <CaseDetails />
            <CaseTasks />
            <CaseProducts />
            <!-- <HandleCaseDetails/> -->
            <CaseFilesNotes />
        </template>

        <template #right-column>
            <CaseCustomer />
            <CaseMessaging />
        </template>
    </BaseGrid>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    & > * {
        padding: 0;
    }
}
</style>