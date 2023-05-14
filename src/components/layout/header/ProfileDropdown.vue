<script setup>
import NavItem from "@/components/layout/navigation/NavItem.vue";
</script>

<template>
    <ul>
        <NavItem icon="people-arrows" label="Skift bruger" />
        <NavItem icon="arrow-right-from-bracket" label="Log ud" />
    </ul>
</template>

<style lang="scss" scoped>
ul {
    background-color: #fff;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    color: var(--text-primary);
    display: grid;
    gap: var(--half-padding);
    padding: var(--default-padding);
    position: absolute;
    right: 0;
    top: calc(100% + var(--half-padding));
    z-index: 1;
}
</style>