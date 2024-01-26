
export default {
    title: 'Library/Core/Collapsible/CollapsibleContent/Docs',
    argTypes: {
        ".fb-collapsible-content": {
            description: "The class applied to the component content element.",
            table: {
                category: 'CSS Classes',
            },
        },
        
        CollapsibleRoot: {
            table: {
                type: { summary: "Root Component" },
                defaultValue: { summary: '<CollapsibleRoot />' },
                category: 'Related Components',
            },
        },
        CollapsibleTrigger: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<CollapsibleTrigger />' },
                category: 'Related Components',
            },
        },
    }
};

/**
 * this hides the story from the sidebar. see /storybook-vue/.storybook/manager.js
 */
export const EmptyStory = {}