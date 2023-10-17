/* eslint-disable storybook/story-exports */
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import Fees from '@/components/Advisor/Fees/Fees.vue';
import * as formatters from "@/modules/useFormatter";

let defaultTransactions = ref([]);
export default {
    title: 'Library/Advisor/Fees',
    args: {
        data: [],
        label: "Management Fees",
        descriptionLabel: "Description",
        dateLabel: "Date",
        amountLabel: "Amount",
        showTransactions: true,
        showDate: true
    },
    render: (args, context, template = null) => {
        args.data = defaultTransactions.value;
        args.formatDate = formatters.formatDate;
        args.formatCurrency = formatters.formatCurrency;
        return {
            components: { Fees },
            setup() {
                const { transactions } = storeToRefs(useDemoStore());
                args.data = ref(transactions.value.filter(record => record.transaction_type === "Expense").map((record => {
                    record.date = record.transaction_date;
                    return record;
                })));
                defaultTransactions.value = args.data;
                return { args };
            },
            template: template || '<Fees v-bind="args" />',
        }
    },
    parameters: {
        docs: {
            description: {
                story: "The basic use of the Fees component.",
            },
            source: {
                code: `<Fees :data="[]" />`
            }
        }
    }
};