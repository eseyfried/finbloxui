import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import NetworthChart from '@/components/Core/Charts/NetworthChart/NetworthChart.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts/NetworthChart',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { NetworthChart },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<NetworthChart :client="args.client" @fb-networth-chart-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The NetworthChart component offers 1 event that you may bind event listeners to:

- fb-networth-chart-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<NetworthChart
    :client="client"
    @fb-networth-chart-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};