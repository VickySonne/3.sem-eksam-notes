<script setup>
import router from "@/router";

defineProps({
  workCase: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <tr @click="router.push({ path: '/case/' + workCase.id })">
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
      <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
    <td>{{ workCase.id }}</td>
  </tr>
</template>

<style lang="scss" scoped>
tr {
  &:nth-child(even) {
    background-color: var(--bg-light);
  }

  &:hover {
    background-color: var(--bg-dark);
    color: var(--text-secondary);
    cursor: pointer;
  }

  td {
    padding: var(--default-padding);

    &:last-child {
      text-align: right;
    }
  }
}
</style>