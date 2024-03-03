## Overview

The `UGLGrid` component is a wrapper around our `DataTable` component. It comes with some built in features that make it a bit more powerful than a basic HTML table. Given an array of unrealized gain loss objects that you define, you can:

- choose which columns to display
- choose the order to display the columns
- set the column header label as you choose
- format column values using built-in formatters or your own custom formatter
- add an `ActionMenu' component to each row with custom actions
- add column filters
- let the user toggle columns on/of using the `ColumnSelector`
- add column totals
- group data by a column (i.e. group lots by symbol)
- collapse/expand grouped records

### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-ugl-grid | The class applied to the component root element. |
| .fb-data-table-* | All classes applied by the `DataTable` component. See `DataTable` docs. |

## Responsive Behavior

Displaying HTML tables in smaller viewports can supported in several fashions. The `DataTable` component renders each table row vertically with fields displayed in name/value pairs. The column header is used as the field name while the value is used as the value.

## Related Components

- DataTable
- Column
- ColumnFilter
- ColumnSelector