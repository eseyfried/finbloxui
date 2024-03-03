## Overview

The `ContextMenu` component offers an inline dropdown style menu intended for contextual navigation. For example, offering configuration options within a content card. Or perhaps offering the user additional content choices within the context of a table row.

### Handling ContentMenu Item Selection

The `ContextMenu` component uses an array of menu item objects with the following structure:

```
{
    url: "/some/url",
    label: "Action 1",
    callback: (item) => { // do something here }
}
```

It is your responsiblity to handle the menu item click. If you pass a callback function, the `ContextMenu` component will call your callback passing the selected menu item object. This allows you to customize the action handling. If you use the `url` property of the menu item object, you should listen for the click event emitted by this component and handle the routing to your url.

### Available Events

| Event Name | Description |
| ---------- | ----------- |
| fb-action-menu-item:click | The event emitted when a menu item is clicked. The menu item object is passed along to your handler. Note, this only emits when the menu item `url` prop value is not null or #.

### Available CSS Class Names
| Class Name | Description |
| ---------- | ----------- |
| .fb-action-menu | The css class name applied to the root element. |
| .fb-action-menu-button | The css class name applied to the trigger button element. |
| .fb-action-menu-visible | The css class name applied to the menu element when visible. |
| .fb-action-menu-item | The css class name applied to each menu item element. |