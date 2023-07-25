import DataTable from '@/components/DataTable/DataTable.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/DataTable/ColumnFilter',
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column, ColumnFilter },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);

        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="id" header="Id" />
            <Column field="title" header="Title">
                <ColumnFilter filterType="text" operator="equality" />
            </Column>
            <Column field="qty" header="Qty">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="state" header="State">
                <ColumnFilter filterType="multiselect" />
            </Column>
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
