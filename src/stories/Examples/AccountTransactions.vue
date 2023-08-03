<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="page">
        <ToggleTheme :class="['primary-button']" />
        <h1 class="mb-5">Transactions</h1>
        <TransactionsGrid :transactions="transactions">
            <Column field="symbol" header="Symbol">
                <ColumnFilter filterType="text" operator="equality" />
            </Column>
            <Column field="description" header="Description" />
            <Column field="quantity" header="Quantity">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="amount" header="Amount" formatters="currency">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="transaction_fee" header="Fee" formatters="currency">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="transaction_type" header="Transaction">
                <ColumnFilter filterType="select" />
            </Column>
            <Column field="transaction_date" header="Date" formatters="date" />
        </TransactionsGrid>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ToggleTheme from "./ToggleTheme";
import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
const { transactions } = storeToRefs(useDemoStore());




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