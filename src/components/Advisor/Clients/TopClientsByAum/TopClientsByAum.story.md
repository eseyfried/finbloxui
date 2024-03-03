## Overview
The `TopClientsByAum` component shows the top clients and their respective assets under managmenet in a tabular display with a bar chart for visual comparision.

### Available CSS Class Names

| Class Name | Description |
| ---------- | ----------- |
| fb-top-clients-by-aum | The class applied to the component root element. |
| fb-top-clients-by-aum-md | The class applied to the aum valueelement when viewport is >= size md. |
| fb-top-clients-by-aum-bar-container | The class applied to the aum table cell element. |
| fb-top-clients-by-aum-bar | The class applied to the aum bar chart. |

### Available Slot and Props

#### Name: default

#### Props

| Prop Name | Description |
| ---------- | ----------- |
| aumPercent | The percentage formatted aum amount  |
| aumAmount | The currency formatted aum amount |
| client | The value representing the client (i.e. household name) |
