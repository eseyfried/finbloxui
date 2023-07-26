import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `QuoteDetail` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Example/Core/QuoteDetail',
    component: { QuoteDetail },
    tags: ['autodocs'],
    argTypes: {
        symbol: {
            type: { name: "String", required: true },
            defaultValue: {},
            description: "The symbol or cusip of the quoted security",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: null },
                category: 'Props',
            },
        },
        security_description: {
            type: { name: "String", required: true },
            defaultValue: {},
            description: "The description of the quoted security",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: null },
                category: 'Props',
            },
        },
        current_price: {
            type: { name: "Number", required: true },
            defaultValue: {},
            description: "The current price of the quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        previous_close_price: {
            type: { name: "Number", required: true },
            defaultValue: {},
            description: "The previous day's closing price of the quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        price_change_amt: {
            type: { name: "Number", required: true },
            defaultValue: {},
            description: "The dollar amount change in current price of the quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        price_change_pct: {
            type: { name: "Number", required: true },
            defaultValue: {},
            description: "The percentage change in current price of the quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        day_low_price: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The current day's low price of the quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        day_high_price: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The current day's high price of the quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        exchange: {
            type: { name: "String" },
            defaultValue: {},
            description: "The exchange the quoted security is traded on",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'text' }
        },
        volume: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The daily volume traded for quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'text' }
        },
        bid: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The current bid price for quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        ask: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The current bid price for quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        pe_ratio: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The price/earning ratio for quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        dividend_yield: {
            type: { name: "Number" },
            defaultValue: {},
            description: "The current dividend yield for quoted security",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: null },
                category: 'Props',
            },
            control: { type: 'number' }
        },
        showDetails: {
            type: { name: "Boolean" },
            defaultValue: true,
            description: "Show all quote details",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: true },
                category: 'Props',
            },
            control: 'boolean'
        },
        "fb-quote-detail-before-mount": {
            description: "Event emitted before component is rendered to the DOM. Typically used for binding to a function to fetch data and set props.",
            table: {
                category: 'Events',
                defaultValue: { summary: "" },
            },
        },
        // CSS
        ".fb-quote-detail": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-loading": {
            description: "The class applied to the loading container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-quote-detail-heading": {
            description: "The class applied to the heading container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-quote-detail-price": {
            description: "The class applied to the price container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-quote-detail-details": {
            description: "The class applied to the details container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-negative": {
            description: "The class applied to elements with a negative change in value (price_change_amt && price_change_pct).",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-positive": {
            description: "The class applied to elements with a positive change in value (price_change_amt && price_change_pct).",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "heading": {
            description: "The slot for customizing the symbol and description heading template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {},
                        symbol: "",
                        security_description: "",
                    }`
                }
            },
        },
        "price": {
            description: "The slot for customizing the security price template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {},
                        current_price: "",
                        price_change_pct: "",
                        price_change_pct: "",
                        price_change_amt: "",
                        price_change_pct_css: "",
                        price_change_amt_css: "",
                    }`
                }
            },
        },
        "details": {
            description: "The slot for customizing the security details template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {},
                        previous_close_price: "",
                        day_low_price: "",
                        day_high_price: "",
                        dividend_yield: "",
                        bid: "",
                        ask: "",
                    }`
                }
            },
        },
        
    }
};


export const BasicQuoteDetail = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};