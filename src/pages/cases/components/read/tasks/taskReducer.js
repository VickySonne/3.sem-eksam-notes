import supabase from "@/database";
import router from "@/router";
import {ref} from "vue";

const taskReducer = {
    tasks: ref([]),

    fetchTasks: function () {
        supabase.from("cases")
            .select("id, tasks(id, name), cases_tasks(task_id, completed)")
            .eq("id", router.currentRoute.value.params.id)
            .single()
            .then(response => {
                this.tasks.value = response.data.tasks.map(task => {
                    const caseTask = response.data.cases_tasks.find(caseTask => caseTask.task_id === task.id);

                    return {
                        ...task,
                        completed: caseTask.completed
                    }
                });
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