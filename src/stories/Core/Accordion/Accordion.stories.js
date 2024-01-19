import {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
    AccordionTrigger,
} from "@/components/Core/Accordion";
import { useStoryTemplate } from "@/stories/modules/useStoryTemplate";

/**
 * <span className="badge sb-unstyled">Core</span>
 * 
 * 
 * ## Overview
 * The `AccordionRoot` is a core Finblox-UI component used to construct a classic accordion style ui which is
 * a vertically stacked set of interactive headings that each reveal an associated section of content.
 * Cosntructing an accordion requires the use of several related sub-components listed below.
 * 
 * 
 */
 const main = {
    title: 'Library/Core/Accordion',
    components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
    tags: ['autodocs'],
    args: {
        disabled: false,
        defaultValue: ""
    },
    argTypes: {
        disabled: {
            description: "Whether the accordion is disabled or not",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "false" },
                category: 'Props',
            },
            options: [true, false],
        },
        defaultValue: {
            description: "The value of the accordion item to expand by default",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
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
    }
};

export default main;

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


const template = `
<AccordionRoot
    v-bind="args"
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

const Template = (config) => {
    return {
        render: (args) => {
            return {
                components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
                setup() {
                    args.accordionItems = accordionItems
                    args.props = config?.props
                    return { args };
                },
                template: config?.template || useStoryTemplate(template, config?.props),
                methods: {}
            }
        },
        parameters: {
            docs: {
                description: {
                    story: config?.story,
                },
                source: {
                    code: config?.template || config?.source || useStoryTemplate(template, config?.props)
                }
            }
        }
    };
}

export const BasicAccordion = {
        ...Template({
            story: "The basic use of the Accordion component.",
            source: `const accordionItems = ${JSON.stringify(accordionItems, " ", 4)} ${useStoryTemplate(template, {...main.args})}`
        }),
        args: {
            ...main.args
        },
};

export const DisabledAccordion = {
    ...Template({
        props: {...main.args, disabled: true}
    }),
    args: {
        ...main.args,
        disabled: true
    },
};

export const ExpandedByDefault = {
    ...Template({
        props: {...main.args, defaultValue: "item-1"}
    }),
    args: {
        ...main.args,
        defaultValue: "item-1"
    },
};