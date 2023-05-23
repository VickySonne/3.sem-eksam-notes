<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import casesReducer from "@/pages/cases/components/index/casesReducer";
import {watch} from "vue";

const searchRef = casesReducer.search
const pagination = casesReducer.pagination

watch(searchRef, () => {
    pagination.value.page = 1
    pagination.value.dataLength = casesReducer.searchFilteredCases().length
}, {deep: true})
</script>

<template>
    <section v-if="pagination.getNumberOfPages() > 0">
        <div @click="pagination.page--" :class="{
                invisible: pagination.page === 1
            }">
            <font-awesome-icon icon="caret-left"/>
        </div>

        <div>
            <p>{{ pagination.page }} af {{ pagination.getNumberOfPages() }}</p>
        </div>

        <div @click="pagination.page++" :class="{
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