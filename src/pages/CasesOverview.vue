<script setup>
import TaskOverviewComp from '../components/CaseOverviewCaseRow.vue';
import database from '../database.js';
import router from "@/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import CustomSelect from "@/components/shared/forms/CustomSelect.vue";
import CustomSelectItem from "@/components/shared/forms/CustomSelectItem.vue";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";
import {ref, watch} from "vue";
import supabase from "../database.js";
import comingSoonDialogue from "@/utilities/comingSoonDialogue";

const {count} = await supabase.from("cases").select("id", {
    count: "exact",
    head: true
})

const pagination = ref({
    page: 1,
    perPage: 10,
    total: count
})

const fetchData = () => {
    return database
        .from('cases')
        .select('*, customers(*), created_by(*), responsible_employee(*), status(*), tags(*), tasks!cases_tasks(*)')
        .order('created_at', {ascending: false})
        .range(
            (pagination.value.page - 1) * pagination.value.perPage,
            (pagination.value.page - 1) * pagination.value.perPage + pagination.value.perPage - 1
        )
}

const {data} = await fetchData()
const dataRef = ref(data)

watch(pagination, async () => {
    const {data} = await fetchData()

    dataRef.value = data
}, {deep: true})

const {data: statusOptions} = await database
    .from('statuses')
    .select('id, name')

const searchRef = ref("")

const searchFilteredCases = () => {
    return dataRef.value.filter(c => {
        const searchAbleProperties = {
            responsible_employee: c.responsible_employee?.name,
            status: c.status?.name,
            customers: c.customers?.name,
            tasks: c.tasks.map(t => t.name),
            tags: c.tags.map(t => t.name),
            description: c.description,
            price: c.price,
            // created_by: c.created_by?.name,
            created_at: c.created_at,
            pickup: c.pickup
        }

        return recursiveObjectSearch(searchAbleProperties, searchRef.value)
    })
}
</script>

<template>
    <div>
        <h2>Sagsstyrring</h2>

        <section class="tool-bar">
            <div class="search-bar">
                <div class="search-field">
                    <font-awesome-icon icon="magnifying-glass"/>
                    <input type="search" placeholder="Søg..." v-model="searchRef">
                </div>


                <CustomSelect>
                    <CustomSelectItem value="0">Sorter efter status</CustomSelectItem>
                    <CustomSelectItem v-for="status in statusOptions" :key="status.id" :value="status.id">{{
                        status.name
                        }}
                    </CustomSelectItem>
                </CustomSelect>

                <p @click="comingSoonDialogue">Avanceret søgning</p>
            </div>

            <div class="create-new-task" @click="router.push({ path: '/case' })">
                <font-awesome-icon icon="plus"/>
                <p>Opret Ny Sag</p>
            </div>
        </section>

        <section>
            <table>
                <thead>
                <tr>
                    <th>Oprettet</th>
                    <th>Status</th>
                    <th>Ansvarlig</th>
                    <th>Afhentes</th>
                    <th>Kunde</th>
                    <th>Opgaver</th>
                    <th>Beskrivelse</th>
                    <th>Tags</th>
                    <th>Pris</th>
                    <th>Handlinger</th>
                </tr>
                </thead>

                <tbody>
                <TaskOverviewComp v-for="workcase in searchFilteredCases()"
                                  :data="workcase" :key="workcase.id"/>
                </tbody>
            </table>
        </section>

        <section class="pagination">
            <div @click="pagination.page > 1 ? pagination.page-- : ''">
                <p>Previous page</p>
            </div>

            <div>
                <p>{{ pagination.page }}</p>
            </div>

            <div @click="pagination.page < pagination.total / pagination.perPage ? pagination.page++ : ''">
                <p>Next page</p>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
    padding: var(--default-padding);

    div {
        cursor: pointer;
    }
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

th:last-child {
  text-align: right;
}

.tool-bar {
  display: flex;
  margin: 2rem 0;
  gap: 1rem;
  justify-content: space-between;
}

.search-bar {
  align-items: center;
  display: flex;
  gap: 1rem;

  div {
    display: flex;
    gap: 1rem;
  }

  .search-field {
    align-items: center;
    background-color: rgb(245 245 245);
    border-radius: var(--border-radius);
    display: flex;
    gap: 1rem;
    padding-left: var(--default-padding);

    input {
      padding: var(--default-padding);
      padding-left: 0;
    }
  }

  .status-button {
    border: solid 1px grey;
    border-radius: var(--border-radius);
    padding: 0.5rem;
  }

  & > p {
    cursor: pointer;
    font-weight: 700;
  }

  & > p:hover {
    text-decoration: underline;
  }
}

.create-new-task {
  align-items: center;
  display: flex;
  gap: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  color: var(--bg-secondary);
  padding: var(--default-padding);
  cursor: pointer;
}

.create-new-task:hover {
  background-color: rgb(71 85 105);
}

table {
  width: 100%;

  thead {
    font-weight: 700;

    th {
      padding: var(--default-padding);
    }
  }
}
</style>