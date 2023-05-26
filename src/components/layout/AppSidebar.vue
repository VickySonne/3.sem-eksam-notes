<script setup>
import {ref} from "vue";

import NavItem from "@/components/layout/navigation/NavItem.vue";
import NavSection from "@/components/layout/navigation/NavSection.vue";
import topNavItems from "@/data/navigation/TopNavItems";

const expanded = ref(true);
</script>

<template>
    <aside :class="{ expanded: expanded }">
        <nav>
          <NavSection>
              <NavItem v-for="item in topNavItems" :route=item.route :label=item.label :icon=item.icon :show-label=expanded :key=item.text />
          </NavSection>

          <NavSection>
              <NavItem label="Support" icon="life-ring" :show-label=expanded />
              <NavItem label="Indstillinger" icon="cogs" :show-label=expanded />

              <hr />

              <NavItem label="Skjul&nbsp;Sidebjælke" :icon="expanded ? 'arrow-left' : 'arrow-right'" :show-label="expanded" @click="() => expanded = !expanded" :disabled=true />
          </NavSection>
        </nav>
    </aside>
</template>

<style lang="scss" scoped>
aside {
  padding: var(--default-padding);

  &.expanded {
    width: 16rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  hr {
    margin-block: 0;
  }
}
</style>