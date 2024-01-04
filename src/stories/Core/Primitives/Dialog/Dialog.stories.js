import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/Core/Primitives/Dialog";
/**
 * ## Overview
 * The `QuoteDetail` component ...  
 * 
 * ### User Story
 * > As a user, I want to ... so that I can ...
 */
export default {
    title: 'Library/Core/Primitives/Dialog',
    component: { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose },
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
    title: 'Library/Core/Primitives/Dialog',
    args: {
        
    },
    render: (args) => ({
      components: { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose },
      setup() {
        return { args };
      },
      template: `
      <div class="bg-slate-50 p-10">
        <DialogRoot>
            <DialogTrigger>
                Edit Profile
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay class="bg-black opacity-25 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
                <DialogContent class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
                    <DialogTitle>My Modal</DialogTitle>
                    <DialogDescription>Hola</DialogDescription>
                    <DialogClose as-child>
                        <button
                        class="bg-gray-200 text-gray-500 hover:bg-gray-400 focus:shadow-md inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                        >
                        Save changes
                        </button>
                    </DialogClose>
                    <DialogClose
                        class="text-gray-200 hover:bg-gray-400 focus:shadow-md absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                        >
                        X
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
      </div>`,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Dialog component.",
            },
            source: {
                code: `
<DialogRoot/>`
            }
        }
    }
};

