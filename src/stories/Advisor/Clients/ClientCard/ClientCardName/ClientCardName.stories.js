import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";

import { 
    ClientCardRoot,
    ClientCardName
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'

const getArgs = generateArgs({
    as: defaultValue(ClientCardName, 'as'),
    client: useClientData()
})

const components = { ClientCardRoot, ClientCardName }
const template = `
<ClientCardRoot :client="args.client">
    <ClientCardName :as="args.as" />
</ClientCardRoot>`


/**
 * ## Overview
 * The `ClientCardName` component displays the client first and last name from the `client.name` object passed into the `ClientCardRoot` component.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardName',
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
                defaultValue: { summary: defaultValue(ClientCardName, 'as') },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available to slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.first_name, props.last_name' },
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
        <ClientCardName #default="props" :as="args.as">
            {{ props.last_name }}, {{ props.first_name }}
        </ClientCardName>
    </ClientCardRoot>
`
})

