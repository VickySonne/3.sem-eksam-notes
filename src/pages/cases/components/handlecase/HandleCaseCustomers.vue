<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import SearchInput from "../../../../components/inputs/SearchInput.vue";
import TertiaryButton from "../../../../components/buttons/TertiaryButton.vue";
import ActionToolbar from "../shared/ActionToolbar.vue";
import NoCustomer from "../handlecase/customers/NoCustomer.vue";
import ChosenCustomer from "./customers/ChosenCustomer.vue";
</script>

<template>
    <div>
        <SectionHeader title="Kunder"> 
            <TertiaryButton text="Anden betaler"></TertiaryButton>
            <!-- tertiary button vises kun når kunde er valgt -->
        </SectionHeader>

        <ActionToolbar>
            <template #contentleft>
                <SearchInput placeholder="Find kunde..."></SearchInput>
                <TertiaryButton text="Opret ny kunde" emphasised="true"></TertiaryButton>
            </template>
            <!-- action toolbar skjules når kunde er valgt -->
        </ActionToolbar>

        <SectionContainer>
            <ChosenCustomer />
            <NoCustomer text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>

    <!-- denne div vises kun når anden betaler er valgt -->
    <div>
        <SectionHeader title="Anden betaler" />
        
        <!-- action toolbar skjules når anden betaler er indtastet -->
        <ActionToolbar>
            <template #contentleft>
                <SearchInput placeholder="Find kunde..."></SearchInput>
                <TertiaryButton text="Opret ny kunde" emphasised="true"></TertiaryButton>
            </template>
            <template #contentright>
                <TertiaryButton text="Luk"></TertiaryButton>
            </template>
        </ActionToolbar>

        <SectionContainer>
            <ChosenCustomer />
            <NoCustomer text="Ingen kunde fundet. Klik for at oprette nye kunde."></NoCustomer>
        </SectionContainer>
    </div>
</template>

<style>

</style>
