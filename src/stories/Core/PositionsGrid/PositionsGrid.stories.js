import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `PositionsGrid` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Example/Core/PositionsGrid',
    component: { PositionsGrid, Column },
    tags: ['autodocs'],
    argTypes: {
        positions: {
            type: { name: "Array", required: true },
            defaultValue: {},
            description: "A [client object](/?path=/story/example-datadefinitions--client-object)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            control: false
        },
        "fb-positions-grid-details-link:click": {
            description: "Event emitted when details link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "" },
            },
        },
        ".fb-positions-grid": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


export const BasicPositionsGrid = {
    ...BasicStory.default
};

// export const Events = {
//     ...EventsStory.default
// };

// export const CustomTemplate = {
//     ...CustomTemplateStory.default
// };