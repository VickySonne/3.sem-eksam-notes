<script setup>
import SectionContainer from '../../../../components/layout/section/SectionContainer.vue';
import SectionHeader from '../../../../components/layout/section/SectionHeader.vue';
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Dokumenter" />
        </template>
        <div class="document-info">
            <h3>Filer</h3>
            <h3>Noter</h3>
        </div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
.document-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > h3 {
        font-weight: var(--text-heavy);
    }
}
</style>