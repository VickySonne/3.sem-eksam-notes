<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseInfo from "../read/details/CaseInfo.vue";
import CaseInfoList from "../read/details/CaseInfoList.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";

const caseStatus = handleCaseReducer.selectedStatus
const responsibleEmployee = handleCaseReducer.selectedEmployee
const pickupDate = handleCaseReducer.selectedDate
const customer = handleCaseReducer.selectedCustomer
const negotiatedPrice = handleCaseReducer.negotiatedPrice
const description = handleCaseReducer.description
const tasks = handleCaseReducer.selectedTasks
const secondaryPayee = handleCaseReducer.secondaryPayee
const selectedProducts = handleCaseReducer.selectedProducts
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opsummering" />
        </template>

        <div>
            <CaseInfo v-if="caseStatus" label="Status:">{{ caseStatus.name }}</CaseInfo>
            <CaseInfo v-if="responsibleEmployee" label="Ansvarlig:">{{ responsibleEmployee.name }}</CaseInfo>
            <CaseInfo v-if="customer" label="Kunde:">{{ customer.name }}</CaseInfo>
            <CaseInfo v-if="secondaryPayee" label="Anden betaler:">{{ secondaryPayee.name }}</CaseInfo>

            <CaseInfo v-if="pickupDate" label="Afhentning d.">{{ pickupDate }}</CaseInfo>
            <CaseInfo v-if="negotiatedPrice" label="Aftalt pris:">{{ negotiatedPrice }}</CaseInfo>
            <CaseInfo v-if="description" label="Beskrivelse:">{{ description }}</CaseInfo>

            <CaseInfo label="Opgaver:">
                <ul>
                    <CaseInfoList v-for="task in tasks" :content="task.name" :key="task.id"/>
                </ul>
            </CaseInfo>

            <CaseInfo label="Produkter:">
                <ul>
                    <CaseInfoList v-for="product in selectedProducts" :content="product.name" :count="product.count" :key="product.id"/>
                </ul>
            </CaseInfo>
        </div>
        
    </SectionContainer>
</template>

<style lang="scss" scoped>
    div {
        display: grid;
        gap: var(--half-padding);
    }
</style>
