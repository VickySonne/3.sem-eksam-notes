<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CustomTaskInput from "@/pages/cases/components/handlecase/CustomTaskInput.vue";
import TaskSelectionHeader from "@/pages/cases/components/handlecase/TaskSelectionHeader.vue";
import TaskSelectionGrid from "@/pages/cases/components/handlecase/TaskSelectionGrid.vue";
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opgaver">
                <CustomTaskInput />
            </SectionHeader>
        </template>

        <TaskSelectionHeader />
        <hr>
        <TaskSelectionGrid />
    </SectionContainer>
</template>

<style lang="scss" scoped>
hr {
    background-color: #1E293B;
    border-radius: var(--border-radius);
    height: .25rem;
    margin-block: var(--default-gap);
}
</style>
