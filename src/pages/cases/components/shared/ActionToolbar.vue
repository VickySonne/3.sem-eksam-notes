<script setup>
</script>

<template>
    <div>
        <div>
            <slot name="contentleft"></slot>
        </div>
        <div>
            <slot name="contentright"></slot>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: var(--default-padding);

        &:first-child {
            display: flex;
            flex-direction: row;
            gap: var(--default-gap);
        }
    }
</style>