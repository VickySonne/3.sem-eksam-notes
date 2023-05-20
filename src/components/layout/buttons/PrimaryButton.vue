<script setup>
    defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div>
        <!-- expects an icon -->
        <slot></slot>

        <p>{{ title }}</p>
    </div>
</template>

<style lang="scss" scoped>
div {
  align-items: center;
  display: flex;
  gap: var(--default-gap);
  border-radius: var(--border-radius);
  background-color: var(--CTA-primary);
  color: var(--text-secondary);
  padding: var(--default-padding);
  cursor: pointer;
}

div:hover {
  background-color: var(--CTA-primary-hover);
}

</style>