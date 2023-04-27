<script setup>
import router from "@/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

defineProps({
    destination: {
        type: String,
        required: false,
        default: '/',
    }
})
</script>

<template>
    <div @click="router.push({ path: destination })">
        <font-awesome-icon icon="arrow-left" />

        <p>
            <slot></slot>
        </p>
    </div>
</template>

<style lang="scss" scoped>
div {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  gap: 1rem;
}
</style>