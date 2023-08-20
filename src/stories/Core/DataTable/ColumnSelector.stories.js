import DataTable from '@/components/DataTable/DataTable.vue';
import Column from '@/components/DataTable/Column.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/DataTable/Column/ColumnSelector',
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);

        args.actionMenuItems = [
            { url: null, label: "Item 1" },
            { url: "some-url?id=<%=id%>&title=<%=title%>", label: "Item 2" },
            { url: null, label: "Item 3", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ];

        args.contextMenuOptions = {
            buttonLabel: "Actions",
            menuItems:  args.actionMenuItems
        }

        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows" columnSelector="true">
            <Column field="id" header="Id" />
            <Column field="title" header="Title" />
            <Column field="state" header="State" />
        </DataTable>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `
The ColumnSelector component allows users to toggle the visibility of data columns in the DataTable. The order of the columns is preserved based
on the order of the Column components.
                `,
            },
            source: {
                code: `
<DataTable :rows="rows" columnSelector="true">                
    <Column field="id" header="Id" />
    <Column field="title" header="Title" />
    <Column field="state" header="State" />
</DataTable>`
            }
        }
    }
};
