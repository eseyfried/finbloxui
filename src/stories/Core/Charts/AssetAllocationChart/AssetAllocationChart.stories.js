import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue';

import * as BasicStory from './Basic.stories';
/**
 * ## Overview
 * The `AssetAllocationChart` component is a classic way to visually display an account or portfolio's
 * asset allocation. This component offers a pie or doughnut chart along with an interactive legend
 * allowing for datapoints to be toggled on or off.
 * 
 * ### User Story
 * > As a user, I want a way to visually understand how my assets are allocated within my account or portfolio so that I can detemine what actions I must take.
 */
 export default {
    title: 'Library/Core/Charts/AssetAllocationChart',
    component: { AssetAllocationChart },
    tags: ['autodocs'],
    argTypes: {
        type: {
            type: { name: "String", required: false },
            defaultValue: "doughnut",
            description: "A chartjs [configuration options object](https://www.chartjs.org/docs/latest/configuration/)",
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
        format: {
            type: { name: "String", required: false },
            defaultValue: "percent",
            description: "Format the allocation values as percent or currency",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "percent" },
                category: 'Props',
            },
            options: [
                "percent",
                "currency",
            ],
            control: { type: 'radio' },
        },
        assetCategories: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of asset categories",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        allocations: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of values for each asset category in the asset categories prop. Values should be numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        data: {
            type: { name: "Object", required: false },
            defaultValue: {},
            description: "A chartjs [data structure object](https://www.chartjs.org/docs/latest/general/data-structures.html)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
        },
        options: {
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
        ".fb-asset-allocation-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-chart-legend": {
            description: "The class applied to the chart legend root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-chart-legend-list": {
            description: "The class applied to the chart legend list container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-chart-legend-list-item": {
            description: "The class applied to each chart legend list item element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-chart-legend-list-item-color": {
            description: "The class applied to each chart legend list item color element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-chart-legend-item-hidden": {
            description: "The class applied to each chart legend list item when toggled off (hidden).",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicAssetAllocationChart = {
    ...BasicStory.default
};