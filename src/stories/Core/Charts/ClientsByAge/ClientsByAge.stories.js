import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue';

import * as BasicStory from './Basic.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ClientsByAge` component shows a distribution of clients by age groups
 * 
 * ### User Story
 * > As a user, I want to know how many clients I have as well as how many are within specific age groups.
 */
 export default {
    title: 'Library/Core/Charts/ClientsByAge',
    component: { ClientsByAge },
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
            defaultValue: ['20-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100+'],
            description: "An array of age groups",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "['20-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100+']" },
                category: 'Props',
            },
        },
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of values for each age group in the age group prop. Values should be numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        totalLabel: {
            type: { name: "String", required: false },
            defaultValue: "Clients",
            description: "The text label for the total section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Clients" },
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
        ".fb-clients-by-age-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-clients-by-age-chart-hero": {
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
                        totalClients: "",
                    }`
                }
            },
        },
    }
};


export const BasicClientsByAge = {
    ...BasicStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};