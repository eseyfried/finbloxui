
 export default {
    title: 'Library/Core/Accordion/AccordionItem/Docs',
    argTypes: {
        value: {
            description: "A value representing the accordion item. This value is used when configuring a default open state as well as emitted upon click.",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: "" },
                category: 'Props',
            },
        },
        disabled: {
            description: "Whether the accordion item is disabled or not",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: "false" },
                category: 'Props',
            },
            options: [true, false],
        },
        ".fb-accordion-item": {
            description: "The class applied to the component item element.",
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
        AccordionTrigger: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<AccordionTrigger />' },
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