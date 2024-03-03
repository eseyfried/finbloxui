## Overview

The `AssetAllocationChart` component is a classic way to visually display an account or portfolio's asset allocation. This component offers a pie or doughnut chart along with an interactive legend
allowing for datapoints to be toggled on or off.

### Available Slot and Slot Props

#### Slot Name: default

##### Props
| Name | Description |
| ----------- | ----------- |
| totalAmount | The value of the totalAmount prop provided to the component. This value is formatted for USD currency. |
| totalLabel | The value of the totalLabel prop provided to the component. |

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| fb-asset-allocation-chart | The class applied to the component root element. |
| fb-chart-legend | The class applied to the chart legend root element. |
| fb-chart-legend-list | The class applied to the chart legend list container element. |
| fb-chart-legend-list-item | The class applied to each chart legend list item element. |
| fb-chart-legend-list-item-color | The class applied to each chart legend list item color element. |
| fb-chart-legend-item-hidden | The class applied to each chart legend list item when toggled off (hidden). |

### Related Components

- Chart