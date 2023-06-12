<script setup>
import router from "@/router";
import navItemProps from "@/props/NavItemProps";
import {toRefs} from "vue";

const props = defineProps(navItemProps)

// Object destructuring (props er et object, den tager alle keys og laver dem til refs med toRefs) 
// Hvilket viser sig ikke at være nødvendigt, da der ikke gøres brug af state i dette component
// Object destructuring: shorthand for the following

// const label = props.label
// const icon = props.icon
// [...]

// Det viser sig ikke at være brugt 
const {
    label,
    icon,
    route,
    showLabel,
    disabled
} = toRefs(props)

// 

// Check if either label or icon is provided, der ingen af dem der er required (se NavItemProps) men vi skal have en af dem
if (props.label === "" && props.icon === "") {
    // Bliver vist på skærmen
    throw new Error("You must provide either a label or an icon")
}

// Det er en funktion der returnere true or false, afhængigt af navnet på routen
// Hvis routen er fake route deaktiveres highlighted, eller ville alle menupunkter (undtagen sagsstyring) være highligthed
const isActive = () => {
    const currentRoute = router.currentRoute.value.path;

    if (props.route === "/fake-route" || currentRoute === "/fake-route") {
        return false;
    }
    
    // Dette er for at highlighet forbliver når der navigeres dybere ind i sagsstyring 
    return currentRoute.startsWith(props.route);
}
</script>

<template>

    <!-- Class bindings: fx :class er en måde at assign en class til et element ved brug af js. : foran indikerer at det er js -->
    <!-- an ternary operator :to="!disabled ? route : ''" ?=if :=else -->
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