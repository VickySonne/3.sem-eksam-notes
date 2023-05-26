<script setup>
defineProps({
    columns: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <thead>
    <tr>
        <th v-for="item in columns" :key="item">
            {{ item }}
        </th>
    </tr>
    </thead>
</template>

<style lang="scss" scoped>
th {
  padding-block: var(--default-padding);
  font-weight: var(--text-heavy);

    &:last-child {
        text-align: right;
    }
}
</style>