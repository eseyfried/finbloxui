
import AccountCarousel from '@/components/Core/Navigation/AccountCarousel.vue';

import * as BasicStory from './Basic.stories';
import * as AccountClickStory from './AccountClick.stories';
import * as CustomAccountTemplateStory from './CustomAccountTemplate.stories';


/**
 * ## Overview
 * The `AccountCarousel` component accepts an array of account objects rendering them to a navigational carousel.
 * 
 * ### Responsive Behavior
 * On smaller viewports, the number of visible accounts and scrollable accounts is fixed to 1 overriding any props you may have set.
 * The carousel displays navigational left/right buttons on non-mobile viewports while allowing touch navigation on mobile.
 */
export default {
    title: 'Library/Core/Navigation/AccountCarousel',
    component: { AccountCarousel },
    tags: ['autodocs'],
    argTypes: {
        accounts: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: (() => {
                 
let str = `
<pre>
A collection of account objects representing accounts to output.
For example: 
{
    id: <i>unique id</i>,
    number: <i>account number</i>,
    name: <i>account name</i>,
    total_market_value: <i>total market value</i>,
    change_in_value_amt: <i>change in value as a dollar amount</i>,
    change_in_value_pct: <i>change in value as a percentage</i>,
}
</pre>
`;
return str;
})(),
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
            control: false
        },
        "fb-account-carousel:click": {
            description: "Event emiited on account item click",
            table: {
                category: 'Events',
                defaultValue: { summary: "{ account: <account object>, index: <position> }" },
            },
        },
        numVisibile: {
            description: "Number of accounts visible in the carousel per page",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: "1" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "1",
            control: { type: 'text' },
        },
        numScroll: {
            description: "Number of accounts to scroll at a time",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: "1" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "1",
            control: { type: 'text' },
        },
        showLabels: {
            description: "Show data labels.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        totalMarketValueLabel: {
            description: "Total market value text label",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Total Market Value" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Total Market Value",
            control: { type: 'text' },
        },
        changeInValueLabel: {
            description: "Change in value text label",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Change In Value" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Change In Value",
            control: { type: 'text' },
        },
        accountNameLabel: {
            description: "Account name text label",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Account Name" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Account Name",
            control: { type: 'text' },
        },
        accountNumberLabel: {
            description: "Account number text label",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Account Number" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Account Number",
            control: { type: 'text' },
        }
    },

};

export const BasicAccountCarousel = {
    ...BasicStory.default
};



export const SelectAccountEvent = {
    ...AccountClickStory.default
}

export const CustomAccountTemplate = {
    ...CustomAccountTemplateStory.default
}
