<script async setup>
// import TodoCatagoriDropdownComp from '../components/TodoCatagoriDropdownComp.vue';
import ProductOverview from '../components/ProductOverview.vue';

import CustomSelect from "@/components/shared/forms/CustomSelect.vue";
import CustomSelectItem from "@/components/shared/forms/CustomSelectItem.vue";
import BackButton from "@/components/shared/BackButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from 'vue';
import database from "@/database";
import router from "@/router";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import comingSoonDialogue from "@/utilities/comingSoonDialogue";
import formatPrice from "../utilities/formatPrice";

// New components import
import FoundNoCustomer from '../components/new components/FoundNoCustomer.vue';

const props = defineProps({
    id: {
        type: String,
        default: null
    }
})

const {data: statusOptions} = await database
    .from('statuses')
    .select('id, name')

const {data: employeeOptions} = await database.from('employees').select('id, name')

const {data: customerOptions} = await database.from('customers').select('id, name')
//
// const {data: tagsOptions} = await database.from('tags').select('id, name')
//
const {data: taskOptions} = await database.from('task_categories').select('id, name, tasks(*)').eq('tasks.one_off', false)

//
const {data: productOptions} = await database.from('products').select('id, name, sell_price')

const customerSearchRef = ref("")
const payeeSearchRef = ref("")

const selectedCustomer = ref(null)
const description = ref("")
const responsibleEmployee = ref(employeeOptions[0])
const pickupDate = ref(new Date())
const status = ref(statusOptions[0])
const price = ref(null)
const deposit = ref(0)

const currentTaskCategory = ref(taskOptions[0].id)

// const tags = ref([])
const showPayeeOptions = ref(false)
const selectedPayee = ref(null)

const selectedProducts = ref([])
const selectedTasks = ref([])

if (props.id) {
    console.log("Edit case with id: " + props.id)

    // using var here to expand the scope of caseInfo and productsWithCount
    var {data: caseInfo} = await database.from('cases')
        .select('*, customer(*), payee(*), responsible_employee(*), status(*), tags(*), tasks(*), products(*), cases_products(*)')
        .eq('id', props.id)
        .single()

    var productsWithCount = caseInfo.products.map(product => {
        const casesProduct = caseInfo.cases_products.find(casesProduct => casesProduct.product_id === product.id)

        return {
            ...product,
            count: casesProduct.count
        }
    })

    selectedCustomer.value = caseInfo.customer
    selectedPayee.value = caseInfo.payee

    if (caseInfo.payee) {
        showPayeeOptions.value = true
    }

    description.value = caseInfo.description
    price.value = caseInfo.negotiated_price
    pickupDate.value = new Date(caseInfo.pickup)

    // destructured to prevent reactivity
    selectedTasks.value = [...caseInfo.tasks]

    selectedProducts.value = productsWithCount

    responsibleEmployee.value = caseInfo.responsible_employee
    status.value = caseInfo.status
}

const parseDate = (event) => {
    const newDate = new Date(event.target.value);

    if (!isNaN(newDate.getTime())) {
        pickupDate.value = newDate;
    }
}

const dateTimeRef = ref(null)

if (props.id) {
    dateTimeRef.value = new Date(caseInfo.pickup).toISOString().slice(0, 16)
} else {
    dateTimeRef.value = new Date().toISOString().slice(0, 16)
}

