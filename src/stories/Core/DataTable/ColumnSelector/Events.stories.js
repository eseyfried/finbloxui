import { action } from "@storybook/addon-actions";
import ColumnSelector from '@/components/DataTable/ColumnSelector/ColumnSelector.vue';

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/DataTable/ColumnSelector',
    args: {
        columns: [
            { name: 'column_1', label: 'Column 1'},
            { name: 'column_2', label: 'Column 2'},
        ]
    },
    render: (args) => ({
      components: { ColumnSelector },
      setup() {
        return { args };
      },
      template: `
      <ColumnSelector
        :columns="args.columns"
        @fb-column-selector-button:click="handleButtonClick($event)"
        @fb-column-selector-selected:click="handleColumnClick($event)"
        style="height: 100px;"
    />
      `,
      methods: {
            handleButtonClick: action("clicked"),
            handleColumnClick: action("clicked")
        }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ColumnSelector component offers 2 events that you may bind event listeners to:

- fb-column-selector-button:click - triggers when the ColumnSelector button is clicked
- fb-column-selector-selected:click - triggers when the any ColumnSelector column item is clicked
`,
            },
            source: {
                code: `
<ColumnSelector
    :columns="columns"
    @fb-column-selector-button:click="handleButtonClick($event)"
    @fb-column-selector-selected:click="handleColumnClick($event)"
/>
`
            }
        }
    }
};