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
    <li>- {{ content }} <span v-if="count > 1">{{ count }} stk.</span></li>
</template>

<style lang="scss" scoped>
    li{
        padding: var(--half-padding);

        span {
            opacity: 0.5;
            font-size: 0.8rem;
        }
    }
</style>