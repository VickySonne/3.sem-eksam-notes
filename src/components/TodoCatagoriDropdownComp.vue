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
        gap: 1rem;
        background-color: white;
        padding: 1rem;
        border-radius: var(--border-radius);

        i{
            cursor: pointer;
        };

    }

    ul{
        display: none;
    }
</style>