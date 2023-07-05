import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientListItem from '@/components/Advisor/Clients/ClientListItem.vue';

let defaultClient = ref({});
export default {
    title: 'Example/Advisor/Clients/ClientListItem',
    args: {
        client: defaultClient
    },
    render: (args) => ({
      components: { ClientListItem },
      setup() {
        const { clients } = storeToRefs(useDemoStore());
        args.client = ref(clients.value[0]);
        defaultClient.value = args.client;
        return { args };
      },
      template: '<ClientListItem :client="args.client" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ClientListItem component.",
            },
            source: {
                code: `<ClientListItem :client="client" />`
            }
        }
    }
};