## Overview

The `ClientListItemStat` component renders a single client financial stat (i.e. Total AUM) in the `ClientListItemStats` parent component. This component uses the stats object from the standard `Client` data object passed to the `ClientListRoot` clients prop.


 ### Available CSS Classes


| Class Name | Description |
| ---------- | ----------- |
| .fb-client-list-item-stat | The class applied to the root element of each client list item stats element. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| client | The client object for the current item in clients array |
| label | The stat text label |
| value | The formatted stat value |


### Related Components

- ClientListRoot
- ClientListItem
- ClientListItemName
- ClientListItemHouseholdName
- ClientListItemStats
- ClientListItemAction