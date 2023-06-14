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
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const employeeOptions = handleCaseReducer.employeeOptions
const statusOptions = handleCaseReducer.statusOptions
const selectedDate = handleCaseReducer.selectedDate
const negotiatedPrice = handleCaseReducer.negotiatedPrice
const description = handleCaseReducer.description

// event.target.value repræsenterer den valgte mulighed
// .find finder en employee med id der matcher det fra eventet (den valgte medarbejder)
// opdatere den reaktive referense i reduceren
const setSelectedEmployee = (event) => {
    handleCaseReducer.selectedEmployee.value = employeeOptions.value.find(employee => employee.id === parseInt(event.target.value))
}

const setSelectedStatus = (event) => {
    handleCaseReducer.selectedStatus.value = statusOptions.value.find(status => status.id === parseInt(event.target.value))
}

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

                <CustomSelect :callback="setSelectedEmployee" :is-dark="true">
                    <CustomSelectItem v-for="employee in employeeOptions" :value="employee.id" :key="employee.id">
                        {{ employee.name }}
                    </CustomSelectItem>
                </CustomSelect>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Status</InputLabel>
                </template>

                <CustomSelect :callback="setSelectedStatus" :is-dark="true">
                    <CustomSelectItem v-for="status in statusOptions" :value="status.id" :key="status.id">
                        {{ status.name }}
                    </CustomSelectItem>
                </CustomSelect>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Tags</InputLabel>
                </template>

                <CustomSelect :is-dark="true">
                    <CustomSelectItem>Kommer snart</CustomSelectItem>
                </CustomSelect>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Afhenting</InputLabel>
                </template>

                <DateInput :value="selectedDate" :callback="(event) => handleCaseReducer.parseDate(event)"/>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Pris (Intern)</InputLabel>
                </template>

                <PriceInput :value="negotiatedPrice" :callback="(event) => negotiatedPrice = event.target.value"/>
            </DetailsInput>

            <DetailsInput>
                <template #label>
                    <InputLabel>Beskrivelse</InputLabel>
                </template>

                <TextareaInput :value="description" :callback="(event) => description = event.target.value"/>
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