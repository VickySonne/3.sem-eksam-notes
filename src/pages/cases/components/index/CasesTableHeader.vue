<script setup>
const columns = [
    'Oprettet',
    'Status',
    'Ansvarlig',
    'Kunde',
    'Tags',
    'Opgaver',
    'Beskrivelse',
    'Pris',
    'Afhentes',
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
  padding-block: var(--default-padding);
  padding-inline: var(--half-padding);
  font-weight: var(--text-heavy);

    &:last-child {
        text-align: right;
    }
}
</style>