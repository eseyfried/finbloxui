## Overview

The `ClientListItemStats` component renders a list of client financial stats (i.e. Total AUM, YTD Fees, etc.) for single client list item in the `ClientListRoot` component. Each stat is rendered using the `ClientListItemStat` sub-component. This component uses the `stats` array from the standard `Client` data object from the array of clients passed to the `ClientListRoot` clients prop.


 ### Available CSS Classes


| Class Name | Description |
| ---------- | ----------- |
| .fb-client-list-item-stats | The class applied to the root element of each client list items stats section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| stats | An array of stat objects for the current item in clients array. The object contains the following: <ul><li>index: the indexed position of the stat in the collection</li><li>label: the text label of the stat</li><li>value: the stat unformatted value</li></ul> |
| index | The index position for the current item in the clients array. This is required to be passed to sub-components. |


### Related Components

- ClientListRoot
- ClientListItem
- ClientListItemName
- ClientListItemHouseholdName
- ClientListItemStat
- ClientListItemAction