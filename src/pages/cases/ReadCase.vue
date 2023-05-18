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

const caseNumber = router.currentRoute.value.params.id
</script>

<template>
    <PageTitle :title="'Sag #' + caseNumber" />
    <BackButton>Tilbage til oversigt</BackButton>

    <BaseGrid>
        <template #left-column>
            <CaseDetails />
            <CaseTasks />
            <CaseProducts />
            <HandleCaseDetails/>
        </template>

        <template #right-column>
            <CaseCustomer />
            <CaseMessaging />
        </template>
    </BaseGrid>
</template>