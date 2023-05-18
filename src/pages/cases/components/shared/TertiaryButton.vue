<script setup>
    defineProps({
        text: {
            type: String,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
    })
</script>

<template>
    <div>
        <p @click="callback">{{ text }}</p>
    </div>
</template>

<style lang="scss" scoped>
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
        cursor: pointer;

            &:hover{
                text-decoration: underline;
            }
        }
    }
    
</style>