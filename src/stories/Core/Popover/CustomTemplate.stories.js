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
      <Popover :client="args.client">
        <template #name="slotProps">
            <h2>{{ slotProps.client.name.household }}</h2>
            <h3>{{ slotProps.client.name.last_name }}, {{ slotProps.client.name.first_name }}</h3>
        </template>

        <template #stats="slotProps">
            <div v-for="(stat, i) in slotProps.client.stats" :key="i">
                <span>{{ stat.label }}:</span><span>{{ stat.value }}</span>
            </div>
        </template>

        <template #details_link="slotProps">
            <button href="#" v-on="slotProps.eventHandlers">{{ slotProps.props.detailsLinkLabel }}</button>
        </template>
      </Popover>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default client templates with your own custom layout using slotted content. 
                
There are 4 available template slots:
- name - layout template for the client.name object
- stats - layout template for the client.stats array
- details_link - layout template for the details link

Wrap your content in a slot template tag using one of the above slot names. The following slotProps will be available for use in your
template:
- props - all component props
- client - the entire client object
- eventHandlers - an object containing built in event handlers. Use v-on to bind this object to the element you want to trigger the events.
This is only available for the details_link slot.
`,
            },
            source: {
                code: `
<Popover :client="args.client">
    <template #name="slotProps">
        <h2>{{ slotProps.client.name.household }}</h2>
        <h3>{{ slotProps.client.name.last_name }}, {{ slotProps.client.name.first_name }}</h3>
    </template>

    <template #stats="slotProps">
        <div v-for="(stat, i) in slotProps.client.stats" :key="i">
            <span>{{ stat.label }}:</span><span>{{ stat.value }}</span>
        </div>
    </template>

    <template #details_link="slotProps">
            <button href="#" v-on="slotProps.eventHandlers">{{ slotProps.props.detailsLinkLabel }}</button>
    </template>
</Popover>`
            }
        }
    }
};