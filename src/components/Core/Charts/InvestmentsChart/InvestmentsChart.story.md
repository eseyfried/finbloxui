## Overview

The `InvestmentsChart` component provides a visual view of investments over time along with a snapshot view of investments stats.
Values include: he current Investments as of today, the change in investments since the 
previous month as well as since the beginning of the year.

This is ideal for use as a dashboard component.

### Available Slot and Slot Props

#### Slot Name: hero

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| currentValue | The computed current value of the account/portfolio. This value is formatted for USD currency. |
| asOf | The date related to the current/change based values. |

#### Slot Name: changeAmount

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| changeAmount | The computed change in current value since the previous day. This value is formatted for USD currency |
| changeClasses | computed css class names indicating a positive or negative movement. Values can be `fb-negative` or `fb-positive` |

#### Slot Name: changePercent

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| changePercent | The computed percentage change in current value since the previous day. This value is formatted for USD currency |
| changeClasses | computed css class names indicating a positive or negative movement. Values can be `fb-negative` or `fb-positive` |

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| fb-investments-chart | The class applied to the component root element. |
| fb-investments-chart-hero | The class applied to the component investments hero root element. |
| fb-investments-chart-date | The class applied to the component investments asOf root element. |
| fb-investments-chart-change-amount | The class applied to the component change amount root element. |
| fb-investments-chart-change-percent | The class applied to the component change percent root element. |

### Related Components
- Chart