<template v-slot="slotProps">
    <ColumnSelector :columns="transformColumns(defaultColumns)" v-if="columnSelector" @fb-column-selector-selected:click="handleColumnSelection($event)" />
    <VirtualScroll :list="transformedRows" :columns="columns" :enabled="useVirtualScroll" :height="virtualScrollHeight">
        <template #default="slopProps">
            <table v-bind="$attrs" role="table">
                <TableHeader
                    :columns="slopProps.columns"
                    :rows="slopProps.rows"
                    @column-click="onColumnHeaderClick($event)"
                    @column-apply-filter="onColumnHeaderApplyFilter($event)"
                    @column-clear-filter="onColumnHeaderClearFilter($event)"
                />
                <TableBody
                    :columns="slopProps.columns"
                    :rows="slopProps.rows"
                />
            </table>
        </template>
    </VirtualScroll>
</template>
<script setup>
import { ref, useSlots, computed } from "vue";
import { filter as _filter } from "lodash";
import Base from "@/components/DataTable/Base";
import VirtualScroll from "@/components/DataTable/virtualScroll";
import TableHeader from "@/components/DataTable/TableHeader";
import TableBody from "@/components/DataTable/TableBody";
import ColumnSelector from "@/components/DataTable/ColumnSelector/ColumnSelector";
const slots = useSlots();
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    /**
     * An array of json objects rendered as table rows
     */
    rows: {
        type: Array,
        default: () => []
    },
    /**
     * Use virtual scrolling for DOM performance with super large datasets
     */
    useVirtualScroll: {
        type: Boolean,
        default: false,
    },
    /**
     * Height of the table when in virtual scroll mode
     */
    virtualScrollHeight: {
        type: Number,
        default: 400,
    },
    /**
     * Enable the column selector
     */
    columnSelector: {
        type: Boolean,
        default: false,
    }
});

const emits = defineEmits(["column-click"]);

const defaultColumns = Base.columns(slots);

const columns = ref(defaultColumns);
const filteredRows = ref([]);

/**
 * stack of applied filters;
 */
const filterStack = ref({});
const hasFilters = ref(false);

const transformedRows = computed( () => {
    return hasFilters.value ? filteredRows.value : props.rows;
});

// methods
const onColumnHeaderClick = (column) => {
    emits("column-click", column);
};

const onColumnHeaderClearFilter = (filter) => {
    delete filterStack.value[filter.field]
    filteredRows.value = applyFilters(true);    
}
const onColumnHeaderApplyFilter = (filter) => {
    // queue filter in stack
    filterStack.value[filter.field] = filter;
    
    // filteredRows.value = columnFilter(filter, props.rows);
    filteredRows.value = applyFilters();
    hasFilters.value = true;
};



/**
 * apply all column filters in filterStack
 */
const applyFilters = (reset = false) => {
    let rows = reset ? props.rows : transformedRows.value;
    Object.keys(filterStack.value).forEach(filter => {
       rows = columnFilter(filterStack.value[filter], rows)
    });
    return rows;
}

/**
 * utility to filter rows by a columns filter object
 */
const columnFilter = (filter, rows) => {
    return _filter(rows, (row) => {
        const { field , filterOperator, filterValue} = filter;
        const cleanedFilterValue = Array.isArray(filterValue) ? filterValue : filterValue.trim();
        const fieldValue = row[field];
        let match;

        if (!fieldValue) {
            return;
        }
        
        switch(filterOperator) {
            case "contains":
                match = fieldValue.toLowerCase().includes(cleanedFilterValue);
            break;
            case "not_contains":
                match = !fieldValue.toLowerCase().includes(cleanedFilterValue);
            break;
            case "starts_with":
                match = fieldValue.toLowerCase().startsWith(cleanedFilterValue.toLowerCase());
            break;
            case "ends_with":
                match = fieldValue.toLowerCase().endsWith(cleanedFilterValue.toLowerCase());
            break;
            case "equals":
                if (Array.isArray(cleanedFilterValue)) {
                    match = cleanedFilterValue.includes(fieldValue.toLowerCase())
                } else {
                    match = fieldValue.toLowerCase() === cleanedFilterValue.toLowerCase();
                }
            break;
            case "not_equals":
                match = fieldValue.toLowerCase() !== cleanedFilterValue.toLowerCase();
            break;
            case "greater_than":
                match = parseFloat(fieldValue) > parseFloat(cleanedFilterValue);
            break;
            case "greater_than_equal":
                match = parseFloat(fieldValue) >= parseFloat(cleanedFilterValue);
            break;
            case "less_than":
                match = parseFloat(fieldValue) < parseFloat(cleanedFilterValue);
            break;
            case "less_than_equal":
                match = parseFloat(fieldValue) <= parseFloat(cleanedFilterValue);
            break;
        }
        return match;
    })
}

const transformColumns = (columns) => {
    return columns.map((column) => {
        return {
            name: column.props.field,
            label: column.props.header
        }
    });
}
const handleColumnSelection = (selectedColumns) => {
    // get the selected columns
    const cols = selectedColumns.map(col => {
        return defaultColumns.filter(column => {
            return column.props.field === col;
        })[0]
    })
    // preserve original order of columns
    cols.sort(function(a, b){  
        return defaultColumns.indexOf(a) - defaultColumns.indexOf(b);
    });
    columns.value = cols;
}
</script>
<style lang="scss" scoped>
@import "@/scss/variables.scss";
table {
    border-collapse: collapse;
    width: 100%;
    
}

@media (max-width: $break-point-sm - 1) {
    table:deep(th) {
        display: none;
    }
    table:deep(td) {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 5ch auto;
    }
    table:deep(td::before) {
        content: attr(data-cell) ": ";
        text-transform: capitalize;
    }
}
</style>