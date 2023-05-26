<script setup>
import CustomerInformation from "@/components/layout/header/CustomerInformation.vue";
import TrialDetails from "@/components/layout/header/TrialDetails.vue";
import ProfileActions from "@/components/layout/header/ProfileActions.vue";
</script>

<template>
    <header>
        <CustomerInformation />
        <TrialDetails />
        <ProfileActions />
    </header>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--default-padding);
  padding: var(--default-padding);
  box-shadow: var(--shadow-down);
}
</style>