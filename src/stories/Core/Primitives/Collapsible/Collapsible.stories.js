import { ref } from "vue"
import {
    CollapsibleRoot,
    CollapsibleTrigger,
    CollapsibleContent
} from "@/components/Core/Primitives/Collapsible";
/**
 * ## Overview
 * The `QuoteDetail` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
export default {
    title: 'Library/Core/Primitives/Collapsible',
    component: { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent },
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
    title: 'Library/Core/Primitives/Collapsible',
    args: {
        
    },
    render: (args) => ({
      components: { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent },
      setup() {
        const open = ref(false)
        return { args, open };
      },
      template: `
      <div class="bg-slate-50 p-10">
        <CollapsibleRoot v-model:open="open" class="w-[300px]">
            <div style="display: flex; align-items: center; justify-content: space-between">
                <span class="text-white text-[15px] leading-[25px]"> @peduarte starred 3 repos </span>
                <CollapsibleTrigger
                    class="cursor-default rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-green-500 shadow-[0_2px_10px] shadow-md outline-none data-[state=closed]:bg-white data-[state=open]:bg-green-300 hover:bg-green-300 focus:shadow-[0_0_0_2px] focus:shadow-black"
                >
                    +
                </CollapsibleTrigger>
            </div>
        
            <div class="bg-white rounded mt-[10px] p-[10px] shadow-[0_2px_10px] shadow-md">
                <span class="text-green-500 text-[15px] leading-[25px]">@radix-vue/radix-vue</span>
            </div>
            <CollapsibleContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-md">
                    <span class="text-green-500 text-[15px] leading-[25px]">@vuejs/core</span>
                </div>
                <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-md">
                    <span class="text-green-500 text-[15px] leading-[25px]">@radix-ui/primitives</span>
                </div>
                </CollapsibleContent>
        </CollapsibleRoot>
      </div>`,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Collapsible component.",
            },
            source: {
                code: `
<CollapsibleRoot/>`
            }
        }
    }
};

