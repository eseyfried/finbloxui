<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-total-fees-chart" :class="componentClasses.getClassByType('component')">
        <div class="fb-total-fees-chart-hero" :class="[{ 'fb-total-fees-chart-hero-sm': isMobile }, componentClasses.getClassByType('chartHero')]">
            <slot
                name="hero"
                :props="props"
                :currentValue="formatters.formatCurrency(currentValue)"
                :asOf="formatters.formatDate(asOf)"
            >
                <h2>{{ label }}</h2>
                <h3>{{ formatters.formatCurrency(currentValue) }}</h3>
                <span class="fb-total-fees-chart-date">As of: {{ formatters.formatDate(asOf) }}</span>
            </slot>
        </div>
        <Chart
            :id="id"
            :type="type"
            :data="chartData"
            :options="chartOptions"
            
        />
        <button
            @click.prevent="toggleData('monthly')"
            class="fb-total-fees-chart-button"
            :class="[{ 'fb-total-fees-chart-button-selected': currentTimePeriod === 'monthly' }, componentClasses.getClassByType('buttonSecondary')]"
        >
            Monthly
        </button>
        <button
            @click.prevent="toggleData('quarterly')"
            class="fb-total-fees-chart-button"
            :class="[{ 'fb-total-fees-chart-button-selected': currentTimePeriod === 'quarterly' }, componentClasses.getClassByType('buttonSecondary')]"
        >
            Quarterly
        </button>
        
    </div>
</template>
<script setup>
// imports
import moment from "moment";
import * as dateUtils from "@/modules/useDateUtils";
import * as componentClasses from "@/modules/useCommonCSS";
import { arraySum } from "@/modules/useArrayUtils";
import { isMobile } from "@/modules/useResponsive";
import Chart from "@/components/Core/Charts/Chart";
import { barColor, lineColor } from "@/modules/useChartUtils";
import ChartJS from 'chart.js/auto';
import * as formatters from "@/modules/useFormatter";
import { computed, getCurrentInstance, ref } from "vue";
import { merge } from "lodash";

// vars
const component = getCurrentInstance();
const id = `fb-total-fees-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "bar",
    },
    label: {
        type: String,
        default: "YTD Total Fees"
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
    barColor: {
        type: String,
        default: () => 'rgb(75, 85, 99)'
    },
});


const monthlyData = computed( () => dateUtils.toXY(props.dates, props.data));
const quarterlyData = computed( () => {
    const numberOfQtrs = Math.ceil((props.data.length/4));
    const qtrStarts = [0,3,6,9];
    const quarterlyData = [];
    const quarterlyDates = [];
    for(let i = 0; i <= numberOfQtrs; i++) {
        const qtrStartIndex = qtrStarts[i];
        const qtrEndIndex = qtrStartIndex + 3;
        const qtrData = props.data.slice(qtrStartIndex, qtrEndIndex);
        const qtrDate = props.dates[qtrStarts[i] + 3 - 1];
        quarterlyData.push(arraySum(qtrData));
        quarterlyDates.push(qtrDate || moment.utc().format("YYYY-MM-DD"));
    }
    return dateUtils.toXY(quarterlyDates, quarterlyData);
});
const currentValue = computed(() => arraySum(props.data));
const asOf = computed(() => props.dates[props.dates.length - 1]);
const currentTimePeriod = ref("monthly");



// methods
const toggleData = (type) => {
    const chart = ChartJS.getChart(id);
    switch(type) {
        case 'monthly':
            if(chart) {
                chart.config.options.scales.x.time.unit = "month";
                chart.data.datasets[0].data = monthlyData.value;
                chart.config.options.scales.y.suggestedMax = yAxisMax(monthlyData.value.map(d => d.y));
            }
            currentTimePeriod.value = "monthly";
        break;
        case 'quarterly':
            if(chart) {
                chart.config.options.scales.x.time.unit = "quarter";
                chart.config.options.scales.y.suggestedMax = yAxisMax(quarterlyData.value.map(d => d.y));
                chart.data.datasets[0].data = quarterlyData.value;
            }
            currentTimePeriod.value = "quarterly";
        break;
    }
    
    if(chart) {
        chart.update();
    }
}

const defaultChartData = computed(() => {
    return {
        datasets: [{
            data: monthlyData.value,
            borderColor: lineColor(props.lineColor, "--fb-total-fees-chart-line-color").value,
            backgroundColor: barColor(props.barColor, "--fb-total-fees-chart-bar-color").value
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
                bar: {
                    borderWidth: 1.0,
                },
                point: {
                    pointStyle: true
                },
            },
            scales: {
                x: {
                    type: 'time',
                    lineWidth: 0,
                    display: true,
                    ticks: {
                        align: 'center',
                        source: "data"
                    },
                    grid: {
                        display: true
                    },
                    time: {
                        unit: 'month',
                    }
                },
                y: {
                    display: true,
                    grid: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: yAxisMax(props.data),
                    ticks: {
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
                    enabled: true,
                    callbacks: {
                        title: function(context) {
                            return moment.utc(context[0].raw.x).format("MMM DD, YYYY");
                        },
                        label: function(context) {
                            return formatters.formatCurrency(context.parsed.y);
                        }
                    }
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
        (current > largest ? current : largest),arr[0])) + 200000; // make prop
};

</script>
<style lang="scss" scoped>
.fb-total-fees-chart {
    position: relative;
}
::v-deep(:is(h2,h3)) {
    margin: 0;
    font-size: 5.4vmin;
}
::v-deep(:is(h4)) {
    margin: 0;
    font-size: 4.0vmin;
}

.fb-total-fees-chart-hero {
    &.fb-total-fees-chart-hero-sm {
        position: relative;
        top: 0%;
        left: 0%;
    }
    position: absolute;
    top: 5%;
    left: 15%;
    z-index: 200;
}
</style>