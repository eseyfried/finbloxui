<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-data-history-chart">
        <div class="fb-data-history-chart-hero">
            <slot
                :props="props"
                :currentValue="formatters.formatCurrency(currentValue)"
                :changeAmount="formatters.formatCurrency(changeAmount, true)"
                :changePercent="formatters.formatCurrency(changePercent, true)"
                :asOf="formatters.formatDate(asOf)"
                :changeClasses="changeClasses(changeAmount)"
            >
                <h2>{{ label }}</h2>
                <h3>{{ formatters.formatCurrency(currentValue) }}</h3>
                <div class="fb-data-history-chart-change" :class="changeClasses(changeAmount)">
                    <span>{{ formatters.formatCurrency(changeAmount, true) }}</span>
                    <span>{{ formatters.formatPercent(changePercent, true) }}</span>
                </div>
                <span class="fb-data-history-chart-date">As of: {{ formatters.formatDate(asOf) }}</span>
            </slot>
        </div>
        <Chart
            :id="id"
            :type="type"
            :data="chartData"
            :options="chartOptions"
            
        />
    </div>
</template>
<script setup>
// imports
import moment from "moment";
import Chart from "@/components/Core/Charts/Chart";
import * as formatters from "@/modules/useFormatter";
import { computed, getCurrentInstance } from "vue";

// vars
const component = getCurrentInstance();
const id = `fb-data-history-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "line",
    },
    label: {
        type: String,
        default: "Total Portfolio Value"
    },
    dates: {
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
    lineColor: {
        type: String,
        default: () => 'rgb(75, 85, 99)'
    },
    areaColor: {
        type: String,
        default: () => 'rgba(75, 85, 99, 0.3)'
    },
    colors: {
        type: Array,
        default: () => [],
    },
});

const currentValue = computed(() => props.data[props.data.length - 1]);
const previousDayValue = computed(() => props.data[props.data.length - 2]);
const asOf = computed(() => props.dates[props.dates.length - 1]);
const changeAmount = computed(() => {
    const dayChangeAmount = currentValue.value - previousDayValue.value;
    return dayChangeAmount;
});

const changePercent = computed(() => {
    const dayChangeAmount = currentValue.value - previousDayValue.value;
    const dayChangePercent = dayChangeAmount / currentValue.value;
    return dayChangePercent;
});



const defaultChartData = computed(() => {
    return {
        labels: props.dates,
        datasets: [{
            data: props.data,
            fill: 'start',
            borderColor: props.lineColor,
            backgroundColor: props.areaColor
        }],
    }
});

const chartData = computed(() => {
    return {
        ...props.chartjsData,
        ...defaultChartData.value
    }
});



/**
 * merge chartjs prop options with default options
 */
const chartOptions = computed(() => {
    return {
        ...props.chartjsOptions,
        ...{
                elements: {
                    line: {
                        borderWidth: 1,
                        // smooth
                        tension: 0.1 // make prop
                    },
                    point: {
                        pointStyle: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        lineWidth: 0,
                        grid: {
                            display: false
                        },
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: yAxisMax(props.data),
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, ticks) {
                                return formatters.formatCurrency(value);
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    filler: {
                        propagate: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return formatters.formatCurrency(context.raw);
                            },
                            title: function(context) {
                                return moment(context[0].label).format("MMM DD, YYYY")
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                }
            }
        }
});



// methods
const yAxisMax = (arr) => {
    return parseFloat(arr.reduce((largest, current) => 
        (current > largest ? current : largest),arr[0])) + 100000; // make prop
};

const changeClasses = (value) => {
    return parseFloat(value) < 0 ? "fb-negative" : "fb-positive";
}


</script>
<style lang="scss" scoped>
.fb-data-history-chart {
    position: relative;
}
.fb-data-history-chart-hero {
    position: absolute;
    bottom: 80px;
    left: 100px;
}
</style>