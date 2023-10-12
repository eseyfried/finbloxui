import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `AccountsHeldawayByAccountType` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Library/Core/Charts/AccountsHeldawayByAccountType',
    component: { AccountsHeldawayByAccountType },
    tags: ['autodocs'],
    argTypes: {
        type: {
            type: { name: "String", required: false },
            defaultValue: "doughnut",
            description: "A chartjs chart type",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "doughnut" },
                category: 'Props',
            },
            options: [
                "doughnut",
                "pie",
            ],
            control: { type: 'radio' },
        },
        labels: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of held away account types",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of total values for each heldaway account type in the data prop. Values should be numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        totalLabel: {
            type: { name: "String", required: false },
            defaultValue: "Total AUM",
            description: "The text label for the total section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Clients" },
                category: 'Props',
            },
        },
        totalValue: {
            type: { name: "String", required: false },
            defaultValue: "0.00",
            description: "The total value for the total section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "0.00" },
                category: 'Props',
            },
        },
        chartjsData: {
            type: { name: "Object", required: false },
            defaultValue: {},
            description: "A chartjs [data structure object](https://www.chartjs.org/docs/latest/general/data-structures.html)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
        },
        chartjsOptions: {
            type: { name: "Object", required: false },
            defaultValue: {},
            description: "A chartjs [configuration options object](https://www.chartjs.org/docs/latest/configuration/)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
        },
        colors: {
            type: { name: "Array" },
            defaultValue: [],
            description: "An array of colors to apply to all datasets based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        ".fb-accounts-heldaway-by-account-type-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-accounts-heldaway-by-account-type-chart-hero": {
            description: "The class applied to the component total section root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "default": {
            description: "The `default` slot for customizing the total template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        totalLabel: "",
                        totalValue: "",
                    }`
                }
            },
        },
    }
};


export const BasicAccountsHeldawayByAccountType = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };

// export const CustomTemplate = {
//     ...CustomTemplateStory.default
// };