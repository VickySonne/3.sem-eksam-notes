<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CustomTaskInput from "@/pages/cases/components/handlecase/tasks/CustomTaskInput.vue";
import TaskSelectionHeader from "@/pages/cases/components/handlecase/tasks/TaskSelectionHeader.vue";
import TaskSelectionGrid from "@/pages/cases/components/handlecase/tasks/TaskSelectionGrid.vue";
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