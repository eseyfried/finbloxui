import { ref } from "vue";
import ContextMenu from '@/components/Core/Navigation/ContextMenu/ContextMenu.vue';

// eslint-disable-next-line storybook/story-exports
let defaultMenuItems = ref({});
export default {
    title: 'Example/Core/Navigation/ContextMenu',
    args: {
        menuItems: defaultMenuItems
    },
    render: (args) => ({
      components: { ContextMenu },
      setup() {
        defaultMenuItems.value = [
            { url: null, label: "Item 1" },
            { url: "some-url", label: "Item 2" },
            { url: null, label: "Item 3", callback: (item) => { console.log(item) } },
        ];
        args.menuItems = defaultMenuItems.value;
        return { args };
      },
      template: `
        <ContextMenu :menuItems="args.menuItems" style="height: 100px;"/>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ContextMenu component.",
            },
            source: {
                code: `<ContextMenu :menuItems="args.menuItems" />`
            }
        }
    }
};