import {ref} from "vue";
import supabase from "@/database";

const casesReducer = {
    cases: ref([]),

    fetchCases: async function () {
        const  { data } = await supabase.from("cases")
            .select("id")
            .order("created_at", { ascending: false })

        this.cases.value = data
    },
}

export default casesReducer