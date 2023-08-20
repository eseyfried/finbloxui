import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ColumnTotal from '@/components/DataTable/ColumnTotal/ColumnTotal.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/Core/DataTable/ColumnTotal',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { ColumnTotal },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<ColumnTotal :client="args.client" @fb-column-total-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ColumnTotal component offers 1 event that you may bind event listeners to:

- fb-column-total-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<ColumnTotal
    :client="client"
    @fb-column-total-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};