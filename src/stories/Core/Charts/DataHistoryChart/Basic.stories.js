import moment from "moment";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import DataHistoryChart from '@/components/Core/Charts/DataHistoryChart/DataHistoryChart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';


// eslint-disable-next-line storybook/story-exports
const defaultData = ref([]);
const defaultDates = ref([]);
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/DataHistoryChart',
    args: {
        data: [],
        dates: [], 
        label: "Total Portfolio Value",
        lineColor: "rgb(75, 85, 99)",
        areaColor: "rgb(75, 85, 99, 0.3)",
        chartjsData: {},
        chartjsOptions: {},
        // colors: [...geChartColorsByTheme(theme.value)]
    },
    render: (args, context) => {
        // this handles state changes when storybook controls are updated
        args.data = defaultData.value;
        args.dates = defaultDates.value;
        return {
            components: { DataHistoryChart },
            setup() {
                const { historicalBalances } = storeToRefs(useDemoStore());
                args.data = historicalBalances.value;
                args.dates = Array.from({length: historicalBalances.value.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD"));
                defaultData.value = args.data;
                defaultDates.value = args.dates;
                theme.value = context.globals.theme;
                const colors = [...geChartColorsByTheme(theme.value)];
                args.lineColor = colors[0];
                args.areaColor = colors[0];
                return { args };
            },
            template: '<DataHistoryChart v-bind="args" />',
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the DataHistoryChart component.",
            },
            source: {
                code: `<DataHistoryChart :label="" :dates=[] :data="[]" />`
            }
        }
    }
};