import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import AccountCarousel from '@/components/Core/Navigation/AccountCarousel.vue';
import { formatCurrency } from "@/modules/useFormatter";

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
        return { args, formatCurrency };
      },
      template: `
<AccountCarousel :accounts="args.accounts">
    <template #account="slotProps">
        <div>
            <h2>
                {{ formatCurrency(slotProps.account.total_market_value) }}
                <span v-if="slotProps.props.showLabels">{{ slotProps.totalMarketValueLabel }}</span>
            </h2>
        </div>
    </template>
</AccountCarousel>
`,
      methods: { handleAccountClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `You can override the default account template with your own custom layout using slotted content.
                Wrap your content in a slot template tag named "accounts". The following slotProps will be available for use in your
                template:
                <ul>
                    <li>props - all component props (i.e. showLabels, numVisible, etc.)</li>
                    <li>totalMarketValueLabel - total market value label.</li>
                    <li>changeInValueLabel - change in value label.</li>
                    <li>accountNameLabel - account name label.</li>
                    <li>accountNumberLabel - account number label.</li>
                    <li>account - the account object.</li>
                    <li>showLabels - show labels.</li>
                </ul>
                `,
            },
            source: {
                code: `
<AccountCarousel :accounts="args.accounts">
    <template #account="slotProps">
        <div>
            <h2>
                {{ formatCurrency(slotProps.account.total_market_value) }}
                <span v-if="slotProps.props.showLabels">{{ slotProps.totalMarketValueLabel }}</span>
            </h2>
        </div>
    </template>
</AccountCarousel>
                `
            }
        }
    },
};