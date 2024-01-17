import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardHouseholdName
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardHouseholdName` component displays the client household name from the `client.name` object passed into the `ClientCardRoot` component.
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardHouseholdName',
    component: { ClientCardRoot, ClientCardHouseholdName },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                defaultValue: { summary: "h3" },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available to slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.household' },
                category: 'Attributes',
            },
        },
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardHouseholdName />
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardHouseholdName },
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
                    story: config?.story || "The `ClientCardHouseholdName` component is intended to be used as a sub-component slotted into `ClientCardRoot`. It renders the household from the `client.name` object.",
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
    <ClientCardHouseholdName #default="props">
        <i>{{ props.household }}</i>
    </ClientCardHouseholdName>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})}