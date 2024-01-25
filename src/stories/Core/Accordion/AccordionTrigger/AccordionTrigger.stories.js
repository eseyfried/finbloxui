
 export default {
    title: 'Library/Core/Accordion/AccordionTrigger/Docs',
    argTypes: {
        ".fb-accordion-trigger": {
            description: "The class applied to the component trigger element.",
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

/**
 * this hides the story from the sidebar. see /storybook-vue/.storybook/manager.js
 */
export const EmptyStory = {}