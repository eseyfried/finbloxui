import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
let defaultTransactions = ref({});
export default {
    title: 'Example/Core/TransactionsGrid',
    args: {
        rows: []
    },
    render: (args) => ({
      components: { TransactionsGrid, Column },
      setup() {
        const { transactions } = storeToRefs(useDemoStore());
        args.transactions = ref(transactions.value);
        defaultTransactions.value = args.transactions;

        args.dataTableOptions = {
            "columnSelector": true
        }

        args.actionMenuItems = [
            { url: null, label: "Action 1" },
            { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Action 2" },
            { url: null, label: "Action 3", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ];

        args.contextMenuOptions = {
            buttonLabel: "Actions",
            menuItems:  args.actionMenuItems
        }

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
            <Column header="" type="actions" :contextMenuOptions="args.contextMenuOptions" />
        </TransactionsGrid>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `
A Column can be configured to contain a ContextMenu component by passing the standard ContextMenu options via the contextMenuOptions prop.
You may also access the table row record data to utilize in your context menu. For example, if you needed to pass record data as params in
a menu item url you can use template vars in the format <%=some_field_name%>. They will be replaced with the field value from the row record.
Additionally, the context menu item accepts a callback function which receives the menu item object and the rowData object.
                `,
            },
            source: {
                code: `
const contextMenuOptions = {
    buttonLabel: "Actions",
    menuItems:  [
        { url: null, label: "Action 1" },
        { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Action 2" },
        { url: null, label: "Action 3", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
    ]
}
<TransactionsGrid :transactions="args.transactions">
    <Column field="symbol" header="Symbol" />
    <Column field="description" header="Description" />
    <Column field="quantity" header="Quantity" />
    <Column field="amount" header="Amount" />
    <Column field="transaction_fee" header="Fee" />
    <Column field="transaction_type" header="Transaction" />
    <Column field="transaction_date" header="Date" formatters="date" />
    <Column header="" type="actions" :contextMenuOptions="args.contextMenuOptions" />
</TransactionsGrid>`
            }
        }
    }
};
