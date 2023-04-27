<script setup>
defineProps({
    multiple: {
        type: Boolean,
        required: false,
        default: false
    },
    callback: {
        type: Function,
        required: false,
        default: (event) => {
            console.log(event.target.value)
        }
    }
})
</script>

<template>
    <select @change="callback($event)" :multiple="multiple">
        <slot></slot>
    </select>
</template>