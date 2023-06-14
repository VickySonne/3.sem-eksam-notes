<script setup>
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

// referer til et array af selected tasks i reduceren
const selectedTasks = handleCaseReducer.selectedTasks

// laver et array med tasks ved at sammenligne id´et på tasks fra taskOptions og SelectedTasks
const fetchTasks = () => {
    return handleCaseReducer.taskOptions.value.find(option => option.id === handleCaseReducer.selectedTaskOption.value).tasks
}

// checker om en task er selected ved at checke om en given tasks id matcher et id i arrayet af selectedTasks
const taskIsSelected = (task) => {
    return selectedTasks.value.some(t => t.id === task.id)
}

// baseret på om en given task er eller ikke er en del af selectedTask, fjerner eller tilføjes de til arrayet med .push
// Der checkes om de er en del af det, så bliver de beholdt i et nyt array, hvis de ikke er bliver de tilføjet til dette array
const toggleTask = (task) => {
    if (taskIsSelected(task)) {
        selectedTasks.value = selectedTasks.value.filter(t => t.id !== task.id)
    } else {
        selectedTasks.value.push(task)
    }
}
</script>

<template>

    <!-- for hver mulig task der er bliver der rendered et CaseTask comp, alt efter om det er selected eller ej for det classen selected -->
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
