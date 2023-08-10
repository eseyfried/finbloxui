import * as formatters from "@/modules/useFormatter";
import { ref, computed } from "vue";
import ComponentUtils from "@/modules/ComponentUtils";


const  hasChangeIndicatorFormat = ref(false);

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
// const field = computed(() => {
//     return columnProp(props.column, 'field');
// });
// const header = computed(() => {
//     return columnProp(props.column, 'header');
// });

const defaultDataTableOptions = (options = {}) => {
    return {
        ...options,
        ...{
            columnSelector: true
        }
    }
}

const totalByColumn = (rows, column) => {
    const columnData = rows.map(row => row[column.props.field]);
    const total = columnData.reduce((accumulator, value) => parseFloat(accumulator) + parseFloat(value), 0);
    return total
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
        } else if(formatter === "change-indicator") {
            hasChangeIndicatorFormat.value = true;
        }
    }
    return fieldData;
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