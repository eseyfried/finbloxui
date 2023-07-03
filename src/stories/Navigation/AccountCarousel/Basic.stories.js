import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import AccountCarousel from '../../../components/Navigation/AccountCarousel.vue';

let defaultAccounts = ref([]);
export default {
    title: 'Example/Navigation/AccountCarousel',
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
      template: '<AccountCarousel :accounts="args.accounts" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the AccountCarousel component.",
            },
            source: {
                code: `<AccountCarousel :accounts="accounts" />`
            }
        }
    }
};