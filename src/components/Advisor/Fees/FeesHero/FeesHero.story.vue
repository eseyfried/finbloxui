<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Advisor/Fees/FeesHero"
        auto-props-disabled
    >

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
                    >
                        <FeesHero />
                    </FeesRoot>
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
                    >
                        <FeesHero #default="{totalAmount, asOf, label, showDate }">
                            <h2>{{ label }} <span>{{ formatters.formatCurrency(totalAmount) }} </span></h2>
                            <span v-if="showDate">
                                As of: {{ formatters.formatDate(asOf) }}
                            </span>
                        </FeesHero>
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
import FeesRoot from '@/components/Advisor/Fees/FeesRoot';
import FeesHero from '@/components/Advisor/Fees/FeesHero/FeesHero';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(FeesRoot, 'as'),
    data: useTransactionData(),
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