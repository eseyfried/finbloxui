<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="componentClasses.getClassByType(chartClassTypes)">
        <canvas :id="id" ref="ctx"></canvas>
    </div>
</template>
<script>
const optionsDefault = () => { 
    return {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
}
</script>
<script setup>
// imports
import * as componentClasses from "@/modules/useCommonCSS";
import * as formatters from "@/modules/useFormatter";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { ref, onMounted, computed, watch } from "vue";
import { getColorsFromCSSVars } from "@/modules/useCSSVars.js"
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';

// vars

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    type: {
        type: String,
        default: "bar",
        validator: (value) => {
            return [
                "bar",
                "line",
                "bubble",
                "doughnut",
                "pie",
                "mixed",
                "polarArea",
                "radar",
                "scatter"
            ].includes(value);
        }
    },
    data: {
        type: Object,
        default: () => { return {} },
    },
    options: {
        type: [Object, Function],
        default: optionsDefault
    },
    plugins: {
        type: Array,
        default: () => { return [] },
    },
    colors: {
        type: [Object, Array],
        default: () => { return {...[...geChartColorsByTheme("headless")]} },
    },
    id: {
        type: String,
        default: null
    }
});



const ctx = ref(null);
const defaultColors = ref([]);
let chart = null;

const colors = computed(() => {
    let colors;
    if (props.colors.length) {
        colors = props.colors
    } else if (typeof props.colors === 'object'){
        colors = Object.values(props.colors)
    }
    return colors
})
/**
 * build the data object merging in the colors props if set
 */
const buildData = computed(() => {
    let data = props.data;
    // colors prop is explicity passed
    if (colors.value.length > 0) {
        data.datasets = data.datasets.map(dataset => {
            dataset.backgroundColor = colors.value;
            return dataset;
        })
    } else {
        data.datasets = data.datasets.map(dataset => {
            // if chartjs color is set via standard dataset config, honor it
            if (dataset.backgroundColor) {
                return dataset
            // use props colors or grab from custom css vars
            } else {
                defaultColors.value = props.colors.length ? props.colors : getColorsFromCSSVars();
                dataset.backgroundColor = defaultColors.value;
                return dataset
            }
        });
    }
    return data;
});

const chartClassTypes = computed(() => {
    return ['chart',`chart${formatters.ucFirst(props.type)}`]
});


/**
 * create a chart instance when component is mounted
 */
onMounted(() => {
    chart = createChart();
})

const options = computed(() => {
    if (typeof props.options === "object" && Object.entries(props.options).length > 0) {
       return props.options
    } else {
        return optionsDefault()
    }
})
/**
 * create a new chart instance
 */
const createChart = () => {
    return new Chart(ctx.value, {
        type: props.type,
        data: buildData.value,
        options: options.value,
        plugins: props.plugins,
    });
}
/**
 * watch the props, when they change
 * destroy the chart and recreate it with updated props
 */
watch(() => [props.type, props.data, props.options, props.colors], () => {
    if (chart) {
        chart.destroy();
        chart = createChart();
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.fb-chart {
    position: relative;
    z-index: 100;
}
</style>