import { DataPointRoot } from '@/components/Core/DataPoint/';
import * as BasicStory from './Basic.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
import * as CustomFormatterStory from './CustomFormatter.stories';
import * as EventsStory from './Events.stories';
/**
 * ## Overview
 * The `DataPoint` component accepts a simple data object with a label, value and optional formatting option. This component is useful
 * for creating high level dashboard stats.
 * 
 * ### User Story
 * > As a user, I want to see important summary statistics so that I can get a quick sense of how my portfolio or account is doing.
 */

export default {
    title: 'Library/Core/DataPoint',
    components: { DataPointRoot },
    tags: ['autodocs'],
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

export const BasicDataPoint = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};
export const CustomTemplate = {
    ...CustomTemplateStory.default
};
export const CustomFormatter = {
    ...CustomFormatterStory.default
};