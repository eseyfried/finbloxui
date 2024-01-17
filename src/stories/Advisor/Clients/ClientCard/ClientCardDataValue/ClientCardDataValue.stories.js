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
 * The `ClientCardDataValue` sub-component displays a data point value for a given data point object in the `client.stats[i]` object
 * passed into the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardDataValue',
    components: { ClientCardRoot, ClientCardDataList, ClientCardDataListItem, ClientCardDataLabel, ClientCardDataValue },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "span" },
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
        ClientCardDataLabel: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<ClientCardDataLabel />' },
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
                    story: config?.source || "The `ClientCardDataValue` component is intended to be used as a sub-component slotted into `ClientCardDataListItem`. It renders a data point value from the `client.stats[i].value` based on the `index` prop passed in.",
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
            <ClientCardDataLabel :index="i" />
            <ClientCardDataValue :index="i" #default="props">
                <h5>{{ props.value }}</h5>
            </ClientCardDataValue>
        </ClientCardDataListItem>
    </ClientCardDataList>
</ClientCardRoot>
`,
    story: 'You can customize the layout using the `#default="props"` attribute and slotted content.'
})
}