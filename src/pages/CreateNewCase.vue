<script async setup>
import TodoCatagoriDropdownComp from '../components/TodoCatagoriDropdownComp.vue';
import ProductOverview from '../components/ProductOverview.vue';

import CustomSelect from "@/components/shared/forms/CustomSelect.vue";
import CustomSelectItem from "@/components/shared/forms/CustomSelectItem.vue";
import BackButton from "@/components/shared/BackButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from 'vue';
import database from "@/database";
import router from "@/router";

const {data: statusOptions} = await database
    .from('statuses')
    .select('id, name')

const {data: employeeOptions} = await database.from('employees').select('id, name')

const {data: customerOptions} = await database.from('customers').select('id, name')
//
// const {data: tagsOptions} = await database.from('tags').select('id, name')
//
// const {data: tasksOptions} = await database.from('tasks').select('id, name')
//
// const {data: productsOptions} = await database.from('products').select('id, name')

const customer = ref(null)
const description = ref("")
const responsibleEmployee = ref(employeeOptions[0].id)
const pickupDate = ref(new Date())
const status = ref(1)
const price = ref(0)
const deposit = ref(0)

// const tags = ref([])
// const tasks = ref([])
// const products = ref([])

const parseDate = (event) => {
    const newDate = new Date(event.target.value);

    if (!isNaN(newDate.getTime())) {
        pickupDate.value = newDate;
    }
}

