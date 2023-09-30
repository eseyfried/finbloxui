import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import Chart from '@/components/Core/Charts/Chart.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { Chart },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<Chart :client="args.client" @fb-chart-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The Chart component offers 1 event that you may bind event listeners to:

- fb-chart-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<Chart
    :client="client"
    @fb-chart-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};