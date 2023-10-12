import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/Charts/AccountsHeldawayByAccountType',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { AccountsHeldawayByAccountType },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<AccountsHeldawayByAccountType :client="args.client" @fb-accounts-heldaway-by-account-type-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The AccountsHeldawayByAccountType component offers 1 event that you may bind event listeners to:

- fb-accounts-heldaway-by-account-type-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<AccountsHeldawayByAccountType
    :client="client"
    @fb-accounts-heldaway-by-account-type-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};