## Overview

The `DepositsHero` component displays the total amount of deposits and the `as of` date based on the latest transaction. This component is intended to be used as a sub-component of the `DepositsRoot` component. It receives it's props from the parent `DepositsRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-deposits-hero | The class applied to the component root element of the hero section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| label | The label prop as passed into the `DepositsRoot` component |
| showDate | The showDate prop as passed into the `DepositsRoot` component |
| asOf | The date of the latest transaction |
| totalAmount | The total amount based on the amount data point in the transactions |


### Related Components
- DepositsRoot
- DepositsTransactions