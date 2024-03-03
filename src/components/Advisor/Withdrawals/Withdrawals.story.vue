<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Withdrawals/WithdrawalsRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.data" title="data" />
            <PropDesc :component="WithdrawalsRoot" prop="data" />
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.label" title="label" />
            <PropDesc :component="WithdrawalsRoot" prop="label" />
            <HstText type="text" v-model="state.descriptionLabel" title="descriptionLabel" />
            <PropDesc :component="WithdrawalsRoot" prop="descriptionLabel" />
            <HstText type="text" v-model="state.dateLabel" title="dateLabel" />
            <PropDesc :component="WithdrawalsRoot" prop="dateLabel" />
            <HstText type="text" v-model="state.amountLabel" title="amountLabel" />
            <PropDesc :component="WithdrawalsRoot" prop="amountLabel" />
            <HstCheckbox v-model="state.showTransactions" title="showTransactions" />
            <PropDesc :component="WithdrawalsRoot" prop="showTransactions" />
            <HstCheckbox v-model="state.showDate" title="showDate" />
            <PropDesc :component="WithdrawalsRoot" prop="showDate" />
        </template>

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
                    />
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
                        #default="{label, data, showTransactions, showDate, descriptionLabel, dateLabel, amountLabel}"
                    >
                        <WithdrawalsHero />
                        <table v-if="showTransactions">
                            <thead>
                                <tr>
                                    <th class="fb-withdrawals-transactions-date">{{ dateLabel }}</th>
                                    <th class="fb-withdrawals-transactions-desc">{{ descriptionLabel }}</th>
                                    <th class="fb-withdrawals-transactions-amount">{{ amountLabel }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, i) in data" :key="i">
                                    <td class="fb-withdrawals-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                    <td class="fb-withdrawals-transactions-desc">{{ record.description }}</td>
                                    <td class="fb-withdrawals-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                </tr>
                            </tbody>
                        </table>
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
import PropDesc from '@/../.histoire/components/PropDesc';
import WithdrawalsRoot from '@/components/Advisor/Withdrawals/WithdrawalsRoot';
import WithdrawalsHero from '@/components/Advisor/Withdrawals/WithdrawalsHero/WithdrawalsHero';
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