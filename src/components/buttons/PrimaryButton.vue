<script setup>
    defineProps({
        title: {
            type: String,
            required: true
        },
        callback: {
            type: Function,
            required: false,
            default: () => {}
        }
    })
</script>

<template>
    <button @click="callback">
        <!-- expects an icon -->
        <slot></slot>

        {{ title }}
    </button>
</template>

<style lang="scss" scoped>
button {
  align-items: center;
  display: flex;
  gap: var(--default-gap);
  border-radius: var(--border-radius);
  background-color: var(--CTA-primary);
  color: var(--text-secondary);
  padding: var(--default-padding);
  cursor: pointer;
}

button:hover {
  background-color: var(--CTA-primary-hover);
}

</style>