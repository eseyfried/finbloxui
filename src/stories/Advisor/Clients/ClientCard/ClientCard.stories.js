import { ClientCardRoot } from '@/components/Advisor/Clients/ClientCard/';
import { ref } from "vue";
import { useClientData } from "@/stories/modules/useClientData";
import { action } from "@storybook/addon-actions";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";


const getArgs = generateArgs({
    actionLabel: defaultValue(ClientCardRoot, 'actionLabel'),
    as: defaultValue(ClientCardRoot, 'as'),
    showAction: defaultValue(ClientCardRoot, 'showAction'),
    showStats: defaultValue(ClientCardRoot, 'showStats'),
    showContactInfo: defaultValue(ClientCardRoot, 'showContactInfo'),
    client: useClientData()
})

const components = { ClientCardRoot }

const methods = {
    handleEmailClick: (email) => { alert(`Email link was clicked with value ${email}`); action('@fb-client-card-email-link:click')(email) },
    handlePhoneClick: (phone) => { alert(`Phone link was clicked with value ${phone}`); action('@fb-client-card-phone-link:click')(phone)},
    handleActionClick: (client) => { alert(`Action link was clicked with client ${JSON.stringify(client)}`); action('@fb-client-card-action-link:click')(client) }
}

const template = `
<ClientCardRoot
    :client="args.client"
    :as="args.as"
    :showAction="args.showAction"
    :actionLabel="args.actionLabel"
    :showStats="args.showStats"
    :showContactInfo="args.showContactInfo"
    @fb-client-card-action-link:click="handleActionClick"
    @fb-client-card-email-link:click="handleEmailClick"
    @fb-client-card-phone-link:click="handlePhoneClick"
/>`

/**
 * ## Overview
 * The `ClientCardRoot` component accepts a [client data object](?path=/story/library-datadefinitions--client-object) and displays the client details. This component is intended to show basic name and address details
 * along with high-level summary financial details. 
 * 
 */

export default {
    title: 'Library/Advisor/Clients/ClientCard',
    components,
    tags: ['autodocs'],
    args: getArgs(),
    argTypes: {
        as: {
            description: "render this component root tag as a specific html tag",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(ClientCardRoot, 'as') },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        client: {
            type: { name: "Object", required: true },
            defaultValue: ref({}),
            description: "A [client object](/?path=/story/example-datadefinitions--client-object)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
            control: false
        },
        showAction: {
            description: "Show action link.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(ClientCardRoot, 'showAction') },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        showStats: {
            description: "Show stats section.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(ClientCardRoot, 'showStats') },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        showContactInfo: {
            description: "Show contact info section.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(ClientCardRoot, 'showContactInfo') },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        actionLabel: {
            description: "Text label for the action link",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(ClientCardRoot, 'actionLabel') },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        "fb-client-card-email-link:click": {
            description: "Event emiited when an email link is clicked",
            table: {
                category: 'Events',
                defaultValue: { summary: "returns the clicked email value" },
            },
        },
        "fb-client-card-phone-link:click": {
            description: "Event emiited when a phone link is clicked",
            table: {
                category: 'Events',
                defaultValue: { summary: "returns the clicked phone value" },
            },
        },
        "fb-client-card-action-link:click": {
            description: "Event emiited when the action link is clicked. Typically used for linking to deeper client content.",
            table: {
                category: 'Events',
                defaultValue: { summary: "returns the client object" },
            },
        },
        ".fb-client-card": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-card-header": {
            description: "The class applied to the root element of client card name section.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-card-stats": {
            description: "The class applied to the root element of client card stats section.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-client-card-contact-info": {
            description: "The class applied to the root element of client card contact info section.",
            table: {
                category: 'CSS Classes',
            },
        },
    }
};


const render = (args) => ({
    components,
    setup: () => { return { args } },
    template,
    methods,
})



export const BasicUse = render

export const WithCustomActionLabel = {
    render,
    args: {
        actionLabel:  "show more details"
    }
}
export const WithStatsOff = {
    render,
    args: {
        showStats: false
    }
}

export const WithContactInfoOff = {
    render,
    args: {
        showContactInfo: false
    }
}

export const WithActionOff = {
    render,
    args: {
        showAction: false
    }
}
