## Overview

The `TotalAUMChart` component shows the total year to date AUM along with daily, monthly and quarterly AUM views. The data can be total AUM for an account, houshold or entire book of business.

This is ideal for use as a dashboard component.

### Available Slot and Slot Props

#### Slot Name: hero

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| currentValue | The computed current value of the total AUM. This value is formatted for USD currency. |
| asOf | The date related to the current value. |



### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| fb-total-aum-chart | The class applied to the component root element. |
| fb-total-aum-chart-hero | The class applied to the component total AUM hero root element. |
| fb-total-aum-chart-date | The class applied to the component total AUM hero date element. |
| fb-total-aum-chart-button | The class applied to the component button element. |
| fb-total-aum-chart-button-selected | The class applied to the component button element selected state. |
| fb-total-aum-chart-button-sm | The class applied to the component button element when viewed in a small viewport. |

### Related Components
- Chart