## Overview

The `Column` component is a renderless sub-component of the `DataTable` component. It is used to configure the functional behavior and properties of each column in the `DataTable`. 

### Column Types

1. data - The most commonly used column type to display data from the data collection
2. actions - used to create an `ActionMenu` for each row in the data set. See `ActionMenu` docs for more detail.
3. quote - A special handler to wrap the `QuoteDetail` component around a data value. Typically a symbol. See `QuoteDetail` docs for more detail.

### Data Formatters

You can format data values using built-in formatters or provide a custom formatter.

#### Available Formatters

- currency - formats values in USD currency
- percent - formats values as a percentage
- change-indicator - wraps positive/negative values with a CSS class `.fb-positive` or `.fb-negative`

#### Custom Formatter

Provide a callback function with following signature:

```
(value) => {
    // formatting logic
    const formatted = `${value}`
    return formatted
}
```

### Handling Empty/Null Values

By default empty or null values are rendered using a `-`. You can change this using the `emptyString` prop.

### Related Components
- DataTable
- ColumnFilter