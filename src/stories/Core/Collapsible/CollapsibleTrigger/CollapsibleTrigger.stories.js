
import { defaultValue } from "@/stories/modules/useStoryHelper";
import {
    CollapsibleTrigger
} from "@/components/Core/Collapsible";
 export default {
    title: 'Library/Core/Collapsible/CollapsibleTrigger/Docs',
    argTypes: {
        as: {
            description: "render this component root tag as a specific html tag",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(CollapsibleTrigger, 'as') },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        ".fb-collapsible-trigger": {
            description: "The class applied to the component trigger element.",
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
        CollapsibleContent: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<CollapsibleContent />' },
                category: 'Related Components',
            },
        },
    }
};

/**
 * this hides the story from the sidebar. see /storybook-vue/.storybook/manager.js
 */
export const EmptyStory = {}