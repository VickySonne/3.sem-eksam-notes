<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import customerReducer from "@/pages/cases/components/read/reducers/customerReducer";
import {onUnmounted, ref} from "vue";

const isLoading = ref(true)

const customer = customerReducer.customer

customerReducer.fetchCustomer().then(() => {
    isLoading.value = false
})

onUnmounted(() => {
    customerReducer.flush()
})
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Kunde" />
        </template>

        <ul>
            <li v-for="(value, key) in customer" :key="key">{{ value }}</li>
        </ul>

        <div v-if="isLoading" class="loader"></div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
ul {
    display: grid;
    gap: var(--half-padding)
}
</style>