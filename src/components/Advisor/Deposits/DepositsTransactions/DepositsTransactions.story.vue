<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Deposits/DepositsTransactions"
        auto-props-disabled
    >

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DepositsRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <DepositsTransactions />
                    </DepositsRoot>
                </div>
            </template>
        </Variant>
         <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <DepositsRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <DepositsTransactions #default="{transactions, descriptionLabel, dateLabel, amountLabel, showTransactions }">
                            <table v-if="showTransactions">
                                <thead>
                                    <tr>
                                        <th class="fb-deposits-transactions-date">{{ dateLabel }}</th>
                                        <th class="fb-deposits-transactions-desc">{{ descriptionLabel }}</th>
                                        <th class="fb-deposits-transactions-amount">{{ amountLabel }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(record, i) in transactions" :key="i">
                                        <td class="fb-deposits-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                        <td class="fb-deposits-transactions-desc">{{ record.description }}</td>
                                        <td class="fb-deposits-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </DepositsTransactions>
                    </DepositsRoot>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useTransactionData } from "@/../.histoire/modules/useClientData";
import DepositsRoot from '@/components/Advisor/Deposits/DepositsRoot';
import DepositsTransactions from '@/components/Advisor/Deposits/DepositsTransactions/DepositsTransactions';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(DepositsRoot, 'as'),
    data: useTransactionData().filter((record) => record.transaction_type === "Transfer"),
    label: defaultValue(DepositsRoot, 'label'),
    showTransactions: defaultValue(DepositsRoot, 'showTransactions'),
    showDate: defaultValue(DepositsRoot, 'showDate'),
    descriptionLabel: defaultValue(DepositsRoot, 'descriptionLabel'),
    dateLabel: defaultValue(DepositsRoot, 'dateLabel'),
    amountLabel: defaultValue(DepositsRoot, 'amountLabel'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>