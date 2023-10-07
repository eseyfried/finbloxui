import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";


// eslint-disable-next-line storybook/story-exports
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/AssetAllocationChart',
    args: {
        type: "doughnut",
        format: "percent",
        assetCategories: ['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash'],
        allocations: [45, 15, 20, 0, 20],
        showTotal: true,
        totalLabel: "Total Value",
        totalAmount: "134782.99",
        chartjsOptions: {},
        chartjsData: {},
        colors: [...geChartColorsByTheme(theme.value)]

    },
    render: (args, context) => {
        return {
            components: { AssetAllocationChart },
            setup() {
                theme.value = context.globals.theme;
                args.colors = [...geChartColorsByTheme(theme.value)];
                return { args };
            },
            template: `<AssetAllocationChart />`,
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the AssetAllocationChart component.",
            },
            source: {
                code: `
<AssetAllocationChart
    type="doughnut"
    format="percent"
    :assetCategories="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
    :chartjsOptions="{}"
    :chartjsOptions="{}"
    :allocations="[45, 15, 20, 0, 20]"
/>
                `
            }
        }
    }
};