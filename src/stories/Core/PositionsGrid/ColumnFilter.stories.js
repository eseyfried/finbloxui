import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
let defaultPositions = ref({});
export default {
    title: 'Library/Core/PositionsGrid',
    args: {
        positions: []
    },
    render: (args) => ({
      components: { PositionsGrid, Column, ColumnFilter },
      setup() {
        const { positions } = storeToRefs(useDemoStore());
        args.positions = ref(positions.value);
        defaultPositions.value = args.positions;

        args.dataTableOptions = {
            "columnSelector": true
        }

        return { args };
      },
      template: `
        <PositionsGrid :positions="args.positions">
            <Column field="symbol" header="Symbol">
                <ColumnFilter filterType="text" operator="equality" />
            </Column>
            <Column field="security_description" header="Description" />
            <Column field="quantity" header="Quantity">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="market_value" header="Market Value" />
            <Column field="change_in_value_amt" header="Change In Value ($)" />
            <Column field="change_in_value_pct" header="Change In Value (%)" />
        </PositionsGrid>
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
<PositionsGrid :rows="positions">
    <Column field="symbol" header="Symbol">
        <ColumnFilter filterType="text" operator="equality" />
    </Column>
    <Column field="security_description" header="Description" />
    <Column field="quantity" header="Quantity">
        <ColumnFilter filterType="text" operator="comparison" />
    </Column>
    <Column field="market_value" header="Market Value" />
    <Column field="change_in_value_amt" header="Change In Value ($)" />
    <Column field="change_in_value_pct" header="Change In Value (%)" />
</PositionsGrid>`
            }
        }
    }
};
