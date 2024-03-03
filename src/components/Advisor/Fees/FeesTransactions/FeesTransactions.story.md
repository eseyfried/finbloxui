## Overview

The `FeesTransaction` component displays a table with 3 columns: 
- date
- description
- amount

This component is intended to be used as a sub-component of the `FeesRoot` component. It receives it's props from the parent `FeesRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-fees-transactions | The class applied to the component root element of the transactions section. |
| .fb-fees-transactions-desc | The class applied to the description th and td elements of the transactions section. |
| .fb-fees-transactions-date | The class applied to the date th and td elements of the transactions section. |
| .fb-fees-transactions-amount | The class applied to the amount th and td elements of the transactions section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| transactions | The transactions `data` prop as passed into the `FeesRoot` component |
| descriptionLabel | The descriptionLabel prop as passed into the `FeesRoot` component |
| dateLabel | The dateLabel prop as passed into the `FeesRoot` component |
| amountLabel | The amountLabel prop as passed into the `FeesRoot` component |
| showTransactions | The showTransactions prop as passed into the `FeesRoot` component |



### Related Components
- FeesRoot
- FeesHero