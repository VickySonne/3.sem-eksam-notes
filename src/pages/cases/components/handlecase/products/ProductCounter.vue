<script setup>
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

defineProps({
    product: {
        type: Object,
        required: true
    }
})

const selectedProducts = handleCaseReducer.selectedProducts

// laver en ny array af produkter ved at filtrere igennen det forrige array, hvor det fjerner det produkt der matcher id´et på det produkt der er sendt med som argument,
// det beholder de andre producter da de ikke matcher produktets id og derfor returner true
const removeProduct = (product) => {
    selectedProducts.value = selectedProducts.value.filter(p => p.id !== product.id)
}

// checker om produktets id er det samme et et eksisterende i arrayet, hvis det er lægger den 1 til antallet ved at returnere et nyt objekt med samme product men ny count (antal)
// Hvis ikke id´et matcher returnere den produktet uden nogle ændringer
// .map betyder den går igennem alle producter i arrayet
const incrementProduct = (product) => {
    selectedProducts.value = selectedProducts.value.map(p => {
        if (p.id === product.id) {
            return {...p, count: p.count + 1}
        }

        return p
    })
}

// det modsatte her da den fjerner en fra count
const decrementProduct = (product) => {
    selectedProducts.value = selectedProducts.value.map(p => {
        if (p.id === product.id) {
            return {...p, count: p.count - 1}
        }

        return p

        // sikre at kun produkter der har en positiv count er inkluderet i arrayet
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