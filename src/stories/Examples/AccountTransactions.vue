<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header brandName="OneLeaf Financial" />
    <div class="page">
        <h1 class="mb-5">Transactions</h1>
        <AccountCarousel :accounts="accounts" defaultAccountId="4" @fb-account-carousel:click="handleAccountClick($event)" />
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
    <SFCSource filename="AccountTransactions.vue" tag="all" />
    <SFCSource :filename="`${theme}.css`" tag="all" label="Show CSS Source" v-if="theme != 'headless'" />
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    theme: {
        type: String,
        default: null
    }
});
/**
 * Use a reactive data store to manage your application data.
 * You can centralize your api calls within the data layer.
 */
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import SFCSource from '@/stories/Examples/SFCSource.vue';
/**
 * Import your components
 */
import Header from '@/stories/Examples/Header.vue';
import AccountCarousel from '@/components/Core/Navigation/AccountCarousel.vue';
import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';

/**
 * Let's grab some data from our data store to pass into our components
 */
const { transactions, accounts } = storeToRefs(useDemoStore());
/**
 * The AccountCarousel component fires an event when an account is clicked.
 * Here we are binding an event handler to that event where we can decide what
 * action to take. In this trivial example, we simply alert the account number.
 */
const handleAccountClick = (event) => {
    const { account } = event;
    window.alert(`Account: ${account.number} was selected`)
}
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