const createCase = async () => {
    if (!selectedCustomer.value) {
        return alert("Du skal som minimum vælge en kunde for at oprette en sag.")
    }

    const caseData = {
        created_by: responsibleEmployee.value.id,
        customer: selectedCustomer.value.id,
        payee: selectedPayee.value?.id,
        description: description.value,
        responsible_employee: responsibleEmployee.value.id,
        pickup: pickupDate.value,
        status: status.value.id,
        negotiated_price: price.value,
        deposit: deposit.value,
    }

    if (props.id) {
        const newTasks = selectedTasks.value.filter(task => !caseInfo.tasks.some(t => t.id === task.id))
        const removedTasks = caseInfo.tasks.filter(task => !selectedTasks.value.some(t => t.id === task.id))

        if (newTasks.length > 0) {
            await database.from("cases_tasks").insert(newTasks.map(task => {
                return {
                    case_id: props.id,
                    task_id: task.id,
                }
            }))
        }

        if (removedTasks.length > 0) {
            await database.from("cases_tasks")
                .delete()
                .eq('case_id', props.id)
                .in('task_id', removedTasks.map(task => task.id))
        }

        const newProducts = selectedProducts.value.filter(product => !caseInfo.products.some(p => p.id === product.id))
        const removedProducts = caseInfo.products.filter(product => !selectedProducts.value.some(p => p.id === product.id))
        const updatedProducts = selectedProducts.value.filter(product => {
            const caseProduct = productsWithCount.find(p => p.id === product.id)

            return caseProduct.count !== product.count
        })

        console.log(updatedProducts)

        if (newProducts.length > 0) {
            await database.from("cases_products").insert(newProducts.map(product => {
                return {
                    case_id: props.id,
                    product_id: product.id,
                    count: product.count
                }
            }))
        }

        if (removedProducts.length > 0) {
            await database.from("cases_products")
                .delete()
                .eq('case_id', props.id)
                .in('product_id', removedProducts.map(product => product.id))
        }

        if (updatedProducts.length > 0) {
            for (const product of updatedProducts) {
                await database.from("cases_products")
                    .update({
                        count: product.count
                    })
                    .eq('case_id', props.id)
                    .eq('product_id', product.id)
            }
        }

        database.from('cases').update(caseData).eq('id', props.id).then(() => {
            router.push({path: '/case/' + props.id})
        })
    } else {
        database.from('cases').insert(caseData).select().single().then(async data => {
            await database.from("cases_tasks").insert(selectedTasks.value.map(task => {
                return {
                    case_id: data.data.id,
                    task_id: task.id,
                }
            }))

            await database.from("cases_products").insert(selectedProducts.value.map(product => {
                return {
                    case_id: data.data.id,
                    product_id: product.id,
                    count: product.count
                }
            }))

            await router.push({path: '/case/' + data.data.id})
        })
    }
}

const updateEmployee = (event) => {
    responsibleEmployee.value = employeeOptions.find(e => e.id === parseInt(event.target.value))
}

const updateStatus = (event) => {
    status.value = statusOptions.find(e => e.id === parseInt(event.target.value))
}

const switchCategory = (categoryId) => {
    currentTaskCategory.value = categoryId
}

const taskIsSelected = (task) => {
    return selectedTasks.value.some(t => t.id === task.id)
}

const toggleTask = (task) => {
    if (taskIsSelected(task)) {
        selectedTasks.value = selectedTasks.value.filter(t => t.id !== task.id)
    } else {
        selectedTasks.value.push(task)
    }
}


const countSelectedTasksInCategory = (category) => {
    return category.tasks.filter(task => taskIsSelected(task)).length
}

const showCustomTaskInput = ref(false)

const toggleCustomTask = () => {
    customTaskRef.value = ""
    showCustomTaskInput.value = !showCustomTaskInput.value
}

const customTaskRef = ref("")

const createCustomTask = () => {
    database.from("tasks").insert({
        name: customTaskRef.value,
        one_off: true,
    }).select().single().then(data => {
        selectedTasks.value.push(data.data)
        toggleCustomTask()
    })
}

const addProduct = (product) => {
    if (selectedProducts.value.some(p => p.id === product.id)) {
        selectedProducts.value = selectedProducts.value.map(p => {
            if (p.id === product.id) {
                return {...p, count: p.count + 1}
            }

            return p
        })
    } else {
        selectedProducts.value.push({...product, count: 1})
    }
}

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

const deleteCase = () => {
    if (confirm("Er du sikker på du vil slette denne sag?")) {
        database.from("cases").delete().eq('id', props.id).then(() => {
            router.push({path: '/'})
        })
    }
}
</script>

