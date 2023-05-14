<script setup>
    import { defineProps } from 'vue';

    defineProps(['columns']);
</script>

<!-- Lavede det så det virkede da der ikke var noget eksisterende JS til det -->
<template>
  <thead>
    <tr>
      <th v-for="item in columns" :key="item.id">
        {{ item.title }}
      </th>
    </tr>
</thead>
</template>

<style lang="scss" scoped>
  th {
    padding: var(--default-padding);
    font-weight: 700;
  }
</style>