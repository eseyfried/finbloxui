import * as formatters from "@/modules/useFormatter";
import ComponentUtils from "@/modules/ComponentUtils";
import { mergeProps} from "vue"


const columns = (slots, groupRowsBy) => {
    let children;
    // handles getting slotted Column components from wrapped Component
    if (slots.default()[0].children && slots.default()[0].children.length > 0) {
        children = slots.default()[0].children.filter(child => child.type.__name === "Column" && child.props.field !== groupRowsBy);
    } else {
        children = slots.default().filter(child => child.type.__name === "Column" && child.props.field !== groupRowsBy);
    }
    return children;
}

const field = (column) => columnProp(column, 'field');

const header = (column) => columnProp(column, 'header');

const defaultDataTableOptions = (options = {}) => {
    return mergeProps(
        {
            columnSelector: true
        },
        options
    )
}

const totalByColumn = (rows, column, grouped = false) => {
    let columnData = null
    /**
     * handle totaling all rows when not grouped
     */
    if(!grouped && Array.isArray(rows[0].data)) {
        columnData = rows.map(row => {
            return row.data.reduce((accumulator, value) => parseFloat(accumulator) + parseFloat(value[column.props.field]), 0);
        });
    } 
    /**
     * handle totaling all rows when not grouped
     */
    else if (!grouped && typeof rows[0].data === 'object') {
        columnData = rows.map(row => row.data[column.props.field]);
    } else {
        columnData = rows.map(row => row[column.props.field]);
    }
    const total = columnData.reduce((accumulator, value) => parseFloat(accumulator) + parseFloat(value), 0);    
    return isNaN(total) ? "" : total;
}

const formatColumn = (formatter, fieldData) => {
    if (formatter) {
        if (formatter === "currency") {
            fieldData = formatters.formatCurrency(fieldData);
        } else if (formatter === "percent") {
            fieldData = formatters.formatPercent(fieldData);
        } else if (formatter === "date") {
            fieldData = formatters.formatDate(fieldData);
        } else if (typeof formatter === "function") {
            fieldData = formatter(fieldData);
        }
    }
    return fieldData;
}

const hasChangeIndicatorFormat = (column) => {
    const formatters = columnProp(column, 'formatters');
    let _formatters = formatters;
    if (!Array.isArray(_formatters)) {
        _formatters = [formatters]
    }
    return _formatters.includes("change-indicator");
}

const resolveFieldData = (column, rawFieldData) => {
        let fieldData = rawFieldData;
        if (fieldData === null || fieldData === "") {
            return column.type.props.emptyString.default;
        }
        const formatter = columnProp(column, 'formatters');
        let _formatters = formatter;
        if (!Array.isArray(_formatters)) {
            _formatters = [formatter]
        }
        _formatters.forEach(_formatter => {
            fieldData = formatColumn(_formatter,fieldData)
        });
        return fieldData;
}

const columnProp = (column, prop) => {
    return ComponentUtils.getVNodeProp(column, prop);
};
export default {
    hasChangeIndicatorFormat,
    columns,
    defaultDataTableOptions,
    totalByColumn,
    formatColumn,
    resolveFieldData,
    columnProp,
    field,
    header
}