<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";
import readCaseReducer from "@/pages/cases/components/read/readCaseReducer";

const tasks = readCaseReducer.tasks
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opgaver" />
        </template>

        <div>
            <CaseTask v-for="task in tasks" :task=task :selected="task.completed" :key=task.id :callback="() => readCaseReducer.toggleTaskCompletion(task)"/>
        </div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
section > div:last-child {
    display: grid;
    gap: var(--default-padding);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>