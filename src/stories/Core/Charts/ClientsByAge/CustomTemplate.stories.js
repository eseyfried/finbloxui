
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";


// eslint-disable-next-line storybook/story-exports
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/ClientsByAge',
    args: {
        type: "doughnut",
        ageGroups: ['20-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100+'],
        data: [10, 15, 20, 23, 7, 3, 4, 0],
        totalLabel: "Clients",
        chartjsOptions: {},
        chartjsData: {},
        colors: [...geChartColorsByTheme(theme.value)]
    },
    render: (args, context) => ({
      components: { ClientsByAge },
      setup() {
            theme.value = context.globals.theme;
            args.colors = [...geChartColorsByTheme(theme.value)];
        return { args };
      },
      template: `
      <ClientsByAge v-bind="args">
        <template #default="slotProps">
            <h2>Total</h2>
            <h3>{{ slotProps.totalClients }}</h3>
            <h2>Clients</h2>
        </template>
      </ClientsByAge>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default template with your own custom layout using slotted content. 
                Wrap your content in a slot template tag using slot name(s) documented above. The documented slotProps will be available for use in your
                template.`,
            },
            source: {
                code: `
<ClientsByAge v-bind="args">
    <template #default="slotProps">
        <h2>Total</h2>
        <h3>{{ slotProps.totalClients }}</h3>
        <h2>Clients</h2>
    </template>
</ClientsByAge>
                `
            }
        }
    }
};