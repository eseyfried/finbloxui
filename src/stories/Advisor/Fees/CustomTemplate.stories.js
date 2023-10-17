/* eslint-disable storybook/story-exports */
const template = `
<Fees v-bind="args">
  <template #transactions="slotProps">
        <div class="fb-fees-transactions">
            <table>
                <thead>
                    <tr>
                        <th class="fb-fees-transactions-desc">{{ slotProps.props.descriptionLabel }}</th>
                        <th class="fb-fees-transactions-amount">{{ slotProps.props.amountLabel }}</th>
                        <th class="fb-fees-transactions-date">{{ slotProps.props.dateLabel }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, i) in slotProps.data" :key="i">
                        <td class="fb-fees-transactions-desc">{{ record.description }}</td>
                        <td class="fb-fees-transactions-amount">{{ args.formatCurrency(record.amount) }}</td>
                        <td class="fb-fees-transactions-date">{{ args.formatDate(record.date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  </template>
</Fees>
`;
export default {
    title: 'Library/Advisor/Fees',
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