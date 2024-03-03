<template>
    <Story
        title="Core/DataTable/ColumnFilter"
        auto-props-disabled
    >
        <template #controls="{state}">

            <HstSelect v-model="state.filterType" title="filterType" :options="propOptions(ColumnFilter, 'filterType')" />
            <PropDesc :component="ColumnFilter" prop="filterType" />


            <HstSelect v-model="state.operator" title="operator" :options="propOptions(ColumnFilter, 'operator')" />
            <PropDesc :component="ColumnFilter" prop="operator" />

            <HstText v-model="state.clearButtonLabel" title="clearButtonLabel" />
            <PropDesc :component="ColumnFilter" prop="clearButtonLabel" />
            <HstText v-model="state.applyButtonLabel" title="applyButtonLabel" />
            <PropDesc :component="ColumnFilter" prop="applyButtonLabel" />
            <HstText v-model="state.triggerButtonLabel" title="triggerButtonLabel" />
            <PropDesc :component="ColumnFilter" prop="triggerButtonLabel" />

        </template>

        <Variant title="Default" :init-state="() => initState()">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                        >
                            <ColumnFilter 
                                :filterType="state.filterType"
                                :operator="state.operator"
                                :clearButtonLabel="state.clearButtonLabel"
                                :applyButtonLabel="state.applyButtonLabel"
                                :triggerButtonLabel="state.triggerButtonLabel"
                            />
                        </Column>
                    </DataTable>
                </div>
            </template>
        </Variant>

        <Variant title="Freeform Equality Filter" :init-state="() => initState({ 'filterType':'text', 'operator': 'equality' })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                        >
                            <ColumnFilter 
                                :filterType="state.filterType"
                                :operator="state.operator"
                                :clearButtonLabel="state.clearButtonLabel"
                                :applyButtonLabel="state.applyButtonLabel"
                                :triggerButtonLabel="state.triggerButtonLabel"
                            />
                        </Column>
                    </DataTable>
                </div>
            </template>
        </Variant>

        <Variant title="List Based Equality Filter" :init-state="() => initState({ 'filterType':'select', 'operator': 'equality' })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                        >
                            <ColumnFilter 
                                :filterType="state.filterType"
                                :operator="state.operator"
                                :clearButtonLabel="state.clearButtonLabel"
                                :applyButtonLabel="state.applyButtonLabel"
                                :triggerButtonLabel="state.triggerButtonLabel"
                            />
                        </Column>
                    </DataTable>
                </div>
            </template>
        </Variant>

        <Variant title="Freeform Comparison Filter" :init-state="() => initState({ 'field': 'postal_code', 'header': 'Postal Code', 'filterType':'text', 'operator': 'comparison' })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                        >
                            <ColumnFilter 
                                :filterType="state.filterType"
                                :operator="state.operator"
                                :clearButtonLabel="state.clearButtonLabel"
                                :applyButtonLabel="state.applyButtonLabel"
                                :triggerButtonLabel="state.triggerButtonLabel"
                            />
                        </Column>
                    </DataTable>
                </div>
            </template>
        </Variant>

        <Variant title="List Based Comparison Filter" :init-state="() => initState({ 'field': 'postal_code', 'header': 'Postal Code', 'filterType':'select', 'operator': 'comparison' })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                        >
                            <ColumnFilter 
                                :filterType="state.filterType"
                                :operator="state.operator"
                                :clearButtonLabel="state.clearButtonLabel"
                                :applyButtonLabel="state.applyButtonLabel"
                                :triggerButtonLabel="state.triggerButtonLabel"
                            />
                        </Column>
                    </DataTable>
                </div>
            </template>
        </Variant>

        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { useDummyData } from "@/../.histoire/modules/useClientData";
import { defaultValue, propOptions } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import * as formatters from "@/modules/useFormatter";

import DataTable from '@/components/DataTable/DataTable';
import Column from '@/components/DataTable/Column/Column';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter';


const state = reactive({
    rows: useDummyData(30),
    showTotals: defaultValue(DataTable, 'showTotals', true),
    field: defaultValue(Column, 'field', 'state'),
    header: defaultValue(Column, 'header', 'State'),

    filterType: defaultValue(ColumnFilter, 'filterType'),
    operator: defaultValue(ColumnFilter, 'operator', 'equality'),

    clearButtonLabel: defaultValue(ColumnFilter, 'clearButtonLabel'),
    applyButtonLabel: defaultValue(ColumnFilter, 'applyButtonLabel'),
    triggerButtonLabel: defaultValue(ColumnFilter, 'triggerButtonLabel','...'),

})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}


</script>