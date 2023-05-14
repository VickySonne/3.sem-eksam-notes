<script setup>
import CaseDetails from "@/pages/cases/components/read/CaseDetails.vue";
import BaseGrid from "@/components/layout/BaseGrid.vue";
import CaseCustomer from "@/pages/cases/components/read/CaseCustomer.vue";
import CaseMessaging from "@/pages/cases/components/read/CaseMessaging.vue";
</script>

<template>
    <BaseGrid>
        <template #left-column>
            <CaseDetails />
        </template>

        <template #right-column>
            <CaseCustomer />
            <CaseMessaging />
        </template>
    </BaseGrid>
</template>