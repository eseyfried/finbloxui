## Overview
The `TopClientsByFees` component shows the top clients and their respective fees paid in a tabular display with a bar chart for visual comparision.chart for visual comparision.

### Available CSS Class Names

| Class Name | Description |
| ---------- | ----------- |
| fb-top-clients-by-fees | The class applied to the component root element. |
| fb-top-clients-by-fees-md | The class applied to the fee value element when viewport is >= size md. |
| fb-top-clients-by-fees-bar-container | The class applied to the fee table cell element. |
| fb-top-clients-by-fees-bar | The class applied to the fee bar chart. |

### Available Slot and Props

#### Name: default

#### Props

| Prop Name | Description |
| ---------- | ----------- |
| feePercent | The percentage formatted fee amount  |
| feeAmount | The currency formatted fee amount |
| client | The value representing the client (i.e. household name) |
