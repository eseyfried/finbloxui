import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TopClientsByAum from '@/components/Advisor/Clients/TopClientsByAum/TopClientsByAum.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Advisor/Clients/TopClientsByAum',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { TopClientsByAum },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<TopClientsByAum :client="args.client" @fb-top-clients-by-aum-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The TopClientsByAum component offers 1 event that you may bind event listeners to:

- fb-top-clients-by-aum-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<TopClientsByAum
    :client="client"
    @fb-top-clients-by-aum-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};