import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientList from '../../../../components/Advisor/Clients/ClientList.vue';

let defaultClients = ref({});
export default {
    title: 'Example/Advisor/Clients/ClientList',
    args: {
        clients: defaultClients
    },
    render: (args) => ({
      components: { ClientList },
      setup() {
        const { clients } = storeToRefs(useDemoStore());
        args.clients = ref(clients);
        defaultClients.value = args.clients;
        return { args };
      },
      template: '<ClientList :clients="args.clients" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ClientList component.",
            },
            source: {
                code: `<ClientList :clients="clients" />`
            }
        }
    }
};