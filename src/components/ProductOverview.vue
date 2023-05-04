<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import {ref, toRefs} from "vue";
import comingSoonDialogue from "@/utilities/comingSoonDialogue";

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

            <button class="add-product" @click="comingSoonDialogue">Tilføj ny vare</button>
            <p @click="comingSoonDialogue">Tilføj kundeenhed</p>
        </div>

        <div v-if="searchRef.length" class="product-container">
            <div v-for="product in products.filter(p => recursiveObjectSearch(p, searchRef))"
                 @click="addProduct(product)"
                 :key="product.id">
                <p>{{ product.name }}</p>
                <p>{{ product.sell_price }}</p>
            </div>

            <div @click="comingSoonDialogue" v-if="!products.filter(p => recursiveObjectSearch(p, searchRef)).length">
                <p>Ingen varer fundet. <span>Klik for at oprette en ny vare.</span></p>
            </div>
        </div>

        <div class="titels-container">
            <div v-if="!selectedProducts.length" class="nothing-selected">
                <h4>Ingen varer valgt</h4>
            </div>

            <table v-if="selectedProducts.length">
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
                    <td>{{ product.count }}</td>
                    <td>{{ product.sell_price }}</td>
                    <td>{{ product.sell_price * product.count }}</td>
                </tr>
                </tbody>
            </table>

            <div v-if="selectedProducts.length" class="total-container">
                <div></div>
                <p>{{ selectedProducts.reduce((a, p) => a + (p.sell_price * p.count), 0) }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.invisible {
    visibility: hidden;
}

.total-container {
    padding: var(--default-padding);
    text-align: right;

    & > div:first-child {
        background-color: var(--bg-primary);
        border-radius: var(--border-radius);
        height: 2px;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
}

.nothing-selected {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 5rem;
}

.product-container {
    background-color: var(--bg-secondary);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: var(--default-padding);
    margin-bottom: 1rem;

    & > div {
        background-color: #fff;
        border-radius: var(--border-radius);
        padding: var(--default-padding);
        width: 100%;

        &:hover {
            background-color: var(--bg-primary);
            color: var(--text-secondary);
            cursor: pointer;
        }
    }
}

//
//.product-container {
//    display: grid;
//    gap: 0.5rem;
//    margin-bottom: 1rem;
//
//    .product {
//        background-color: var(--bg-secondary);
//        border-radius: var(--border-radius);
//        cursor: pointer;
//        display: grid;
//        gap: 0.5rem;
//        padding: var(--default-padding);
//
//        p:first-child {
//            font-weight: 600;
//        }
//    }
//}



.titels-container {
  background-color: rgb(229 231 235);
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
  padding-inline: 1rem;

    svg:last-child {
        cursor: pointer;
    }

    input {
        padding-block: 1rem;
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