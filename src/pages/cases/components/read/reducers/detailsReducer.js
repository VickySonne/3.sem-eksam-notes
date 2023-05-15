import {ref} from "vue";
import supabase from "@/database";
import router from "@/router";


const detailsReducer = {
    flush: function () {
        this.details.value = {}
    },

    details: ref({}),

    fetchDetails: async function () {
        const id = router.currentRoute.value.params.id
        const queryString = "responsible_employee(name), status(name), pickup, negotiated_price, created_by(name), created_at, description"

        const { data } = await supabase.from("cases")
            .select(queryString)
            .eq("id", id)
            .single()

        this.details.value = data
    }
}

export default detailsReducer