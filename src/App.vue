<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
</script>

<template>
  <div class="app-container">
    <AppSidebar/>

    <div class="app-content">
      <AppHeader/>

      <Suspense>
        <main>
          <router-view />
        </main>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
main {
    flex-grow: 1;
    overflow: scroll;
    padding: 1rem;
}

.app-container {
    display: flex;
    height: 100%;
    width: 100%;
}

.app-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
