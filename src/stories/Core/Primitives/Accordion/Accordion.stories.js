import {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionContent
} from "@/components/Core/Primitives/Accordion";


/**
 * ## Overview
 * The `QuoteDetail` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Library/Core/Primitives/Accordion',
    component: { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent },
    tags: ['autodocs'],
    argTypes: {
        // symbol: {
        //     type: { name: "String", required: true },
        //     defaultValue: {},
        //     description: "The symbol or cusip of the quoted security",
        //     table: {
        //         type: { summary: "String" },
        //         defaultValue: { summary: null },
        //         category: 'Props',
        //     },
        // },
    }
};


export const BasicAccordion = {
        title: 'Library/Core/Primitives/Accordion',
        args: {
            
        },
        render: (args) => ({
          components: { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent },
          setup() {
            return { args };
          },
          template: `
          <div class="bg-slate-50 p-10">
          <AccordionRoot
            class="bg-white w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
            default-value="'item-1'"
            :collapsible="true"
            orientation="horizontal"
          >
            <AccordionItem class=" mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10" value="item-1">
                <AccordionHeader class="flex m-0">
                    <AccordionTrigger class="text-lime-500 border-none shadow-gray-100 shadow-[0_1px_0] hover:bg-lime-50 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none group">
                        Hello World
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="text-lime-500 p-2 bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                    <div class="px-5 py-4">Hiya!</div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem class="mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10" value="item-2">
                <AccordionHeader class="flex m-0">
                    <AccordionTrigger class="text-lime-500 border-none shadow-gray-100 shadow-[0_1px_0] hover:bg-lime-50 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none group">
                        Hello World 2
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="text-lime-500 bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                    <div class="px-5 py-4">Hiya Again!</div>
                </AccordionContent>
            </AccordionItem>
            
          </AccordionRoot></div>`,
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

