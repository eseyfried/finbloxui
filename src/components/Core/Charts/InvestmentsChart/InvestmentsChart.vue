<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-investments-chart" :class="componentClasses.getClassByType('component')">
        <div class="fb-investments-chart-hero"  :class="componentClasses.getClassByType('chartHero')">
            <slot
                name="hero"
                :props="props"
                :currentValue="formatters.formatCurrency(currentValue)"
                :asOf="formatters.formatDate(asOf)"
            >
                <h2>{{ label }}</h2>
                <h3>{{ formatters.formatCurrency(currentValue) }}</h3>
                <span class="fb-investments-chart-date">As of: {{ formatters.formatDate(asOf) }}</span>
            </slot>
        </div>
        <div class="fb-investments-chart-change-amount" :class="componentClasses.getClassByType('chartSubHero')">
            <slot
                name="changeAmount"
                :props="props"
                :changeAmount="formatters.formatCurrency(changeAmount, false)"
                :changeClasses="changeClasses(changeAmount)"
            >
                <h4>{{ changeAmountLabel }}</h4>
                <div :class="changeClasses(changeAmount)">
                    <span>{{ formatters.formatCurrency(changeAmount, false) }}</span>
                </div>
            </slot>
        </div>
        <div class="fb-investments-chart-change-percent" :class="componentClasses.getClassByType('chartSubHero')">
            <slot
                name="changePercent"
                :props="props"
                :changePercent="formatters.formatPercent(changePercent, true)"
                :changeClasses="changeClasses(changePercent)"
            >
                <h4>{{ changePercentLabel }}</h4>
                <div :class="changeClasses(changePercent)">
                    <span>{{ formatters.formatPercent(changePercent, true) }}</span>
                </div>
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
import * as dateUtils from "@/modules/useDateUtils";
import * as componentClasses from "@/modules/useCommonCSS";
import { areaColor, lineColor } from "@/modules/useChartUtils";
import Chart from "@/components/Core/Charts/Chart";
import * as formatters from "@/modules/useFormatter";
import { computed, getCurrentInstance } from "vue";
import { merge } from "lodash";

// vars
const component = getCurrentInstance();
const id = `fb-investments-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "line",
    },
    label: {
        type: String,
        default: "Investments"
    },
    changeAmountLabel: {
        type: String,
        default: "Change ($)"
    },
    changePercentLabel: {
        type: String,
        default: "Change (%)"
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
        default: () => 'rgba(255, 255, 255, 0.15)'
    },
});


const monthlyData = computed( () => dateUtils.toMonthly(dateUtils.toXY(props.dates, props.data)));
const currentValue = computed(() => props.data.slice(-1));
const previousDayValue = computed(() => props.data[props.data.length - 2]);

const asOf = computed(() => props.dates[props.dates.length - 1]);
const changeAmount = computed(() => currentValue.value - previousDayValue.value);
const changePercent = computed(() => changeAmount.value / currentValue.value);



const defaultChartData = computed(() => {
    return {
        datasets: [{
            data: monthlyData.value,
            fill: 'start',
            borderColor: lineColor(props.lineColor, "--fb-investments-chart-line-color").value,
            backgroundColor: areaColor(props.areaColor, "--fb-investments-chart-area-color").value
        }],
    }
});

const chartData = computed(() => {
    return merge(
        {},
        props.chartjsData,
        defaultChartData.value
    )
});

/**
 * merge chartjs prop options with default options
 */
const chartOptions = computed(() => {
    return merge(
        {},
        props.chartjsOptions,
        {
        
            layout: {
                autoPadding: false
                    
            },
            elements: {
                line: {
                    borderWidth: 0,
                    // smooth
                    tension: 0.5 // make prop
                },
                point: {
                    pointStyle: false
                },
            },
            scales: {
                x: {
                    type: 'time',
                    lineWidth: 0,
                    display: false,
                    ticks: {
                        align: 'end'
                    },
                    grid: {
                        display: false
                    },
                    time: {
                        displayFormats: {'month': 'MMM YY'},
                        unit: 'month',
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: yAxisMax(props.data),
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
                    enabled: false,
                }
            },
            interaction: {
                intersect: false,
            }
        }
    )
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
@import "../../../../scss/finbloxui.scss";
.fb-investments-chart {
    position: relative;
    background-color: var(--fb-chart-color-4);
}
::v-deep(:is(h2,h3)) {
    margin: 0;
    font-size: 5.4vmin;
}
::v-deep(:is(h4)) {
    margin: 0;
    font-size: 4.0vmin;
}

.fb-investments-chart-hero {
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 200;
}
.fb-investments-chart-change-amount {
    position: absolute;
    bottom: 15%;
    left: 5%;
    z-index: 200;
}
.fb-investments-chart-change-percent {
    position: absolute;
    bottom: 15%;
    right: 5%;
    z-index: 200;
}
</style>