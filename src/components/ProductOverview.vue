<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import {ref, toRefs} from "vue";

const props = defineProps({
    products: {
        type: Array,
        required: true
    },
    selectedProducts: {
        type: Array,
        required: true
    },
    addProduct: {
        type: Function,
        required: true
    },
    removeProduct: {
        type: Function,
        required: true
    }
})

const {
    products,
    selectedProducts
} = toRefs(props)

const searchRef = ref("")
</script>

<template>
    <div>
        <h3>Varer</h3>

        <div class="search-product">
            <div class="search-bar">
                <font-awesome-icon icon="magnifying-glass"/>
                <input type="search" placeholder="Søg på varer..." v-model="searchRef">
                <font-awesome-icon icon="times" :class="{invisible: !searchRef.length}" class="close-button" @click="searchRef = ''"/>
            </div>

            <button class="add-product">Tilføj vare</button>
            <p>Tilføj kundeenhed</p>
        </div>

        <div v-if="searchRef.length">
            <div v-for="product in products.filter(p => recursiveObjectSearch(p, searchRef))"
                 @click="addProduct(product)"
                 :key="product.id">
                <p>{{ product.name }}</p>
                <p>{{ product.sell_price }}</p>
            </div>
        </div>

        <div class="titels-container">
            <table>
                <thead>
                <tr>
                    <th>Navn</th>
                    <th>Antal</th>
                    <th>Stk. pris</th>
                    <th>Total</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="product in selectedProducts" :key="product.id" @click="removeProduct(product)">
                    <td>{{ product.name }}</td>
                    <td>1</td>
                    <td> {{ product.sell_price }} </td>
                    <td>100</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.invisible {
    visibility: hidden;
}



.titels-container {
  background-color: rgb(229 231 235);
    padding-bottom: 1rem;
}

.search-product {
  display: flex;
  gap: 1rem;
    margin-bottom: 1rem;

  p {
    display: flex;
    align-items: center;
    cursor: pointer;

      &:hover {
          text-decoration: underline;
      }
  }
}

.search-bar {
  align-items: center;
  background-color: var(--bg-secondary);
  display: flex;
  gap: 1rem;
  padding: 1rem;

    svg:last-child {
        cursor: pointer;
    }
}

.add-product {
  cursor: pointer;
  background-color: #1E293B;
  color: white;
  padding: 1rem;

    &:hover {
        background-color: rgb(71 85 105);
    }
}

table {
  width: 100%;

  th {
      font-weight: bold;
    padding: 1rem;
  }

  td {
    padding: 0.5rem 1rem;
  }

    td:last-child,
    th:last-child {
        text-align: right;
    }
}

h3 {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
}
</style>