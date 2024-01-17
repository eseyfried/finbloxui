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
 * The `ClientCardDataLabel` sub-component displays a data point field text label for a given data point object in the `client.stats[i]` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardDataLabel',
    components: { ClientCardRoot, ClientCardDataList, ClientCardDataListItem, ClientCardDataLabel, ClientCardDataValue },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "label" },
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
                    story: config?.source || "The `ClientCardDataLabel` component is intended to be used as a sub-component slotted into `ClientCardDataListItem`. It renders a data point label from the `client.stats[i].label` based on the `index` prop passed in.",
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
    <ClientCardDataList #default="props">
        <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i">
            <ClientCardDataLabel :index="i" #default="props">
                <h5>{{ props.label }}:</h5>
            </ClientCardDataLabel>
            <ClientCardDataValue :index="i" />
        </ClientCardDataListItem>
    </ClientCardDataList>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}