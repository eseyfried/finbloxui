/* eslint-disable storybook/story-exports */
const template = `
<PortfolioSummaryCard v-bind="args">
    <template #default="slotProps">
        <table>
            <tr>
                <th>{{ slotProps.props.currentValueLabel }}</th>
                <td>{{ slotProps.currentValue }}</td>
            </tr>
            <tr>
                <th>{{ slotProps.props.cashLabel }}</th>
                <td>{{ slotProps.cashValue }}</td>
            </tr>
            <tr>
                <th>{{ slotProps.props.securitiesLabel }}</th>
                <td>{{ slotProps.securitiesValue }}</td>
            </tr>
            <tr>
                <th>{{ slotProps.props.changeLabel }}</th>
                <td :class="slotProps.changeClasses">{{ slotProps.changeAmount }} ({{ slotProps.changeAmountPct }})</td>
            </tr>
        </table>
    </template>
</PortfolioSummaryCard>
`;
export default {
    title: 'Library/Advisor/PortfolioSummaryCard',
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