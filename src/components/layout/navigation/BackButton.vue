<script setup>
import router from "@/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
    destination: {
        type: String,
        required: false,
        default: '/',
    },
    requireConfirmation: {
        type: Boolean,
        required: false,
        default: false,
    }
})

const navigate = () => {

    // !(not) gør at når brugeren trykker ok for at forlade siden, returnere confirm false istedet for true
    // how does that work???? Der bliver ikke returneret noget når brugeren trykker nej (true) fordi return stopper funktionen
    // Hvis der bliver returned false, så pusher den.
    if (props.requireConfirmation && !confirm('Er du sikker på du vil forlade siden?')) {
        return;
    }

    router.push({ path: props.destination })
}
</script>

<template>
    <div @click="navigate">
        <font-awesome-icon icon="arrow-left"/>

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
  padding-bottom: 2rem;
  width: fit-content;
}
</style>