import BalanceHistoryChart from '@/components/Core/Charts/BalanceHistoryChart/BalanceHistoryChart.vue';

import * as BasicStory from './Basic.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `BalanceHistoryChart` component provides an area chart showing the historical balance trend over a date range. Additionally, 
 * it provides a set of data points for the current value, change in value as a dollar amount and percent since the previous day.
 * 
 * ### User Story
 * > As a user, I want to know the current value of my account or portfolio as well it's general trend over time so that I can quickly understand
 * my account's health over time.
 */
 export default {
    title: 'Library/Core/Charts/BalanceHistoryChart',
    component: { BalanceHistoryChart },
    tags: ['autodocs'],
    argTypes: {
        label: {
            type: { name: "String", required: false },
            defaultValue: [],
            description: "The text label for the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Total Portfolio Value" },
                category: 'Props',
            },
        },
        balances: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of balance values for each day in the series",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        dates: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of dates corresponding to the balance history series.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        lineColor: {
            type: { name: "String", required: false },
            defaultValue: "rgb(75, 85, 99)",
            description: "A RGB() or Hexdecimal color value based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html)",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "rgb(75, 85, 99)" },
                category: 'Props',
            },
        },
        areaColor: {
            type: { name: "String", required: false },
            defaultValue: "rgba(75, 85, 99, 0.3)",
            description: "A RGBA() or Hexdecimal color value based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html).",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "rgba(75, 85, 99, 0.3)" },
                category: 'Props',
            },
        },
        // colors: {
        //     type: { name: "Array" },
        //     defaultValue: [],
        //     description: "An array of colors to apply to all datasets based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html)",
        //     table: {
        //         type: { summary: "Array" },
        //         defaultValue: { summary: "[]" },
        //         category: 'Props',
        //     },
        // },
        ".fb-balance-history-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-balance-history-chart-hero": {
            description: "The class applied to the component total value root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-balance-history-chart-change": {
            description: "The class applied to the component value change root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-balance-history-chart-date": {
            description: "The class applied to the component as-of date root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "default": {
            description: "The `default` slot for customizing the total value template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        currentValue: "",
                        changeAmount: "",
                        changePercent: "",
                        asOf: "",
                        changeClasses: "",
                    }`
                }
            },
        },
    }
};


export const BasicBalanceHistoryChart = {
    ...BasicStory.default
};


export const CustomTemplate = {
    ...CustomTemplateStory.default
};