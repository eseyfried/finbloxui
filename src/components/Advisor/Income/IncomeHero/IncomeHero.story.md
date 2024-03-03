## Overview

The `IncomeHero` component displays the total amount of income and the `as of` date based on the latest transaction. This component is intended to be used as a sub-component of the `IncomeRoot` component. It receives it's props from the parent `IncomeRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-income-hero | The class applied to the component root element of the hero section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| label | The label prop as passed into the `IncomeRoot` component |
| showDate | The showDate prop as passed into the `IncomeRoot` component |
| asOf | The date of the latest transaction |
| totalAmount | The total amount based on the amount data point in the transactions |


### Related Components
- IncomeRoot
- IncomeTransactions