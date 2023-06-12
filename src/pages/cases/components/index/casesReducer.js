import {ref} from "vue";
import supabase from "@/database";
import recursiveObjectSearch from "@/utilities/recursiveObjectSearch";

const casesReducer = {

    // når dataen er hentet bliver det sat ind her
    cases: ref([]),

    // EXPLAIN THE SEARCH PART OF THE CODE - I dont understand the flow of `data´ between this file, casesReducer and Search Input Componentet
    search: ref(""),

    updateSearch: function (value) {
        this.search.value = value
    },

    // Henter data fra databasen
    fetchCases: async function () {
        const queryString
            = "id, created_at, status(name), responsible_employee(name), pickup, customer(name), tasks(name), description, tags(name), negotiated_price"

        // Why the {} around data?
        const  { data } = await supabase.from("cases")
            .select(queryString)
            .order("created_at", { ascending: false })

        // Explain "this" - hvad referer det til her? Is it the object "casesReducer"????
        this.cases.value = data
        this.pagination.value.dataLength = data.length
    },

    pagination: ref({
        page: 1,
        perPage: 10,
        dataLength: 1,

        // Denne funktion udregner hvor mange sider af resultater der er
        getNumberOfPages: function () {

            // "This" her referer til keys i dette objekt
            return Math.ceil(this.dataLength / this.perPage)
        },

        // Denne function udregner og render de cases der passer til de enkelte sider
        getPaginatedResults: function () {
            const start = (this.page - 1) * this.perPage
            const end = start + this.perPage

            return casesReducer.searchFilteredCases().slice(start, end)
        }
    }),

    searchFilteredCases: function () {

        // c referer til hvert case i arrayet af cases - Hvorfor though, forstår ikke syntax?
        // Hvad er callbacket og elementet i denne måde at skrive det p?
        return this.cases.value.filter(c => {
            const searchAbleProperties = {

                // ? forhindre fejl så man stadig kan få adgang til nestede properties selv om de er null eller undefined
                responsible_employee: c.responsible_employee?.name,
                status: c.status?.name,
                customer: c.customer?.name,

                // map giver et array af task eller tag, så de også kan søges på
                tasks: c.tasks.map(t => t.name),
                tags: c.tags.map(t => t.name),
                description: c.description,
                price: c.price,
                created_at: c.created_at,
                pickup: c.pickup
            }

            // denne funktion gøre igennem alle cases og dertilhørende properties og nestede objekter, 
            // den returnere true eller false alt efter om den finder noget der matcher søge inputtet
            // cases hvor den returnere true, sørger .filter for at det kommer med i et nyt array der bliver rendered
            return recursiveObjectSearch(searchAbleProperties, this.search.value)
        })
    }
}

export default casesReducer