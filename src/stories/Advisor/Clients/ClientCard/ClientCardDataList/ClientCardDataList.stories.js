import { useClientData } from "@/stories/modules/useClientData";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";
import { 
    ClientCardRoot,
    ClientCardDataList,
    ClientCardDataListItem,
    ClientCardDataLabel,
    ClientCardDataValue
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'

const getArgs = generateArgs({
    as: defaultValue(ClientCardDataList, 'as'),
    client: useClientData()
})

const components = {
    ClientCardRoot,
    ClientCardDataList,
    ClientCardDataListItem,
    ClientCardDataLabel,
    ClientCardDataValue
}

 const template = `
<ClientCardRoot :client="args.client">
    <ClientCardDataList #default="props" :as="args.as">
        <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i">
            <ClientCardDataLabel :index="i" />
            <ClientCardDataValue :index="i" />
        </ClientCardDataListItem>
    </ClientCardDataList>
</ClientCardRoot>`

/**
 * ## Overview
 * The `ClientCardDataList` component is a root element intended to display a list of client
 * financial data points from the `client.stats[i]` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardDataList',
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
                defaultValue: { summary: defaultValue(ClientCardDataList, 'as') },
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
        ClientCardRoot: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardRoot />' },
                category: 'Related Components',
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
    args: getArgs(),
};



/**
 * The `ClientCardDataList` is a root component that provides an array of client financial data objects to slotted sub-components.
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
        <ClientCardDataList #default="props" :as="args.as">
            <li v-for="(stat, i) in props.data" :key="i">
                <div>{{ props.data[i].value }}</div>
                <div>{{ props.data[i].label }}</div>
            </li>
        </ClientCardDataList>
    </ClientCardRoot>
`
})