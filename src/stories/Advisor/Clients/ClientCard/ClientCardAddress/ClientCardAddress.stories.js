import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";
import { 
    ClientCardRoot,
    ClientCardAddress
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'

const getArgs = generateArgs({
    as: defaultValue(ClientCardAddress, 'as'),
    client: useClientData()
})

const components = { ClientCardRoot, ClientCardAddress }
const template = `
<ClientCardRoot :client="args.client">
    <ClientCardAddress :as="args.as" />
</ClientCardRoot>`
/**
 * ## Overview
 * The `ClientCardAddress` sub-component displays an HTML address element using the address fields in the `client.contact_info.address` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardAddress',
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
                defaultValue: { summary: defaultValue(ClientCardAddress, 'as') },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.address' },
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
    args: getArgs(),
};





const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardAddress },
                setup() {
                    args.client = useClientData()
                    return { args };
                },
                template: config?.template || template,
                methods: {}
            }
        },
        parameters: {
            docs: {
                description: {
                    story: config?.story || "The `ClientCardAddress` is a root component that provides a client address object.",
                },
                source: {
                    code: config?.template || template
                }
            }
        }
    }
}

/**
 * 
 * The `ClientCardAddress` is a root component that provides a client address object.
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
        <ClientCardAddress #default="props" :as="args.as">
            <div><label>Street:</label> {{ props.address.street_1 }}</div>
            <div v-if="props.address.street_2"><label>Apt:</label> {{ props.address.street_2 }}</div>
            <div><label>City:</label> {{ props.address.city }}</div>
            <div><label>State:</label> {{ props.address.state }}</div>
            <div><label>Zip:</label> {{ props.address.postal_code }}</div>
        </ClientCardAddress>
    </ClientCardRoot>
`
})
