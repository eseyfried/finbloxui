<template>
    <Story
        title="Charts/AccountsHeldawayByAccountType"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">
            <HstSelect v-model="state.type" title="type" :options="['doughnut','pie']" />            
            <HstText type="text" v-model="state.totalLabel" title="totalLabel" />
            <HstText type="text" v-model="state.totalValue" title="totalValue" />
            <HstJson v-model="state.data" title="data" />
            <HstJson v-model="state.labels" title="labels" />
            <HstJson v-model="state.chartjsOptions" title="chartjsOptions" />
            <HstJson v-model="state.chartjsData" title="chartjsData" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <AccountsHeldawayByAccountType
                    :type="state.type"
                    :labels="state.labels"
                    :data="state.data"
                    :totalLabel="state.totalLabel"
                    :totalValue="state.totalValue"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                    :key="componentKey"
                />
            </template>
        </Variant>
        <Variant
            title="Custom Layout Using Slot Props"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <AccountsHeldawayByAccountType
                    :type="state.type"
                    :labels="state.labels"
                    :data="state.data"
                    :totalLabel="state.totalLabel"
                    :totalValue="state.totalValue"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                    :key="componentKey"
                    #default="props"
                >
                    <h2>{{ props.totalValue }}</h2>
                    <h3>{{ props.totalLabel }}</h3>
                </AccountsHeldawayByAccountType>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { registerSwitchCallback, componentKey, forceUpdate } from "@/../.histoire/components/ThemeSwitcher"
import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue';
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';

registerSwitchCallback(forceUpdate)

const state = reactive({
    type: "doughnut",
    labels: ['Retirement', 'Annuity', 'Taxable', 'Trust'],
    data: [10, 15, 20, 23,],
    totalLabel: defaultValue(AccountsHeldawayByAccountType, 'totalLabel'),
    totalValue: "$10M",
    chartjsOptions: {
        elements: {
            arc: {
                backgroundColor: geChartColorsByTheme('headless')
            }
        }
    },
    chartjsData: {},
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>