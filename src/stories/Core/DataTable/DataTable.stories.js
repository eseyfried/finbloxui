import { action } from "@storybook/addon-actions";
import DataTable from '@/components/DataTable/DataTable.vue';
import Column from '@/components/DataTable/Column.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";
import * as ColumnSelectorStory from './ColumnSelector.stories';
import * as ColumnFilterStory from './ColumnFilter.stories';

/**
 * ## Overview
 * The `DataTable` component accepts an array of json objects and renders columns using
 * the `Column` component as slotted content in the `DataTable` component. Columns are rendered in the order
 * you place them. Each `Column` takes an attribute of field and header. The field attribute matches the
 * data field name in the rows object. The header attribute is the column label text you'd like rendered.
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
    title: 'Example/Core/DataTable/DataTable',
    component: { DataTable, Column },
    tags: ['autodocs'],
    argTypes: {
        rows: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "A collection of objects representing data to output",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: "[]" },
                category: 'Props',
            },
        },
        columnSelector: {
            type: { name: "Boolean" },
            defaultValue: false,
            description: "Enables a ColumnSelector control to toggle visibility of data columns",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "false" },
                category: 'Props',
            },
        },
        "column-click": {
            description: "Event emiited on column header click",
            table: {
                category: 'Events',
                defaultValue: { summary: "{ field: <field-name>, type: <event-type> }" },
            },
        },
        useVirtualScroll: {
            description: "Enable virtual scroll. This is an ideal option for large data sets.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "false" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        virtualScrollHeight: {
            description: "The height of the table when using virtual scrolling.",
            table: {
                type: { summary: "Number" },
                defaultValue: { summary: "400" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "400",
            control: { type: 'text' },
        },
        groupRowsBy: {
            description: "Group rows by a column",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "",
            control: { type: 'text' },
        },
        showTotals: {
            type: { name: "Boolean" },
            defaultValue: true,
            description: "Show column totals",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: false },
                category: 'Props',
            },
            control: 'boolean'
        },
        groupedTotalsLocation: {
            type: { name: "Boolean" },
            defaultValue: true,
            description: "Show column totals as a grouped footer or in the group header",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "top" },
                category: 'Props',
            },
            control: 'radio',
            options: ["top", "bottom"]
        },
        collapsible: {
            type: { name: "Boolean" },
            defaultValue: false,
            description: "Use in conjuction with `groupRowsBy` to make groups collapsible",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: false },
                category: 'Props',
            },
            control: 'boolean'
        },
    },

};

/**
 * This is a basic data table
 */
export const BasicTable = {
    args: {
        rows: [],
        showTotals: false,
        collapsible: false,
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

export const CustomColumnHeaderTemplate = {
    args: {
        rows: [],
        emptyString: "--"
    },
    parameters: {
        docs: {
            description: {
                story: "Apply a custom layout template to a column header. Add extra markup, css, format the value and more.",
            },
        },
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const formatTitle = (title) => title.toUpperCase();
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = tasks.value;
        return { args, formatTitle };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="id" header="Id" />
            <Column field="title" header="Title">
                <template #th="slotProps">
                    <th class="myClass">{{ formatTitle(slotProps.header) }}</th>
                </template>
            </Column>
            <Column field="state" header="State" />
        </DataTable>
      `,
    }),
};
CustomColumnHeaderTemplate.parameters = {
    docs: {
        ...CustomColumnHeaderTemplate.parameters.docs,
        source: { 
            code: `
<DataTable :rows="args.rows">
    <Column field="id" header="Id" />
    <Column field="title" header="Title">
        <template #th="slotProps">
            <th class="myClass">{{ slotProps.header }}</th>
        </template>
    </Column>
    <Column field="state" header="State" />
</DataTable>
          `
        }
    },
  };

  export const CustomColumnBodyTemplate = {
    args: {
        rows: []
    },
    parameters: {
        docs: {
            description: {
                story: "Apply a custom layout template to a column body cell. Add extra markup, css, format the value and more.",
            },
        },
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const formatBody = (title) => title.toUpperCase();
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = tasks.value;
        return { args, formatBody };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="id" header="Id" />
            <Column field="title" header="Title">
                <template #td="slotProps">
                    <td class="myBodyClass">{{ formatBody(slotProps.data.title) }}</td>
                </template>
            </Column>
            <Column field="state" header="State" />
        </DataTable>
      `,
    }),
};
CustomColumnBodyTemplate.parameters = {
    docs: {
        ...CustomColumnBodyTemplate.parameters.docs,
        source: { 
            code: `
<DataTable :rows="args.rows">
    <Column field="id" header="Id" />
    <Column field="title" header="Title">
        <template #td="slotProps">
            <td class="myBodyClass">{{ formatBody(slotProps.data.title) }}</td>
        </template>
    </Column>
    <Column field="state" header="State" />
</DataTable>
          `
        }
    },
  };


  export const SortableColumnTemplate = {
    args: {
        rows: []
    },
    parameters: {
        docs: {
            description: {
                story: "Create a sortable column with a custom sort indicator icon. Clicking the column header emits a sorting event.",
            },
        },
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const formatTitle = (title) => title.toUpperCase();
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = tasks.value;
        return { args, formatTitle };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows" @column-click="onColumnHeaderClick($event)">
            <Column field="id" header="Id" sortable>
                <template #sortIcon="slotProps">
                    <span v-if="slotProps.sorted">{{ slotProps.sortDir }}</span>
                </template>
            </Column>
            <Column field="title" header="Title">
                <template #body="slotProps">
                    {{ formatTitle(slotProps.data.title) }}
                </template>
            </Column>
            <Column field="state" header="State" />
        </DataTable>
      `,
      methods: { onColumnHeaderClick: action("clicked") }
    }),
};
SortableColumnTemplate.parameters = {
    docs: {
        ...SortableColumnTemplate.parameters.docs,
        source: { 
            code: `
<DataTable :rows="args.rows">
    <Column field="id" header="Id" sortable>
        <template #sortIcon="slotProps">
            <span v-if="slotProps.sorted">{{ slotProps.sortDir }}</span>
        </template>
        </Column>
    <Column field="title" header="Title">
        <template #body="slotProps">
            {{ formatTitle(slotProps.data.title) }}
        </template>
    </Column>
    <Column field="state" header="State" />
</DataTable>
          `
        }
    },
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

export const VirtualScrollTable = {
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { generateRecords } = useDemoStore();
        args.rows = ref(generateRecords(150));
        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows" :useVirtualScroll="true">
            <Column field="id" header="Id" />
            <Column field="title" header="Title" />
            <Column field="state" header="State" />
        </DataTable>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "Virtual Scroll renders data as the user scolls the table. It's more performant for large datasets as it renders a fixed number of DOM rows. Please note that it requires the entire dataset and does not do any data fetching.",
            },
            source: {
                code: `
<DataTable :rows="args.rows" :useVirtualScroll="true">
    <Column field="id" header="Id" />
    <Column field="title" header="Title" />
    <Column field="state" header="State" />
</DataTable>`
            }
        }
    }
};

export const ColumnSelector = {
    ...ColumnSelectorStory.default
};

export const ColumnFilter = {
    ...ColumnFilterStory.default
};