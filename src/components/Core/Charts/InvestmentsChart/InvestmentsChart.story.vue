<template>
    <Story
        title="Charts/InvestmentsChart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">        
            <HstText type="text" v-model="state.label" title="label" />
            <HstText type="text" v-model="state.changeAmountLabel" title="changeAmountLabel" />
            <HstText type="text" v-model="state.changePercentLabel" title="changePercentLabel" />
            <HstJson v-model="state.data" title="data" />
            <HstJson v-model="state.dates" title="dates" />
            <HstText type="text" v-model="state.lineColor" title="lineColor" />
            <HstText type="text" v-model="state.areaColor" title="areaColor" />
            <HstJson v-model="state.chartjsOptions" title="chartjsOptions" />
            <HstJson v-model="state.chartjsData" title="chartjsData" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <InvestmentsChart
                    :label="state.label"
                    :changeAmountLabel="state.changeAmountLabel"
                    :changePercentLabel="state.changePercentLabel"
                    :data="state.data"
                    :dates="state.dates"
                    :lineColor="state.lineColor"
                    :totalLabel="state.totalLabel"
                    :areaColor="state.areaColor"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                />
            </template>
        </Variant>

        <Variant
            title="Custom Layout Using Slot Props"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <InvestmentsChart
                    :label="state.label"
                    :changeAmountLabel="state.changeAmountLabel"
                    :changePercentLabel="state.changePercentLabel"
                    :data="state.data"
                    :dates="state.dates"
                    :lineColor="state.lineColor"
                    :areaColor="state.areaColor"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                >

                    <template #hero="props">
                        <h2>{{ props.currentValue }}</h2>
                        <h4>{{ props.props.label }} <span>as of {{ props.asOf }}</span></h4>
                    </template>
                    <template #changeAmount="props">
                        <div :class="props.changeClasses">
                            <span>{{ props.changeAmount }}</span>
                        </div>
                        <h4>{{ props.props.changeAmountLabel }}</h4>
                    </template>
                    <template #changePercent="props">
                        <div :class="props.changeClasses">
                            <span>{{ props.changePercent }}</span>
                        </div>
                        <h4>{{ props.props.changePercentLabel }}</h4>
                    </template>
                </InvestmentsChart>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import InvestmentsChart from '@/components/Core/Charts/InvestmentsChart/InvestmentsChart.vue';

import moment from "moment";
import { useHistoricalBalances } from "@/../.histoire/modules/useClientData";
const historicalBalances = useHistoricalBalances()

const state = reactive({
    label: defaultValue(InvestmentsChart, 'label'),
    changeAmountLabel: defaultValue(InvestmentsChart, 'changeAmountLabel'),
    changePercentLabel: defaultValue(InvestmentsChart, 'changePercentLabel'),
    lineColor: defaultValue(InvestmentsChart, 'lineColor'),
    areaColor: defaultValue(InvestmentsChart, 'areaColor'),
    data: historicalBalances,
    dates: Array.from({length: historicalBalances.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD")),
    chartjsOptions: {},
    chartjsData: {},
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
</script>