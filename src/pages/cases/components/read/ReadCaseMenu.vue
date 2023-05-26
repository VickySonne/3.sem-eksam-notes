<script setup>
import CustomSelectItem from '@/components/inputs/dropdowns/CustomSelectItem.vue';
import CustomSelect from '@/components/inputs/dropdowns/CustomSelect.vue';
import TertiaryButton from '@/components/buttons/TertiaryButton.vue';
import router from "@/router";
</script>

<template>
<div>
    <TertiaryButton text="Ret sag" :callback="() => router.push('/case/' + router.currentRoute.value.params.id + '/edit')"/>
    <TertiaryButton text="Kontakt" :callback="() => {}"/>
    <TertiaryButton text="Print" :callback="() => {}"/>
    <TertiaryButton text="Gem" :callback="() => {}"/>
    <span></span>
    <CustomSelect :is-call-to-action="true">
        <CustomSelectItem>Opdater status</CustomSelectItem>
    </CustomSelect> 
</div>
</template>

<style lang="scss" scoped>
div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--default-gap);

    & > span{
        width: 3px;
        height: 30px;
        background-color: var(--bg-dark);
        border-radius: var(--border-radius);
    }
}
</style>