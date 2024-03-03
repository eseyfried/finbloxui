## Overview

The `DataTable` component renders data in tabular format with some powerful built-in feaures:

- Dynamic Column Selection - allow end users to toggle columns on/off
- Column Filtering
- Column Sorting
- Group Rows
- Collapsible Grouped Rows
- Column Formatters
- Column Totals

### Available CSS Clases

| Class Name | Description |
| ---------- | ----------- |
| .fb-data-table | The class name applied to the root element of this component |
| .fb-data-table-group-header | The class name applied to the grouped header row when `groupRowsBy` & `groupedTotalsLocation = top` prop is set |
| .fb-data-table-column-total | The class name applied to the column totals row when `showTotal` prop is set |
| .fb-data-table-group-footer | The class name applied to the grouped header row when `groupRowsBy` & `groupedTotalsLocation = bottom` prop is set |
| .fb-data-table-footer | The class name applied when `showTotals` prop is set |


### Related Components
- Column
- ColumnFilter
- ColumnSelector
- ColumnTotal
- TableHeader
- TableBody
- HeaderCell
- BodyCell