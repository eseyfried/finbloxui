<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Deposits/DepositsRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.data" title="data" />
            <PropDesc :component="DepositsRoot" prop="data" />
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.label" title="label" />
            <PropDesc :component="DepositsRoot" prop="label" />
            <HstText type="text" v-model="state.descriptionLabel" title="descriptionLabel" />
            <PropDesc :component="DepositsRoot" prop="descriptionLabel" />
            <HstText type="text" v-model="state.dateLabel" title="dateLabel" />
            <PropDesc :component="DepositsRoot" prop="dateLabel" />
            <HstText type="text" v-model="state.amountLabel" title="amountLabel" />
            <PropDesc :component="DepositsRoot" prop="amountLabel" />
            <HstCheckbox v-model="state.showTransactions" title="showTransactions" />
            <PropDesc :component="DepositsRoot" prop="showTransactions" />
            <HstCheckbox v-model="state.showDate" title="showDate" />
            <PropDesc :component="DepositsRoot" prop="showDate" />
        </template>

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
                    />
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
                        #default="{label, data, showTransactions, showDate, descriptionLabel, dateLabel, amountLabel}"
                    >
                        <DepositsHero />
                        <table v-if="showTransactions">
                            <thead>
                                <tr>
                                    <th class="fb-deposits-transactions-date">{{ dateLabel }}</th>
                                    <th class="fb-deposits-transactions-desc">{{ descriptionLabel }}</th>
                                    <th class="fb-deposits-transactions-amount">{{ amountLabel }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, i) in data" :key="i">
                                    <td class="fb-deposits-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                    <td class="fb-deposits-transactions-desc">{{ record.description }}</td>
                                    <td class="fb-deposits-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                </tr>
                            </tbody>
                        </table>
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
import PropDesc from '@/../.histoire/components/PropDesc';

import DepositsHero from "@/components/Advisor/Deposits/DepositsHero/DepositsHero.vue"
import DepositsRoot from "@/components/Advisor/Deposits/DepositsRoot"
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