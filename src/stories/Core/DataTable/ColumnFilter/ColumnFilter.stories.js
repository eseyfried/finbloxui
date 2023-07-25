import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';

import * as BasicStory from './Basic.stories';
import * as EventsStory from './Events.stories';
import * as CustomTemplateStory from './CustomTemplate.stories';


/**
 * ## Overview
 * The `ColumnFilter` component allows you to apply filtering rules on a `DataTable` `Column`.
 * 
 * Filters offered are:
 * - text string matching, using equality (Starts with, contains, etc.) or comparison (Equals, Great than, etc.) operators
 * - select one or multiple column data values to filter on
 * 
 * ### User Story
 * > As a user, I want to filter my data table by a columns value or values so that I can refine the view of data I am looking at
 */
 export default {
    title: 'Example/Core/DataTable/ColumnFilter',
    component: { ColumnFilter },
    tags: ['autodocs'],
    argTypes: {
        // PROPS
        filterType: {
            type: { name: "String", required: true },
            defaultValue: "text",
            description: "The type of column filter to render",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "text" },
                category: 'Props',
            },
            options: ["text", "select","multiselect"],
            control: { type: 'radio' },
        },
        selectOptions: {
            type: { name: "Array" },
            defaultValue: "[]",
            description: "An array of column values to select from. Used with filterType select and multiselect.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
            control: { type: 'array' },
        },
        operator: {
            type: { name: "String" },
            defaultValue: "equality",
            description: "The type of operator filter to render",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "equality" },
                category: 'Props',
            },
            options: ["equality", "comparison"],
            control: { type: 'radio' },
        },
        equalityOptions: {
            type: { name: "Array" },
            defaultValue: `[]`,
            description: "An array of options for the equality operator field.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: `
                [
                    { label: "Starts With", value: "starts_with"},
                    { label: "Contains", value: "contains"},
                    { label: "Not Contains", value: "not_contains"},
                    { label: "Ends With", value: "ends_with"},
                    { label: "Equals", value: "equals"},
                    { label: "Not Equals", value: "not_equals"},
                ]
                `},
                category: 'Props',
            },
            control: { type: 'array' },
        },
        comparisonOptions: {
            type: { name: "Array" },
            defaultValue: `[]`,
            description: "An array of options for the comparison operator field.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: `
                [
                    { label: "Equals", value: "equals"},
                    { label: "Not Equals", value: "not_equals"},
                    { label: "Less than", value: "less_than"},
                    { label: "Less than or equal to", value: "less_than_equals"},
                    { label: "Greater than", value: "greater_than"},
                    { label: "Greater than or equal to", value: "greater_than_equals"},
                ]
                `},
                category: 'Props',
            },
            control: { type: 'array' },
        },
        clearButtonLabel: {
            type: { name: "String" },
            defaultValue: "text",
            description: "The label for the clear filter button",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Clear" },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        applyButtonLabel: {
            type: { name: "String" },
            defaultValue: "text",
            description: "The label for the apply filter button",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Apply" },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        // EVENTS
        "fb-column-filter-apply-button:click": {
            description: "Event emitted when apply button is clicked.",
            table: {
                category: 'Events',
                defaultValue: { 
                    detail: "An object with the filters to apply",
                    summary: "{ filterOperator: null, filterValue: null}" 
                },
            },
        },
        "fb-column-filter-clear-button:click": {
            description: "Event emitted when clear button is clicked.",
            table: {
                category: 'Events',
                defaultValue: { 
                    detail: "Boolean indicating the clear button has been clicked",
                    summary: "true" 
                },
            },
        },
        // CSS
        ".fb-column-filter": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-button": {
            description: "The class applied to the component trigger button.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-menu": {
            description: "The class applied to the filter menu options container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-menu-visible": {
            description: "The class applied to the filter menu options container element when visible.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-operator": {
            description: "The class applied to the filter operator field.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-operator-selected": {
            description: "The class applied to the filter operator field selected option.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-input": {
            description: "The class applied to the filter text input field.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-select": {
            description: "The class applied to the filter select and multiselect field.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-select-selected": {
            description: "The class applied to the filter select and multiselect field selected option(s).",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-buttons": {
            description: "The class applied to the filter buttons container element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-clear-button": {
            description: "The class applied to the clear button.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-column-filter-apply-button": {
            description: "The class applied to the apply button.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "button": {
            description: "The slot for customizing the trigger button template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {},
                        eventHandlers: {},
                    }`
                }
            },
        },
        "operatorOption": {
            description: "The slot for customizing the operator select option template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        option: {},
                        isSelected: Boolean,
                        props: {}
                    }`
                }
            },
        },
        "textFilter": {
            description: "The slot for customizing the text input template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {}
                    }`
                }
            },
        },
        "selectOption": {
            description: "The slot for customizing the select option template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        option: {},
                        isSelected: Boolean,
                        props: {}
                    }`
                }
            },
        },
        "clear": {
            description: "The slot for customizing the clear button template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {},
                        eventHandlers: {},
                    }`
                }
            },
        },
        "apply": {
            description: "The slot for customizing the apply button template",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available slotProps to bind to your template",
                    summary: `{
                        attrs: {},
                        props: {},
                        eventHandlers: {},
                    }`
                }
            },
        },
    }
};


export const BasicColumnFilter = {
    ...BasicStory.default
};

export const Events = {
    ...EventsStory.default
};

export const CustomTemplate = {
    ...CustomTemplateStory.default
};