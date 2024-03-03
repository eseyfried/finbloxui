<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Income/IncomeRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.data" title="data" />
            <PropDesc :component="IncomeRoot" prop="data" />
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.label" title="label" />
            <PropDesc :component="IncomeRoot" prop="label" />
            <HstText type="text" v-model="state.descriptionLabel" title="descriptionLabel" />
            <PropDesc :component="IncomeRoot" prop="descriptionLabel" />
            <HstText type="text" v-model="state.dateLabel" title="dateLabel" />
            <PropDesc :component="IncomeRoot" prop="dateLabel" />
            <HstText type="text" v-model="state.amountLabel" title="amountLabel" />
            <PropDesc :component="IncomeRoot" prop="amountLabel" />
            <HstCheckbox v-model="state.showTransactions" title="showTransactions" />
            <PropDesc :component="IncomeRoot" prop="showTransactions" />
            <HstCheckbox v-model="state.showDate" title="showDate" />
            <PropDesc :component="IncomeRoot" prop="showDate" />
        </template>

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
                    />
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
                        #default="{label, data, showTransactions, showDate, descriptionLabel, dateLabel, amountLabel}"
                    >
                        <IncomeHero />
                        <table v-if="showTransactions">
                            <thead>
                                <tr>
                                    <th class="fb-income-transactions-date">{{ dateLabel }}</th>
                                    <th class="fb-income-transactions-desc">{{ descriptionLabel }}</th>
                                    <th class="fb-income-transactions-amount">{{ amountLabel }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, i) in data" :key="i">
                                    <td class="fb-income-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                    <td class="fb-income-transactions-desc">{{ record.description }}</td>
                                    <td class="fb-income-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                </tr>
                            </tbody>
                        </table>
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
import PropDesc from '@/../.histoire/components/PropDesc';
import IncomeRoot from '@/components/Advisor/Income/IncomeRoot';
import IncomeHero from '@/components/Advisor/Income/IncomeHero/IncomeHero';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(IncomeRoot, 'as'),
    data: useTransactionData().filter((record) => record.transaction_type === "Income"),
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