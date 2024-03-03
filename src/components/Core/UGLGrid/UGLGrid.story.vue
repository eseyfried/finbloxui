<template>
    <Story
        title="Accounts/UGL/UGLGrid"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.ugl" title="lots" />
            <PropDesc :component="UGLGrid" prop="lots" />
            <HstJson v-model="state.dataTableOptions" title="dataTableOptions" />
            <PropDesc :component="UGLGrid" prop="dataTableOptions" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />
                        <Column field="price" header="Price" :showTotal="true" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>

        <Variant title="Re-order Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />                     
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="price" header="Price" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>

        <Variant title="Formatted Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" :formatters="(value) => value.toUpperCase()" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" formatters="currency" :showTotal="true" />
                        <Column field="price" header="Price" formatters="currency" />
                        <Column field="market_value" header="Market Value" formatters="currency" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :formatters="['change-indicator','currency']" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" formatters="date" />
                        <Column field="transaction_date" header="Date" formatters="date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>

        <Variant title="Without Column Totals" :init-state="() => initState({ 'dataTableOptions': { ...state.dataTableOptions, showTotals: false  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />
                        <Column field="price" header="Price" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>

        <Variant title="Without Column Selector" :init-state="() => initState({ 'dataTableOptions': { ...state.dataTableOptions, columnSelector: false  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />
                        <Column field="price" header="Price" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>
        <Variant title="With Action Column " :init-state="() => initState()">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />
                        <Column field="price" header="Price" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                        <Column header="Actions" field="action" type="actions" :contextMenuOptions="actionMenuOptions" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>

        <Variant title="Filterable Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol">
                            <ColumnFilter filterType="text" operator="equality" />
                        </Column>
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true">
                            <ColumnFilter filterType="text" operator="comparison" />
                        </Column>
                        <Column field="cost_basis" header="Cost Basis" formatters="currency" :showTotal="true">
                            <ColumnFilter filterType="text" operator="comparison" />
                        </Column>
                        <Column field="price" header="Price" formatters="currency">
                            <ColumnFilter filterType="text" operator="comparison" />
                        </Column>
                        <Column field="market_value" header="Market Value" formatters="currency" :showTotal="true">
                            <ColumnFilter filterType="text" operator="comparison" />
                        </Column>
                        <Column field="unrealized_gl" header="Gain/Loss" :formatters="['change-indicator','currency']" :showTotal="true">
                            <ColumnFilter filterType="text" operator="comparison" />
                        </Column>
                        <Column field="duration" header="Duration">
                            <ColumnFilter filterType="select" />
                        </Column>
                        <Column field="open_date" header="Purchase Date" formatters="date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>

        <Variant title="Without Grouping" :init-state="() => initState({ 'dataTableOptions': { ...state.dataTableOptions, groupRowsBy: null  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />
                        <Column field="price" header="Price" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>
        <Variant title="With Totals on Bottom" :init-state="() => initState({ 'dataTableOptions': { ...state.dataTableOptions, groupedTotalsLocation: 'bottom'  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <UGLGrid :lots="state.ugl" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" :showTotal="true" />
                        <Column field="cost_basis" header="Cost Basis" :showTotal="true" />
                        <Column field="price" header="Price" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="unrealized_gl" header="Gain/Loss" :showTotal="true" />
                        <Column field="duration" header="Duration" />
                        <Column field="open_date" header="Purchase Date" />
                    </UGLGrid>
                </div>
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useUGLLotsData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';
import * as formatters from "@/modules/useFormatter";
import UGLGrid from '@/components/Core/UGLGrid/UGLGrid.vue';
import Column from '@/components/DataTable/Column/Column';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter';




const actionMenuOptions = {
    menuItems: [
            { url: null, label: "Action 1" },
            { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Action 2" },
            { url: null, label: "Action 3", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ]
}


const state = reactive({
    ugl: useUGLLotsData(),
    dataTableOptions: { groupRowsBy: 'symbol', showTotals: true, collapsible: true, groupedTotalsLocation: 'top' },
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>