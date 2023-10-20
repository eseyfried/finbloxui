import TotalFeesChart from '@/components/Core/Charts/TotalFeesChart/TotalFeesChart.vue';

import * as BasicStory from './Basic.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `TotalFeesChart` component shows the total year to date fee income along with monthly or quarterly fee breakdown. The data can be total fees for an account, houshold or entire book of business.
 * This can be an ideal dashboard component.
 * 
 * ### User Story
 * > As a user, I want to see how much fee income a given account or household has produced over time.
 */
 export default {
    title: 'Library/Core/Charts/TotalFeesChart',
    component: { TotalFeesChart },
    tags: ['autodocs'],
    argTypes: {
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of data values representing total monthly fees for each month in the series. Values should be Numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        dates: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of dates corresponding to each value in the data series. Dates should be in YYYY-MM-DD format.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        barColor: {
            type: { name: "String", required: false },
            defaultValue: "rgb(75, 85, 99)",
            description: "A RGB() or Hexdecimal color value based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html).",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "rgb(75, 85, 99)" },
                category: 'Props',
            },
            control: 'color'
        },
        label: {
            type: { name: "String", required: false },
            defaultValue: "YTD Total Fees",
            description: "The text label for the total fees section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "YTD Total Fees" },
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
        ".fb-total-fees-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-fees-chart-hero": {
            description: "The class applied to the component total fees hero root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-fees-chart-date": {
            description: "The class applied to the component total fees hero date element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-fees-chart-button": {
            description: "The class applied to the component button element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-fees-chart-button-selected": {
            description: "The class applied to the component button element selected state.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-fees-chart-button-sm": {
            description: "The class applied to the component button element when viewed in a small viewport.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "hero": {
            description: "The `hero` slot for customizing the total fees hero template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        currentValue: "",
                        asOf: "",
                    }`
                }
            },
        },
    }
};


export const BasicTotalFeesChart = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };
const template = CustomTemplateStory.default.template;
export const CustomTemplate = {
    // ...CustomTemplateStory.default
    args: {
        ...BasicStory.default.args,
        ...CustomTemplateStory.default.args
    },
    render: (args, context) => BasicStory.default.render(args, context, template),
    ...CustomTemplateStory.default
    
};