## Overview

The `FeesHero` component displays the total amount of fees and the `as of` date based on the latest transaction. This component is intended to be used as a sub-component of the `FeesRoot` component. It receives it's props from the parent `FeesRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-fees-hero | The class applied to the component root element of the hero section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| label | The label prop as passed into the `FeesRoot` component |
| showDate | The showDate prop as passed into the `FeesRoot` component |
| asOf | The date of the latest transaction |
| totalAmount | The total amount based on the amount data point in the transactions |


### Related Components
- FeesRoot
- FeesTransactions