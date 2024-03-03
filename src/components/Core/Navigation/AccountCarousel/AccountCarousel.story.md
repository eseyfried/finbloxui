## Overview

The `AccountCarousel` component is a navigational component that allows you to display a list of accounts and their attributes in a carousel UI interface. Clicking an account triggers an event along with the account that was clicked. This allows you the flexibility to handle such tasks as navigation, content changes, etc.

### Available CSS Class Names

| Class Names | Description |
| ----------- | ----------- |
| .fb-account-carousel | The css class name applied to the root element. |
| .fb-account-carousel-accounts | The css class name applied to the container element of the account list |
| .fb-account-carousel-account-selected | The css class name applied to the selected account. |
| .fb-account-carousel-indicators | The css class name applied to the container element indicating the number of accounts and location within the list. |
| .fb-account-carousel-indicator | The css class name applied to an account indicator element. |
| .fb-account-carousel-indicator-highlight | The css class name applied to current account in context. |

### Available Events

| Event Name | Description | Data |
| ----------- | ----------- | ---- |
| fb-account-carousel:click | The event triggered when an account is clicked. | `account` object |
