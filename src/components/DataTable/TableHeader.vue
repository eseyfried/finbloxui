<template>
    <thead role="rowgroup">
        <tr role="row">
            <HeaderCell
                v-for="(column, i) in columns"
                :column="column"
                :rows="rows"
                :key="i"
                :isMobile="isMobile"
                :teleportTo="teleportTo"
                @header-cell-click="onHeaderCellClick($event)"
                @header-cell-apply-filter="onHeaderCellApplyFilter(column, $event)"
                @header-cell-clear-filter="onHeaderCellClearFilter(column, $event)"
            />
        </tr>
    </thead>
</template>
<script setup>
import HeaderCell from "@/components/DataTable/HeaderCell";
import { isMobile } from "@/modules/useResponsive";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    columns: {
        type: Array,
        default: null,
    },
    rows: {
        type: Array,
        default: null,
    },
    teleportTo: {
        type: String,
        default: null,
    }
});

const emits = defineEmits([
    "column-click",
    "column-apply-filter",
    "column-clear-filter",
]);
// methods
const onHeaderCellClick = (column) => {
    emits("column-click", column);
};

const onHeaderCellApplyFilter = (column, filter) => {
    filter.field = column.props.field
    emits("column-apply-filter", filter);
}
const onHeaderCellClearFilter = (column, clear) => {
    emits("column-clear-filter", {
        field: column.props.field,
        clear: clear
    });
}
</script>
<style lang="scss" scoped>
thead {
    position: relative;
    z-index: 1000;
}
</style>