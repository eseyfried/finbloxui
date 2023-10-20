/* eslint-disable storybook/story-exports */
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import TotalFeesChart from '@/components/Core/Charts/TotalFeesChart/TotalFeesChart.vue';
import moment from "moment";

const defaultData = ref([]);
const defaultDates = ref([]);
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/TotalFeesChart',
    args: {
        data: [],
        dates: [], 
        label: "YTD Total Fees",
        barColor: "rgb(75, 85, 99)",
        chartjsData: {},
        chartjsOptions: {},
    },
    render: (args, context, template = null) => {
        // this handles state changes when storybook controls are updated
        args.data = defaultData.value;
        args.dates = defaultDates.value;
        return {
            components: { TotalFeesChart },
            setup() {
                  const { dailyFees } = storeToRefs(useDemoStore());
                  args.data = dailyFees.value;
                  args.dates = Array.from({length: dailyFees.value.length}, (_, i) => moment().month(i).endOf('month').format("YYYY-MM-DD"));
                  defaultData.value = args.data;
                  defaultDates.value = args.dates;
                  theme.value = context.globals.theme;
                  //   const colors = [...geChartColorsByTheme(theme.value)];
                  //   args.lineColor = colors[0];
                  //   args.areaColor = colors[0];
                  const formatDate = (date) => moment.utc(date).format("MMMM YYYY")
                  return { args, formatDate};
            },
            template: template || '<TotalFeesChart v-bind="args" />',
        }
      },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the TotalFeesChart component.",
            },
            source: {
                code: `<TotalFeesChart :data="[]" :dates="[]" />`
            }
        }
    }
};