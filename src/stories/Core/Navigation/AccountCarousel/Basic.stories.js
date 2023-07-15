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