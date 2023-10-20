import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TotalFees from '@/components/Core/Charts/TotalFees/TotalFees.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts/TotalFees',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { TotalFees },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<TotalFees :client="args.client" @fb-total-fees-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The TotalFees component offers 1 event that you may bind event listeners to:

- fb-total-fees-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<TotalFees
    :client="client"
    @fb-total-fees-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};