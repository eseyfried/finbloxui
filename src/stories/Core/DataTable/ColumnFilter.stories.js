import DataTable from '@/components/DataTable/DataTable.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/DataTable/ColumnFilter',
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
The ColumnFilter component allows users to filter data based on the values in a given column. Filtered values can be compared based on
equality (starts with, contains, etc.) or comparison (equals, greater than, etc.) matchers as well as selected from a list. Multiple filters
can be applied to a DataTable. When using multiple filters, the data filtering is refined with each ColumnFilter applied.
                `,
            },
            source: {
                code: `
<DataTable :rows="rows" columnSelector="true">                
    <Column field="id" header="Id" />
    <ColumnFilter field="title" header="Title">
        <ColumnFilter filterType="text" operator="equality" />
    </ColumnFilter>
    <Column field="qty" header="Qty">
        <ColumnFilter filterType="text" operator="comparison" />
    </Column>
    <Column field="state" header="State">
        <ColumnFilter filterType="multiselect" />
    </Column>
</DataTable>`
            }
        }
    }
};
