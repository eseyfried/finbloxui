import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
let defaultPositions = ref({});
export default {
    title: 'Example/Core/PositionsGrid',
    args: {
        rows: []
    },
    render: (args) => ({
      components: { PositionsGrid, Column },
      setup() {
        const { positions } = storeToRefs(useDemoStore());
        args.positions = ref(positions.value);
        defaultPositions.value = args.positions;

        args.dataTableOptions = {
            "columnSelector": true
        }

        args.actionMenuItems = [
            { url: null, label: "Market News" },
            { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Company News" },
            { url: null, label: "Trade", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ];

        args.contextMenuOptions = {
            buttonLabel: "Actions",
            menuItems:  args.actionMenuItems
        }

        return { args };
      },
      template: `
        <PositionsGrid :positions="args.positions">
            <Column field="symbol" header="Symbol" />
            <Column field="security_description" header="Description" />
            <Column field="quantity" header="Quantity" />
            <Column field="market_value" header="Market Value" />
            <Column field="change_in_value_amt" header="Change In Value ($)" />
            <Column field="change_in_value_pct" header="Change In Value (%)" />
            <Column header="" type="actions" :contextMenuOptions="args.contextMenuOptions" />
        </PositionsGrid>
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
        { url: null, label: "Market News" },
        { url: "some-url?id=<%=id%>&title=<%=title%>", label: "Company News" },
        { url: null, label: "Trade", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
    ]
}
<PositionsGrid :positions="positions">
    <Column field="symbol" header="Symbol" />
    <Column field="security_description" header="Description" />
    <Column field="quantity" header="Quantity" />
    <Column field="market_value" header="Market Value" />
    <Column field="change_in_value_amt" header="Change In Value ($)" />
    <Column field="change_in_value_pct" header="Change In Value (%)" />
    <Column header="" type="actions" :contextMenuOptions="contextMenuOptions" />
</PositionsGrid>`
            }
        }
    }
};
