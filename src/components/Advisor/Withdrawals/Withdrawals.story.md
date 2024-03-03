## Overview

The `WithdrawalsRoot` component displays the total amount of withdrawals given an array of account or portfolio transactions. Optionally, the component can display a simple table with all of the individual withdrawals transactions. This component accepts an array of standard `Transaction` objects.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-withdrawals | The class applied to the component root element. |
| .fb-withdrawals-hero | The class applied to the component root element of the hero section. |
| .fb-withdrawals-transactions | The class applied to the component root element of the transactions section. |
| .fb-withdrawals-transactions-desc | The class applied to the description th and td elements of the transactions section. |
| .fb-withdrawals-transactions-date | The class applied to the date th and td elements of the transactions section. |
| .fb-withdrawals-transactions-amount | The class applied to the amount th and td elements of the transactions section. |

### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| label | The label prop as passed into the component |
| data | The data prop as passed into the component |
| showTransactions | The showTransactions prop as passed into the component |
| showDate | The showDate prop as passed into the component |
| descriptionLabel | The descriptionLabel prop as passed into the component |
| dateLabel | The dateLabel prop as passed into the component |
| amountLabel | The amountLabel prop as passed into the component |


### Related Components
- WithdrawalsHero
- WithdrawalsTransactions