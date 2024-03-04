<template>
    <Story
        title="Core/DataTable/ColumnSelector"
        auto-props-disabled
    >
        <template #controls="{state}">

            <HstJson v-model="state.columns" title="columns" />
            <PropDesc :component="ColumnSelector" prop="columns" />
            <HstText v-model="state.buttonLabel" title="buttonLabel" />
            <PropDesc :component="ColumnSelector" prop="buttonLabel" />
            <HstJson v-model="state.defaultSelectedColumns" title="defaultSelectedColumns" />
            <PropDesc :component="ColumnSelector" prop="defaultSelectedColumns" />
            
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <ColumnSelector
                        :columns="state.columns"
                        :buttonLabel="state.buttonLabel"
                        :defaultSelectedColumns="state.defaultSelectedColumns"
                    />
                </div>
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';

import ColumnSelector from '@/components/DataTable/ColumnSelector/ColumnSelector';

const columns = [
    { "name": "column_a", "label": "Column A"},
    { "name": "column_b", "label": "Column B"},
    { "name": "column_c", "label": "Column C"},
    { "name": "column_d", "label": "Column D"},
]
const state = reactive({
    columns: defaultValue(ColumnSelector, 'columns', columns),
    buttonLabel: defaultValue(ColumnSelector, 'buttonLabel'),
    // defaultSelectedColumns: defaultValue(ColumnSelector, 'defaultSelectedColumns'),
    defaultSelectedColumns: defaultValue(ColumnSelector, 'defaultSelectedColumns', [columns[2]]),
    

})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}



</script>