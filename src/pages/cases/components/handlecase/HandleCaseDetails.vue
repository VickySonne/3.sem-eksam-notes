<script setup>
import SectionContainer from '../../../../components/layout/section/SectionContainer.vue';
import SectionHeader from '../../../../components/layout/section/SectionHeader.vue';
import DetailsInput from './details/DetailsInput.vue';
import InputLabel from './details/InputLabel.vue';
import CustomSelect from '../../../../components/inputs/dropdowns/CustomSelect.vue';
import CustomSelectItem from '../../../../components/inputs/dropdowns/CustomSelectItem.vue';
import DateInput from './details/DateInput.vue';
import PriceInput from './details/PriceInput.vue';
import TextareaInput from './details/TextareaInput.vue';


</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Detaljer"></SectionHeader>
        </template>

        <div class="content">
            <div class="flex-row">
                <DetailsInput class="half-width">
                    <template #label>
                        <InputLabel>Ansvarlige</InputLabel>
                    </template>

                    <CustomSelect>
                        <CustomSelectItem></CustomSelectItem>
                    </CustomSelect>
                </DetailsInput>

                <DetailsInput class="half-width">
                    <template #label>
                        <InputLabel>Status</InputLabel>
                    </template>

                    <CustomSelect>
                        <CustomSelectItem></CustomSelectItem>
                    </CustomSelect>
                </DetailsInput>
            </div>

            <div class="flex-row">
                <div class="half-width">
                    <DetailsInput>
                        <template #label>
                            <InputLabel>Tags</InputLabel>
                        </template>

                        <CustomSelect>
                            <CustomSelectItem></CustomSelectItem>
                        </CustomSelect>
                    </DetailsInput>
                </div>
                
                <div class="flex-row">
                    <DetailsInput class="half-width">
                        <template #label>
                            <InputLabel>Afhenting</InputLabel>
                        </template>

                        <DateInput />
                    </DetailsInput>

                    <DetailsInput class="half-width">
                        <template #label>
                            <InputLabel>Pris (Intern)</InputLabel>
                        </template>

                        <PriceInput />
                    </DetailsInput>
                </div>
            </div>

            <div>
                <DetailsInput>
                    <template #label>
                        <InputLabel>Beskrivelse</InputLabel>
                    </template>

                    <TextareaInput />
                </DetailsInput>
            </div>
        </div>
        
    </SectionContainer>
</template>

<style lang="scss" scoped>
    .content{
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);
    }

    @media only screen and (min-width: 1200px){
        .flex-row{
            display: flex;
            flex-direction: row;
            gap: var(--default-gap);
        }

        .half-width{
            width: 50%
        }
    }
    
</style>