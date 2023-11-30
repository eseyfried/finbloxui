/* eslint-disable storybook/story-exports */
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TotalAUMChart from '@/components/Core/Charts/TotalAUMChart/TotalAUMChart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import moment from "moment";

const defaultData = ref([]);
const defaultDates = ref([]);
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/TotalAUMChart',
    args: {
        data: [],
        dates: [], 
        label: "YTD Total AUM",
        lineColor: "rgb(75, 85, 99)",
        areaColor: "rgb(75, 85, 99, 0.3)",
        chartjsData: {},
        chartjsOptions: {},
    },
    render: (args, context, template = null) => {
        // this handles state changes when storybook controls are updated
        args.data = defaultData.value;
        args.dates = defaultDates.value;
        return {
            components: { TotalAUMChart },
            setup() {
                  const { monthlyFees, dailyAUM } = storeToRefs(useDemoStore());
                  args.data = dailyAUM.value;
                  args.dates = Array.from({length: dailyAUM.value.length}, (_, i) => moment.utc().dayOfYear(i+1).format("YYYY-MM-DD"));
                  defaultData.value = args.data;
                  defaultDates.value = args.dates;
                  theme.value = context.globals.theme;
                    const colors = [...geChartColorsByTheme(theme.value)];
                    args.lineColor = colors[3];
                    args.areaColor = colors[0];
                  const formatDate = (date) => moment.utc(date).format("MMMM YYYY")
                  return { args, formatDate};
            },
            template: template || '<TotalAUMChart v-bind="args" />',
        }
      },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the TotalAUMChart component.",
            },
            source: {
                code: `<TotalAUMChart :data="[]" :dates="[]" />`
            }
        }
    }
};