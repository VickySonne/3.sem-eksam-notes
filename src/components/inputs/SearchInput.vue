<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref, watch} from "vue";

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Søg'
    },
    searchCallback: {
        type: Function,
        required: true
    }
})

const searchRef = ref(null);

watch(searchRef, (value) => {
    props.searchCallback(value);
})

const clearSearch = () => {
    searchRef.value = '';
}
</script>

<template>
    <div>
        <font-awesome-icon icon="magnifying-glass"/>
        <input type="text" :placeholder="placeholder" v-model="searchRef">
        <font-awesome-icon :class="{
            invisible: !searchRef
        }" icon="times" @click="clearSearch"/>
    </div>
</template>

<style lang="scss" scoped>
.invisible {
  visibility: hidden;
}

div {
  align-items: center;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  display: flex;
  gap: var(--default-gap);
  padding-inline: var(--default-padding);

  input {
    padding-block: var(--default-padding);
  }

  &:last-child {
    cursor: pointer;
  }
}
</style>