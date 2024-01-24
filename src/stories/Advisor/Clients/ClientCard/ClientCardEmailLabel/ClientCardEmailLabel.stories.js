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
    as: defaultValue(ClientCardEmailLabel, 'as'),
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
        <ClientCardEmailLabel :as="args.as" />
        <ClientCardEmailLink />
    </ClientCardEmail>
</ClientCardRoot>`
/**
 * ## Overview
 * The `ClientCardEmailLabel` sub-component displays an email field text label for the email object in the `client.contact_info.email` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardEmailLabel',
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
                defaultValue: { summary: defaultValue(ClientCardEmailLabel, 'as') },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.label' },
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
        ClientCardEmaiLink: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardEmaiLink />' },
                category: 'Related Components',
            },
        },
    },
    args: getArgs(),
};





/**
 * The `ClientCardEmailLabel` component is intended to be used as a sub-component slotted into `ClientCardEmail`.
 * It renders an email label from the `client.contact_info.email.label` object.
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
            <ClientCardEmailLabel #default="props" :as="args.as">
                <h3>{{ props.label }}</h3>
            </ClientCardEmailLabel>
            <ClientCardEmailLink />
        </ClientCardEmail>
    </ClientCardRoot>
`
})