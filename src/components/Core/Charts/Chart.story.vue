<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Charts/Chart"
        auto-props-disabled
        :meta="{ wrapper: false }"
    >
        <template #controls="{state}">
            <HstSelect v-model="state.type" title="type" :options="options" />     
            <PropDesc :component="Chart" prop="type" />
            <HstJson v-model="state.chartData" title="data" />
            <PropDesc :component="Chart" prop="data" />
            <HstJson v-model="state.options" title="options" />
            <PropDesc :component="Chart" prop="options" />
        </template>

        <Variant
            title="Bar Chart"
            :init-state="initBarState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>

        <Variant
            title="Line Chart"
            :init-state="initLineState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>

        <Variant
            title="Pie Chart"
            :init-state="initPieState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>

        <Variant
            title="Doughnut Chart"
            :init-state="initDoughnutState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>

        <Variant
            title="Bubble Chart"
            :init-state="initBubbleState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>

        <Variant
            title="Polar Area Chart"
            :init-state="initPolarAreaState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>

        <Variant
            title="Scatter Chart"
            :init-state="initScatterState"
        >
            <template #default="{state}">
                <Chart
                    :type="state.type"
                    :data="state.chartData"
                    :options="state.options"
                    :colors="state.colors"
                    :key="componentKey"
                />
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { transparentize } from "@/modules/useColorUtil"
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { registerSwitchCallback, componentKey, forceUpdate } from "@/../.histoire/components/ThemeSwitcher"
import PropDesc from '@/../.histoire/components/PropDesc';
import Chart from '@/components/Core/Charts/Chart.vue';
import { geChartColorsByTheme } from '@/../.histoire/modules/chartThemeColors';


registerSwitchCallback(() => {
    forceUpdate()
})

const options = [
        "bar",
        "line",
        "bubble",
        "doughnut",
        "pie",
        "polarArea",
        "radar",
        "scatter"
    ]

/**
 * chartJS chart specific data config
 */

const defaultData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Total AUM By Month',
      data: [12000, 19000, 30000, 50000, 20000, 30000],
      borderWidth: 1,
    }]
}

const bubbleChartData = {
    datasets: [{
        label: 'Bubble Dataset',
        data: [{
            x: 25,
            y: 30,
            r: 5
        }, {
            x: 35,
            y: 10,
            r: 2
        }]
    }]
}

const scatterChartData = {
    datasets: [{
        label: 'Scatter Dataset',
        data: [{
            x: -10,
            y: 0
        }, {
            x: 0,
            y: 10
        }, {
            x: 10,
            y: 5
        }, {
            x: 0.5,
            y: 5.5
        }],
    }]
}



/**
 * chartJS chart type specific options
 */

const barChart = {
    elements: {
        bar: {
            backgroundColor: 'rgba(255, 159, 64, 0.3)',
            borderColor: 'rgb(255, 159, 64)',
            borderRadius: 5,
            borderWidth: 3
        }
    }
}

const lineChart = {
    elements: {
        line: {
            backgroundColor: 'rgba(255, 159, 64, 0.3)',
            borderColor: 'rgb(255, 159, 64)',
            borderRadius: 5,
            borderWidth: 3
        },
        point: {
            borderColor: 'rgb(255, 159, 64)',
        }
    }
}

const pieChart = {
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        },
    },
    elements: {
        arc: {
            backgroundColor: geChartColorsByTheme("theme 1"),
        }
    }
}
const doughnutChart = {
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        },
    },
    elements: {
        arc: {
            backgroundColor: geChartColorsByTheme("theme 1"),
        }
    }
}

const bubbleChart = {
    elements: {
        point: {
            backgroundColor: 'rgba(255, 159, 64, 0.3)',
            borderColor: 'rgb(255, 159, 64)',
        }
    }
}
const polarAreaChart = {
    elements: {
        arc: {
            backgroundColor: geChartColorsByTheme("theme 1").map(color => transparentize(color, 0.6))
        }
    }
}
const scatterChart = {
    elements: {
        point: {
            backgroundColor: 'rgba(255, 159, 64, 0.3)',
            borderColor: 'rgb(255, 159, 64)',
        }
    }
}


/**
 * chart type variant initStates
 */
const initBarState = () => {
    return {
        type: 'bar',
        chartData: defaultData,
        options: {
            ...barChart
        }
    }
}
const initLineState = () => {
    return {
        type: 'line',
        chartData: defaultData,
        options: {
            ...lineChart
        }
    }
}
const initPieState = () => {
    return {
        type: 'pie',
        chartData: defaultData,
        options: {
            ...pieChart
        }
    }
}
const initDoughnutState = () => {
    // copy data and add prop
    const chartData = JSON.parse(JSON.stringify(defaultData));
    chartData.datasets[0].cutout = '80%'
    return {
        type: 'doughnut',
        chartData: chartData,
        options: {
            ...doughnutChart
        }
    }
}
const initBubbleState = () => {
    return {
        type: 'bubble',
        chartData: bubbleChartData,
        options: {
            ...bubbleChart
        }
    }
}

const initPolarAreaState = () => {
    return {
        type: 'polarArea',
        chartData: defaultData,
        options: {
            ...polarAreaChart
        }
    }
}

const initScatterState = () => {
    return {
        type: 'scatter',
        chartData: scatterChartData,
        options: {
            ...scatterChart
        }
    }
}
</script>