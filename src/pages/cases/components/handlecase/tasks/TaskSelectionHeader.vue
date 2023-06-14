<script setup>
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const taskOptions = handleCaseReducer.taskOptions
const selectedTasks = handleCaseReducer.selectedTasks

// skifter mellem de forskellige kategorier af task ved at skiftet id´et
const switchCategory = (id) => {
    handleCaseReducer.selectedTaskOption.value = id
}

// Tæller hvor mange task der er valgt og viser det
// Den filtrere igennem et array og sammenligner id´er. og returnere længden af det array der bliver dannet.
const countSelectedTasksInCategory = (category) => {
    return category.tasks.filter(task => selectedTasks.value.some(t => t.id === task.id)).length
}
</script>

<template>
    <ul>
        <!-- looper igennem alle kategorier -->
        <li v-for="option in taskOptions" :class="{

            // hvis id´et på en kategori matcher id´et på valgte valgte kategori for den classen selected og skifter farve
            selected: option.id === handleCaseReducer.selectedTaskOption.value
            // kalder funktionen switchCategory med argumentet som er categoriens id
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