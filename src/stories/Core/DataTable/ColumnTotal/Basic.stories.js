import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ColumnTotal from '@/components/DataTable/ColumnTotal/ColumnTotal.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/Core/DataTable/ColumnTotal',
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
      template: '<ColumnTotal :client="args.client" />', // <--- CHANGE THIS
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ColumnTotal component.",
            },
            source: {
                code: `<ColumnTotal :client="client" />` // <--- CHANGE THIS
            }
        }
    }
};