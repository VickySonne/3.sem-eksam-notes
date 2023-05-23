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

        <div>
            <DetailsInput>
                <template #label>
                    <InputLabel>Ansvarlige</InputLabel>
                </template>

                <CustomSelect>
                    <CustomSelectItem></CustomSelectItem>
                </CustomSelect>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Status</InputLabel>
                </template>

                <CustomSelect>
                    <CustomSelectItem></CustomSelectItem>
                </CustomSelect>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Tags</InputLabel>
                </template>

                <CustomSelect>
                    <CustomSelectItem></CustomSelectItem>
                </CustomSelect>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Afhenting</InputLabel>
                </template>

                <DateInput/>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Pris (Intern)</InputLabel>
                </template>

                <PriceInput/>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Beskrivelse</InputLabel>
                </template>

                <TextareaInput/>
            </DetailsInput>
        </div>

    </SectionContainer>
</template>

<style lang="scss" scoped>
section > div {
  display: grid;
  gap: var(--default-padding);
  grid-template-columns: repeat(4, 1fr);

  & > div {
    grid-column: span 2;
  }

  :nth-child(4),
  :nth-child(5) {
    grid-column: span 1;
  }

  :last-child {
    grid-column: span 4;
  }
}
</style>