<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Income/IncomeHero"
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
                        <IncomeHero />
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
                        <IncomeHero #default="{totalAmount, asOf, label, showDate }">
                            <h2>{{ label }} <span>{{ formatters.formatCurrency(totalAmount) }} </span></h2>
                            <span v-if="showDate">
                                As of: {{ formatters.formatDate(asOf) }}
                            </span>
                        </IncomeHero>
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
import IncomeHero from '@/components/Advisor/Income/IncomeHero/IncomeHero';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(IncomeRoot, 'as'),
    data: useTransactionData(),
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