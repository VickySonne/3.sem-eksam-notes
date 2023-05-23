<script setup>
import TextMessage from "@/pages/cases/components/read/messaging/TextMessage.vue";
import {onBeforeUnmount} from "vue";
import readCaseReducer from "@/pages/cases/components/read/readCaseReducer";

const messages = readCaseReducer.messages;

const messageSubscription = readCaseReducer.subscribeToMessages()

onBeforeUnmount(() => {
    messageSubscription.unsubscribe();
})
</script>

<template>
    <div v-if="!messages.length">
        <h3>Ingen beskeder fundet.</h3>
    </div>

    <ul v-if="messages.length">
        <TextMessage v-for="message in messages" :message=message :key="message.id" />
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