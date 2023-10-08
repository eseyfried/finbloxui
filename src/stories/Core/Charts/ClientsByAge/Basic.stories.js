
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";


// eslint-disable-next-line storybook/story-exports
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/ClientsByAge',
    args: {
        type: "doughnut",
        labels: ['20-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100+'],
        data: [10, 15, 20, 23, 7, 3, 4, 0],
        totalLabels: "Clients",
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
      template: '<ClientsByAge v-bind="args" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ClientsByAge component.",
            },
            source: {
                code: `<ClientsByAge :data="" :labels="" />`
            }
        }
    }
};