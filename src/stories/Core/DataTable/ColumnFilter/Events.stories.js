import { action } from "@storybook/addon-actions";
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/DataTable/ColumnFilter',
    args: {
        filterType: "text",
        selectOptions: ["some text", 'some other text', 'some other text'],
        operator: null,
        equalityOptions: [
            { label: "Starts With", value: "sw"},
            { label: "Contains", value: "c"},
            { label: "Not Contains", value: "nc"},
            { label: "Ends With", value: "ew"},
            { label: "Equals", value: "eq"},
            { label: "Not Equals", value: "ne"},
        ],
        comparisonOptions: [
            { label: "Equals", value: "eq"},
            { label: "Not Equals", value: "ne"},
            { label: "Less than", value: "lt"},
            { label: "Less than or equal to", value: "lte"},
            { label: "Greater than", value: "gt"},
            { label: "Greater than or equal to", value: "gte"},
        ]
    },
    render: (args) => ({
      components: { ColumnFilter },
      setup() {
        return { args };
      },
      template: `
        <ColumnFilter 
            filterType="text"
            @fb-column-filter-apply-button:click="handleClick1($event)"
            @fb-column-filter-clear-button:click="handleClick2($event)"
            style="height: 100px;"
        />`,
      methods: { 
        handleClick1: action("fb-column-filter-apply-button:click"),
        handleClick2: action("fb-column-filter-clear-button:click"),
      }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ColumnFilter component offers 2 events that you may bind event listeners to:

- fb-column-filter-apply-button:click - triggers when the apply filter button is clicked. An object with filters to apply is passed to the event handler.
- fb-column-filter-clear-button:click - triggers when the clear filter button is clicked.
`,
            },
            source: {
                code: `
<ColumnFilter 
    filterType="text"
    @fb-column-filter-apply-button:click="handleApply($event)"
    @fb-column-filter-clear-button:click="handleClear($event)"
/>`
            }
        }
    }
};