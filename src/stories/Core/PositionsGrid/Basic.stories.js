import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';

// eslint-disable-next-line storybook/story-exports
let defaultPositions = ref({});
export default {
    title: 'Library/Core/PositionsGrid',
    args: {
        positions: defaultPositions,
        dataTableOptions: {
            "columnSelector": true
        }
    },
    render: (args) => ({
      components: { PositionsGrid, Column, ColumnFilter },
      setup() {
        const { positions } = storeToRefs(useDemoStore());
        args.positions = ref(positions.value);
        defaultPositions.value = args.positions;

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
        </PositionsGrid>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the `PositionsGrid` component with column selector.",
            },
            source: {
                code: `
const dataTableOptions = {
    "columnSelector": true
}
<PositionsGrid :positions="positions" :dataTableOptions="dataTableOptions">
    <Column field="symbol" header="Symbol" />
    <Column field="security_description" header="Description" />
    <Column field="quantity" header="Quantity" />
    <Column field="market_value" header="Market Value" />
    <Column field="change_in_value_amt" header="Change In Value ($)" />
    <Column field="change_in_value_pct" header="Change In Value (%)" />
</PositionsGrid>`
            }
        }
    }
};