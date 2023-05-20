<script setup>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
    <div class="wrapper">
        <ul>
            <li>{{ name }}</li>
            <li>{{ number }}</li>
            <li>{{ adress }}</li>
            <li>{{ zipcode }} {{ city }}</li>
        </ul>

        <button>
            <font-awesome-icon icon="times"/>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: var(--bg-white);
        padding: var(--default-padding);
        border-radius: var(--border-radius);

        button{
            display: flex;
            flex-direction: row;
            gap: var(--default-gap);
        }
    }
</style>