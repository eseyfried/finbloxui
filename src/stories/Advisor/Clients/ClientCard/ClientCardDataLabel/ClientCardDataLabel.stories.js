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
    as: defaultValue(ClientCardDataLabel, 'as'),
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
    <ClientCardDataList #default="props">
        <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i">
            <ClientCardDataLabel :index="i" :as="args.as" />
            <ClientCardDataValue :index="i" />
        </ClientCardDataListItem>
    </ClientCardDataList>
</ClientCardRoot>`
/**
 * ## Overview
 * The `ClientCardDataLabel` sub-component displays a data point field text label for a given data point object in the `client.stats[i]` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
export default {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardDataLabel',
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
                defaultValue: { summary: defaultValue(ClientCardDataLabel, 'as') },
            }
        },
        index: {
            type: {required: true },
            description: 'The indexed position in the `ClientCardDataList` props.data array.',
            table: {
                category: ClientCard.argTypes.as.table.category,
            },
            control: false
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
        ClientCardDataListItem: {
            table: {
                type: { summary: "Root-Component" },
                defaultValue: { summary: '<ClientCardDataListItem />' },
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
 * The `ClientCardDataLabel` component is intended to be used as a sub-component slotted into `ClientCardDataListItem`. 
 * It renders a data point label from the `client.stats[i].label` based on the `index` prop passed in.
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
            <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i">
                <ClientCardDataLabel :index="i" #default="props" :as="args.as">
                    <h5>{{ props.label }}:</h5>
                </ClientCardDataLabel>
                <ClientCardDataValue :index="i" />
            </ClientCardDataListItem>
        </ClientCardDataList>
    </ClientCardRoot>
`
})

