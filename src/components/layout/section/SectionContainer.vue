<template>
   <div>
       <slot name="header"></slot>

       <section>
           <slot></slot>
       </section>
   </div>
</template>

<style lang="scss" scoped>
section {
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: var(--default-padding);
}
</style>