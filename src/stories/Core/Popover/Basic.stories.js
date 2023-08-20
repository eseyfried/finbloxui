import Popover from '@/components/Core/Popover/Popover.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/Popover',
    args: {
        trigger: "click",
        selector: "#show"
    },
    render: (args) => ({
      components: { Popover },
      setup() {
        return { args };
      },
      template: `
      <button id="show">show</button>
      <Popover :selector="args.selector">
        <div>tool tip</div>
      </Popover>
      
      `
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Popover component involves wrapping your content with the `Popover` component.",
            },
            source: {
                code: `
<button id="show">show</button>
<Popover selector="#show" trigger="click">
    <div>tool tip</div>  <-- Slot your custom content here
</Popover>                
                `
            }
        }
    }
};