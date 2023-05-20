<script setup>
import router from "@/router";
import CustomSelectItem from "../../../../components/dropdowns/CustomSelectItem.vue";
import CustomSelect from "../../../../components/dropdowns/CustomSelect.vue";
import CasesDescription from "./CasesDescription.vue";
import SingleTag from "./SingleTag.vue";
import SingleTask from "./SingleTask.vue";

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
      <!-- <td>{{ workCase.tags.length ? workCase.tags.map(tag => tag.name).join(', ') : "-" }}</td> -->
      <SingleTag></SingleTag>
      <!-- <td>{{ workCase.tasks.length ? workCase.tasks.map(task => task.name).join(', ') : "-" }}</td> -->
      <SingleTask></SingleTask>
      <td>{{ workCase.description ? workCase.description : "-" }}</td>
      <!-- <td>{{ workCase.negotiated_price ? workCase.negotiated_price : "-" }}</td> -->
      <CasesDescription></CasesDescription>
      <td>{{ new Date(workCase.pickup).toLocaleDateString() }}</td>
      <!-- <td>STUFF</td> -->
      <td>
        <CustomSelect>
          <CustomSelectItem></CustomSelectItem>
        </CustomSelect>
      </td>
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