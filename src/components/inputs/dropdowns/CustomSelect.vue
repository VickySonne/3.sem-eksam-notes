<script setup>
defineProps({
    multiple: {
        type: Boolean,
        required: false,
        default: false
    },
    callback: {
        type: Function,
        required: false,
        default: (event) => {
            console.log(event.target.value)
        }
    },
    isCallToAction: {
        type: Boolean,
        required: false,
        default: false
    },
    isDark: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<template>
    <div class="container" :class="{
        cta: isCallToAction,
        'is-dark': isDark
    }">
        <select @change="callback($event)" :multiple="multiple">
            <slot></slot>
        </select>

        <div class="icon">
            <font-awesome-icon icon="angle-down"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    background-color: var(--CTA-secondary);
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    cursor: pointer;
    position: relative;

    &.is-dark {
        background-color: var(--bg-white);
    }

    &.cta {
        background-color: var(--CTA-primary);
        color: var(--text-secondary);
    }
}

select {
    padding: var(--default-padding);
    padding-right: 2.5rem;
    text-align: left;
    width: 100%;
}

.icon {
    position:  absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    pointer-events: none;
}
</style>