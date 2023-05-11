<script setup>
    import { defineProps } from 'vue';

    const props = defineProps(['columns']);
</script>

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