<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Withdrawals/WithdrawalsHero"
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
                        <WithdrawalsHero />
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
                        <WithdrawalsHero #default="{totalAmount, asOf, label, showDate }">
                            <h2>{{ label }} <span>{{ formatters.formatCurrency(totalAmount) }} </span></h2>
                            <span v-if="showDate">
                                As of: {{ formatters.formatDate(asOf) }}
                            </span>
                        </WithdrawalsHero>
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
import WithdrawalsHero from '@/components/Advisor/Withdrawals/WithdrawalsHero/WithdrawalsHero';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(WithdrawalsRoot, 'as'),
    data: useTransactionData(),
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