<script setup>

</script>

<template>
    <div class="category">
        <div>
            <h4>Kategori Name</h4>
            <ul>
                <li>Task 1</li>
                <li>Task 2</li>
                <li>Task 3</li>
                <li>Task 4</li>
                <li>Task 5</li>
            </ul>
        </div>
        
        <i>i</i>
    </div>
</template>

<style lang="scss" scoped>

    .category{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        background-color: white;
        padding: 1rem;
        border-radius: 0.125rem;

        i{
            cursor: pointer;
        };

    }

    ul{
        display: none;
    }
</style>