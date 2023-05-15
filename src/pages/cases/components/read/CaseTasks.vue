<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";
import taskReducer from "@/pages/cases/components/read/tasks/taskReducer";

const tasks = taskReducer.tasks
taskReducer.fetchTasks()
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opgaver" />
        </template>

        <div>
            <CaseTask v-for="task in tasks" :task=task :key=task.id />
        </div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
section > div {
    display: grid;
    gap: var(--default-padding);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>