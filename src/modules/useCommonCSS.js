
const componentClasses = {
    // layout
    component: "fb-component",
    // buttons
    buttonPrimary: "fb-button-primary",
    buttonSecondary: "fb-button-secondary",
    // chart
    chart: "fb-chart",
    chartPie: "fb-chart-pie",
    chartDoughnut: "fb-chart-doughnut",
    chartLine: "fb-chart-line",
    chartBar: "fb-chart-bar",
    chartHero: "fb-chart-hero",
    chartLegend: "fb-chart-legend",
    chartLegendStacked: "fb-chart-legend-stacked",
}

const getClassByType = (type) => {

    if (Array.isArray(type)) {
        const classes = type.map(key => componentClasses[key])
        return classes.join(" ");
    } else if (componentClasses[type]) {
        return componentClasses[type];
    } else {
        return null;
    }
}

export {
    getClassByType
}