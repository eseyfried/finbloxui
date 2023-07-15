import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import AccountCarousel from '@/components/Core/Navigation/AccountCarousel.vue';

// eslint-disable-next-line storybook/story-exports
let defaultAccounts = ref([]);

export default {
    title: 'Example/Core/Navigation/AccountCarousel',
    args: {
        accounts: defaultAccounts
    },
    render: (args) => ({
      components: { AccountCarousel },
      setup() {
        const { accounts } = storeToRefs(useDemoStore());
        args.accounts = ref(accounts.value);
        defaultAccounts.value = args.accounts;
        return { args };
      },
      template: '<AccountCarousel :accounts="args.accounts" @fb-account-carousel:click="handleAccountClick($event)"/>',
      methods: { handleAccountClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `When a user clicks on an account item in the carousel, an event is triggered passing
                the account object for the selected account. By binding your own event handler, you can receive the selected
                account object.
                # An account object example:
    {
        account: {
            change_in_value_amt: 1342.98
            change_in_value_pct: "3.0"
            id: 1
            name: "IRA Goldberg"
            number: "12345671"
            total_market_value: "143,908.8754"
        },
        index: 0
    }
                `,
            },
            source: {
                code: `<AccountCarousel :accounts="accounts" @fb-account-carousel:click="handleAccountClick($event)" />`
            }
        }
    },
};