<template>
    <div class="header">
        <BackButton v-if="!id">Tilbage til sagsstyring</BackButton>
        <BackButton v-else :destination="'/case/' + id">Tilbage til sag</BackButton>
    </div>

    <div class="main-layout">
        <div class="main-left-content">
            <div class="main-content">
                <section class="customer">
                    <div class="customer-header">
                        <h3>Kunde <small>(påkrævet)</small></h3>

                        <p v-if="selectedCustomer && !showPayeeOptions" @click="showPayeeOptions = true">Anden
                            betaler</p>
                    </div>

                    <div v-if="!selectedCustomer" class="search-bar">
                        <div class="search-field">
                            <font-awesome-icon icon="magnifying-glass"/>
                            <input type="text" placeholder="Find kunde..." v-model="customerSearchRef">
                            <font-awesome-icon icon="times" :class="{invisible: !customerSearchRef.length}"
                                               class="close-button" @click="customerSearchRef = ''"/>
                        </div>

                        <p @click="comingSoonDialogue">Opret Ny Kunde</p>
                    </div>

                    <div v-if="!selectedCustomer && customerSearchRef.length" class="customer-list">
                      
                      <FoundNoCustomer/>
                        <!-- <div @click="comingSoonDialogue"
                             v-if="!customerOptions.filter(c => recursiveObjectSearch(c, customerSearchRef)).length">
                            <p>Ingen kunder fundet. <span>Klik for at oprette en ny kunde.</span></p> 
                        </div>-->

                        <div v-for="customer in customerOptions.filter(c => recursiveObjectSearch(c, customerSearchRef))"
                             @click="() => {
                                 selectedCustomer = customer
                             }"
                             :key="customer.id">
                            <div class="customer-info">
                                <p>{{ customer.name }}</p>
                                <p>{{ customer.phone }}</p>
                            </div>

                            <div>
                                <p>{{ customer.address }}</p>

                                <p>
                                    <span>{{ customer.zipcode }}</span>
                                    <span>{{ customer.city }}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedCustomer" class="selected-customer" @click="() => {
                        selectedCustomer = null

                        if (!selectedPayee) {
                            showPayeeOptions = false
                        }
                    }">
                        <div>
                            <div class="customer-info">
                                <p>{{ selectedCustomer.name }}</p>
                                <p>{{ selectedCustomer.phone }}</p>
                            </div>

                            <div>
                                <p>{{ selectedCustomer.address }}</p>

                                <p>
                                    <span>{{ selectedCustomer.zipcode }}</span>
                                    <span>{{ selectedCustomer.city }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section v-if="showPayeeOptions" class="payee">
                    <div class="customer-header">
                        <h3>Anden betaler</h3>
                    </div>

                    <div v-if="!selectedPayee" class="search-bar-container">
                        <div class="search-bar">
                            <div class="search-field">
                                <font-awesome-icon icon="magnifying-glass"/>
                                <input type="text" placeholder="Find kunde..." v-model="payeeSearchRef">
                                <font-awesome-icon icon="times" :class="{invisible: !payeeSearchRef.length}"
                                                   class="close-button" @click="payeeSearchRef = ''"/>
                            </div>

                            <p @click="comingSoonDialogue">Opret Ny Kunde</p>
                        </div>

                        <p v-if="selectedCustomer && !selectedPayee" @click="showPayeeOptions = false">Luk</p>
                    </div>

                    <div v-if="!selectedPayee && payeeSearchRef.length" class="customer-list">
                        <div @click="comingSoonDialogue"
                             v-if="!customerOptions.filter(c => recursiveObjectSearch(c, payeeSearchRef)).length">
                            <p>Ingen kunder fundet. <span>Klik for at oprette en ny kunde.</span></p>
                        </div>

                        <div v-for="customer in customerOptions.filter(c => recursiveObjectSearch(c, payeeSearchRef))"
                             @click="selectedPayee = customer"
                             :key="customer.id">
                            <div class="customer-info">
                                <p>{{ customer.name }}</p>
                                <p>{{ customer.phone }}</p>
                            </div>

                            <div>
                                <p>{{ customer.address }}</p>

                                <p>
                                    <span>{{ customer.zipcode }}</span>
                                    <span>{{ customer.city }}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedPayee" class="selected-customer" @click="selectedPayee = null">
                        <div>
                            <div class="customer-info">
                                <p>{{ selectedPayee.name }}</p>
                                <p>{{ selectedPayee.phone }}</p>
                            </div>

                            <div>
                                <p>{{ selectedPayee.address }}</p>

                                <p>
                                    <span>{{ selectedPayee.zipcode }}</span>
                                    <span>{{ selectedPayee.city }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="todos">
                    <div class="title-bar">
                        <h3>Opgaver</h3>

                        <div>
                            <p v-if="!showCustomTaskInput" @click="toggleCustomTask">Tilpasset opgave</p>

                            <div v-else class="custom-task-input">
                                <input v-model="customTaskRef" type="text" placeholder="Indtast opgave">
                                <button @click="createCustomTask">Opret</button>

                                <p @click="toggleCustomTask">Luk</p>
                            </div>
                        </div>
                    </div>

                    <div class="section-bg">
                        <div class="todo-categories-list">
                            <div class="categories">
                                <div v-for="category in taskOptions" @click="switchCategory(category.id)"
                                     :key="category.id" class="category"
                                     :class="{selected: currentTaskCategory === category.id}">
                                    <p>{{ category.name }}</p>
                                    <small>{{ countSelectedTasksInCategory(category) }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="task-selection-grid">
                            <div v-for="task in taskOptions.find(t => t.id === currentTaskCategory).tasks"
                                 :key="task.id" class="task" :class="{ selected: taskIsSelected(task) }"
                                 @click="toggleTask(task)">
                                <div class="checkbox">
                                    <font-awesome-icon icon="check" :class="{invisible: !taskIsSelected(task)}"/>
                                </div>

                                <p>{{ task.name }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <ProductOverview :add-product="addProduct" :remove-product="removeProduct"
                                     :selected-products="selectedProducts" :products="productOptions"
                                     :increment-product="incrementProduct" :decrement-product="decrementProduct"/>
                </section>

                <section class="details">
                    <h3>Detaljer</h3>

                    <div class="grid-wrapper section-bg">
                        <div class="form-input">
                            <label for="">Ansvarlig</label>

                            <CustomSelect :callback="updateEmployee">
                                <CustomSelectItem v-for="employee in employeeOptions" :value="employee.id"
                                                  :key="employee.id" :selected="responsibleEmployee.id === employee.id">
                                    {{ employee.name }}
                                </CustomSelectItem>
                            </CustomSelect>
                        </div>

                        <div class="form-input">
                            <label for="">Status</label>

                            <CustomSelect :callback="updateStatus">
                                <CustomSelectItem v-for="option in statusOptions" :value="option.id"
                                                  :key="option.id" :selected="status.id === option.id">
                                    {{ option.name }}
                                </CustomSelectItem>
                            </CustomSelect>
                        </div>

                        <div class="form-input">
                            <label for="">Tags</label>

                            <div class="form-input-placeholder">
                                <p>Kommer Snart</p>
                            </div>
                        </div>

                        <div class="flex-wrapper">
                            <div class="form-input">
                                <label for="">Afhentning</label>
                                <input @change="parseDate" v-model="dateTimeRef" class="input-field"
                                       type="datetime-local">
                            </div>

                            <div class="form-input">
                                <label for="">Aftalt Pris (internt)</label>

                                <div class="price-input">
                                    <input v-model="price" class="input-field" type="number"
                                           placeholder="Indtast pris">
                                    <p>kr.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-input description">
                            <label for="">Beskrivelse</label>
                            <textarea v-model="description" class="input-field" name="" id="" cols="30"
                                      rows="10" placeholder="Indtast evt. beskrivelse af sagen..."></textarea>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <aside>
            <div class="section-bg">
                <h3>Opsummering</h3>

                <div class="summary">
                    <p v-if="selectedCustomer">
                        <span>Kunde: </span>
                        {{ selectedCustomer.name }}
                    </p>

                    <p v-if="selectedPayee">
                        <span>Betales af: </span>
                        {{ selectedPayee.name }}
                    </p>

                    <p v-if="responsibleEmployee">
                        <span>Ansvarlig: </span>
                        {{ responsibleEmployee.name }}
                    </p>

                    <p v-if="status">
                        <span>Status: </span>
                        {{ status.name }}
                    </p>

                    <p v-if="pickupDate">
                        <span>Afhentning: </span>
                        {{ pickupDate.toLocaleString() }}
                    </p>

                    <p v-if="price">
                        <span>Pris: </span>
                        {{ formatPrice(price) }}
                    </p>

                    <p v-if="description">
                        <span class="block">Beskrivelse: </span>
                        {{ description }}
                    </p>

                    <div v-if="selectedTasks.length">
                        <p><span>Opgaver:</span></p>

                        <ul class="selected-tasks">
                            <li v-for="task in selectedTasks" :key="task.id">
                                &nbsp;&nbsp;- {{ task.name }}
                                <span v-if="task.one_off"
                                      @click="selectedTasks = selectedTasks.filter(t => t.id !== task.id)">FJERN</span>
                            </li>
                        </ul>
                    </div>

                    <div v-if="selectedProducts.length">
                        <p><span>Produkter:</span></p>

                        <ul class="selected-tasks">
                            <li v-for="product in selectedProducts" :key="product.id">
                                &nbsp;&nbsp;- {{ product.name }}
                                <span v-if="product.count > 1"
                                      @click="selectedProducts = selectedProducts.filter(p => p.id !== product.id)">{{
                                    product.count
                                    }} stk.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="case-status-buttons">
                <p v-if="id" @click="deleteCase">Slet sag</p>
<!--                needed for flex-->
                <p v-else></p>

                <div class="create-task" @click="createCase()">
                    <font-awesome-icon icon="plus" v-if="!id"/>
                    <p>{{ id ? 'Gem' : 'Opret' }} Sag</p>
                </div>
            </div>
        </aside>
    </div>
</template>

<style lang="scss" scoped>
.form-input-placeholder {
  align-items: center;
  display: flex;
  height: 100%;
  padding-left: 1rem;
}

.case-status-buttons {
    align-items: center;
  display: flex;
  justify-content: space-between;

  & > p {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.selected-tasks {
  li {
    margin-block: 1rem;
  }

  span {
    cursor: pointer;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    opacity: 0.65;

    &:hover {
      opacity: 1;
    }
  }
}

.customer-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  p {
    cursor: pointer;
    margin-bottom: 1rem;
    margin-right: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

.invisible {
  visibility: hidden;
}

.title-bar {
  display: flex;
  justify-content: space-between;

  p {
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.task-selection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  .task {
    align-items: center;
    background-color: #fff;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    gap: 1rem;
    padding: var(--default-padding);

    &.selected {
      background-color: var(--muted);
      color: var(--text-secondary);
    }

    .checkbox {
      align-items: center;
      border: 2px solid #ccc;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      padding: 0.25rem;

      svg {
        height: 1rem;
        width: 1rem;
      }
    }
  }
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  span {
    font-weight: 600;

    &.block {
      display: block;
      margin-bottom: 1rem;
    }
  }
}

.header {
  padding-bottom: 1rem;
}

.main-layout {
  display: flex;
  gap: 1rem;

  .main-left-content {
    width: 70%;
  }

  aside {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: fit-content;
    position: sticky;
    right: 0;
    top: 0;
    width: 30%;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    margin-bottom: 1rem;
  }
}

h3 {
  font-weight: 700;
  font-size: 1.125rem;

  small {
    font-weight: 400;
    font-size: 0.75rem;
    opacity: 0.65;
  }
}

.search-bar-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;

  & > p {
    cursor: pointer;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
}

.search-bar {
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  & > p {
    cursor: pointer;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }

  svg:last-child {
    cursor: pointer;
  }
}

.customer-list {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: var(--default-padding);

  & > div {
    background-color: #fff;
    border-radius: var(--border-radius);
    padding: var(--default-padding);
    width: 100%;

    &:hover {
      background-color: var(--muted);
      color: var(--text-secondary);
      cursor: pointer;
    }
  }
}

.selected-customer {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  display: flex;
  padding: var(--default-padding);

  & > div {
    background-color: #fff;
    border-radius: var(--border-radius);
    padding: var(--default-padding);
    width: 100%;

    &:hover {
      background-color: var(--muted);
      color: var(--text-secondary);
      cursor: pointer;
    }
  }
}


.customer-group {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  padding: 0.55rem;
}

.customer-info {
  flex-grow: 1;
}


.custom-task-input {
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    background-color: rgb(245 245 245);
    border-radius: var(--border-radius);
    padding: var(--default-padding);
  }

  button {
    background-color: var(--bg-primary);
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--default-padding);
  }
}

.search-field {
  align-items: center;
  background-color: rgb(245 245 245);
  border-radius: var(--border-radius);
  display: flex;
  gap: 1rem;
  padding-inline: var(--default-padding);

  input {
    padding-block: var(--default-padding);
  }

}

.section-bg {
  padding: 1rem;
  background-color: rgb(209 213 219);
  border-radius: 0.125rem;
}

.todo-categories-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .categories {
    align-items: center;
    display: flex;
    gap: 1rem;

    .category {
      align-items: center;
      background-color: #fff;
      border-radius: var(--border-radius);
      cursor: pointer;
      display: flex;
      gap: 2rem;
      padding: var(--default-padding);

      &.selected {
        background-color: var(--muted);
        color: var(--text-secondary);
      }
    }
  }
}

.create-custom-todo {
  display: flex;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.125rem;
  cursor: pointer;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  .form-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: 600;
    }

    .input-field {
      background-color: #fff;
      border-radius: var(--border-radius);
      padding: var(--default-padding);
    }
  }

  .description {
    grid-column: span 2;
  }
}

.flex-wrapper {
  display: flex;
  gap: 1rem;

  & > div {
    width: 100%;
  }
}


.price-input {
  position: relative;

  input {
    width: 100%;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  p {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.create-task {
  align-items: center;
  display: flex;
  gap: 1rem;
  border-radius: 0.125rem;
  background-color: rgb(30 41 59);
  color: rgb(249 250 251);
  padding: 1rem;
  cursor: pointer;
  width: fit-content;
  align-self: end;

  &:hover {
    background-color: rgb(71 85 105);
  }
}
</style>