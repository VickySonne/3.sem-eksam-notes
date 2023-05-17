<script setup>

</script>

<!-- Kan ikke få iconet til at kunne sendes ind som et prop -->
<template> 
    <div >
        <font-awesome-icon icon="plus" />
        <slot></slot>
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