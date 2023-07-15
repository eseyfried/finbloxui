import { ref } from "vue";
import ColumnSelector from '@/components/DataTable/ColumnSelector/ColumnSelector.vue';

// eslint-disable-next-line storybook/story-exports
let defaultColumns = ref({});
export default {
    title: 'Example/Core/DataTable/ColumnSelector',
    args: {
        columns: defaultColumns
    },
    render: (args) => ({
      components: { ColumnSelector },
      setup() {
        args.columns = ref([
            { name: 'column_1', label: 'Column 1'},
            { name: 'column_2', label: 'Column 2'},
        ]);
        defaultColumns.value = args.columns;
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