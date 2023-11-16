/* eslint-disable storybook/story-exports */
import PortfolioSummaryGrid from '@/components/Advisor/PortfolioSummaryGrid/PortfolioSummaryGrid.vue';


export default {
    title: 'Library/Advisor/PortfolioSummaryGrid',
    args: {
        portfolio: [
            { account: "Smith Retirement", as_of: "2023-10-27", cash_value: "10000.00", securities_value:  "48000.00", current_value: "58000.00", change_amount: "1400.00", change_pct: "1.00" },
            { account: "Smith Trust", as_of: "2023-10-27", cash_value: "1000.00", securities_value:  "105000.00", current_value: "1060000.00", change_amount: "1400.00", change_pct: "1.50" }
        ],
        columnLabels: {
            "account": "Account",
            "as_of": "As Of",
            "cash": "Cash",
            "securities": "Holdings",
            "current_value": "Current Value",
            "change_amount": "Change ($)",
            "change_pct": "Change (%)"
        },
        showTotals: true
    },
    render: (args, context, template = null) => {
        return {
            components: { PortfolioSummaryGrid },
            setup() {
                return { args };
            },
            template: template || '<PortfolioSummaryGrid v-bind="args"/>',
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the PortfolioSummaryGrid component.",
            },
            source: {
                code: `<PortfolioSummaryGrid :portfolio="portfolio"/>`
            }
        }
    }
};