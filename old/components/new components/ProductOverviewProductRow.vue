<script setup>

const props = defineProps(['data']);
</script>

<template>
    <tr>
        <td>{{ product.name }}</td>

        <td class="product-count">
            <span>{{ product.count }}</span>

            <div v-if="products.length" @click="decrementProduct(product)">
                <font-awesome-icon icon="caret-down"/>
            </div>

            <div v-if="products.length" @click="incrementProduct(product)">
                <font-awesome-icon icon="caret-up"/>
            </div>

            <div v-if="products.length" @click="removeProduct(product)">
                <font-awesome-icon icon="times"/>
            </div>
        </td>

        <td>{{ product.sell_price }}</td>
        <td>{{ product.sell_price * product.count }}</td>
</tr>
</template>