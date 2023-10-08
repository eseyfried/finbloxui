import { computed } from "vue";
import { merge } from "lodash";
const useProps = (props) => {
    return {
        type: {
            type: String,
            default: "doughnut",
            validator: (value) => ["doughnut", "pie"].includes(value),
        },
        labels: {
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
        colors: {
            type: Array,
            default: () => []
        },
        ...props
    }
}

const defaultChartData = computed(() => {
    return (props) => {
        return {
            labels: props.labels,
            datasets: [{
                data: props.data
            }],
        }
    }
});

const chartData = computed(() => {
    return (props) => {
        return {
            ...props.chartjsData,
            ...defaultChartData.value(props)
        }
    }
});

const chartOptions = computed(() => {
    return (props, componentID, defaultOptions = {}) => {
        let cutout = props.chartjsOptions?.cutout ? props.chartjsOptions.cutout : "75%";
        if (props.type === "pie") {
            cutout = 0;
        }
        return merge(
            {},
            props.chartjsOptions,
            {
                    maintainAspectRatio: false,
                    cutout: cutout,
                    plugins: {
                        htmlLegend: {
                            // ID of the container to put the legend in
                            containerID: "legend-container",
                            componentID: componentID
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                            }
                        }
                    }
            },
            defaultOptions
        )
    }
});

export {
    useProps,
    defaultChartData,
    chartData,
    chartOptions
}