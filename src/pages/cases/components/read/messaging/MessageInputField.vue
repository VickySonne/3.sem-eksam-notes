<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import messagingReducer from "@/pages/cases/components/read/messaging/messagingReducer";

const messageRef = messagingReducer.message;

const handleKeydown = (event) => {
    if (event.key === "Enter") {
        messagingReducer.sendMessage()
    }
}
</script>

<template>
    <div>
        <input type="text" placeholder="Send en besked..." v-model="messageRef" @keydown="handleKeydown">
        <font-awesome-icon icon="paper-plane" @click="messagingReducer.sendMessage()" />
    </div>
</template>

<style lang="scss" scoped>
div {
    align-items: center;
    background-color: var(--bg-medium);
    border-radius: var(--border-radius);
    display: flex;

    input {
        color: var(--text-secondary);
        padding: var(--default-padding);
        width: 100%;
    }

    svg {
        cursor: pointer;
        padding: var(--default-padding);
    }
}
</style>