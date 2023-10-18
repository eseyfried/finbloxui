import TopClientsByFees from '@/components/Advisor/Clients/TopClientsByFees/TopClientsByFees.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `TopClientsByFees` component shows the top n clients and their respective fees paid in a tabular display with a 
 * bar chart for visual comparision.
 * 
 * ### User Story
 * > As a user, I want to see my top clients ranked from high to low so I may compare who my top tier clients are by fees.
 */
 export default {
    title: 'Library/Advisor/Clients/TopClientsByFees',
    component: { TopClientsByFees },
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
            description: "An array of total client Fees values. Values must be Numeric.",
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
        feesLabel: {
            type: { name: "String", required: false },
            defaultValue: "Total Fees",
            description: "A text label for the Fees column",
            table: {
                type: { summary: "Total Fees" },
                defaultValue: { summary: "String" },
                category: 'Props',
            },
        },

        ".fb-top-clients-by-fees": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-top-clients-by-fees-md": {
            description: "The class applied to the fees valueelement when viewport is >= size md.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-top-clients-by-fees-bar-container": {
            description: "The class applied to the fees table cell element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-top-clients-by-fees-bar": {
            description: "The class applied to the fees bar chart.",
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
                        feesPercent: "",
                        feesAmount: "",
                        feesPercentStyle: "",
                        client: "",
                    }`
                }
            },
        },
    }
};


export const BasicTopClientsByFees = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };

export const CustomTemplate = {
    ...CustomTemplateStory.default
};