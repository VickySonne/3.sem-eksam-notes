<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import ActionToolbar from "../shared/ActionToolbar.vue";
import SearchInput from "../../../../components/inputs/SearchInput.vue";
import TertiaryButton from "../../../../components/buttons/TertiaryButton.vue";
import SecondaryButton from "../../../../components/buttons/SecondaryButton.vue";
import ProductTable from "../handlecase/products/ProductTable.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import ProductSearchResult from "@/pages/cases/components/handlecase/products/ProductSearchResult.vue";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";

const productSearch = handleCaseReducer.productSearch
const productOptions = handleCaseReducer.productOptions
const selectedProducts = handleCaseReducer.selectedProducts

// opdatere når der søges efter produkter

const updateProductSearch = (value) => {
    productSearch.value = value
}

// tager en product parameter, der repræsentere et valgt produkt. 
// Den chekcer om produktet allerede er et valgt product, hvis det er det lægger den en til antallet af det produkt. 
// hvis det ikke er, tilføjer den produkted med et default antal på 1
const addProduct = (product) => {
    if (selectedProducts.value.some(p => p.id === product.id)) {
        selectedProducts.value = selectedProducts.value.map(p => {
            if (p.id === product.id) {
                return {...p, count: p.count + 1}
            }

            return p
        })
    } else {
        // "..."= spread operator, gør at alle properties fra et object bliver kopieret ind i et nyt object
        selectedProducts.value.push({...product, count: 1})
    }
}
</script>

<template>
    <div class="wrapper">
        <div>
            <SectionHeader title="Produkter"/>

            <ActionToolbar>
                <template #contentleft>
                    <SearchInput placeholder="Find varer..." :search-callback="updateProductSearch"
                                 :value="productSearch"/>

                    <SecondaryButton title="Opret ny vare">
                        <font-awesome-icon icon="plus"/>
                    </SecondaryButton>

                    <TertiaryButton text="Tilføj kundeenhed" :emphasised="true"/>
                </template>
            </ActionToolbar>
        </div>

        <SectionContainer v-if="productSearch.length">
            <div class="products-list">
                <ProductSearchResult
                        v-for="product in productOptions.filter(p => recursiveObjectSearch(p, productSearch))"
                        :callback="() => addProduct(product)" :product="product" :key="product.id"/>
            </div>
        </SectionContainer>

        <SectionContainer>
            <ProductTable/>
        </SectionContainer>
    </div>
</template>

<Style lang="scss" scoped>
.products-list {
  display: grid;
  gap: var(--default-gap);
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--default-gap);
}
</Style>