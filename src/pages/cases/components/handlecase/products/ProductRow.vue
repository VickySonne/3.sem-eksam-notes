<script setup>
import ProductCounter from './ProductCounter.vue';

defineProps(['data']);
</script>

<template>
    <tr>
        <td>{{ product.name }}</td>

        <ProductCounter />

        <td>{{ product.sell_price }}</td>
        <td>{{ product.sell_price * product.count }}</td>
    </tr>
</template>

<style lang="scss" scoped>
th {
  padding-block: var(--default-padding);
  padding-inline: var(--half-padding);
  font-weight: var(--text-heavy);

    &:last-child {
        text-align: right;
    }
}
</style>