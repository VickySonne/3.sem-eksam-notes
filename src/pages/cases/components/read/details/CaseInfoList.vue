<script setup>
    defineProps({
    content: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: false,
    }
})
</script>

<template>
    <li>- {{ content }} <span>{{ count }}</span></li>
</template>

<style lang="scss" scoped>
    li{
        padding: var(--half-padding);
    }
</style>