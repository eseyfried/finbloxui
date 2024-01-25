import {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
    AccordionTrigger,
} from "@/components/Core/Accordion";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";


const accordionItems = [
    {
      value: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
      value: 'item-2',
      title: 'Is it unstyled?',
      content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
    },
    {
      value: 'item-3',
      title: 'Can it be animated?',
      content: 'Yes! You can use the transition prop to configure the animation.',
    },
]


const getArgs = generateArgs({
    as: defaultValue(AccordionRoot, 'as'),
    disabled: defaultValue(AccordionRoot, 'disabled'),
    defaultValue: defaultValue(AccordionRoot, 'defaultValue'),
    accordionItems
})

const components = { 
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
    AccordionTrigger,
}

const template = `
<AccordionRoot
    :as="args.as"
    :disabled="args.disabled"
    :defaultValue="args.defaultValue"
>
    <template v-for="(accordionItem, i) in args.accordionItems" :key="i">
        <AccordionItem :value="accordionItem.value">
            <AccordionHeader>
                <AccordionTrigger>
                    {{ accordionItem.title }}
                </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
                <p>{{ accordionItem.content }}</p>
            </AccordionContent>
        </AccordionItem>
    </template>
</AccordionRoot>
`

/**
 * <span className="badge sb-unstyled">Core</span>
 * 
 * 
 * ## Overview
 * The `AccordionRoot` is a core Finblox-UI component used to construct a classic accordion style ui which is
 * a vertically stacked set of interactive headings that each reveal an associated section of content.
 * Cosntructing an accordion requires the use of several related sub-components listed below.
 * 
 * ### Accordion Items
 * 
 * A typical implementation would use an array of accordion item objects with the following fields:
 * 
 * - **value**: the value field is the only required field. It is used with <AccordionItem />
 * - **title**: this field is intended to be passed to the <AccordionHeader /> or <AccordionTrigger /> as slotted content
 * - **content**: this field is intended to be passed to the <AccordionContent /> as slotted content
 * 
 * For example:
 * 
 * ```javascript
 * const accordionItems = [
 *  {
 *      value: 'item-1',
 *      title: 'Is it accessible?',
 *      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
 *  },
 *  {
 *      value: 'item-2',
 *      title: 'Is it unstyled?',
 *      content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
 *   },
 *   {
 *      value: 'item-3',
 *      title: 'Can it be animated?',
 *      content: 'Yes! You can use the transition prop to configure the animation.',
 *   },
 * ]
 * ```
 */
 export default {
    title: 'Library/Core/Accordion',
    components,
    tags: ['autodocs'],
    args: getArgs(),
    argTypes: {
        accordionItems: {
            table: {
                disable: true
            }
        },
        as: {
            description: "render this component root tag as a specific html tag",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(AccordionRoot, 'as') },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        disabled: {
            description: "Whether the accordion is disabled or not",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(AccordionRoot, 'disabled') },
                category: 'Props',
            },
            options: [true, false],
        },
        defaultValue: {
            description: "The value of the accordion item to expand by default",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(AccordionRoot, 'defaultValue') },
                category: 'Props',
            },
            options: [true, false],
        },
        ".fb-accordion": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-accordion-item": {
            description: "The class applied to the component item element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-accordion-header": {
            description: "The class applied to the component item header element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-accordion-trigger": {
            description: "The class applied to the item trigger element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-accordion-content": {
            description: "The class applied to the component item content element.",
            table: {
                category: 'CSS Classes',
            },
        },
        AccordionItem: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionItem />' },
                category: 'Related Components',
            },
        },
        AccordionHeader: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionHeader />' },
                category: 'Related Components',
            },
        },
        AccordionTrigger: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionTrigger />' },
                category: 'Related Components',
            },
        },
        AccordionContent: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionContent />' },
                category: 'Related Components',
            },
        },
    },
};



const render = (args) => ({
    components,
    setup: () => { return { args } },
    template,
})


export const BasicUse = render

export const DisabledAccordion = {
    render,
    args: {
        disabled: true
    },
}

export const ExpandedByDefault = {
    render,
    args: {
        defaultValue: "item-1"
    }
}
