<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";
import taskReducer from "@/pages/cases/components/read/tasks/taskReducer";
import {onUnmounted, ref} from "vue";

const isLoading = ref(true)

const tasks = taskReducer.tasks
taskReducer.fetchTasks().then(() => {
    isLoading.value = false
})

onUnmounted(() => {
    taskReducer.flush()
})
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opgaver" />
        </template>

        <div v-if="isLoading" class="loader"></div>

        <div>
            <CaseTask v-for="task in tasks" :task=task :key=task.id :callback="() => taskReducer.toggleTaskCompletion(task)"/>
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