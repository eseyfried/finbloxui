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
      template: '<ColumnSelector :columns="args.columns" style="height: 100px" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ColumnSelector component.",
            },
            source: {
                code: `<ColumnSelector :columns="columns" />`
            }
        }
    }
};