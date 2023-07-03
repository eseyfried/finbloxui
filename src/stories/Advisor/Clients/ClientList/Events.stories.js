import { action } from "@storybook/addon-actions";
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
        args.clients = ref(clients.value);
        defaultClients.value = args.clients;
        return { args };
      },
      template: '<ClientList :clients="args.clients" @fb-client-list-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ClientList component offers 1 event that you may bind event listeners to:

- fb-client-list-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<ClientList
    :client="client"
    @fb-client-list-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};