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
 * The `ClientCardEmailLink` sub-component displays an email value HTML link for the email object in the `client.contact_info.email` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardEmailLink',
    components: { ClientCardRoot, ClientCardEmail, ClientCardEmailLabel, ClientCardEmailLink },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "a" },
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
                    story: "The `ClientCardEmailLink` component is intended to be used as a sub-component slotted into `ClientCardEmail`. It renders an email value as a link from the `client.contact_info.email.value` object.",
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
        <ClientCardEmailLabel />
        <ClientCardEmailLink #default="props">
            <i>{{ props.email }}</i>
        </ClientCardEmailLink>
    </ClientCardEmail>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}