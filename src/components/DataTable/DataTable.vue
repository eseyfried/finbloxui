<template v-slot="slotProps">
    <ColumnSelector :columns="transformColumns(defaultColumns)" v-if="columnSelector" @fb-column-selector-selected:click="handleColumnSelection($event)" />
    <VirtualScroll :list="rows" :columns="columns" :enabled="useVirtualScroll" :height="virtualScrollHeight">
        <template #default="slopProps">
            <table v-bind="$attrs" role="table">
                <TableHeader
                    :columns="slopProps.columns"
                    @column-click="onColumnHeaderClick($event)"
                />
                <TableBody :columns="slopProps.columns" :rows="slopProps.rows" />
            </table>
        </template>
    </VirtualScroll>
</template>
<script setup>
import { ref, useSlots } from "vue";
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

// methods
const onColumnHeaderClick = (column) => {
    emits("column-click", column);
};

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