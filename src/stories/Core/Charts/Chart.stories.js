import Chart from '@/components/Core/Charts/Chart.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";


import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";
const theme = ref("headless");
const data = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Total AUM By Month',
      data: [12000, 19000, 30000, 50000, 20000, 30000],
      borderWidth: 1,
    }]
}

const getArgs = generateArgs({
    type: defaultValue(Chart, 'type'),
    data: data,
    options: {},
    colors: defaultValue(Chart, 'colors')
})

const components = { 
    Chart
}

const template = `
    <Chart
        :type="args.type"
        :data="args.data"
        :options="args.options"
        :colors="args.colors"
    />
`;

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
    components,
    // tags: ['autodocs'],
    args: getArgs(),
    argTypes: {
        type: {
            description: "Chart type",
            type: { name: "String", required: true },
            table: {
                type: { summary: "String"},
                defaultValue: { summary: defaultValue(Chart, 'type') },
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
            control: { type: 'select' },
        },
        data: {
            type: { name: "Object", required: true },
            description: "A chartjs [data object](https://www.chartjs.org/docs/latest/general/data-structures.html)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: JSON.stringify(defaultValue(Chart, 'data')) },
                category: 'Props',
            },
        },
        options: {
            type: { name: "Object", required: false },
            description: "A chartjs [options object](https://www.chartjs.org/docs/latest/configuration/)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: JSON.stringify(defaultValue(Chart, 'options')) },
                category: 'Props',
            },
        },
        colors: {
            type: { name: "Array" },
            defaultValue: [],
            description: "An array of colors to apply to all datasets based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: JSON.stringify(defaultValue(Chart, 'colors')) },
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

const render = (args, context) => ({
    components,
    setup: () => { 
        theme.value = context.globals.theme;
        args.colors = {...[...geChartColorsByTheme(theme.value)]}
        return { args }
    },
    template,
})



export const BasicUse = render
