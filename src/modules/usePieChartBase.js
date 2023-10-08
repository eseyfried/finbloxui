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

const defaultChartData = (props) => {
    return {
        labels: props.labels,
        datasets: [{
            data: props.data
        }],
    }
};

const chartData = (props) => {
    return {
        ...props.chartjsData,
        ...defaultChartData(props)
    }
};

const chartOptions = (props, componentID, defaultOptions = {}) => {
    let cutout = props.chartjsOptions?.cutout ? props.chartjsOptions.cutout : "90%";
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

export {
    useProps,
    defaultChartData,
    chartData,
    chartOptions
}