import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';

let defaultPositions = ref({});
export default {
    title: 'Example/Core/PositionsGrid',
    args: {
        positions: defaultPositions
    },
    render: (args) => ({
      components: { PositionsGrid, Column },
      setup() {
        const { positions } = storeToRefs(useDemoStore());
        args.positions = ref(positions.value);
        defaultPositions.value = args.positions;
        return { args };
      },
      template: `
        <PositionsGrid :positions="args.positions">
            <Column field="symbol" header="Symbol" />
        </PositionsGrid>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the PositionsGrid component.",
            },
            source: {
                code: `<PositionsGrid :positions="args.positions" />` // <--- CHANGE THIS
            }
        }
    }
};