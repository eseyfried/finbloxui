import moment from "moment";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import InvestmentsChart from '@/components/Core/Charts/InvestmentsChart/InvestmentsChart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';

// eslint-disable-next-line storybook/story-exports
const defaultData = ref([]);
const defaultDates = ref([]);
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts/InvestmentsChart',
    args: {
        data: [],
        dates: [], 
        label: "Investments",
        changeAmountLabel: "Change ($)",
        changePercentLabel: "Change (%)",
        areaColor: "rgba(255, 255, 255, 0.07)",
        chartjsData: {},
        chartjsOptions: {},
    },
    render: (args, context, template = null) => {
      // this handles state changes when storybook controls are updated
      args.data = defaultData.value;
      args.dates = defaultDates.value;
      return {
          components: { InvestmentsChart },
          setup() {
                const { historicalBalances } = storeToRefs(useDemoStore());
                args.data = historicalBalances.value;
                args.dates = Array.from({length: historicalBalances.value.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD"));
                defaultData.value = args.data;
                defaultDates.value = args.dates;
                theme.value = context.globals.theme;
                //   const colors = [...geChartColorsByTheme(theme.value)];
                //   args.lineColor = colors[0];
                //   args.areaColor = colors[0];
                const formatDate = (date) => moment.utc(date).format("MMMM YYYY")
                return { args, formatDate};
          },
          template: template || '<InvestmentsChart v-bind="args" />',
      }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the InvestmentsChart component.",
            },
            source: {
                code: `<InvestmentsChart  :data="[]" :dates="[]"/>` 
            }
        }
    }
};