<script setup>
import CustomSelectItem from '@/components/dropdowns/CustomSelectItem.vue';
import CustomSelect from '@/components/dropdowns/CustomSelect.vue';
import TertiaryButton from '@/pages/cases/components/shared/TertiaryButton.vue';
</script>

<template>
<div>
    <TertiaryButton text="Ret sag" :callback="() => {}"/>
    <TertiaryButton text="Kontakt" :callback="() => {}"/>
    <TertiaryButton text="Print" :callback="() => {}"/>
    <TertiaryButton text="Gem" :callback="() => {}"/>
    <span></span>
    <CustomSelect>
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