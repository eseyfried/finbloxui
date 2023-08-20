import ColumnSelector from '@/components/DataTable/ColumnSelector/ColumnSelector.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';
/**
 * ## Overview
 * The `ColumnSelector` component presents a list of columns in a `DataTable` that may be used to select/de-select from being viewed in the `DataTable`.
 * 
 * ### User Story
 * > As a user, I want to see a list of available columns so that I can select which ones I'd like to see in my data table.
 */
 export default {
    title: 'Library/Core/DataTable/ColumnSelector',
    component: { ColumnSelector },
    tags: ['autodocs'],
    argTypes: {
        columns: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of column items",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[ { name: 'column name', label: 'column text label  }, { name: 'column name', label: 'column text label  } ]" },
                category: 'Props',
            },
        },
        "fb-column-selector-selected:click": {
            description: "Event emitted when a column item is clicked. The array of all selected column names are passed to the event handler",
            table: {
                category: 'Events',
                defaultValue: { summary: "[]" },
            },
        },
        "fb-column-selector-button:click": {
            description: "Event emitted when ColumnSelector trigger button is clicked.  A boolean value indicating the column list visibility state is passed to the event handler",
            table: {
                category: 'Events',
                defaultValue: { summary: "Boolean" },
            },
        },
        ".fb-column-selector": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-selector-button": {
            description: "The class applied to the component trigger button.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-selector-visible": {
            description: "The class applied when the column list element is visible.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-selector-selected": {
            description: "The class applied to all selected column items.",
            table: {
                category: 'CSS Classes',
            },
        },
        props: {
            description: "A special object that contains component props. Access this using `sloptProps.props`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
        column: {
            description: "A special object that contains the column item properties. Available in the `#column-item` slot, access this using `sloptProps.column`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
        eventHandlers: {
            description: "A special object that contains component events to maintain functionality. Bind this to your custom th element using v-on. Available in the `#button` and `#column-item` slots, access this using `sloptProps.eventHandlers`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
        attrs: {
            description: "A special object that contains component attributes to maintain functionality. Bind this to your custom th and td element using v-bind. Available in the `#button` and `#column-item` slots, access this using `sloptProps.attrs`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
    }
};


export const BasicColumnSelector = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};