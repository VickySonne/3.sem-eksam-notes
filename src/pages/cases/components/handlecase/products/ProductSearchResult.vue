<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    },
    callback: {
        type: Function,
        required: true
    },
})
</script>

<template>
    <div @click="callback">
        <ul>
            <li>{{ product.name }}</li>
            <li>{{ product.sell_price }} kr.</li>
        </ul>

        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.destructive:hover {
  background-color: var(--bg-danger);
}

div {
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-white);
  padding: var(--default-padding);
  border-radius: var(--border-radius);

  &:hover {
    cursor: pointer;
    background-color: var(--bg-dark);
    color: var(--text-secondary);
  }
}
</style>