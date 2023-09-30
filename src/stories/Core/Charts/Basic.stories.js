import Chart from '@/components/Core/Charts/Chart.vue';


// eslint-disable-next-line storybook/story-exports
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
        colors: [
              'rgb(229 231 235)',
              'rgb(209 213 219)',
              'rgb(156 163 175)',
              'rgb(107 114 128)',
              'rgb(75 85 99)',
              'rgb(55 65 81)',
              'rgb(31 41 55)'
            ]
    },
    render: (args) => ({
      components: { Chart },
      setup() {
        return { args };
      },
      template: '<Chart :type="args.type" :data="args.data" :options="args.options" />',
    }),
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