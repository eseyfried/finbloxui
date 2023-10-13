/* eslint-disable storybook/story-exports */
const template = `
<InvestmentsChart v-bind="args">
  <template #hero="slotProps">
      <h2>{{ slotProps.currentValue }}</h2>
      <h4>{{ slotProps.props.label }} <span>as of {{ slotProps.asOf }}</span></h4>
  </template>
  <template #changeAmount="slotProps">
    <div :class="slotProps.changeClasses">
        <span>{{ slotProps.changeAmount }}</span>
    </div>
    <h4>{{ slotProps.props.changeAmountLabel }}</h4>
  </template>
  <template #changePercent="slotProps">
    <div :class="slotProps.changeClasses">
        <span>{{ slotProps.changePercent }}</span>
    </div>
    <h4>{{ slotProps.props.changePercentLabel }}</h4>
  </template>
</InvestmentsChart>
`;
export default {
    title: 'Library/Core/Charts/InvestmentsChart',
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