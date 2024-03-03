## Overview
The `ClientCardRoot` component accepts a client data object and displays the client details. This component is intended to show basic name and address details along with high-level summary financial details. 

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-client-card | The class applied to the component root element. |
| .fb-client-card-header | The class applied to the root element of client card name section. |
| .fb-client-card-stats | The class applied to the root element of client card stats section. |
| .fb-client-card-contact-info | The class applied to the root element of client card contact info section. |

### Available Events

| Event | Description |
| ----- | ----------- |
| fb-client-card-email-link:click | Event emitted when an email link is clicked |
| fb-client-card-phone-link:click | Event emitted when a phone link is clicked |
| fb-client-card-action-link:click | Event emitted when the action link is clicked. Typically used for linking to deeper client content. |

 ### Related Components
- Container
- ClientCardRoot
- ClientCardName
- ClientCardHouseholdName
- ClientCardDataList
- ClientCardDataListItem
- ClientCardDataLabel
- ClientCardDataValue
- ClientCardPhoneList
- ClientCardPhoneListItem
- ClientCardPhoneLabel
- ClientCardPhoneValue
- ClientCardEmail
- ClientCardEmailLabel
- ClientCardEmailLink
- ClientCardAddress
- ClientCardAction