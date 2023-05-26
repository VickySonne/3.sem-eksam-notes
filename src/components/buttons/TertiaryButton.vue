<script setup>
    defineProps({
        text: {
            type: String,
            required: true
        },
        callback: {
            type: Function,
            required: false,
            default: () => {}
        },
        emphasised: {
            type: Boolean,
            required: false,
            default: false
        },
        danger: {
            type: Boolean,
            required: false,
            default: false
        }
    })
</script>

<template>
    <div>
        <p @click="callback" :class="{
            emphasised: emphasised,
            danger: danger,
        }">{{ text }}</p>
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

        .emphasised{
            font-weight: var(--text-heavy);
        }

        .danger:hover {
            color: var(--text-danger);
        }
    }
    
</style>