<script setup>
import ProductRow from './ProductRow.vue';
import CasesTableHeader from '../../index/CasesTableHeader.vue';
import ProductDataColumns from "@/data/cases/products/productDataColumns";
import TotalSum from './TotalSum.vue';


</script>

<template>
    <table>
      <CasesTableHeader :columns="ProductDataColumns" />
  
        <tbody>
            <!-- <ProductRow></ProductRow> -->
        </tbody>

    </table>
    
    <hr>

        <!-- <TotalSum></TotalSum> -->
</template>

<style lang="scss" scoped>
    table {
        width: 100%;
    }

    hr {
        background-color: #1E293B;
        border-radius: var(--border-radius);
        height: .25rem;
        margin-block: var(--default-gap);
    }
</style>