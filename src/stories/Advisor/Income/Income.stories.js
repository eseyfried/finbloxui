import Income from '@/components/Advisor/Income/Income.vue';

import * as BasicStory from './Basic.stories';
// import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `Income` component displays the total income for a given account or portfolio along with the underlying income transactions.
 * 
 * This component is an ideal dashboard stat component.
 * 
 * ### User Story
 * > As a user, I want to know how much income my account or portfolio has generated to date including the underlying income transactions
 */
 export default {
    title: 'Library/Advisor/Income',
    component: { Income },
    tags: ['autodocs'],
    argTypes: {
        label: {
            type: { name: "String", required: false },
            defaultValue: "Income",
            description: "A text label for hero section",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Income" },
                category: 'Props',
            },
        },
        data: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of [transactions object](/?path=/story/library-datadefinitions--transactions-object)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        descriptionLabel: {
            type: { name: "String", required: false },
            defaultValue: "Description",
            description: "A text label for the description column",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Description" },
                category: 'Props',
            },
        },
        dateLabel: {
            type: { name: "String", required: false },
            defaultValue: "Date",
            description: "A text label for the date column",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Date" },
                category: 'Props',
            },
        },
        amountLabel: {
            type: { name: "String", required: false },
            defaultValue: "Amount",
            description: "A text label for the amount column",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Amount" },
                category: 'Props',
            },
        },
        showTransactions: {
            type: { name: "boolean", required: false },
            defaultValue: true,
            description: "show the transactions table",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: true },
                category: 'Props',
            },
        },
        showDate: {
            type: { name: "boolean", required: false },
            defaultValue: true,
            description: "show the as of date",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: true },
                category: 'Props',
            },
        },
        ".fb-income": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-income-transactions": {
            description: "The class applied to the component transactions root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-income-transactions-amount": {
            description: "The class applied to the component transactions amount table head and column element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-income-transactions-date": {
            description: "The class applied to the component transactions date table head and column element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-income-transactions-description": {
            description: "The class applied to the component transactions description table head and column element.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "transactions": {
            description: "The `transactions` slot for customizing the transactions template. The slotProps props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        data: "",
                    }`
                }
            },
        },
    }
};


export const BasicIncome = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };

const template = CustomTemplateStory.default.template;
export const CustomTemplate = {
    args: {
        ...BasicStory.default.args,
        ...CustomTemplateStory.default.args
    },
    render: (args, context) => BasicStory.default.render(args, context, template),
    ...CustomTemplateStory.default
    
};