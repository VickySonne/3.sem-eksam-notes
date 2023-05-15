<script setup>
import Message from "@/pages/cases/components/read/messaging/TextMessage.vue";
import messagingReducer from "@/pages/cases/components/read/messaging/messagingReducer";
import {onBeforeUnmount} from "vue";

const messages = messagingReducer.messages;

messagingReducer.fetchMessages()

const messageSubscription = messagingReducer.subscribeToMessages()

onBeforeUnmount(() => {
    messageSubscription.unsubscribe();
})
</script>

<template>
    <div v-if="!messages.length">
        <h3>Ingen beskeder fundet.</h3>
    </div>

    <ul v-if="messages.length">
        <Message v-for="message in messages" :message=message :key="message.id" />
    </ul>
</template>

<style lang="scss" scoped>

div {
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