<script setup>
    // const props = defineProps(['data']);
</script>
<!-- Jeg tænker det er det samme som Task component, dog med den tilføjede funktion at der kan skiftes farve på baggrundsfarven -->
<template>
    <td>
<!--        {{ data.name }} -->
    </td>
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