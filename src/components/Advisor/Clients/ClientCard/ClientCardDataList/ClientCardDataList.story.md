## Overview
The `ClientCardDataList` component renders the client's financial stats from the client data `stats` array.

### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| data | An Array of client stat objects |
| data.label | The stat text label |
| data.value | The formatted stat value |
| data.order | The specified order to render the stat |
| data.formatter | The type of formatter to use on the value |

### Related Components
- ClientCardRoot
- ClientCardDataList
- ClientCardDataListItem
- ClientCardDataLabel
- ClientCardDataValue