<script setup>
import H4Label from './H4Label.vue';

import CustomSelect from "@/components/shared/forms/CustomSelect.vue";
import CustomSelectItem from "@/components/shared/forms/CustomSelectItem.vue";
import NumberInput from './NumberInput.vue';
import BackgroundBoxes from './BackgroundBoxes.vue';
import DateInput from './DateInput.vue';

</script>

<template>
    <section>
        <h3>h3 title component here</h3>

        <BackgroundBoxes>
            <div class="display-row">
                <div>
                    <H4Label>
                        Ansvarlig
                    </H4Label>

                    <CustomSelect :callback="updateEmployee">
                        <CustomSelectItem v-for="employee in employeeOptions" :value="employee.id"
                                            :key="employee.id" :selected="responsibleEmployee.id === employee.id">
                            {{ employee.name }}
                        </CustomSelectItem>
                    </CustomSelect>
                </div>

                <div>
                    <H4Label>
                        Status
                    </H4Label>

                    <CustomSelect :callback="updateStatus">
                        <CustomSelectItem v-for="option in statusOptions" :value="option.id"
                                            :key="option.id" :selected="status.id === option.id">
                            {{ option.name }}
                        </CustomSelectItem>
                    </CustomSelect>
                </div>
            </div>
            
            <div class="display-row">
                <div>
                    <H4Label>
                        Tags
                    </H4Label>

                    <CustomSelect >
                        <CustomSelectItem>
                            Tags kommer snart
                        </CustomSelectItem>
                    </CustomSelect>
                </div>

                <div class="display-row">
                    <div>
                        <H4Label>
                            Afhentning
                        </H4Label>

                        <DateInput />
                    </div>

                    <div>
                        <H4Label>
                            Aftalt Pris (Internt)
                        </H4Label>

                        <NumberInput :data="{placeholder:'Indtast pris',
                                            unit:'kr.'}"/>
                    </div>
                </div>
            </div>
            
        </BackgroundBoxes>
    </section>
    
</template>

<style lang="scss" scoped>
    section{
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);

        & > div{
            display: flex;
            flex-direction: column;
            gap: var(--default-gap);

            .display-row{
                display: flex;
                flex-direction: column;
                gap: var(--default-gap);

                @media screen and (min-width: 1200px) {
                    flex-direction: row;
                }
                
                & > div{
                    display: flex;
                    flex-direction: column;
                    gap: var(--default-gap);

                    @media screen and (min-width: 1200px) {
                        // flex-direction: row;
                        // width: 50%;
                }
                }
            
            }
        }
    }

    

    
</style>