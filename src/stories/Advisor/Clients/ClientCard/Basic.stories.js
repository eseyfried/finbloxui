import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientCard from '../../../../components/Advisor/Clients/ClientCard.vue';

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
      template: '<ClientCard :client="args.client" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ClientCard component.",
            },
            source: {
                code: `<ClientCard :client="client" />`
            }
        }
    }
};