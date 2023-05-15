<template>
  <ul>
      <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: grid;
  gap: var(--half-padding);
}
</style>