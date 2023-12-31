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
              label: 'Total AUM By Month',
              data: [12000, 19000, 30000, 50000, 20000, 30000],
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
                code: `
const data = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [{
        label: 'Total AUM By Month',
        data: [12000, 19000, 30000, 50000, 20000, 30000],
        borderWidth: 1,
    }]
}
<Chart type="bar" :data="data" />`
            }
        }
    }
};