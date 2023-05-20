<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CustomTaskInput from "@/pages/cases/components/handlecase/CustomTaskInput.vue";
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opgaver">
                <CustomTaskInput />
            </SectionHeader>
        </template>

        <!-- stuff goes here -->

    </SectionContainer>
</template>

<style lang="scss" scoped>

</style>
