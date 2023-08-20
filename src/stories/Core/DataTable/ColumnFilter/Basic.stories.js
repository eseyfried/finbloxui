/* eslint-disable storybook/story-exports */
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';


export default {
    title: 'Library/Core/DataTable/ColumnFilter',
    args: {
        filterType: "text",
        buttonLabel: "...",
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
      template: '<ColumnFilter filterType="text" @fb-column-filter-apply-button:click="applyFilter($event)" style="height: 100px;"/>',
      methods: { applyFilter: ($event) => {console.log($event);} }
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ColumnFilter component.",
            },
            source: {
                code: `
const applyFilter = ($event) => {
    console.log($event);
}
<ColumnFilter filterType="text" @fb-column-filter-apply-button:click="applyFilter($event)" />
                `
            }
        }
    }
};