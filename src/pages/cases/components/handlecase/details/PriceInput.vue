<script setup>
defineProps({
    value: {
        type: String,
        required: true,
    },
    callback: {
        type: Function,
        required: true,
    }
})
</script>

<template>
    <div>
        <input type="number" :value="value" @input="callback($event)" placeholder="Indtast pris">
        <p>kr.</p>
    </div>
</template>

<style lang="scss" scoped>

div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: var(--default-padding);
    background-color: var(--bg-white);

    input {
        appearance: textfield;
        width: 100%;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }

    }

    

}

</style>