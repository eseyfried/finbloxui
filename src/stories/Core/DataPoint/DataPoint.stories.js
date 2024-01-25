import {
    DataPointRoot,
    DataPointLabel,
    DataPointValue,
    DataPointTrend,
    DataPointAction
} from '@/components/Core/DataPoint/';
import { action } from "@storybook/addon-actions";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";

const getArgs = generateArgs({
    as: defaultValue(DataPointRoot, 'as'),
    dataPoint: {
        label: "YTD AUM",
        value: "12345678.90",
        format: "currency",
        trend: {
            format: "currency",
            value: 14526.34,
            direction: "up"
        }
    },
    actionLabel: defaultValue(DataPointRoot, 'actionLabel'),
    showAction: defaultValue(DataPointRoot, 'showAction'),
})

const components = { 
    DataPointRoot,
    DataPointLabel,
    DataPointValue,
    DataPointTrend,
    DataPointAction
 }

const template = `
    <DataPointRoot
        :dataPoint="args.dataPoint"
        :actionLabel="args.actionLabel"
        :showAction="args.showAction"
        :as="args.as"
        @fb-data-point-action-link:click="handleActionClick"
    />`

const methods = {
    handleActionClick: (datapoint) => { alert(`Action link was clicked with data ${JSON.stringify(datapoint)}`); action('@fb-data-point-action-link:click')(datapoint) }
}

/**
 * ## Overview
 * The `DataPoint` component accepts a simple data object with a label, value and optional formatting option. This component is useful
 * for creating high level dashboard stats.
 * 
 * ### User Story
 * > As a user, I want to see important summary statistics so that I can get a quick sense of how my portfolio or account is doing.
 */

export default  {
    title: 'Library/Core/DataPoint',
    components,
    tags: ['autodocs'],
    args: getArgs(),
    argTypes: {
        dataPoint: {
            type: { name: "Object", required: true },
            defaultValue: {},
            description: "An object with a text label, value and optional format options: currency, percent, callback. For more options, see [DataPoint](/?path=/story/example-datadefinitions--data-point-object)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{ label: null, value: null, format: null, trend: { format: null, direction: null, value: null } }" },
                category: 'Props',
            },
        },
        showAction: {
            description: "Show action link.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(DataPointRoot, 'showAction') },
                category: 'Props',
            },
            options: [true, false],
            // control: { type: 'radio' },
        },
        actionLabel: {
            description: "Text label for action link",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(DataPointRoot, 'actionLabel') },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        "fb-data-point-action-link:click": {
            description: "Event emiited when action link is clicked. Typically used for linking to deeper content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "data point object" },
            },
        },
        ".fb-data-point": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-data-point-body": {
            description: "The class applied to the component body element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-data-point-trend": {
            description: "The class applied to the data point trend container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-data-point-footer": {
            description: "The class applied to the component footer element.",
            table: {
                category: 'CSS Classes',
            },
        },
        DataPointLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<DataPointLabel />' },
                category: 'Related Components',
            },
        },
        DataPointValue: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<DataPointValue />' },
                category: 'Related Components',
            },
        },
        DataPointAction: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<DataPointAction />' },
                category: 'Related Components',
            },
        },
        DataPointTrend: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<DataPointTrend />' },
                category: 'Related Components',
            },
        },
    }
};



const render = (args) => ({
    components,
    setup: () => { return { args } },
    template,
    methods
})


export const BasicUse = render

export const WithCustomActionLabel = {
    render,
    args: {
        actionLabel: "show more details"
    }
}

export const WithActionOff = {
    render,
    args: {
        showAction: false
    }
}

/**
 * 
 * You can create a custom layout using sub-components and wrapping them with your own HTML tags and css.
 */
export const CustomLayoutUsingSubComponents = (args) => ({
    components,
    setup: () => { return { args } },
    methods,
    template: `
    <div class="custom-layout">
    <DataPointRoot :dataPoint="args.dataPoint" class="w-1/2">
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
            </div>
            <div class="p-4 text-right">
                <DataPointLabel as="p" class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600" />
                <DataPointValue class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900" />
            </div>
            <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong class="text-green-500">
                        <DataPointTrend />
                    </strong>&nbsp;since yesterday
                </p>
            </div>
        </div>
    </DataPointRoot>
    </div>
    `
})
