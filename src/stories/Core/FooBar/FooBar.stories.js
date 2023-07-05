import FooBar from '@/components/Core/FooBar/FooBar.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `FooBar` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Example/Core/FooBar',
    component: { FooBar },
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
        "fb-foo-bar-details-link:click": {
            description: "Event emitted when details link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "" },
            },
        },
        ".fb-foo-bar": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicFooBar = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};