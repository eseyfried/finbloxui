## Overview

The `PortfolioSummaryCard` component displays the high level summary information of an account or a portfolio of accounts as a list. The following data points are available:

- Current Value (total value of portfolio)
- Cash Value (total cash value of portfolio)
- Securities Value (total securities value of portfolio)
- Change Amount (the change in value of the portfolio as a dollar amount)
- Change Amount % (the change in value of the portfolio as a percent)

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-portfolio-summary-card | The class applied to the component root element. |
| .fb-portfolio-summary-card-current-value-label | The class applied to the component root element of the current value label. |
| .fb-portfolio-summary-card-current-value | The class applied to the component root element of the current value. |
| .fb-portfolio-summary-card-cash-label | The class applied to the component root element of the cash value label. |
| .fb-portfolio-summary-card-cash | The class applied to the component root element of the cash value. |
| .fb-portfolio-summary-card-securities-label | The class applied to the component root element of the securities value label. |
| .fb-portfolio-summary-card-securities | The class applied to the component root element of the securities value. |
| .fb-portfolio-summary-card-change-label | The class applied to the component root element of the change value label. |
| .fb-portfolio-summary-card-change | The class applied to the component root element of the change value. |


### Available Slot and Slot Props

#### Name: default

| Prop Name | Description |
| ----- | ----------- |
| props | The props as passed into the component |
| currentValue | The formatted currentValue |
| cashValue | The formatted cashValue |
| securitiesValue | The formatted securitiesValue |
| changeAmountPct | The formatted changeAmountPct |
| changeAmount | The formatted changeAmount |
| changeClasses | The calculated css classes to indicate a positive or negative change (.fb-positive or .fb-negative) |