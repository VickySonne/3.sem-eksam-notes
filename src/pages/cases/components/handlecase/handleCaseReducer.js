import {ref} from "vue";
import database from "@/database";

// const forceDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const handleCaseReducer = {
    flush: function () {
        this.selectedTasks.value = []
    },

    initialize: async function () {
        // these could, technically, be done in parallel
        // it was done this way to make it easier to deal with
        // because components await the data before rendering
        const {data: statusOptions} = await database.from('statuses').select('id, name')
        const {data: employeeOptions} = await database.from('employees').select('id, name')
        const {data: customerOptions} = await database.from('customers').select('id, name')
        const {data: tagsOptions} = await database.from('tags').select('id, name')
        const {data: taskOptions} = await database.from('task_categories').select('id, name, tasks(*)').eq('tasks.one_off', false)
        const {data: productOptions} = await database.from('products').select('id, name, sell_price')

        this.statusOptions.value = statusOptions
        this.employeeOptions.value = employeeOptions
        this.customerOptions.value = customerOptions
        this.tagsOptions.value = tagsOptions
        this.taskOptions.value = taskOptions
        this.productOptions.value = productOptions

        this.selectedTaskOption.value = taskOptions[0].id

        this.selectedEmployee.value = employeeOptions[0]
        this.selectedStatus.value = statusOptions[0]


        this.parseDate({target: {value: new Date()}})
    },

    parseDate: function (event) {
        const currentDate = new Date(event.target.value);
        const timezoneOffset = currentDate.getTimezoneOffset();
        const offsetMilliseconds = timezoneOffset * 60 * 1000;

        // why does this have to be subtracted? I genuinely don't know
        const newDate = new Date(currentDate.getTime() - offsetMilliseconds);

        this.selectedDate.value = newDate.toISOString().substring(0, 16)
    },


    statusOptions: ref([]),
    employeeOptions: ref([]),
    customerOptions: ref([]),
    tagsOptions: ref([]),
    taskOptions: ref([]),
    productOptions: ref([]),

    selectedEmployee: ref(null),
    selectedStatus: ref(null),
    selectedTasks: ref([]),
    selectedTaskOption: ref(null),
    selectedCustomer: ref(null),
    secondaryPayee: ref(null),
    selectedDate: ref(null),
    negotiatedPrice: ref(""),

    hasSecondaryPayee: ref(false),

    customerSearch: ref(""),
    secondaryPayeeSearch: ref(null),
}

export default handleCaseReducer