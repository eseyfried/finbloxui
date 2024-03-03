## Overview

The `QuoteDetail` component shows the detail for a security instrument price quote. It allows the for the quote details to be passed in as
a set of component props or be returned from an callback function. The latter is typically used when fetching a quote from an aync service.

### Available CSS Class Names

| Class Name | Description |
| ---------- | ----------- |
| .fb-quote-detail | The css class name applied to the root element. |
| .fb-loading | The css class name applied to the loading element. |
| .fb-quote-detail-heading | The css class name applied to the quote heading section. |
| .fb-quote-detail-price | The css class name applied to the quote detail price section. |
| .fb-quote-detail-details | The css class name applied to the quote details section. |

### Available Events

| Event Name | Description | Event Data |
| ---------- | ----------- | ---------- |
| fb-quote-detail-before-mount | The event that is tiggered before the component mounts.  | `symbol` |
| fb-quote-detail-show | The event that is tiggered when the component is shown.  | `symbol` |
| fb-quote-detail-loaded | The event that is tiggered when the callback has returned data.  | `true` |


### Available Slots & Props

#### Name: loader

The template slot for the loading indicator content. 

#### Name: heading

| Slot Prop | Description |
| ---------- | ---------- |
| props | All the props that were passed into the component. |
| symbol | The formatted symbol. |
| security_description | The symbol description. |
| attrs | An object containing optional HTML attribures to apply (i.e. class) |

#### Name: price

| Slot Prop | Description |
| ---------- | ---------- |
| props | All the props that were passed into the component. |
| current_price | The currency formatted current_price. |
| price_change_amt | The currency formatted price_change_amt. |
| price_change_pct | The percent formatted price_change_pct. |
| price_change_pct_css | The css class name to indicate a positive or negative change (`.fb-positive` or `.fb-negative`). |
| price_change_amt_css | The css class name to indicate a positive or negative change (`.fb-positive` or `.fb-negative`). |
| attrs | An object containing optional HTML attribures to apply (i.e. class) |

#### Name: details

| Slot Prop | Description |
| ---------- | ---------- |
| props | All the props that were passed into the component. |
| previous_close_price | The currency formatted previous_close_price. |
| day_low_price | The currency formatted day_low_price. |
| day_high_price | The currency formatted day_high_price. |
| dividend_yield | The percent formatted dividend_yield. |
| bid | The currency formatted bid. |
| ask | The currency formatted ask. |
| attrs | An object containing optional HTML attribures to apply (i.e. class) |