import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import PortfolioSummaryCard from '@/components/Advisor/PortfolioSummaryCard/PortfolioSummaryCard.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Advisor/PortfolioSummaryCard',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { PortfolioSummaryCard },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<PortfolioSummaryCard :client="args.client" @fb-portfolio-summary-card-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The PortfolioSummaryCard component offers 1 event that you may bind event listeners to:

- fb-portfolio-summary-card-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<PortfolioSummaryCard
    :client="client"
    @fb-portfolio-summary-card-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};