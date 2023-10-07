import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts/ClientsByAge',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { ClientsByAge },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<ClientsByAge :client="args.client" @fb-clients-by-age-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ClientsByAge component offers 1 event that you may bind event listeners to:

- fb-clients-by-age-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<ClientsByAge
    :client="client"
    @fb-clients-by-age-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};