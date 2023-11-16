import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import PortrfolioSummaryGrid from '@/components/Advisor/PortrfolioSummaryGrid/PortrfolioSummaryGrid.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Advisor/PortrfolioSummaryGrid',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { PortrfolioSummaryGrid },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<PortrfolioSummaryGrid :client="args.client" @fb-portrfolio-summary-grid-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The PortrfolioSummaryGrid component offers 1 event that you may bind event listeners to:

- fb-portrfolio-summary-grid-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<PortrfolioSummaryGrid
    :client="client"
    @fb-portrfolio-summary-grid-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};