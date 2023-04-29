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
    }
})
</script>

<template>
    <div class="container">
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
    background-color: #fff;
    border-radius: var(--border-radius);
    cursor: pointer;
    position: relative;
}

select {
    padding: var(--default-padding);
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