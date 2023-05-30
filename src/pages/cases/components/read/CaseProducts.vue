<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import TertiaryButton from '../../../../components/buttons/TertiaryButton.vue';
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Produkter" />
        </template>

        <TertiaryButton text="Ingen produkter. Klik for at tilføje et produkt."></TertiaryButton>
    </SectionContainer>
</template>