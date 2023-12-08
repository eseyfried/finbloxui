<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-networth-chart" :class="componentClasses.getClassByType('component')">
        <div class="fb-networth-chart-hero" :class="componentClasses.getClassByType('chartHero')">
            <slot
                name="hero"
                :props="props"
                :currentValue="formatters.formatCurrency(currentValue)"
                :asOf="formatters.formatDate(asOf)"
            >
                <h2>{{ label }}</h2>
                <h3>{{ formatters.formatCurrency(currentValue) }}</h3>
                <span class="fb-networth-chart-date">As of: {{ formatters.formatDate(asOf) }}</span>
            </slot>
        </div>
        <div class="fb-networth-chart-month">
            <slot
                name="month"
                :props="props"
                :monthChangeAmount="formatters.formatCurrency(monthChangeAmount, false)"
                :monthChangePercent="formatters.formatPercent(monthChangePercent, true)"
                :changeClasses="changeClasses(monthChangeAmount)"
            >
                <h4>{{ monthLabel }}</h4>
                <div class="fb-networth-chart-month-change" :class="changeClasses(monthChangeAmount)">
                    <span>{{ formatters.formatCurrency(monthChangeAmount, false) }}</span>
                    <span>{{ formatters.formatPercent(monthChangePercent, true) }}</span>
                </div>
            </slot>
        </div>
        <div class="fb-networth-chart-year">
            <slot
                name="year"
                :props="props"
                :yearChangeAmount="formatters.formatCurrency(yearChangeAmount, false)"
                :yearChangePercent="formatters.formatPercent(yearChangePercent, true)"
                :changeClasses="changeClasses(yearChangeAmount)"
                :sinceDate="sinceDate"
            >
                <h4>{{ sinceLabel }} {{ moment.utc(sinceDate).format("MMM YYYY") }}</h4>
                <div class="fb-networth-chart-year-change" :class="changeClasses(yearChangeAmount)">
                    <span>{{ formatters.formatCurrency(yearChangeAmount, false) }}</span>
                    <span>{{ formatters.formatPercent(yearChangePercent, true) }}</span>
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
import moment from "moment";
import * as dateUtils from "@/modules/useDateUtils";
import * as componentClasses from "@/modules/useCommonCSS";
import { getFBCustomVars } from "@/modules/useCSSVars";
import Chart from "@/components/Core/Charts/Chart";
import * as formatters from "@/modules/useFormatter";
import { computed, getCurrentInstance } from "vue";
import { merge } from "lodash";

// vars
const component = getCurrentInstance();
const id = `fb-networth-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "line",
    },
    label: {
        type: String,
        default: "Networth"
    },
    monthLabel: {
        type: String,
        default: "This Month"
    },
    sinceLabel: {
        type: String,
        default: "Since"
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
const currentValue = computed(() => monthlyData.value[monthlyData.value.length - 1]?.y);
const previousMonthValue = computed(() => monthlyData.value[monthlyData.value.length - 2]?.y);
const beginningValue = computed(() => monthlyData.value[0]?.y);
const sinceDate = computed(() => monthlyData.value[0]?.x);
const asOf = computed(() => props.dates[props.dates.length - 1]);
const monthChangeAmount = computed(() => currentValue.value - previousMonthValue.value);
const monthChangePercent = computed(() => monthChangeAmount.value / currentValue.value);
const yearChangeAmount = computed(() => currentValue.value - beginningValue.value);
const yearChangePercent = computed(() => yearChangeAmount.value / currentValue.value);

const areaColor = computed(() => {
    const cssVar = getFBCustomVars("--fb-chart-area-color");
    if (cssVar[0]) {
        return cssVar[0][1];
    } else {
        return props.areaColor
    }
});

const defaultChartData = computed(() => {
    return {
        datasets: [{
            data: monthlyData.value,
            fill: 'start',
            borderColor: props.lineColor,
            backgroundColor: areaColor.value
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
.fb-networth-chart {
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

.fb-networth-chart-hero {
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 200;
}
.fb-networth-chart-month {
    position: absolute;
    bottom: 15%;
    left: 5%;
    z-index: 200;
}
.fb-networth-chart-year {
    position: absolute;
    bottom: 15%;
    right: 5%;
    z-index: 200;
}
</style>