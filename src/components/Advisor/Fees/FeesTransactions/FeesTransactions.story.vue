<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Fees/FeesTransactions"
        auto-props-disabled
    >

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <FeesRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <FeesTransactions />
                    </FeesRoot>
                </div>
            </template>
        </Variant>
         <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <FeesRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <FeesTransactions #default="{transactions, descriptionLabel, dateLabel, amountLabel, showTransactions }">
                            <table v-if="showTransactions">
                                <thead>
                                    <tr>
                                        <th class="fb-fees-transactions-date">{{ dateLabel }}</th>
                                        <th class="fb-fees-transactions-desc">{{ descriptionLabel }}</th>
                                        <th class="fb-fees-transactions-amount">{{ amountLabel }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(record, i) in transactions" :key="i">
                                        <td class="fb-fees-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                        <td class="fb-fees-transactions-desc">{{ record.description }}</td>
                                        <td class="fb-fees-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FeesTransactions>
                    </FeesRoot>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useTransactionData } from "@/../.histoire/modules/useClientData";
import FeesRoot from '@/components/Advisor/Fees/FeesRoot';
import FeesTransactions from '@/components/Advisor/Fees/FeesTransactions/FeesTransactions';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(FeesRoot, 'as'),
    data: useTransactionData().filter((record) => record.transaction_type === "Expense"),
    label: defaultValue(FeesRoot, 'label'),
    showTransactions: defaultValue(FeesRoot, 'showTransactions'),
    showDate: defaultValue(FeesRoot, 'showDate'),
    descriptionLabel: defaultValue(FeesRoot, 'descriptionLabel'),
    dateLabel: defaultValue(FeesRoot, 'dateLabel'),
    amountLabel: defaultValue(FeesRoot, 'amountLabel'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>