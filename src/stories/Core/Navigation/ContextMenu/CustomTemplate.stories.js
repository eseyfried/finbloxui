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
      <ContextMenu :menuItems="args.menuItems" style="height: 100px;">
        <template #button="slotProps">
            <a v-bind="slotProps.attrs" v-on="slotProps.eventHandlers">Actions</a>
        </template>

        <template #menuItem="slotProps">
            <a :href="slotProps.item.url || '#'" v-on="slotProps.eventHandlers">
                <span>{{ slotProps.item.label }}</span>
            </a>
        </template>
      </ContextMenu>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default menu templates with your own custom layout using slotted content. 

There are 4 available template slots:
- button - layout template for the trigger button
- menuItem - layout template for the menu item element

Wrap your content in a slot template tag using one of the above slot names.
template:

The following slotProps will be available for use in your button template:
- props - all component props
- attrs - an object containing element attributes (i.e. classes, etc.)
- eventHandlers - an object containing built in event handlers. Use v-on to bind this object to the element you want to trigger the events.
This is only available for the menuItem slot.

The following slotProps will be available for use in your menuItem template:
- props - all component props
- item - the menu item object
- eventHandlers - an object containing built in event handlers. Use v-on to bind this object to the element you want to trigger the events.
`,
            },
            source: {
                code: `
<ContextMenu :menuItems="args.menuItems" style="height: 100px;">
    <template #button="slotProps">
        <a v-bind="slotProps.attrs" v-on="slotProps.eventHandlers">Actions</a>
    </template>

    <template #menuItem="slotProps">
        <a :href="slotProps.item.url" v-on="slotProps.eventHandlers">
            <span>{{ slotProps.item.label }}</span>
        </a>
    </template>
</ContextMenu>`
            }
        }
    }
};