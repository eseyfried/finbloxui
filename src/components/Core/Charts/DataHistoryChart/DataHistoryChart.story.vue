<template>
    <Story
        title="Charts/DataHistoryChart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">        
            <HstText type="text" v-model="state.label" title="label" />
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
                <DataHistoryChart
                    :label="state.label"
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
                <DataHistoryChart
                    :label="state.label"
                    :data="state.data"
                    :dates="state.dates"
                    :lineColor="state.lineColor"
                    :areaColor="state.areaColor"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                    #default="props"
                >
                    <h2>{{ props.currentValue }}</h2>
                    <h3>{{ props.label }}</h3>
                    <div class="fb-data-history-chart-change" :class="props.changeClasses">
                        <span>{{ props.changeAmount }}</span>
                        <span>{{ props.changePercent }}</span>
                    </div>
                    <span class="fb-data-history-chart-date">As of: {{ props.asOf }}</span>
                </DataHistoryChart>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import DataHistoryChart from '@/components/Core/Charts/DataHistoryChart/DataHistoryChart.vue';

import moment from "moment";
import { useHistoricalBalances } from "@/../.histoire/modules/useClientData";
const historicalBalances = useHistoricalBalances()

const state = reactive({
    label: defaultValue(DataHistoryChart, 'label'),
    lineColor: defaultValue(DataHistoryChart, 'lineColor'),
    areaColor: defaultValue(DataHistoryChart, 'areaColor'),
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