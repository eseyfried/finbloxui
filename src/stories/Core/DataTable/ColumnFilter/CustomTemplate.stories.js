import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';



// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/DataTable/ColumnFilter',
    args: {
        filterType: "text",
        selectOptions: ["some text", 'some other text', 'some other text'],
        operator: "equality",
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
      <ColumnFilter style="height: 100px;">
        <template #button="slotProps">
            <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                <span>Filter</span>
            </button>
        </template>

        <template #clear="slotProps">
            <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                <span>Reset</span>
            </button>
        </template>

        <template #apply="slotProps">
            <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                <span>Apply</span>
            </button>
        </template>

        <template #textFilter="slotProps">
            <div>
                <input type="text" v-on="slotProps.eventHandlers" v-bind="slotProps.attrs" />
                <div>some hint text</div>
            </div>
        </template>

        <template #operatorOption="slotProps">
            <option v-bind="slotProps.attrs" :class="{ myCustomClass: slotProps.isSelected }">
                Prefix: {{ slotProps.option.label }}
            </option>
        </template>
    </ColumnFilter>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default client templates with your own custom layout using slotted content.
There are 5 slots available along with slotProps to preserve functionaility and aid your customization. Please refer to the documentation above
for a complete list of slots. Below is a trivial example of how to customize the various slots.`,
            },
            source: {
                code: `
<ColumnFilter filterType="text" operator="equality">
    <template #button="slotProps">
        <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
            <span>Filter</span>
        </button>
    </template>

    <template #clear="slotProps">
        <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
            <span>Reset</span>
        </button>
    </template>

    <template #apply="slotProps">
        <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
            <span>Apply</span>
        </button>
    </template>

    <template #textFilter="slotProps">
        <div>
            <input type="text" v-on="slotProps.eventHandlers" v-bind="slotProps.attrs" />
            <div>some hint text</div>
        </div>
    </template>
    <!-- here is an example for the operatorOption template, the selectedOption works the same way. -->
    <template #operatorOption="slotProps">
        <!-- example: use slotProps.isSelected to customize the selected option -->
        <option v-bind="slotProps.attrs" :class="{ myCustomClass: slotProps.isSelected }">
            Prefix: {{ slotProps.option.label }}
        </option>
    </template>
</ColumnFilter>`
            }
        }
    }
};