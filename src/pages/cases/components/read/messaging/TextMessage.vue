<script setup>
defineProps({
    message: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <li>
        <div>
            {{ message.contents }}
        </div>

        {{ new Date(message.created_at).toLocaleString() }}
    </li>
</template>

<style lang="scss" scoped>
li  {
  align-items: end;
  display: flex;
  flex-direction: column;
  gap: var(--half-padding);

  div {
    background-color: var(--bg-dark);
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    padding: var(--default-padding);
    width: fit-content;
  }
}
</style>