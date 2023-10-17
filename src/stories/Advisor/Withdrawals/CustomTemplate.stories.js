/* eslint-disable storybook/story-exports */
const template = `
<Withdrawals v-bind="args">
  <template #transactions="slotProps">
        <div class="fb-withdrawals-transactions">
            <table>
                <thead>
                    <tr>
                        <th class="fb-withdrawals-transactions-desc">{{ slotProps.props.descriptionLabel }}</th>
                        <th class="fb-withdrawals-transactions-amount">{{ slotProps.props.amountLabel }}</th>
                        <th class="fb-withdrawals-transactions-date">{{ slotProps.props.dateLabel }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, i) in slotProps.data" :key="i">
                        <td class="fb-withdrawals-transactions-desc">{{ record.description }}</td>
                        <td class="fb-withdrawals-transactions-amount">{{ args.formatCurrency(record.amount) }}</td>
                        <td class="fb-withdrawals-transactions-date">{{ args.formatDate(record.date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  </template>
</Withdrawals>
`;
export default {
    title: 'Library/Advisor/Withdrawals',
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