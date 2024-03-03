## Overview

The `DataHistoryChart` component provides an area chart showing the historical data trend over a date range. Additionally, 
it provides a set of data points for the current value, change in value as a dollar amount and percent since the previous day.

This chart is ideal for use cases such as:

- Year to Date AUM
- Year to Date Advisory Fees
- Total Portfolio Value
- Total Account Value
 - Year to Data Balance History

### Available Slot and Slot Props

#### Slot Name: default

##### Props
| Name | Description |
| ----------- | ----------- |
| currentValue | The computed current value of the account/portfolio. This value is formatted for USD currency. |
| changeAmount | The computed change in current value since the previous day. This value is formatted for USD currency |
| changePercent | The computed percentage change in current value since the previous day. |
| asOf | The date related to the current/change based values. |
| changeClasses | computed css class names indicating a positive or negative movement. Values can be `fb-negative` or `fb-positive` |

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| fb-data-history-chart | The class applied to the component root element. |
| fb-data-history-chart-hero | The class applied to the component total value root element. |
| fb-data-history-chart-change | The class applied to the component value change root element. |
| fb-data-history-chart-date | The class applied to the component as-of date root element. |

### Related Components
- Chart