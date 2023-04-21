<script setup>
import SagOverviewComp from './SagOverviewComp.vue';

</script>

<template>
    <div>
        <h2>Sagsstyrring</h2>
        <div class="tool-bar">
            <div class="search-bar">
                <div class="search-field">
                    <i>i</i>
                    <input type="search" placeholder="Søg...">
                </div>
                <div class="status-grid">
                    <p>Status</p>
                    <i>i</i>
                </div>
                <p>Avanceret søgning</p>
            </div>
            <div class="create-new-task">
                <i>i</i>
                <p>Opret Ny Sag</p>
            </div>
        </div>
        <table>
            <thead>
                <th>>Oprettet</th>
                <th>Status</th>
                <th>Ansvarlig</th>
                <th>Afhentes</th>
                <th>Kunde</th>
                <th>Opgaver</th>
                <th>Tags</th>
                <th>Pris</th>
                <th>Handlinger</th>
            </thead>
            <tbody>
                <SagOverviewComp />
                <SagOverviewComp />
                <SagOverviewComp />
                <SagOverviewComp />
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .tool-bar{
        display: flex;
        flex-direction: row;
        margin: 2rem 0;
        gap: 1rem;
        justify-content: space-between;
    }

    .search-bar{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;

        div{
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }

        .search-field{
            background-color: #f5f5f5;
            padding: 1rem 3rem;
            position: relative;

            i{
                position: absolute;
                left: 1rem;
                right: 1rem;
            }
        }
    }

    .create-new-task{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        border-radius: 0.125rem;
        background-color: rgb(30 41 59);
        color: rgb(249 250 251);
        padding: 1rem;
    }

    table{
        width: 100%;

        thead{

            th{
                padding: 1rem;
            }
        }
    }
</style>