## Overview

The `IncomeTransaction` component displays a table with 3 columns: 
- date
- description
- amount

This component is intended to be used as a sub-component of the `IncomeRoot` component. It receives it's props from the parent `IncomeRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-income-transactions | The class applied to the component root element of the transactions section. |
| .fb-income-transactions-desc | The class applied to the description th and td elements of the transactions section. |
| .fb-income-transactions-date | The class applied to the date th and td elements of the transactions section. |
| .fb-income-transactions-amount | The class applied to the amount th and td elements of the transactions section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| transactions | The transactions `data` prop as passed into the `IncomeRoot` component |
| descriptionLabel | The descriptionLabel prop as passed into the `IncomeRoot` component |
| dateLabel | The dateLabel prop as passed into the `IncomeRoot` component |
| amountLabel | The amountLabel prop as passed into the `IncomeRoot` component |
| showTransactions | The showTransactions prop as passed into the `IncomeRoot` component |



### Related Components
- IncomeRoot
- IncomeHero