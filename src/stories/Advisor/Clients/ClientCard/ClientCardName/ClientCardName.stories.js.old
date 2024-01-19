import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardName
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardName` component displays the client first and last name from the `client.name` object passed into the `ClientCardRoot` component.
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardName',
    component: { ClientCardRoot, ClientCardName },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                defaultValue: { summary: "h2" },
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
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardName />
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardName },
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
                    story: config?.story || "The `ClientCardName` component is intended to be used as a sub-component slotted into `ClientCardRoot`. It renders a first_name and last_name from the `client.name` object.",
                },
                source: {
                    code: config?.template || template,
                }
            }
        }
    };
}


export const Component = {
    ...Template()
}

export const CustomUsingProps = {
    ...Template(
        {
            template:`
<ClientCardRoot v-bind="args" as="div">
    <ClientCardName #default="props">
        {{ props.last_name }}, {{ props.first_name }}
    </ClientCardName>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}