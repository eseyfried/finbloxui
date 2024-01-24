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
    as: defaultValue(ClientCardDataListItem, 'as'),
    client: useClientData()
})

const components = { ClientCardRoot,
    ClientCardDataList,
    ClientCardDataListItem,
    ClientCardDataLabel,
    ClientCardDataValue
}

const template = `
<ClientCardRoot :client="args.client">
    <ClientCardDataList #default="props">
        <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i" :as="args.as">
            <ClientCardDataLabel :index="i" />
            <ClientCardDataValue :index="i" />
        </ClientCardDataListItem>
    </ClientCardDataList>
</ClientCardRoot>`

/**
 * ## Overview
 * The `ClientCardDataListItem` component is an HTML List element intended to display a client
 * financial data point from the `client.stats[i]` object passed into the `ClientCardRoot` component.
 * It works with its sub-components listed in the related component section.
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardDataListItem',
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
                defaultValue: { summary: defaultValue(ClientCardDataListItem, 'as') },
            }
        },
        ClientCardRoot: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardRoot />' },
                category: 'Related Components',
            },
        },
        ClientCardDataList: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardDataList />' },
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
 * The `ClientCardDataListItem` component renders a single HTML List element containing
 * its slotted content. As a sub-component of `ClientCardDataList` it is intended to be looped over.
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
        <ClientCardDataList #default="props">
            <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i" :as="args.as">
                <span>{{ props.data[i].label }}:</span>
                <span>{{ props.data[i].value }}</span>
            </ClientCardDataListItem>
        </ClientCardDataList>
    </ClientCardRoot>
`
})