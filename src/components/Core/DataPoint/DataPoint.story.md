## Overview

The `DataPoint` component accepts a simple data object with a label, value and optional formatting option. This component is useful for creating high level dashboard stats.

### Available CSS Class Names

| Class Name | Description |
| ---------- | ----------- |
| fb-data-point | The class applied to the component root element. |
| fb-data-point-body | The class applied to the component body element. |
| fb-data-point-trend | The class applied to the data point trend container element. |
| fb-data-point-footer | The class applied to the component footer element. |

### Available Events

| Event | Description |
| ---------- | ----------- |
| fb-data-point-action-link:click | Event emiited when action link is clicked. Typically used for linking to deeper content. The `dataPoint` prop is passed to your event handler. |


### Related Components
- DataPointLabel
- DataPointValue
- DataPointTrend
- DataPointAction