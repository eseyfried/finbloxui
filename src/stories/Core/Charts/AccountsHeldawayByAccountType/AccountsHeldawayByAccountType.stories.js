import Chart from '@/components/Core/Charts/Chart.vue';
import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref } from "vue";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";

const theme = ref("headless");

const getArgs = generateArgs({
    type: "doughnut",
    labels: ['Retirement', 'Annuity', 'Taxable', 'Trust'],
    data: [10, 15, 20, 23,],
    totalLabel: defaultValue(AccountsHeldawayByAccountType, 'totalLabel'),
    totalValue: "$10M",
    chartjsOptions: {},
    chartjsData: {},
    colors: defaultValue(Chart, 'colors')
})

const components = { 
    AccountsHeldawayByAccountType
}

const template = `
<AccountsHeldawayByAccountType
    :type="args.type"
    :labels="args.labels"
    :data="args.data"
    :totalLabel="args.totalLabel"
    :totalValue="args.totalValue"
    :colors="args.colors"
/>
`


/**
 * ## Overview
 * The `AccountsHeldawayByAccountType` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Library/Core/Charts/AccountsHeldawayByAccountType',
    components,
    tags: ['autodocs'],
    args: getArgs(),
    argTypes: {
        type: {
            type: { name: "String", required: false },
            defaultValue: "doughnut",
            description: "A chartjs chart type",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(AccountsHeldawayByAccountType, 'type') },
                category: 'Props',
            },
            options: [
                "doughnut",
                "pie",
            ],
            control: { type: 'select' },
        },
        labels: {
            type: { name: "Array", required: true },
            defaultValue: [],
            description: "An array of held away account types",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: defaultValue(AccountsHeldawayByAccountType, 'labels') },
                category: 'Props',
            },
        },
        data: {
            type: { name: "Array", required: true },
            description: "An array of total values for each heldaway account type in the data prop. Values should be numeric.",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: defaultValue(AccountsHeldawayByAccountType, 'data')},
                category: 'Props',
            },
        },
        totalLabel: {
            type: { name: "String", required: false },
            description: "The text label for the total section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(AccountsHeldawayByAccountType, 'totalLabel') },
                category: 'Props',
            },
        },
        totalValue: {
            type: { name: "String", required: false },
            description: "The total value for the total section of the chart.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(AccountsHeldawayByAccountType, 'totalValue') },
                category: 'Props',
            },
        },
        chartjsData: {
            type: { name: "Object", required: false },
            description: "A chartjs [data structure object](https://www.chartjs.org/docs/latest/general/data-structures.html)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}" },
                category: 'Props',
            },
        },
        chartjsOptions: {
            type: { name: "Object", required: false },
            description: "A chartjs [configuration options object](https://www.chartjs.org/docs/latest/configuration/)",
            table: {
                type: { summary: "Object" },
                defaultValue: { summary: "{}"},
                category: 'Props',
            },
        },
        colors: {
            type: { name: "Array" },
            description: "An array of colors to apply to all datasets based on chartjs [colors](https://www.chartjs.org/docs/latest/general/colors.html)",
            table: {
                type: { summary: "Array" },
                defaultValue: { summary: JSON.stringify(defaultValue(Chart, 'colors')) },
                category: 'Props',
            },
        },
        ".fb-accounts-heldaway-by-account-type-chart": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-accounts-heldaway-by-account-type-chart-hero": {
            description: "The class applied to the component total section root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        // SLOTS
        "default": {
            description: "The `default` slot for customizing the total template. The slot props can be used in your template.",
            table: {
                category: 'slots',
                defaultValue: {
                    detail: "available props to bind to your template",
                    summary: `totalLabel, totalValue`
                }
            },
        },
    }
};

const render = (args, context) => ({
    components,
    setup: () => { 
        theme.value = context.globals.theme;
        args.colors = {...[...geChartColorsByTheme(theme.value)]}
        return { args }
    },
    template,
})


export const BasicUse = render


const CustomUsingSlotPropsTemplate = `
<AccountsHeldawayByAccountType
    :type="args.type"
    :labels="args.labels"
    :data="args.data"
    :totalLabel="args.totalLabel"
    :totalValue="args.totalValue"
    :colors="args.colors"
    #default="props"
>
    <h2>{{ props.totalValue }}</h2>
    <h3>{{ props.totalLabel }}</h3>
</AccountsHeldawayByAccountType>
`
/**
 * 
 * You can customize the layout using the `#default="props"` attribute and slotted content.
 */
export const CustomUsingSlotProps = {
    render: (args, context) => ({
        components,
        setup: () => { 
            theme.value = context.globals.theme;
            args.colors = {...[...geChartColorsByTheme(theme.value)]}
            return { args }
        },
        template: CustomUsingSlotPropsTemplate
    }),
    parameters: {
        docs: {
            source: {
                code: `const args = ${JSON.stringify({...getArgs()},null, 4)}` + CustomUsingSlotPropsTemplate
            }
        }
    }
}
