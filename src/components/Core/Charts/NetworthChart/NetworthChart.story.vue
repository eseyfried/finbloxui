<template>
    <Story
        title="Charts/NetworthChart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">        
            <HstText type="text" v-model="state.label" title="label" />
            <HstText type="text" v-model="state.monthLabel" title="monthLabel" />
            <HstText type="text" v-model="state.sinceLabel" title="sinceLabel" />
            <HstJson v-model="state.data" title="data" />
            <HstJson v-model="state.dates" title="dates" />
            <HstText type="text" v-model="state.areaColor" title="areaColor" />
            <HstJson v-model="state.chartjsOptions" title="chartjsOptions" />
            <HstJson v-model="state.chartjsData" title="chartjsData" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <NetworthChart
                    :label="state.label"
                    :monthLabel="state.monthLabel"
                    :sinceLabel="state.sinceLabel"
                    :data="state.data"
                    :dates="state.dates"
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
                <NetworthChart
                    :label="state.label"
                    :monthLabel="state.monthLabel"
                    :sinceLabel="state.sinceLabel"
                    :data="state.data"
                    :dates="state.dates"
                    :areaColor="state.areaColor"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                >

                    <template #hero="props">
                        <h2>{{ props.currentValue }}</h2>
                        <h4>{{ props.props.label }} <span>as of {{ props.asOf }}</span></h4>
                    </template>
                    <template #month="props">
                        <div class="fb-networth-chart-month-change" :class="props.changeClasses">
                            <span>{{ props.monthChangeAmount }}</span>
                            <span>({{ props.monthChangePercent }})</span>
                        </div>
                        <h4>{{ props.props.monthLabel }}</h4>
                    </template>
                    <template #year="props">
                        <div class="fb-networth-chart-year-change" :class="props.changeClasses">
                            <span>{{ props.yearChangeAmount }}</span>
                            <span>({{ props.yearChangePercent }})</span>
                        </div>
                        <h4>{{ props.props.sinceLabel }} {{ formatDate(props.sinceDate) }}</h4>
                    </template>
                </NetworthChart>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import NetworthChart from '@/components/Core/Charts/NetworthChart/NetworthChart.vue';

import moment from "moment";
import { useHistoricalBalances } from "@/../.histoire/modules/useClientData";
const historicalBalances = useHistoricalBalances()
const state = reactive({
    label: defaultValue(NetworthChart, 'label'),
    monthLabel: defaultValue(NetworthChart, 'monthLabel'),
    sinceLabel: defaultValue(NetworthChart, 'sinceLabel'),
    lineColor: defaultValue(NetworthChart, 'lineColor'),
    areaColor: defaultValue(NetworthChart, 'areaColor'),
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
const formatDate = (date) => moment(date, "YYYY-MM-DD").utc().format("MMM YYYY")
</script>