import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import FooBar from '@/components/Core/FooBar/FooBar.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/Core/FooBar',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { FooBar },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<FooBar :client="args.client" />', // <--- CHANGE THIS
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the FooBar component.",
            },
            source: {
                code: `<FooBar :client="client" />` // <--- CHANGE THIS
            }
        }
    }
};