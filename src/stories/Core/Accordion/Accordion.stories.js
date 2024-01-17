import {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
    AccordionTrigger,
} from "@/components/Core/Accordion";


/**
 * ## Overview
 * The `QuoteDetail` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Library/Core/Accordion',
    components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
    tags: ['autodocs'],
    argTypes: {

    }
};


export const BasicAccordion = {
        title: 'Library/Core/Accordion',
        args: {
            
        },
        render: (args) => ({
            components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionContent, AccordionTrigger },
          setup() {
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
            return { args, accordionItems };
          },
          template: `
          <div class="bg-slate-50 p-10">
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
          </div>`,
        }),
        parameters: {
            docs: {
                description: {
                    story: "The basic use of the Accordion component.",
                },
                source: {
                    code: `
    <AccordionRoot/>`
                }
            }
        }
};

