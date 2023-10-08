import Chart from '@/components/Core/Charts/Chart.vue';
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
        colors: []
    },
    render: (args, context) => {
        return {
            components: { Chart },
            setup() {
                theme.value = context.globals.theme;
                return { args };
            },
            template: `<Chart />`,
        }
    },
    parameters: {
        docs: {
            description: {
                story: `
FinbloxUI Charts can use custom css variables to set the colors for charts. Add --fb-chart-color-{#} to the :root css pseudo-class in your stylesheet.

For example:

&lt;style type="text/css"&gt;

    :root {
        --fb-chart-color-1: #37A3EB;
        --fb-chart-color-2: #FD6384;
        --fb-chart-color-3: #4BC1C1;
        --fb-chart-color-4: #FD9F3F;
        --fb-chart-color-5: #9965FE;
        --fb-chart-color-6: #FECD57;
        --fb-chart-color-7: #C9CBD0;
    }
    
&lt;/style&gt;

                `,
            },
            source: {
                code: `
const dassta = {
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