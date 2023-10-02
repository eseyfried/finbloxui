import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts/AssetAllocationChart',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { AssetAllocationChart },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<AssetAllocationChart :client="args.client" @fb-asset-allocation-chart-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The AssetAllocationChart component offers 1 event that you may bind event listeners to:

- fb-asset-allocation-chart-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<AssetAllocationChart
    :client="client"
    @fb-asset-allocation-chart-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};