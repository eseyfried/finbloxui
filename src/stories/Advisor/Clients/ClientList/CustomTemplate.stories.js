import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientList from '@/components/Advisor/Clients/ClientList.vue';

let defaultClients = ref({});

export default {
    title: 'Example/Advisor/Clients/ClientList',
    args: {
        client: defaultClients
    },
    render: (args) => ({
      components: { ClientList },
      setup() {
        const { clients } = storeToRefs(useDemoStore());
        args.clients = ref(clients);
        defaultClients.value = args.clients;
        return { args };
      },
      template: `
      <ClientList :clients="args.clients">
        <template #default="slotProps">
            <h2>{{ slotProps.client.name.household }}</h2>
            <h3>{{ slotProps.client.name.last_name }}, {{ slotProps.client.name.first_name }}</h3>

            <div v-for="(stat, i) in slotProps.client.stats" :key="i">
                <span>{{ stat.label }}:</span><span>{{ stat.value }}</span>
            </div>

            <button href="#" v-on="slotProps.eventHandlers">more...</button>
        </template>
      </ClientList>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `You can override the default client templates with your own custom layout using slotted content. 
By default, the ClientList component uses the ClientCard component. You can override ClientCard templates following the documentation
[found here](/docs/example-advisor-clients-clientcard--docs#custom).


Alternativley, you can completely customize the client items in ClientList by using the default template:

Wrap your content in a slot template tag named default. The following slotProps will be available for use in your
template:
- props - all component props
- client - the entire client object
- eventHandlers - an object containing built in event handlers. Use v-on to bind this object to the element you want to trigger the events.
`,
    },
            source: {
                code: `
<ClientList :clients="args.clients">
    <template #default="slotProps">
        <h2>{{ slotProps.client.name.household }}</h2>
        <h3>{{ slotProps.client.name.last_name }}, {{ slotProps.client.name.first_name }}</h3>

        <div v-for="(stat, i) in slotProps.client.stats" :key="i">
            <span>{{ stat.label }}:</span><span>{{ stat.value }}</span>
        </div>

        <button href="#" v-on="slotProps.eventHandlers">more...</button>
    </template>
</ClientList>`
            }
        }
    }
};