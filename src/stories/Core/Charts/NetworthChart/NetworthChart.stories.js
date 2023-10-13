import NetworthChart from '@/components/Core/Charts/NetworthChart/NetworthChart.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `NetworthChart` component provides a visual view of networth over time along with a snapshot view of networth stats.
 * Values include: he current Networth as of today, the change in networth since the 
 * previous month as well as since the beginning of the year.
 * 
 * This is ideal for use as a dashboard component.
 * 
 * ### User Story
 * > As a user, I want to know what my current networth is as well as how my networth is trending over time.
 */
 export default {
    title: 'Library/Core/Charts/NetworthChart',
    component: { NetworthChart },
    tags: ['autodocs'],
    argTypes: {
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of networth data values for each day in the series. This should be daily value since the beginning of the year. Values should be Numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        dates: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of dates corresponding to the data series. Dates should be in YYYY-MM-DD format.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        areaColor: {
            type: { name: "String", required: false },
            defaultValue: "rrgba(255,255,255, 0.07)",
            description: "A RGBA() or Hexdecimal color value based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html).",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "rgba(255,255,255, 0.07)" },
                category: 'Props',
            },
            control: 'color'
        },
        label: {
            type: { name: "String", required: false },
            defaultValue: "Networth",
            description: "The text label for the networth section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Networth" },
                category: 'Props',
            },
        },
        monthLabel: {
            type: { name: "String", required: false },
            defaultValue: "This Month",
            description: "The text label for the month section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Networth" },
                category: 'Props',
            },
        },
        sinceLabel: {
            type: { name: "String", required: false },
            defaultValue: "Since",
            description: "The text label for the since year section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Networth" },
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
        ".fb-networth-chart": {
            description: "The class applied to the component root element. The background color is set by default using `--fb-chart-color-4`.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-networth-chart-hero": {
            description: "The class applied to the component networth hero root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-networth-chart-month": {
            description: "The class applied to the component month root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-networth-chart-year": {
            description: "The class applied to the component year root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "hero": {
            description: "The `hero` slot for customizing the total networth template. The slotProps props can be used in your template.",
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
        "month": {
            description: "The `month` slot for customizing the current month template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        monthChangeAmount: "",
                        monthChangePercent: "",
                        changeClasses: "",
                    }`
                }
            },
        },
        "year": {
            description: "The `year` slot for customizing the since year template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        yearChangeAmount: "",
                        yearChangePercent: "",
                        changeClasses: "",
                        sinceDate: "",
                    }`
                }
            },
        },
    }
};


export const BasicNetworthChart = {
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