<script setup>
import TertiaryButton from '../../../../components/buttons/TertiaryButton.vue';
import SectionContainer from '../../../../components/layout/section/SectionContainer.vue';
import SectionHeader from '../../../../components/layout/section/SectionHeader.vue';
import InputLabel from '../handlecase/details/InputLabel.vue';
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Dokumenter" />
        </template>
        <div class="document-info">
            <div>
                <InputLabel>filer</InputLabel>
                <TertiaryButton text="Ingen Filer. Klik for at tilføje en fil"></TertiaryButton>
            </div>
            <div>
                <InputLabel>noter</InputLabel>
               <TertiaryButton text="Ingen Noter. Klik for at tilføje en note"></TertiaryButton>
            </div>
            
        </div>
    </SectionContainer>
</template>

<style lang="scss" scoped>
.document-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    & > div{
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);
    }
}
</style>