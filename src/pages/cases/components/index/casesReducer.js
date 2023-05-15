import {ref} from "vue";
import supabase from "@/database";

const casesReducer = {
    cases: ref([]),

    fetchCases: async function () {
        const queryString
            = "id, created_at, status(name), responsible_employee(name), pickup, customer(name), tasks(name), description, tags(name), negotiated_price"

        const  { data } = await supabase.from("cases")
            .select(queryString)
            .order("created_at", { ascending: false })

        this.cases.value = data
    },
}

export default casesReducer