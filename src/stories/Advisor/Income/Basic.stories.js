/* eslint-disable storybook/story-exports */
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import Income from '@/components/Advisor/Income/Income.vue';
import * as formatters from "@/modules/useFormatter";

let defaultTransactions = ref([]);
export default {
    title: 'Library/Advisor/Income',
    args: {
        data: [],
        label: "Income",
        descriptionLabel: "Description",
        dateLabel: "Date",
        amountLabel: "Amount",
        showTransactions: true,
        showDate: true
    },
    render: (args) => {
        args.data = defaultTransactions.value;
        return {
            components: { Income },
            setup() {
                const { transactions } = storeToRefs(useDemoStore());
                args.data = ref(transactions.value.filter(record => record.transaction_type === "Income").map((record => {
                    record.date = record.transaction_date;
                    return record;
                })));
                defaultTransactions.value = args.data;
                args.formatDate = formatters.formatDate;
                args.formatCurrency = formatters.formatCurrency;
                return { args };
            },
            template: '<Income v-bind="args" />',
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Income component.",
            },
            source: {
                code: `<Income :data="[]" />`
            }
        }
    }
};