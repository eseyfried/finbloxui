import ClientList from '../../../../components/Advisor/Clients/ClientList.vue';


import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ClientList` component accepts an array of client objects and displays a responsive grid of `ClientCard` components or a responsive list of `ClientListItem` components.
 * This component is intended to show a list of all clients and some summary details per client.
 * Using the details link, you can navigate to a more detailed view for a given client.
 * ### User Story
 * > "As an Advisor, I want to see a list of my clients with a high level summary of their data so that I can quickly scan and locate my clients."
 */

export default {
    title: 'Example/Advisor/Clients/ClientList',
    component: { ClientList },
    tags: ['autodocs'],
    argTypes: {
        clients: {
            type: { name: "Array", required: true },
            defaultValue: [],
            // description: `<pre>${JSON.stringify(ClientObject, null, 4)}</pre>`,
            description: "An array of [client objects](/?path=/story/example-datadefinitions--client-object)",
            
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
            control: false
        },
        listType: {
            type: { name: "String"},
            defaultValue: { summary: "" },
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "ClientListItem" },
                category: 'Props',
            },
            options: ['ClientCard', 'ClietListItem'],
            control: { type: 'radio' },
        },
        clientCardOptions: {
            description: "Supports all [ClientCard](/?path=/docs/example-advisor-clients-clientcard--docs) component props",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            type: { name: "object" },
            defaultValue: "{}",
            control: { type: 'object' },
        },
        clientListItemOptions: {
            description: "Supports all [ClientListItem](/?path=/docs/example-advisor-clients-clientlistitem--docs) component props",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            type: { name: "object" },
            defaultValue: "{}",
            control: { type: 'object' },
        },
        "fb-client-list-details-link:click": {
            description: "Event emiited when details link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "client object" },
            },
        },
        ".fb-client-list": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-list-item-container": {
            description: "The class applied to each client list item container element.",
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