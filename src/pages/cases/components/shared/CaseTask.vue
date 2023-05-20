<script setup>
defineProps({
    task: {
        type: Object,
        required: true,
    },
    callback: {
        type: Function,
        required: false,
        default: () => {}
    }
})
</script>

<template>
    <article :class="{selected: task.completed}" @click="callback">
        <div>
            <font-awesome-icon icon="check"/>
        </div>

        <p>{{ task.name }}</p>
    </article>
</template>

<style lang="scss" scoped>
article {
  align-items: center;
  background-color: #fff;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  gap: 1rem;
  padding: var(--default-padding);

  &.selected {
    background-color: var(--muted);
    color: var(--text-secondary);
  }

  & > div {
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25rem;
  }
}
</style>