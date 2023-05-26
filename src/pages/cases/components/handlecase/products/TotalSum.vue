<script setup>
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const selectedProducts = handleCaseReducer.selectedProducts
</script>

<template>
    <div v-if="selectedProducts.length" class="total-container">
        <p>{{ selectedProducts.reduce((a, p) => a + (p.sell_price * p.count), 0) }} kr.</p>
    </div>
</template>

<style lang="scss" scoped>
    div {
        padding: var(--default-padding);
        text-align: right;
    }
</style>