
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
    as: defaultValue(ClientCardPhoneValue, 'as'),
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
        <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i">
            <ClientCardPhoneLabel :index="i" />
            <ClientCardPhoneValue :index="i" :as="args.as" />
        </ClientCardPhoneListItem>
    </ClientCardPhoneList>
</ClientCardRoot>`

/**
 * ## Overview
 * The `ClientCardPhoneValue` sub-component displays a phone number value for a given phone object in the `client.contact_info.phone[i]` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardPhoneValue',
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
                defaultValue: { summary: defaultValue(ClientCardPhoneValue, 'as') },
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
        ClientCardPhoneListItem: {
            table: {
                type: { summary: "Root-Component" },
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
    },
    args: getArgs(),
};

/**
 * The `ClientCardPhoneValue` component is intended to be used as a sub-component slotted into `ClientCardPhoneListItem`.
 * It renders a data point value from the `client.contact_info[i].phone.value` based on the `index` prop passed in.
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
            <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i">
                <ClientCardPhoneLabel :index="i" />
                <ClientCardPhoneValue :index="i" #default="props" :as="args.as">
                    <h5>{{ props.phone }}:</h5>
                </ClientCardPhoneValue>
            </ClientCardPhoneListItem>
        </ClientCardPhoneList>
    </ClientCardRoot>
`
})

