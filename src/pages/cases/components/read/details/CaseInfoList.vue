<script setup>
    defineProps({
    content: {
        type: String,
        required: true
    },
    stk: {
        type: String,
        required: false,
    }
})
</script>

<template>
    <li>- {{ content }}test <span> {{ stk }} (not required)</span></li>
</template>

<style lang="scss" scoped>
    li{
        padding: var(--half-padding);
    }
</style>