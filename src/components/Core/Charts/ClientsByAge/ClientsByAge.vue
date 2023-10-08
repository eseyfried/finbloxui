<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-clients-by-age-chart">
        <div class="chart">
            <Chart
                :id="id"
                :type="type"
                :data="chartData"
                :options="chartOptions"
                :plugins="[htmlLegendPlugin]"
                :colors="colors"
            />
            <div class="fb-clients-by-age-chart-hero" v-if="type === 'doughnut'">
                <slot :props="props" :totalLabel="totalLabel" :totalClients="totalClients">
                    <h2>{{ totalLabel }}</h2>
                    <h3>{{ totalClients }}</h3>
                </slot>
            </div>
        </div>
        <div :id="`legend-container-${component.uid}`" class="fb-chart-legend" :class="{ 'fb-chart-legend-stacked' : isMobile }"></div>
    </div>
</template>
<script setup>
// imports
import { getCurrentInstance, computed } from "vue";
import { isMobile } from "@/modules/useResponsive";
import { arraySum } from "@/modules/useArrayUtils";
import * as base from "@/modules/usePieChartBase";
import Chart from "@/components/Core/Charts/Chart";
import { htmlLegendPlugin } from "@/modules/useChartLegend"

// vars
const component = getCurrentInstance();
const id = `fb-clients-by-age-chart-${component.uid}`;
const numGridCol = isMobile.value ? 1 : 2;

// eslint-disable-next-line no-unused-vars
const props = defineProps(
    computed(() => base.useProps({
        totalLabel: {
            type: String,
            default: "Clients"
        }
    })).value
);

const chartData = computed(() => base.chartData(props));
const defaultOptions = {}
const chartOptions = computed(() => base.chartOptions(props, component.uid, defaultOptions)).value;
const totalClients = computed(() => arraySum(props.data));
</script>
<style lang="scss" scoped>
@import "../../../../scss/fb-chart-legend.scss";
.fb-clients-by-age-chart {
    display: grid;
    grid-template-columns: repeat(v-bind(numGridCol), minmax(0, 1fr));
    .chart {
        position: relative;
    }
}
.fb-clients-by-age-chart-hero {
    text-align: center;
    position: absolute;
    top: 30%;
    width:100%;
}
</style>