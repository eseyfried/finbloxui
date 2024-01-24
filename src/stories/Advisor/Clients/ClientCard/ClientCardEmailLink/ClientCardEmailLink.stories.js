import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";
import { 
    ClientCardRoot,
    ClientCardEmail,
    ClientCardEmailLabel,
    ClientCardEmailLink
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
const getArgs = generateArgs({
    as: defaultValue(ClientCardEmailLink, 'as'),
    client: useClientData()
})

const components = { 
    ClientCardRoot,
    ClientCardEmail,
    ClientCardEmailLabel,
    ClientCardEmailLink
 }
const template = `
<ClientCardRoot :client="args.client">
    <ClientCardEmail>
        <ClientCardEmailLabel />
        <ClientCardEmailLink :as="args.as" />
    </ClientCardEmail>
</ClientCardRoot>`
/**
 * ## Overview
 * The `ClientCardEmailLink` sub-component displays an email value HTML link for the email object in the `client.contact_info.email` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardEmailLink',
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
                defaultValue: { summary: defaultValue(ClientCardEmailLink, 'as') },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.email' },
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
        ClientCardEmail: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardEmail />' },
                category: 'Related Components',
            },
        },
        ClientCardEmaiLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardEmaiLabel />' },
                category: 'Related Components',
            },
        },
    },
    args: getArgs()
};



/**
 * The `ClientCardEmailLink` component is intended to be used as a sub-component slotted into `ClientCardEmail`. 
 * It renders an email value as a link from the `client.contact_info.email.value` object.
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
        <ClientCardEmail>
            <ClientCardEmailLabel />
            <ClientCardEmailLink #default="props" :as="args.as">
                <i>{{ props.email }}</i>
            </ClientCardEmailLink>
        </ClientCardEmail>
    </ClientCardRoot>
`
})
