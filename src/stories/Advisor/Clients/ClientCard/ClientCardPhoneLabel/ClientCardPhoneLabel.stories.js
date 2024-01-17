import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardPhoneList,
    ClientCardPhoneListItem,
    ClientCardPhoneLabel,
    ClientCardPhoneValue
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardPhoneLabel` sub-component displays a phone field text label for a given phone object in the `client.contact_info.phone[i]` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardPhoneLabel',
    components: { ClientCardRoot, ClientCardPhoneList, ClientCardPhoneListItem, ClientCardPhoneLabel, ClientCardPhoneValue },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "label" },
            }
        },
        index: {
            type: {required: true },
            description: 'The indexed position in the `ClientCardPhoneList` props.phone array.',
            table: {
                category: ClientCard.argTypes.as.table.category,
            },
            control: false
        },
        ClientCardPhoneList: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardPhoneList />' },
                category: 'Related Components',
            },
        },
        ClientCardPhoneListItem: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardPhoneListItem />' },
                category: 'Related Components',
            },
        },
        ClientCardPhoneValue: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardPhoneValue />' },
                category: 'Related Components',
            },
        },
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardPhoneList #default="props">
        <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i">
            <ClientCardPhoneLabel :index="i" />
            <ClientCardPhoneValue :index="i" />
        </ClientCardPhoneListItem>
    </ClientCardPhoneList>
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardPhoneList, ClientCardPhoneListItem, ClientCardPhoneLabel, ClientCardPhoneValue },
                setup() {
                    args.client = useClientData()
                    return { args };
                },
                template: config?.template || template,
                methods: {}
            }
        },
        parameters: {
            docs: {
                description: {
                    story: config?.story || "The `ClientCardPhoneLabel` component is intended to be used as a sub-component slotted into `ClientCardPhoneListItem`. It renders a phone label from the `client.contact_info.phone[i].label` based on the `index` prop passed in.",
                },
                source: {
                    code: config?.template || template,
                }
            }
        }
    };
}


export const Component = {
    ...Template()
}

export const CustomUsingProps = {
    ...Template(
        {
            template:`
<ClientCardRoot v-bind="args" as="div">
    <ClientCardPhoneList #default="props">
        <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i">
            <ClientCardPhoneLabel :index="i" #default="props">
                <h5>{{ props.label }}:</h5>
            </ClientCardPhoneLabel>
            <ClientCardPhoneValue :index="i" />
        </ClientCardPhoneListItem>
    </ClientCardPhoneList>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}