<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-asset-allocation-chart" :class="componentClasses.getClassByType('component')">
        <div>
            <p v-if="dataTotals100Percent === false">Data values must total 100% when using percent format.</p>
            <Chart
                v-if="(data.length > 0 && labels.length > 0)"
                :id="id"
                :type="type"
                :data="chartData"
                :options="chartOptions"
                :plugins="[htmlLegendPlugin]"
                :colors="colors"
            />
            <div
                class="fb-asset-allocation-chart-hero"
                :class="componentClasses.getClassByType('chartHero')"
                v-if="showTotal && type ==='doughnut'"
            >
                <slot :props="props" :totalLabel="totalLabel" :totalAmount="formatters.formatCurrency(totalAmount)">
                    <h2>{{ totalLabel }}</h2>
                    <h3>{{ formatters.formatCurrency(totalAmount) }}</h3>
                </slot>
            </div>
        </div>
        <div
            :id="`legend-container-${component.uid}`"
            :class="[isMobile ? componentClasses.getClassByType('chartLegendStacked') : null, componentClasses.getClassByType('chartLegend')]"
        ></div>
    </div>
</template>

<script setup>
// imports
import * as componentClasses from "@/modules/useCommonCSS";
import Chart from "@/components/Core/Charts/Chart";
import ChartJS from 'chart.js/auto';
import { isMobile } from "@/modules/useResponsive";
import { computed, getCurrentInstance, watch, reactive } from "vue";
import * as formatters from "@/modules/useFormatter";
import * as base from "@/modules/usePieChartBase";
import { htmlLegendPlugin } from "@/modules/useChartLegend"


// vars
const component = getCurrentInstance();
const numGridCol = isMobile.value ? 1 : 2;
const id = `fb-asset-allocation-chart-${component.uid}`;

const props = defineProps(
    computed(() => base.useProps({
        format: {
            type: String,
            default: "percent",
            validator: (value) => ["percent", "currency"].includes(value)
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
    })).value
);

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

const chartData = computed(() => base.chartData(props));
const defaultOptions = {
    plugins: {
        htmlLegend: {
            callback: formatValue.value
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

let chartOptions = reactive(base.chartOptions(props, component.uid, defaultOptions))

const dataTotals100Percent = computed(() => {
    if(props.format === "percent") {
        return props.data.reduce((partialSum, a) => partialSum + a, 0) === 100;
    }
    return null;
})


/**
 * The chart legend plugin does not re-render
 * when format prop updates.
 */
watch(() => [props.format, props.type], () => {
   const chart = ChartJS.getChart(id);
   chartOptions = base.chartOptions(props, component.uid, defaultOptions)
   if(chart) {
    chart.update();
   }
}, { immediate: true })


</script>
<style lang="scss" scoped>
@import "../../../../scss/fb-chart-legend.scss";
.fb-asset-allocation-chart {
    display: grid;
    grid-template-columns: repeat(v-bind(numGridCol), minmax(0, 1fr));
    & > div {
        position: relative;
    }
}
.fb-asset-allocation-chart-hero {
    text-align: center;
    position: absolute;
    top: 30%;
    width:100%;
}

</style>