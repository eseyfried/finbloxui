import ClientCard from '@/components/Advisor/Clients/ClientCard.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ClientCard` component accepts a client data object and displays the client details. This component is intended to show basic name and address details
 * along with high-level summary financial details. 
 * 
 */

export default {
    title: 'Library/Advisor/Clients/ClientCard',
    component: { ClientCard },
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
        showStats: {
            description: "Show stats section.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        showContactInfo: {
            description: "Show contact info section.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
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
        "fb-client-card-contact-link:click": {
            description: "Event emiited when email or phone link is clicked",
            table: {
                category: 'Events',
                defaultValue: { summary: "client.contact_info.email or client.contact_info.phone object" },
            },
        },
        "fb-client-card-details-link:click": {
            description: "Event emiited when details link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "client object" },
            },
        },
        ".fb-client-card": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-card-header": {
            description: "The class applied to the root element of client card name section.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-card-stats": {
            description: "The class applied to the root element of client card stats section.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-card-contact-info": {
            description: "The class applied to the root element of client card contact info section.",
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