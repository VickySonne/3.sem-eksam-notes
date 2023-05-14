<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseTask from "@/pages/cases/components/shared/CaseTask.vue";
import router from "@/router";
import supabase from "@/database";

const { data } = await supabase.from("cases")
    .select("id, tasks(id, name), cases_tasks(task_id, completed)")
    .eq("id", router.currentRoute.value.params.id)
    .single();

const tasks = data.tasks.map(task => {
    const caseTask = data.cases_tasks.find(caseTask => caseTask.task_id === task.id);

    return {
        ...task,
        completed: caseTask.completed
    }
});
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