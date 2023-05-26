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

        <span>
            {{ new Date(message.created_at).toLocaleString() }}
        </span>
    </li>
</template>

<style lang="scss" scoped>
li  {
  align-items: end;
  display: flex;
  flex-direction: column;
  gap: var(--half-padding);

  div {
    background-color: var(--bg-white);
    border-radius: var(--border-radius);
    color: var(--text-primary);
    padding: var(--default-padding);
    width: fit-content;
  }

    span {
        font-size: 0.8rem;
    }
}

@media screen and (prefers-color-scheme: dark) {
    div {
        color: var(--text-secondary);
    }
}
</style>