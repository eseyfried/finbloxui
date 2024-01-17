import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardEmail,
    ClientCardEmailLabel,
    ClientCardEmailLink
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardEmailLabel` sub-component displays an email field text label for the email object in the `client.contact_info.email` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardEmailLabel',
    components: { ClientCardRoot, ClientCardEmail, ClientCardEmailLabel, ClientCardEmailLink },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "label" },
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
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardEmail>
        <ClientCardEmailLabel />
        <ClientCardEmailLink />
    </ClientCardEmail>
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardEmail, ClientCardEmailLabel, ClientCardEmailLink },
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
                    story: config?.story || "The `ClientCardEmailLabel` component is intended to be used as a sub-component slotted into `ClientCardEmail`. It renders an email label from the `client.contact_info.email.label` object.",
                },
                source: {
                    code: config?.template || template
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
    <ClientCardEmail>
        <ClientCardEmailLabel #default="props">
            <h3>{{ props.label }}</h3>
        </ClientCardEmailLabel>
        <ClientCardEmailLink />
    </ClientCardEmail>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}