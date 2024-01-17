import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardPhoneList,
    ClientCardPhoneListItem,
    ClientCardPhoneLabel,
    ClientCardPhoneValue
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardPhoneListItem` component is an HTML List element intended to display a client
 * phone number from the `client.contact_info.phone[i]` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardPhoneListItem',
    components: { ClientCardRoot, ClientCardPhoneList, ClientCardPhoneListItem, ClientCardPhoneLabel, ClientCardPhoneValue },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "li" },
            }
        },
        ClientCardPhoneList: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardPhoneList />' },
                category: 'Related Components',
            },
        },
        ClientCardPhoneLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardPhoneLabel />' },
                category: 'Related Components',
            },
        },
        ClientCardPhoneValue: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardPhoneValue />' },
                category: 'Related Components',
            },
        },
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardPhoneList #default="props">
        <ClientCardPhoneListItem v-for="(stat, i) in props.phone" :key="i">
            <ClientCardPhoneLabel :index="i" />
            <ClientCardPhoneValue :index="i" />
        </ClientCardPhoneListItem>
    </ClientCardPhoneList>
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardPhoneList, ClientCardPhoneListItem, ClientCardPhoneLabel, ClientCardPhoneValue },
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
                    story: config?.source ||  "The `ClientCardPhoneListItem` component renders a single HTML List element containing its slotted content. As a sub-component of `ClientCardPhoneList` it is intended to be looped over.",
                },
                source: {
                    code: config?.template ||  template
                }
            }
        }
    };
}


export const Component = {
    ...Template()
}