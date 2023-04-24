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
        <td>Beskrivelse her...</td>
        <td>
            <p class="tag">Tag 1</p>
            <p class="tag">Tag 2</p>
        </td>
        
        <td>Tal kr.</td>
        <td><button>Handling</button></td>
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

            button{
                border: solid 1px transparent;
                border-radius: 0.125rem;
                background-color: aquamarine;
                padding: 1rem;
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
        border-radius: 0.125rem;
    }
</style>