<script setup>
const columns = [
    'Oprettet',
    'Status',
    'Ansvarlig',
    'Afhentes',
    'Kunde',
    'Opgaver',
    'Beskrivelse',
    'Tags',
    'Pris',
    'Handlinger'
]

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
r
<style lang="scss" scoped>
th {
  padding: var(--default-padding);
  font-weight: var(--text-heavy);

    &:last-child {
        text-align: right;
    }
}
</style>