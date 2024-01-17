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
 * The `ClientCardPhoneList` component is a root level component that is intended to display a list of
 * phone numbers from the `client.contact_info.phone` object passed into the `ClientCardRoot` component.
 * It works with looping over its sub-components listed in the related component section.
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardPhoneList',
    components: { ClientCardRoot, ClientCardPhoneList, ClientCardPhoneListItem, ClientCardPhoneLabel, ClientCardPhoneValue },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "ul" },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available to slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.phone' },
                category: 'Attributes',
            },
        },
        ClientCardPhoneListItem: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardPhoneListItem />' },
                category: 'Related Components',
            },
        },
        ClientCardPhoneLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardPhoneLabel />' },
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

const Template = {
    render: (args) => {
        return {
            components: { ClientCardRoot, ClientCardPhoneList, ClientCardPhoneListItem, ClientCardPhoneLabel, ClientCardPhoneValue },
            setup() {
                args.client = useClientData()
                return { args };
            },
            template: template,
            methods: {}
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The `ClientCardPhoneList` is a root component that provides an array of client phone objects to slotted sub-components.",
            },
            source: {
                code: template
            }
        }
    }
  };


export const Component = {
    ...Template
}