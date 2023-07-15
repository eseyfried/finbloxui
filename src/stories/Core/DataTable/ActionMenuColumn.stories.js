import DataTable from '@/components/DataTable/DataTable.vue';
import Column from '@/components/DataTable/Column.vue';
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { ref } from "vue";

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/DataTable/Column/ActionMenuColumn',
    args: {
        rows: []
    },
    render: (args) => ({
      components: { DataTable, Column },
      setup() {
        const { tasks } = storeToRefs(useDemoStore());
        args.rows = ref(tasks.value);

        args.actionMenuItems = [
            { url: null, label: "Item 1" },
            { url: "some-url", label: "Item 2" },
            { url: null, label: "Item 3", callback: (item) => { console.log(item) } },
        ];

        args.contextMenuOptions = {
            buttonLabel: "more",
            menuItems:  args.actionMenuItems
        }

        return { args };
      },
      template: `
        <span style="display: none">{{ args.rows.length }}</span> <!-- this is needed to get SB to render the data -->
        <DataTable :rows="args.rows">
            <Column field="id" header="Id" />
            <Column field="title" header="Title" />
            <Column field="state" header="State" />
            <Column header="Actions" type="actions" :contextMenuOptions="args.contextMenuOptions">
                <template #button="slotProps">
                    <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">+++</button>
                </template>
            </Column>
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
const contextMenuOptions = {
    buttonLabel: "more",
    menuItems:  [
        { url: null, label: "Item 1" },
        { url: "some-url", label: "Item 2" },
        { url: null, label: "Item 3", callback: (item) => { console.log(item) } },
    ]
}
<DataTable :rows="args.rows">                
    <Column field="id" header="Id" />
    <Column field="title" header="Title" />
    <Column field="state" header="State" />
    <Column header="Actions" type="actions" :contextMenuOptions="contextMenuOptions">
        <template #button="slotProps">
            <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">+++</button>
        </template>
    </Column>
</DataTable>`
            }
        }
    }
};
