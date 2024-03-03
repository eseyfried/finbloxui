## Overview

The `WithdrawalsHero` component displays the total amount of withdrawals and the `as of` date based on the latest transaction. This component is intended to be used as a sub-component of the `WithdrawalsRoot` component. It receives it's props from the parent `WithdrawalsRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-withdrawals-hero | The class applied to the component root element of the hero section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| label | The label prop as passed into the `WithdrawalsRoot` component |
| showDate | The showDate prop as passed into the `WithdrawalsRoot` component |
| asOf | The date of the latest transaction |
| totalAmount | The total amount based on the amount data point in the transactions |


### Related Components
- WithdrawalsRoot
- WithdrawalsTransactions