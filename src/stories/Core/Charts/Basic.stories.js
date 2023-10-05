import Chart from '@/components/Core/Charts/Chart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";


// eslint-disable-next-line storybook/story-exports
const theme = ref("headless");
export default {
    title: 'Library/Core/Charts',
    args: {
        type: "bar",
        data: {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              }
            }
        },
        colors: [...geChartColorsByTheme(theme.value)]
    },
    render: (args, context) => {
        return {
            components: { Chart },
            setup() {
                theme.value = context.globals.theme;
                args.colors = [...geChartColorsByTheme(theme.value)];
                return { args };
            },
            template: `<Chart />`,
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Chart component.",
            },
            source: {
                code: `<Chart :type="args.type" :data="args.data" :options="args.options" />`
            }
        }
    }
};