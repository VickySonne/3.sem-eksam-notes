<script setup>
import TertiaryButton from '../../../../../components/buttons/TertiaryButton.vue';

defineProps({
    text: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div>
        <p> {{ text}} </p>
    </div>
</template>

<style lang="scss" scoped>
    div{
        background-color: var(--bg-white);
        border-radius: var(--border-radius);
        padding: var(--default-padding);

        p:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
</style>