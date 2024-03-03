## Overview

The `ClientListRoot` component shows a list of clients with an optional action element that can be used as a callback to link to more details. Each client item in the list offers sub-components to display the client name, household name and a list of financial stats (i.e. Total AUM, YTD Fees, etc.) This component uses the standard `Client` data object as its input prop for supplying display data.

By default, the `ClientListRoot` component renders `ClientListItem` sub-components for each client in the list. Optionally, you can use the `ClientCardRoot` sub-component by passing `card` as the value for the `type` prop.

 ### Available CSS Classes

 #### Using `ClientListRoot`

| Class Name | Description |
| ---------- | ----------- |
| .fb-client-list | The class applied to the component root element. |
| .fb-client-list-item | The class applied to the root element of each client list items. |
| .fb-client-list-item-name | The class applied to the root element of the client list item name section. |
| .fb-client-list-item-household-name | The class applied to the root element of the client list item household name section. |
| .fb-client-list-item-stats | The class applied to the root element of the client list item stats section. |
| .fb-client-list-item-stat | The class applied to the root element of the stat element in the client list item stats section. |
| .fb-client-list-item-action | The class applied to the root element of client list item action. |


#### Using `ClientCardRoot`

see `ClientCardRoot` docs for available CSS Classes

### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| client | The client object for the current item in clients array |
| index | The index position for the current item in the clients array. This is required to be passed to sub-components. |


### Available Events

| Event | Description |
| ----- | ----------- |
| fb-client-card-email-link:click | Event emitted when an email link is clicked |
| fb-client-card-phone-link:click | Event emitted when a phone link is clicked |
| fb-client-card-action-link:click | Event emitted when the action link is clicked. Typically used for linking to deeper client content. |
| fb-client-list-item:click | Event emitted when the action link is clicked. Typically used for linking to deeper client content. |

### Related Components

- ClientListItem
- ClientListItemName
- ClientListItemHouseholdName
- ClientListItemStats
- ClientListItemStat
- ClientListItemAction
- ClientCardRoot