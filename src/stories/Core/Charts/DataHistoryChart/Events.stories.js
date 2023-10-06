import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import BalanceHistoryChart from '@/components/Core/Charts/BalanceHistoryChart/BalanceHistoryChart.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts/BalanceHistoryChart',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { BalanceHistoryChart },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<BalanceHistoryChart :client="args.client" @fb-balance-history-chart-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The BalanceHistoryChart component offers 1 event that you may bind event listeners to:

- fb-balance-history-chart-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<BalanceHistoryChart
    :client="client"
    @fb-balance-history-chart-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};