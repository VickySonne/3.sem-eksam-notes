<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import casesReducer from "@/pages/cases/components/index/casesReducer";
import {watch} from "vue";

const searchRef = casesReducer.search
const pagination = casesReducer.pagination


// Hver gang search ref ændres køre den følgende
// Den for den udregnede mængde af sider fra pagination i casesReduser filen
// Den for også de matchende resultater fra searchFilteredCases is casesReducer 
//     som den sætter til at være lig antallet af cases, som den bruger i pagination udregningen
watch(searchRef, () => {
    pagination.value.page = 1
    pagination.value.dataLength = casesReducer.searchFilteredCases().length

    // hvad betyder deep: true?
}, {deep: true})
</script>

<template>
    <!-- Pagination bliver kun rendered hvis der faktisk er nogle cases der matcher søgeresultatet -->
    <section v-if="pagination.getNumberOfPages() > 0">

        <!-- når denne knap bliver trykket på trækkes 1 fra page (-- er shorthand for -1 ) -->
        <div @click="pagination.page--" :class="{
                
                // man er på første side (side 1), bliver knappen ikke rendered, da den for en class der hedder invisible
                invisible: pagination.page === 1
            }">
            <font-awesome-icon icon="caret-left"/>
        </div>

        <div>
            <p>{{ pagination.page }} af {{ pagination.getNumberOfPages() }}</p>
        </div>
        

        <!-- Denne funktion gør det modsatte, den ligge 1 til -->
        <div @click="pagination.page++" :class="{
                // Hvis siden (altså side tallet) er større end eller lig med (Kan nok kune blive lig med?) bliver classen invisible tilføjet og iconet forsvinder
                invisible: pagination.page >= pagination.getNumberOfPages()
            }">
            <font-awesome-icon icon="caret-right"/>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.invisible {
    visibility: hidden;
}

section {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: var(--default-padding);

    div:first-child,
    div:last-child {
        border-radius: var(--border-radius);
        cursor: pointer;
        padding: var(--default-padding);

        &:hover {
            background-color: var(--bg-primary);
            color: var(--text-secondary);
        }
    }
}
</style>