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
 * The `AccordionHeader` is a core Finblox-UI component used as a sub-component to construct a classic accordion style ui.
 * It's role is to function as an HTML heading element within an accordion item to display the accordion item text label. It is intended
 * to wrap an `AccordionTrigger` component to expand/collapse the accordion item content.
 * 
 * 
 */
 export default {
    title: 'Library/Core/Accordion/AccordionHeader',
    components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
    tags: ['autodocs'],
    args: {
    },
    argTypes: {
        ".fb-accordion-header": {
            description: "The class applied to the component item header element.",
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
        AccordionTrigger: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionTrigger />' },
                category: 'Related Components',
            },
        },
        AccordionItem: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionItem />' },
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

export const BasicAccordionHeader = {
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
                    story: "The basic use of the Accordion Header component.",
                },
                source: {
                    code: `const accordionItems = ${JSON.stringify(accordionItems, " ", 4)} ${template}`
                }
            }
        }
};

