<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="componentClasses.getClassByType(chartClassTypes)">
        <canvas :id="id" ref="ctx"></canvas>
    </div>
</template>
<script>
const optionsDefault = (props) => {
    const colors = props.colors.length > 0 ? props.colors : false
    const options = {
        elements:{},
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
    // options.elements[getChartElementType(props.type)] = {
    //     backgroundColor: colors || getColorsFromCSSVars(),
    // }
    // options.elements["line"] = {
    //     borderColor: colors || getColorsFromCSSVars(),
    //     backgroundColor: colors || getColorsFromCSSVars(),
    //     point: colors || getColorsFromCSSVars(),
    // }
    return options
}
const getChartElementType = (chartType) => {
    let type
    switch(chartType) {
        case "radar":
        case "bubble":
        case "line":
            type = "point"
            break;
        // case "line":
        //     type = "line"
        //     break;
        case "bar":
            type = "bar"
            break;
        case "pie":
        case "doughnut":
        case "polarArea":
            type = "arc"
            break;
    }
    return type
}
</script>
<script setup>
// imports
import { merge } from "lodash"
import * as componentClasses from "@/modules/useCommonCSS";
import * as formatters from "@/modules/useFormatter";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { ref, onMounted, computed, watch } from "vue";
import { getColorsFromCSSVars } from "@/modules/useCSSVars.js"
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';



// eslint-disable-next-line no-unused-vars
const props = defineProps({
    type: {
        type: String,
        default: "bar",
        desc: "The type of chart.",
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
        desc: "A valid chartjs data object.",
        default: () => { return {} },
    },
    options: {
        type: [Object, Function],
        default: optionsDefault,
        desc: "A valid chartjs options object.",
    },
    plugins: {
        type: Array,
        default: () => { return [] },
        desc: "A valid chartjs plugin array.",
    },
    colors: {
        type: [Object, Array],
        default: () => geChartColorsByTheme("headless"),
        // default: () => { return {...[...geChartColorsByTheme("headless")]} },
    },
    id: {
        type: String,
        default: null,
        desc: "A unique id to assign to the chart.",
    }
});




const ctx = ref(null);

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
    // priority #1
    if (colors.value.length > 0) {
        data.datasets = data.datasets.map(dataset => {
            // dataset.backgroundColor = colors.value;
            return dataset;
        })
    } else {
        data.datasets = data.datasets.map((dataset,i) => {
            // grab colors from css vars
            // priority #2
            const cssVarColors = getColorsFromCSSVars()
            if (cssVarColors.length > 0) {
                dataset.backgroundColor = cssVarColors;
            }
            // priority #3
            // or default to colors set on dataset
            return dataset
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
    return merge(
        optionsDefault(props),
        props.options
    )
})
/**
 * create a new chart instance
 */
const createChart = () => {
    return new Chart(ctx.value, {
        type: props.type,
        data: props.data,
        options: options.value,
        plugins: props.plugins,
    });
}



/**
 * watch the props, when they change
 * destroy the chart and recreate it with updated props
 */
watch(() => [props.type, props.data, props.options, props.colors], (newValue, oldValue) => {
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