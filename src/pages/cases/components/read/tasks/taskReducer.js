import supabase from "@/database";
import router from "@/router";
import {ref} from "vue";

const taskReducer = {
    flush: function () {
        this.tasks.value = [];
    },

    tasks: ref([]),

    fetchTasks: async function () {
        const { data } = await supabase.from("cases")
            .select("id, tasks(id, name), cases_tasks(task_id, completed)")
            .eq("id", router.currentRoute.value.params.id)
            .single()

        this.tasks.value = data.tasks.map(task => {
            const caseTask = data.cases_tasks.find(caseTask => caseTask.task_id === task.id)

            return {
                ...task,
                completed: caseTask.completed
            }
        })
    },

    toggleTaskCompletion: async (task) => {
        task.completed = !task.completed;

        await supabase.from("cases_tasks")
            .update({ completed: task.completed })
            .eq("task_id", task.id)
            .eq("case_id", router.currentRoute.value.params.id)
            .single()
    }
}

export default taskReducer