<script setup>
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import supabase from "@/database";
import {ref} from "vue";

// Consider if it would make sense to move the logic below to the reducer.

const showInput = ref(false)

const toggleCustomTask = () => {
    customTaskRef.value = ""
    showInput.value = !showInput.value
}

const customTaskRef = ref("")

const createCustomTask = () => {
    supabase.from("tasks").insert({
        name: customTaskRef.value,
        one_off: true,
    }).select().single().then(data => {
        handleCaseReducer.selectedTasks.value.push(data.data)
        toggleCustomTask()
    })
}
</script>

<template>
    <div>
        <p v-if="!showInput" @click="toggleCustomTask">Tilpasset opgave</p>

        <div v-else class="custom-task-input">
            <input v-model="customTaskRef" type="text" placeholder="Indtast opgave">
            <PrimaryButton title="Opret" :callback="createCustomTask" />

            <p @click="toggleCustomTask">Luk</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div {
    & > p {
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    & > div {
        align-items: center;
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        & > input {
            background-color: var(--bg-light);
            border-radius: var(--border-radius);
            padding: var(--default-padding);
        }
    }
}
</style>