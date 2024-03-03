## Overview

The `Chart` component is a wrapper component around the [Chart.js](https://www.chartjs.org/docs/latest/) library. This component is the base component for all FinbloxUI chart components.

### Props

The `Chart` component supports props that are direct pass through props on the Chart.js [configuration object](https://www.chartjs.org/docs/latest/configuration/)

| Name | Description |
| ----------- | ----------- |
| id | A unique id applied as an HTML id attribute |
| type | A supported Chart.js chart type |
| data | A supported Chart.js chart specific data object. |
| options | A supported Chart.js chart specific data object. |
| plugins | A supported Chart.js chart plugin object. |

### Styling Charts

You can change the colors and style of FinbloxUI charts by passing the appropriate data and/or options configuration according to the Chart.js [documentation](https://www.chartjs.org/docs/latest/)