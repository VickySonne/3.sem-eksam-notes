<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import detailsReducer from "@/pages/cases/components/read/reducers/detailsReducer.js"
import { onUnmounted, ref } from "vue";

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
            <p><span>Ansvarlig:</span> {{ details.responsible_employee.name }}</p>
            <p><span>Status:</span> {{ details.status.name }}</p>
            <p><span>Afhentningstidspunkt:</span> {{ new Date(details.pickup).toLocaleDateString() }}</p>
            <p><span>Aftalt pris:</span> {{ details.negotiated_price }}</p>
            <p><span>Oprettet af:</span> {{ details.created_by.name }}</p>
            <p><span>Oprettet d.</span> {{ new Date(details.created_at).toLocaleDateString() }}</p>
            <p><span>Beskrivelse:</span> {{ details.description }}</p>
        </div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
    span{
        font-weight: bold;
    }

    p{
        padding-block: var(--half-padding);
    }
</style>