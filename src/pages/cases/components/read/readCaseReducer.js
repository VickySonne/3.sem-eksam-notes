import {ref} from "vue";
import supabase from "@/database";
import router from "@/router";

const readCaseReducer = {
    flush: function () {
        this.details.value = {}
        this.customer.value = {}
        this.messages.value = []
        this.message.value = null
        this.tasks.value = []
    },

    details: ref({}),
    customer: ref({}),
    messages: ref([]),
    message: ref(null),
    tasks: ref([]),

    initialize: async function () {
        const id = router.currentRoute.value.params.id

        const { data: customer } = await supabase
            .from("cases")
            .select("id, customer(name, email, phone, address, city, zipcode)")
            .eq("id", id)
            .single()
        

        const { data: details } = await supabase.from("cases")
            .select("responsible_employee(name), status(name), pickup, negotiated_price, created_by(name), created_at, description")
            .eq("id", id)
            .single()

        const {data: messages} = await supabase
            .from("messages")
            .select("contents, created_at")
            .eq("case_id", router.currentRoute.value.params.id)
            .order("created_at", {ascending: true});

        const { data: tasks } = await supabase.from("cases")
            .select("id, tasks(id, name), cases_tasks(task_id, completed)")
            .eq("id", router.currentRoute.value.params.id)
            .single()

        this.tasks.value = tasks.tasks.map(task => {
            const caseTask = tasks.cases_tasks.find(caseTask => caseTask.task_id === task.id)

            return {
                ...task,
                completed: caseTask.completed
            }
        })

        this.customer.value = customer.customer
        this.details.value = details
        this.messages.value = messages
    },

    toggleTaskCompletion: async (task) => {
        task.completed = !task.completed;

        await supabase.from("cases_tasks")
            .update({ completed: task.completed })
            .eq("task_id", task.id)
            .eq("case_id", router.currentRoute.value.params.id)
            .single()
    },

    sendMessage: async function ()  {
        const message = this.message.value;
        this.message.value = null;

        await supabase.from("messages").insert({
            case_id: router.currentRoute.value.params.id,
            contents: message,
        })
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

export default readCaseReducer