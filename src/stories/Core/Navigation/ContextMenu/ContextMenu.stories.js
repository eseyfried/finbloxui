import ContextMenu from '@/components/Core/Navigation/ContextMenu/ContextMenu.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ContextMenu` component is a navigational component that can be used in context of specific content within your application. For example, in the context of a table row
 * you can create an actions menu.
 * 
 * ### User Story
 * > As a user, I want to select from a list of possible menu options in the context of specific content so that I can quickly complete a task.
 */
 export default {
    title: 'Library/Core/Navigation/ContextMenu',
    component: { ContextMenu },
    tags: ['autodocs'],
    argTypes: {
        menuItems: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of [menu item objects](/?path=/story/example-datadefinitions--menu-item-object)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
            control: false
        },
        buttonLabel: {
            description: "Text label for trigger button",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "",
            control: { type: 'text' },
        },
        "fb-action-menu-item:click": {
            description: "Event emitted when a menu item is clicked. The [menu item object](/?path=/story/example-datadefinitions--menu-item-object) is passed to your event handler",
            table: {
                category: 'Events',
                defaultValue: { summary: "{}" },
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
        ".fb-action-menu-button": {
            description: "The class applied to the action menu trigger button.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicContextMenu = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};