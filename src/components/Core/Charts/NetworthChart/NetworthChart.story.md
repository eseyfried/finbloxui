## Overview

The `NetworthChart` component provides a visual view of networth over time along with a snapshot view of networth stats.
Values include: the current Networth as of today, the change in networth since the previous month as well as since the beginning of the year.

This is ideal for use as a dashboard component.

### Available Slot and Slot Props

#### Slot Name: hero

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| currentValue | The computed current value of the account/portfolio. This value is formatted for USD currency. |
| asOf | The date related to the current value. |

#### Slot Name: month

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| monthChangeAmount | The computed change in current value since the previous month. This value is formatted for USD currency |
| monthChangePercent | The computed percent change in current value since the previous month. |
| changeClasses | computed css class names indicating a positive or negative movement. Values can be `fb-negative` or `fb-positive` |

#### Slot Name: year

##### Props
| Name | Description |
| ----------- | ----------- |
| props | All props passed in are available |
| yearChangeAmount | The computed change in current value since the previous year. This value is formatted for USD currency |
| yearChangePercent | The computed percent change in current value since the previous year. |
| changeClasses | computed css class names indicating a positive or negative movement. Values can be `fb-negative` or `fb-positive` |

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| fb-networth-chart | The class applied to the component root element. |
| fb-networth-chart-hero | The class applied to the component networth hero root element. |
| fb-networth-chart-month | The class applied to the component month root element. |
| fb-networth-chart-year | The class applied to the component year root element. |

### Related Components
- Chart