
const componentClasses = {
    // layout
    component: "fb-component",
    // buttons
    buttonPrimary: "fb-button-primary",
    buttonSecondary: "fb-button-secondary",
    // chart
    chart: "fb-chart",
    chartHero: "fb-chart-hero",
    chartLegend: "fb-chart-legend",
    chartLegendStacked: "fb-chart-legend-stacked",
}

const getClassByType = (type) => componentClasses[type] ||  "";

export {
    getClassByType
}