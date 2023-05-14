<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header>
    <h2>{{ title }}</h2>

    <slot></slot>
  </header>
</template>

<style lang="scss" scoped>
header {
  margin-bottom: var(--default-padding);

  h2 {
    font-size: 1.5rem;
    font-weight: var(--text-heavy);
  }
}
</style>