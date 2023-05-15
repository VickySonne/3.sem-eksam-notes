import {ref} from "vue";
import supabase from "@/database";
import router from "@/router";

const messagingReducer = {
    flush: function () {
        this.messages.value = []
        this.message.value = null
    },

    message: ref(null),
    messages: ref([]),

    sendMessage: async function ()  {
        const message = this.message.value;
        this.message.value = null;

        await supabase.from("messages").insert({
            case_id: router.currentRoute.value.params.id,
            contents: message,
        })
    },

    fetchMessages: async function () {
        const {data} = await supabase
            .from("messages")
            .select("contents, created_at")
            .eq("case_id", router.currentRoute.value.params.id)
            .order("created_at", {ascending: true});

        this.messages.value = data;
    },

    subscribeToMessages: function () {
        return supabase
            .channel('messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    this.messages.value.push(payload.new)
                }
            )
            .subscribe()
    }
}

export default messagingReducer