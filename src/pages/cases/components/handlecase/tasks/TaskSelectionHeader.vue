<script setup>
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const taskOptions = handleCaseReducer.taskOptions
const selectedTasks = handleCaseReducer.selectedTasks

const switchCategory = (id) => {
    handleCaseReducer.selectedTaskOption.value = id
}

const countSelectedTasksInCategory = (category) => {
    return category.tasks.filter(task => selectedTasks.value.some(t => t.id === task.id)).length
}
</script>

<template>
    <ul>
        <li v-for="option in taskOptions" :class="{
            selected: option.id === handleCaseReducer.selectedTaskOption.value
        }" :key="option.id" @click="switchCategory(option.id)">
            <p>
                {{ option.name }}
            </p>

            <p>
                {{ countSelectedTasksInCategory(option) }}
            </p>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
ul {
    display: grid;
    gap: var(--default-padding);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));

    li {
        align-items: center;
        background-color: var(--bg-white);
        border-radius: var(--border-radius);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: var(--default-padding);

        &.selected {
            background-color: var(--muted);
            color: var(--text-secondary);
        }
    }
}

@media screen and (prefers-color-scheme: dark) {
    li {
        background-color: var(--muted) !important;

        &.selected {
            background-color: var(--bg-white) !important;
            color: var(--text-secondary) !important;
        }
    }
}
</style>