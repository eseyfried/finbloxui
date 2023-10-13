/* eslint-disable storybook/story-exports */
const template = `
<NetworthChart v-bind="args">
  <template #hero="slotProps">
      <h2>{{ slotProps.currentValue }}</h2>
      <h4>{{ slotProps.props.label }} <span>as of {{ slotProps.asOf }}</span></h4>
  </template>
  <template #month="slotProps">
    <div class="fb-networth-chart-month-change" :class="slotProps.changeClasses">
        <span>{{ slotProps.monthChangeAmount }}</span>
        <span>({{ slotProps.monthChangePercent }})</span>
    </div>
    <h4>{{ slotProps.props.monthLabel }}</h4>
  </template>
  <template #year="slotProps">
    <div class="fb-networth-chart-year-change" :class="slotProps.changeClasses">
        <span>{{ slotProps.yearChangeAmount }}</span>
        <span>({{ slotProps.yearChangePercent }})</span>
    </div>
    <h4>{{ slotProps.props.sinceLabel }} {{ formatDate(slotProps.sinceDate) }}</h4>
  </template>
</NetworthChart>
`;
export default {
    title: 'Library/Core/Charts/NetworthChart',
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