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
 * The `ClientCardEmail` component is a root level component that is intended to display a client
 * email from the `client.contact_info.email` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardEmail',
    components: { ClientCardRoot, ClientCardEmail, ClientCardEmailLabel, ClientCardEmailLink },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "div" },
            }
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
                    story: "The `ClientCardEmail` is a root component that provides a client contact email object to slotted sub-components.",
                },
                source: {
                    code: config?.template || template
                }
            }
        },
    };
}

export const Component = {
    ...Template()
}
