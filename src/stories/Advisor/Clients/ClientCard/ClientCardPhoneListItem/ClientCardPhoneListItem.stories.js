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
    as: defaultValue(ClientCardPhoneListItem, 'as'),
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
    <ClientCardPhoneList #default="props">
        <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i" :as="args.as">
            <ClientCardPhoneLabel :index="i" />
            <ClientCardPhoneValue :index="i" />
        </ClientCardPhoneListItem>
    </ClientCardPhoneList>
</ClientCardRoot>`


/**
 * ## Overview
 * The `ClientCardPhoneListItem` component is an HTML List element intended to display a client
 * phone number from the `client.contact_info.phone[i]` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardPhoneListItem',
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
                defaultValue: { summary: defaultValue(ClientCardPhoneListItem, 'as') },
            }
        },
        ClientCardRoot: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardRoot />' },
                category: 'Related Components',
            },
        },
        ClientCardPhoneList: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardPhoneList />' },
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
 * The `ClientCardPhoneListItem` component renders a single HTML List element containing its slotted content.
 * As a sub-component of `ClientCardPhoneList` it is intended to be looped over.
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
        <ClientCardPhoneList #default="props">
            <ClientCardPhoneListItem v-for="(item, i) in props.phone" :key="i" :as="args.as">
                <span>{{ props.phone[i].label }}:</span>
                <span>{{ props.phone[i].value }}</span>
            </ClientCardPhoneListItem>
        </ClientCardPhoneList>
    </ClientCardRoot>
`
})