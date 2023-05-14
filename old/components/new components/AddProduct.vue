<template>
    <button class="add-product">Tilføj ny vare</button>
            <p>Tilføj kundeenhed</p>
</template>

<style lang="scss" scoped>
.add-product {
  cursor: pointer;
  background-color: var(--CTA-secondary);
  color: white;
  padding: 1rem;

    &:hover {
        background-color: var(--CTA-secondary-hover);
    }
}
</style>