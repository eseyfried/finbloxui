import AccountTransactionsPage from './AccountTransactions.vue';

export default {
    title: 'Examples/Self-Directed',
    component: AccountTransactionsPage,
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
      layout: 'fullscreen',
    },
  };
  

  export const AccountTransactions = {
    render: (args, context) => {
        args.theme = context.globals.theme.replace(" ", "-");
        return {
            props: Object.keys(args),
            components: { AccountTransactionsPage },
            template: `<AccountTransactionsPage v-bind="$props" />`,
        }
    },
    args: {
        theme: null,
    },
};