import PortfolioSummaryGrid from '@/components/Advisor/PortfolioSummaryGrid/PortfolioSummaryGrid.vue';

import * as BasicStory from './Basic.stories';
// import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `PortfolioSummaryGrid` component provides a highlevel table view of a portfolio or grouping of accounts.
 * 
 * ### User Story
 * > As a user, I want to see a highlevel summary of my portfolio so that I can quickly understand the value of my portfolio and it's underlying accounts.
 */
 export default {
    title: 'Library/Advisor/PortfolioSummaryGrid',
    component: { PortfolioSummaryGrid },
    tags: ['autodocs'],
    argTypes: {
        portfolio: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of account summary objects",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: `[{
                    account: null,
                    as_of: null,
                    cash_value: null,
                    securities_value:  null,
                    current_value: null,
                    change_amount: null,
                    change_pct: null
                }]` },
                category: 'Props',
            },
        },
        columnLabels: {
            type: { name: "Object", required: false },
            defaultValue: {},
            description: "An object containing text labels for each column in the table.",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: `{
                    "account": "Account",
                    "as_of": "As Of",
                    "cash": "Cash",
                    "securities": "Holdings",
                    "current_value": "Current Value",
                    "change_amount": "Change ($)",
                    "change_pct": "Change (%)"
                }` },
                category: 'Props',
            },
        },
        showTotals: {
            type: { name: "Boolean", required: false },
            defaultValue: true,
            description: "Show column totals",
            table: {
                type: { summary: "Boolean" },
                defaultValue: true,
                category: 'Props',
            },
            options: [true, false],
            control: { type: "boolean"}
        },
        dataTableOptions :{
            type: { name: "Object" },
            defaultValue: {
                "columnSelector" : true
            },
            description: "An object of [DataTable](/?path=/docs/example-core-datatable-datatable--docs) properties",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            control: { type: 'object' },
        },
        ".fb-portfolio-summary-grid": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicPortfolioSummaryGrid = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };

const template = CustomTemplateStory.default.template;
export const CustomTemplate = {
    args: {
        ...BasicStory.default.args,
        ...CustomTemplateStory.default.args
    },
    render: (args, context) => BasicStory.default.render(BasicStory.default.args, context, template),
    ...CustomTemplateStory.default
    
};