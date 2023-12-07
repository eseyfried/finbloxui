import AnalyticsPage from './Analytics.vue';
import { ref } from "vue"; 

export default {
    title: 'Examples/Advisor',
    // component: DashboardPage,
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
      layout: 'fullscreen',
    },
  };
  
//   export const Dashboard = {};
const theme = ref("headless");
export const Analytics = {
    args: {
        theme: theme.value
    },
    render: (args, context) => {
        args.theme = context.globals.theme;
        theme.value = context.globals.theme;
        return {
            components: { AnalyticsPage },
            setup: () => {
                return { args }
            },
            template: `<AnalyticsPage :theme="args.theme"/>`,
        }
    },
};