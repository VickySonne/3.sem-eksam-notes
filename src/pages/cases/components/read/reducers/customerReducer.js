import {ref} from "vue";
import supabase from "@/database";
import router from "@/router";

const customerReducer = {
    flush: function () {
        this.customer.value = null
    },

    customer: ref(null),

    fetchCustomer: async function () {
        const {data } = await supabase.from("cases")
            .select("id, customer(name, email, phone, address, city, zipcode)")
            .eq("id", router.currentRoute.value.params.id)
            .single();

        this.customer.value = data.customer
    }
}

export default customerReducer