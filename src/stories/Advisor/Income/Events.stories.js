import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import Income from '@/components/Advisor/Income/Income.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Advisor/Income',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { Income },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<Income :client="args.client" @fb-income-expenses-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The Income component offers 1 event that you may bind event listeners to:

- fb-income-expenses-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<Income
    :client="client"
    @fb-income-expenses-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};