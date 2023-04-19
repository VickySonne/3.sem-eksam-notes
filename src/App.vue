<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
</script>

<template>
  <div class="app-container">
    <AppSidebar/>

    <div class="app-content">
      <AppHeader/>

      <main>
        <h1>components go here</h1>
      </main>
    </div>
  </div>
</template>

<style scoped>
main {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    font-size: 3rem;
    color: #ccc;
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
