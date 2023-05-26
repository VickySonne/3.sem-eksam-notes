import {ref} from "vue";
import database from "@/database";
import router from "@/router";

// const forceDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const handleCaseReducer = {
    flush: function () {
        this.selectedTasks.value = []
        this.selectedTaskOption.value = this.taskOptions.value[0].id
        this.selectedEmployee.value = this.employeeOptions.value[0]
        this.selectedStatus.value = this.statusOptions.value[0]
        this.selectedCustomer.value = this.customerOptions.value[0]
        this.secondaryPayee.value = null
        this.selectedDate.value = null
        this.negotiatedPrice.value = ""
        this.description.value = ""
        this.hasSecondaryPayee.value = false
        this.selectedProducts.value = []

        this.customerSearch.value = ""
        this.secondaryPayeeSearch.value = ""
        this.productSearch.value = ""
    },

    initialize: async function (caseNumber) {
        if (caseNumber) {
            this.caseId.value = caseNumber

            const {data: activeCase} = await database.from('cases').select().eq('id', caseNumber).single()

            // this.selectedTasks.value = activeCase.tasks
            this.selectedEmployee.value = activeCase.created_by
            this.selectedStatus.value = activeCase.status
            this.selectedCustomer.value = activeCase.customer
            this.secondaryPayee.value = activeCase.payee
            this.selectedDate.value = activeCase.pickup
            this.negotiatedPrice.value = activeCase.negotiated_price === null ? "" : activeCase.negotiated_price
            this.description.value = activeCase.description
            this.hasSecondaryPayee.value = activeCase.payee !== null
            // this.selectedProducts.value = activeCase.products
        }

        // these could, technically, be done in parallel
        // it was done this way to make it easier to deal with
        // because components await the data before rendering
        const {data: statusOptions} = await database.from('statuses').select('id, name')
        const {data: employeeOptions} = await database.from('employees').select('id, name')
        const {data: customerOptions} = await database.from('customers').select('id, name, phone, address, city, zipcode')
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

    createCase: async function () {
        if (!this.selectedCustomer.value) {
            alert("Advarsel: Du skal som minimum vælge en kunde for at oprette en sag.")
            return
        }

        const caseData = {
            customer: this.selectedCustomer.value.id,
            created_by: this.selectedEmployee.value.id,
            responsible_employee: this.selectedEmployee.value.id,
            pickup: this.selectedDate.value,
            payee: this.secondaryPayee.value ? this.secondaryPayee.value.id : null,
            description: this.description.value,
            deposit: 0,
            negotiated_price: this.negotiatedPrice.value.length ? this.negotiatedPrice.value : null,
            status: this.selectedStatus.value.id,
        }

        database.from('cases').insert(caseData).select().single().then(async data => {
            await database.from("cases_tasks").insert(this.selectedTasks.value.map(task => {
                return {
                    case_id: data.data.id,
                    task_id: task.id,
                }
            }))

            await database.from("cases_products").insert(this.selectedProducts.value.map(product => {
                return {
                    case_id: data.data.id,
                    product_id: product.id,
                    count: product.count
                }
            }))

            await router.push({path: '/case/' + data.data.id})
        })
    },

    updateCase: async function () {
        const caseData = {
            customer: this.selectedCustomer.value.id,
            created_by: this.selectedEmployee.value.id,
            responsible_employee: this.selectedEmployee.value.id,
            pickup: this.selectedDate.value,
            payee: this.secondaryPayee.value ? this.secondaryPayee.value.id : null,
            description: this.description.value,
            deposit: 0,
            negotiated_price: this.negotiatedPrice.value.length ? this.negotiatedPrice.value : null,
            status: this.selectedStatus.value.id,
        }

        database.from('cases').update(caseData).eq('id', this.caseId.value).then(() => {
            router.push({path: '/case/' + this.caseId.value})
        })
    },

    parseDate: function (event) {
        const currentDate = new Date(event.target.value);
        const timezoneOffset = currentDate.getTimezoneOffset();
        const offsetMilliseconds = timezoneOffset * 60 * 1000;

        // why does this have to be subtracted? I genuinely don't know
        const newDate = new Date(currentDate.getTime() - offsetMilliseconds);

        this.selectedDate.value = newDate.toISOString().substring(0, 16)
    },

    caseId: ref(null),

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
    description: ref(""),
    selectedProducts: ref([]),

    hasSecondaryPayee: ref(false),

    customerSearch: ref(""),
    secondaryPayeeSearch: ref(""),
    productSearch: ref(""),
}

export default handleCaseReducer