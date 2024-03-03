## Overview

The `ClientListItem` component renders a single client list item in the `ClientListRoot` component. Each client item in the list offers sub-components to display the client name, household name and a list of financial stats (i.e. Total AUM, YTD Fees, etc.) This component uses the standard `Client` data object from the array of clients passed to the `ClientListRoot` clients prop.


 ### Available CSS Classes


| Class Name | Description |
| ---------- | ----------- |
| .fb-client-list-item | The class applied to the root element of each client list items. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| client | The client object for the current item in clients array |
| index | The index position for the current item in the clients array. This is required to be passed to sub-components. |


### Related Components

- ClientListItemName
- ClientListItemHouseholdName
- ClientListItemStats
- ClientListItemStat
- ClientListItemAction