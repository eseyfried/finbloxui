import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardAddress
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardAddress` sub-component displays an HTML address element using the address fields in the `client.contact_info.address` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardAddress',
    components: { ClientCardRoot, ClientCardAddress },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "address" },
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
        
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardAddress #default="props" />
</ClientCardRoot>`

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


export const Component = {
    ...Template()
}

export const CustomUsingProps = {
    ...Template(
        {
            template:`
<ClientCardRoot v-bind="args" as="div">
    <ClientCardAddress #default="props">
        <div><label>Street:</label> {{ props.address.street_1 }}</div>
        <div v-if="props.address.street_2"><label>Apt:</label> {{ props.address.street_2 }}</div>
        <div><label>City:</label> {{ props.address.city }}</div>
        <div><label>State:</label> {{ props.address.state }}</div>
        <div><label>Zip:</label> {{ props.address.postal_code }}</div>
    </ClientCardAddress>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}