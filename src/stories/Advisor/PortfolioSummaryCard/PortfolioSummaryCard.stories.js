import PortfolioSummaryCard from '@/components/Advisor/PortfolioSummaryCard/PortfolioSummaryCard.vue';

import * as BasicStory from './Basic.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `PortfolioSummaryCard` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Library/Advisor/PortfolioSummaryCard',
    component: { PortfolioSummaryCard },
    tags: ['autodocs'],
    argTypes: {
        currentValueLabel: {
            type: { name: "String", required: false },
            defaultValue: "Current Value",
            description: "The text label for the current value data point",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Current Value" },
                category: 'Props',
            },
        },
        cashLabel: {
            type: { name: "String", required: false },
            defaultValue: "Cash",
            description: "The text label for the cash data point",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Cash" },
                category: 'Props',
            },
        },
        securitiesLabel: {
            type: { name: "String", required: false },
            defaultValue: "Holdings",
            description: "The text label for the securities data point",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Holdings" },
                category: 'Props',
            },
        },
        changeLabel: {
            type: { name: "String", required: false },
            defaultValue: "Today's Change",
            description: "The text label for the change value data point",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Today's Change" },
                category: 'Props',
            },
        },
        currentValue: {
            type: { name: "String", required: false },
            defaultValue: "",
            description: "The current total value of the portfolio including cash and securities",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        cashValue: {
            type: { name: "String", required: false },
            defaultValue: "",
            description: "The current cash value of the portfolio",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        securitiesValue: {
            type: { name: "String", required: false },
            defaultValue: "",
            description: "The current total securities value of the portfolio",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        changeAmount: {
            type: { name: "String", required: false },
            defaultValue: "",
            description: "The change in value (dollars) of securities for the portfolio",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        // SLOTS
        "default": {
            description: "The `default` slot for customizing the component template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        currentValue: "",
                        cashValue: "",
                        securitiesValue: "",
                        changeAmount: "",
                        changeAmountPct: "",
                        changeClasses: "",
                    }`
                }
            },
        },
        ".fb-portfolio-summary-card": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-current-value-label": {
            description: "The class applied to the current value label root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-current-value": {
            description: "The class applied to the current value root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-cash-label": {
            description: "The class applied to the cash label root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-cash": {
            description: "The class applied to the cash value root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-securities-label": {
            description: "The class applied to the securities label root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-securities": {
            description: "The class applied to the securities value root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-change-label": {
            description: "The class applied to the change label root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-portfolio-summary-card-change": {
            description: "The class applied to the change amount value root element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicPortfolioSummaryCard = {
    ...BasicStory.default
};


const template = CustomTemplateStory.default.template;
export const CustomTemplate = {
    args: {
        ...BasicStory.default.args,
        ...CustomTemplateStory.default.args
    },
    render: (args, context) => BasicStory.default.render(BasicStory.default.args, context, template),
    ...CustomTemplateStory.default
    
};