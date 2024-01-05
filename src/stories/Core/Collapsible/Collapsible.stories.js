import {
    CollapsibleRoot,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/Core/Collapsible";


/**
 * ## Overview
 * The `Collapsible` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
 export default {
    title: 'Library/Core/Collapsible',
    components: { CollapsibleRoot, CollapsibleContent, CollapsibleTrigger },
    tags: ['autodocs'],
    argTypes: {

    }
};


export const BasicAccordion = {
        title: 'Library/Core/Collapsible',
        args: {
            
        },
        render: (args) => ({
            components: { CollapsibleRoot, CollapsibleContent, CollapsibleTrigger },
          setup() {
            args.open = false
            return { args };
          },
          template: `
          <div class="bg-slate-50 p-10">
            <CollapsibleRoot v-model:open="args.open" class="w-[300px]">
                <CollapsibleTrigger
                    class="cursor-default rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-green-600 shadow-[0_2px_10px] shadow-gray-400 outline-none data-[state=closed]:bg-white data-[state=open]:bg-green-400 hover:bg-green-200 focus:shadow-[0_0_0_2px] focus:shadow-black"
                >
                    <span v-if="args.open">-</span>
                    <span v-else>+</span>
                </CollapsibleTrigger>
                <div class="bg-white rounded mt-[10px] p-[10px] shadow-[0_2px_10px] shadow-gray-600">
                    <span class="text-green-700 text-[15px] leading-[25px]">@radix-vue/radix-vue</span>
                </div>

                <CollapsibleContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-gray-600">
                        <span class="text-green-700 text-[15px] leading-[25px]">@vuejs/core</span>
                    </div>
                    <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-gray-600">
                        <span class="text-green-700 text-[15px] leading-[25px]">@radix-ui/primitives</span>
                    </div>
                </CollapsibleContent>

            </CollapsibleRoot>
          </div>`,
        }),
        parameters: {
            docs: {
                description: {
                    story: "The basic use of the Accordion component.",
                },
                source: {
                    code: `
    <CollapsibleRoot/>`
                }
            }
        }
};

