import AccountPositionsPage from './AccountPositions.vue';

export default {
    title: 'Examples/Self-Directed',
    component: AccountPositionsPage,
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
      layout: 'fullscreen'
    },
  };

//   export const AccountPositions = {};


export const AccountPositions = {
    render: (args, context) => {
        args.theme = context.globals.theme.replace(" ", "-");
        return {
            props: Object.keys(args),
            components: { AccountPositionsPage },
            template: `<AccountPositionsPage v-bind="$props" />`,
        }
    },
    args: {
        theme: null,
    },
};