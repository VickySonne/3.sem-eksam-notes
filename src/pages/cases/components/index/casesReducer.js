import {ref} from "vue";
import supabase from "@/database";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";

const casesReducer = {
    cases: ref([]),
    search: ref(""),

    updateSearch: function (value) {
        this.search.value = value
    },

    fetchCases: async function () {
        const queryString
            = "id, created_at, status(name), responsible_employee(name), pickup, customer(name), tasks(name), description, tags(name), negotiated_price"

        const  { data } = await supabase.from("cases")
            .select(queryString)
            .order("created_at", { ascending: false })

        this.cases.value = data
        this.pagination.value.dataLength = data.length
    },

    pagination: ref({
        page: 1,
        perPage: 10,
        dataLength: 1,
        getNumberOfPages: function () {
            return Math.ceil(this.dataLength / this.perPage)
        },
        getPaginatedResults: function () {
            const start = (this.page - 1) * this.perPage
            const end = start + this.perPage

            return casesReducer.searchFilteredCases().slice(start, end)
        }
    }),

    searchFilteredCases: function () {
        return this.cases.value.filter(c => {
            const searchAbleProperties = {
                responsible_employee: c.responsible_employee?.name,
                status: c.status?.name,
                customer: c.customer?.name,
                tasks: c.tasks.map(t => t.name),
                tags: c.tags.map(t => t.name),
                description: c.description,
                price: c.price,
                created_at: c.created_at,
                pickup: c.pickup
            }

            return recursiveObjectSearch(searchAbleProperties, this.search.value)
        })
    }
}

export default casesReducer