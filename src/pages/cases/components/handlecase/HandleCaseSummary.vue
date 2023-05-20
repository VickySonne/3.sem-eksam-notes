<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opsummering" />
        </template>

        <!-- stuff goes here -->
        <ul>
            <li v-for="task in handleCaseReducer.selectedTasks.value" :key="task.id">{{ task.name }}</li>
        </ul>
    </SectionContainer>
</template>
