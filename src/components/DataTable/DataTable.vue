<template v-slot="slotProps">
    <div class="fb-data-table" :class="componentClasses.getClassByType('component')" v-if="isMounted">
        <slot />
        <ColumnSelector
            :columns="transformColumns(defaultColumns)"
            v-if="columnSelector"
            @fb-column-selector-selected:click="handleColumnSelection($event)"
        />
        <VirtualScroll
            :list="groupRows(transformedRows)"
            :columns="columns"
            :enabled="useVirtualScroll"
            :useGroupBy="groupRowsByField !== null"
            :height="virtualScrollHeight"
            v-if="teleportComplete"
        >
            <template #default="slopProps">            
                <table v-bind="$attrs" role="table">
                    <TableHeader
                        :columns="slopProps.columns"
                        :rows="slopProps.rows"
                        :teleportTo="teleportTo"
                        @column-click="onColumnHeaderClick($event)"
                        @column-apply-filter="onColumnHeaderApplyFilter($event)"
                        @column-clear-filter="onColumnHeaderClearFilter($event)"
                    />
                    <TableBody
                        :columns="slopProps.columns"
                        :rows="slopProps.rows"
                        :groupRowsBy="groupRowsByField"
                        :groupRowLabel="getGroupRowLabel"
                        :showTotals="showTotals"
                        :groupedTotalsLocation="groupTotalsLocationOveride"
                        :collapsible="collapsible"
                    />
                </table>
            </template>
        </VirtualScroll>
    </div>
</template>
<script setup>
import { ref, useSlots, computed, onMounted, nextTick, watch, reactive } from "vue";
import { filter as _filter, groupBy as _groupBy } from "lodash";
import { isMobile } from "@/modules/useResponsive";
import Base from "@/components/DataTable/Base";
import VirtualScroll from "@/components/DataTable/VirtualScroll";
import TableHeader from "@/components/DataTable/TableHeader";
import TableBody from "@/components/DataTable/TableBody";
import ColumnSelector from "@/components/DataTable/ColumnSelector/ColumnSelector";
import * as componentClasses from "@/modules/useCommonCSS";
const slots = useSlots();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    /**
     * An array of json objects rendered as table rows
     */
    rows: {
        type: Array,
        default: () => [],
        desc: "An array of json objects rendered as table rows"
    },
    /**
     * Use virtual scrolling for DOM performance with super large datasets
     */
    useVirtualScroll: {
        type: Boolean,
        default: false,
        desc: "Use virtual scrolling for DOM performance with super large datasets"
    },
    /**
     * Height of the table when in virtual scroll mode
     */
    virtualScrollHeight: {
        type: Number,
        default: 400,
        desc: "Height of the table when in virtual scroll mode"
    },
    /**
     * Enable the column selector
     */
    columnSelector: {
        type: Boolean,
        default: false,
        desc: "Enable the column selector"
    },
    /**
     * class selector to teleportTo in a wrapper component (i.e. PositionsGrid)
     */
    teleportTo: {
        type: String,
        default: null,
        desc: "class selector to teleportTo in a wrapper component (i.e. PositionsGrid)"
    },
    /**
     * Group rows by a field in the data set
     */
    groupRowsBy: {
        type: String,
        default: null,
        desc: "Group rows by a field in the data set"
    },
    /**
     * show column totals
     */
    showTotals: {
        type: Boolean,
        default: false,
        desc: "Show column totals"
    },
    /**
     * collapse grouped rows
     */
    collapsible: {
        type: Boolean,
        default: false,
        desc: "Collapse grouped rows"
    },
    /**
     * location of grouped totals
     */
    groupedTotalsLocation: {
        type: String,
        default: "top",
        validator: (value) => {
            return ["top","bottom"].includes(value)
        },
        desc: "Location of grouped totals"
    }
});


const emits = defineEmits(["column-click"]);

const defaultColumns = computed(() => Base.columns(slots, props.groupRowsBy));

