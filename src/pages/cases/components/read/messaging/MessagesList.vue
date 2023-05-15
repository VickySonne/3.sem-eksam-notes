<script setup>
import Message from "@/pages/cases/components/read/messaging/TextMessage.vue";
import messagingReducer from "@/pages/cases/components/read/messaging/messagingReducer";
import {onBeforeUnmount, ref} from "vue";

const isLoading = ref(true)
const messages = messagingReducer.messages;

messagingReducer.fetchMessages().then(() => {
    isLoading.value = false
})

const messageSubscription = messagingReducer.subscribeToMessages()

onBeforeUnmount(() => {
    messageSubscription.unsubscribe();
})
</script>

<template>
    <div v-if="isLoading" class="loader"></div>

    <div v-if="!messages.length && !isLoading">
        <h3>Ingen beskeder fundet.</h3>
    </div>

    <ul v-if="messages.length && !isLoading">
        <Message v-for="message in messages" :message=message :key="message.id" />
    </ul>
</template>

<style lang="scss" scoped>

div:not(.loader) {
  align-items: center;
  display: flex;
  height: 24rem;
  justify-content: center;
}

ul {
  align-content: start;
  display: grid;
  gap: var(--default-padding);
  height: 24rem;
  justify-items: end;
  overflow-y: scroll;
  padding: var(--default-padding);
}
</style>