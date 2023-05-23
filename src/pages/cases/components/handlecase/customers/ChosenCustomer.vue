<script setup>
defineProps({
    customer: {
        type: Object,
        required: true
    },
    callback: {
        type: Function,
        required: true
    },
    destructiveCallback: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<template>
    <div @click="callback(customer)" :class="{
        destructive: destructiveCallback
    }">
        <ul>
            <li>{{ customer.name }}</li>
            <li>{{ customer.phone }}</li>
            <li>{{ customer.adress }}</li>
            <li>{{ customer.zipcode }} {{ customer.city }}</li>
        </ul>

        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.destructive:hover {
    background-color: var(--bg-danger);
}

div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    background-color: var(--bg-white);
    padding: var(--default-padding);
    border-radius: var(--border-radius);

    &:hover {
        cursor: pointer;
        background-color: var(--bg-dark);
        color: var(--text-secondary);
    }
}
</style>