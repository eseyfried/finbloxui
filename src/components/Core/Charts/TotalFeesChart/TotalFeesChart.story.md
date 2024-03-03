## Overview

The `TotalFeesChart` component shows the total year to date fee income along with monthly or quarterly fee breakdown. The data can be total fees for an account, houshold or entire book of business.

This is ideal for use as a dashboard component.

### Available Slot and Slot Props

#### Slot Name: hero

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| currentValue | The computed current value of the total Fees. This value is formatted for USD currency. |
| asOf | The date related to the current value. |



### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| fb-total-fees-chart | The class applied to the component root element. |
| fb-total-fees-chart-hero | The class applied to the component total fees hero root element. |
| fb-total-fees-chart-date | The class applied to the component total fees hero date element. |
| fb-total-fees-chart-button | The class applied to the component button element. |
| fb-total-fees-chart-button-selected | The class applied to the component button element selected state. |
| fb-total-fees-chart-button-sm | The class applied to the component button element when viewed in a small viewport. |

### Related Components
- Chart