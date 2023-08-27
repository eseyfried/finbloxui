
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
                defaultValue: { 
                    detail: "The object passed to the event handler",
                    summary: `{ 
                        account: <account object>,
                        index: <position>
                    }` },
            },
        },
        numVisibile: {
            description: "Number of accounts visible in the carousel per page",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: 3 },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: 3,
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
        defaultAccountId: {
            description: "The default account id to select and bring into view. The selected account will have selected classes applied.",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: 3 },
                category: 'Props',
            },
            type: { name: "Number" },
            defaultValue: "3",
            control: { type: 'number' },
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
        },
        // CSS
        ".fb-account-carousel": {
            description: "The class applied to the root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-account-carousel-accounts-container": {
            description: "The class applied to the carousel container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-account-carousel-accounts": {
            description: "The class applied to the carousel list of accounts element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-account-carousel-account-selected": {
            description: "The class applied to the current selected account.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-account-carousel-indicators": {
            description: "The class applied to the container element of carousel indicators.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-account-carousel-indicator": {
            description: "The class applied to an individual carousel indicator.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-account-carousel-indicator-highlight": {
            description: "The class applied to the indicator showing the current position in the carousel.",
            table: {
                category: 'CSS Classes',
            },
        },
        // slots
        account: {
            description: "The slot for customizing the each account item in the carousel",
            table: {
                type: { summary: "String" },
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        props: {},
                        totalMarketValueLabel: null,
                        changeInValueLabel: null,
                        accountNameLabel: null,
                        accountNumberLabel: null,
                        account: null,
                        showLabels: null,
                    }`
                }
            },
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
