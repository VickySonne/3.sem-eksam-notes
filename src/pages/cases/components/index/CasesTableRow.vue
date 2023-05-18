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
    <td>{{ new Date(workCase.created_at).toLocaleDateString() }}</td>
    <td>{{ workCase.status.name }}</td>
    <td>{{ workCase.responsible_employee.name }}</td>
      <td>{{ workCase.customer.name }}</td>
      <td>{{ workCase.tags.length ? workCase.tags.map(tag => tag.name).join(', ') : "-" }}</td>
      <td>{{ workCase.tasks.length ? workCase.tasks.map(task => task.name).join(', ') : "-" }}</td>
      <td>{{ workCase.description ? workCase.description : "-" }}</td>
      <td>{{ workCase.negotiated_price ? workCase.negotiated_price : "-" }}</td>
      <td>{{ new Date(workCase.pickup).toLocaleDateString() }}</td>
      <td>STUFF</td>
  </tr>
</template>

<style lang="scss" scoped>
tr {
  line-height: 1.5rem;

  &:nth-child(odd) {
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