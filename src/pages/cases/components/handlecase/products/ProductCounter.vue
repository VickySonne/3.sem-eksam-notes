<script setup>

</script>

<template>
    <div class="product-counter">
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
    </div>
</template>

<style lang="scss">
    .product-count {
        align-items: center;
        display: flex;
        gap: var(--default-gap);

        & > div {
            cursor: pointer;
        }

        span {
            font-family: monospace;
            font-size: 1rem;
        }
    }
</style>