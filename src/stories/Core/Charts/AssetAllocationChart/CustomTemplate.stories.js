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
        labels: ['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash'],
        data: [45, 15, 20, 0, 20],
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
            template: `
            <AssetAllocationChart>
                <template #default="slotProps">
                    <h2>{{ slotProps.totalAmount }}</h2>
                    <h3>{{ slotProps.totalLabel }}</h3>
                </template>
            </AssetAllocationChart>
            `,
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
<AssetAllocationChart
    type="doughnut"
    format="percent"
    :labels="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
    :chartjsOptions="{}"
    :chartjsData="{}"
    :data="[45, 15, 20, 0, 20]"
>
    <template #default="slotProps">
        <h2>{{ slotProps.totalAmount }}</h2>
        <h3>{{ slotProps.totalLabel }}</h3>
    </template>
</AssetAllocationChart>
                `
            }
        }
    }
};