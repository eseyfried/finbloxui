import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardDataList,
    ClientCardDataListItem,
    ClientCardDataLabel,
    ClientCardDataValue
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardDataList` component is a root element intended to display a list of client
 * financial data points from the `client.stats[i]` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardDataList',
    components: { ClientCardRoot, ClientCardDataList, ClientCardDataListItem, ClientCardDataLabel, ClientCardDataValue },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "ul" },
            }
        },
        default: {
            description: 'add #default="props" to make slot props available slotted content.',
            table: {
                type: { summary: "String" },
                defaultValue: { summary: 'props.data' },
                category: 'Attributes',
            },
        },
        ClientCardDataListItem: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardDataListItem />' },
                category: 'Related Components',
            },
        },
        ClientCardDataLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardDataLabel />' },
                category: 'Related Components',
            },
        },
        ClientCardDataValue: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardDataValue />' },
                category: 'Related Components',
            },
        },
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardDataList #default="props">
        <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i">
            <ClientCardDataLabel :index="i" />
            <ClientCardDataValue :index="i" />
        </ClientCardDataListItem>
    </ClientCardDataList>
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardDataList, ClientCardDataListItem, ClientCardDataLabel, ClientCardDataValue },
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
                    story: config?.source || "The `ClientCardDataList` is a root component that provides an array of client financial data objects to slotted sub-components.",
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