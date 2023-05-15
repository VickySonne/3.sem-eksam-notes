<template>
    <div>
        <div>
            <slot name="left-column"></slot>
        </div>

        <div>
            <slot name="right-column"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div {
  align-content: start;
  display: grid;
    gap: 3rem;
  grid-template-columns: 1fr min(30rem);


  & > div {
    grid-template-columns: 1fr;
  }
}
</style>