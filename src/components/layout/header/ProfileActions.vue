<script setup>
import {ref} from "vue";
import NavItem from "@/components/layout/navigation/NavItem.vue";
import ProfileDropdown from "@/components/layout/header/ProfileDropdown.vue";

const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
}
</script>

<template>
    <section>
        <NavItem icon="bell" :disabled=true />

        <div :class="{active: showDropdown}" @click="toggleDropdown">
            <font-awesome-icon icon="user" />

            <p>Kasper Pedersen</p>

            <font-awesome-icon icon="angle-down" v-if=!showDropdown />
            <font-awesome-icon icon="angle-up" v-if=showDropdown />

            <ProfileDropdown v-if=showDropdown />
        </div>
    </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
    font-size: var(--text-small);
    font-weight: var(--text-heavy);
  justify-content: end;
    gap: var(--half-padding);

  & > div {
    align-items: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    gap: var(--default-padding);
    padding: var(--default-padding);
    position: relative;

    &:hover,
    &.active {
      background-color: var(--muted);
      color: var(--text-secondary);
    }
  }
}
</style>