const columns = ref(defaultColumns.value);
const filteredRows = ref([]);
const teleportComplete = ref(props.teleportTo ? false : true);
const groupTotalsLocationOveride = isMobile.value ? "bottom" : props.groupedTotalsLocation;
const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})

/**
 * stack of applied filters;
 */
const filterStack = ref({});
const hasFilters = ref(false);

const transformedRows = computed( () => {
    return hasFilters.value ? filteredRows.value : props.rows;
});



watch(() => [props.teleportTo, slots.default()], () => {
    columns.value = Base.columns(slots, props.groupRowsBy)
    const isTeleportComplete = nextTick(() => {
        teleportComplete.value = true;
        const teleportToEl = document.querySelector(`${props.teleportTo} .fb-filters`);
        if (teleportToEl) {
            teleportComplete.value = true;
        }
        return teleportComplete.value = true;
    });
     teleportComplete.value = isTeleportComplete;
     
}, { immediate: true })

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
    
    filteredRows.value = applyFilters();
    hasFilters.value = true;
};

const getGroupRowLabel = computed(() => {
    if (!props.groupRowsBy) {
        return null;
    }
    const groupByColumn = Base.columns(slots).filter(column => {
        return column.props.field === props.groupRowsBy
    })[0];

    return groupByColumn ? groupByColumn.props.header : null;
})
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
        const cleanedFilterValue = Array.isArray(filterValue) ? filterValue : filterValue.toString().trim();
        const fieldValue = row[field];
        let match;

        if (!fieldValue) {
            return;
        }
        
        switch(filterOperator) {
            case "contains":
                match = fieldValue.toString().toLowerCase().includes(cleanedFilterValue);
            break;
            case "not_contains":
                match = !fieldValue.toString().toLowerCase().includes(cleanedFilterValue);
            break;
            case "starts_with":
                match = fieldValue.toString().toLowerCase().startsWith(cleanedFilterValue.toLowerCase());
            break;
            case "ends_with":
                match = fieldValue.toString().toLowerCase().endsWith(cleanedFilterValue.toLowerCase());
            break;
            case "equals":
                if (Array.isArray(cleanedFilterValue)) {
                    match = cleanedFilterValue.includes(fieldValue.toString().toLowerCase())
                } else {
                    match = fieldValue.toString().toLowerCase() === cleanedFilterValue.toLowerCase();
                }
            break;
            case "not_equals":
                match = fieldValue.toString().toLowerCase() !== cleanedFilterValue.toLowerCase();
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

const groupRows = (rows) => {
    if (!props.groupRowsBy) {
        return rows;
    }
    if (columnExists(props.groupRowsBy)) {
        return reactive(_groupBy(rows, props.groupRowsBy))
    }
    return rows
};

const handleColumnSelection = (selectedColumns) => {
    // get the selected columns
    const cols = selectedColumns.map(col => {
        return defaultColumns.value.filter(column => {
            return column.props.field === col;
        })[0]
    })
    // preserve original order of columns
    cols.sort(function(a, b){  
        return defaultColumns.value.indexOf(a) - defaultColumns.value.indexOf(b);
    });
    columns.value = cols;
}

const groupRowsByField = computed(() => {
    return columnExists(props.groupRowsBy) ? props.groupRowsBy : null
})

const columnExists = (column) => {
    const matches = Base.columns(slots).filter(col => {
        return col.props.field === column
    });
    return matches.length > 0
}


</script>
<style lang="scss" scoped>
@import "@/scss/variables.scss";
table {
    border-collapse: collapse;
    width: 100%;
    position: relative;
}

@media (max-width: $break-point-sm - 1) {
    table:deep(th) {
        display: none;
    }
    table:deep(td) {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 16ch auto;
    }
    table:deep(td::before) {
        content: attr(data-cell) ": ";
        text-transform: capitalize;
    }
    table:deep(tr.fb-data-table-footer td:not(.fb-data-table-column-total)::before),
    table:deep(tr.fb-data-table-group-footer td:not(.fb-data-table-column-total)::before) {
        content: " ";
    }
}
</style>