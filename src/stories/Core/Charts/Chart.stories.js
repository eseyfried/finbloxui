import Chart from '@/components/Core/Charts/Chart.vue';

import * as BasicStory from './Basic.stories';
import * as CustomCSSVarsStory from './CustomCSSVars.stories';

/**
 * ## Overview
 * The `Chart` component is a convenient wrapper around [ChartJS](https://www.chartjs.org).
 * It can be used out-of-the-box to create your own charts or as a base component for more
 * custom chart components.
 * 
 * ### User Story
 * > As a user, I want to display data in a visual way so that I can more simply communicate information.
 */
 export default {
    title: 'Library/Core/Charts',
    component: { Chart },
    tags: ['autodocs'],
    argTypes: {
        type: {
            description: "Chart type",
            type: { name: "String", required: true },
            table: {
                type: { summary: "String"},
                defaultValue: { summary: "bar" },
                category: 'Props',
            },
            options: [
                "bar",
                "line",
                "bubble",
                "doughnut",
                "pie",
                "polarArea",
                "radar",
                "scatter"
            ],
            control: { type: 'radio' },
        },
        data: {
            type: { name: "Object", required: true },
            defaultValue: {},
            description: "A chartjs [data object](https://www.chartjs.org/docs/latest/general/data-structures.html)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
        },
        options: {
            type: { name: "Object", required: true },
            defaultValue: {},
            description: "A chartjs [options object](https://www.chartjs.org/docs/latest/configuration/)",
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
        ".fb-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        "--fb-chart-color-{#}": {
            description: `
Char colors can also be styled using custom CSS variables placed in your style sheet. Each custom variable name should be incremented numerically. For example:

--fb-chart-color-1, --fb-chart-color--2, etc.
        
:root {

    --fb-chart-color-1: rgb(224 231 255);

    --fb-chart-color-2: rgb(199 210 254);

    ...

    --fb-chart-color-10: rgb(165 180 252);

}`,
            table: {
                category: 'CSS Vars',
            },
        },
    }
};


export const BasicChart = {
    ...BasicStory.default
};

export const UsingCustomCSSVars = {
    ...CustomCSSVarsStory.default
};