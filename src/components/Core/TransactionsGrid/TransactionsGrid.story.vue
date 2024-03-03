<template>
    <Story
        title="Accounts/Transactions/TransactionsGrid"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.transactions" title="transactions" />
            <PropDesc :component="TransactionsGrid" prop="transactions" />
            <HstJson v-model="state.dataTableOptions" title="dataTableOptions" />
            <PropDesc :component="TransactionsGrid" prop="dataTableOptions" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <TransactionsGrid :transactions="state.transactions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="amount" header="Amount" />
                        <Column field="transaction_fee" header="Fee" />
                        <Column field="transaction_type" header="Transaction" />
                        <Column field="transaction_date" header="Date" formatters="date" />
                    </TransactionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Re-order Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <TransactionsGrid :transactions="state.transactions" :dataTableOptions="state.dataTableOptions">
                        <Column field="description" header="Description" />
                        <Column field="symbol" header="Symbol" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="amount" header="Amount" />
                        <Column field="transaction_fee" header="Fee" />
                        <Column field="transaction_type" header="Transaction" />
                        <Column field="transaction_date" header="Date" />
                    </TransactionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Formatted Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <TransactionsGrid :transactions="state.transactions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="description" header="Description" :formatters="(value) => value.toUpperCase()"/>
                        <Column field="quantity" header="Quantity" />
                        <Column field="amount" header="Amount" formatters="currency" />
                        <Column field="transaction_fee" header="Fee" formatters="currency" />
                        <Column field="transaction_type" header="Transaction" />
                        <Column field="transaction_date" header="Date" formatters="date" />
                    </TransactionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Without Column Selector" :init-state="() => initState({ 'dataTableOptions': { columnSelector: false  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <TransactionsGrid :transactions="state.transactions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="amount" header="Amount" />
                        <Column field="transaction_fee" header="Fee" />
                        <Column field="transaction_type" header="Transaction" />
                        <Column field="transaction_date" header="Date" formatters="date" />
                    </TransactionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Filterable Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <TransactionsGrid :transactions="state.transactions" :dataTableOptions="state.dataTableOptions">
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
        </Variant>
        <Variant title="Action Column" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <TransactionsGrid :transactions="state.transactions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="amount" header="Amount" />
                        <Column field="transaction_fee" header="Fee" />
                        <Column field="transaction_type" header="Transaction" />
                        <Column field="transaction_date" header="Date" formatters="date" />
                        <Column header="Actions" field="action" type="actions" :contextMenuOptions="actionMenuOptions" />
                    </TransactionsGrid>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useTransactionData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';
import * as formatters from "@/modules/useFormatter";
import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue';
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
    transactions: useTransactionData(),
    dataTableOptions: defaultValue(TransactionsGrid, 'dataTableOptions'),

})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>