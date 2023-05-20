<script setup>
    defineProps({
        label: {
            type: String,
            required: true
        }
    })
</script>

<!-- Hvordan gør vi så at det kun bliver vist hvis der er noget data? hvor skal v-if være? -->
<template>
    <p>
    <span>{{ label }}</span> 
    <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
    p{
        padding-block: var(--half-padding);

        span{
            font-weight: 600;
        }
    }
</style>