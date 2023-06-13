import {ref} from "vue";
import database from "@/database";
import router from "@/router";

// const forceDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms))


// reducers er brugt for at kunne få adgang til funktioner m.m flere forskellige steder, istedet for at skulle passere det ned gennem flere componenter
// Der ved bliver det nemmere at overskue. 
const handleCaseReducer = {
    
    // flush er en funktion (navngivet af os)
    // nulstiller alle værdierne
    // det sikre at når vi handler en case (create eller update) så har den ikke daten fra forrige gang det var brugt, da vores kode ikke er memory safe
    // dette sker når vi er færdige med at oprette eller redigere en case
    flush: function () {
        this.selectedTasks.value = []
        this.selectedTaskOption.value = this.taskOptions.value[0].id
        this.selectedEmployee.value = this.employeeOptions.value[0]
        this.selectedStatus.value = this.statusOptions.value[0]
        this.selectedCustomer.value = null
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

    // sætter værdier ind i update case baseret på et specifikt id
    initialize: async function (caseNumber) {
        if (caseNumber) {
            this.caseId = caseNumber

            const query = "*, tasks(*), products(*), cases_products(*), customer(*), payee(*)"

            const {data: activeCase} = await database.from('cases').select(query).eq('id', caseNumber).single()

            const activeCaseProducts = activeCase.products.map(product => {
                const casesProduct = activeCase.cases_products.find(casesProduct => casesProduct.product_id === product.id)

                return {
                    ...product,
                    count: casesProduct.count
                }
            })


            this.activeCaseTasks = activeCase.tasks
            this.activeCaseProducts = activeCaseProducts

            this.selectedTasks.value = [...activeCase.tasks]
            this.selectedProducts.value = [...activeCaseProducts]
            this.selectedEmployee.value = activeCase.created_by
            this.selectedStatus.value = activeCase.status
            this.selectedCustomer.value = activeCase.customer
            this.secondaryPayee.value = activeCase.payee
            this.selectedDate.value = activeCase.pickup
            this.negotiatedPrice.value = activeCase.negotiated_price === null ? "" : activeCase.negotiated_price
            this.description.value = activeCase.description
            this.hasSecondaryPayee.value = activeCase.payee !== null
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


    // async, den skal kunne afvente databasen inden den må gå igang
    createCase: async function () {

        // laver en alert hvis ikke der er valgt en kunde
        if (!this.selectedCustomer.value) {
            alert("Advarsel: Du skal som minimum vælge en kunde for at oprette en sag.")
            return
        }

        // generere et objekt med alt vores input og gemmer det i const variablen
        const caseData = this.generateCaseData()

        // Her sættes det ind i databasen
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

            // Her sendes brugeren ud til den case der lige er oprettet
            await router.push({path: '/case/' + data.data.id})
        })
    },

    // bliver kaldt når der trykkes på opdater sag i ret sag
    updateCase: async function () {

        // activecasetask er statisk, det er blevet hentet ned fra databasen
        // selectedtask er det der bliver ændret. 
        const newTasks = this.selectedTasks.value.filter(task => !this.activeCaseTasks.some(t => t.id === task.id))
        const removedTasks = this.activeCaseTasks.filter(task => !this.selectedTasks.value.some(t => t.id === task.id))

        // checker om der er nogle nye task, sammen ligner med databasen, forskellen mellem activecasetasks og selectedtask er det der bliver sendt til databasen
        if (newTasks.length > 0) {
            await database.from("cases_tasks").insert(newTasks.map(task => {
                return {
                    case_id: this.caseId,
                    task_id: task.id,
                }
            }))
        }

        if (removedTasks.length > 0) {
            await database.from("cases_tasks")
                .delete()
                .eq('case_id', this.caseId)
                .in('task_id', removedTasks.map(task => task.id))
        }

        // Det samme med produkter
        const newProducts = this.selectedProducts.value.filter(product => !this.activeCaseProducts.some(p => p.id === product.id))
        const removedProducts = this.activeCaseProducts.filter(product => !this.selectedProducts.value.some(p => p.id === product.id))
        const updatedProducts = this.selectedProducts.value.filter(product => {
            const caseProduct = this.activeCaseProducts.find(p => p.id === product.id)

            return caseProduct?.count !== product.count
        })

        if (newProducts.length > 0) {
            await database.from("cases_products").insert(newProducts.map(product => {
                return {
                    case_id: this.caseId,
                    product_id: product.id,
                    count: product.count
                }
            }))
        }

        if (removedProducts.length > 0) {
            await database.from("cases_products")
                .delete()
                .eq('case_id', this.caseId)
                .in('product_id', removedProducts.map(product => product.id))
        }

        if (updatedProducts.length > 0) {
            for (const product of updatedProducts) {
                await database.from("cases_products")
                    .update({
                        count: product.count
                    })
                    .eq('case_id', this.caseId)
                    .eq('product_id', product.id)
            }
        }

        // Her sendes case data, ovenfor sendes kun produkter og task
        const caseData = this.generateCaseData()

        database.from('cases').update(caseData).eq('id', this.caseId).then(() => {
            router.push({path: '/case/' + this.caseId})
        })
    },

    // Der bliver dannet et objekt der senere bliver sendt til databasen
    generateCaseData: function () {
        return {
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
    },

    // Dette er for at når der bliver inputtet en dato bliver det sendt rigtigt til databasen og rendered rigtigt på siden
    parseDate: function (event) {
        const currentDate = new Date(event.target.value);
        const timezoneOffset = currentDate.getTimezoneOffset();
        const offsetMilliseconds = timezoneOffset * 60 * 1000;

        // why does this have to be subtracted? I genuinely don't know
        const newDate = new Date(currentDate.getTime() - offsetMilliseconds);

        this.selectedDate.value = newDate.toISOString().substring(0, 16)
    },

    // Alle de værdier der bruges og kan ændres
    caseId: null,
    activeCaseTasks: null,
    activeCaseProducts: null,

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

// Hvis vi ikke exportere objektet kan vi ikke importere det andre steder og få adgang til det
// Det er kun ved js filer at de explicitly skal exporteres, vue filer gør det automatisk
export default handleCaseReducer