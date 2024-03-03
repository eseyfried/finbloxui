<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Income/IncomeTransactions"
        auto-props-disabled
    >

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <IncomeRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <IncomeTransactions />
                    </IncomeRoot>
                </div>
            </template>
        </Variant>
         <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <IncomeRoot
                        :as="state.as"
                        :data="state.data"
                        :label="state.label"
                        :descriptionLabel="state.descriptionLabel"
                        :dateLabel="state.dateLabel"
                        :amountLabel="state.amountLabel"
                        :showTransactions="state.showTransactions"
                        :showDate="state.showDate"
                    >
                        <IncomeTransactions #default="{transactions, descriptionLabel, dateLabel, amountLabel, showTransactions }">
                            <table v-if="showTransactions">
                                <thead>
                                    <tr>
                                        <th class="fb-income-transactions-date">{{ dateLabel }}</th>
                                        <th class="fb-income-transactions-desc">{{ descriptionLabel }}</th>
                                        <th class="fb-income-transactions-amount">{{ amountLabel }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(record, i) in transactions" :key="i">
                                        <td class="fb-income-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                        <td class="fb-income-transactions-desc">{{ record.description }}</td>
                                        <td class="fb-income-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </IncomeTransactions>
                    </IncomeRoot>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useTransactionData } from "@/../.histoire/modules/useClientData";
import IncomeRoot from '@/components/Advisor/Income/IncomeRoot';
import IncomeTransactions from '@/components/Advisor/Income/IncomeTransactions/IncomeTransactions';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(IncomeRoot, 'as'),
    data: useTransactionData().filter((record) => record.transaction_type === "Transfer"),
    label: defaultValue(IncomeRoot, 'label'),
    showTransactions: defaultValue(IncomeRoot, 'showTransactions'),
    showDate: defaultValue(IncomeRoot, 'showDate'),
    descriptionLabel: defaultValue(IncomeRoot, 'descriptionLabel'),
    dateLabel: defaultValue(IncomeRoot, 'dateLabel'),
    amountLabel: defaultValue(IncomeRoot, 'amountLabel'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>