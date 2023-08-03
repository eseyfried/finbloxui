import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
let defaultTransactions = ref({});
export default {
    title: 'Example/Core/TransactionsGrid',
    args: {
        transactions: [],
        dataTableOptions: {
            "columnSelector": true
        }
    },
    render: (args) => ({
      components: { TransactionsGrid, Column, ColumnFilter },
      setup() {
        const { transactions } = storeToRefs(useDemoStore());
        args.transactions = ref(transactions.value);
        defaultTransactions.value = args.transactions;

        return { args };
      },
      template: `
        <TransactionsGrid :transactions="args.transactions">
            <Column field="symbol" header="Symbol">
                <ColumnFilter filterType="text" operator="equality" />
            </Column>
            <Column field="description" header="Description" />
            <Column field="quantity" header="Quantity">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="amount" header="Amount">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="transaction_fee" header="Fee">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="transaction_type" header="Transaction">
                <ColumnFilter filterType="select" />
            </Column>
            <Column field="transaction_date" header="Date" />
        </TransactionsGrid>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `
The ColumnFilter component allows users to filter data based on the values in a given column. Filtered values can be compared based on
equality (starts with, contains, etc.) or comparison (equals, greater than, etc.) matchers as well as selected from a list. Multiple filters
can be applied to a DataTable. When using multiple filters, the data filtering is refined with each ColumnFilter applied. For more options, please
see [ColumnFilter](?path=/docs/example-core-datatable-columnfilter--docs).
                `,
            },
            source: {
                code: `
<TransactionsGrid :rows="transactions">
    <Column field="symbol" header="Symbol">
        <ColumnFilter filterType="text" operator="equality" />
    </Column>
    <Column field="description" header="Description" />
    <Column field="quantity" header="Quantity">
        <ColumnFilter filterType="text" operator="comparison" />
    </Column>
    <Column field="amount" header="Amount">
        <ColumnFilter filterType="text" operator="comparison" />
    </Column>
    <Column field="transaction_fee" header="Fee">
        <ColumnFilter filterType="text" operator="comparison" />
    </Column>
    <Column field="transaction_type" header="Transaction">
        <ColumnFilter filterType="select" />
    </Column>
<Column field="transaction_date" header="Date" />
</TransactionsGrid>`
            }
        }
    }
};
