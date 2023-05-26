<script setup>
import ProductCounter from './ProductCounter.vue';

defineProps({
    product: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <tr>
        <td>{{ product.name }}</td>

        <ProductCounter :product="product"/>

        <td>{{ product.sell_price }}</td>
        <td>{{ product.sell_price * product.count }}</td>
    </tr>
</template>

<style lang="scss" scoped>
td {
    padding-block: var(--default-padding);

    &:last-child {
        text-align: right;
    }
}
</style>