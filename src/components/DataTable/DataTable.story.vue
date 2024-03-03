<template>
    <Story
        title="Core/DataTable/DataTable"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.rows" title="rows" />
            <PropDesc :component="DataTable" prop="rows" />
            <!-- <HstText v-model="state.virtualScrollHeight" title="virtualScrollHeight" />
            <PropDesc :component="DataTable" prop="virtualScrollHeight" /> -->
            <HstText v-model="state.groupRowsBy" title="groupRowsBy" />
            <PropDesc :component="DataTable" prop="groupRowsBy" />
            <HstText v-model="state.teleportTo" title="teleportTo" />
            <PropDesc :component="DataTable" prop="teleportTo" />
            <HstSelect v-model="state.groupedTotalsLocation" title="groupedTotalsLocation" :options="['top','bottom']"/>
            <PropDesc :component="DataTable" prop="groupedTotalsLocation" />
            <!-- <HstCheckbox v-model="state.useVirtualScroll" title="useVirtualScroll" />
            <PropDesc :component="DataTable" prop="useVirtualScroll" /> -->
            <HstCheckbox v-model="state.columnSelector" title="columnSelector" />
            <PropDesc :component="DataTable" prop="columnSelector" />
            <HstCheckbox v-model="state.showTotals" title="showTotals" />
            <PropDesc :component="DataTable" prop="showTotals" />
            <HstCheckbox v-model="state.collapsible" title="collapsible" />
            <PropDesc :component="DataTable" prop="collapsible" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <DataTable
                        :rows="state.rows"
                        :useVirtualScroll="state.useVirtualScroll"
                        :virtualScrollHeight="state.virtualScrollHeight"
                        :columnSelector="state.columnSelector"
                        :teleportTo="state.teleportTo"
                        :groupRowsBy="state.groupRowsBy"
                        :showTotals="state.showTotals"
                        :collapsible="state.collapsible"
                        :groupedTotalsLocation="state.groupedTotalsLocation"
                    >
                        <Column field="id" header="Id" />
                        <Column field="street_1" header="Street 1" />
                        <Column field="street_2" header="Street 2" />
                        <Column field="city" header="City" />
                        <Column field="state" header="State" />
                        <Column field="postal_code" header="Postal Code" />
                    </DataTable>
                </div>
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { reactive,computed,ref } from 'vue'
import { useDummyData } from "@/../.histoire/modules/useClientData";
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import * as formatters from "@/modules/useFormatter";
import { useVirtualList } from "@vueuse/core";
import DataTable from '@/components/DataTable/DataTable';
import Column from '@/components/DataTable/Column/Column';


const state = reactive({
    rows: useDummyData(30),
    useVirtualScroll: defaultValue(DataTable, 'useVirtualScroll'),
    virtualScrollHeight: defaultValue(DataTable, 'virtualScrollHeight'),
    columnSelector: defaultValue(DataTable, 'columnSelector'),
    teleportTo: defaultValue(DataTable, 'teleportTo'),
    groupRowsBy: defaultValue(DataTable, 'groupRowsBy'),
    showTotals: defaultValue(DataTable, 'showTotals'),
    collapsible: defaultValue(DataTable, 'collapsible'),
    groupedTotalsLocation: defaultValue(DataTable, 'groupedTotalsLocation'),

})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>