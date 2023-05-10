<template>
    <div>
        <font-awesome-icon icon="plus"/>
        <p>Opret Ny Sag</p>
    </div>
</template>

<style lang="scss" scoped>
div {
  align-items: center;
  display: flex;
  gap: var(--default-gap);
  border-radius: var(--border-radius);
  background-color: var(--CTA-primary);
  color: var(--text-secondary);
  padding: var(--default-padding);
  cursor: pointer;
}

div:hover {
  background-color: var(--CTA-secondary-hover);
}

@media screen and (min-width: var(--tablet-query)) {
    
}

@media screen and (min-width: var(--desktop-query)) {
    
}
</style>