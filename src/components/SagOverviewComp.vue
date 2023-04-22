<script setup></script>

<template>
    <tr>
        <td>Dato</td>
        <td>Status</td>
        <td>Navn</td>
        <td>Dato</td>
        <td>Kunde</td>
        <td>
            <p>Opgave 1</p>
            <p>Opgave 2</p>
        </td>
        <td>
            <p class="tag">Tag 1</p>
            <p class="tag">Tag 2</p>
        </td>
        <td>Tal kr.</td>
        <td><button>Knap</button></td>
    </tr>
</template>

<style lang="scss" scoped>
    tr{
        td{
            padding: 1rem;
            vertical-align: middle;

            p{
                padding: 0.5rem;

                
            }
            
        }
    }

    tr:nth-child(odd){
        background-color: rgb(209 213 219);
    }

    .tag{
        background-color: #e5e7eb;
        padding: 0.5rem;
        margin: 0.25rem;
    }
</style>