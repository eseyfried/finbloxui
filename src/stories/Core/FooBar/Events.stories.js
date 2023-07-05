import { action } from "@storybook/addon-actions";
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
      template: '<FooBar :client="args.client" @fb-foo-bar-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The FooBar component offers 1 event that you may bind event listeners to:

- fb-foo-bar-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<FooBar
    :client="client"
    @fb-foo-bar-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};