<script setup>
import casesReducer from "@/pages/cases/components/index/casesReducer";

const workCases = casesReducer.cases
casesReducer.fetchCases()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
      </tr>
    </thead>

      <tbody>
        <tr v-for="workCase in workCases" :key="workCase.id">
          <td>{{ workCase.id }}</td>
        </tr>
      </tbody>
  </table>
</template>