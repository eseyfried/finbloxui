import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";
import { 
    ClientCardRoot,
    ClientCardAction
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'

const getArgs = generateArgs({
    as: defaultValue(ClientCardAction, 'as'),
    client: useClientData()
})

const components = { ClientCardRoot, ClientCardAction }
const template = `
<ClientCardRoot :client="args.client">
    <ClientCardAction :as="args.as" />
</ClientCardRoot>`
/**
 * ## Overview
 * The `ClientCardAction` sub-component displays an HTML link element using the label passed to the `ClientCardRoot` component in the action-label prop .
 * When clicked, it will pass the `client` object to the event handler bound to the `ClientCardRoot` component.
 * 
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardAction',
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
                defaultValue: { summary: defaultValue(ClientCardAction, 'as') },
            }
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
 * You can customize the layout using slotted content.
 */

export const CustomUsingSlotProps = (args) => ({
    components,
    setup: () => { return { args } },
    template:`
    <ClientCardRoot :client="args.client">
        <ClientCardAction :as="args.as">
            More Detail
        </ClientCardAction>
    </ClientCardRoot>
`
})
