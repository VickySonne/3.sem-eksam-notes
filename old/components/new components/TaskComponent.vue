<script setup>
    const props = defineProps(['data']);
</script>

<template>
    <div>
        <p>{{ data.name }}</p>
    </div>
</template>

<style lang="scss" scoped>
    p{
        background-color: var(--task-light);
        padding: var(--half-padding);
        margin: 0.25rem;
        width: fit-content;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
    }
</style>