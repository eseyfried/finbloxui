import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";
import { 
    ClientCardRoot,
    ClientCardPhoneList,
    ClientCardPhoneListItem,
    ClientCardPhoneLabel,
    ClientCardPhoneValue
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
const getArgs = generateArgs({
    as: defaultValue(ClientCardPhoneList, 'as'),
    client: useClientData()
})

const components = { 
    ClientCardRoot,
    ClientCardPhoneList,
    ClientCardPhoneListItem,
    ClientCardPhoneLabel,
    ClientCardPhoneValue
}

const template = `
<ClientCardRoot :client="args.client">
    <ClientCardPhoneList #default="props" :as="args.as">
        <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i">
            <ClientCardPhoneLabel :index="i" />
            <ClientCardPhoneValue :index="i" />
        </ClientCardPhoneListItem>
    </ClientCardPhoneList>
</ClientCardRoot>`

/**
 * ## Overview
 * The `ClientCardPhoneList` component is a root level component that is intended to display a list of
 * phone numbers from the `client.contact_info.phone` object passed into the `ClientCardRoot` component.
 * It works with looping over its sub-components listed in the related component section.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardPhoneList',
    components,
    tags: ['autodocs'],
    argTypes: {
        client: {
            table: {
                disable: true
            }
        },
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: defaultValue(ClientCardPhoneList, 'as') },
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
        ClientCardRoot: {
            table: {
                type: { summary: "Root Component" },
                defaultValue: { summary: '<ClientCardRoot />' },
                category: 'Related Components',
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
    args: getArgs(),
};




/**
 * The `ClientCardPhoneList` is a root component that provides an array of client phone objects to slotted sub-components.
 */
export const BasicUse = (args) => ({
    components,
    setup: () => { return { args } },
    template
})

/**
 * 
 * You can customize the layout using the `#default="props"` attribute and slotted content.
 */

export const CustomUsingSlotProps = (args) => ({
    components,
    setup: () => { return { args } },
    template:`
    <ClientCardRoot :client="args.client">
        <ClientCardPhoneList #default="props" :as="args.as">
            <li v-for="(item, i) in props.phone" :key="i">
                <div>{{ props.phone[i].value }}</div>
                <div>{{ props.phone[i].label }}</div>
            </li>
        </ClientCardPhoneList>
    </ClientCardRoot>
`
})