const getCurrentDateTimeString = () => {
    const toPaddedString = (number) => {
        return number.toString().padStart(2, '0')
    }

    const now = new Date()

    const year = now.getFullYear()

    const month = toPaddedString(now.getMonth() + 1)
    const day = toPaddedString(now.getDate())
    const hours = toPaddedString(now.getHours())
    const minutes = toPaddedString(now.getMinutes())

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

const createCase = () => {
    database.from('cases').insert({
        created_by: 1,
        customer: customer.value,
        description: description.value,
        responsible_employee: responsibleEmployee.value,
        pickup: pickupDate.value,
        status: status.value,
        negotiated_price: price.value,
        deposit: deposit.value,
    }).select().single().then(data => {
        router.push({path: '/case/' + data.data.id})
    })
}

const updateEmployee = (event) => {
    responsibleEmployee.value = event.target.value
}

// const updateCustomer = (event) => {
//     customer.value = event.target.value
// }

const updateStatus = (event) => {
    status.value = event.target.value
}

</script>
<!-- controllerede inputfelter med use-ref+v-model -->
<template>
    <div class="header">
        <BackButton>Tilbage til sagsstyring</BackButton>
    </div>

    <div class="main-layout">
        <div class="main-left-content">
            <div class="main-content">
                <section class="customer">
                    <h3>Kunde</h3>

                    <div class="search-bar">
                        <div class="search-field">
                            <font-awesome-icon icon="magnifying-glass"/>
                            <input type="search" placeholder="Find kunde...">
                        </div>

                        <p>Opret Ny Kunde</p>

                        <div class="selected-customer">
                            <div>
                                <p>Kunde Navn <span>Kundegruppe</span></p>
                                <p>Telefon nummer</p>
                            </div>

                            <div>
                                <div>
                                    <p>Vejnavn</p>

                                    <p>
                                        <span>Postnummer</span>
                                        <span>Bynavn</span>
                                    </p>
                                </div>

                                <div>
                                    <i>x</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="todos">
                    <h3>Opgaver</h3>

                    <div class="todo-categories-list section-bg">
                        <div class="categories">
                            <TodoCatagoriDropdownComp/>
                            <TodoCatagoriDropdownComp/>
                            <TodoCatagoriDropdownComp/>
                        </div>

                        <div class="create-custom-todo">
                            <i>i</i>
                            <p>Custom Opgave</p>
                        </div>
                    </div>
                </section>

                <section class="details">
                    <h3>Detaljer</h3>

                    <form class="grid-wrapper section-bg">
                        <div class="form-input">
                            <label for="">Ansvarlig</label>

                            <div class="input-field">
                                <CustomSelect :callback="updateEmployee">
                                    <CustomSelectItem v-for="employee in employeeOptions" :value="employee.id" :key="employee.id">
                                        {{employee.name}}
                                    </CustomSelectItem>
                                </CustomSelect>
                            </div>
                        </div>

                        <div class="form-input">
                            <label for="">Status</label>

                            <div class="input-field">
                                <CustomSelect :callback="updateStatus">
                                    <CustomSelectItem v-for="status in statusOptions" :value="status.id" :key="status.id">
                                        {{status.name}}
                                    </CustomSelectItem>
                                </CustomSelect>
                            </div>
                        </div>

                        <div class="form-input">
                            <label for="">Tags</label>

                            <div class="input-field">
<!--                                <CustomSelect :multiple="true">-->
<!--                                    <CustomSelectItem value="0">Vælg tags</CustomSelectItem>-->
<!--                                    <CustomSelectItem value="1">Tag 1</CustomSelectItem>-->
<!--                                    <CustomSelectItem value="2">Tag 2</CustomSelectItem>-->
<!--                                </CustomSelect>-->
                            </div>
                        </div>

                        <div class="flex-wrapper">
                            <div class="form-input">
                                <label for="">Afhentning</label>
                                <input @change="parseDate" :value="getCurrentDateTimeString()" class="input-field" type="datetime-local">
                            </div>

                            <div class="form-input">
                                <label for="">Aftalt Pris</label>

                                <div class="price-input">
                                    <input v-model="price" class="input-field" type="number" placeholder="Intern pris">
                                    <p>kr.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-input description">
                            <label for="">Beskrivelse</label>
                            <textarea v-model="description" class="input-field" name="" id="" cols="30" rows="10"></textarea>
                        </div>
                    </form>
                </section>

                <section>
                    <ProductOverview/>
                </section>
            </div>
        </div>

        <aside>
            <div class="section-bg">
                <h3>Opsummering</h3>

                <div class="summary">
                    <p v-if="customer">
                        <span>Kunde: </span>
                        {{ customerOptions.find(e => e.id === parseInt(customer)).name }}
                    </p>

                    <p v-if="responsibleEmployee">
                        <span>Ansvarlig: </span>
                        {{ employeeOptions.find(e => e.id === parseInt(responsibleEmployee)).name }}
                    </p>

                    <p v-if="status">
                        <span>Status: </span>
                        {{ statusOptions.find(e => e.id === parseInt(status)).name }}
                    </p>

                    <p v-if="pickupDate">
                        <span>Afhentning: </span>
                        {{ pickupDate.toLocaleString() }}
                    </p>

                    <p v-if="price">
                        <span>Pris: </span>
                        {{ price }}
                    </p>

                    <p v-if="description">
                        <span class="block">Beskrivelse: </span>
                        {{ description }}
                    </p>
                </div>
            </div>

            <div class="create-task" @click="createCase()">
                <font-awesome-icon icon="plus"/>
                <p>Opret Sag</p>
            </div>

        </aside>
    </div>
</template>

<style lang="scss" scoped>
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
}

.search-bar {
  align-items: center;
  display: flex;
  gap: 1rem;

  & > p {
    cursor: pointer;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
}

.selected-customer {
  display: none;
}

.search-field {
  background-color: rgb(245 245 245);
  border-radius: var(--border-radius);
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.section-bg {
  padding: 1rem;
  background-color: rgb(209 213 219);
  border-radius: 0.125rem;
}

.todo-categories-list {
  display: flex;
  justify-content: space-between;

  .categories {
    display: flex;
    gap: 1rem;
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
      display: flex;
      justify-content: space-between;
      background-color: white;
      padding: 0.5rem;
      border: 0 solid #e5e7eb;
      border-radius: 0.125rem;
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
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  p {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
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