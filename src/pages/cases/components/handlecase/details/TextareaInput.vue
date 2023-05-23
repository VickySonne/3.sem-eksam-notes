<script setup>
defineProps({
    value: {
        type: String,
        required: true
    },
    callback: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <textarea :value="value" name="" id="" cols="30"
            rows="10" placeholder="Indtast beskrivelse af her..." @input="callback($event)"></textarea>
</template>

<style lang="scss" scoped>
    textarea {
        background-color: var(--bg-white);
        border-radius: var(--border-radius);
        padding: var(--default-padding);
        width: 100%;
    }
</style>