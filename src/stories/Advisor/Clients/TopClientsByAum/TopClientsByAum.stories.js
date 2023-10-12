import TopClientsByAum from '@/components/Advisor/Clients/TopClientsByAum/TopClientsByAum.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `TopClientsByAum` component shows the top n clients and their respective assets under managmener in a tabular display with a 
 * bar chart for visual comparision.
 * 
 * ### User Story
 * > As a user, I want to see my top clients ranked from high to low so I may compare who my top tier clients are by AUM.
 */
 export default {
    title: 'Library/Advisor/Clients/TopClientsByAum',
    component: { TopClientsByAum },
    tags: ['autodocs'],
    argTypes: {
        clients: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of client or household names",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of total client AUM values. Values must be Numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        clientLabel: {
            type: { name: "String", required: false },
            defaultValue: "Clients",
            description: "A text label for the client column",
            table: {
                type: { summary: "Clients" },
                defaultValue: { summary: "String" },
                category: 'Props',
            },
        },
        aumLabel: {
            type: { name: "String", required: false },
            defaultValue: "Total Assets Under Management",
            description: "A text label for the AUM column",
            table: {
                type: { summary: "Total Assets Under Management" },
                defaultValue: { summary: "String" },
                category: 'Props',
            },
        },

        ".fb-top-clients-by-aum": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-top-clients-by-aum-md": {
            description: "The class applied to the aum valueelement when viewport is >= size md.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-top-clients-by-aum-bar-container": {
            description: "The class applied to the aum table cell element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-top-clients-by-aum-bar": {
            description: "The class applied to the aum bar chart.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "default": {
            description: "The `default` slot for customizing the table row template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        aumPercent: "",
                        aumAmount: "",
                        aumPercentStyle: "",
                        client: "",
                    }`
                }
            },
        },
    }
};


export const BasicTopClientsByAum = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };

export const CustomTemplate = {
    ...CustomTemplateStory.default
};