import ActionMenu from '@/components/Core/Navigation/ActionMenu/ActionMenu.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ActionMenu` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Example/Core/Navigation/ActionMenu',
    component: { ActionMenu },
    tags: ['autodocs'],
    argTypes: {
        menuItems: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "A [client object](/?path=/story/example-datadefinitions--client-object)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
            control: false
        },
        "fb-action-menu-item:click": {
            description: "Event emitted when a menu item is clicked. The menuItem object is passed to your event handler",
            table: {
                category: 'Events',
                defaultValue: { summary: "" },
            },
        },
        ".fb-action-menu": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-action-menu-item": {
            description: "The class applied to the menu item outer element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicActionMenu = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};