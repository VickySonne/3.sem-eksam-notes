<script setup>
import TaskOverviewComp from './TaskOverviewComp.vue';
import database from '../database.js';

const { data } = await database
    .from('cases')
    .select('*, customer(*), created_by(*), responsible_employee(*), status(*), tags(*), tasks(*)')
    .order('created_at', {ascending:false});

    console.log(data);
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
                <div class="status-button">
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
                <th>Oprettet</th>
                <th>Status</th>
                <th>Ansvarlig</th>
                <th>Afhentes</th>
                <th>Kunde</th>
                <th>Opgaver</th>
                <th>Beskrivelse</th>
                <th>Tags</th>
                <th>Detaljer</th>
                <th>Handlinger</th>
            </thead>
            <tbody>
                <TaskOverviewComp v-for="workcase in data" :data="workcase"/>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    
    h2{
        font-size: 1.5rem;
        font-weight: 700;
    }
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
            background-color: rgb(245 245 245);
            padding: 1rem 3rem;
            position: relative;

            i{
                position: absolute;
                left: 1rem;
                right: 1rem;
                pointer-events: none;
            }

            input{
                cursor: text;
            }

            ::placeholder {
                color: grey;
                opacity: 1; /* Firefox */
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: grey;
            }

            ::-ms-input-placeholder { /* Microsoft Edge */
                color: grey;
            }
        }

        .status-button{
            border: solid 1px grey;
            padding: 0.5rem;
            border-radius: 0.125rem;

            i{
                cursor: pointer;
            }
        }

        & > p{
            font-weight: 700;
            cursor: pointer;
        }

        & > p:hover{
            text-decoration: underline;
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
        cursor: pointer;
    }

    .create-new-task:hover{
        background-color: rgb(71 85 105);
    }

    table{
        width: 100%;

        thead{

            font-weight: 700;

            th{
                padding: 1rem;
            }
        }
    }
</style>