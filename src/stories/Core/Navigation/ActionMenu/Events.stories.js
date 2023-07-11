import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ActionMenu from '@/components/Core/Navigation/ActionMenu/ActionMenu.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/Core/Navigation/ActionMenu',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { ActionMenu },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<ActionMenu :client="args.client" @fb-action-menu-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ActionMenu component offers 1 event that you may bind event listeners to:

- fb-action-menu-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<ActionMenu
    :client="client"
    @fb-action-menu-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};