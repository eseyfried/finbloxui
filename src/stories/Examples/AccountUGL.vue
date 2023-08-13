<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="page">
        <ToggleTheme :class="['primary-button']" />
        <h1 class="mb-5">Unrealized Gains/Losses</h1>
        <UGLGrid :lots="unrealizedLots" :dataTableOptions="{ groupRowsBy: 'symbol', showTotals: true, collapsible: true, groupedTotalsLocation: 'top' }">
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
<script setup>
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ToggleTheme from "./ToggleTheme";
import UGLGrid from '@/components/Core/UGLGrid/UGLGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
const { unrealizedLots } = storeToRefs(useDemoStore());


</script>
<style lang="scss" scoped>
.page {
    margin: 2rem;
}
.page > h1 {
    margin-top: 4rem;
    border-bottom: 1px solid #eeeeee;
}
</style>