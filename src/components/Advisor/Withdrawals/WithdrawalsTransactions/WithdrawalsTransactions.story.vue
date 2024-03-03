<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Withdrawals/WithdrawalsTransactions"
        auto-props-disabled
    >

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <WithdrawalsRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <WithdrawalsTransactions />
                    </WithdrawalsRoot>
                </div>
            </template>
        </Variant>
         <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <WithdrawalsRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <WithdrawalsTransactions #default="{transactions, descriptionLabel, dateLabel, amountLabel, showTransactions }">
                            <table v-if="showTransactions">
                                <thead>
                                    <tr>
                                        <th class="fb-withdrawals-transactions-date">{{ dateLabel }}</th>
                                        <th class="fb-withdrawals-transactions-desc">{{ descriptionLabel }}</th>
                                        <th class="fb-withdrawals-transactions-amount">{{ amountLabel }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(record, i) in transactions" :key="i">
                                        <td class="fb-withdrawals-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                        <td class="fb-withdrawals-transactions-desc">{{ record.description }}</td>
                                        <td class="fb-withdrawals-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </WithdrawalsTransactions>
                    </WithdrawalsRoot>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useTransactionData } from "@/../.histoire/modules/useClientData";
import WithdrawalsRoot from '@/components/Advisor/Withdrawals/WithdrawalsRoot';
import WithdrawalsTransactions from '@/components/Advisor/Withdrawals/WithdrawalsTransactions/WithdrawalsTransactions';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(WithdrawalsRoot, 'as'),
    data: useTransactionData().filter((record) => record.transaction_type === "Transfer"),
    label: defaultValue(WithdrawalsRoot, 'label'),
    showTransactions: defaultValue(WithdrawalsRoot, 'showTransactions'),
    showDate: defaultValue(WithdrawalsRoot, 'showDate'),
    descriptionLabel: defaultValue(WithdrawalsRoot, 'descriptionLabel'),
    dateLabel: defaultValue(WithdrawalsRoot, 'dateLabel'),
    amountLabel: defaultValue(WithdrawalsRoot, 'amountLabel'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>