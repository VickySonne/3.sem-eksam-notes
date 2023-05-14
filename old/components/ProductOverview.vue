<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import {ref, toRefs} from "vue";

// New components import
import NoProductFound from "./new components/NoProductFound.vue";
import AddProduct from "./new components/AddProduct.vue"
import TableHeader from '../components/new components/TableHeader.vue';
import TableBody from '../components/new components/TableBody.vue';
import ProductOverviewProductRow from "./new components/ProductOverviewProductRow.vue";

const props = defineProps({
    products: {
        type: Array,
        required: false,
        default: () => []
    },
    selectedProducts: {
        type: Array,
        required: false,
    },
    addProduct: {
        type: Function,
        required: false,
        default: () => {},
    },
    removeProduct: {
        type: Function,
        required: false,
        default: () => {},
    },
    incrementProduct: {
        type: Function,
        required: false,
        default: () => {},
    },
    decrementProduct: {
        type: Function,
        required: false,
        default: () => {},
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

        <div v-if="products.length" class="search-product">
            <div class="search-bar">
                <font-awesome-icon icon="magnifying-glass"/>
                <input type="text" placeholder="Søg på varer..." v-model="searchRef">
                <font-awesome-icon icon="times" :class="{invisible: !searchRef.length}" class="close-button" @click="searchRef = ''"/>
            </div>

            <AddProduct/>
            <!-- <button class="add-product" @click="comingSoonDialogue">Tilføj ny vare</button>
            <p @click="comingSoonDialogue">Tilføj kundeenhed</p> -->
        </div>

        <div v-if="searchRef.length" class="product-container">
            <div v-for="product in products.filter(p => recursiveObjectSearch(p, searchRef))"
                 @click="addProduct(product)"
                 :key="product.id">
                <p>{{ product.name }}</p>
                <p>{{ product.sell_price }}</p>
            </div>

            <NoProductFound/>
            <!-- <div @click="comingSoonDialogue" v-if="!products.filter(p => recursiveObjectSearch(p, searchRef)).length">
                <p>Ingen varer fundet. <span>Klik for at oprette en ny vare.</span></p>
            </div> -->
        </div>

        <div class="titels-container">
            <div v-if="!selectedProducts.length" class="nothing-selected">
                <h4>Ingen varer valgt</h4>
            </div>

            <table v-if="selectedProducts.length">
                <TableHeader :columns="[
                      { title: 'Navn',
                        id: 1
                      },
                      { title: 'Antal',
                        id: 2
                      },
                      { title: 'Stk. Pris',
                        id: 3
                      },
                      { title: 'Total',
                        id: 4
                      }
                      ]"/>
                <!-- <thead>
                <tr>
                    <th>Navn</th>
                    <th>Antal</th>
                    <th>Stk. pris</th>
                    <th>Total</th>
                </tr>
                </thead> -->
               

                <TableBody>
                    <ProductOverviewProductRow v-for="product in selectedProducts" :data="product" :key="product.id"/>
                </TableBody>

                <!-- <tbody>
                <tr v-for="product in selectedProducts" :key="product.id">
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
                </tbody> -->
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

.product-count {
    align-items: center;
    display: flex;
    gap: 1rem;

    & > div {
        cursor: pointer;
    }

    span {
        font-family: monospace;
        font-size: 1rem;
    }
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
            background-color: var(--bg-dark);
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

// .add-product {
//   cursor: pointer;
//   background-color: var(--muted);
//   color: white;
//   padding: 1rem;

//     &:hover {
//         background-color: rgb(71 85 105);
//     }
// }

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