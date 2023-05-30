<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import readCaseReducer from "@/pages/cases/components/read/readCaseReducer";

const customer = readCaseReducer.customer

</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Kunde" />
        </template>

        <ul>
            <li v-for="(value, key) in customer" :key="key">{{ value }}</li>
        </ul>
    </SectionContainer>
</template>

<style lang="scss" scoped>
ul {
    display: grid;
    gap: var(--half-padding);

    li:first-child {
        font-weight: var(--text-heavy);
        font-size: 20px;
    }
}
</style>