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
            <AccordionRoot class="bg-gray-200 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5">
                <template v-for="(accordionItem, i) in accordionItems" :key="i">
                    <AccordionItem class="focus-within:shadow-gray-100  mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]" :value="accordionItem.value">
                        <AccordionHeader class="flex">
                            <AccordionTrigger class="text-green-700  shadow-gray-100 hover:bg-green-100 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group">
                                {{ accordionItem.title }}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent class="text-black bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                            <p class="p-4">{{ accordionItem.content }}</p>
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

