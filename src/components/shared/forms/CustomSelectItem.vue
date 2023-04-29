<script setup>
defineProps(['value'])
</script>

<template>
  <option :value="value">
      <slot></slot>
  </option>
</template>