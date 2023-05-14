<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import supabase from "@/database";
import router from "@/router";

const { data } = await supabase.from("cases")
    .select("id, customer(name, email, phone, address, city, zipcode)")
    .eq("id", router.currentRoute.value.params.id)
    .single();
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Kunde" />
        </template>

        <ul>
            <li v-for="(value, key) in data.customer" :key="key">{{ value }}</li>
        </ul>
    </SectionContainer>
</template>

<style lang="scss" scoped>
ul {
    display: grid;
    gap: var(--half-padding)
}
</style>