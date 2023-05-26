<script setup>
import router from "@/router";
import navItemProps from "@/props/NavItemProps";
import {toRefs} from "vue";

const props = defineProps(navItemProps)

const {
    label,
    icon,
    route,
    showLabel,
    disabled
} = toRefs(props)

// Check if either label or icon is provided
if (props.label === "" && props.icon === "") {
    throw new Error("You must provide either a label or an icon")
}

const isActive = () => {
    const currentRoute = router.currentRoute.value.path;

    if (props.route === "/fake-route" || currentRoute === "/fake-route") {
        return false;
    }

    return currentRoute.startsWith(props.route);
}
</script>

<template>
    <li>
        <router-link :to="!disabled ? route : ''" :class="{ active: isActive() }">
            <font-awesome-icon :icon=icon />
            <p v-if="showLabel && label.length">{{ label }}</p>
        </router-link>
    </li>
</template>

<style lang="scss" scoped>
li {
    list-style-type: none;

    & > a {
        align-items: center;
        border-radius: var(--border-radius);
        cursor: pointer;
        display: flex;
        font-size: 0.875rem;
        font-weight: 600;
        gap: var(--default-padding);
        padding: var(--default-padding);

        &.active,
        &:hover {
            background-color: var(--CTA-secondary);
            color: var(--text-secondary);
        }
    }
}
</style>