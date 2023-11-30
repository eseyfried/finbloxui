import InvestmentsChart from '@/components/Core/Charts/InvestmentsChart/InvestmentsChart.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `InvestmentsChart` component provides a visual view of investments over time along with a snapshot view of investments stats.
 * Values include: he current Investments as of today, the change in investments since the 
 * previous month as well as since the beginning of the year.
 * 
 * This is ideal for use as a dashboard component.
 * 
 * ### User Story
 * > As a user, I want to know what my current investments is as well as how my investments is trending over time.
 */
 export default {
    title: 'Library/Core/Charts/InvestmentsChart',
    component: { InvestmentsChart },
    tags: ['autodocs'],
    argTypes: {
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of investments data values for each day in the series. This should be daily value since the beginning of the year. Values should be Numeric.",
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
            defaultValue: "Investments",
            description: "The text label for the investments section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Investments" },
                category: 'Props',
            },
        },
        changeAmountLabel: {
            type: { name: "String", required: false },
            defaultValue: "Change ($)",
            description: "The text label for the $ change amount of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Investments" },
                category: 'Props',
            },
        },
        changePercentLabel: {
            type: { name: "String", required: false },
            defaultValue: "Change (%)",
            description: "The text label for the % change section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Change" },
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
        ".fb-investments-chart": {
            description: "The class applied to the component root element. The background color is set by default using `--fb-chart-color-4`.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-investments-chart-hero": {
            description: "The class applied to the component investments hero root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-investments-chart-change-amount": {
            description: "The class applied to the component change amount root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-investments-chart-change-percent": {
            description: "The class applied to the component change percent root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "hero": {
            description: "The `hero` slot for customizing the total investments template. The slotProps props can be used in your template.",
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
        "changeAmount": {
            description: "The `changeAmount` slot for customizing the change amount template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        changeAmount: "",
                        changeClasses: "",
                    }`
                }
            },
        },
        "changePercent": {
            description: "The `changePercent` slot for customizing the change percent template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        changePercent: "",
                        changeClasses: "",
                    }`
                }
            },
        },
    }
};


export const BasicInvestmentsChart = {
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
    render: (args, context) => BasicStory.default.render(args, context, template),
    ...CustomTemplateStory.default
    
};