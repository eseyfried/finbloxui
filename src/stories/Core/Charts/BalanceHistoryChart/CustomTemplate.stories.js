import moment from "moment";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import BalanceHistoryChart from '@/components/Core/Charts/BalanceHistoryChart/BalanceHistoryChart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';


// eslint-disable-next-line storybook/story-exports
const defaultBalances = ref([]);
const defaultDates = ref([]);
const theme = ref("headless");

export default {
    title: 'Library/Core/Charts/BalanceHistoryChart',
    args: {
        balances: [],
        dates: [], 
        label: "Total Portfolio Value",
        lineColor: "rgb(75, 85, 99)",
        areaColor: "rgb(75, 85, 99, 0.3)",
        // colors: [...geChartColorsByTheme(theme.value)]
    },
    render: (args, context) => {
        // this handles state changes when storybook controls are updated
        args.balances = defaultBalances.value;
        args.dates = defaultDates.value;
        return {
            components: { BalanceHistoryChart },
            setup() {
                const { historicalBalances } = storeToRefs(useDemoStore());
                args.balances = historicalBalances.value;
                args.dates = Array.from({length: historicalBalances.value.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD"));
                defaultBalances.value = args.balances;
                defaultDates.value = args.dates;
                theme.value = context.globals.theme;
                const colors = [...geChartColorsByTheme(theme.value)];
                args.lineColor = colors[0];
                args.areaColor = colors[0];
                return { args };
            },
            template: `
            <BalanceHistoryChart v-bind="args">
                <template #default="slotProps">
                    <h2>{{ slotProps.currentValue }}</h2>
                    <h3>{{ slotProps.props.label }}</h3>
                    <div class="fb-balance-history-chart-change" :class="slotProps.changeClasses">
                        <span>{{ slotProps.changeAmount }}</span>
                        <span>{{ slotProps.changePercent }}</span>
                    </div>
                    <span class="fb-balance-history-chart-date">As of: {{ slotProps.asOf }}</span>
                </template>
            </BalanceHistoryChart>`,
        }
    },
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default template with your own custom layout using slotted content. 
Wrap your content in a slot template tag using slot name(s) documented above. The documented slotProps will be available for use in your
template.
`,
            },
            source: {
                code: `

<BalanceHistoryChart :balances="[]" :dates="[]" label="">
    <template #default="slotProps">
        <h2>{{ slotProps.currentValue }}</h2>
        <h3>{{ slotProps.props.label }}</h3>
        <div class="fb-balance-history-chart-change" :class="slotProps.changeClasses">
            <span>{{ slotProps.changeAmount }}</span>
            <span>{{ slotProps.changePercent }}</span>
        </div>
        <span class="fb-balance-history-chart-date">As of: {{ slotProps.asOf }}</span>
    </template>
</BalanceHistoryChart>`
            }
        }
    }
};