<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import MessagingInputField from "@/pages/cases/components/read/messaging/MessageInputField.vue";
import MessagesList from "@/pages/cases/components/read/messaging/MessagesList.vue";
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="SMS-Beskeder" />
        </template>

        <MessagesList />
        <MessagingInputField />
    </SectionContainer>
</template>