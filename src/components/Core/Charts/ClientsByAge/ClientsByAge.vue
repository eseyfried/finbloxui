<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-clients-by-age">
        <div class="chart">
            <Chart
                :id="id"
                :type="type"
                :data="chartData"
                :options="chartOptions"
                :plugins="[htmlLegendPlugin]"
                :colors="colors"
            />
            <div class="fb-clients-by-age-hero" v-if="type === 'doughnut'">
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
import { computed, getCurrentInstance } from "vue";
import { isMobile } from "@/modules/useResponsive";
import { arraySum } from "@/modules/useArrayUtils";
import Chart from "@/components/Core/Charts/Chart";
import { htmlLegendPlugin } from "@/modules/useChartLegend"

// vars
const component = getCurrentInstance();
const id = `fb-clients-by-age-${component.uid}`;
const numGridCol = isMobile.value ? 1 : 2;

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    type: {
        type: String,
        default: "doughnut",
        validator: (value) => ["doughnut", "pie"].includes(value),
    },
    ageGroups: {
        type: Array,
        default: () => [],
    },
    data: {
        type: Array,
        default: () => [],
    },
    chartjsData: {
        type: Object,
        default: () => {},
    },
    chartjsOptions: {
        type: Object,
        default: () => {},
    },
    colors: {
        type: Array,
        default: () => []
    },
    totalLabel: {
        type: String,
        default: "Clients"
    }
});

const defaultChartData = computed(() => {
    return {
        labels: props.ageGroups,
        datasets: [{
            data: props.data
        }],
    }
});

/**
 * merge chartjs prop options with default options
 */
const chartOptions = computed(() => {
    let cutout = props.chartjsOptions?.cutout ? props.chartjsOptions.cutout : "80%";
    if (props.type === "pie") {
        cutout = 0;
    }
    return {
        ...props.chartjsOptions,
        ...{
                maintainAspectRatio: false,
                cutout: cutout,
                plugins: {
                    htmlLegend: {
                        // ID of the container to put the legend in
                        containerID: "legend-container",
                        componentID: component.uid
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                        }
                    }
                }
            }
    }
});

const chartData = computed(() => {
    return {
        ...props.chartjsData,
        ...defaultChartData.value
    }
});

const totalClients = arraySum(props.data);

</script>
<style lang="scss" scoped>
@import "../../../../scss/fb-chart-legend.scss";
.fb-clients-by-age {
    display: grid;
    grid-template-columns: repeat(v-bind(numGridCol), minmax(0, 1fr));
    .chart {
        position: relative;
    }
}
.fb-clients-by-age-hero {
    text-align: center;
    position: absolute;
    top: 30%;
    width:100%;
}
</style>