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
    as: defaultValue(ClientCardEmail, 'as'),
    client: useClientData()
})

const template = `
<ClientCardRoot :client="args.client">
    <ClientCardEmail :as="args.as">
        <ClientCardEmailLabel />
        <ClientCardEmailLink />
    </ClientCardEmail>
</ClientCardRoot>`

const components = { 
    ClientCardRoot,
    ClientCardEmail,
    ClientCardEmailLabel,
    ClientCardEmailLink
}
/**
 * ## Overview
 * The `ClientCardEmail` component is a root level component that is intended to display a client
 * email from the `client.contact_info.email` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardEmail',
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
                defaultValue: { summary: defaultValue(ClientCardEmail, 'as') },
            }
        },
        ClientCardRoot: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardRoot />' },
                category: 'Related Components',
            },
        },
        ClientCardEmailLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardEmailLabel />' },
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
 * The `ClientCardEmail` is a root component that provides a client contact email object to slotted sub-components.
 */

export const BasicUse = (args) => ({
    components,
    setup: () => { return { args } },
    template
})
