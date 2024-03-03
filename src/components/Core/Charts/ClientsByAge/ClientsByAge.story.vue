<template>
    <Story
        title="Charts/ClientsByAge"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">
            <HstSelect v-model="state.type" title="type" :options="['doughnut','pie']" />                       
            <HstJson v-model="state.data" title="data" />
            <HstJson v-model="state.labels" title="labels" />
            <HstCheckbox v-model="state.showTotal" title="showTotal" />
            <HstText type="text" v-model="state.totalLabel" title="totalLabel" />
            <HstJson v-model="state.chartjsOptions" title="chartjsOptions" />
            <HstJson v-model="state.chartjsData" title="chartjsData" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientsByAge
                    :type="state.type"
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
                <ClientsByAge
                    :type="state.type"
                    :labels="state.labels"
                    :data="state.data"
                    :showTotal="state.showTotal"
                    :totalLabel="state.totalLabel"
                    :chartjsOptions="state.chartjsOptions"
                    :chartjsData="state.chartjsData"
                    #default="props"
                >
                    <h2>{{ props.totalClients }}</h2>
                    <h3>{{ props.totalLabel }}</h3>
                </ClientsByAge>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue';

const state = reactive({
    type: defaultValue(ClientsByAge, 'type'),
    labels: ['20-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100+'],
    data: [10, 15, 20, 23, 7, 3, 4, 0],
    showTotal: true,
    totalLabel: defaultValue(ClientsByAge, 'totalLabel'),
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