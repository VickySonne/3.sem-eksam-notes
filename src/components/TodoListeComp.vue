<script setup>

</script>

<template>
        <div class="todos">
            <h5>Kategori</h5>
            <form>
                <input type="checkbox"><label>Opg 1</label>
                <input type="checkbox"><label>Opg 2</label>
                <input type="checkbox"><label>Opg 3</label>
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