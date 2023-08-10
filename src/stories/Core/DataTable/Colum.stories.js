import { action } from "@storybook/addon-actions";
import DataTable from '@/components/DataTable/DataTable.vue';
import Column from '@/components/DataTable/Column.vue';
import * as ActionMenuColumnStory from './ActionMenuColumn.stories';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";
/**
 * ## Overview
 * The `Column` component is a renderless component. It used to configure `DataTable` columns as well as provide
 * a mechanism to slot custom table header and body cell content. Columns are rendered in the order
 * you place them. Each `Column` takes an attribute of field and header. The field attribute matches the
 * data field name in the `DataTable` rows object. The header attribute is the column label text you'd like rendered.
 * 
 * ```
 * <DataTable :rows="args.rows">
 *     <Column field="id" header="Id" />
 *     <Column field="title" header="Title" />
 *     <Column field="state" header="State" />
 * </DataTable>
 * ```
 */
export default {
    title: 'Example/Core/DataTable/Column',
    component: { DataTable, Column },
    tags: ['autodocs'],
    argTypes: {
        field: {
            type: { name: "String", required: true },
            description: "The name of the field as found in the data row object",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            defaultValue: "",
            control: { type: 'text' },
        },
        header: {
            type: { name: "String", required: true },
            description: "The column header label value",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            defaultValue: "",
            control: { type: 'text' },
        },
        showTotal: {
            type: { name: "Boolean" },
            defaultValue: true,
            description: "Show column total",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: false },
                category: 'Props',
            },
            control: 'boolean'
        },
        sortable: {
            description: "Determines if this column can be sorted or not. If true, when clicked, the column emits an event to the parent component.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "false" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        emptyString: {
            description: "String to display when a column's data cell is null or empty.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "--" },
                category: 'Props',
            },
            defaultValue: "--",
            control: { type: 'text' },
        },
        formatters: {
            description: `Format the column value with built in or custom formatters. You can apply multiple formatters by passing them in an array.
            
Allowable prop options:
- currency: format USD currency
- percent: format as percent
- change-indicator: adds .fb-positive or .fb-negative class to help indicate change in value
- a callback function
            `,
            table: {
                type: { summary: "Mixed" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            control: false,
        },
        type: {
            description: "The type of Column to render. Defaults to data. However, a [ContextMenu](/?path=/docs/example-core-navigation-contextmenu--docs) or [QuoteDetail](?path=/docs/example-core-quotedetail--docs) component can be used as a special type of column.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "data" },
                category: 'Props',
            },
            options: ['data', 'actions', 'quote'],
            control: { type: 'radio' },
        },
        contextMenuOptions: {
            type: { name: "Object" },
            description: "When using Column type = 'actions', pass a valid object based on the [ContextMenu](/?path=/docs/example-core-navigation-contextmenu--docs) docs to control the context menu.",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            defaultValue: "",
            control: false,
        },
        // slotprops
        sorted: {
            description: "A boolean value that indicates if the field has been sorted or not. Available in the `#th` slot, Access this using `sloptProps.sorted`",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "false" },
                category: 'Slot Props'
            },
        },
        sortDir: {
            description: "A string value, `asc` or `desc` that indicates the sort direction. Available in the `#th` slot, Access this using `sloptProps.sortDir`",
            table: {
                type: { summary: "String" },
                category: 'Slot Props'
            },
        },
        eventHandlers: {
            description: "A special object that contains component events to maintain functionality. Bind this to your custom th element using v-on. Available in the `#th` slot, access this using `sloptProps.eventHandlers`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
        attrs: {
            description: "A special object that contains component attributes to maintain functionality. Bind this to your custom th and td element using v-bind. Available in the `#th` and `#td` slot, access this using `sloptProps.attrs`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
        data: {
            description: "An object containing the table row data. Available in the `#td` slot, access this using `sloptProps.data.{some-field-name}`",
            table: {
                type: { summary: "Object" },
                category: 'Slot Props'
            },
        },
        _header: {
            name: "header",
            description: "The column header label. Available in the `#th` slot, access this using `sloptProps.header`",
            table: {
                type: { summary: "String" },
                category: 'Slot Props'
            },
        },
        _field: {
            name: "field",
            description: "The name of field in the data object. Available in the `#th` and `#td` slot, access this using `sloptProps.field`",
            table: {
                type: { summary: "String" },
                category: 'Slot Props'
            },
        },
    },
};

