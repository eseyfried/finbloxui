import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";
import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue';

// eslint-disable-next-line storybook/story-exports
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/AccountsHeldawayByAccountType',
    args: {
        type: "doughnut",
        labels: ['Retirement', 'Annuity', 'Taxable', 'Trust'],
        data: [10, 15, 20, 23,],
        totalLabel: "Total AUM",
        totalValue: "$10M",
        chartjsOptions: {},
        chartjsData: {},
        colors: [...geChartColorsByTheme(theme.value)]
    },
    render: (args, context) => ({
      components: { AccountsHeldawayByAccountType },
      setup() {
        theme.value = context.globals.theme;
        args.colors = [...geChartColorsByTheme(theme.value)];
        return { args };
      },
      template: '<AccountsHeldawayByAccountType v-bind="args"/>',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the AccountsHeldawayByAccountType component.",
            },
            source: {
                code: `<AccountsHeldawayByAccountType :labels="[]" :data="[]" totalLabel="" totalValue="" />` // <--- CHANGE THIS
            }
        }
    }
};