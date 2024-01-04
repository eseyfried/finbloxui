import {
    AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/Core/Primitives/AlertDialog";
/**
 * ## Overview
 * The `QuoteDetail` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
export default {
    title: 'Library/Core/Primitives/AlertDialog',
    component: { AlertDialogRoot, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction },
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
    title: 'Library/Core/Primitives/AlertDialog',
    args: {
        
    },
    render: (args) => ({
      components: { AlertDialogRoot, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent,AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction },
      setup() {
        const handleAction = () => {
            alert('clicked action button!')
          }
        return { args, handleAction };
      },
      template: `
      <div class="bg-slate-50 p-10">
        <AlertDialogRoot>
            <AlertDialogTrigger>
                Delete account
            </AlertDialogTrigger>
            <AlertDialogPortal>
                <AlertDialogOverlay class="bg-black opacity-25 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
                <AlertDialogContent class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
                    <AlertDialogTitle>
                        Hello
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        How are you?
                    </AlertDialogDescription>
                    <div class="flex justify-end gap-[25px]">
                        <AlertDialogCancel
                            class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                            @click="handleAction"
                        >
                            Yes, delete account
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialogRoot>
      </div>`,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the AlertDialog component.",
            },
            source: {
                code: `
<AlertDialogRoot/>`
            }
        }
    }
};

