<template>
    <Story
        title="Charts/TotalFeesChart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">        
            <HstText type="text" v-model="state.label" title="label" />
            <HstJson v-model="state.data" title="data" />
            <HstJson v-model="state.dates" title="dates" />
            <HstText type="text" v-model="state.barColor" title="barColor" />
            <HstJson v-model="state.chartjsOptions" title="chartjsOptions" />
            <HstJson v-model="state.chartjsData" title="chartjsData" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <TotalFeesChart
                    :label="state.label"
                    :data="state.data"
                    :dates="state.dates"
                    :barColor="state.barColor"
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
                <TotalFeesChart
                    :label="state.label"
                    :data="state.data"
                    :dates="state.dates"
                    :barColor="state.barColor"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                >

                    <template #hero="props">
                        <h2>{{ props.currentValue }}</h2>
                        <h4>{{ props.props.label }} <span>as of {{ props.asOf }}</span></h4>
                    </template>
                </TotalFeesChart>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import TotalFeesChart from '@/components/Core/Charts/TotalFeesChart/TotalFeesChart.vue';

import moment from "moment";
import { useMonthlyFees } from "@/../.histoire/modules/useClientData";

const monthlyFees = useMonthlyFees()

const state = reactive({
    label: defaultValue(TotalFeesChart, 'label'),
    barColor: defaultValue(TotalFeesChart, 'barColor'),
    data: monthlyFees,
    dates: Array.from({length: monthlyFees.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD")),
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