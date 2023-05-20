<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CustomTaskInput from "@/pages/cases/components/handlecase/CustomTaskInput.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";


const taskOptions = handleCaseReducer.taskOptions
const selectedTasks = handleCaseReducer.selectedTasks

console.log(selectedTasks.value)

const switchCategory = (id) => {
    handleCaseReducer.selectedTaskOption.value = id
}

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
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opgaver">
                <CustomTaskInput />
            </SectionHeader>
        </template>

        <ul>
            <li v-for="option in taskOptions" :key="option.id" @click="switchCategory(option.id)">{{ option.name }}</li>
        </ul>

        <ul>
            <CaseTask v-for="task in fetchTasks()" :task="task" :selected="taskIsSelected(task)" :callback="() => toggleTask(task)" :key=task.id />
        </ul>
    </SectionContainer>
</template>

<style lang="scss" scoped>
ul {
    display: grid;
    gap: var(--default-padding);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
