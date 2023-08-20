import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import ContextMenu from '@/components/Core/Navigation/ContextMenu/ContextMenu.vue';

// eslint-disable-next-line storybook/story-exports
let defaultMenuItems = ref({});
export default {
    title: 'Library/Core/Navigation/ContextMenu',
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
      template: '<ContextMenu :menuItems="args.menuItems" @fb-action-menu-item:click="handleClick($event)" style="height: 100px;" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The ContextMenu component offers 1 event that you may bind event listeners to:

- fb-action-menu-item:click - triggers when a menu item is clicked
`,
            },
            source: {
                code: `
<ContextMenu
    :menuItems="menuItems"
    @fb-action-menu-item:click="handleClick($event)"
/>`
            }
        }
    }
};