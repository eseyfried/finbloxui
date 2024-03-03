<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Fees/FeesRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.data" title="data" />
            <PropDesc :component="FeesRoot" prop="data" />
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.label" title="label" />
            <PropDesc :component="FeesRoot" prop="label" />
            <HstText type="text" v-model="state.descriptionLabel" title="descriptionLabel" />
            <PropDesc :component="FeesRoot" prop="descriptionLabel" />
            <HstText type="text" v-model="state.dateLabel" title="dateLabel" />
            <PropDesc :component="FeesRoot" prop="dateLabel" />
            <HstText type="text" v-model="state.amountLabel" title="amountLabel" />
            <PropDesc :component="FeesRoot" prop="amountLabel" />
            <HstCheckbox v-model="state.showTransactions" title="showTransactions" />
            <PropDesc :component="FeesRoot" prop="showTransactions" />
            <HstCheckbox v-model="state.showDate" title="showDate" />
            <PropDesc :component="FeesRoot" prop="showDate" />
        </template>

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
                    />
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
                        #default="{label, data, showTransactions, showDate, descriptionLabel, dateLabel, amountLabel}"
                    >
                        <FeesHero />
                        <table v-if="showTransactions">
                            <thead>
                                <tr>
                                    <th class="fb-fees-transactions-date">{{ dateLabel }}</th>
                                    <th class="fb-fees-transactions-desc">{{ descriptionLabel }}</th>
                                    <th class="fb-fees-transactions-amount">{{ amountLabel }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, i) in data" :key="i">
                                    <td class="fb-fees-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                                    <td class="fb-fees-transactions-desc">{{ record.description }}</td>
                                    <td class="fb-fees-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                                </tr>
                            </tbody>
                        </table>
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
import PropDesc from '@/../.histoire/components/PropDesc';
import FeesRoot from '@/components/Advisor/Fees/FeesRoot';
import FeesHero from '@/components/Advisor/Fees/FeesHero/FeesHero';
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