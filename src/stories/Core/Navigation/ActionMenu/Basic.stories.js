import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ActionMenu from '@/components/Core/Navigation/ActionMenu/ActionMenu.vue';

// eslint-disable-next-line storybook/story-exports
let defaultMenuItems = ref({});
export default {
    title: 'Example/Core/Navigation/ActionMenu',
    args: {
        menuItems: defaultMenuItems
    },
    render: (args) => ({
      components: { ActionMenu },
      setup() {
        defaultMenuItems.value = [
            { url: null, label: "Item 1" },
            { url: "some-url", label: "Item 2" },
        ];
        args.menuItems = defaultMenuItems.value;
        return { args };
      },
      template: '<ActionMenu :menuItems="args.menuItems" />', // <--- CHANGE THIS
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the ActionMenu component.",
            },
            source: {
                code: `<ActionMenu :menuItems="args.menuItems" />` // <--- CHANGE THIS
            }
        }
    }
};