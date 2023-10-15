/* eslint-disable storybook/story-exports */
const template = `
<Income v-bind="args">
  <template #transactions="slotProps">
        <div class="fb-income-transactions">
            <table>
                <thead>
                    <tr>
                        <th class="fb-income-transactions-desc">{{ slotProps.props.descriptionLabel }}</th>
                        <th class="fb-income-transactions-amount">{{ slotProps.props.amountLabel }}</th>
                        <th class="fb-income-transactions-date">{{ slotProps.props.dateLabel }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, i) in slotProps.data" :key="i">
                        <td class="fb-income-transactions-desc">{{ record.description }}</td>
                        <td class="fb-income-transactions-amount">{{ formatCurrency(record.amount) }}</td>
                        <td class="fb-income-transactions-date">{{ formatDate(record.date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  </template>
</Income>
`;
export default {
    title: 'Library/Advisor/Income',
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