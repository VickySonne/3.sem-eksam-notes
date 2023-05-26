<script setup>
import NavItem from "@/components/navigation/NavItem.vue";
import {ref} from "vue";

const topNavItems = [
    {
        text: "Overblik",
        icon: "home",
    },
    {
        text: "Sagsstyring",
        icon: "tasks",
        route: "/",
    },
    {
        text: "Kasse",
        icon: "cash-register",
    },
    {
        text: "Kunder",
        icon: "users",
    },
    {
        text: "Varer",
        icon: "barcode",
    },
    {
        text: "Statestik",
        icon: "chart-bar",
    }
];

const showLabels = ref(true)
const toggleLabels = () => showLabels.value = !showLabels.value
</script>

<template>
    <aside :class="{ 'expanded': showLabels }">
        <nav>
            <ul>
                <NavItem v-for="item in topNavItems" :label="item.text" :icon="item.icon" :route="item.route"
                         :key="item.text" :show-label="showLabels"/>
            </ul>

            <ul>
                <NavItem label="Support" icon="life-ring" :show-label="showLabels"/>
                <NavItem label="Indstillinger" icon="cogs" :show-label="showLabels"/>

                <li class="separator"></li>

                <NavItem label="Skjul&nbsp;Sidebjælke" :icon="showLabels ? 'arrow-left' : 'arrow-right'"
                         :show-label="showLabels"
                         @click="toggleLabels" :is-disabled="true"/>
            </ul>
        </nav>
    </aside>
</template>

<style lang="scss" scoped>
aside {
  background-color: var(--bg-secondary);

  &.expanded {
    min-width: 16rem;
  }
}

nav {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  height: 100%;
  justify-content: space-between;
  padding: 1rem;

  ul {
    display: grid;
    gap: 0.5rem;
  }
}
</style>
