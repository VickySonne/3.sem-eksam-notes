<script setup>
    defineProps({
        title: {
            type: String, 
            required: true
        },
    })
</script>

<template>
    <h1>{{ title }}</h1>
</template>

<style lang="scss" scoped>
h1 {
    font-weight: var(--text-heavy);
    font-size: 2rem;
    padding-block: 1rem;
}
</style>