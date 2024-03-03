## Overview

The `WithdrawalsTransaction` component displays a table with 3 columns: 
- date
- description
- amount

This component is intended to be used as a sub-component of the `WithdrawalsRoot` component. It receives it's props from the parent `WithdrawalsRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-withdrawals-transactions | The class applied to the component root element of the transactions section. |
| .fb-withdrawals-transactions-desc | The class applied to the description th and td elements of the transactions section. |
| .fb-withdrawals-transactions-date | The class applied to the date th and td elements of the transactions section. |
| .fb-withdrawals-transactions-amount | The class applied to the amount th and td elements of the transactions section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| transactions | The transactions `data` prop as passed into the `WithdrawalsRoot` component |
| descriptionLabel | The descriptionLabel prop as passed into the `WithdrawalsRoot` component |
| dateLabel | The dateLabel prop as passed into the `WithdrawalsRoot` component |
| amountLabel | The amountLabel prop as passed into the `WithdrawalsRoot` component |
| showTransactions | The showTransactions prop as passed into the `WithdrawalsRoot` component |



### Related Components
- WithdrawalsRoot
- WithdrawalsHero