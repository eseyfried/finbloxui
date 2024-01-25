
 export default {
    title: 'Library/Core/Accordion/AccordionHeader/Docs',
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

/**
 * this hides the story from the sidebar. see /storybook-vue/.storybook/manager.js
 */
export const EmptyStory = {}