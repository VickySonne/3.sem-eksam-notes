<template>
    <button class="add-product">Tilføj ny vare</button>
            <p>Tilføj kundeenhed</p>
</template>

<style lang="scss" scoped>
.add-product {
  cursor: pointer;
  background-color: var(--CTA-tertiary);
  color: white;
  padding: 1rem;

    &:hover {
        background-color: var(--CTA-tertiary-hover);
    }
}
</style>