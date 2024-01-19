import { DataPointRoot } from '@/components/Core/DataPoint/';
import { action } from "@storybook/addon-actions";
import { useStoryTemplate } from "@/stories/modules/useStoryTemplate";


/**
 * ## Overview
 * The `DataPoint` component accepts a simple data object with a label, value and optional formatting option. This component is useful
 * for creating high level dashboard stats.
 * 
 * ### User Story
 * > As a user, I want to see important summary statistics so that I can get a quick sense of how my portfolio or account is doing.
 */

const main =  {
    title: 'Library/Core/DataPoint',
    components: { DataPointRoot },
    tags: ['autodocs'],
    args: {
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
        actionLabel: "show more",
        showAction: true,
    },
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
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            // control: { type: 'radio' },
        },
        actionLabel: {
            description: "Text label for action link",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Show More" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Show More",
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
        }
    }
};

export default main;

const template = `<DataPointRoot v-bind="args" @fb-data-point-action-link:click="handleActionClick" />`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { DataPointRoot },
                setup() {
                    return { args };
                },
                template: config?.template || useStoryTemplate(template, config?.props),
                methods: {
                    handleActionClick: (datapoint) => { alert(`Action link was clicked with data ${JSON.stringify(datapoint)}`); action('@fb-data-point-action-link:click')(datapoint) }
                }
            }
        },
        parameters: {
            docs: {
                description: {
                    story: config?.story,
                },
                source: {
                    code: config?.template || config?.source || useStoryTemplate(template, config?.props)
                }
            }
        }
    };
}


export const DefaultClientCard = {
    ...Template({
        story: "The default `DataPointRoot`component renders a data point's label, value, trend and action link.",
        props: { ...main.args }
    })
}

export const WithCustomActionLabel = {
    ...Template({
        props: { ...main.args, actionLabel: "show more details" }
    }),
    args: {
        ...main.args,
        actionLabel: "show more details"
    },
}

export const WithActionOff = {
    ...Template({
        props: { ...main.args, showAction: false }
    }),
    args: {
        ...main.args,
        showAction: false
    },
}
