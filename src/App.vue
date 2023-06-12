<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
</script>

<template>
  <div class="app-container">
    <AppSidebar/>

    <div class="app-content">
      <AppHeader/>

      <!--
        Suspence er et indbygget vue component. Nogle child components er assynchrone, 
        derfor skal vi bruges suspence for at sikre at de ikke render før de har hented/fetched data
        Det kan bruges til at lave fallback content ved at bruge <template #fallback>
      -->
      <Suspense>
        <main>
          <!-- router-view er tilgængelig da det er blevet installeret i main.js -->
          <router-view />
        </main>
      </Suspense>
    </div>
  </div>
</template>

<!-- Scoped: Det limiter css til componentet, child components bliver også påvirket -->
<style scoped>
main {
    flex-grow: 1;
    overflow-y: scroll;
    padding: 1rem;
}

.app-container {
    background-color: var(--bg-white);
    color: var(--text-primary);
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
