import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';

// eslint-disable-next-line storybook/story-exports
let defaultTransactions = ref({});
export default {
    title: 'Library/Core/TransactionsGrid',
    args: {
        transactions: defaultTransactions,
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
            <Column field="symbol" header="Symbol" />
            <Column field="description" header="Description" />
            <Column field="quantity" header="Quantity" />
            <Column field="amount" header="Amount" formatters="currency" />
            <Column field="transaction_fee" header="Fee" formatters="currency" />
            <Column field="transaction_type" header="Transaction" />
            <Column field="transaction_date" header="Date" formatters="date" />
        </TransactionsGrid>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the `TransactionsGrid` component with column selector.",
            },
            source: {
                code: `
const dataTableOptions = {
    "columnSelector": true
}
<TransactionsGrid :transactions="transactions" :dataTableOptions="dataTableOptions">
    <Column field="symbol" header="Symbol" />
    <Column field="description" header="Description" />
    <Column field="quantity" header="Quantity" />
    <Column field="amount" header="Amount" formatters="currency" />
    <Column field="transaction_fee" header="Fee" formatters="currency" />
    <Column field="transaction_type" header="Transaction" />
    <Column field="transaction_date" header="Date" formatters="date" />
</TransactionsGrid>`
            }
        }
    }
};