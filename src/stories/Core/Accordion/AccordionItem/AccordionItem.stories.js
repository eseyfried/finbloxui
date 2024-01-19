import {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
    AccordionTrigger,
} from "@/components/Core/Accordion";


/**
 * <span className="badge sb-unstyled">Core</span>
 * 
 * 
 * ## Overview
 * The `AccordionItem` is a core Finblox-UI component used as a sub-component to construct a classic accordion style ui.
 * 
 * 
 */
 export default {
    title: 'Library/Core/Accordion/AccordionItem',
    components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
    tags: ['autodocs'],
    args: {
        value: "",
        disabled: false,
    },
    argTypes: {
        value: {
            description: "A value representing the accordion item. This value is used when configuring a default open state as well as emitted upon click.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        disabled: {
            description: "Whether the accordion is disabled or not",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "true" },
                category: 'Props',
            },
            options: [true, false],
        },
        ".fb-accordion-item": {
            description: "The class applied to the component item element.",
            table: {
                category: 'CSS Classes',
            },
        },
        
        AccordionRoot: {
            table: {
                type: { summary: "Root Component" },
                defaultValue: { summary: '<AccordionRoot />' },
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
<AccordionRoot>
    <template v-for="(accordionItem, i) in accordionItems" :key="i">
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

export const BasicAccordionItem = {
        title: 'Library/Core/Accordion',
        args: {
            
        },
        render: (args) => ({
            components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
          setup() {
            return { args, accordionItems };
          },
          template: `
          <div class="">
            ${template}
          </div>`,
        }),
        parameters: {
            docs: {
                description: {
                    story: "The basic use of the Accordion Item component.",
                },
                source: {
                    code: `const accordionItems = ${JSON.stringify(accordionItems, " ", 4)} ${template}`
                }
            }
        }
};

