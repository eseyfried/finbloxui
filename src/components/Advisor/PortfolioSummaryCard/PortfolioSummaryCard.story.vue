<template>
    <Story
        title="Advisor/PortfolioSummary/PortfolioSummaryCard"
        auto-props-disabled
    >
         <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.currentValueLabel" title="currentValueLabel" />
            <PropDesc :component="PortfolioSummaryCard" prop="currentValueLabel" />
            <HstText type="text" v-model="state.cashLabel" title="cashLabel" />
            <PropDesc :component="PortfolioSummaryCard" prop="cashLabel" />
            <HstText type="text" v-model="state.securitiesLabel" title="securitiesLabel" />
            <PropDesc :component="PortfolioSummaryCard" prop="securitiesLabel" />
            <HstText type="text" v-model="state.changeLabel" title="changeLabel" />
            <PropDesc :component="PortfolioSummaryCard" prop="changeLabel" />
            <HstText type="text" v-model="state.currentValue" title="currentValue" />
            <PropDesc :component="PortfolioSummaryCard" prop="currentValue" />
            <HstText type="text" v-model="state.cashValue" title="cashValue" />
            <PropDesc :component="PortfolioSummaryCard" prop="cashValue" />
            <HstText type="text" v-model="state.securitiesValue" title="securitiesValue" />
            <PropDesc :component="PortfolioSummaryCard" prop="securitiesValue" />
            <HstText type="text" v-model="state.changeAmount" title="changeAmount" />
            <PropDesc :component="PortfolioSummaryCard" prop="changeAmount" />
            
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <PortfolioSummaryCard
                        :as="state.as"
                        :currentValueLabel="state.currentValueLabel"
                        :cashLabel="state.cashLabel"
                        :securitiesLabel="state.securitiesLabel"
                        :changeLabel="state.changeLabel"
                        :currentValue="state.currentValue"
                        :cashValue="state.cashValue"
                        :securitiesValue="state.securitiesValue"
                        :changeAmount="state.changeAmount"
                    />
                </div>
            </template>
        </Variant>
        <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <PortfolioSummaryCard
                        :as="state.as"
                        :currentValueLabel="state.currentValueLabel"
                        :cashLabel="state.cashLabel"
                        :securitiesLabel="state.securitiesLabel"
                        :changeLabel="state.changeLabel"
                        :currentValue="state.currentValue"
                        :cashValue="state.cashValue"
                        :securitiesValue="state.securitiesValue"
                        :changeAmount="state.changeAmount"
                        #default="{ props, currentValue, cashValue, securitiesValue, changeAmountPct, changeAmount, changeClasses}"
                    >
                    <table>
                        <tr>
                            <th>{{ props.currentValueLabel }}</th>
                            <td>{{ currentValue }}</td>
                        </tr>
                        <tr>
                            <th>{{ props.cashLabel }}</th>
                            <td>{{ cashValue }}</td>
                        </tr>
                        <tr>
                            <th>{{ props.securitiesLabel }}</th>
                            <td>{{ securitiesValue }}</td>
                        </tr>
                        <tr>
                            <th>{{ props.changeLabel }}</th>
                            <td :class="changeClasses">{{ changeAmount }} ({{ changeAmountPct }})</td>
                        </tr>
                    </table>
                    </PortfolioSummaryCard>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import PortfolioSummaryCard from '@/components/Advisor/PortfolioSummaryCard/PortfolioSummaryCard';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(PortfolioSummaryCard, 'as'),
    currentValueLabel: defaultValue(PortfolioSummaryCard, 'currentValueLabel'),
    cashLabel: defaultValue(PortfolioSummaryCard, 'cashLabel'),
    securitiesLabel: defaultValue(PortfolioSummaryCard, 'securitiesLabel'),
    changeLabel: defaultValue(PortfolioSummaryCard, 'changeLabel'),
    currentValue: 2913680.40,
    cashValue: 45000.40,
    securitiesValue: 2868680.40,
    changeAmount: 28686.804,
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>