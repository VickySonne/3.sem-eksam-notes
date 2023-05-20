<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CustomTaskInput from "@/pages/cases/components/handlecase/CustomTaskInput.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import TaskComponent from "../../../../../old/components/new components/TaskComponent.vue";
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";


const taskOptions = handleCaseReducer.taskOptions

const switchCategory = (id) => {
    handleCaseReducer.selectedTaskOption.value = id
}

const fetchTasks = () => {
    return handleCaseReducer.taskOptions.value.find(option => option.id === handleCaseReducer.selectedTaskOption.value).tasks
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
            <CaseTask v-for="task in fetchTasks()" :task=task :key=task.id />
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
