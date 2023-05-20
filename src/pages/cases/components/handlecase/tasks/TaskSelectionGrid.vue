<script setup>
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const selectedTasks = handleCaseReducer.selectedTasks

const fetchTasks = () => {
    return handleCaseReducer.taskOptions.value.find(option => option.id === handleCaseReducer.selectedTaskOption.value).tasks
}

const taskIsSelected = (task) => {
    return selectedTasks.value.some(t => t.id === task.id)
}

const toggleTask = (task) => {
    if (taskIsSelected(task)) {
        selectedTasks.value = selectedTasks.value.filter(t => t.id !== task.id)
    } else {
        selectedTasks.value.push(task)
    }
}
</script>

<template>
    <ul>
        <CaseTask v-for="task in fetchTasks()" :task="task" :selected="taskIsSelected(task)" :callback="() => toggleTask(task)" :key=task.id />
    </ul>
</template>

<style lang="scss" scoped>
ul {
    display: grid;
    gap: var(--default-padding);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
