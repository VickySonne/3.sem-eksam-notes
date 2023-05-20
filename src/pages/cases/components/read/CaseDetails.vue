<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import detailsReducer from "@/pages/cases/components/read/reducers/detailsReducer.js"
import { onUnmounted, ref } from "vue";
import CaseInfo from "./details/CaseInfo.vue";

const isLoading = ref(true)

const details = detailsReducer.details

detailsReducer.fetchDetails().then(() => {
    isLoading.value = false
})

onUnmounted(() => {
    detailsReducer.flush()
})
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Detaljer" />
        </template>

        <div v-if="isLoading" class="loader"></div>

        <!-- Lav dette til komponenter som også kan genbruges i summery-->
        <div v-if="!isLoading">
            <!-- <p><span>Ansvarlig:</span> {{ details.responsible_employee.name }}</p>
            <p><span>Status:</span> {{ details.status.name }}</p>
            <p><span>Afhentningstidspunkt:</span> {{ new Date(details.pickup).toLocaleDateString() }}</p>
            <p><span>Aftalt pris:</span> {{ details.negotiated_price }}</p>
            <p><span>Oprettet af:</span> {{ details.created_by.name }}</p>
            <p><span>Oprettet d.</span> {{ new Date(details.created_at).toLocaleDateString() }}</p>
            <p><span>Beskrivelse:</span> {{ details.description }}</p> -->
            <CaseInfo label="Ansvarlig:"> {{ details.responsible_employee.name }}</CaseInfo>
            <CaseInfo label="Status:"> {{ details.status.name }}</CaseInfo>
            <CaseInfo label="Afhentning d."> {{ new Date(details.pickup).toLocaleDateString() }}</CaseInfo>
            <CaseInfo label="Aftalt pris:"> {{ details.negotiated_price }}</CaseInfo>
            <CaseInfo label="Opretter d."> {{ details.created_by.name }}</CaseInfo>
            <CaseInfo label="Oprettet af:"> {{ new Date(details.created_at).toLocaleDateString() }}</CaseInfo>
            <CaseInfo label="Beskrivelse:"> {{ details.description }}</CaseInfo>
        </div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
    
</style>