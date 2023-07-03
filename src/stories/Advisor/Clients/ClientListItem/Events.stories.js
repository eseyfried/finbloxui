import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientListItem from '../../../../components/Advisor/Clients/ClientListItem.vue';

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
      template: '<ClientListItem :client="args.client" @fb-client-list-item-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ClientListItem component offers 1 event that you may bind event listeners to:

- fb-client-list-item-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<ClientListItem
    :client="client"
    @fb-client-list-item-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};