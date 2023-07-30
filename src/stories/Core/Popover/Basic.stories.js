import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import Popover from '@/components/Core/Popover/Popover.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/Core/Popover',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { Popover },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: `
      <button id="show">show</button>
      <Popover selector="#show" trigger="hover">
        <div>tool tip</div>
      </Popover>
      
      `
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Popover component.",
            },
            source: {
                code: `<Popover :client="client" />` // <--- CHANGE THIS
            }
        }
    }
};