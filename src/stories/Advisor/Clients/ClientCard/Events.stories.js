import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientCard from '@/components/Advisor/Clients/ClientCard.vue';

let defaultClient = ref({});
export default {
    title: 'Example/Advisor/Clients/ClientCard',
    args: {
        client: defaultClient
    },
    render: (args) => ({
      components: { ClientCard },
      setup() {
        const { clients } = storeToRefs(useDemoStore());
        args.client = ref(clients.value[0]);
        defaultClient.value = args.client;
        return { args };
      },
      template: '<ClientCard :client="args.client" @fb-client-card-contact-link:click="handleClick($event)" @fb-client-card-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ClientCard component offers 2 events that you may bind event listeners to:

- fb-client-card-contact-link:click - triggers when an email or phone link is clicked
- fb-client-card-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<ClientCard
    :client="client"
    @fb-client-card-contact-link:click="handleContactClick($event)"
    @fb-client-card-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};