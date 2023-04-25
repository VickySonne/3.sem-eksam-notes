<script setup>
    const { data } = defineProps(['data']);
</script>

<template>
        <div class="todos">
            <h5>Kategori</h5>
            <form>
                <div v-for="task in data.tasks">
                    <input type="checkbox"><label>{{ task.name }}</label>
                </div>
                
            </form>    
        </div>
</template>

<style lang="scss" scoped>

    .todos{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        background-color: white;
        

        form{
            display: flex;
            flex-direction: column;
            gap: 0.5rem
        };
    }

    h5{
        font-weight: 700;
    }

    
</style>