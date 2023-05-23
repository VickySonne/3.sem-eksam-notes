<script setup>
defineProps({
    value: {
        type: String,
        required: true,
    },
    callback: {
        type: Function,
        required: true,
    }
})
</script>

<template>
<!--    <input type="datetime-local" :value="value" @change="callback($event)">-->
    <input @change="callback" :value="value"
           type="datetime-local">
</template>

<style lang="scss" scoped>
    input {
        width: 100%;
        background-color: var(--bg-white);
        border-radius: var(--border-radius);
        padding: var(--default-padding);
    }
</style>