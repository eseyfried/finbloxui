<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
    <Header brandName="OneLeaf Financial" />
    <div class="page">
        <div class="grid grid-cols-[200px_auto] gap-4">
            <div>
                <Menu />
            </div>
            <div>
                <h1 class="mb-5">Dashboard</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                    <div class="icon aum fb-data-point-icon">
                        <DataPoint :class="dataPointClasses" :dataPoint="{ label: 'YTD AUM', value: aum, format: 'currency', trend: { direction: 'up', value: '14504.32', format: 'currency'}}" />
                    </div>
                    <div class="fees">
                        <DataPoint :class="dataPointClasses" :dataPoint="{ label: 'YTD Fees', value: aum * .125, format: 'currency', trend: { direction: 'down', value: '1504.32', format: 'currency'}}" />
                    </div>
                    <div class="clients">
                        <DataPoint :class="dataPointClasses" :dataPoint="{ label: 'Total Clients', value: clients.length, format: null, trend: {} }" />
                    </div>
                </div>
                <div class="grid grid-cols-1 mb-5">
                    <TotalAUMChart :data="totalAUMData" :dates="totalAUMDates" :lineColor="lineColor" :areaColor="areaColor" />
                </div>
                <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <h2>Target Allocation</h2>
                        <AssetAllocationChart
                            :labels="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
                            :data="[40, 10, 35, 10, 5]"
                            :colors="chartColors"
                        />
                    </div>
                    <div>
                        <h2>Actual Allocation</h2>
                        <AssetAllocationChart
                            :labels="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
                            :data="[40, 10, 35, 10, 5]"
                            :colors="chartColors"
                        />
                    </div>
                </div> -->
                <!-- <div class="grid grid-cols-2 gap-4 mb-5">
                    <div>
                        <h2>Clients</h2>
                        <ClientList
                            :clients="clients"
                            :clientListItemOptions="{ detailsLinkLabel: '' }"
                            @fb-client-list-details-link:click="handleClientDetailsClick($event)"
                        />
                    </div>
                    <div>
                        <ClientCard :client="activeClient" v-if="activeClient" />
                    </div>
                </div> -->
            </div>
        </div>
    </div>
    </div>
</template>
<script setup>
import moment from "moment";
import Header from '@/stories/Examples/Header.vue';
import Menu from '@/stories/Examples/Menu.vue';
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { rgbToHex } from '@/stories/Examples/modules/colorUtil';
import ClientList from "@/components/Advisor/Clients/ClientList";
import ClientCard from "@/components/Advisor/Clients/ClientCard";
import DataPoint from "@/components/Core/DataPoint";
import AssetAllocationChart from "@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart";
import TotalAUMChart from "@/components/Core/Charts/TotalAUMChart/TotalAUMChart";


// eslint-disable-next-line no-unused-vars
const props = defineProps({
    theme: {
        type: String,
        default: null,
    }
});

const { accounts, clients, positions } = storeToRefs(useDemoStore());

const activeClient = ref();

const chartColors = computed(() => {
    return [...geChartColorsByTheme(props.theme)];
})

const lineColor = computed(() => chartColors.value[2]);
const areaColor = computed( () => {
    const color = chartColors.value[2];
    const alpha = 80;
    let areaColor;
    if(color.indexOf("#") != -1) {
        areaColor = `${color}`
    } else {
        let rgbStr = color.replace("rgb(", "").replace(")", "").replaceAll(" ",",");
        let rgb = rgbStr.split(",");
        areaColor = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])); 
    }
    return `${areaColor}${alpha}`;
});
// totalAUMChart data
const totalAUMDates = ref();
const totalAUMData = ref();
const { dailyAUM } = storeToRefs(useDemoStore());

totalAUMDates.value = Array.from({length: dailyAUM.value.length}, (_, i) => moment.utc().dayOfYear(i+1).format("YYYY-MM-DD"));
totalAUMData.value = dailyAUM.value;
const aum = totalAUMData.value[totalAUMData.value.length - 1];

const dataPointClasses = computed( () => {
    return props.theme != "headless" ? ["data-point-card"] : [];
});

// methods
const handleClientDetailsClick = (client) => {
    console.log(client)
    activeClient.value = client;

}
</script>
<style lang="scss" scoped>
.page {
    margin: 2rem;
}
.page > h1 {
    margin-top: 4rem;
    border-bottom: 1px solid #eeeeee;
}
.data-point-card {
    background-color: var(--example-data-point-background);
    @apply rounded text-white drop-shadow-md;
}
</style>