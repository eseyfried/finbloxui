import { useClientData } from "@/stories/modules/useClientData";
import { 
    ClientCardRoot,
    ClientCardAction
 } from '@/components/Advisor/Clients/ClientCard/';
import { default as ClientCard } from '../ClientCard.stories'
/**
 * ## Overview
 * The `ClientCardAction` sub-component displays an HTML link element using the label passed to the `ClientCardRoot` component in the action-label prop .
 * When clicked, it will pass the `client` object to the event handler bound to the `ClientCardRoot` component.
 * 
 * 
 */
const main = {
    title: 'Library/Advisor/Clients/ClientCard/ClientCardAction',
    components: { ClientCardRoot, ClientCardAction },
    tags: ['autodocs'],
    argTypes: {
        as: {
            ...ClientCard.argTypes.as,
            table: {
                ...ClientCard.argTypes.as.table,
                defaultValue: { summary: "a" },
            }
        },
        
    },
    args: {},
};

export default main

const template = `
<ClientCardRoot v-bind="args" as="div">
    <ClientCardAction />
</ClientCardRoot>`

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { ClientCardRoot, ClientCardAction },
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
                    story: config?.story || "The `ClientCardAction` is a root component that provides a client address object.",
                },
                source: {
                    code: config?.template || template
                }
            }
        }
    }
}


export const Component = {
    ...Template()
}

export const CustomUsingSlottedContent = {
    ...Template(
        {
            template:`
<ClientCardRoot v-bind="args" as="div">
    <ClientCardAction>
        More Detail
    </ClientCardAction>
</ClientCardRoot>
`,
    story: 'You can customize the layout using slotted content.'
})
}