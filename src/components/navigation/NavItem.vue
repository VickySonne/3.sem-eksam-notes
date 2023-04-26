<script setup>
import {defineProps} from 'vue';

defineProps({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: false,
        default: "/fake-route"
    },
    showLabel: {
        type: Boolean,
        required: false,
        default: true
    },
    isDisabled: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<template>
    <li>
        <router-link :to=route class="nav-item" v-if="!isDisabled">
            <div class="icon-container">
                <font-awesome-icon :icon=icon />
            </div>

            <p v-if="showLabel">{{ label }}</p>
        </router-link>

        <div class="nav-item" v-if="isDisabled">
            <div class="icon-container">
                <font-awesome-icon :icon=icon />
            </div>

            <p v-if="showLabel">{{ label }}</p>
        </div>
    </li>
</template>

<style scoped>
p {
    margin-left: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
}

.nav-item {
    align-items: center;
    border-radius: var(--border-radius);
    display: flex;
    padding: 1rem;
}

.nav-item:hover {
    background-color: var(--bg-primary);
    color: var(--text-secondary);
    cursor: pointer;
}

.icon-container {
    height: 18px;
    width: 18px;
}
</style>