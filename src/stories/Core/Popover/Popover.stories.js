import Popover from '@/components/Core/Popover/Popover.vue';

import * as BasicStory from './Basic.stories';

/**
 * ## Overview
 * The `Popover` component provides an in context pop-up style box that can contain content. Triggered by a click or hover event, you can
 * use a popover as a tool tip or even to show more substantial content like a `ClientCard`.
 * 
 * ### User Story
 * > As a user, I want to hover over a symbol and see the current quote, bid, ask, etc. of the security so that I can quickly make a trading decision.
 */
 export default {
    title: 'Example/Core/Popover',
    component: { Popover },
    tags: ['autodocs'],
    argTypes: {
        selector: {
            type: { name: "String", required: true },
            defaultValue: "",
            description: "A valid css selector for the element that is used to trigger the popover.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        trigger: {
            type: { name: "String" },
            defaultValue: "click",
            description: "The type of mouse event that will trigger the visibility of the popover",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "click" },
                category: 'Props',
            },
            control: { type: 'radio' },
            options: ["click", "hover"]
        },
        ".fb-popover": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicPopover = {
    ...BasicStory.default
};