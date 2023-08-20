import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
import * as QuoteHoverStory from './QuoteHover.stories';
import * as ActionMenuColumnStory from './ActionMenuColumn.stories';
import * as ColumnFilterStory from './ColumnFilter.stories';
/**
 * ## Overview
 * The `PositionsGrid` component is a `DataTable` component with built in features such as column selection, column filtering, 
 * action menus, and a security symbol quote hover.
 * 
 * ### User Story
 * > As a user, I want to see my investment security positions data in a way that I can refine the view to better understand my data and/or take
 * actions.
 */
 export default {
    title: 'Library/Core/PositionsGrid',
    component: { PositionsGrid, Column },
    tags: ['autodocs'],
    argTypes: {
        positions: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of JSON objects representing your position data.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
            control: false,
        },
        dataTableOptions: {
            type: { name: "Object" },
            defaultValue: {
                "columnSelector" : true
            },
            description: "An object of [DataTable](/?path=/docs/example-core-datatable-datatable--docs) properties",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            control: { type: 'object' },
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

export const ColumnFilter = {
    ...ColumnFilterStory.default
};
export const QuoteHover = {
    ...QuoteHoverStory.default
};
export const ActionMenuColumn = {
    ...ActionMenuColumnStory.default
};