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
            { url: "some-url?id=<%=id%>&title=<%=title%>", label: "Item 2" },
            { url: null, label: "Item 3", callback: (item) => { console.log(item) } },
        ];

        args.contextMenuOptions = {
            buttonLabel: "Actions",
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
            <Column header="" type="actions" :contextMenuOptions="args.contextMenuOptions" />
        </DataTable>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `
A Column can be configured to contain ContextMenu component by passing the standard ContextMenu options via the contextMenuOptions prop.
You may also access the table row record data to utilize in your context menu. For example, if you needed to pass record data as params in
a menu item url. Template vars in the format <%=some_field_name%> will be replaced with the field value from the row record.
                `,
            },
            source: {
                code: `
const contextMenuOptions = {
    buttonLabel: "Actions",
    menuItems:  [
        { url: null, label: "Item 1" },
        { url: "some-url?id=<%=id%>&title=<%=title%>", label: "Item 2" },
        { url: null, label: "Item 3", callback: (item) => { console.log(item) } },
    ]
}
<DataTable :rows="args.rows">                
    <Column field="id" header="Id" />
    <Column field="title" header="Title" />
    <Column field="state" header="State" />
    <Column header="" type="actions" :contextMenuOptions="contextMenuOptions" />
</DataTable>`
            }
        }
    }
};
