import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/Core/PositionsGrid',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { PositionsGrid },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<PositionsGrid :client="args.client" @fb-positions-grid-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The PositionsGrid component offers 1 event that you may bind event listeners to:

- fb-positions-grid-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<PositionsGrid
    :client="client"
    @fb-positions-grid-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};