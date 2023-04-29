<script setup>
defineProps(['value'])
</script>

<template>
  <option :value="value">
      <slot></slot>
  </option>
</template>

<style lang="scss" scoped>

</style>