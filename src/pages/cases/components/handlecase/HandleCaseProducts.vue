<script setup>
import SectionContainer from "@/components/layout/section/SectionContainer.vue";
import SectionHeader from "@/components/layout/section/SectionHeader.vue";
import ActionToolbar from "../shared/ActionToolbar.vue";
import SearchInput from "../../../../components/inputs/SearchInput.vue";
import TertiaryButton from "../../../../components/buttons/TertiaryButton.vue";
import SecondaryButton from "../../../../components/buttons/SecondaryButton.vue";
import ProductTable from "../handlecase/products/ProductTable.vue";

</script>

<template>
    <div class="wrapper">
        <div>
            <SectionHeader title="Produkter" />

            <ActionToolbar>
                <template #contentleft>
                    <SearchInput placeholder="Find varer..." :search-callback="() => {}"/>

                    <SecondaryButton title="Opret ny vare">
                        <font-awesome-icon icon="plus" />
                    </SecondaryButton>

                    <TertiaryButton text="Tilføj kundeenhed"/>
                </template>
            </ActionToolbar>
        </div>

        <SectionContainer>
            <ProductTable />                
        </SectionContainer>
    </div>
</template>

<Style lang="scss" scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);
    }
</Style>