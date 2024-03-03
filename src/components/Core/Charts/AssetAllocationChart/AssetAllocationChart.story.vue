<template>
    <Story
        title="Charts/AssetAllocationChart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">
            <HstSelect v-model="state.type" title="type" :options="['doughnut','pie']" />            
            <HstSelect v-model="state.format" title="format" :options="['currency','percent']" />            
            <HstJson v-model="state.data" title="data" />
            <HstJson v-model="state.labels" title="labels" />
            <HstCheckbox v-model="state.showTotal" title="showTotal" />
            <HstText type="text" v-model="state.totalLabel" title="totalLabel" />
            <HstText type="text" v-model="state.totalAmount" title="totalAmount" />
            <HstJson v-model="state.chartjsOptions" title="chartjsOptions" />
            <HstJson v-model="state.chartjsData" title="chartjsData" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <AssetAllocationChart
                    :type="state.type"
                    :format="state.format"
                    :labels="state.labels"
                    :data="state.data"
                    :showTotal="state.showTotal"
                    :totalLabel="state.totalLabel"
                    :totalAmount="state.totalAmount"
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
                <AssetAllocationChart
                    :type="state.type"
                    :format="state.format"
                    :labels="state.labels"
                    :data="state.data"
                    :showTotal="state.showTotal"
                    :totalLabel="state.totalLabel"
                    :totalAmount="state.totalAmount"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                    #default="props"
                >
                    <h2>{{ props.totalAmount }}</h2>
                    <h3>{{ props.totalLabel }}</h3>
                </AssetAllocationChart>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue';

const state = reactive({
    type: defaultValue(AssetAllocationChart, 'type'),
    format: defaultValue(AssetAllocationChart, 'format'),
    labels: ['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash'],
    data: [45, 15, 20, 0, 20],
    showTotal: true,
    totalLabel: "Total Value",
    totalAmount: "134782.99",
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