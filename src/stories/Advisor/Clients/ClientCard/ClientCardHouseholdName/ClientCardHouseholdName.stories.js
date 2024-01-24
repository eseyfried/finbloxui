import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";

import { 
    ClientCardRoot,
    ClientCardHouseholdName
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'

const getArgs = generateArgs({
    as: defaultValue(ClientCardHouseholdName, 'as'),
    client: useClientData()
})

const components = { ClientCardRoot, ClientCardHouseholdName }
const template = `
<ClientCardRoot :client="args.client">
    <ClientCardHouseholdName :as="args.as" />
</ClientCardRoot>`
/**
 * ## Overview
 * The `ClientCardHouseholdName` component displays the client household name from the `client.name` object passed into the `ClientCardRoot` component.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardHouseholdName',
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
                defaultValue: { summary: defaultValue(ClientCardHouseholdName, 'as') },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available to slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.household' },
                category: 'Attributes',
            },
        },
        ClientCardRoot: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardRoot />' },
                category: 'Related Components',
            },
        },
    },
    args: getArgs()
};



/**
 * 
 * The `ClientCardHouseholdName` component is intended to be used as a sub-component slotted into `ClientCardRoot`. 
 * It renders the household from the `client.name` object.
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
        <ClientCardHouseholdName #default="props" :as="args.as">
            <i>{{ props.household }}</i>
        </ClientCardHouseholdName>
    </ClientCardRoot>
`
})