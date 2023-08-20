import ClientListItem from '@/components/Advisor/Clients/ClientListItem.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ClientListItem` component accepts a client data object and displays the client details. This component is intended to show basic name and account details
 * along with high-level summary financial details. 
 * 
 */

export default {
    title: 'Library/Advisor/Clients/ClientListItem',
    component: { ClientListItem },
    tags: ['autodocs'],
    argTypes: {
        client: {
            type: { name: "Object", required: true },
            defaultValue: {},
            description: "A [client object](/?path=/story/example-datadefinitions--client-object)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            control: false
        },
        showDetailsLink: {
            description: "Show details link.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        showStatsByLabel: {
            description: "Array of stats labels to display.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        detailsLinkLabel: {
            description: "Text label for details link",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Show More" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Show More",
            control: { type: 'text' },
        },
        "fb-client-list-item-details-link:click": {
            description: "Event emitted when details link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "client object" },
            },
        },
        ".fb-client-list-item": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-list-item-header": {
            description: "The class applied to the root element of client card name section.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-list-item-stats": {
            description: "The class applied to the root element of client card stats section.",
            table: {
                category: 'CSS Classes',
            },
        },
    },

};

export const BasicClient = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};