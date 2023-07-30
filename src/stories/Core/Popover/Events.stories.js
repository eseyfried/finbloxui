import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import Popover from '@/components/Core/Popover/Popover.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/Core/Popover',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { Popover },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<Popover :client="args.client" @fb-popover-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The Popover component offers 1 event that you may bind event listeners to:

- fb-popover-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<Popover
    :client="client"
    @fb-popover-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};