<script setup>
    const props = defineProps(['data']);

    const creationDate = new Date(props.data.created_at);
    const pickupDate = new Date(props.data.pickup);

    
</script>

<template>
    
        <tr>
            <td>{{ new Intl.DateTimeFormat('da-DK').format(creationDate) }}</td>
            <td>{{ data.status.name }}</td>
            <td>{{ data.responsible_employee.name }}</td>
            <td>{{ new Intl.DateTimeFormat('da-DK').format(pickupDate) }}</td>
            <td>{{ data.customer.name }}</td>
            <td>
                <p class="tag" v-for="task in data.tasks">{{ task.name }}</p>
                <span v-if="!data.tasks.length">---</span>
            </td>
            <td>
                {{ data.description }}
                <span v-if="data.description==null">---</span>
            </td>
            <td>
                <p class="tag" v-for="tag in data.tags">{{ tag.name }}</p>
                <span v-if="!data.tags.length">---</span>
            </td>
            
            <td>
                <router-link :to="{ name: 'MainTaskDisplay' , params: { id: data.id }}">
                    <p>Se Mere</p>
                </router-link>
            </td>
            <td><button>Handling</button></td>
        </tr>

</template>

<style lang="scss" scoped>
    tr{
        td{
            padding: 1rem;
            vertical-align: middle;

            p{
                padding: 0.5rem;

                
            }

            button{
                border: solid 1px transparent;
                border-radius: 0.125rem;
                background-color: aquamarine;
                padding: 1rem;
            }
            
        }
    }

    tr:nth-child(odd){
        background-color: rgb(209 213 219);
    }

    .tag{
        background-color: #e5e7eb;
        padding: 0.5rem;
        margin: 0.25rem;
        border-radius: 0.125rem;
    }
</style>