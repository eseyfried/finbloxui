import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TopClientsByAum from '@/components/Advisor/Clients/TopClientsByAum/TopClientsByAum.vue';

// eslint-disable-next-line storybook/story-exports
let defaultClients = ref({});
let defaultData = ref({});
export default {
    title: 'Library/Advisor/Clients/TopClientsByAum',
    args: {
        clientLabel: "Clients",
        aumLabel: "Total Assets Under Management",
        clients: defaultClients.value,
        data: defaultData.value
    },
    render: (args) => {
        // force these to set when re-rendering after controls have been updated
        args.clients = defaultClients.value;
        args.data = defaultData.value;
        return {
            components: { TopClientsByAum },
            setup() {
                // all of this executes once and not upon re-rendering
                const { clients } = storeToRefs(useDemoStore()); // this can only be executed in the setup function
                args.clients = clients.value.map(client => client.name.household);
                defaultClients.value = args.clients;
                args.data = clients.value.map(client => parseFloat(client.stats[0].value)).sort((a, b) => a-b).reverse();
                defaultData.value = args.data;
                
                return { args };
            },
            template: `
            <TopClientsByAum v-bind="args">
                <template #default="slotProps">
                    <tr>
                        <td>{{ slotProps.client }}</td>
                        <td>
                            <span class="fb-top-clients-by-aum-md" style="margin-right: 5px;">{{ slotProps.aumAmount }}</span>
                            <div class="fb-top-clients-by-aum-bar-container">
                                <div class="fb-top-clients-by-aum-bar percentage" v-bind="slotProps.aumPercentStyle"></div>
                                <span style="margin-left: 5px; font-size: 0.9rem;">{{ parseFloat(slotProps.aumPercent).toFixed(2) }}%</span>
                            </div>
                        </td>
                    </tr>
                </template>
            </TopClientsByAum>
            `
        }
    },
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default template with your own custom layout using slotted content. 
                Wrap your content in a slot template tag using slot name(s) documented above. The documented slotProps will be available for use in your
                template.`,
            },
            source: {
                code: `
<TopClientsByAum v-bind="args">
    <template #default="slotProps">
        <tr>
            <td>{{ slotProps.client }}</td>
            <td>
                <span class="fb-top-clients-by-aum-md">{{ slotProps.aumAmount }}</span>
                <div class="fb-top-clients-by-aum-bar-container">
                    <div class="fb-top-clients-by-aum-bar percentage" v-bind="slotProps.aumPercentStyle"></div>
                    <span>{{ parseFloat(slotProps.aumPercent).toFixed(2) }}%</span>
                </div>
            </td>
        </tr>
</template>
</TopClientsByAum>
                `
            }
        }
    }
};