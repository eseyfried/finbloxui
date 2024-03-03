<template>
    <Story
        title="Charts/TotalAUMChart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">        
            <HstSelect type="text" v-model="state.defaultTimePeriod" title="defaultTimePeriod" :options="['daily', 'monthly', 'quaterly']" />
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
                <TotalAUMChart
                    :label="state.label"
                    :defaultTimePeriod="state.defaultTimePeriod"
                    :data="state.data"
                    :dates="state.dates"
                    :areaColor="state.areaColor"
                    :lineColor="state.lineColor"
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
                <TotalAUMChart
                    :label="state.label"
                    :defaultTimePeriod="state.defaultTimePeriod"
                    :data="state.data"
                    :dates="state.dates"
                    :areaColor="state.areaColor"
                    :lineColor="state.lineColor"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                >

                    <template #hero="props">
                        <h2>{{ props.currentValue }}</h2>
                        <h4>{{ props.props.label }} <span>as of {{ props.asOf }}</span></h4>
                    </template>
                </TotalAUMChart>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import TotalAUMChart from '@/components/Core/Charts/TotalAUMChart/TotalAUMChart.vue';

import moment from "moment";
import { useDailyAUM } from "@/../.histoire/modules/useClientData";

const dailyAUM = useDailyAUM()


const state = reactive({
    label: defaultValue(TotalAUMChart, 'label'),
    defaultTimePeriod: defaultValue(TotalAUMChart, 'defaultTimePeriod'),
    lineColor: defaultValue(TotalAUMChart, 'lineColor'),
    areaColor: defaultValue(TotalAUMChart, 'areaColor'),
    data: dailyAUM,
    dates: Array.from({length: dailyAUM.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD")),
    chartjsOptions: {},
    chartjsData: {},
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
const formatDate = (date) => moment.utc(date).format("MMMM YYYY")
</script>