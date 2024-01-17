import { ClientCardRoot } from '@/components/Advisor/Clients/ClientCard/';
import { ref } from "vue";
import { useClientData } from "@/stories/modules/useClientData";
import { action } from "@storybook/addon-actions";


/**
 * ## Overview
 * The `ClientCardRoot` component accepts a [client data object](?path=/story/library-datadefinitions--client-object) and displays the client details. This component is intended to show basic name and address details
 * along with high-level summary financial details. 
 * 
 */

const main = {
    title: 'Library/Advisor/Clients/ClientCard',
    component: { ClientCardRoot },
    tags: ['autodocs'],
    args: {
        actionLabel: "show more",
        as: "div",
    },
    argTypes: {
        as: {
            description: "render this component root tag as a specific html tag",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "div" },
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
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        showStats: {
            description: "Show stats section.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: true },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        showContactInfo: {
            description: "Show contact info section.",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
            control: { type: 'radio' },
        },
        actionLabel: {
            description: "Text label for the action link",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "Show More" },
                category: 'Props',
            },
            type: { name: "string" },
            defaultValue: "Show More",
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
export default main;


const Template = {
    render: (args) => {
        return {
            components: { ClientCardRoot },
            setup() {
                args.client = useClientData()
                return { args }
            },
            template: `
            <ClientCardRoot
                v-bind="args"
                @fb-client-card-action-link:click="handleActionClick"
                @fb-client-card-email-link:click="handleEmailClick"
                @fb-client-card-phone-link:click="handlePhoneClick"
            />`,
            methods: {
                handleEmailClick: (email) => { alert(`Email link was clicked with value ${email}`); action('@fb-client-card-email-link:click')(email) },
                handlePhoneClick: (phone) => { alert(`Phone link was clicked with value ${phone}`); action('@fb-client-card-phone-link:click')(phone)},
                handleActionClick: (client) => { alert(`Action link was clicked with client ${JSON.stringify(client)}`); action('@fb-client-card-action-link:click')(client) }
            }
        }
    }
  };


export const DefaultClientCard = {
    ...Template
}

export const WithCustomActionLabel = {
    ...Template,
    args: {
        ...main.args,
        actionLabel: "show more details"
    },
}

export const WithStatsOff = {
    ...Template,
    args: {
        ...main.args,
        showStats: false,
    },
}

export const WithContactInfoOff = {
    ...Template,
    args: {
        ...main.args,
        showContactInfo: false
    },
}

export const WithActionOff = {
    ...Template,
    args: {
        ...main.args,
        showAction: false
    },
}

