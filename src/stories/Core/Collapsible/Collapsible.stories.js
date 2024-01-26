import {
    CollapsibleRoot,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/Core/Collapsible";
import { defaultValue, generateArgs } from "@/stories/modules/useStoryHelper";

const getArgs = generateArgs({
    as: defaultValue(CollapsibleRoot, 'as'),
    defaultOpen: defaultValue(CollapsibleRoot, 'defaultOpen'),
    disabled: defaultValue(CollapsibleRoot, 'disabled'),
})

const components = { 
    CollapsibleRoot,
    CollapsibleContent,
    CollapsibleTrigger,
}

const template =  `
  <CollapsibleRoot v-model:open="args.defaultOpen" :as="args.as" :disabled="args.disabled" class="w-[300px]">
      <CollapsibleTrigger>
          <span v-if="args.open">-</span>
          <span v-else>+</span>
      </CollapsibleTrigger>
      <div>
          <span>Content that's always visbile </span>
      </div>

      <CollapsibleContent>
          <div>
              <span>Content that can be expanded and collapsed</span>
          </div>
      </CollapsibleContent>
  </CollapsibleRoot>
`
/**
 * ## Overview
 * The `Collapsible` component creates an interactive panel that expands/collapses.
 * 
 * ### Use Case
 * > Use the collaspible component when you have content that you want to hide/show when a user interacts with another element.
 */
 export default {
    title: 'Library/Core/Collapsible',
    components,
    tags: ['autodocs'],
    argTypes: {
        as: {
            description: "render this component root tag as a specific html tag",
            table: {
                type: { summary: "String" },
                defaultValue: { summary: defaultValue(CollapsibleRoot, 'as') },
                category: 'Props',
            },
            control: { type: 'text' },
        },
        defaultOpen: {
            description: "expand the collapsible content by default",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(CollapsibleRoot, 'defaultOpen') },
                category: 'Props',
            },
        },
        disabled: {
            description: "prevent collapsing by disabling component",
            table: {
                type: { summary: "Boolean" },
                defaultValue: { summary: defaultValue(CollapsibleRoot, 'disabled') },
                category: 'Props',
            },
        },
        ".fb-collapsible": {
            description: "The class applied to the component root element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-collapsible-trigger": {
            description: "The class applied to the item trigger element.",
            table: {
                category: 'CSS Classes',
            },
        },
        ".fb-collapsible-content": {
            description: "The class applied to the component item content element.",
            table: {
                category: 'CSS Classes',
            },
        },
        "v-model:open": {
            description: "bind <CollapsibleRoot /> to this v-model to react to the expand/collapse state changes.",
            table: {
                type: { summary: "Boolean" },
                category: 'Events',
            },
        },
        CollapsibleRoot: {
            table: {
                type: { summary: "Root-Component" },
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
        CollapsibleContent: {
            table: {
                type: { summary: "Sub-Component" },
                defaultValue: { summary: '<CollapsibleContent />' },
                category: 'Related Components',
            },
        },
    },
    args: getArgs()
};


const render = (args) => ({
    components,
    setup: () => { return { args } },
    template,
})


export const BasicUse = render

export const DisabledByDefault = {
    render,
    args: {
        disabled: true
    },
}

export const ExpandedByDefault = {
    render,
    args: {
        defaultOpen: true
    }
}
