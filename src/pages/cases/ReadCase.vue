<script setup>
import CaseDetails from "@/pages/cases/components/read/CaseDetails.vue";
import BaseGrid from "@/components/layout/BaseGrid.vue";
import CaseCustomer from "@/pages/cases/components/read/CaseCustomer.vue";
import CaseMessaging from "@/pages/cases/components/read/CaseMessaging.vue";
import CaseProducts from "@/pages/cases/components/read/CaseProducts.vue";
import CaseTasks from "@/pages/cases/components/read/CaseTasks.vue";
import BackButton from "@/components/layout/navigation/BackButton.vue";
</script>

<template>
    <BackButton>Tilbage til oversigt</BackButton>

    <BaseGrid>
        <template #left-column>
            <CaseDetails />
            <CaseTasks />
            <CaseProducts />
        </template>

        <template #right-column>
            <CaseCustomer />
            <CaseMessaging />
        </template>
    </BaseGrid>
</template>