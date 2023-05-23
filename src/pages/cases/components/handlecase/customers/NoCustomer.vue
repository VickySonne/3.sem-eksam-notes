<script setup>
defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div>
        <p> {{ text }} </p>
    </div>
</template>

<style lang="scss" scoped>
div {
  background-color: var(--bg-white);
  border-radius: var(--border-radius);
  padding: var(--default-padding);

  &:hover {
    text-decoration: underline;
    cursor: pointer;
    background-color: var(--bg-dark);
    color: var(--text-secondary);
  }
}
</style>