<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseInfo from "../read/details/CaseInfo.vue";
import CaseInfoList from "../read/details/CaseInfoList.vue";
import handleCaseReducer from "@/pages/cases/components/handlecase/handleCaseReducer";
import {ref} from "vue";

const summary = ref({
    status: handleCaseReducer.selectedStatus,
    responsibleEmployee: handleCaseReducer.selectedEmployee,
    pickupDate: handleCaseReducer.selectedDate,
    customer: handleCaseReducer.selectedCustomer,
    negotiatedPrice: handleCaseReducer.negotiatedPrice,
    description: handleCaseReducer.description,
    tasks: handleCaseReducer.selectedTasks,
    secondaryPayee: handleCaseReducer.secondaryPayee,
})

</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opsummering" />
        </template>

        <div>
            <CaseInfo v-if="summary.status" label="Status:">{{ summary.status.name }}</CaseInfo>
            <CaseInfo v-if="summary.responsibleEmployee" label="Ansvarlig:">{{ summary.responsibleEmployee.name }}</CaseInfo>
            <CaseInfo v-if="summary.customer" label="Kunde:">{{ summary.customer.name }}</CaseInfo>
            <CaseInfo v-if="summary.secondaryPayee" label="Anden betaler:">{{ summary.secondaryPayee.name }}</CaseInfo>

            <CaseInfo v-if="summary.pickupDate" label="Afhentning d.">{{ summary.pickupDate }}</CaseInfo>
            <CaseInfo v-if="summary.negotiatedPrice" label="Aftalt pris:">{{ summary.negotiatedPrice }}</CaseInfo>
            <CaseInfo v-if="summary.description" label="Beskrivelse:">{{ summary.description }}</CaseInfo>

            <CaseInfo label="Opgaver:">
                <ul>
                    <CaseInfoList v-for="task in summary.tasks" :content="task.name" :key="task.id"/>
                </ul>
            </CaseInfo>

            <CaseInfo label="Produkter:">
                <ul>
                    <CaseInfoList content="test" count="2"/>
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
