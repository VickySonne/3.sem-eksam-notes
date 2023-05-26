<script setup>
import ProductRow from './ProductRow.vue';
import CasesTableHeader from '../../index/CasesTableHeader.vue';
import ProductDataColumns from "@/data/cases/products/productDataColumns";
import TotalSum from './TotalSum.vue';
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const selectedProducts = handleCaseReducer.selectedProducts
</script>

<template>
    <table>
      <CasesTableHeader :columns="ProductDataColumns" />
  
        <tbody>
             <ProductRow v-for="product in selectedProducts" :product="product" :key="product.id"></ProductRow>
        </tbody>

    </table>
    
    <hr>

     <TotalSum></TotalSum>
</template>

<style lang="scss" scoped>
    table {
        width: 100%;
    }
</style>