## Overview

The `DepositsTransaction` component displays a table with 3 columns: 
- date
- description
- amount

This component is intended to be used as a sub-component of the `DepositsRoot` component. It receives it's props from the parent `DepositsRoot` component.

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-deposits-transactions | The class applied to the component root element of the transactions section. |
| .fb-deposits-transactions-desc | The class applied to the description th and td elements of the transactions section. |
| .fb-deposits-transactions-date | The class applied to the date th and td elements of the transactions section. |
| .fb-deposits-transactions-amount | The class applied to the amount th and td elements of the transactions section. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| transactions | The transactions `data` prop as passed into the `DepositsRoot` component |
| descriptionLabel | The descriptionLabel prop as passed into the `DepositsRoot` component |
| dateLabel | The dateLabel prop as passed into the `DepositsRoot` component |
| amountLabel | The amountLabel prop as passed into the `DepositsRoot` component |
| showTransactions | The showTransactions prop as passed into the `DepositsRoot` component |



### Related Components
- DepositsRoot
- DepositsHero