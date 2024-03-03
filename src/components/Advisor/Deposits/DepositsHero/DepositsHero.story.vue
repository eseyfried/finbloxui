<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Deposits/DepositsHero"
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
                        <DepositsHero />
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
                        <DepositsHero #default="{totalAmount, asOf, label, showDate }">
                            <h2>{{ label }} <span>{{ formatters.formatCurrency(totalAmount) }} </span></h2>
                            <span v-if="showDate">
                                As of: {{ formatters.formatDate(asOf) }}
                            </span>
                        </DepositsHero>
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
import DepositsHero from '@/components/Advisor/Deposits/DepositsHero/DepositsHero';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(DepositsRoot, 'as'),
    data: useTransactionData(),
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