export const BasicColumn = {
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);
        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="id" header="Id" />
            <Column field="title" header="Title" />
            <Column field="state" header="State" />
        </DataTable>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Column component will render standard HTML table > thead > tr > th and table > tbody > tr > td elements.",
            },
            source: {
                code: `
<DataTable :rows="args.rows">                
    <Column field="id" header="Id" />
    <Column field="title" header="Title" />
    <Column field="state" header="State" />
</DataTable>`
            }
        }
    }
};

export const ColumnFormatter = {
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        args.rows = ref([
            { price: 1245.87, qty: 2, change_in_value_pct: 0.5, change_in_value_amt: 12.98 },
            { price: 98.23, qty: 22, change_in_value_pct: -1.5, change_in_value_amt: -34.67 },
        ]);
        args.customFormatter = (value) => `** ${value}`;
        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="price" header="Price" formatters="currency" />
            <Column field="qty" header="Quantity" :formatters="args.customFormatter"/>
            <Column field="change_in_value_pct" header="Change In Value (%)" formatters="percent"/>
            <Column field="change_in_value_amt" header="Change In Value ($)" :formatters="['currency', 'change-indicator']" />
        </DataTable>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `Format the column values using the Formatter prop. The Column component offers the following options:
- currency - format values as USD currency
- percent - format values as a percent
- callback - pass a custom callback function to achieve your own custom formatting. Function: (value) => { return value; }                
                `,
            },
            source: {
                code: `
const customFormatter = (value) => {
    return "**" + value;
}
<DataTable :rows="rows">
    <Column field="price" header="Price" formatters="currency" />
    <Column field="qty" header="Quantity" :formatters="customFormatter"/>
    <Column field="change_in_value_pct" header="Change In Value (%)" formatters="percent"/>
    <Column field="change_in_value_amt" header="Change In Value ($)" :formatters="['currency', 'change-indicator']" />
</DataTable>`
            }
        }
    }
};

export const SortableColumn = {
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);
        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows" @column-click="onColumnHeaderClick($event)">
            <Column field="id" header="Id" sortable />
            <Column field="title" header="Title" />
            <Column field="state" header="State" />
        </DataTable>
      `,
      methods: { onColumnHeaderClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: "Add the `sortable` attribute to a Column to turn sorting on. When the table column header (th element) is clicked, an event will emit.",
            },
            source: {
                code: `
<DataTable :rows="args.rows" @column-click="onColumnHeaderClick($event)">                
    <Column field="id" header="Id" sortable />
    <Column field="title" header="Title" />
    <Column field="state" header="State" />
</DataTable>`
            }
        }
    }
};

export const ShowColumnTotal = {
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);
        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows" :showTotals=true>
            <Column field="id" header="Id" />
            <Column field="title" header="Title" />
            <Column field="qty" header="Items" showTotal="true" />
            <Column field="state" header="State" />
        </DataTable>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "Show column totals by turning on the `DataTable` showTotals prop in conjuction with `Column` showTotal prop.",
            },
            source: {
                code: `
<DataTable :rows="rows" :showTotals=true>
    <Column field="id" header="Id" />
    <Column field="title" header="Title" />
    <Column field="qty" header="Items" showTotal="true" />
    <Column field="state" header="State" />
</DataTable>`
            }
        }
    }
};

export const CustomColumnHeaderAndBodyCells = {
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);
        const formatTitle = (title) => title.toUpperCase()
        return { args, formatTitle };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="id" header="Id" />
            <Column field="title" header="Title">
                <template #th="slotProps">
                    <th v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                        <span v-if="slotProps.sorted">{{ slotProps.sortDir }}</span>
                        {{ slotProps.header }}
                    </th>
                </template>
                <template #td="slotProps">
                    <td v-bind="slotProps.attrs">{{ formatTitle(slotProps.data.title) }}</td>
                </template>
            </Column>
            <Column field="state" header="State" />
        </DataTable>
      `,
      methods: { formatTitle: (title) => title.toLowerCase() }
    }),
    parameters: {
        docs: {
            description: {
                story: "You can completely override the th and td elements with custom markup. Note, to retain component functionality you must bind `eventHandlers` and `attrs` as indicated in the example source below.",
            },
            source: {
                code: `
<DataTable :rows="args.rows">
    <Column field="id" header="Id" />
    <Column field="title" header="Title">
        <template #th="slotProps">
            <th v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                <span v-if="slotProps.sorted">{{ slotProps.sortDir }}</span>
                {{ slotProps.header }}
            </th>
        </template>
        <template #td="slotProps">
            <td v-bind="slotProps.attrs">{{ formatTitle(slotProps.data.title) }}</td>
        </template>
    </Column>
    <Column field="state" header="State" />
</DataTable>`
            }
        }
    }
};

export const ActionMenuColumn = {
    ...ActionMenuColumnStory.default
};