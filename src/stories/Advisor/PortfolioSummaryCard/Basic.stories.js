/* eslint-disable storybook/story-exports */
import PortfolioSummaryCard from '@/components/Advisor/PortfolioSummaryCard/PortfolioSummaryCard.vue';


export default {
    title: 'Library/Advisor/PortfolioSummaryCard',
    args: {
        currentValueLabel: "Current Value",
        cashLabel: "Cash",
        securitiesLabel: "Holdings",
        changeLabel: "Today's Change",
        currentValue: 2913680.40,
        cashValue: 45000.40,
        securitiesValue: 2868680.40,
        changeAmount: 28686.804,
    },
    render: (args, context, template = null) => {
        return {
            components: { PortfolioSummaryCard },
            setup() {
                return { args };
            },
            template: template || '<PortfolioSummaryCard v-bind="args"/>',
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the PortfolioSummaryCard component.",
            },
            source: {
                code: `<PortfolioSummaryCard />`
            }
        }
    }
};