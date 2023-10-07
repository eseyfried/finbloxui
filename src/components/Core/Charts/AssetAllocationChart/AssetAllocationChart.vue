<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-asset-allocation-chart">
        <p v-if="dataTotals100Percent === false">Data values must total 100% when using percent format.</p>
        <Chart
            v-if="(allocations.length > 0 && assetCategories.length > 0)"
            :id="id"
            :type="type"
            :data="chartData"
            :options="chartOptions"
            :plugins="[htmlLegendPlugin]"
            :colors="colors"
        />
       
        <div class="fb-asset-allocation-chart-hero" v-if="showTotal">
            <slot :props="props" :totalLabel="totalLabel" :totalAmount="formatters.formatCurrency(totalAmount)">
                <h2>{{ totalLabel }}</h2>
                <h3>{{ formatters.formatCurrency(totalAmount) }}</h3>
            </slot>
        </div>
        <div :id="`legend-container-${component.uid}`" class="fb-chart-legend fb-chart-legend-stacked"></div>
    </div>
</template>

<script setup>
// imports
import Chart from "@/components/Core/Charts/Chart";
import ChartJS from 'chart.js/auto';
import { computed, getCurrentInstance, watch } from "vue";
import * as formatters from "@/modules/useFormatter";
import { sortBy } from "lodash";
import { htmlLegendPlugin } from "@/modules/useChartLegend"


// vars
const component = getCurrentInstance();

const id = `fb-asset-allocation-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "doughnut",
        validator: (value) => ["doughnut", "pie"].includes(value),
    },
    assetCategories: {
        type: Array,
        default: () => [],
    },
    format: {
        type: String,
        default: "percent",
        validator: (value) => ["percent", "currency"].includes(value)
    },
    allocations: {
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
    showTotal: {
        type: Boolean,
        default: true
    },
    totalLabel: {
        type: String,
        default: "Total Value"
    },
    totalAmount: {
        type: String,
        default: "0.00"
    }
});

const formatValue = computed(() => {
    return (value) => {
        let formattedValue;
        if (props.format == "percent") {
            formattedValue = formatters.formatPercent(value);
        } else if (props.format == "currency") {
            formattedValue = formatters.formatCurrency(value);
        }
        return formattedValue;
    }
});



const defaultChartData = computed(() => {
    return {
        labels: props.assetCategories,
        datasets: [{
            data: props.allocations
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
                        componentID: component.uid,
                        callback: formatValue.value
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const format = props.format;
                                if (format === "percent") {
                                    return formatters.formatPercent(context.parsed);
                                } else if (format === "currency") {
                                    return formatters.formatCurrency(context.parsed);
                                }
                            }
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

const dataTotals100Percent = computed(() => {
    if(props.format === "percent") {
        return props.allocations.reduce((partialSum, a) => partialSum + a, 0) === 100;
    }
    return null;
})


/**
 * The chart legend plugin does not re-render
 * when format prop updates.
 */
watch(() => [props.format], () => {
   const chart = ChartJS.getChart(id);
   if(chart) {
    chart.update();
   }
}, { immediate: true })


</script>
<style lang="scss" scoped>
@import "../../../../scss/fb-chart-legend.scss";
.fb-asset-allocation-chart {
    position: relative;
}
.fb-asset-allocation-chart-hero {
    text-align: center;
    position: absolute;
    top: 25%;
    width:100%;
}

</style>