/* eslint-disable storybook/story-exports */
const template = `
<TotalAUMChart v-bind="args">
  <template #hero="slotProps">
      <h2>{{ slotProps.currentValue }}</h2>
      <h4>{{ slotProps.props.label }} <span>as of {{ slotProps.asOf }}</span></h4>
  </template>
</TotalAUMChart>
`;
export default {
    title: 'Library/Core/Charts/TotalAUMChart',
    args: {

    },
    template: template,
      parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default template with your own custom layout using slotted content. 
                Wrap your content in a slot template tag using slot name(s) documented above. The documented slotProps will be available for use in your
                template.`,
            },
            source: {
                code: template
            }
        }
    }
};