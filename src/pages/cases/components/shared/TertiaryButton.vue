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
<p @click="callback">{{ text }}</p>
</template>

<style lang="scss" scoped>
p {
cursor: pointer;
&:hover{
    text-decoration: underline;
}
}
</style>