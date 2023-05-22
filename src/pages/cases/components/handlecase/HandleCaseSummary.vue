<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import CaseInfo from "../read/details/CaseInfo.vue";
import CaseInfoList from "../read/details/CaseInfoList.vue";
</script>

<template>
    <SectionContainer>
        <template #header>
            <SectionHeader title="Opsummering" />
        </template>

        <div>
            <CaseInfo label="Status:"></CaseInfo>
            <CaseInfo label="Ansvarlig:"></CaseInfo>
            <CaseInfo label="Afhentning d."></CaseInfo>
            <CaseInfo label="Aftalt pris:"></CaseInfo>
            <CaseInfo label="Beskrivelse:"></CaseInfo>
            <CaseInfo label="Opgaver:">
                <ul>
                    <CaseInfoList content="test"/>
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
    div{
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);
    }
</style>
