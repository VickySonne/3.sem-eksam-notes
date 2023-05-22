<script setup>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    defineProps({
        placeholder: {
            type: String,
            default: 'Søg'
        },
    })
</script>

<template>
    <div>
        <font-awesome-icon icon="magnifying-glass"/>
        <input type="text" :placeholder="placeholder">
        <font-awesome-icon icon="times"/>
    </div>
</template>

<style lang="scss" scoped>
    div{
    align-items: center;
    background-color: var(--bg-light);
    border-radius: var(--border-radius);
    display: flex;
    gap: var(--default-gap);
    padding-inline: var(--default-padding);

    input {
      padding-block: var(--default-padding);
    }

    &last-child {
      cursor: pointer;
    }
  }
</style>