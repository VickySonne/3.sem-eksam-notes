<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
    <section>
        <div>
            <font-awesome-icon icon="caret-left"/>
        </div>

        <div>
            <p>1 af 3</p>
        </div>

        <div>
            <font-awesome-icon icon="caret-right"/>
        </div>
    </section>
</template>

<style lang="scss" scoped>
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