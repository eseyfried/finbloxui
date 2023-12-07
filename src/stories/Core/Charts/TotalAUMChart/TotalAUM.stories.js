import TotalAUMChart from '@/components/Core/Charts/TotalAUMChart/TotalAUMChart.vue';

import * as BasicStory from './Basic.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `TotalAUMChart` component shows the total year to date AUM along with daily, monthly and quarterly AUM views. The data can be total AUM for an account, houshold or entire book of business.
 * This can be an ideal dashboard component.
 * 
 * ### User Story
 * > As a user, I want to see the total AUM for a given account or household over a period of time.
 */
 export default {
    title: 'Library/Core/Charts/TotalAUMChart',
    component: { TotalAUMChart },
    tags: ['autodocs'],
    argTypes: {
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of data values representing total AUM for each day in the series. Values should be Numeric.",
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
        defaultTimePeriod: {
            type: { name: "String", required: false},
            defaultValue: "monthly",
            description: "The default time period to display data.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "monthly" },
                category: 'Props',
            },
            control: { type: 'radio' },
            options: ["daily", "monthly", "quarterly"]
        },
        lineColor: {
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
        areaColor: {
            type: { name: "String", required: false },
            defaultValue: "rrgba(255,255,255, 0.07)",
            description: "A RGBA() or Hexdecimal color value based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html).",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "rgb(75, 85, 99, 0.3)" },
                category: 'Props',
            },
            control: 'color'
        },
        label: {
            type: { name: "String", required: false },
            defaultValue: "YTD Total AUM",
            description: "The text label for the total AUM section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "YTD Total AUM" },
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
        ".fb-total-aum-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-aum-chart-hero": {
            description: "The class applied to the component total AUM hero root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-aum-chart-date": {
            description: "The class applied to the component total AUM hero date element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-aum-chart-button": {
            description: "The class applied to the component button element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-aum-chart-button-selected": {
            description: "The class applied to the component button element selected state.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-total-aum-chart-button-sm": {
            description: "The class applied to the component button element when viewed in a small viewport.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "hero": {
            description: "The `hero` slot for customizing the total AUM hero template. The slotProps props can be used in your template.",
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


export const BasicTotalAUMChart = {
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