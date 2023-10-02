<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-chart">
        <canvas :id="id" ref="ctx"></canvas>
    </div>
</template>
<script setup>
// imports
import Chart from 'chart.js/auto';
import { ref, onMounted, computed, watch } from "vue";

// vars

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    type: {
        type: String,
        default: null,
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
        default: () => {},
    },
    options: {
        type: Object,
        default: () => {},
    },
    plugins: {
        type: Array,
        default: () => [],
    },
    colors: {
        type: Array,
        default: () => [
            //   'rgb(229 231 235)',
            //   'rgb(209 213 219)',
            //   'rgb(156 163 175)',
            //   'rgb(107 114 128)',
            //   'rgb(75 85 99)',
            //   'rgb(55 65 81)',
            //   'rgb(31 41 55)'
            ]
    },
    id: {
        type: String,
        default: null
    }
});

const ctx = ref(null);
let chart = null;

/**
 * build the data object merging in the colors props if set
 */
const buildData = computed(() => {
    let data = props.data;
    if (props.colors.length > 0) {
        data.datasets = data.datasets.map(dataset => {
            if (dataset.backgroundColor) {
                return dataset;
            } else {
                dataset.backgroundColor = props.colors;
                return dataset;
            }
        })
    } else {
        data.datasets = data.datasets.map(dataset => {
            dataset.backgroundColor = [
              'rgb(229 231 235)',
              'rgb(209 213 219)',
              'rgb(156 163 175)',
              'rgb(107 114 128)',
              'rgb(75 85 99)',
              'rgb(55 65 81)',
              'rgb(31 41 55)'
            ];
            return dataset
        });
    }
    return data;
});
/**
 * create a chart instance when component is mounted
 */
onMounted(() => {
    chart = createChart();
})
/**
 * create a new chart instance
 */
const createChart = () => {
    return new Chart(ctx.value, {
        type: props.type,
        data: buildData.value,
        options: props.options,
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
</style>