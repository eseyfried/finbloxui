---
to: src/stories/<%=path%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.stories.js
---
import <%=h.inflection.camelize(name)%> from '@/components/<%=path%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `<%=h.inflection.camelize(name)%>` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Example/<%=path%>/<%=h.inflection.camelize(name)%>',
    component: { <%=h.inflection.camelize(name)%> },
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
        "fb-<%= h.changeCase.paramCase(name) %>-details-link:click": {
            description: "Event emitted when details link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "" },
            },
        },
        ".fb-<%= h.changeCase.paramCase(name) %>": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const Basic<%= h.inflection.camelize(name) %> = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};