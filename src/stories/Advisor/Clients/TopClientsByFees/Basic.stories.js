import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TopClientsByFees from '@/components/Advisor/Clients/TopClientsByFees/TopClientsByFees.vue';

// eslint-disable-next-line storybook/story-exports
let defaultClients = ref({});
let defaultData = ref({});
export default {
    title: 'Library/Advisor/Clients/TopClientsByFees',
    args: {
        clientLabel: "Clients",
        feesLabel: "Total Fees",
        clients: defaultClients.value,
        data: defaultData.value
    },
    render: (args) => {
        // force these to set when re-rendering after controls have been updated
        args.clients = defaultClients.value;
        args.data = defaultData.value;
        return {
            components: { TopClientsByFees },
            setup() {
                // all of this executes once and not upon re-rendering
                const { clients } = storeToRefs(useDemoStore()); // this can only be executed in the setup function
                args.clients = clients.value.map(client => client.name.household);
                defaultClients.value = args.clients;
                args.data = clients.value.map(client => parseFloat(client.stats[0].value)).sort((a, b) => a-b).reverse();
                defaultData.value = args.data;
                
                return { args };
            },
            template: '<TopClientsByFees v-bind="args" />',
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the TopClientsByFees component.",
            },
            source: {
                code: `<TopClientsByFees :clients="[]" :data="[]" clientLabel="" feesLabel="" />`
            }
        }
    }
};