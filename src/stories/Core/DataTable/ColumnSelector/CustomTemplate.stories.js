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
      template: `
      <ColumnSelector :columns="args.columns" style="height: 100px;">
        <template #button="slotProps">
            <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                <i>...</i>
                {{ slotProps.props.buttonLabel }}
            </button>
        </template>
        <template #column="slotProps">
            <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                {{ slotProps.column.label }}
            </button>
        </template>
      </ColumnSelector>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default templates with your own custom layout using slotted content. 
                
There are 2 available template slots:
- button - layout template for the trigger button
- column - layout template for the individual column item

Wrap your content in a slot template tag using one of the above slot names. The above documented slotProps will be available for use in your
templates.
`,
            },
            source: {
                code: `
<ColumnSelector :columns="args.columns" style="height: 100px;">
    <template #button="slotProps">
        <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
            <i>...</i>
            {{ slotProps.props.buttonLabel }}
        </button>
    </template>
    <template #column="slotProps">
        <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
            {{ slotProps.column.label }}
        </button>
    </template>
</ColumnSelector>`
}
        }
    }
};