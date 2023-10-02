import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/Charts/AssetAllocationChart',
    args: {
        type: "doughnut",
        format: "percent",
        assetCategories: ['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash'],
        allocations: [45, 15, 20, 0, 20],
        options: {},
        data: {},
        colors: []

    },
    render: (args) => ({
      components: { AssetAllocationChart },
      setup() {
        return { args };
      },
      template: `<AssetAllocationChart />`,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the AssetAllocationChart component.",
            },
            source: {
                code: `
<AssetAllocationChart
    type="doughnut"
    format="percent"
    :assetCategories="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
    :options="{}"
    :data="{}"
    :allocations="[45, 15, 20, 0, 20]"
/>
                `
            }
        }
    }
};