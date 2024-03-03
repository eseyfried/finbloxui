<template>
    <Story
        title="Core/DataTable/Column"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstSelect v-model="state.field" title="field" :options="columns" />
            <PropDesc :component="Column" prop="field" />
            <HstText v-model="state.header" title="header" />
            <PropDesc :component="Column" prop="header" />
            <HstText v-model="state.emptyString" title="emptyString" />
            <PropDesc :component="Column" prop="emptyString" />
            <HstSelect v-model="state.formatters" title="formatters" :options="['percent','currency', 'change-indicator']"/>
            <PropDesc :component="Column" prop="formatters" />
            <HstSelect v-model="state.type" title="type" :options="['data','actions', 'quote']"/>
            <PropDesc :component="Column" prop="type" />

            <HstCheckbox v-model="state.showTotal" title="showTotal" />
            <PropDesc :component="Column" prop="showTotal" />
            <HstCheckbox v-model="state.sortable" title="sortable" />
            <PropDesc :component="Column" prop="sortable" />


            <HstJson v-model="state.quoteDetailOptions" title="quoteDetailOptions" />
            <PropDesc :component="Column" prop="quoteDetailOptions" />
            <HstJson v-model="state.contextMenuOptions" title="contextMenuOptions" />
            <PropDesc :component="Column" prop="contextMenuOptions" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                            :showTotal="state.showTotal"
                            :sortable="state.sortable"
                            :formatters="state.formatters"
                            :emptyString="state.emptyString"
                            :type="state.type"
                            :quoteDetailOptions="state.quoteDetailOptions"
                            :contextMenuOptions="state.contextMenuOptions"
                        />
                    </DataTable>
                </div>
            </template>
        </Variant>

        <Variant title="Custom Formatter" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DataTable
                        :rows="state.rows"
                        :showTotals="state.showTotals"
                    >
                        <Column
                            :field="state.field"
                            :header="state.header"
                            :showTotal="state.showTotal"
                            :sortable="state.sortable"
                            :formatters="(value) => `my-previx-${value}`"
                            :emptyString="state.emptyString"
                            :type="state.type"
                            :quoteDetailOptions="state.quoteDetailOptions"
                            :contextMenuOptions="state.contextMenuOptions"
                        />
                    </DataTable>
                </div>
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { useDummyData } from "@/../.histoire/modules/useClientData";
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import * as formatters from "@/modules/useFormatter";

import DataTable from '@/components/DataTable/DataTable';
import Column from '@/components/DataTable/Column/Column';


const state = reactive({
    rows: useDummyData(30),
    showTotals: defaultValue(DataTable, 'showTotals', true),
    field: defaultValue(Column, 'field', 'id'),
    header: defaultValue(Column, 'header', 'Id'),
    showTotal: defaultValue(Column, 'showTotal'),
    sortable: defaultValue(Column, 'sortable'),
    formatters: defaultValue(Column, 'formatters'),
    emptyString: defaultValue(Column, 'emptyString'),
    type: defaultValue(Column, 'type'),
    quoteDetailOptions: defaultValue(Column, 'quoteDetailOptions'),
    contextMenuOptions: defaultValue(Column, 'contextMenuOptions', {'menuItems':[{ url: null, label: "Action 1" }, { url: null, label: "Action 2" }]}),

})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

const columns = Object.keys(state.rows[0])

</script>