<script setup>
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

defineProps({
    product: {
        type: Object,
        required: true
    }
})

const selectedProducts = handleCaseReducer.selectedProducts

const removeProduct = (product) => {
    selectedProducts.value = selectedProducts.value.filter(p => p.id !== product.id)
}

const incrementProduct = (product) => {
    selectedProducts.value = selectedProducts.value.map(p => {
        if (p.id === product.id) {
            return {...p, count: p.count + 1}
        }

        return p
    })
}

const decrementProduct = (product) => {
    selectedProducts.value = selectedProducts.value.map(p => {
        if (p.id === product.id) {
            return {...p, count: p.count - 1}
        }

        return p
    }).filter(p => p.count > 0)
}
</script>

<template>
    <div class="product-counter">
        <span>{{ product.count }}</span>

        <font-awesome-icon icon="angle-down" :class="{
            disabled: product.count === 1
        }" @click="decrementProduct(product)"/>

        <font-awesome-icon icon="angle-up" v-if="product.count" @click="incrementProduct(product)"/>

        <font-awesome-icon icon="times" v-if="product.count" @click="removeProduct(product)"/>
    </div>
</template>

<style lang="scss" scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.product-counter {
  align-items: center;
  display: flex;
  gap: var(--default-gap);

  & > svg {
    cursor: pointer;
  }

  span {
    font-family: monospace;
    font-size: 1rem;
  }
}
</style>