<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-total-aum-chart" :class="componentClasses.getClassByType('component')">
        <div class="fb-total-aum-chart-hero" :class="[componentClasses.getClassByType('chartHero'), isMobile ? 'fb-total-aum-chart-hero-sm' : null]">
            <slot
                name="hero"
                :props="props"
                :currentValue="formatters.formatCurrency(currentValue)"
                :asOf="formatters.formatDate(asOf)"
            >
                <h2>{{ label }}</h2>
                <h3>{{ formatters.formatCurrency(currentValue) }}</h3>
                <span class="fb-total-aum-chart-date">As of: {{ formatters.formatDate(asOf) }}</span>
            </slot>
        </div>
        <Chart
            :id="id"
            :type="type"
            :data="chartData"
            :options="chartOptions"
            
        />
        <button
            @click.prevent="toggleData('daily')"
            class="fb-total-aum-chart-button"
            :class="[{ 'fb-total-aum-chart-button-selected': currentTimePeriod === 'daily' }, componentClasses.getClassByType('buttonSecondary')]"
        >
            Daily
        </button>
        <button
            @click.prevent="toggleData('monthly')"
            class="fb-total-aum-chart-button"
            :class="[{ 'fb-total-aum-chart-button-selected': currentTimePeriod === 'monthly' }, componentClasses.getClassByType('buttonSecondary')]"
        >
            Monthly
        </button>
        <button
            @click.prevent="toggleData('quarterly')"
            class="fb-total-aum-chart-button"
            :class="[{ 'fb-total-aum-chart-button-selected': currentTimePeriod === 'quarterly' }, componentClasses.getClassByType('buttonSecondary')]"
        >
            Quarterly
        </button>
        
    </div>
</template>
<script setup>
// imports
import moment from "moment";
import * as componentClasses from "@/modules/useCommonCSS";
import * as dateUtils from "@/modules/useDateUtils";
import { arraySum } from "@/modules/useArrayUtils";
import { isMobile } from "@/modules/useResponsive";
import Chart from "@/components/Core/Charts/Chart";
import { areaColor, lineColor } from "@/modules/useChartUtils";
import ChartJS from 'chart.js/auto';
import * as formatters from "@/modules/useFormatter";
import { computed, getCurrentInstance, ref } from "vue";
import { merge } from "lodash";

// vars
const component = getCurrentInstance();
const id = `fb-total-aum-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "line",
    },
    label: {
        type: String,
        default: "YTD Total AUM"
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
        default: () => 'rgb(75, 85, 99, 0.3)'
    },
    defaultTimePeriod: {
        type: String,
        default: "monthly",
        validator: (value) => ["daily", "monthly", "quarterly"].includes(value)
    }
});


const dailyData = computed( () => dateUtils.toXY(props.dates, props.data));
const monthlyData = computed( () => {
    const monthGroup = dateUtils.groupByDate(dateUtils.toXY(props.dates, props.data), "month");
    const entries = Object.entries(monthGroup);
    const monthly = entries.map((month) => {
        const values = month[1].dates.map(item => item.y)
        return values.pop();
    });
    const endOfMonthDates = Array.from({length: monthly.length}, (_, i) => moment().month(i).endOf('month').format("YYYY-MM-DD"));
    
    return dateUtils.toXY(endOfMonthDates, monthly);
});

const quarterlyData = computed( () => {
    const numberOfQtrs = 4;
    const qtrStarts = [0,3,6,9];
    const quarterlyData = [];
    const quarterlyDates = [];
    for(let i = 0; i < numberOfQtrs; i++) {
        const qtrStartIndex = qtrStarts[i];
        const qtrEndIndex = qtrStartIndex + 3;
        const qtrData = monthlyData.value.map(d => d.y).slice(qtrStartIndex, qtrEndIndex);
        const qtrDate = monthlyData.value.map(d => d.x)[qtrStarts[i] + 3 - 1];
        quarterlyData.push(qtrData.pop());
        quarterlyDates.push(qtrDate || moment.utc());
    }
    return dateUtils.toXY(quarterlyDates, quarterlyData);
});
const currentValue = computed(() => props.data[props.data.length - 1]);
const asOf = computed(() => props.dates[props.dates.length - 1]);
const currentTimePeriod = ref(props.defaultTimePeriod);



// methods
const toggleData = (type) => {
    const chart = ChartJS.getChart(id);
    switch(type) {
        case 'daily':
            if(chart) {
                chart.config.options.scales.x.time.unit = "day";
                chart.config.options.scales.x.ticks.source = "auto";
                chart.data.datasets[0].data = dailyData.value;
                chart.config.options.scales.y.suggestedMax = yAxisMax(dailyData.value.map(d => d.y));
            }
            currentTimePeriod.value = "daily";
        break;
        case 'monthly':
            if(chart) {
                chart.config.options.scales.x.time.unit = "month";
                chart.config.options.scales.x.ticks.source = "data";
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
                chart.config.options.scales.x.ticks.source = "data";
            }
            currentTimePeriod.value = "quarterly";
        break;
    }
    
    if(chart) {
        chart.update();
    }
}
const defaultChartData = computed(() => {
    let defaultData;
    switch (props.defaultTimePeriod) {
        case "daily":
            defaultData = dailyData.value;
            break;
        case "monthly":
            defaultData = monthlyData.value;
            break;
        case "quarterly":
            defaultData =quarterlyData.value;
            break;
    } 

    return {
        datasets: [{
            data: defaultData,
            fill: 'start',
            borderColor: lineColor(props.lineColor, "--fb-total-aum-chart-line-color").value,
            backgroundColor: areaColor(props.areaColor, "--fb-total-aum-chart-area-color").value
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
                    borderWidth: 1,
                    // smooth
                    tension: 0.5// make prop
                },
                point: {
                    pointStyle: false
                },
            },
            scales: {
                x: {
                    type: 'time',
                    lineWidth: 0,
                    display: true,
                    ticks: {
                        align: 'center',
                        // source: "data"
                    },
                    grid: {
                        display: true
                    },
                    time: {
                        displayFormats: {'month': 'MMM YY'},
                        unit: 'day',
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
    const yAxisMax = arr.reduce((largest, current) => (current > largest ? current : largest), arr[0]);
    return parseFloat(yAxisMax + (yAxisMax * 0.5)); // make prop
};

</script>
<style lang="scss" scoped>
.fb-total-aum-chart {
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

.fb-total-aum-chart-hero {
    &.fb-total-aum-chart-hero-sm {
        position: relative;
        top: 0%;
        left: 0%;
    }
    position: absolute;
    bottom: 20%;
    left: 12%;
    z-index: 200;
}
</style>